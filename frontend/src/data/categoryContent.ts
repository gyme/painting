export interface CategoryContent {
  description: string
  benefits: string[]
  ageRange: string
  learningValue: string
}

export const categoryContent: { [key: string]: CategoryContent } = {
  animals: {
    description: 'Our animal coloring pages feature a wonderful variety of creatures from around the world! From adorable pets like cats and dogs to magnificent wild animals like lions, elephants, and giraffes, these pages help children learn about the animal kingdom while developing fine motor skills and creativity.',
    benefits: [
      'Learn about different animal species and their characteristics',
      'Develop observational skills by studying animal features',
      'Practice realistic color choices (stripes, spots, patterns)',
      'Build vocabulary with animal names and habitats',
      'Encourage love and respect for wildlife'
    ],
    ageRange: 'Perfect for ages 2-10, with varying complexity levels',
    learningValue: 'Animal coloring pages support science education, teaching kids about zoology, habitats, and biodiversity while they create art.'
  },
  
  nature: {
    description: 'Explore the beauty of the natural world with our nature coloring pages! Featuring trees, flowers, landscapes, beaches, mountains, and seasonal scenes, these pages bring children closer to the environment and teach appreciation for our planet.',
    benefits: [
      'Learn about different plants, trees, and flowers',
      'Understand seasonal changes and weather patterns',
      'Develop appreciation for environmental conservation',
      'Practice landscape composition and perspective',
      'Explore natural color palettes (greens, blues, earth tones)'
    ],
    ageRange: 'Suitable for ages 3-10, from simple flowers to complex landscapes',
    learningValue: 'Nature themes support environmental education, teaching children about ecosystems, plant life cycles, and the importance of protecting our natural world.'
  },
  
  vehicles: {
    description: 'Rev up the fun with our exciting vehicle coloring pages! From cars and trucks to trains, planes, and rockets, these pages are perfect for kids who love things that go. Detailed and engaging, they help children learn about different modes of transportation.',
    benefits: [
      'Learn about various types of transportation',
      'Understand how different vehicles work',
      'Practice mechanical details and technical drawing',
      'Develop spatial awareness and perspective',
      'Encourage interest in engineering and technology'
    ],
    ageRange: 'Great for ages 3-10, especially popular with boys aged 4-8',
    learningValue: 'Vehicle coloring teaches about transportation systems, mechanical engineering basics, and helps develop attention to technical details.'
  },
  
  fantasy: {
    description: 'Enter a magical realm with our fantasy coloring pages! Dragons, unicorns, fairies, wizards, castles, and mythical creatures await. These imaginative pages encourage creativity and storytelling while children bring magical worlds to life with color.',
    benefits: [
      'Stimulate imagination and creative thinking',
      'Encourage storytelling and narrative skills',
      'Practice expressive color choices (magical, whimsical palettes)',
      'Develop confidence in artistic interpretation',
      'Explore mythology and fairy tales from different cultures'
    ],
    ageRange: 'Ideal for ages 4-10, especially popular with ages 6-9',
    learningValue: 'Fantasy coloring supports creative writing, mythology studies, and helps children express their imagination through visual art.'
  },
  
  characters: {
    description: 'Bring beloved characters to life with our character coloring pages! From popular cartoon characters to original designs, these pages let children color their favorites. Perfect for fans of animated shows, movies, and storybooks.',
    benefits: [
      'Connect with favorite stories and media',
      'Practice character recognition and details',
      'Develop memory by recalling character colors',
      'Encourage emotional connection through art',
      'Build confidence with familiar subjects'
    ],
    ageRange: 'Appeals to all ages 2-10, depending on character',
    learningValue: 'Character coloring helps children process stories, develop emotional intelligence, and express their preferences and personality.'
  },
  
  mandalas: {
    description: 'Discover the calming beauty of mandala coloring pages! These circular, symmetrical patterns provide a meditative coloring experience. Perfect for developing focus, patience, and appreciation for geometric beauty.',
    benefits: [
      'Promote mindfulness and stress relief',
      'Develop attention to detail and pattern recognition',
      'Practice symmetry and geometric concepts',
      'Build patience and sustained focus',
      'Create beautiful, frame-worthy art'
    ],
    ageRange: 'Best for ages 6-10 (and adults!), requires focus',
    learningValue: 'Mandala coloring teaches geometry, symmetry, pattern recognition, and provides excellent practice in concentration and mindfulness.'
  },
  
  sports: {
    description: 'Get active with our sports coloring pages! Featuring various athletic activities from soccer and basketball to swimming and gymnastics, these pages celebrate physical fitness and team spirit.',
    benefits: [
      'Learn about different sports and athletic activities',
      'Encourage interest in physical fitness',
      'Understand teamwork and sportsmanship',
      'Practice action poses and movement',
      'Connect coloring with their own sports interests'
    ],
    ageRange: 'Perfect for ages 5-10, especially for active kids',
    learningValue: 'Sports coloring teaches about physical education, health, teamwork, and helps children visualize themselves as athletes.'
  },
  
  holidays: {
    description: 'Celebrate special occasions with our holiday coloring pages! From Christmas and Halloween to Easter and Valentine\'s Day, these seasonal pages help children learn about traditions and build excitement for celebrations.',
    benefits: [
      'Learn about different holidays and traditions',
      'Build anticipation for special occasions',
      'Create personalized decorations and cards',
      'Understand cultural celebrations and customs',
      'Practice seasonal color palettes'
    ],
    ageRange: 'Fun for all ages 2-10, all year round',
    learningValue: 'Holiday coloring teaches about cultural traditions, calendar awareness, and provides opportunities for creating meaningful gifts and decorations.'
  }
}

export function getCategoryContent(category: string | undefined): CategoryContent | null {
  if (!category) return null
  const key = category.toLowerCase()
  return categoryContent[key] || null
}

