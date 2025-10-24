#!/usr/bin/env node

/**
 * IndexNow Bulk Submission Script
 * 
 * Submits multiple URLs at once to IndexNow (up to 10,000 URLs per submission).
 * This is useful when you want to notify search engines about:
 * - All paintings on your site
 * - All category pages
 * - All blog posts
 * - Newly added content
 * 
 * Usage:
 *   node submit-bulk-to-indexnow.js              # Submit all URLs from sitemap
 *   node submit-bulk-to-indexnow.js paintings    # Submit only painting URLs
 *   node submit-bulk-to-indexnow.js categories   # Submit only category URLs
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Configuration
const SITE_URL = 'https://www.mycolor.fun';
const API_URL = 'https://docker-composeyaml-production.up.railway.app/api';
const INDEX_NOW_KEY = 'bab9e73ed6fabc4a3ecdd32e9282a615bde47290f24070a8a9cecdbe74e86ddf';

// Search engine to submit to (api.indexnow.org distributes to all participating engines)
const INDEX_NOW_ENDPOINT = 'api.indexnow.org';

/**
 * Fetch data from API
 */
function fetchFromApi(apiPath) {
  return new Promise((resolve, reject) => {
    const url = new URL(apiPath, API_URL);
    const protocol = url.protocol === 'https:' ? https : http;

    protocol.get(url.href, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          if (res.statusCode === 200) {
            resolve(JSON.parse(data));
          } else {
            reject(new Error(`API returned status ${res.statusCode}`));
          }
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

/**
 * Get all painting URLs
 */
async function getPaintingUrls() {
  console.log('📡 Fetching paintings from API...');
  try {
    const response = await fetchFromApi('/paintings?page=0&size=10000');
    const paintings = response.content || response;
    const urls = paintings.map(p => `${SITE_URL}/painting/${p.urlKey}`);
    
    // Add Spanish versions
    const spanishUrls = paintings.map(p => `${SITE_URL}/es/painting/${p.urlKey}`);
    
    return [...urls, ...spanishUrls];
  } catch (error) {
    console.error('❌ Error fetching paintings:', error.message);
    return [];
  }
}

/**
 * Get all category URLs
 */
async function getCategoryUrls() {
  console.log('📡 Fetching categories from API...');
  try {
    const categories = await fetchFromApi('/paintings/categories');
    const urls = categories.map(cat => `${SITE_URL}/category/${cat.toLowerCase().replace(/ /g, '-')}`);
    
    // Add Spanish versions
    const spanishUrls = categories.map(cat => `${SITE_URL}/es/category/${cat.toLowerCase().replace(/ /g, '-')}`);
    
    return [...urls, ...spanishUrls];
  } catch (error) {
    console.error('❌ Error fetching categories:', error.message);
    return [];
  }
}

/**
 * Get static page URLs
 */
function getStaticUrls() {
  const staticPages = [
    '/',
    '/categories',
    '/popular',
    '/random',
    '/best-for-toddlers',
    '/easy-coloring',
    '/top-animals',
    '/top-vehicles',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
    '/copyright',
    // Spanish versions
    '/es',
    '/es/categories',
    '/es/popular',
    '/es/random',
    '/es/best-for-toddlers',
    '/es/easy-coloring',
    '/es/top-animals',
    '/es/top-vehicles',
    '/es/contact',
    '/es/privacy-policy',
    '/es/terms-of-service',
    '/es/copyright',
  ];
  
  return staticPages.map(page => `${SITE_URL}${page}`);
}

/**
 * Submit URLs to IndexNow
 */
function submitToIndexNow(urls) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      host: SITE_URL.replace('https://', '').replace('http://', ''),
      key: INDEX_NOW_KEY,
      urlList: urls.slice(0, 10000) // Max 10,000 URLs per submission
    });

    const options = {
      hostname: INDEX_NOW_ENDPOINT,
      port: 443,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload),
        'User-Agent': 'Mozilla/5.0 (compatible; IndexNowBot/1.0)'
      }
    };

    console.log(`\n📤 Submitting ${urls.length} URLs to IndexNow...`);

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`✅ Success: HTTP ${res.statusCode}`);
          console.log('   All URLs submitted successfully!');
          resolve({ success: true, status: res.statusCode });
        } else if (res.statusCode === 202) {
          console.log(`⏳ Accepted: HTTP ${res.statusCode}`);
          console.log('   URLs received, validation pending.');
          resolve({ success: true, status: res.statusCode });
        } else {
          console.log(`⚠️  Warning: HTTP ${res.statusCode}`);
          console.log(`   Response: ${data || 'No message'}`);
          resolve({ success: false, status: res.statusCode, message: data });
        }
      });
    });

    req.on('error', (error) => {
      console.error(`❌ Error submitting to IndexNow:`, error.message);
      reject(error);
    });

    req.write(payload);
    req.end();
  });
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  const mode = args[0] || 'all';

  console.log('🔔 IndexNow Bulk URL Submission');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`🌐 Site: ${SITE_URL}`);
  console.log(`🔑 Key: ${INDEX_NOW_KEY.substring(0, 16)}...`);
  console.log(`📋 Mode: ${mode}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  let urls = [];

  switch (mode) {
    case 'paintings':
      urls = await getPaintingUrls();
      break;
    
    case 'categories':
      urls = await getCategoryUrls();
      break;
    
    case 'static':
      urls = getStaticUrls();
      break;
    
    case 'all':
    default:
      console.log('📚 Collecting all URLs...\n');
      const [paintingUrls, categoryUrls, staticUrls] = await Promise.all([
        getPaintingUrls(),
        getCategoryUrls(),
        Promise.resolve(getStaticUrls())
      ]);
      urls = [...paintingUrls, ...categoryUrls, ...staticUrls];
      break;
  }

  if (urls.length === 0) {
    console.error('❌ No URLs to submit');
    process.exit(1);
  }

  console.log(`\n📊 URL Summary:`);
  console.log(`   Total URLs: ${urls.length}`);
  
  if (urls.length > 10000) {
    console.log(`   ⚠️  Note: IndexNow accepts max 10,000 URLs per request`);
    console.log(`   Will submit first 10,000 URLs`);
  }

  // Submit to IndexNow
  try {
    const result = await submitToIndexNow(urls);
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 Final Summary:');
    console.log(`   URLs submitted: ${Math.min(urls.length, 10000)}`);
    console.log(`   Status: ${result.success ? '✅ Success' : '❌ Failed'}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
    if (result.success) {
      console.log('\n✨ Bulk submission completed! Search engines will be notified.');
      console.log('   Note: It may take a few hours for search engines to process the URLs.');
    }
    
  } catch (error) {
    console.error('\n❌ Submission failed:', error.message);
    process.exit(1);
  }
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

