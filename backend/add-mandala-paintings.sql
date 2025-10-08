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

