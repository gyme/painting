#!/usr/bin/env node

/**
 * Bilingual Split Sitemap Generator for Kids Painting Website
 * 
 * Generates 3 files with FULL bilingual support (English + Spanish):
 * 1. sitemap.xml - Regular pages with hreflang (home, categories, static pages)
 * 2. image-sitemap.xml - All painting pages with image data and hreflang
 * 3. sitemap-index.xml - Index file pointing to both sitemaps
 * 
 * Usage: node generate-sitemaps-split.js
 * Output: public/sitemap.xml, public/image-sitemap.xml, public/sitemap-index.xml
 */

const fs = require('fs');
const path = require('path');

// Configuration
const SITE_URL = process.env.SITE_URL || 'https://www.mycolor.fun';
const OUTPUT_DIR = path.join(__dirname, 'public');
const REGULAR_SITEMAP = path.join(OUTPUT_DIR, 'sitemap.xml');
const IMAGE_SITEMAP = path.join(OUTPUT_DIR, 'image-sitemap.xml');
const INDEX_SITEMAP = path.join(OUTPUT_DIR, 'sitemap-index.xml');

console.log('🗺️  Generating bilingual split sitemaps for:', SITE_URL);
console.log('🌍 Languages: English (en) + Spanish (es)');
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
function extractCategories() {
  const categories = [
    'Animals',
    'Vehicles',
    'Characters',
    'Nature',
    'Fantasy',
    'Mandalas',
    'Sports',
    'Holidays',
    'Dinosaurs',
    'Fairy Tales',
    'Food',
    'Space',
    'Ocean',
    'Italian Brainrot'
  ];
  
  return categories;
}

// Format date to W3C format with timezone (ISO 8601)
function formatDate(date) {
  return date.toISOString();
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

// Generate regular sitemap with bilingual support
function generateRegularSitemap(urls) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  
  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    
    // Add hreflang links for bilingual pages
    if (url.hreflang) {
      Object.entries(url.hreflang).forEach(([lang, href]) => {
        xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}"/>\n`;
      });
    }
    
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
}

// Generate image sitemap with bilingual support
function generateImageSitemap(urls) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n';
  xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  
  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    
    // Add hreflang links for bilingual pages
    if (url.hreflang) {
      Object.entries(url.hreflang).forEach(([lang, href]) => {
        xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}"/>\n`;
      });
    }
    
    // Add image tags
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

// Generate sitemap index
function generateSitemapIndex(sitemaps) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  sitemaps.forEach(sitemap => {
    xml += '  <sitemap>\n';
    xml += `    <loc>${sitemap.loc}</loc>\n`;
    xml += `    <lastmod>${sitemap.lastmod}</lastmod>\n`;
    xml += '  </sitemap>\n';
  });
  
  xml += '</sitemapindex>';
  
  return xml;
}

