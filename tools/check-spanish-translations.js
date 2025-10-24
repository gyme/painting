#!/usr/bin/env node

/**
 * Check which food paintings are missing Spanish translations
 */

const http = require('http');

const foodUrlKeys = [
  'apple', 'banana', 'bread', 'broccoli', 'carrot', 'cheese', 'corn',
  'cupcake', 'donuts', 'fries', 'grapes', 'hamburger', 'hotdog',
  'ice-cream', 'pineapple', 'pizza', 'sushi', 'tortilla', 'watermelon'
];

function getPainting(urlKey) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 8080,
      path: `/api/paintings/${urlKey}`,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          resolve(null);
        }
      });
    });

    req.on('error', () => resolve(null));
    req.end();
  });
}

async function main() {
  console.log('🔍 Checking Spanish Translations for Food Paintings');
  console.log('='.repeat(70));
  console.log();

  const missing = [];
  const present = [];

  for (const urlKey of foodUrlKeys) {
    const painting = await getPainting(urlKey);
    
    if (painting) {
      const hasSpanish = painting.titleEs && painting.descriptionEs;
      const status = hasSpanish ? '✅' : '❌';
      
      console.log(`${status} ${painting.title.padEnd(20)} → ${hasSpanish ? painting.titleEs : 'MISSING'}`);
      
      if (!hasSpanish) {
        missing.push({ urlKey, title: painting.title });
      } else {
        present.push({ urlKey, title: painting.title, titleEs: painting.titleEs });
      }
    } else {
      console.log(`❓ ${urlKey.padEnd(20)} → NOT FOUND`);
      missing.push({ urlKey, title: urlKey });
    }
    
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  console.log();
  console.log('='.repeat(70));
  console.log('📊 Summary:');
  console.log(`   ✅ With Spanish: ${present.length}/${foodUrlKeys.length}`);
  console.log(`   ❌ Missing Spanish: ${missing.length}/${foodUrlKeys.length}`);
  
  if (missing.length > 0) {
    console.log();
    console.log('❌ Paintings missing Spanish translations:');
    missing.forEach(p => {
      console.log(`   - ${p.title || p.urlKey} (${p.urlKey})`);
    });
  }
  
  console.log();
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

