#!/usr/bin/env node

/**
 * LLM-Friendly Painting Generator
 * 
 * This tool helps generate new painting entries for the Kids Painting website.
 * You can use this with an LLM (like ChatGPT, Claude, etc.) to quickly create
 * new painting metadata.
 * 
 * Usage:
 *   node generate-painting.js
 * 
 * Or provide the painting details via command line prompts
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const categories = ['Animals', 'Nature', 'Vehicles', 'Fantasy'];

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function generateUrlKey(title) {
  return title.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function generateColorPalette(category) {
  const palettes = {
    'Animals': ['#8B4513', '#D2691E', '#FFE4C4', '#000000', '#FFFFFF'],
    'Nature': ['#228B22', '#32CD32', '#87CEEB', '#FFD700', '#8B4513'],
    'Vehicles': ['#FF0000', '#0000FF', '#FFD700', '#C0C0C0', '#000000'],
    'Fantasy': ['#FF69B4', '#DDA0DD', '#87CEEB', '#FFD700', '#F0E68C']
  };
  
  return palettes[category] || palettes['Animals'];
}

async function main() {
  console.log('\n🎨 Kids Painting Generator 🌈\n');
  console.log('This tool will help you create a new painting entry.\n');

  try {
    // Get painting details
    const title = await question('Painting title (e.g., "Happy Elephant"): ');
    const description = await question('Description (e.g., "A cute and friendly elephant with big ears!"): ');
    
    console.log('\nCategories: ' + categories.join(', '));
    const category = await question('Category: ');
    
    const tags = await question('Tags (comma-separated, e.g., "elephant,animals,cute,easy"): ');
    
    console.log('\nDifficulty: 1 (Easy), 2 (Medium), 3 (Hard)');
    const difficulty = await question('Difficulty (1-3): ');
    
    const featured = await question('Featured? (y/n): ');
    
    // Generate painting object
    const urlKey = generateUrlKey(title);
    const colorPalette = generateColorPalette(category);
    
    const painting = {
      urlKey: urlKey,
      title: title,
      description: description,
      category: category,
      tags: tags,
      imageUrl: `/images/${urlKey}.jpg`,
      thumbnailUrl: `/images/${urlKey}-thumb.jpg`,
      difficulty: parseInt(difficulty) || 1,
      colorPalette: JSON.stringify(colorPalette),
      svgPath: '',
      featured: featured.toLowerCase() === 'y'
    };

    console.log('\n✅ Generated Painting Entry:\n');
    console.log(JSON.stringify(painting, null, 2));
    
    console.log('\n📋 Instructions:\n');
    console.log('1. Add the image files to your images directory:');
    console.log(`   - ${painting.imageUrl}`);
    console.log(`   - ${painting.thumbnailUrl}`);
    console.log('\n2. POST this JSON to: http://localhost:8080/api/paintings');
    console.log('\n3. Using curl:');
    console.log(`\ncurl -X POST http://localhost:8080/api/paintings \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(painting)}'`);
    
    console.log('\n4. Or use the web interface at: http://localhost:3000\n');
    
    // Save to file option
    const save = await question('Save to file? (y/n): ');
    if (save.toLowerCase() === 'y') {
      const fs = require('fs');
      const filename = `painting-${urlKey}.json`;
      fs.writeFileSync(filename, JSON.stringify(painting, null, 2));
      console.log(`\n✅ Saved to ${filename}\n`);
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    rl.close();
  }
}

// LLM prompt templates
const llmPrompts = {
  description: `Generate a short, kid-friendly description (1-2 sentences) for a painting of: [SUBJECT]`,
  
  tags: `Generate 4-6 relevant tags (comma-separated) for a kids' coloring page about: [SUBJECT]`,
  
  colorPalette: `Suggest 4-5 hex color codes (in JSON array format) that would be perfect for coloring a [SUBJECT]`,
  
  fullGeneration: `I need to create a new coloring page for kids. Please generate a JSON object with the following fields for a painting of "[SUBJECT]":
  
- title: A catchy, kid-friendly title
- description: A short 1-2 sentence description
- category: One of [Animals, Nature, Vehicles, Fantasy]
- tags: 4-6 relevant tags (comma-separated)
- difficulty: 1 (Easy), 2 (Medium), or 3 (Hard)
- colorPalette: 4-5 hex color codes in JSON array format
- featured: true or false

Please format the output as a valid JSON object.`
};

console.log('\n💡 LLM Prompt Templates:\n');
console.log('Copy these prompts to use with ChatGPT, Claude, or other LLMs:\n');
Object.entries(llmPrompts).forEach(([key, prompt]) => {
  console.log(`[${key}]:`);
  console.log(prompt);
  console.log('\n---\n');
});

// Run the generator
if (require.main === module) {
  main();
}

module.exports = { generateUrlKey, generateColorPalette, llmPrompts };