// Main function
function generateSitemaps() {
  try {
    const today = formatDate(new Date());
    const regularUrls = [];
    const imageUrls = [];
    
    // 1. Home page (English + Spanish)
    regularUrls.push({
      loc: SITE_URL + '/',
      lastmod: today,
      changefreq: 'daily',
      priority: '1.0',
      hreflang: {
        'en': SITE_URL + '/',
        'es': SITE_URL + '/es',
        'x-default': SITE_URL + '/'
      }
    });
    regularUrls.push({
      loc: SITE_URL + '/es',
      lastmod: today,
      changefreq: 'daily',
      priority: '1.0',
      hreflang: {
        'en': SITE_URL + '/',
        'es': SITE_URL + '/es',
        'x-default': SITE_URL + '/'
      }
    });
    
    // 2. Get all paintings and add to image sitemap (English + Spanish)
    console.log('\n🎨 Reading local painting data...');
    const paintings = extractPaintingsFromLocalData();
    console.log(`✅ Found ${paintings.length} paintings in local data`);
    
    paintings.forEach(painting => {
      // Get the image path for this painting
      const imagePath = `/coloring-images/${painting.urlKey.replace(/-/g, '_')}.png`;
      const imageUrl = `${SITE_URL}${imagePath}`;
      
      // English version
      imageUrls.push({
        loc: `${SITE_URL}/painting/${painting.urlKey}`,
        lastmod: today,
        changefreq: 'weekly',
        priority: '0.8',
        hreflang: {
          'en': `${SITE_URL}/painting/${painting.urlKey}`,
          'es': `${SITE_URL}/es/painting/${painting.urlKey}`,
          'x-default': `${SITE_URL}/painting/${painting.urlKey}`
        },
        images: [
          {
            loc: imageUrl,
            title: `${painting.title} - Free Coloring Page`,
            caption: `Print and color this ${painting.title.toLowerCase()} coloring page. Free printable coloring sheet for kids.`
          }
        ]
      });
      
      // Spanish version
      imageUrls.push({
        loc: `${SITE_URL}/es/painting/${painting.urlKey}`,
        lastmod: today,
        changefreq: 'weekly',
        priority: '0.8',
        hreflang: {
          'en': `${SITE_URL}/painting/${painting.urlKey}`,
          'es': `${SITE_URL}/es/painting/${painting.urlKey}`,
          'x-default': `${SITE_URL}/painting/${painting.urlKey}`
        },
        images: [
          {
            loc: imageUrl,
            title: `${painting.title} - Página para Colorear Gratis`,
            caption: `Imprime y colorea esta página para colorear de ${painting.title.toLowerCase()}. Hoja para colorear imprimible gratuita para niños.`
          }
        ]
      });
    });
    
    // 3. Add all category pages to regular sitemap (English + Spanish)
    console.log('\n📂 Adding categories...');
    const categories = extractCategories();
    console.log(`✅ Found ${categories.length} categories`);
    
    categories.forEach(category => {
      // Replace spaces with underscores for URLs
      const categoryUrl = category.replace(/ /g, '_');
      
      // English version
      regularUrls.push({
        loc: `${SITE_URL}/category/${categoryUrl}`,
        lastmod: today,
        changefreq: 'weekly',
        priority: '0.8',
        hreflang: {
          'en': `${SITE_URL}/category/${categoryUrl}`,
          'es': `${SITE_URL}/es/category/${categoryUrl}`,
          'x-default': `${SITE_URL}/category/${categoryUrl}`
        }
      });
      
      // Spanish version
      regularUrls.push({
        loc: `${SITE_URL}/es/category/${categoryUrl}`,
        lastmod: today,
        changefreq: 'weekly',
        priority: '0.8',
        hreflang: {
          'en': `${SITE_URL}/category/${categoryUrl}`,
          'es': `${SITE_URL}/es/category/${categoryUrl}`,
          'x-default': `${SITE_URL}/category/${categoryUrl}`
        }
      });
    });
    
    // 4. Add blog pages to regular sitemap (English + Spanish)
    const blogPages = [
      { path: '/blog', priority: '0.8', changefreq: 'weekly' },
      { path: '/blog/educational-benefits-coloring', priority: '0.7', changefreq: 'monthly' },
      { path: '/blog/coloring-child-development', priority: '0.7', changefreq: 'monthly' },
      { path: '/blog/coloring-stress-relief-kids', priority: '0.7', changefreq: 'monthly' },
      { path: '/blog/coloring-pages-by-age', priority: '0.7', changefreq: 'monthly' },
      { path: '/blog/homeschool-coloring-activities', priority: '0.7', changefreq: 'monthly' },
      { path: '/blog/fine-motor-skills-development', priority: '0.7', changefreq: 'monthly' },
      { path: '/blog/printable-coloring-pages-guide', priority: '0.7', changefreq: 'monthly' },
      { path: '/blog/seasonal-coloring-activities', priority: '0.7', changefreq: 'monthly' },
      { path: '/blog/color-theory-for-kids', priority: '0.7', changefreq: 'monthly' },
      { path: '/blog/screen-free-activities', priority: '0.7', changefreq: 'monthly' },
      { path: '/blog/mindful-coloring-meditation', priority: '0.7', changefreq: 'monthly' },
      { path: '/blog/party-activities-coloring', priority: '0.7', changefreq: 'monthly' }
    ];
    
    console.log('\n📝 Adding blog pages...');
    blogPages.forEach(page => {
      // English version
      regularUrls.push({
        loc: `${SITE_URL}${page.path}`,
        lastmod: today,
        changefreq: page.changefreq,
        priority: page.priority,
        hreflang: {
          'en': `${SITE_URL}${page.path}`,
          'es': `${SITE_URL}/es${page.path}`,
          'x-default': `${SITE_URL}${page.path}`
        }
      });
      
      // Spanish version
      regularUrls.push({
        loc: `${SITE_URL}/es${page.path}`,
        lastmod: today,
        changefreq: page.changefreq,
        priority: page.priority,
        hreflang: {
          'en': `${SITE_URL}${page.path}`,
          'es': `${SITE_URL}/es${page.path}`,
          'x-default': `${SITE_URL}${page.path}`
        }
      });
    });
    console.log(`✅ Added ${blogPages.length * 2} blog pages (EN + ES)`);
    
    // 4b. Add collection/listicle pages to regular sitemap (English + Spanish)
    const collectionPages = [
      { path: '/top-animal-coloring-pages', priority: '0.8', changefreq: 'monthly' },
      { path: '/top-vehicle-coloring-pages', priority: '0.8', changefreq: 'monthly' },
      { path: '/best-coloring-pages-for-toddlers', priority: '0.8', changefreq: 'monthly' },
      { path: '/most-popular-coloring-pages', priority: '0.9', changefreq: 'weekly' },
      { path: '/easy-coloring-pages', priority: '0.8', changefreq: 'monthly' }
    ];
    
    console.log('\n📄 Adding collection pages...');
    collectionPages.forEach(page => {
      // English version
      regularUrls.push({
        loc: `${SITE_URL}${page.path}`,
        lastmod: today,
        changefreq: page.changefreq,
        priority: page.priority,
        hreflang: {
          'en': `${SITE_URL}${page.path}`,
          'es': `${SITE_URL}/es${page.path}`,
          'x-default': `${SITE_URL}${page.path}`
        }
      });
      
      // Spanish version
      regularUrls.push({
        loc: `${SITE_URL}/es${page.path}`,
        lastmod: today,
        changefreq: page.changefreq,
        priority: page.priority,
        hreflang: {
          'en': `${SITE_URL}${page.path}`,
          'es': `${SITE_URL}/es${page.path}`,
          'x-default': `${SITE_URL}${page.path}`
        }
      });
    });
    console.log(`✅ Added ${collectionPages.length * 2} collection pages (EN + ES)`);
    
    // 5. Add static pages to regular sitemap (English + Spanish)
    const staticPages = [
      { path: '/terms', priority: '0.3', changefreq: 'monthly' },
      { path: '/privacy', priority: '0.3', changefreq: 'monthly' },
      { path: '/contact', priority: '0.5', changefreq: 'monthly' }
    ];
    
    staticPages.forEach(page => {
      // English version
      regularUrls.push({
        loc: `${SITE_URL}${page.path}`,
        lastmod: today,
        changefreq: page.changefreq,
        priority: page.priority,
        hreflang: {
          'en': `${SITE_URL}${page.path}`,
          'es': `${SITE_URL}/es${page.path}`,
          'x-default': `${SITE_URL}${page.path}`
        }
      });
      
      // Spanish version
      regularUrls.push({
        loc: `${SITE_URL}/es${page.path}`,
        lastmod: today,
        changefreq: page.changefreq,
        priority: page.priority,
        hreflang: {
          'en': `${SITE_URL}${page.path}`,
          'es': `${SITE_URL}/es${page.path}`,
          'x-default': `${SITE_URL}${page.path}`
        }
      });
    });
    
    // 6. Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
    
    // 7. Generate and write regular sitemap
    console.log(`\n📝 Generating regular sitemap with ${regularUrls.length} URLs...`);
    const regularXml = generateRegularSitemap(regularUrls);
    fs.writeFileSync(REGULAR_SITEMAP, regularXml, 'utf8');
    console.log(`✅ Regular sitemap: ${REGULAR_SITEMAP}`);
    
    // 8. Generate and write image sitemap
    console.log(`\n📝 Generating image sitemap with ${imageUrls.length} URLs...`);
    const imageXml = generateImageSitemap(imageUrls);
    fs.writeFileSync(IMAGE_SITEMAP, imageXml, 'utf8');
    console.log(`✅ Image sitemap: ${IMAGE_SITEMAP}`);
    
    // 9. Generate and write sitemap index
    console.log(`\n📝 Generating sitemap index...`);
    const indexXml = generateSitemapIndex([
      {
        loc: `${SITE_URL}/sitemap.xml`,
        lastmod: today
      },
      {
        loc: `${SITE_URL}/image-sitemap.xml`,
        lastmod: today
      }
    ]);
    fs.writeFileSync(INDEX_SITEMAP, indexXml, 'utf8');
    console.log(`✅ Sitemap index: ${INDEX_SITEMAP}`);
    
    // 10. Summary
    const enUrls = regularUrls.filter(u => !u.loc.includes('/es')).length;
    const esUrls = regularUrls.filter(u => u.loc.includes('/es')).length;
    const enPaintings = imageUrls.filter(u => !u.loc.includes('/es')).length;
    const esPaintings = imageUrls.filter(u => u.loc.includes('/es')).length;
    
    console.log(`\n✅ All sitemaps generated successfully!`);
    console.log(`\n📊 Summary:`);
    console.log(`   📄 Regular sitemap: ${regularUrls.length} URLs total`);
    console.log(`      - English URLs: ${enUrls}`);
    console.log(`      - Spanish URLs: ${esUrls}`);
    console.log(`   🖼️  Image sitemap: ${imageUrls.length} URLs total (with images)`);
    console.log(`      - English paintings: ${enPaintings}`);
    console.log(`      - Spanish paintings: ${esPaintings}`);
    console.log(`   📇 Sitemap index: 2 sitemaps`);
    console.log(`\n🔗 Submit to Google Search Console:`);
    console.log(`   ${SITE_URL}/sitemap-index.xml`);
    console.log(`\n💡 Individual sitemaps:`);
    console.log(`   ${SITE_URL}/sitemap.xml (regular pages)`);
    console.log(`   ${SITE_URL}/image-sitemap.xml (images)`);
    console.log(`\n🌍 All pages include hreflang tags for bilingual SEO!`);
    
  } catch (error) {
    console.error('\n❌ Error generating sitemaps:', error);
    process.exit(1);
  }
}

// Run the script
generateSitemaps();
