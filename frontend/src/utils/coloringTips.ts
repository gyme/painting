// Generate coloring tips and educational facts for SEO and user engagement

interface ColoringTips {
  tips: string[]
  facts: string[]
  ageRange: string
}

const categoryTips: Record<string, ColoringTips> = {
  'Animals': {
    tips: [
      'Use natural colors like browns, grays, and blacks for realistic animals',
      'Try bright, fun colors like pink or purple for a magical twist!',
      'Color the background with grass, trees, or water to create a scene',
      'Use different shades of the same color to add depth'
    ],
    facts: [
      'Animals come in amazing colors and patterns in nature',
      'Many animals use their colors for camouflage or to attract mates',
      'Coloring animals helps children learn about wildlife and nature'
    ],
    ageRange: '3-10'
  },
  'Vehicles': {
    tips: [
      'Bright colors like red, yellow, and blue make vehicles stand out',
      'Add metallic silver or gray for a realistic look',
      'Don\'t forget to color the wheels black or dark gray',
      'Color the background with roads, sky, or landscapes'
    ],
    facts: [
      'Vehicles help people travel and transport goods',
      'Different vehicles are designed for different purposes',
      'Coloring vehicles helps develop fine motor skills'
    ],
    ageRange: '3-8'
  },
  'Mandalas': {
    tips: [
      'Choose colors that make you feel calm and happy',
      'Try using opposite colors on the color wheel for contrast',
      'Work from the center outward or outside inward',
      'Use colored pencils for detailed shading and blending'
    ],
    facts: [
      'Mandala coloring is proven to reduce stress and anxiety',
      'Mandalas have been used in meditation for thousands of years',
      'The symmetry in mandalas helps create a sense of balance'
    ],
    ageRange: '8-Adult'
  },
  'Dinosaurs': {
    tips: [
      'Use greens, browns, and grays for realistic dinosaurs',
      'Try bright colors like orange, purple, or blue for fun',
      'Add scales or patterns for extra detail',
      'Color the prehistoric background with plants and rocks'
    ],
    facts: [
      'Dinosaurs lived millions of years ago',
      'Scientists study fossils to learn about dinosaur colors',
      'Different dinosaurs had different diets and sizes'
    ],
    ageRange: '4-10'
  },
  'Occupations': {
    tips: [
      'Use the traditional uniform colors for each profession',
      'Firefighters: red, yellow, and black',
      'Doctors: white coats with colorful scrubs',
      'Chefs: white uniforms with colorful aprons'
    ],
    facts: [
      'Different jobs require different skills and training',
      'Every job is important to our community',
      'Learning about occupations helps children explore future careers'
    ],
    ageRange: '4-10'
  },
  'Fairy Tales': {
    tips: [
      'Use magical colors like gold, silver, and sparkly pastels',
      'Princesses look beautiful in pink, purple, blue, or any color!',
      'Add stars and sparkles in the background',
      'Don\'t forget to color the castle and magical elements'
    ],
    facts: [
      'Fairy tales teach important life lessons',
      'Many fairy tales come from different cultures around the world',
      'Fairy tale characters inspire creativity and imagination'
    ],
    ageRange: '3-10'
  },
  'Halloween': {
    tips: [
      'Traditional Halloween colors are orange, black, and purple',
      'Try green for monsters and witches',
      'Use dark blues and grays for spooky night scenes',
      'Add glitter or metallic colors for extra magic'
    ],
    facts: [
      'Halloween is celebrated on October 31st',
      'Jack-o\'-lanterns were originally made from turnips',
      'Halloween traditions vary around the world'
    ],
    ageRange: '4-12'
  },
  'Fantasy': {
    tips: [
      'Let your imagination run wild with magical colors',
      'Unicorns can be rainbow-colored or pastel shades',
      'Add sparkles, stars, and magical effects',
      'Blend colors together for a dreamy effect'
    ],
    facts: [
      'Fantasy creatures spark creativity and imagination',
      'Many fantasy stories teach bravery and friendship',
      'Fantasy art has been popular throughout history'
    ],
    ageRange: '4-12'
  },
  'Nature': {
    tips: [
      'Use greens and browns for trees and plants',
      'Flowers can be any color you like',
      'Add blue for sky and water',
      'Try seasonal colors: autumn oranges, spring pastels'
    ],
    facts: [
      'Nature provides fresh air and beautiful scenery',
      'Plants make oxygen that we breathe',
      'Spending time in nature is good for mental health'
    ],
    ageRange: '3-10'
  },
  'Food': {
    tips: [
      'Use realistic food colors or go wild with imagination',
      'Add highlights to make food look shiny and delicious',
      'Color the background with plates, tables, or kitchen scenes',
      'Try using warm colors like red, orange, and yellow'
    ],
    facts: [
      'Different foods give us different nutrients',
      'Colorful fruits and vegetables are usually very healthy',
      'Learning about food helps children make healthy choices'
    ],
    ageRange: '3-8'
  },
  'Sports': {
    tips: [
      'Use team colors for authentic sports equipment',
      'Add motion lines for action scenes',
      'Color the background with fields, courts, or arenas',
      'Don\'t forget the details like logos and numbers'
    ],
    facts: [
      'Sports help build teamwork and physical fitness',
      'Different sports require different skills',
      'Playing sports is fun and keeps you healthy'
    ],
    ageRange: '5-12'
  },
  'Basketball Players': {
    tips: [
      'Use your favorite team colors for the uniform',
      'Basketball jerseys are often bold and colorful',
      'Add court markings in the background',
      'Color the basketball orange with black lines'
    ],
    facts: [
      'Basketball was invented in 1891 by James Naismith',
      'Professional basketball players train for many years',
      'Basketball helps develop coordination and teamwork'
    ],
    ageRange: '6-14'
  },
  'Characters': {
    tips: [
      'Use bright, cheerful colors for happy characters',
      'Add details like hair color, clothing, and accessories',
      'Color the background to match the character\'s personality',
      'Try different skin tones for diverse characters'
    ],
    facts: [
      'Coloring characters helps develop storytelling skills',
      'Characters can represent different emotions and traits',
      'Creating characters sparks imagination and creativity'
    ],
    ageRange: '3-10'
  },
  'Holidays': {
    tips: [
      'Christmas: Use red, green, gold, and silver',
      'Easter: Bright pastels like pink, yellow, and purple',
      'Use traditional holiday colors or create your own',
      'Add festive decorations and backgrounds'
    ],
    facts: [
      'Different cultures celebrate different holidays',
      'Holidays bring families and communities together',
      'Holiday traditions are passed down through generations'
    ],
    ageRange: '3-12'
  },
  'Numbers': {
    tips: [
      'Use different colors for each number',
      'Rainbow colors make numbers more fun',
      'Add patterns or designs inside the numbers',
      'Create a colorful background'
    ],
    facts: [
      'Learning numbers is an important math skill',
      'Coloring numbers helps with number recognition',
      'Numbers are used in everyday life for counting'
    ],
    ageRange: '3-6'
  },
  'K Pop Demon Hunters': {
    tips: [
      'Use bold, dramatic colors',
      'Try metallics like silver and gold for weapons',
      'Purple and blue work great for mysterious atmospheres',
      'Add action effects with bright colors'
    ],
    facts: [
      'K-Pop inspired characters combine music and fantasy',
      'Demon hunter stories teach bravery and teamwork',
      'These characters inspire confidence and creativity'
    ],
    ageRange: '8-16'
  },
  'Italian Brainrot': {
    tips: [
      'Use traditional Italian colors: red, white, and green',
      'Gold and cream colors add elegance',
      'Try warm Mediterranean tones',
      'Add decorative details and patterns'
    ],
    facts: [
      'Italy is famous for art, food, and culture',
      'Italian Renaissance art influenced the world',
      'Italian style combines elegance with creativity'
    ],
    ageRange: '8-Adult'
  }
}

