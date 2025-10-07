#!/usr/bin/env node

/**
 * Add new coloring images to the database
 */

const http = require('http');

const API_BASE_URL = 'http://localhost:8080/api/paintings';

const newPaintings = [
  {
    urlKey: 'cat-and-dog',
    title: 'Cat and Dog',
    description: 'Adorable cat and dog friends playing together!',
    category: 'Animals',
    tags: 'cat,dog,pets,friends,cute,animals,coloring,kids',
    imageUrl: '/coloring-images/cat_and_dog.png',
    thumbnailUrl: '/coloring-images/cat_and_dog.png',
    difficulty: 2,
    colorPalette: JSON.stringify(['#8B4513', '#D2691E', '#FFE4C4', '#000000', '#FFFFFF']),
    featured: false
  },
  {
    urlKey: 'cute-dragon',
    title: 'Cute Dragon',
    description: 'A friendly and adorable dragon perfect for coloring!',
    category: 'Fantasy',
    tags: 'dragon,cute,fantasy,magical,coloring,kids',
    imageUrl: '/coloring-images/cute_dragon.jpg',
    thumbnailUrl: '/coloring-images/cute_dragon.jpg',
    difficulty: 3,
    colorPalette: JSON.stringify(['#FF69B4', '#DDA0DD', '#87CEEB', '#FFD700', '#F0E68C']),
    featured: true
  },
  {
    urlKey: 'cute-monster',
    title: 'Cute Monster',
    description: 'A lovable friendly monster ready for colors!',
    category: 'Characters',
    tags: 'monster,cute,friendly,fun,character,coloring,kids',
    imageUrl: '/coloring-images/cute_monster.png',
    thumbnailUrl: '/coloring-images/cute_monster.png',
    difficulty: 2,
    colorPalette: JSON.stringify(['#FFD700', '#FF0000', '#0000FF', '#000000', '#FFFFFF']),
    featured: false
  },
  {
    urlKey: 'cute-pig',
    title: 'Cute Pig',
    description: 'An adorable little pig waiting to be colored!',
    category: 'Animals',
    tags: 'pig,cute,farm,animal,coloring,kids',
    imageUrl: '/coloring-images/cute_pig.jpg',
    thumbnailUrl: '/coloring-images/cute_pig.jpg',
    difficulty: 1,
    colorPalette: JSON.stringify(['#FFC0CB', '#FFB6C1', '#FFE4E1', '#000000', '#FFFFFF']),
    featured: false
  },
  {
    urlKey: 'dwarf',
    title: 'Dwarf',
    description: 'A cheerful dwarf character from fantasy tales!',
    category: 'Fantasy',
    tags: 'dwarf,fantasy,character,magical,coloring,kids',
    imageUrl: '/coloring-images/dwarf.png',
    thumbnailUrl: '/coloring-images/dwarf.png',
    difficulty: 3,
    colorPalette: JSON.stringify(['#8B4513', '#FFD700', '#FF0000', '#0000FF', '#FFFFFF']),
    featured: false
  },
  {
    urlKey: 'easter-bunny',
    title: 'Easter Bunny',
    description: 'A cute Easter bunny perfect for spring coloring!',
    category: 'Animals',
    tags: 'bunny,rabbit,easter,holiday,spring,cute,coloring,kids',
    imageUrl: '/coloring-images/easter_bunny.jpg',
    thumbnailUrl: '/coloring-images/easter_bunny.jpg',
    difficulty: 2,
    colorPalette: JSON.stringify(['#FFB6C1', '#87CEEB', '#FFD700', '#FFFFFF', '#8B4513']),
    featured: true
  },
  {
    urlKey: 'fox',
    title: 'Fox',
    description: 'A clever and beautiful fox ready to be colored!',
    category: 'Animals',
    tags: 'fox,animal,wildlife,forest,cute,coloring,kids',
    imageUrl: '/coloring-images/fox.jpg',
    thumbnailUrl: '/coloring-images/fox.jpg',
    difficulty: 2,
    colorPalette: JSON.stringify(['#FF4500', '#FFD700', '#FFFFFF', '#000000', '#8B4513']),
    featured: false
  },
  {
    urlKey: 'little-chef',
    title: 'Little Chef',
    description: 'An adorable little chef ready to cook up some fun!',
    category: 'Characters',
    tags: 'chef,cooking,character,profession,cute,coloring,kids',
    imageUrl: '/coloring-images/little_chef.png',
    thumbnailUrl: '/coloring-images/little_chef.png',
    difficulty: 2,
    colorPalette: JSON.stringify(['#FFFFFF', '#FF0000', '#FFD700', '#8B4513', '#000000']),
    featured: false
  },
  {
    urlKey: 'police-officer',
    title: 'Police Officer',
    description: 'A brave police officer keeping everyone safe!',
    category: 'Characters',
    tags: 'police,officer,hero,profession,character,coloring,kids',
    imageUrl: '/coloring-images/police_officer.png',
    thumbnailUrl: '/coloring-images/police_officer.png',
    difficulty: 2,
    colorPalette: JSON.stringify(['#0000FF', '#000000', '#FFD700', '#FFFFFF', '#C0C0C0']),
    featured: false
  },
  {
    urlKey: 'soccer-player',
    title: 'Soccer Player',
    description: 'An energetic soccer player ready for the game!',
    category: 'Characters',
    tags: 'soccer,football,sports,player,character,coloring,kids',
    imageUrl: '/coloring-images/soccer_player.png',
    thumbnailUrl: '/coloring-images/soccer_player.png',
    difficulty: 2,
    colorPalette: JSON.stringify(['#FF0000', '#0000FF', '#FFD700', '#FFFFFF', '#000000']),
    featured: false
  },
  {
    urlKey: 'spooky-christmas',
    title: 'Spooky Christmas',
    description: 'A fun mix of spooky and Christmas themes!',
    category: 'Holiday',
    tags: 'christmas,spooky,halloween,holiday,fun,coloring,kids',
    imageUrl: '/coloring-images/spooky_christmas.png',
    thumbnailUrl: '/coloring-images/spooky_christmas.png',
    difficulty: 3,
    colorPalette: JSON.stringify(['#FF0000', '#008000', '#FFD700', '#FF8C00', '#000000']),
    featured: true
  },
  {
    urlKey: 'witch-cat',
    title: 'Witch Cat',
    description: 'A magical cat dressed as a witch for Halloween!',
    category: 'Fantasy',
    tags: 'cat,witch,halloween,magic,costume,cute,coloring,kids',
    imageUrl: '/coloring-images/witch_cat.png',
    thumbnailUrl: '/coloring-images/witch_cat.png',
    difficulty: 2,
    colorPalette: JSON.stringify(['#000000', '#FF8C00', '#9370DB', '#FFD700', '#FFFFFF']),
    featured: false
  },
  {
    urlKey: 'witch',
    title: 'Witch',
    description: 'A friendly witch perfect for Halloween coloring!',
    category: 'Fantasy',
    tags: 'witch,halloween,magic,fantasy,character,coloring,kids',
    imageUrl: '/coloring-images/witch.png',
    thumbnailUrl: '/coloring-images/witch.png',
    difficulty: 3,
    colorPalette: JSON.stringify(['#000000', '#9370DB', '#FF8C00', '#FFD700', '#008000']),
    featured: false
  }
];

function createPainting(painting) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(painting);
    
    const options = {
      hostname: 'localhost',
      port: 8080,
      path: '/api/paintings',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log(`✅ Created: ${painting.title}`);
          resolve(JSON.parse(responseData));
        } else {
          console.log(`❌ Failed: ${painting.title} (${res.statusCode})`);
          reject(new Error(`HTTP ${res.statusCode}: ${responseData}`));
        }
      });
    });

    req.on('error', (error) => {
      console.log(`❌ Error creating ${painting.title}: ${error.message}`);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

async function importAll() {
  console.log(`\n🎨 Adding ${newPaintings.length} new paintings to database...\n`);
  
  let success = 0;
  let failed = 0;
  
  for (const painting of newPaintings) {
    try {
      await createPainting(painting);
      success++;
      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      failed++;
    }
  }
  
  console.log(`\n✨ Complete! ${success} added, ${failed} failed\n`);
}

importAll().catch(console.error);
