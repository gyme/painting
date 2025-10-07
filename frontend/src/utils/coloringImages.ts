// High-quality coloring book images for each character
// Local images stored in public/coloring-images/

export const coloringImages: { [key: string]: string } = {
  // Animals
  'bear': '/coloring-images/bear.png',
  'cat': '/coloring-images/cat.png',
  'cat-and-dog': '/coloring-images/cat_and_dog.png',
  'dog': '/coloring-images/dog.png',
  'elephant': '/coloring-images/elephant.png',
  'fox': '/coloring-images/fox.jpg',
  'giraffe': '/coloring-images/giraffe.png',
  'lion': '/coloring-images/lion.png',
  'rhino': '/coloring-images/rhino.png',
  'tiger': '/coloring-images/tiger.png',
  'cute-pig': '/coloring-images/cute_pig.jpg',
  
  // Vehicles
  'bus': '/coloring-images/bus.png',
  'car': '/coloring-images/car.png',
  'fire-truck': '/coloring-images/fire_truck.png',
  'police-car': '/coloring-images/police_car.png',
  'sport-car': '/coloring-images/sport_car.png',
  'taxi': '/coloring-images/taxi.png',
  'train': '/coloring-images/train.png',
  'truck': '/coloring-images/truck.png',
  
  // Characters
  'pikachu': '/coloring-images/pikachu.png',
  'cute-dragon': '/coloring-images/cute_dragon.jpg',
  'cute-monster': '/coloring-images/cute_monster.png',
  'dwarf': '/coloring-images/dwarf.png',
  'easter-bunny': '/coloring-images/easter_bunny.jpg',
  'little-chef': '/coloring-images/little_chef.png',
  'police-officer': '/coloring-images/police_officer.png',
  'soccer-player': '/coloring-images/soccer_player.png',
  'witch': '/coloring-images/witch.png',
  'witch-cat': '/coloring-images/witch_cat.png',
  
  // Holiday/Seasonal
  'spooky-christmas': '/coloring-images/spooky_christmas.png',
  
  // Nature/Scenery
  'beach': '/coloring-images/beach.png',
  'river': '/coloring-images/river.png',
  'sun-flower': '/coloring-images/sun_flower.png',
  'tree': '/coloring-images/tree.png',
  
  // Disney Characters (if you add them later)
  'stitch': '/coloring-images/stitch.png',
  'elsa-frozen': '/coloring-images/elsa-frozen.png',
  'anna-frozen': '/coloring-images/anna-frozen.png',
  'belle-beauty-beast': '/coloring-images/belle.png',
  'ariel-mermaid': '/coloring-images/ariel.png',
  'mickey-mouse': '/coloring-images/mickey-mouse.png',
  'minnie-mouse': '/coloring-images/minnie-mouse.png',
  'spiderman': '/coloring-images/spiderman.png',
  'olaf-frozen': '/coloring-images/olaf.png',
  
  // Default fallback
  'default': '/coloring-images/cat.png'
}

// Alternative: Use local high-quality images
// Place images in public/coloring-images/ folder
export const getColoringImagePath = (urlKey: string): string => {
  // Return local path or fallback
  return coloringImages[urlKey] || coloringImages['default']
}

// For truly accurate character images, recommend:
// 1. Purchase official Disney coloring book PDFs
// 2. Use royalty-free coloring pages from sites like:
//    - supercoloring.com
//    - coloringpagesonly.com
//    - free-coloring-pages.com
// 3. Create custom high-quality line art with professional tools
// 4. Commission artists to create accurate character line art
