#!/usr/bin/env node

/**
 * Sitemap Generator for Kids Painting Website
 * 
 * This script generates a sitemap.xml file containing all pages on the website:
 * - Home page
 * - All painting pages (fetched from API)
 * - All category pages
 * - Static pages (terms, privacy, contact)
 * 
 * Usage: node generate-sitemap.js
 * Output: public/sitemap.xml
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Configuration
const SITE_URL = process.env.SITE_URL || 'https://www.mycolor.fun';
const API_URL = process.env.VITE_API_BASE_URL || 'https://docker-composeyaml-production.up.railway.app/api';
const OUTPUT_PATH = path.join(__dirname, 'public', 'sitemap.xml');

console.log('🗺️  Generating sitemap for:', SITE_URL);
console.log('📡 Fetching data from API:', API_URL);

// Helper function to make HTTP requests
function fetchData(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse JSON from ${url}: ${e.message}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Helper function to fetch all paintings (handling pagination)
async function fetchAllPaintings() {
  let allPaintings = [];
  let page = 0;
  let hasMore = true;
  
  while (hasMore) {
    try {
      console.log(`📄 Fetching paintings page ${page}...`);
      const response = await fetchData(`${API_URL}/paintings?page=${page}&size=100`);
      
      if (response.content && response.content.length > 0) {
        allPaintings = allPaintings.concat(response.content);
        page++;
        hasMore = !response.last;
      } else {
        hasMore = false;
      }
    } catch (error) {
      console.error(`❌ Error fetching paintings page ${page}:`, error.message);
      hasMore = false;
    }
  }
  
  return allPaintings;
}

// Helper function to fetch all categories
async function fetchCategories() {
  try {
    console.log('📂 Fetching categories...');
    const categories = await fetchData(`${API_URL}/paintings/categories`);
    return categories;
  } catch (error) {
    console.error('❌ Error fetching categories:', error.message);
    return [];
  }
}

// Format date to W3C format (YYYY-MM-DD)
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

// Generate sitemap XML with image support
function generateSitemapXML(urls) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
  
  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    
    // Add image tags if images are present
    if (url.images && url.images.length > 0) {
      url.images.forEach(image => {
        xml += '    <image:image>\n';
        xml += `      <image:loc>${image.loc}</image:loc>\n`;
        if (image.title) {
          xml += `      <image:title>${escapeXml(image.title)}</image:title>\n`;
        }
        if (image.caption) {
          xml += `      <image:caption>${escapeXml(image.caption)}</image:caption>\n`;
        }
        xml += '    </image:image>\n';
      });
    }
    
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
}

// Helper function to escape XML special characters
function escapeXml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Main function
async function generateSitemap() {
  try {
    const today = formatDate(new Date());
    const urls = [];
    
    // 1. Home page (highest priority, changes frequently)
    urls.push({
      loc: SITE_URL,
      lastmod: today,
      changefreq: 'daily',
      priority: '1.0'
    });
    
    // 2. Fetch and add all paintings
    console.log('\n🎨 Fetching all paintings...');
    const paintings = await fetchAllPaintings();
    console.log(`✅ Found ${paintings.length} paintings`);
    
    paintings.forEach(painting => {
      // Construct image URL - prefer imageUrl from API, fallback to local path
      let imageUrl;
      if (painting.imageUrl && !painting.imageUrl.includes('placeholder')) {
        imageUrl = painting.imageUrl;
      } else {
        const imagePath = `/coloring-images/${painting.urlKey.replace(/-/g, '_')}.png`;
        imageUrl = `${SITE_URL}${imagePath}`;
      }
      
      urls.push({
        loc: `${SITE_URL}/painting/${painting.urlKey}`,
        lastmod: painting.updatedAt ? formatDate(new Date(painting.updatedAt)) : today,
        changefreq: 'weekly',
        priority: painting.featured ? '0.9' : '0.8',
        images: [
          {
            loc: imageUrl,
            title: `${painting.title} - Free Coloring Page`,
            caption: painting.description || `Print and color this ${painting.title.toLowerCase()} coloring page. Free printable coloring sheet for kids.`
          }
        ]
      });
    });
    
    // 3. Fetch and add all category pages
    console.log('\n📂 Fetching categories...');
    const categories = await fetchCategories();
    console.log(`✅ Found ${categories.length} categories`);
    
    categories.forEach(category => {
      urls.push({
        loc: `${SITE_URL}/category/${encodeURIComponent(category)}`,
        lastmod: today,
        changefreq: 'weekly',
        priority: '0.7'
      });
    });
    
    // 4. Add static pages
    const staticPages = [
      { path: '/terms', priority: '0.3', changefreq: 'monthly' },
      { path: '/privacy', priority: '0.3', changefreq: 'monthly' },
      { path: '/contact', priority: '0.5', changefreq: 'monthly' }
    ];
    
    staticPages.forEach(page => {
      urls.push({
        loc: `${SITE_URL}${page.path}`,
        lastmod: today,
        changefreq: page.changefreq,
        priority: page.priority
      });
    });
    
    // 5. Generate XML
    console.log(`\n📝 Generating sitemap with ${urls.length} URLs...`);
    const xml = generateSitemapXML(urls);
    
    // 6. Ensure public directory exists
    const publicDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // 7. Write to file
    fs.writeFileSync(OUTPUT_PATH, xml, 'utf8');
    
    console.log(`\n✅ Sitemap generated successfully!`);
    console.log(`📍 Location: ${OUTPUT_PATH}`);
    console.log(`📊 Total URLs: ${urls.length}`);
    console.log(`   - Home: 1`);
    console.log(`   - Paintings: ${paintings.length}`);
    console.log(`   - Categories: ${categories.length}`);
    console.log(`   - Static pages: ${staticPages.length}`);
    console.log(`\n🔗 You can now submit this sitemap to Google Search Console:`);
    console.log(`   ${SITE_URL}/sitemap.xml`);
    
  } catch (error) {
    console.error('\n❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run the script
generateSitemap();

