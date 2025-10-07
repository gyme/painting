#!/usr/bin/env node

/**
 * Delete paintings that don't have actual image files
 */

const http = require('http');

const paintingsToDelete = [
  { id: 106, title: 'cute-dragon' },
  { id: 108, title: 'cute-pig' },
  { id: 111, title: 'fox' }
];

function deletePainting(id, title) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 8080,
      path: `/api/paintings/${id}`,
      method: 'DELETE'
    };

    const req = http.request(options, (res) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        console.log(`✅ Deleted: ${title} (ID: ${id})`);
        resolve();
      } else {
        console.log(`❌ Failed to delete: ${title} (ID: ${id}) - Status: ${res.statusCode}`);
        reject(new Error(`HTTP ${res.statusCode}`));
      }
    });

    req.on('error', (error) => {
      console.log(`❌ Error deleting ${title}: ${error.message}`);
      reject(error);
    });

    req.end();
  });
}

async function deleteAll() {
  console.log(`\n🗑️  Deleting ${paintingsToDelete.length} paintings without image files...\n`);
  
  let success = 0;
  let failed = 0;
  
  for (const painting of paintingsToDelete) {
    try {
      await deletePainting(painting.id, painting.title);
      success++;
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      failed++;
    }
  }
  
  console.log(`\n✨ Complete! ${success} deleted, ${failed} failed\n`);
}

deleteAll().catch(console.error);
