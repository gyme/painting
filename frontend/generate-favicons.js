const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, 'public', 'favicon.svg');
const publicDir = path.join(__dirname, 'public');

const sizes = [16, 32, 48, 64, 128, 256];

async function generateFavicons() {
  console.log('📦 Generating favicons from SVG...');
  
  // Read the SVG file
  const svgBuffer = fs.readFileSync(svgPath);
  
  // Generate PNG files for each size
  for (const size of sizes) {
    const outputPath = path.join(publicDir, `favicon-${size}x${size}.png`);
    
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(outputPath);
    
    console.log(`✅ Generated: favicon-${size}x${size}.png`);
  }
  
  // Generate favicon.ico (32x32)
  const icoPath = path.join(publicDir, 'favicon.ico');
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(icoPath);
  
  console.log('✅ Generated: favicon.ico');
  console.log('🎉 All favicons generated successfully!');
}

generateFavicons().catch(console.error);

