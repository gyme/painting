#!/usr/bin/env node

/**
 * Image Optimization Script
 * Compresses large PNG/JPG images to reasonable sizes for web use
 * Target: 200-500KB per image (instead of 10-20MB!)
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = './public/coloring-images';
const OUTPUT_DIR = './public/coloring-images-optimized';
const MAX_WIDTH = 1200; // Max width in pixels
const MAX_HEIGHT = 1600; // Max height in pixels
const JPEG_QUALITY = 85; // Quality for JPEG conversion
const PNG_QUALITY = 80; // Quality for PNG compression

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function optimizeImage(filePath) {
  const fileName = path.basename(filePath);
  const outputPath = path.join(OUTPUT_DIR, fileName);
  
  try {
    const stats = fs.statSync(filePath);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    console.log(`Processing ${fileName} (${sizeMB}MB)...`);
    
    // Read image metadata
    const metadata = await sharp(filePath).metadata();
    
    // Determine if we need to resize
    const needsResize = metadata.width > MAX_WIDTH || metadata.height > MAX_HEIGHT;
    
    let pipeline = sharp(filePath);
    
    // Resize if needed (maintain aspect ratio)
    if (needsResize) {
      pipeline = pipeline.resize(MAX_WIDTH, MAX_HEIGHT, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }
    
    // Convert to appropriate format and compress
    if (fileName.toLowerCase().endsWith('.png')) {
      // For PNG: compress aggressively
      await pipeline
        .png({ 
          quality: PNG_QUALITY,
          compressionLevel: 9,
          adaptiveFiltering: true
        })
        .toFile(outputPath);
    } else if (fileName.toLowerCase().endsWith('.jpg') || fileName.toLowerCase().endsWith('.jpeg')) {
      // For JPEG: optimize quality
      await pipeline
        .jpeg({ 
          quality: JPEG_QUALITY,
          mozjpeg: true
        })
        .toFile(outputPath);
    }
    
    const newStats = fs.statSync(outputPath);
    const newSizeMB = (newStats.size / (1024 * 1024)).toFixed(2);
    const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);
    
    console.log(`  ✓ ${fileName}: ${sizeMB}MB → ${newSizeMB}MB (${savings}% smaller)`);
    
  } catch (error) {
    console.error(`  ✗ Error processing ${fileName}:`, error.message);
  }
}

async function optimizeAllImages() {
  console.log('🎨 Starting image optimization...\n');
  
  const files = fs.readdirSync(INPUT_DIR)
    .filter(file => /\.(png|jpg|jpeg)$/i.test(file))
    .map(file => path.join(INPUT_DIR, file));
  
  console.log(`Found ${files.length} images to optimize\n`);
  
  // Process images one by one
  for (const file of files) {
    await optimizeImage(file);
  }
  
  console.log('\n✅ Optimization complete!');
  console.log(`\nOptimized images saved to: ${OUTPUT_DIR}`);
  console.log('\nNext steps:');
  console.log('1. Review the optimized images');
  console.log('2. If satisfied, run: rm -rf public/coloring-images && mv public/coloring-images-optimized public/coloring-images');
}

// Check if sharp is installed
try {
  require.resolve('sharp');
  optimizeAllImages().catch(console.error);
} catch (e) {
  console.error('❌ Error: "sharp" package not found');
  console.error('\nPlease install it first:');
  console.error('  npm install sharp\n');
  process.exit(1);
}

