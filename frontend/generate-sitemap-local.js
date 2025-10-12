#!/usr/bin/env node

/**
 * Sitemap Generator for Kids Painting Website (Local Fallback Version)
 * 
 * This script generates a sitemap.xml file using local data when API is unavailable
 * It reads from coloringImages.ts to get all available paintings
 * 
 * Usage: node generate-sitemap-local.js
 * Output: public/sitemap.xml
 */

const fs = require('fs');
const path = require('path');

// Configuration
const SITE_URL = process.env.SITE_URL || 'https://www.mycolor.fun';
const OUTPUT_PATH = path.join(__dirname, 'public', 'sitemap.xml');

console.log('🗺️  Generating sitemap for:', SITE_URL);
console.log('📁 Using local data from coloringImages.ts');

// Read coloringImages.ts to extract painting keys
function extractPaintingsFromLocalData() {
  const coloringImagesPath = path.join(__dirname, 'src', 'utils', 'coloringImages.ts');
  
  if (!fs.existsSync(coloringImagesPath)) {
    console.error('❌ Could not find coloringImages.ts');
    return [];
  }
  
  const content = fs.readFileSync(coloringImagesPath, 'utf8');
  
  // Extract painting keys from the object
  const keyRegex = /'([^']+)':\s*'\/coloring-images\//g;
  const paintings = [];
  let match;
  
  while ((match = keyRegex.exec(content)) !== null) {
    const key = match[1];
    if (key !== 'default') {
      paintings.push({
        urlKey: key,
        title: key.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      });
    }
  }
  
  return paintings;
}

// Extract categories from paintings
function extractCategories(paintings) {
  // Define categories based on our known data
  const categories = [
    'Animals',
    'Vehicles',
    'Characters',
    'Nature',
    'Fantasy',
    'Mandalas',
    'Sports',
    'Holidays'
  ];
  
  return categories;
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
function generateSitemap() {
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
    
    // 2. Get all paintings from local data
    console.log('\n🎨 Reading local painting data...');
    const paintings = extractPaintingsFromLocalData();
    console.log(`✅ Found ${paintings.length} paintings in local data`);
    
    paintings.forEach(painting => {
      // Get the image path for this painting
      const imagePath = `/coloring-images/${painting.urlKey.replace(/-/g, '_')}.png`;
      const imageUrl = `${SITE_URL}${imagePath}`;
      
      urls.push({
        loc: `${SITE_URL}/painting/${painting.urlKey}`,
        lastmod: today,
        changefreq: 'weekly',
        priority: '0.8',
        images: [
          {
            loc: imageUrl,
            title: `${painting.title} - Free Coloring Page`,
            caption: `Print and color this ${painting.title.toLowerCase()} coloring page. Free printable coloring sheet for kids.`
          }
        ]
      });
    });
    
    // 3. Add all category pages
    console.log('\n📂 Adding categories...');
    const categories = extractCategories(paintings);
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
    console.log(`\n💡 Tip: Run 'node generate-sitemap.js' when backend is running for complete data`);
    
  } catch (error) {
    console.error('\n❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run the script
generateSitemap();

