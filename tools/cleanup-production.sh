#!/bin/bash

# 🗑️ Cleanup Production Database
# This script removes paintings that don't have corresponding image files

set -e

echo "🗑️  Cleanup Production Database"
echo "========================================"
echo ""

# Get production backend URL
read -p "Enter your BACKEND URL (e.g., https://your-backend.onrender.com): " BACKEND_URL

# Remove trailing slash if present
BACKEND_URL=${BACKEND_URL%/}

# Validate URL
if [[ ! $BACKEND_URL =~ ^https?:// ]]; then
    echo "❌ Invalid URL format. Must start with http:// or https://"
    exit 1
fi

echo ""
echo "⚠️  WARNING: This will delete database entries that don't have image files!"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cleanup cancelled."
    exit 0
fi

echo ""
echo "🧹 Running cleanup..."
echo ""

# Create temporary Node.js script for production cleanup
cat > /tmp/cleanup-prod.js << 'CLEANUP_SCRIPT'
const axios = require('axios');
const path = require('path');
const fs = require('fs');

const API_URL = process.env.API_URL || 'http://localhost:8080/api/paintings';
const IMAGES_DIR = path.join(__dirname, '../frontend/public/coloring-images');

async function fetchAllPaintings() {
  try {
    const response = await axios.get(`${API_URL}?page=0&size=1000`);
    return response.data.content || [];
  } catch (error) {
    console.error('❌ Failed to fetch paintings:', error.message);
    process.exit(1);
  }
}

async function deletePainting(id) {
  try {
    await axios.delete(`${API_URL.replace('/paintings', '')}/paintings/${id}`);
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

async function main() {
  console.log('🔍 Fetching all paintings from production...\n');
  const allPaintings = await fetchAllPaintings();
  console.log(`✅ Found ${allPaintings.length} paintings in database\n`);

  const paintingsToDelete = [];
  let paintingsWithImages = 0;

  for (const painting of allPaintings) {
    const imageUrlPath = painting.imageUrl.startsWith('/') ? painting.imageUrl.substring(1) : painting.imageUrl;
    const localImagePath = path.join(IMAGES_DIR, imageUrlPath.replace('coloring-images/', ''));

    if (fs.existsSync(localImagePath)) {
      paintingsWithImages++;
    } else {
      paintingsToDelete.push(painting);
    }
  }

  console.log('📋 Analysis:\n');
  console.log(`   ✅ Paintings with images: ${paintingsWithImages}`);
  console.log(`   ❌ Paintings without images: ${paintingsToDelete.length}\n`);

  if (paintingsToDelete.length > 0) {
    console.log('🗑️  Paintings to be removed:\n');
    paintingsToDelete.forEach((p, index) => {
      console.log(`   ${index + 1}. ${p.title} (${p.urlKey})`);
    });
    console.log('');

    console.log('🚀 Deleting entries...\n');
    let deletedCount = 0;
    let errorCount = 0;

    for (let i = 0; i < paintingsToDelete.length; i++) {
      const painting = paintingsToDelete[i];
      process.stdout.write(`   [${i + 1}/${paintingsToDelete.length}] Deleting "${painting.title}"... `);
      try {
        await deletePainting(painting.id);
        console.log('✅');
        deletedCount++;
      } catch (error) {
        console.log(`❌ ${error.message}`);
        errorCount++;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('\n✅ Cleanup complete!\n');
    console.log(`📊 Summary:\n`);
    console.log(`   • Deleted: ${deletedCount}`);
    console.log(`   • Errors: ${errorCount}`);
    console.log(`   • Remaining: ${allPaintings.length - deletedCount}\n`);
  } else {
    console.log('✨ Database is already clean! No entries to remove.\n');
  }
}

main().catch(console.error);
CLEANUP_SCRIPT

# Run the cleanup script
cd "$(dirname "$0")"
API_URL="${BACKEND_URL}/api/paintings" node /tmp/cleanup-prod.js

# Cleanup temp file
rm /tmp/cleanup-prod.js

echo ""
echo "✅ Cleanup finished!"
echo ""
