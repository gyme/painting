#!/usr/bin/env node
/**
 * Database Sync Script
 * Syncs the local paintings with the remote production database
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Configuration
const REMOTE_API = process.env.REMOTE_API_URL || 'https://kids-painting-backend-production.up.railway.app/api';
const LOCAL_IMAGES_DIR = path.join(__dirname, '../frontend/public/coloring-images');

// Color palettes for different categories
const COLOR_PALETTES = {
  Animals: '["#FF6B6B","#4ECDC4","#45B7D1","#FFA07A","#98D8C8"]',
  Nature: '["#2ECC71","#27AE60","#F39C12","#E67E22","#95A5A6"]',
  Vehicles: '["#3498DB","#2980B9","#E74C3C","#C0392B","#ECF0F1"]',
  Characters: '["#9B59B6","#8E44AD","#E91E63","#F06292","#BA68C8"]',
  Mandalas: '["#8B4513","#D2691E","#DEB887","#F4A460","#CD853F"]',
  default: '["#667eea","#764ba2","#f093fb","#4facfe","#43e97b"]'
};

async function getLocalImages() {
  const images = fs.readdirSync(LOCAL_IMAGES_DIR)
    .filter(file => file.endsWith('.png') || file.endsWith('.jpg'))
    .map(file => {
      const name = path.basename(file, path.extname(file));
      const urlKey = name.replace(/_/g, '-');
      
      // Try to determine category and create a nice title
      const title = name
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      let category = 'Animals'; // default
      if (name.includes('mandala')) category = 'Mandalas';
      else if (name.includes('car') || name.includes('truck') || name.includes('vehicle')) category = 'Vehicles';
      else if (name.includes('tree') || name.includes('flower') || name.includes('nature')) category = 'Nature';
      else if (name.includes('character') || name.includes('superhero')) category = 'Characters';
      
      return {
        urlKey,
        title,
        description: `A fun ${title.toLowerCase()} coloring page for kids!`,
        category,
        tags: name.replace(/_/g, ','),
        imageUrl: `/coloring-images/${file}`,
        thumbnailUrl: `/coloring-images/${file}`,
        difficulty: 2,
        colorPalette: COLOR_PALETTES[category] || COLOR_PALETTES.default,
        featured: false,
        viewCount: 0
      };
    });
  
  return images;
}

async function getRemotePaintings() {
  try {
    const response = await axios.get(`${REMOTE_API}/paintings?page=0&size=500`);
    return response.data.content || [];
  } catch (error) {
    console.error('❌ Error fetching remote paintings:', error.message);
    console.log('   Remote API might be down or URL incorrect');
    console.log(`   Tried: ${REMOTE_API}/paintings`);
    return null;
  }
}

async function createPainting(painting) {
  try {
    const response = await axios.post(`${REMOTE_API}/paintings`, painting);
    return response.data;
  } catch (error) {
    console.error(`   ❌ Error creating ${painting.urlKey}:`, error.response?.data || error.message);
    return null;
  }
}

async function deletePainting(urlKey) {
  try {
    await axios.delete(`${REMOTE_API}/paintings/${urlKey}`);
    return true;
  } catch (error) {
    console.error(`   ❌ Error deleting ${urlKey}:`, error.response?.data || error.message);
    return false;
  }
}

async function syncDatabase() {
  console.log('🔄 Starting Database Sync...');
  console.log('=' .repeat(80));
  console.log();
  
  // Step 1: Get local images
  console.log('📁 Scanning local images...');
  const localImages = await getLocalImages();
  console.log(`   Found ${localImages.length} local images`);
  console.log();
  
  // Step 2: Get remote paintings
  console.log('🌐 Fetching remote paintings...');
  const remotePaintings = await getRemotePaintings();
  
  if (remotePaintings === null) {
    console.log();
    console.log('⚠️  Cannot connect to remote database');
    console.log('   Please check:');
    console.log('   1. Backend is running on Railway');
    console.log('   2. REMOTE_API_URL is correct');
    console.log(`   3. Current URL: ${REMOTE_API}`);
    console.log();
    console.log('💡 To manually sync, run the SQL script:');
    console.log('   backend/sync-database.sql');
    return;
  }
  
  console.log(`   Found ${remotePaintings.length} remote paintings`);
  console.log();
  
  // Step 3: Find differences
  const localUrlKeys = new Set(localImages.map(img => img.urlKey));
  const remoteUrlKeys = new Set(remotePaintings.map(p => p.urlKey));
  
  const toAdd = localImages.filter(img => !remoteUrlKeys.has(img.urlKey));
  const toRemove = remotePaintings.filter(p => !localUrlKeys.has(p.urlKey));
  
  console.log('🔍 Sync Analysis:');
  console.log(`   To Add: ${toAdd.length} paintings`);
  console.log(`   To Remove: ${toRemove.length} paintings`);
  console.log(`   Already Synced: ${localImages.length - toAdd.length} paintings`);
  console.log();
  
  if (toAdd.length === 0 && toRemove.length === 0) {
    console.log('✅ Database is already in sync!');
    console.log();
    return;
  }
  
  // Step 4: Remove paintings that don't have local images
  if (toRemove.length > 0) {
    console.log('🗑️  Removing paintings without local images...');
    for (const painting of toRemove) {
      console.log(`   Removing: ${painting.title} (${painting.urlKey})`);
      await deletePainting(painting.urlKey);
    }
    console.log();
  }
  
  // Step 5: Add paintings that exist locally but not remotely
  if (toAdd.length > 0) {
    console.log('➕ Adding new paintings...');
    for (const painting of toAdd) {
      console.log(`   Adding: ${painting.title} (${painting.urlKey})`);
      await createPainting(painting);
    }
    console.log();
  }
  
  console.log('=' .repeat(80));
  console.log('✅ Database sync complete!');
  console.log();
}

// Run the sync
syncDatabase().catch(error => {
  console.error('❌ Sync failed:', error);
  process.exit(1);
});

