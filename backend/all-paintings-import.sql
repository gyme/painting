-- Add 25 new paintings
-- Date: 2025-10-09

-- ============================================
-- MANDALAS (6 images)
-- ============================================

-- Elephant Mandala
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
VALUES (
  'elephant-mandala',
  'Elephant Mandala',
  'A beautiful elephant mandala with intricate patterns and designs!',
  'Animals',
  'elephant,mandala,patterns,intricate,meditation,relaxing,coloring,kids,adults',
  '/coloring-images/elephant_mandala.png',
  '/coloring-images/elephant_mandala.png',
  3,
  '["#FF6B6B","#4ECDC4","#45B7D1","#FFA07A","#98D8C8"]',
  true,
  0,
  NOW(),
  NOW()
);

-- Lion Mandala
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
VALUES (
  'lion-mandala',
  'Lion Mandala',
  'A majestic lion mandala with beautiful patterns and symmetry!',
  'Animals',
  'lion,mandala,patterns,intricate,meditation,relaxing,coloring,kids,adults',
  '/coloring-images/lion_mandala.png',
  '/coloring-images/lion_mandala.png',
  3,
  '["#FFD700","#FF8C00","#FF6347","#FFA500","#FFB347"]',
  true,
  0,
  NOW(),
  NOW()
);

-- Owl Mandala
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
VALUES (
  'owl-mandala',
  'Owl Mandala',
  'A wise owl mandala with intricate patterns perfect for relaxation!',
  'Animals',
  'owl,mandala,patterns,intricate,meditation,relaxing,coloring,kids,adults,wisdom',
  '/coloring-images/owl_mandala.png',
  '/coloring-images/owl_mandala.png',
  3,
  '["#8B4513","#D2691E","#DEB887","#F4A460","#CD853F"]',
  true,
  0,
  NOW(),
  NOW()
);

-- Bird Mandala
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
VALUES (
  'bird-mandala',
  'Bird Mandala',
  'A beautiful bird mandala with intricate feather patterns and symmetry!',
  'Animals',
  'bird,mandala,patterns,intricate,meditation,relaxing,coloring,kids,adults,feathers',
  '/coloring-images/bird_mandala.png',
  '/coloring-images/bird_mandala.png',
  3,
  '["#87CEEB","#4682B4","#5F9EA0","#6495ED","#B0E0E6"]',
  true,
  0,
  NOW(),
  NOW()
);

-- Medusa Mandala
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
VALUES (
  'medusa-mandala',
  'Medusa Mandala',
  'A mystical medusa mandala with flowing tentacles and ocean-inspired patterns!',
  'Animals',
  'medusa,jellyfish,mandala,patterns,intricate,meditation,relaxing,coloring,kids,adults,ocean,sea',
  '/coloring-images/meduza_mandala.png',
  '/coloring-images/meduza_mandala.png',
  3,
  '["#E6B3FF","#9966CC","#CC99FF","#B19CD9","#DDA0DD"]',
  true,
  0,
  NOW(),
  NOW()
);

-- Tiger Mandala
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
VALUES (
  'tiger-mandala',
  'Tiger Mandala',
  'A fierce and beautiful tiger mandala with bold stripes and intricate patterns!',
  'Animals',
  'tiger,mandala,patterns,intricate,meditation,relaxing,coloring,kids,adults,stripes,wild',
  '/coloring-images/tiger_mandala.png',
  '/coloring-images/tiger_mandala.png',
  3,
  '["#FF8C00","#FFA500","#FF6347","#FF7F50","#FFB347"]',
  true,
  0,
  NOW(),
  NOW()
);

-- ============================================
-- CUTE ANIMALS (4 images)
-- ============================================

-- Cute Bat
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
VALUES (
  'cute-bat',
  'Cute Bat',
  'An adorable bat with big wings perfect for Halloween or any time!',
  'Animals',
  'bat,cute,halloween,spooky,animal,wings,coloring,kids',
  '/coloring-images/cute_bat.png',
  '/coloring-images/cute_bat.png',
  2,
  '["#8B4789","#663399","#9370DB","#BA55D3","#DDA0DD"]',
  false,
  0,
  NOW(),
  NOW()
);

