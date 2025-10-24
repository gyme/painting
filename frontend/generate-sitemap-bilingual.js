#!/usr/bin/env node

/**
 * Bilingual Sitemap Generator for Kids Painting Website
 * 
 * This script generates a sitemap.xml file containing ALL pages in BOTH languages:
 * - English (default): /
 * - Spanish: /es/
 * 
 * Includes hreflang annotations for proper international SEO
 * 
 * Usage: node generate-sitemap-bilingual.js
 * Output: public/sitemap.xml
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Configuration
const SITE_URL = process.env.SITE_URL || 'https://painting-sand.vercel.app';
const API_URL = process.env.VITE_API_BASE_URL || 'https://docker-composeyaml-production.up.railway.app/api';
const OUTPUT_PATH = path.join(__dirname, 'public', 'sitemap.xml');

console.log('🗺️  Generating BILINGUAL sitemap for:', SITE_URL);
console.log('🌍 Languages: English (default) & Spanish (/es)');
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

// Generate sitemap XML with bilingual support and hreflang
function generateBilingualSitemapXML(urlPairs) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n';
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  
  urlPairs.forEach(pair => {
    // English URL
    xml += '  <url>\n';
    xml += `    <loc>${pair.en.loc}</loc>\n`;
    xml += `    <lastmod>${pair.en.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${pair.en.changefreq}</changefreq>\n`;
    xml += `    <priority>${pair.en.priority}</priority>\n`;
    
    // Hreflang annotations
    xml += `    <xhtml:link rel="alternate" hreflang="en" href="${pair.en.loc}" />\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="es" href="${pair.es.loc}" />\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${pair.en.loc}" />\n`;
    
    // Add image tags if images are present
    if (pair.en.images && pair.en.images.length > 0) {
      pair.en.images.forEach(image => {
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
    
    // Spanish URL
    xml += '  <url>\n';
    xml += `    <loc>${pair.es.loc}</loc>\n`;
    xml += `    <lastmod>${pair.es.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${pair.es.changefreq}</changefreq>\n`;
    xml += `    <priority>${pair.es.priority}</priority>\n`;
    
    // Hreflang annotations
    xml += `    <xhtml:link rel="alternate" hreflang="en" href="${pair.en.loc}" />\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="es" href="${pair.es.loc}" />\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${pair.en.loc}" />\n`;
    
    // Add image tags if images are present (same images for Spanish)
    if (pair.es.images && pair.es.images.length > 0) {
      pair.es.images.forEach(image => {
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

// Create URL pair (English + Spanish)
function createUrlPair(basePath, lastmod, changefreq, priority, images = null) {
  const enUrl = `${SITE_URL}${basePath}`;
  const esUrl = `${SITE_URL}/es${basePath}`;
  
  return {
    en: {
      loc: enUrl,
      lastmod,
      changefreq,
      priority,
      images
    },
    es: {
      loc: esUrl,
      lastmod,
      changefreq,
      priority,
      images
    }
  };
}

// Main function
async function generateSitemap() {
  try {
    const today = formatDate(new Date());
    const urlPairs = [];
    
    // 1. Home page (highest priority, changes frequently)
    urlPairs.push(createUrlPair('/', today, 'daily', '1.0'));
    
    // 2. Fetch and add all paintings
    console.log('\n🎨 Fetching all paintings...');
    const paintings = await fetchAllPaintings();
    console.log(`✅ Found ${paintings.length} paintings`);
    
    paintings.forEach(painting => {
      // Construct image URL
      let imageUrl;
      if (painting.imageUrl && !painting.imageUrl.includes('placeholder')) {
        imageUrl = painting.imageUrl;
      } else {
        const imagePath = `/coloring-images/${painting.urlKey.replace(/-/g, '_')}.png`;
        imageUrl = `${SITE_URL}${imagePath}`;
      }
      
      const images = [
        {
          loc: imageUrl,
          title: `${painting.title} - Free Coloring Page`,
          caption: painting.description || `Print and color this ${painting.title.toLowerCase()} coloring page. Free printable coloring sheet for kids.`
        }
      ];
      
      urlPairs.push(createUrlPair(
        `/painting/${painting.urlKey}`,
        painting.updatedAt ? formatDate(new Date(painting.updatedAt)) : today,
        'weekly',
        painting.featured ? '0.9' : '0.8',
        images
      ));
    });
    
    // 3. Fetch and add all category pages
    console.log('\n📂 Fetching categories...');
    const categories = await fetchCategories();
    console.log(`✅ Found ${categories.length} categories`);
    
    categories.forEach(category => {
      urlPairs.push(createUrlPair(
        `/category/${encodeURIComponent(category)}`,
        today,
        'weekly',
        '0.7'
      ));
    });
    
    // 4. Add blog pages
    const blogPages = [
      { path: '/blog', priority: '0.8', changefreq: 'weekly' },
      { path: '/blog/educational-benefits-coloring', priority: '0.7', changefreq: 'monthly' },
      { path: '/blog/coloring-child-development', priority: '0.7', changefreq: 'monthly' },
      { path: '/blog/coloring-stress-relief-kids', priority: '0.7', changefreq: 'monthly' }
    ];
    
    blogPages.forEach(page => {
      urlPairs.push(createUrlPair(
        page.path,
        today,
        page.changefreq,
        page.priority
      ));
    });
    
    // 5. Add static pages
    const staticPages = [
      { path: '/terms', priority: '0.3', changefreq: 'monthly' },
      { path: '/privacy', priority: '0.3', changefreq: 'monthly' },
      { path: '/contact', priority: '0.5', changefreq: 'monthly' },
      { path: '/copyright', priority: '0.3', changefreq: 'monthly' }
    ];
    
    staticPages.forEach(page => {
      urlPairs.push(createUrlPair(
        page.path,
        today,
        page.changefreq,
        page.priority
      ));
    });
    
    // 6. Add collection pages
    const collectionPages = [
      { path: '/top-animal-coloring-pages', priority: '0.6', changefreq: 'monthly' },
      { path: '/top-vehicle-coloring-pages', priority: '0.6', changefreq: 'monthly' },
      { path: '/best-coloring-pages-for-toddlers', priority: '0.6', changefreq: 'monthly' },
      { path: '/most-popular-coloring-pages', priority: '0.7', changefreq: 'weekly' },
      { path: '/easy-coloring-pages', priority: '0.6', changefreq: 'monthly' }
    ];
    
    collectionPages.forEach(page => {
      urlPairs.push(createUrlPair(
        page.path,
        today,
        page.changefreq,
        page.priority
      ));
    });
    
    // 7. Generate XML
    const totalUrls = urlPairs.length * 2; // Each pair has 2 URLs (en + es)
    console.log(`\n📝 Generating bilingual sitemap with ${totalUrls} URLs (${urlPairs.length} pages × 2 languages)...`);
    const xml = generateBilingualSitemapXML(urlPairs);
    
    // 8. Write to file
    fs.writeFileSync(OUTPUT_PATH, xml, 'utf8');
    console.log(`✅ Sitemap generated successfully!`);
    console.log(`📍 Location: ${OUTPUT_PATH}`);
    console.log(`📊 Total URLs: ${totalUrls}`);
    console.log(`🌍 Languages: English + Spanish`);
    console.log(`🔗 English URLs: ${urlPairs.length}`);
    console.log(`🔗 Spanish URLs: ${urlPairs.length}`);
    
  } catch (error) {
    console.error('\n❌ Error generating sitemap:', error.message);
    process.exit(1);
  }
}

// Run the generator
generateSitemap();