// Default tips for categories not in the map
const defaultTips: ColoringTips = {
  tips: [
    'Choose colors that make you happy',
    'Try using different shades of the same color',
    'Don\'t be afraid to use your imagination',
    'Take your time and color carefully within the lines'
  ],
  facts: [
    'Coloring helps develop fine motor skills',
    'Coloring is a relaxing and creative activity',
    'There\'s no wrong way to color - be creative!'
  ],
  ageRange: '3-12'
}

export function getColoringTips(category: string): ColoringTips {
  return categoryTips[category] || defaultTips
}

// Generate specific tips for a painting title
export function getSpecificTips(title: string, category: string): string[] {
  const baseTips = getColoringTips(category).tips
  const titleLower = title.toLowerCase()
  
  // Add title-specific tips
  const specificTips: string[] = []
  
  // Color suggestions based on title keywords
  if (titleLower.includes('elephant')) {
    specificTips.push('Elephants are usually gray, but try pink for a baby elephant!')
  } else if (titleLower.includes('lion')) {
    specificTips.push('Use golden yellow and brown for a realistic lion\'s mane')
  } else if (titleLower.includes('unicorn')) {
    specificTips.push('Make your unicorn magical with rainbow or pastel colors')
  } else if (titleLower.includes('car') || titleLower.includes('truck')) {
    specificTips.push(`Color your ${titleLower.includes('car') ? 'car' : 'truck'} in your favorite bright color!`)
  } else if (titleLower.includes('mandala')) {
    specificTips.push('Try a color pattern: alternate between two or three colors')
  } else if (titleLower.includes('flower')) {
    specificTips.push('Flowers can be any color - be creative!')
  } else if (titleLower.includes('dinosaur') || titleLower.includes('rex') || titleLower.includes('raptor')) {
    specificTips.push('Scientists think some dinosaurs might have had colorful feathers!')
  } else if (titleLower.includes('chef') || titleLower.includes('cook')) {
    specificTips.push('Chefs wear white uniforms, but their aprons can be colorful!')
  } else if (titleLower.includes('doctor') || titleLower.includes('nurse')) {
    specificTips.push('Medical scrubs come in many colors - blue, green, pink, and more!')
  } else if (titleLower.includes('astronaut')) {
    specificTips.push('Space suits are usually white, but add colorful planets in the background!')
  } else if (titleLower.includes('princess')) {
    specificTips.push('Princesses can wear any color - what\'s your favorite royal color?')
  } else if (titleLower.includes('witch') || titleLower.includes('halloween')) {
    specificTips.push('Traditional Halloween colors are orange and black, but any spooky color works!')
  }
  
  // Combine specific tips with general tips
  return specificTips.length > 0 
    ? [...specificTips, ...baseTips.slice(0, 3)]
    : baseTips
}