-- Cute Bear
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
VALUES (
  'cute-bear',
  'Cute Bear',
  'A sweet teddy bear with a friendly smile perfect for young artists!',
  'Animals',
  'bear,teddy,cute,animal,friendly,coloring,kids,toddler',
  '/coloring-images/cute_bear.png',
  '/coloring-images/cute_bear.png',
  1,
  '["#8B4513","#D2691E","#DEB887","#F4A460","#FFE4B5"]',
  false,
  0,
  NOW(),
  NOW()
);

-- Cute Elephant
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
VALUES (
  'cute-elephant',
  'Cute Elephant',
  'An adorable baby elephant with big ears and a cheerful expression!',
  'Animals',
  'elephant,cute,animal,baby,trunk,coloring,kids,toddler',
  '/coloring-images/cute_elephant.png',
  '/coloring-images/cute_elephant.png',
  1,
  '["#778899","#708090","#B0C4DE","#87CEEB","#E0E0E0"]',
  false,
  0,
  NOW(),
  NOW()
);

-- Cute Hamster
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
VALUES (
  'cute-hamster',
  'Cute Hamster',
  'A fluffy hamster with chubby cheeks perfect for pet lovers!',
  'Animals',
  'hamster,cute,pet,animal,rodent,fluffy,coloring,kids',
  '/coloring-images/cute_hamster.png',
  '/coloring-images/cute_hamster.png',
  2,
  '["#CD853F","#DEB887","#F5DEB3","#FFE4B5","#FAEBD7"]',
  false,
  0,
  NOW(),
  NOW()
);

-- ============================================
-- ANIMALS & NATURE (3 images)
-- ============================================

-- Flying Koala
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
VALUES (
  'flying-koala',
  'Flying Koala',
  'A whimsical koala soaring through the sky with magical wings!',
  'Animals',
  'koala,flying,fantasy,magical,animal,wings,coloring,kids,imaginative',
  '/coloring-images/flying_kuala.png',
  '/coloring-images/flying_kuala.png',
  2,
  '["#708090","#B0C4DE","#87CEEB","#ADD8E6","#F0F8FF"]',
  false,
  0,
  NOW(),
  NOW()
);

-- Koala Love
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
VALUES (
  'koala-love',
  'Koala Love',
  'An adorable koala hugging a tree with hearts and love!',
  'Animals',
  'koala,love,hearts,animal,cute,tree,australia,coloring,kids',
  '/coloring-images/koala_love.png',
  '/coloring-images/koala_love.png',
  2,
  '["#808080","#C0C0C0","#FF69B4","#FF1493","#FFB6C1"]',
  false,
  0,
  NOW(),
  NOW()
);

-- Bonsai
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
VALUES (
  'bonsai',
  'Bonsai Tree',
  'A beautiful miniature bonsai tree with intricate branches and leaves!',
  'Nature',
  'bonsai,tree,nature,zen,japanese,meditation,plants,coloring,kids,adults',
  '/coloring-images/bonsai.png',
  '/coloring-images/bonsai.png',
  2,
  '["#228B22","#2E8B57","#3CB371","#8FBC8F","#98D8C8"]',
  false,
  0,
  NOW(),
  NOW()
);

-- ============================================
-- FANTASY & FAIRY TALES (5 images)
-- ============================================

-- Fairy Butterfly
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
VALUES (
  'fairy-butterfly',
  'Fairy Butterfly',
  'A magical fairy with beautiful butterfly wings!',
  'Fantasy',
  'fairy,butterfly,wings,magical,fantasy,coloring,kids,girls,enchanted',
  '/coloring-images/fairy_butterfly.png',
  '/coloring-images/fairy_butterfly.png',
  2,
  '["#FF69B4","#FF1493","#DDA0DD","#EE82EE","#DA70D6"]',
  false,
  0,
  NOW(),
  NOW()
);

-- Fairy on a Flower
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
VALUES (
  'fairy-on-flower',
  'Fairy on a Flower',
  'A delicate fairy resting on a beautiful flower in an enchanted garden!',
  'Fantasy',
  'fairy,flower,garden,magical,fantasy,nature,coloring,kids,girls,enchanted',
  '/coloring-images/fairy_on_a_flower.png',
  '/coloring-images/fairy_on_a_flower.png',
  3,
  '["#FF69B4","#FFB6C1","#FFE4E1","#FFC0CB","#FF1493"]',
  false,
  0,
  NOW(),
  NOW()
);

