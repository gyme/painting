export interface CategoryContent {
  title: string
  titleEs?: string
  description: string
  descriptionEs?: string
  benefits: string[]
  benefitsEs?: string[]
  ageRange: string
  ageRangeEs?: string
  learningValue: string
  learningValueEs?: string
}

export const categoryContent: { [key: string]: CategoryContent } = {
  animals: {
    title: 'Why Choose Our Animal Coloring Pages?',
    titleEs: '¿Por Qué Elegir Nuestras Páginas para Colorear de Animales?',
    description: 'Our animal coloring pages feature a wonderful variety of creatures from around the world! From adorable pets like cats and dogs to magnificent wild animals like lions, elephants, and giraffes, these pages help children learn about the animal kingdom while developing fine motor skills and creativity.',
    descriptionEs: '¡Nuestras páginas para colorear de animales presentan una maravillosa variedad de criaturas de todo el mundo! Desde mascotas adorables como gatos y perros hasta animales salvajes magníficos como leones, elefantes y jirafas, estas páginas ayudan a los niños a aprender sobre el reino animal mientras desarrollan habilidades motoras finas y creatividad.',
    benefits: [
      'Learn about different animal species and their characteristics',
      'Develop observational skills by studying animal features',
      'Practice realistic color choices (stripes, spots, patterns)',
      'Build vocabulary with animal names and habitats',
      'Encourage love and respect for wildlife'
    ],
    benefitsEs: [
      'Aprender sobre diferentes especies animales y sus características',
      'Desarrollar habilidades de observación estudiando rasgos animales',
      'Practicar elecciones de colores realistas (rayas, manchas, patrones)',
      'Construir vocabulario con nombres de animales y hábitats',
      'Fomentar el amor y respeto por la vida silvestre'
    ],
    ageRange: 'Perfect for ages 2-10, with varying complexity levels',
    ageRangeEs: 'Perfecto para edades 2-10, con niveles de complejidad variables',
    learningValue: 'Animal coloring pages support science education, teaching kids about zoology, habitats, and biodiversity while they create art.',
    learningValueEs: 'Las páginas para colorear de animales apoyan la educación científica, enseñando a los niños sobre zoología, hábitats y biodiversidad mientras crean arte.'
  },
  
  nature: {
    title: 'Why Choose Our Nature Coloring Pages?',
    titleEs: '¿Por Qué Elegir Nuestras Páginas para Colorear de Naturaleza?',
    description: 'Explore the beauty of the natural world with our nature coloring pages! Featuring trees, flowers, landscapes, beaches, mountains, and seasonal scenes, these pages bring children closer to the environment and teach appreciation for our planet.',
    descriptionEs: 'Explora la belleza del mundo natural con nuestras páginas para colorear de naturaleza! Presentando árboles, flores, paisajes, playas, montañas y escenas estacionales, estas páginas acercan a los niños al medio ambiente y enseñan apreciación por nuestro planeta.',
    benefits: [
      'Learn about different plants, trees, and flowers',
      'Understand seasonal changes and weather patterns',
      'Develop appreciation for environmental conservation',
      'Practice landscape composition and perspective',
      'Explore natural color palettes (greens, blues, earth tones)'
    ],
    benefitsEs: [
      'Aprender sobre diferentes plantas, árboles y flores',
      'Entender cambios estacionales y patrones climáticos',
      'Desarrollar apreciación por la conservación ambiental',
      'Practicar composición de paisajes y perspectiva',
      'Explorar paletas de colores naturales (verdes, azules, tonos tierra)'
    ],
    ageRange: 'Suitable for ages 3-10, from simple flowers to complex landscapes',
    ageRangeEs: 'Adecuado para edades 3-10, desde flores simples hasta paisajes complejos',
    learningValue: 'Nature themes support environmental education, teaching children about ecosystems, plant life cycles, and the importance of protecting our natural world.',
    learningValueEs: 'Los temas de naturaleza apoyan la educación ambiental, enseñando a los niños sobre ecosistemas, ciclos de vida de plantas y la importancia de proteger nuestro mundo natural.'
  },
  
  vehicles: {
    title: 'Why Choose Our Vehicle Coloring Pages?',
    titleEs: '¿Por Qué Elegir Nuestras Páginas para Colorear de Vehículos?',
    description: 'Rev up the fun with our exciting vehicle coloring pages! From cars and trucks to trains, planes, and rockets, these pages are perfect for kids who love things that go. Detailed and engaging, they help children learn about different modes of transportation.',
    descriptionEs: '¡Acelera la diversión con nuestras emocionantes páginas para colorear de vehículos! Desde autos y camiones hasta trenes, aviones y cohetes, estas páginas son perfectas para niños que aman las cosas que se mueven. Detalladas y atractivas, ayudan a los niños a aprender sobre diferentes modos de transporte.',
    benefits: [
      'Learn about various types of transportation',
      'Understand how different vehicles work',
      'Practice mechanical details and technical drawing',
      'Develop spatial awareness and perspective',
      'Encourage interest in engineering and technology'
    ],
    benefitsEs: [
      'Aprender sobre varios tipos de transporte',
      'Entender cómo funcionan diferentes vehículos',
      'Practicar detalles mecánicos y dibujo técnico',
      'Desarrollar conciencia espacial y perspectiva',
      'Fomentar interés en ingeniería y tecnología'
    ],
    ageRange: 'Great for ages 3-10, especially popular with boys aged 4-8',
    ageRangeEs: 'Excelente para edades 3-10, especialmente popular con niños de 4-8 años',
    learningValue: 'Vehicle coloring teaches about transportation systems, mechanical engineering basics, and helps develop attention to technical details.',
    learningValueEs: 'Colorear vehículos enseña sobre sistemas de transporte, conceptos básicos de ingeniería mecánica y ayuda a desarrollar atención a detalles técnicos.'
  },
  
  fantasy: {
    title: 'Why Choose Our Fantasy Coloring Pages?',
    titleEs: '¿Por Qué Elegir Nuestras Páginas para Colorear de Fantasía?',
    description: 'Enter a magical realm with our fantasy coloring pages! Dragons, unicorns, fairies, wizards, castles, and mythical creatures await. These imaginative pages encourage creativity and storytelling while children bring magical worlds to life with color.',
    descriptionEs: 'Entra en un reino mágico con nuestras páginas para colorear de fantasía! Dragones, unicornios, hadas, magos, castillos y criaturas míticas te esperan. Estas páginas imaginativas fomentan la creatividad y la narración mientras los niños dan vida a mundos mágicos con color.',
    benefits: [
      'Stimulate imagination and creative thinking',
      'Encourage storytelling and narrative skills',
      'Practice expressive color choices (magical, whimsical palettes)',
      'Develop confidence in artistic interpretation',
      'Explore mythology and fairy tales from different cultures'
    ],
    benefitsEs: [
      'Estimular la imaginación y el pensamiento creativo',
      'Fomentar habilidades narrativas y de contar historias',
      'Practicar elecciones de colores expresivos (paletas mágicas y caprichosas)',
      'Desarrollar confianza en la interpretación artística',
      'Explorar mitología y cuentos de hadas de diferentes culturas'
    ],
    ageRange: 'Ideal for ages 4-10, especially popular with ages 6-9',
    ageRangeEs: 'Ideal para edades 4-10, especialmente popular con edades 6-9',
    learningValue: 'Fantasy coloring supports creative writing, mythology studies, and helps children express their imagination through visual art.',
    learningValueEs: 'Colorear fantasía apoya la escritura creativa, estudios de mitología y ayuda a los niños a expresar su imaginación a través del arte visual.'
  },
  
  characters: {
    title: 'Why Choose Our Character Coloring Pages?',
    titleEs: '¿Por Qué Elegir Nuestras Páginas para Colorear de Personajes?',
    description: 'Bring beloved characters to life with our character coloring pages! From popular cartoon characters to original designs, these pages let children color their favorites. Perfect for fans of animated shows, movies, and storybooks.',
    descriptionEs: '¡Da vida a personajes queridos con nuestras páginas para colorear de personajes! Desde personajes de dibujos animados populares hasta diseños originales, estas páginas permiten a los niños colorear sus favoritos. Perfecto para fanáticos de programas animados, películas y libros de cuentos.',
    benefits: [
      'Connect with favorite stories and media',
      'Practice character recognition and details',
      'Develop memory by recalling character colors',
      'Encourage emotional connection through art',
      'Build confidence with familiar subjects'
    ],
    benefitsEs: [
      'Conectar con historias y medios favoritos',
      'Practicar reconocimiento de personajes y detalles',
      'Desarrollar memoria recordando colores de personajes',
      'Fomentar conexión emocional a través del arte',
      'Construir confianza con temas familiares'
    ],
    ageRange: 'Appeals to all ages 2-10, depending on character',
    ageRangeEs: 'Atractivo para todas las edades 2-10, dependiendo del personaje',
    learningValue: 'Character coloring helps children process stories, develop emotional intelligence, and express their preferences and personality.',
    learningValueEs: 'Colorear personajes ayuda a los niños a procesar historias, desarrollar inteligencia emocional y expresar sus preferencias y personalidad.'
  },
  
  mandalas: {
    title: 'Why Choose Our Mandala Coloring Pages?',
    titleEs: '¿Por Qué Elegir Nuestras Páginas para Colorear de Mandalas?',
    description: 'Discover the calming beauty of mandala coloring pages! These circular, symmetrical patterns provide a meditative coloring experience. Perfect for developing focus, patience, and appreciation for geometric beauty.',
    descriptionEs: '¡Descubre la belleza calmante de las páginas para colorear de mandalas! Estos patrones circulares y simétricos proporcionan una experiencia meditativa de colorear. Perfecto para desarrollar enfoque, paciencia y apreciación por la belleza geométrica.',
    benefits: [
      'Promote mindfulness and stress relief',
      'Develop attention to detail and pattern recognition',
      'Practice symmetry and geometric concepts',
      'Build patience and sustained focus',
      'Create beautiful, frame-worthy art'
    ],
    benefitsEs: [
      'Promover atención plena y alivio del estrés',
      'Desarrollar atención al detalle y reconocimiento de patrones',
      'Practicar simetría y conceptos geométricos',
      'Construir paciencia y enfoque sostenido',
      'Crear arte hermoso digno de enmarcar'
    ],
    ageRange: 'Best for ages 6-10 (and adults!), requires focus',
    ageRangeEs: 'Mejor para edades 6-10 (¡y adultos!), requiere enfoque',
    learningValue: 'Mandala coloring teaches geometry, symmetry, pattern recognition, and provides excellent practice in concentration and mindfulness.',
    learningValueEs: 'Colorear mandalas enseña geometría, simetría, reconocimiento de patrones y proporciona excelente práctica en concentración y atención plena.'
  },
  
  sports: {
    title: 'Why Choose Our Sports Coloring Pages?',
    titleEs: '¿Por Qué Elegir Nuestras Páginas para Colorear de Deportes?',
    description: 'Get active with our sports coloring pages! Featuring various athletic activities from soccer and basketball to swimming and gymnastics, these pages celebrate physical fitness and team spirit.',
    descriptionEs: '¡Actívate con nuestras páginas para colorear de deportes! Presentando varias actividades atléticas desde fútbol y baloncesto hasta natación y gimnasia, estas páginas celebran la aptitud física y el espíritu de equipo.',
    benefits: [
      'Learn about different sports and athletic activities',
      'Encourage interest in physical fitness',
      'Understand teamwork and sportsmanship',
      'Practice action poses and movement',
      'Connect coloring with their own sports interests'
    ],
    benefitsEs: [
      'Aprender sobre diferentes deportes y actividades atléticas',
      'Fomentar interés en la aptitud física',
      'Entender trabajo en equipo y deportividad',
      'Practicar poses de acción y movimiento',
      'Conectar el colorear con sus propios intereses deportivos'
    ],
    ageRange: 'Perfect for ages 5-10, especially for active kids',
    ageRangeEs: 'Perfecto para edades 5-10, especialmente para niños activos',
    learningValue: 'Sports coloring teaches about physical education, health, teamwork, and helps children visualize themselves as athletes.',
    learningValueEs: 'Colorear deportes enseña sobre educación física, salud, trabajo en equipo y ayuda a los niños a visualizarse como atletas.'
  },
  
  holidays: {
    title: 'Why Choose Our Holiday Coloring Pages?',
    titleEs: '¿Por Qué Elegir Nuestras Páginas para Colorear de Festividades?',
    description: 'Celebrate special occasions with our holiday coloring pages! From Christmas and Halloween to Easter and Valentine\'s Day, these seasonal pages help children learn about traditions and build excitement for celebrations.',
    descriptionEs: '¡Celebra ocasiones especiales con nuestras páginas para colorear de festividades! Desde Navidad y Halloween hasta Pascua y Día de San Valentín, estas páginas estacionales ayudan a los niños a aprender sobre tradiciones y construir emoción para las celebraciones.',
    benefits: [
      'Learn about different holidays and traditions',
      'Build anticipation for special occasions',
      'Create personalized decorations and cards',
      'Understand cultural celebrations and customs',
      'Practice seasonal color palettes'
    ],
    benefitsEs: [
      'Aprender sobre diferentes festividades y tradiciones',
      'Construir anticipación para ocasiones especiales',
      'Crear decoraciones y tarjetas personalizadas',
      'Entender celebraciones culturales y costumbres',
      'Practicar paletas de colores estacionales'
    ],
    ageRange: 'Fun for all ages 2-10, all year round',
    ageRangeEs: 'Diversión para todas las edades 2-10, todo el año',
    learningValue: 'Holiday coloring teaches about cultural traditions, calendar awareness, and provides opportunities for creating meaningful gifts and decorations.',
    learningValueEs: 'Colorear festividades enseña sobre tradiciones culturales, conciencia del calendario y proporciona oportunidades para crear regalos y decoraciones significativas.'
  }
}

export function getCategoryContent(category: string | undefined, language: string = 'en'): CategoryContent | null {
  if (!category) return null
  const key = category.toLowerCase()
  const content = categoryContent[key]
  
  if (!content) return null
  
  // If Spanish requested and Spanish content exists, return Spanish version
  if (language === 'es') {
    return {
      title: content.titleEs || content.title,
      description: content.descriptionEs || content.description,
      benefits: content.benefitsEs || content.benefits,
      ageRange: content.ageRangeEs || content.ageRange,
      learningValue: content.learningValueEs || content.learningValue
    }
  }
  
  // Return English version
  return {
    title: content.title,
    description: content.description,
    benefits: content.benefits,
    ageRange: content.ageRange,
    learningValue: content.learningValue
  }
}
