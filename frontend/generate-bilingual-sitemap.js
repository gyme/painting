#!/usr/bin/env node

/**
 * Comprehensive Bilingual Sitemap Generator
 * Generates sitemap with English and Spanish URLs with hreflang tags
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.mycolor.fun';
const OUTPUT_PATH = path.join(__dirname, 'public', 'sitemap.xml');
const today = new Date().toISOString().split('T')[0];

console.log('🗺️  Generating comprehensive bilingual sitemap...');
console.log('🌍 English (default) + Spanish (/es/)');

// Define all pages
const pages = [
  // Home
  { path: '/', priority: '1.0', changefreq: 'daily' },
  
  // Categories
  { path: '/category/Animals', priority: '0.8', changefreq: 'weekly' },
  { path: '/category/Vehicles', priority: '0.8', changefreq: 'weekly' },
  { path: '/category/Characters', priority: '0.8', changefreq: 'weekly' },
  { path: '/category/Nature', priority: '0.8', changefreq: 'weekly' },
  { path: '/category/Fantasy', priority: '0.8', changefreq: 'weekly' },
  { path: '/category/Mandalas', priority: '0.8', changefreq: 'weekly' },
  { path: '/category/Sports', priority: '0.8', changefreq: 'weekly' },
  { path: '/category/Dinosaurs', priority: '0.8', changefreq: 'weekly' },
  
  // Blog
  { path: '/blog', priority: '0.7', changefreq: 'weekly' },
  { path: '/blog/educational-benefits-coloring', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/coloring-child-development', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/coloring-stress-relief-kids', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/coloring-pages-by-age', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/homeschool-coloring-activities', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/fine-motor-skills-development', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/printable-coloring-pages-guide', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/seasonal-coloring-activities', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/color-theory-for-kids', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/screen-free-activities', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/mindful-coloring-meditation', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/party-activities-coloring', priority: '0.6', changefreq: 'monthly' },
  
  // Collection pages
  { path: '/top-animal-coloring-pages', priority: '0.7', changefreq: 'weekly' },
  { path: '/top-vehicle-coloring-pages', priority: '0.7', changefreq: 'weekly' },
  { path: '/best-coloring-pages-for-toddlers', priority: '0.7', changefreq: 'weekly' },
  { path: '/most-popular-coloring-pages', priority: '0.7', changefreq: 'weekly' },
  { path: '/easy-coloring-pages', priority: '0.7', changefreq: 'weekly' },
  
  // Static pages
  { path: '/random', priority: '0.6', changefreq: 'daily' },
  { path: '/contact', priority: '0.4', changefreq: 'monthly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
];

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

// Generate entries for each page in both languages
pages.forEach(page => {
  const enUrl = `${SITE_URL}${page.path}`;
  const esPath = page.path === '/' ? '/es' : `/es${page.path}`;
  const esUrl = `${SITE_URL}${esPath}`;
  
  // English version
  xml += '  <url>\n';
  xml += `    <loc>${enUrl}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
  xml += `    <priority>${page.priority}</priority>\n`;
  xml += `    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>\n`;
  xml += `    <xhtml:link rel="alternate" hreflang="es" href="${esUrl}"/>\n`;
  xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}"/>\n`;
  xml += '  </url>\n';
  
  // Spanish version
  xml += '  <url>\n';
  xml += `    <loc>${esUrl}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
  xml += `    <priority>${page.priority}</priority>\n`;
  xml += `    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}"/>\n`;
  xml += `    <xhtml:link rel="alternate" hreflang="es" href="${esUrl}"/>\n`;
  xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}"/>\n`;
  xml += '  </url>\n';
});

xml += '</urlset>';

// Write sitemap
fs.writeFileSync(OUTPUT_PATH, xml, 'utf8');

const totalPages = pages.length;
const totalUrls = totalPages * 2; // English + Spanish

console.log('✅ Bilingual sitemap generated successfully!');
console.log(`📊 Total pages: ${totalPages}`);
console.log(`📊 Total URLs: ${totalUrls} (${totalPages} × 2 languages)`);
console.log(`🔗 English URLs: ${totalPages}`);
console.log(`🔗 Spanish URLs: ${totalPages}`);
console.log(`📍 Location: ${OUTPUT_PATH}`);
console.log('\n🌐 Hreflang tags included for proper international SEO');
console.log('🚀 Ready to deploy!');