-- Little Princess
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
VALUES (
  'little-princess',
  'Little Princess',
  'A charming little princess with a beautiful dress and crown!',
  'People',
  'princess,royalty,dress,crown,girl,fairy-tale,coloring,kids,girls',
  '/coloring-images/little_princess.png',
  '/coloring-images/little_princess.png',
  2,
  '["#FF69B4","#FFB6C1","#FFD700","#FFA500","#FF1493"]',
  false,
  0,
  NOW(),
  NOW()
);

-- Princess in the Wood
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
VALUES (
  'princess-in-wood',
  'Princess in the Wood',
  'A beautiful princess walking through an enchanted forest!',
  'Fantasy',
  'princess,forest,woods,nature,fairy-tale,magical,coloring,kids,girls,enchanted',
  '/coloring-images/princess_in_the_wood.png',
  '/coloring-images/princess_in_the_wood.png',
  3,
  '["#FF69B4","#32CD32","#228B22","#FFD700","#9370DB"]',
  false,
  0,
  NOW(),
  NOW()
);

-- Queen
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
VALUES (
  'queen',
  'Queen',
  'A regal queen with an elegant gown and sparkling crown!',
  'People',
  'queen,royalty,crown,elegant,dress,fairy-tale,coloring,kids,girls,adults',
  '/coloring-images/queen.png',
  '/coloring-images/queen.png',
  2,
  '["#9370DB","#8B008B","#FFD700","#FF69B4","#DDA0DD"]',
  false,
  0,
  NOW(),
  NOW()
);

-- ============================================
-- PROFESSIONS & ACTIVITIES (4 images)
-- ============================================

-- Astronaut
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
VALUES (
  'astronaut',
  'Astronaut',
  'An adventurous astronaut exploring space with a spacesuit!',
  'People',
  'astronaut,space,science,exploration,career,coloring,kids,educational',
  '/coloring-images/astronaut.png',
  '/coloring-images/astronaut.png',
  2,
  '["#4169E1","#1E90FF","#87CEEB","#C0C0C0","#FFD700"]',
  false,
  0,
  NOW(),
  NOW()
);

-- Drummer
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
VALUES (
  'drummer',
  'Drummer',
  'A talented drummer playing the drums with energy and rhythm!',
  'People',
  'drummer,music,instrument,musician,performance,coloring,kids,educational',
  '/coloring-images/drummer.png',
  '/coloring-images/drummer.png',
  2,
  '["#FF6347","#FFD700","#4169E1","#32CD32","#FF1493"]',
  false,
  0,
  NOW(),
  NOW()
);

-- Karate
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
VALUES (
  'karate',
  'Karate Kid',
  'A martial artist practicing karate moves with focus and discipline!',
  'People',
  'karate,martial-arts,sports,activity,kids,coloring,educational,fitness',
  '/coloring-images/karate.png',
  '/coloring-images/karate.png',
  2,
  '["#FFFFFF","#000000","#FFD700","#FF6347","#4169E1"]',
  false,
  0,
  NOW(),
  NOW()
);

-- Student
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
VALUES (
  'student',
  'Student',
  'A bright student learning and studying with books and supplies!',
  'People',
  'student,school,learning,education,books,coloring,kids,educational',
  '/coloring-images/student.png',
  '/coloring-images/student.png',
  1,
  '["#4169E1","#FFD700","#FF6347","#32CD32","#FFA500"]',
  false,
  0,
  NOW(),
  NOW()
);

-- ============================================
-- TOYS & FUN (2 images)
-- ============================================

-- Toy Builder
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
VALUES (
  'toy-builder',
  'Toy Builder',
  'A creative kid building with colorful toy blocks and bricks!',
  'People',
  'toys,building,blocks,creative,play,kids,coloring,fun',
  '/coloring-images/toy_builder.png',
  '/coloring-images/toy_builder.png',
  2,
  '["#FF6347","#4169E1","#FFD700","#32CD32","#FF69B4"]',
  false,
  0,
  NOW(),
  NOW()
);

-- Mushroom House
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
VALUES (
  'mushroom-house',
  'Mushroom House',
  'A whimsical mushroom house from a fairy tale forest!',
  'Fantasy',
  'mushroom,house,fairy-tale,fantasy,magical,nature,coloring,kids,imaginative',
  '/coloring-images/mushroom_house.png',
  '/coloring-images/mushroom_house.png',
  2,
  '["#FF6347","#DC143C","#FFFFFF","#32CD32","#228B22"]',
  false,
  0,
  NOW(),
  NOW()
);

-- ============================================
-- HOLIDAYS (3 images)
-- ============================================

