#!/usr/bin/env node

/**
 * Bulk Painting Database Import Tool
 * 
 * This tool automatically imports multiple coloring page images into the database.
 * It scans a directory of images and creates database entries for each one.
 * 
 * Usage:
 *   node bulk-import-paintings.js <images-directory> [options]
 *   node bulk-import-paintings.js ../frontend/public/coloring-images --category Animals
 *   node bulk-import-paintings.js generated/ --auto-categorize
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const https = require('https');
const http = require('http');

const API_BASE_URL = process.env.API_URL || 'http://localhost:8080/api/paintings';

// Category mapping from keywords
const CATEGORY_KEYWORDS = {
  'Animals': ['lion', 'tiger', 'elephant', 'bear', 'wolf', 'fox', 'deer', 'rabbit', 'cat', 'dog', 'bird', 'fish', 'dolphin', 'whale', 'shark', 'turtle', 'butterfly', 'bee', 'ladybug', 'horse', 'cow', 'pig', 'sheep', 'chicken', 'duck', 'owl', 'eagle', 'parrot', 'penguin', 'koala', 'panda', 'monkey', 'giraffe', 'zebra', 'rhino', 'hippo'],
  'Nature': ['tree', 'flower', 'rose', 'sunflower', 'tulip', 'daisy', 'mountain', 'forest', 'ocean', 'beach', 'river', 'lake', 'waterfall', 'rainbow', 'cloud', 'star', 'moon', 'sun', 'garden', 'plant', 'leaf', 'mushroom'],
  'Vehicles': ['car', 'truck', 'bus', 'train', 'plane', 'airplane', 'helicopter', 'rocket', 'spaceship', 'boat', 'ship', 'submarine', 'bicycle', 'motorcycle', 'tractor', 'firetruck', 'ambulance', 'police'],
  'Fantasy': ['dragon', 'unicorn', 'fairy', 'mermaid', 'wizard', 'witch', 'castle', 'princess', 'prince', 'knight', 'magic', 'pegasus', 'phoenix', 'griffin', 'elf', 'dwarf'],
  'Characters': ['pikachu', 'pokemon', 'mickey', 'minnie', 'elsa', 'anna', 'spiderman', 'batman', 'superman', 'ironman', 'captain', 'disney', 'marvel', 'superhero']
};

// Color palettes by category
const COLOR_PALETTES = {
  'Animals': ['#8B4513', '#D2691E', '#FFE4C4', '#000000', '#FFFFFF'],
  'Nature': ['#228B22', '#32CD32', '#87CEEB', '#FFD700', '#8B4513'],
  'Vehicles': ['#FF0000', '#0000FF', '#FFD700', '#C0C0C0', '#000000'],
  'Fantasy': ['#FF69B4', '#DDA0DD', '#87CEEB', '#FFD700', '#F0E68C'],
  'Characters': ['#FFD700', '#FF0000', '#0000FF', '#000000', '#FFFFFF']
};

function generateUrlKey(title) {
  return title.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function detectCategory(filename) {
  const lowerFilename = filename.toLowerCase();
  
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowerFilename.includes(keyword)) {
        return category;
      }
    }
  }
  
  return 'Animals'; // Default
}

function generateTitle(filename) {
  // Remove extension and clean up
  let title = filename.replace(/\.(png|jpg|jpeg|svg)$/i, '');
  
  // Remove common prefixes
  title = title.replace(/^(coloring-page-|painting-|image-)/i, '');
  
  // Convert hyphens/underscores to spaces
  title = title.replace(/[-_]/g, ' ');
  
  // Capitalize each word
  title = title.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return title;
}

function generateDescription(title, category) {
  const templates = {
    'Animals': [
      `A cute and friendly ${title.toLowerCase()} ready to be colored!`,
      `An adorable ${title.toLowerCase()} waiting for your creative colors!`,
      `A wonderful ${title.toLowerCase()} coloring page for kids!`
    ],
    'Nature': [
      `A beautiful ${title.toLowerCase()} scene perfect for coloring!`,
      `An amazing ${title.toLowerCase()} ready to come alive with colors!`,
      `A peaceful ${title.toLowerCase()} waiting to be colored!`
    ],
    'Vehicles': [
      `An awesome ${title.toLowerCase()} ready for adventure!`,
      `A cool ${title.toLowerCase()} perfect for coloring fun!`,
      `An exciting ${title.toLowerCase()} waiting to be colored!`
    ],
    'Fantasy': [
      `A magical ${title.toLowerCase()} from a fantasy world!`,
      `An enchanting ${title.toLowerCase()} ready for your imagination!`,
      `A mystical ${title.toLowerCase()} waiting to be brought to life!`
    ],
    'Characters': [
      `The beloved ${title} character ready for coloring!`,
      `Your favorite ${title} character waiting to be colored!`,
      `The amazing ${title} ready for coloring fun!`
    ]
  };
  
  const categoryTemplates = templates[category] || templates['Animals'];
  return categoryTemplates[Math.floor(Math.random() * categoryTemplates.length)];
}

function generateTags(title, category) {
  const baseTags = [generateUrlKey(title)];
  
  // Add category-specific tags
  if (category === 'Animals') baseTags.push('animals', 'cute', 'nature');
  if (category === 'Nature') baseTags.push('nature', 'outdoor', 'beautiful');
  if (category === 'Vehicles') baseTags.push('vehicles', 'transportation', 'fun');
  if (category === 'Fantasy') baseTags.push('fantasy', 'magic', 'imagination');
  if (category === 'Characters') baseTags.push('characters', 'cartoon', 'popular');
  
  // Add common tags
  baseTags.push('coloring', 'kids');
  
  return baseTags.join(',');
}

function estimateDifficulty(category, title) {
  const lowerTitle = title.toLowerCase();
  
  // Simple subjects
  if (lowerTitle.includes('simple') || lowerTitle.includes('easy')) return 1;
  
  // Complex subjects
  if (lowerTitle.includes('intricate') || lowerTitle.includes('detailed') || 
      lowerTitle.includes('complex') || category === 'Fantasy') return 3;
  
  // Medium difficulty by default
  return 2;
}

async function postToAPI(painting) {
  return new Promise((resolve, reject) => {
    const url = new URL(API_BASE_URL);
    const postData = JSON.stringify(painting);
    
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    const client = url.protocol === 'https:' ? https : http;
    
    const req = client.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.write(postData);
    req.end();
  });
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === '--help') {
    console.log(`
🎨 Bulk Painting Database Import Tool

Usage:
  node bulk-import-paintings.js <images-directory> [options]

Options:
  --category <category>      Force all images to this category
  --auto-categorize          Auto-detect category from filename (default)
  --difficulty <1-3>         Force difficulty level (1=easy, 2=medium, 3=hard)
  --featured                 Mark all as featured
  --dry-run                  Preview without importing
  --skip-existing            Skip images that already exist (by url_key)
  --update-existing          Update existing entries instead of creating new
  --api-url <url>            Custom API URL (default: http://localhost:8080/api/paintings)

Examples:
  node bulk-import-paintings.js ../frontend/public/coloring-images
  node bulk-import-paintings.js generated/ --category Animals
  node bulk-import-paintings.js images/ --featured --dry-run

Categories: Animals, Nature, Vehicles, Fantasy, Characters
`);
    process.exit(0);
  }
  
  const imagesDir = args[0];
  const options = {
    category: null,
    autoCategorize: true,
    difficulty: null,
    featured: false,
    dryRun: false,
    skipExisting: false,
    updateExisting: false
  };
  
  // Parse options
  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--category' && args[i + 1]) {
      options.category = args[i + 1];
      options.autoCategorize = false;
      i++;
    } else if (args[i] === '--difficulty' && args[i + 1]) {
      options.difficulty = parseInt(args[i + 1]);
      i++;
    } else if (args[i] === '--featured') {
      options.featured = true;
    } else if (args[i] === '--dry-run') {
      options.dryRun = true;
    } else if (args[i] === '--skip-existing') {
      options.skipExisting = true;
    } else if (args[i] === '--update-existing') {
      options.updateExisting = true;
    } else if (args[i] === '--api-url' && args[i + 1]) {
      process.env.API_URL = args[i + 1];
      i++;
    }
  }
  
  // Validate directory
  if (!fs.existsSync(imagesDir)) {
    console.error(`❌ Error: Directory not found: ${imagesDir}`);
    process.exit(1);
  }
  
  // Find all image files
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.svg'];
  const files = fs.readdirSync(imagesDir)
    .filter(file => imageExtensions.includes(path.extname(file).toLowerCase()))
    .filter(file => !file.startsWith('.')) // Skip hidden files
    .filter(file => !file.includes('thumb')); // Skip thumbnails
  
  if (files.length === 0) {
    console.error(`❌ Error: No image files found in ${imagesDir}`);
    process.exit(1);
  }
  
  console.log('\n🎨 Bulk Painting Import\n');
  console.log('═'.repeat(60));
  console.log(`\nImages directory: ${imagesDir}`);
  console.log(`Total images found: ${files.length}`);
  console.log(`Category: ${options.category || 'Auto-detect'}`);
  console.log(`Difficulty: ${options.difficulty || 'Auto-detect'}`);
  console.log(`Featured: ${options.featured ? 'Yes' : 'No'}`);
  console.log(`Skip existing: ${options.skipExisting ? 'Yes' : 'No'}`);
  console.log(`Update existing: ${options.updateExisting ? 'Yes' : 'No'}`);
  console.log(`Dry run: ${options.dryRun ? 'Yes (preview only)' : 'No'}`);
  console.log('\n' + '─'.repeat(60) + '\n');
  
  const paintings = [];
  
  // Generate painting objects
  for (const file of files) {
    const title = generateTitle(file);
    const category = options.category || detectCategory(file);
    const urlKey = generateUrlKey(title);
    const description = generateDescription(title, category);
    const tags = generateTags(title, category);
    const difficulty = options.difficulty || estimateDifficulty(category, title);
    const colorPalette = COLOR_PALETTES[category] || COLOR_PALETTES['Animals'];
    
    // Determine image path
    let imageUrl;
    if (imagesDir.includes('public')) {
      // Extract path after 'public'
      const publicIndex = imagesDir.indexOf('public');
      imageUrl = '/' + imagesDir.substring(publicIndex + 7) + '/' + file;
      imageUrl = imageUrl.replace(/\/+/g, '/'); // Clean up multiple slashes
    } else {
      imageUrl = `/coloring-images/${file}`;
    }
    
    const painting = {
      urlKey,
      title,
      description,
      category,
      tags,
      imageUrl,
      thumbnailUrl: imageUrl, // Use same image for thumbnail
      difficulty,
      colorPalette: JSON.stringify(colorPalette),
      svgPath: '',
      featured: options.featured
    };
    
    paintings.push(painting);
    
    console.log(`✅ ${title}`);
    console.log(`   Category: ${category} | Difficulty: ${difficulty} | URL: ${imageUrl}`);
  }
  
  console.log('\n' + '─'.repeat(60) + '\n');
  
  if (options.dryRun) {
    console.log('🔍 Dry run complete! No data was imported.');
    console.log('\nPreview of first painting:');
    console.log(JSON.stringify(paintings[0], null, 2));
    console.log('\nRemove --dry-run flag to actually import.');
    process.exit(0);
  }
  
  // Confirm import
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  const answer = await new Promise(resolve => {
    rl.question(`\n📤 Import ${paintings.length} paintings to database? (y/n) `, resolve);
  });
  rl.close();
  
  if (answer.toLowerCase() !== 'y') {
    console.log('\nCancelled.');
    process.exit(0);
  }
  
  console.log('\n🚀 Importing paintings...\n');
  
  let successCount = 0;
  let errorCount = 0;
  let skippedCount = 0;
  
  for (let i = 0; i < paintings.length; i++) {
    const painting = paintings[i];
    process.stdout.write(`[${i + 1}/${paintings.length}] ${painting.title}... `);
    
    try {
      await postToAPI(painting);
      console.log('✅');
      successCount++;
    } catch (error) {
      // Check if it's a duplicate error
      if (error.message.includes('Unique index') || error.message.includes('duplicate') || error.message.includes('23505')) {
        if (options.skipExisting) {
          console.log('⏭️  (already exists, skipped)');
          skippedCount++;
        } else if (options.updateExisting) {
          // Try to update instead (requires getting ID first - simplified for now)
          console.log('⚠️  (already exists, update not implemented yet)');
          errorCount++;
        } else {
          console.log(`❌ Already exists (use --skip-existing or --update-existing)`);
          errorCount++;
        }
      } else {
        console.log(`❌ ${error.message}`);
        errorCount++;
      }
    }
    
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log('\n' + '═'.repeat(60));
  console.log('\n✅ Import complete!\n');
  console.log(`📊 Summary:`);
  console.log(`   • Success: ${successCount}`);
  console.log(`   • Skipped: ${skippedCount}`);
  console.log(`   • Errors: ${errorCount}`);
  console.log(`   • Total: ${paintings.length}`);
  console.log('\n🎉 Done! Visit http://localhost:3000 to see your paintings!\n');
}

main().catch(console.error);

