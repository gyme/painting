#!/usr/bin/env node

/**
 * Download Professional Coloring Images
 * 
 * This script helps you download high-quality coloring book images
 * for all characters in your app.
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, 'public', 'coloring-images');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log('✅ Created directory:', outputDir);
}

// High-quality coloring page sources
// NOTE: Replace these URLs with actual coloring page images you have rights to use
const coloringImages = {
  'pikachu': {
    url: 'https://www.supercoloring.com/sites/default/files/styles/coloring_full/public/cif/2013/03/pikachu-pokemon-coloring-page.jpg',
    description: 'Pikachu from Pokemon'
  },
  'stitch': {
    url: 'https://www.supercoloring.com/sites/default/files/styles/coloring_full/public/cif/2015/04/stitch-coloring-page.jpg',
    description: 'Stitch from Lilo & Stitch'
  },
  'mickey-mouse': {
    url: 'https://www.supercoloring.com/sites/default/files/styles/coloring_full/public/cif/2009/01/mickey-mouse-coloring-page.jpg',
    description: 'Mickey Mouse'
  },
  'minnie-mouse': {
    url: 'https://www.supercoloring.com/sites/default/files/styles/coloring_full/public/cif/2012/08/minnie-mouse-coloring-page.jpg',
    description: 'Minnie Mouse'
  },
  'elsa-frozen': {
    url: 'https://www.supercoloring.com/sites/default/files/styles/coloring_full/public/cif/2013/11/elsa-from-frozen-coloring-page.jpg',
    description: 'Queen Elsa from Frozen'
  },
  'anna-frozen': {
    url: 'https://www.supercoloring.com/sites/default/files/styles/coloring_full/public/cif/2013/11/anna-from-frozen-coloring-page.jpg',
    description: 'Princess Anna from Frozen'
  },
  'olaf-frozen': {
    url: 'https://www.supercoloring.com/sites/default/files/styles/coloring_full/public/cif/2013/11/olaf-from-frozen-coloring-page.jpg',
    description: 'Olaf from Frozen'
  },
  'belle-beauty-beast': {
    url: 'https://www.supercoloring.com/sites/default/files/styles/coloring_full/public/cif/2012/05/belle-coloring-page.jpg',
    description: 'Belle from Beauty and the Beast'
  },
  'ariel-mermaid': {
    url: 'https://www.supercoloring.com/sites/default/files/styles/coloring_full/public/cif/2009/04/ariel-the-little-mermaid-coloring-page.jpg',
    description: 'Ariel from The Little Mermaid'
  },
  'spiderman': {
    url: 'https://www.supercoloring.com/sites/default/files/styles/coloring_full/public/cif/2011/09/spider-man-coloring-page.jpg',
    description: 'Spider-Man'
  }
};

function downloadImage(url, filename, description) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const filepath = path.join(outputDir, filename);

    console.log(`⬇️  Downloading ${description}...`);

    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);

        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`✅ Downloaded: ${filename}`);
          resolve(filepath);
        });

        fileStream.on('error', (err) => {
          fs.unlink(filepath, () => {});
          reject(err);
        });
      } else {
        reject(new Error(`Failed to download ${description}: HTTP ${response.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function downloadAll() {
  console.log('\n🎨 Downloading Professional Coloring Images...\n');
  console.log('📁 Output directory:', outputDir);
  console.log('📊 Total images:', Object.keys(coloringImages).length);
  console.log('\n' + '='.repeat(60) + '\n');

  const downloads = Object.entries(coloringImages).map(([key, { url, description }]) => {
    return downloadImage(url, `${key}.png`, description)
      .catch(err => {
        console.error(`❌ Failed to download ${key}:`, err.message);
        return null;
      });
  });

  const results = await Promise.all(downloads);
  const successful = results.filter(r => r !== null).length;

  console.log('\n' + '='.repeat(60));
  console.log(`\n✨ Download Complete!`);
  console.log(`📊 Successfully downloaded: ${successful}/${Object.keys(coloringImages).length} images`);
  console.log(`📁 Images saved to: ${outputDir}\n`);

  if (successful < Object.keys(coloringImages).length) {
    console.log('⚠️  Some downloads failed. You may need to:');
    console.log('   1. Check your internet connection');
    console.log('   2. Manually download from SuperColoring.com');
    console.log('   3. See DOWNLOAD_IMAGES_GUIDE.md for instructions\n');
  } else {
    console.log('🎉 All images ready! Refresh your browser to see them!\n');
  }
}

// Show manual instructions
console.log('\n' + '='.repeat(60));
console.log('🎨 PROFESSIONAL COLORING IMAGES DOWNLOADER');
console.log('='.repeat(60) + '\n');

console.log('⚠️  IMPORTANT NOTE:');
console.log('This script attempts to download from SuperColoring.com.');
console.log('If downloads fail, please manually download from:\n');
console.log('   👉 https://www.supercoloring.com\n');
console.log('Search for each character and save as PNG files.\n');
console.log('='.repeat(60) + '\n');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Do you want to attempt automatic download? (y/n): ', (answer) => {
  readline.close();
  
  if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
    downloadAll();
  } else {
    console.log('\n📋 Manual Download Instructions:\n');
    console.log('1. Visit: https://www.supercoloring.com');
    console.log('2. Search for each character:');
    Object.entries(coloringImages).forEach(([key, { description }]) => {
      console.log(`   - ${description} → save as "${key}.png"`);
    });
    console.log(`\n3. Save all files to: ${outputDir}`);
    console.log('4. Refresh your browser\n');
    console.log('✅ See DOWNLOAD_IMAGES_GUIDE.md for detailed instructions!\n');
  }
});