-- Animal Holiday Gift
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
VALUES (
  'animal-holiday-gift',
  'Animal Holiday Gift',
  'A cute animal with holiday presents perfect for Christmas or celebrations!',
  'Holidays',
  'holiday,christmas,gift,present,animal,celebration,coloring,kids,festive',
  '/coloring-images/animal_holiday_gift.png',
  '/coloring-images/animal_holiday_gift.png',
  2,
  '["#DC143C","#228B22","#FFD700","#4169E1","#FF6347"]',
  false,
  0,
  NOW(),
  NOW()
);

-- Little Easter Bunny
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
VALUES (
  'little-easter-bunny',
  'Little Easter Bunny',
  'An adorable little bunny with Easter eggs and springtime joy!',
  'Holidays',
  'easter,bunny,rabbit,eggs,spring,holiday,coloring,kids,festive',
  '/coloring-images/little_easter_bunny.png',
  '/coloring-images/little_easter_bunny.png',
  2,
  '["#FFB6C1","#87CEEB","#98FB98","#FFD700","#FF69B4"]',
  false,
  0,
  NOW(),
  NOW()
);

-- Cute Scarecrow
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
VALUES (
  'cute-scarecrow',
  'Cute Scarecrow',
  'A friendly scarecrow perfect for fall and harvest time!',
  'Holidays',
  'scarecrow,fall,autumn,harvest,halloween,thanksgiving,coloring,kids,seasonal',
  '/coloring-images/cute_scarecrow.png',
  '/coloring-images/cute_scarecrow.png',
  2,
  '["#FF8C00","#8B4513","#FFD700","#DC143C","#228B22"]',
  false,
  0,
  NOW(),
  NOW()
);

-- ============================================
-- MAGICAL & WIZARD (1 image)
-- ============================================

-- Wizard
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
VALUES (
  'wizard',
  'Wizard',
  'A wise wizard with a magical staff and mystical powers!',
  'Fantasy',
  'wizard,magic,magical,fantasy,sorcerer,spell,coloring,kids,adults,mystical',
  '/coloring-images/wizzard.png',
  '/coloring-images/wizzard.png',
  3,
  '["#4B0082","#8B008B","#FFD700","#4169E1","#9370DB"]',
  false,
  0,
  NOW(),
  NOW()
);


-- Add 3 new Mandala paintings
-- Date: 2025-10-09

-- Elephant Mandala
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
VALUES (
  'elephant-mandala',
  'Elephant Mandala',
  'A beautiful elephant mandala with intricate patterns and designs!',
  'Animals',
  'elephant,mandala,patterns,intricate,meditation,relaxing,coloring,kids,adults',
  '/coloring-images/elephant_mandala.png',
  '/coloring-images/elephant_mandala.png',
  3,
  '["#FF6B6B","#4ECDC4","#45B7D1","#FFA07A","#98D8C8"]',
  true,
  0,
  NOW(),
  NOW()
);

-- Lion Mandala
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
VALUES (
  'lion-mandala',
  'Lion Mandala',
  'A majestic lion mandala with beautiful patterns and symmetry!',
  'Animals',
  'lion,mandala,patterns,intricate,meditation,relaxing,coloring,kids,adults',
  '/coloring-images/plion_mandala.png',
  '/coloring-images/lion_mandala.png',
  3,
  '["#FFD700","#FF8C00","#FF6347","#FFA500","#FFB347"]',
  true,
  0,
  NOW(),
  NOW()
);

-- Owl Mandala
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
VALUES (
  'owl-mandala',
  'Owl Mandala',
  'A wise owl mandala with intricate patterns perfect for relaxation!',
  'Animals',
  'owl,mandala,patterns,intricate,meditation,relaxing,coloring,kids,adults,wisdom',
  '/coloring-images/owl_mandala.png',
  '/coloring-images/owl_mandala.png',
  3,
  '["#8B4513","#D2691E","#DEB887","#F4A460","#CD853F"]',
  true,
  0,
  NOW(),
  NOW()
);

-- Add famous characters and popular figures to the database

INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, svg_path, featured, view_count, created_at, updated_at) VALUES
('stitch', 'Stitch with Ice Cream', 'The lovable blue alien Stitch enjoying a delicious ice cream cone!', 'Characters', 'stitch,disney,alien,lilo,cute,popular', 'https://via.placeholder.com/600x450/87CEEB/000000?text=Stitch', 'https://via.placeholder.com/400x300/87CEEB/000000?text=Stitch', 2, '["#0000FF","#FF69B4","#FFE4C4","#000000"]', '', true, 0, NOW(), NOW()),

