#!/usr/bin/env node

/**
 * Optimize EXTREMELY large images that exceed normal pixel limits
 * Uses more aggressive resizing and compression
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = './public/coloring-images';
const OUTPUT_DIR = './public/coloring-images-optimized';
const MAX_WIDTH = 800;  // More aggressive - smaller max width
const MAX_HEIGHT = 1200; // More aggressive - smaller max height

// Images that failed in the previous run
const PROBLEM_IMAGES = [
  'cat_and_dog.png',
  'cute_monster.png', 
  'easter_bunny.png',
  'little_chef.png',
  'police_officer.png',
  'soccer_player.png',
  'spooky_christmas.png',
  'squirrel.png',
  'witch.png',
  'witch_cat.png',
  'witch_hat.png'
];

async function optimizeHugeImage(fileName) {
  const filePath = path.join(INPUT_DIR, fileName);
  const outputPath = path.join(OUTPUT_DIR, fileName);
  
  if (!fs.existsSync(filePath)) {
    console.log(`  ⊗ ${fileName} not found, skipping`);
    return;
  }
  
  try {
    const stats = fs.statSync(filePath);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    console.log(`Processing ${fileName} (${sizeMB}MB)...`);
    
    // For huge images, use very aggressive settings
    await sharp(filePath, { 
      limitInputPixels: 268402689 * 4 // Increase pixel limit significantly
    })
      .resize(MAX_WIDTH, MAX_HEIGHT, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .png({ 
        quality: 75,  // Lower quality for huge files
        compressionLevel: 9,
        adaptiveFiltering: true,
        effort: 10  // Maximum compression effort
      })
      .toFile(outputPath);
    
    const newStats = fs.statSync(outputPath);
    const newSizeMB = (newStats.size / (1024 * 1024)).toFixed(2);
    const newSizeKB = (newStats.size / 1024).toFixed(0);
    const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);
    
    console.log(`  ✓ ${fileName}: ${sizeMB}MB → ${newSizeKB}KB (${savings}% smaller)`);
    
  } catch (error) {
    console.error(`  ✗ Error processing ${fileName}:`, error.message);
  }
}

async function main() {
  console.log('🔥 Processing extremely large images with aggressive compression...\n');
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  for (const fileName of PROBLEM_IMAGES) {
    await optimizeHugeImage(fileName);
  }
  
  console.log('\n✅ Huge image optimization complete!');
}

main().catch(console.error);

