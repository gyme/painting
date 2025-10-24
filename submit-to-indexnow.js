#!/usr/bin/env node

/**
 * IndexNow Submission Script
 * 
 * Submits a single URL to IndexNow to notify search engines of content changes.
 * Supports multiple search engines: Bing, Yandex, Seznam, etc.
 * 
 * Usage: 
 *   node submit-to-indexnow.js https://painting-sand.vercel.app/painting/unicorn
 *   node submit-to-indexnow.js https://painting-sand.vercel.app/category/animals
 */

const https = require('https');
const url = require('url');

// Configuration
const SITE_URL = 'https://www.mycolor.fun';
const INDEX_NOW_KEY = 'bab9e73ed6fabc4a3ecdd32e9282a615bde47290f24070a8a9cecdbe74e86ddf';

// IndexNow endpoints (choose one or submit to multiple)
const SEARCH_ENGINES = [
  'www.bing.com',           // Bing (Microsoft)
  'api.indexnow.org',       // IndexNow API (submits to all participating engines)
  // 'yandex.com',          // Yandex (uncomment if needed)
  // 'search.seznam.cz',    // Seznam (uncomment if needed)
];

/**
 * Submit a single URL to IndexNow
 */
function submitUrlToIndexNow(targetUrl, searchEngine) {
  return new Promise((resolve, reject) => {
    const encodedUrl = encodeURIComponent(targetUrl);
    const path = `/indexnow?url=${encodedUrl}&key=${INDEX_NOW_KEY}`;
    
    const options = {
      hostname: searchEngine,
      port: 443,
      path: path,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; IndexNowBot/1.0)'
      }
    };

    console.log(`📤 Submitting to ${searchEngine}...`);

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`✅ Success (${searchEngine}): HTTP ${res.statusCode}`);
          resolve({ engine: searchEngine, status: res.statusCode, success: true });
        } else if (res.statusCode === 202) {
          console.log(`⏳ Accepted (${searchEngine}): HTTP ${res.statusCode} - Validation pending`);
          resolve({ engine: searchEngine, status: res.statusCode, success: true });
        } else {
          console.log(`⚠️  Warning (${searchEngine}): HTTP ${res.statusCode} - ${data || 'No message'}`);
          resolve({ engine: searchEngine, status: res.statusCode, success: false, message: data });
        }
      });
    });

    req.on('error', (error) => {
      console.error(`❌ Error (${searchEngine}):`, error.message);
      reject({ engine: searchEngine, error: error.message });
    });

    req.end();
  });
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('❌ Error: Please provide a URL to submit');
    console.log('\nUsage:');
    console.log('  node submit-to-indexnow.js <URL>');
    console.log('\nExamples:');
    console.log('  node submit-to-indexnow.js https://painting-sand.vercel.app/');
    console.log('  node submit-to-indexnow.js https://painting-sand.vercel.app/painting/unicorn');
    console.log('  node submit-to-indexnow.js https://painting-sand.vercel.app/category/animals');
    process.exit(1);
  }

  const targetUrl = args[0];

  // Validate URL
  try {
    const parsedUrl = new URL(targetUrl);
    if (!targetUrl.startsWith(SITE_URL)) {
      console.warn(`⚠️  Warning: URL doesn't match site domain (${SITE_URL})`);
      console.warn('   Continuing anyway...\n');
    }
  } catch (error) {
    console.error('❌ Error: Invalid URL format');
    process.exit(1);
  }

  console.log('🔔 IndexNow URL Submission');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📍 URL: ${targetUrl}`);
  console.log(`🔑 Key: ${INDEX_NOW_KEY.substring(0, 16)}...`);
  console.log(`🌐 Engines: ${SEARCH_ENGINES.length}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Submit to all search engines
  const results = await Promise.allSettled(
    SEARCH_ENGINES.map(engine => submitUrlToIndexNow(targetUrl, engine))
  );

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 Summary:');
  
  let successCount = 0;
  let failureCount = 0;

  results.forEach(result => {
    if (result.status === 'fulfilled' && result.value.success) {
      successCount++;
    } else {
      failureCount++;
    }
  });

  console.log(`✅ Successful: ${successCount}/${SEARCH_ENGINES.length}`);
  console.log(`❌ Failed: ${failureCount}/${SEARCH_ENGINES.length}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  if (successCount > 0) {
    console.log('\n✨ URL submitted successfully! Search engines will be notified of the update.');
  }
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});