('elsa-frozen', 'Queen Elsa', 'The Snow Queen Elsa from Frozen with her magical powers!', 'Characters', 'elsa,frozen,disney,princess,ice,magic', 'https://via.placeholder.com/600x450/87CEEB/000000?text=Elsa', 'https://via.placeholder.com/400x300/87CEEB/000000?text=Elsa', 3, '["#87CEEB","#FFFFFF","#FFD700","#DDA0DD"]', '', true, 0, NOW(), NOW()),

('anna-frozen', 'Princess Anna', 'Brave Princess Anna from Frozen ready for adventure!', 'Characters', 'anna,frozen,disney,princess,adventure', 'https://via.placeholder.com/600x450/FF6347/000000?text=Anna', 'https://via.placeholder.com/400x300/FF6347/000000?text=Anna', 3, '["#8B4513","#FF6347","#FFD700","#000000"]', '', true, 0, NOW(), NOW()),

('belle-beauty-beast', 'Belle Reading', 'Beautiful Belle from Beauty and the Beast with her favorite book!', 'Characters', 'belle,disney,princess,beauty,beast,reading', 'https://via.placeholder.com/600x450/FFD700/000000?text=Belle', 'https://via.placeholder.com/400x300/FFD700/000000?text=Belle', 3, '["#FFD700","#8B4513","#FF69B4","#FFFFFF"]', '', true, 0, NOW(), NOW()),

('ariel-mermaid', 'Ariel the Mermaid', 'Princess Ariel from The Little Mermaid under the sea!', 'Characters', 'ariel,disney,princess,mermaid,ocean,sea', 'https://via.placeholder.com/600x450/FF6347/000000?text=Ariel', 'https://via.placeholder.com/400x300/FF6347/000000?text=Ariel', 3, '["#FF0000","#00CED1","#FFE4C4","#9370DB"]', '', true, 0, NOW(), NOW()),

('mickey-mouse', 'Mickey Mouse', 'The classic Mickey Mouse with his big smile!', 'Characters', 'mickey,disney,mouse,classic,happy', 'https://via.placeholder.com/600x450/FF0000/000000?text=Mickey', 'https://via.placeholder.com/400x300/FF0000/000000?text=Mickey', 2, '["#FF0000","#000000","#FFFFFF","#FFD700"]', '', true, 0, NOW(), NOW()),

('minnie-mouse', 'Minnie Mouse', 'Sweet Minnie Mouse with her iconic bow!', 'Characters', 'minnie,disney,mouse,bow,cute', 'https://via.placeholder.com/600x450/FF69B4/000000?text=Minnie', 'https://via.placeholder.com/400x300/FF69B4/000000?text=Minnie', 2, '["#FF69B4","#000000","#FFFFFF","#FF0000"]', '', true, 0, NOW(), NOW()),

('spiderman', 'Spider-Man', 'Your friendly neighborhood Spider-Man swinging into action!', 'Characters', 'spiderman,marvel,superhero,action,cool', 'https://via.placeholder.com/600x450/FF0000/000000?text=Spider-Man', 'https://via.placeholder.com/400x300/FF0000/000000?text=Spider-Man', 3, '["#FF0000","#0000FF","#000000","#FFFFFF"]', '', true, 0, NOW(), NOW()),

('pikachu', 'Pikachu', 'The adorable electric Pokemon Pikachu!', 'Characters', 'pikachu,pokemon,cute,electric,yellow', 'https://via.placeholder.com/600x450/FFD700/000000?text=Pikachu', 'https://via.placeholder.com/400x300/FFD700/000000?text=Pikachu', 2, '["#FFD700","#FF0000","#000000","#8B4513"]', '', true, 0, NOW(), NOW()),

('olaf-frozen', 'Olaf the Snowman', 'Happy Olaf from Frozen who loves warm hugs!', 'Characters', 'olaf,frozen,disney,snowman,funny,cute', 'https://via.placeholder.com/600x450/FFFFFF/000000?text=Olaf', 'https://via.placeholder.com/400x300/FFFFFF/000000?text=Olaf', 2, '["#FFFFFF","#FFA500","#000000","#8B4513"]', '', true, 0, NOW(), NOW())

ON CONFLICT (url_key) DO NOTHING;
