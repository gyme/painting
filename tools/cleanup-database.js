#!/usr/bin/env node

/**
 * Database Cleanup Tool
 * 
 * Removes database entries that don't have corresponding image files.
 * Keeps only paintings with actual images.
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const API_BASE_URL = process.env.API_URL || 'http://localhost:8080/api/paintings';
const IMAGES_DIR = path.join(__dirname, '../frontend/public/coloring-images');

async function getAllPaintings() {
  return new Promise((resolve, reject) => {
    const url = new URL(API_BASE_URL);
    url.searchParams.append('size', '1000'); // Get all paintings
    
    const client = url.protocol === 'https:' ? https : http;
    
    client.get(url.toString(), (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve(response.content || []);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

async function deletePainting(id) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${API_BASE_URL}/${id}`);
    
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname,
      method: 'DELETE'
    };
    
    const client = url.protocol === 'https:' ? https : http;
    
    const req = client.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(true);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.end();
  });
}

function imageFileExists(imageUrl) {
  // Extract filename from URL
  const filename = imageUrl.split('/').pop();
  const filePath = path.join(IMAGES_DIR, filename);
  
  // Check if file exists
  return fs.existsSync(filePath);
}

async function main() {
  console.log('\n🧹 Database Cleanup Tool\n');
  console.log('═'.repeat(60));
  
  try {
    // Get all paintings from database
    console.log('\n📊 Fetching all paintings from database...');
    const paintings = await getAllPaintings();
    
    console.log(`✅ Found ${paintings.length} paintings in database\n`);
    
    // Check which ones have images
    const paintingsToDelete = [];
    const paintingsToKeep = [];
    
    for (const painting of paintings) {
      const hasImage = imageFileExists(painting.imageUrl);
      
      if (hasImage) {
        paintingsToKeep.push(painting);
      } else {
        paintingsToDelete.push(painting);
      }
    }
    
    console.log('📋 Analysis:\n');
    console.log(`   ✅ Paintings with images: ${paintingsToKeep.length}`);
    console.log(`   ❌ Paintings without images: ${paintingsToDelete.length}\n`);
    
    if (paintingsToDelete.length === 0) {
      console.log('🎉 Database is clean! No entries to remove.\n');
      return;
    }
    
    console.log('─'.repeat(60));
    console.log('\n🗑️  Paintings to be removed:\n');
    
    paintingsToDelete.forEach((painting, index) => {
      console.log(`   ${index + 1}. ${painting.title} (${painting.urlKey})`);
      console.log(`      Missing: ${painting.imageUrl}`);
    });
    
    console.log('\n' + '─'.repeat(60));
    
    // Ask for confirmation
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    const answer = await new Promise(resolve => {
      rl.question(`\n⚠️  Delete ${paintingsToDelete.length} entries? (y/n) `, resolve);
    });
    rl.close();
    
    if (answer.toLowerCase() !== 'y') {
      console.log('\n❌ Cancelled. No changes made.\n');
      return;
    }
    
    console.log('\n🚀 Deleting entries...\n');
    
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < paintingsToDelete.length; i++) {
      const painting = paintingsToDelete[i];
      process.stdout.write(`   [${i + 1}/${paintingsToDelete.length}] Deleting "${painting.title}"... `);
      
      try {
        await deletePainting(painting.id);
        console.log('✅');
        successCount++;
      } catch (error) {
        console.log(`❌ ${error.message}`);
        errorCount++;
      }
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('\n' + '═'.repeat(60));
    console.log('\n✅ Cleanup complete!\n');
    console.log('📊 Summary:\n');
    console.log(`   • Deleted: ${successCount}`);
    console.log(`   • Errors: ${errorCount}`);
    console.log(`   • Remaining: ${paintingsToKeep.length}`);
    console.log('\n🎉 Database now contains only paintings with actual images!\n');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

main().catch(console.error);
