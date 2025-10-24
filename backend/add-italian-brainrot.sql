-- Add Italian Brainrot Paintings
-- A new fun category with Italian meme phrases
-- Date: 2025-10-15

-- ============================================
-- ITALIAN BRAINROT CATEGORY (8 images)
-- ============================================

-- Brr Brr Patapim
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, title_es, description_es, created_at, updated_at)
VALUES (
  'brr-brr-patapim',
  'Brr Brr Patapim',
  'A fun Italian meme phrase - brr brr patapim! Perfect for creative coloring!',
  'Italian Brainrot',
  'italian,meme,brainrot,fun,viral,trending,humor,kids,teen',
  '/coloring-images/brr_brr_patapim.png',
  '/coloring-images/brr_brr_patapim.png',
  2,
  '["#FF6B6B","#4ECDC4","#45B7D1","#FFA07A","#98D8C8"]',
  true,
  0,
  '¡Brr Brr Patapim!',
  '¡Una divertida frase meme italiana - brr brr patapim! ¡Perfecta para colorear creativamente!',
  NOW(),
  NOW()
) ON CONFLICT (url_key) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags,
  image_url = EXCLUDED.image_url,
  thumbnail_url = EXCLUDED.thumbnail_url,
  difficulty = EXCLUDED.difficulty,
  color_palette = EXCLUDED.color_palette,
  featured = EXCLUDED.featured,
  title_es = EXCLUDED.title_es,
  description_es = EXCLUDED.description_es,
  updated_at = NOW();

-- Cappuccino Assassino
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, title_es, description_es, created_at, updated_at)
VALUES (
  'cappuccino-assassino',
  'Cappuccino Assassino',
  'The legendary cappuccino assassino! A funny Italian meme for creative kids!',
  'Italian Brainrot',
  'italian,meme,brainrot,cappuccino,coffee,humor,viral,trending,kids,teen',
  '/coloring-images/cappuccino_assassino.png',
  '/coloring-images/cappuccino_assassino.png',
  2,
  '["#6F4E37","#D2691E","#F5DEB3","#FFE4C4","#8B4513"]',
  true,
  0,
  'Cappuccino Asesino',
  '¡El legendario cappuccino assassino! ¡Un divertido meme italiano para niños creativos!',
  NOW(),
  NOW()
) ON CONFLICT (url_key) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags,
  image_url = EXCLUDED.image_url,
  thumbnail_url = EXCLUDED.thumbnail_url,
  difficulty = EXCLUDED.difficulty,
  color_palette = EXCLUDED.color_palette,
  featured = EXCLUDED.featured,
  title_es = EXCLUDED.title_es,
  description_es = EXCLUDED.description_es,
  updated_at = NOW();

-- Capuchina Ballerina
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, title_es, description_es, created_at, updated_at)
VALUES (
  'capuchina-ballerina',
  'Capuchina Ballerina',
  'A dancing capuchina ballerina! A whimsical Italian meme character!',
  'Italian Brainrot',
  'italian,meme,brainrot,ballerina,dance,humor,viral,trending,kids,teen',
  '/coloring-images/capuchina_ballerina.png',
  '/coloring-images/capuchina_ballerina.png',
  2,
  '["#FF69B4","#FFB6C1","#FF1493","#DDA0DD","#FFC0CB"]',
  false,
  0,
  'Capuchina Bailarina',
  '¡Una bailarina capuchina danzante! ¡Un caprichoso personaje de meme italiano!',
  NOW(),
  NOW()
) ON CONFLICT (url_key) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags,
  image_url = EXCLUDED.image_url,
  thumbnail_url = EXCLUDED.thumbnail_url,
  difficulty = EXCLUDED.difficulty,
  color_palette = EXCLUDED.color_palette,
  featured = EXCLUDED.featured,
  title_es = EXCLUDED.title_es,
  description_es = EXCLUDED.description_es,
  updated_at = NOW();

-- Chimpanzini Bananini
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, title_es, description_es, created_at, updated_at)
VALUES (
  'chimpanzini-bananini',
  'Chimpanzini Bananini',
  'Chimpanzini bananini! A funny Italian rhyme meme about monkeys and bananas!',
  'Italian Brainrot',
  'italian,meme,brainrot,monkey,banana,humor,viral,trending,kids,teen',
  '/coloring-images/chimpanzini_bananini.png',
  '/coloring-images/chimpanzini_bananini.png',
  2,
  '["#8B4513","#FFD700","#FFA500","#FFFF00","#D2691E"]',
  false,
  0,
  '¡Chimpancitos Bananitas!',
  '¡Chimpanzini bananini! ¡Una divertida rima de meme italiano sobre monos y plátanos!',
  NOW(),
  NOW()
) ON CONFLICT (url_key) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags,
  image_url = EXCLUDED.image_url,
  thumbnail_url = EXCLUDED.thumbnail_url,
  difficulty = EXCLUDED.difficulty,
  color_palette = EXCLUDED.color_palette,
  featured = EXCLUDED.featured,
  title_es = EXCLUDED.title_es,
  description_es = EXCLUDED.description_es,
  updated_at = NOW();

-- Lirili Larila
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, title_es, description_es, created_at, updated_at)
VALUES (
  'lirili-larila',
  'Lirili Larila',
  'Lirili larila! A catchy Italian meme phrase that everyone loves!',
  'Italian Brainrot',
  'italian,meme,brainrot,music,fun,humor,viral,trending,kids,teen',
  '/coloring-images/lirili_larila.png',
  '/coloring-images/lirili_larila.png',
  2,
  '["#87CEEB","#4682B4","#5F9EA0","#6495ED","#B0E0E6"]',
  false,
  0,
  '¡Lirili Larila!',
  '¡Lirili larila! ¡Una pegadiza frase de meme italiano que todos aman!',
  NOW(),
  NOW()
) ON CONFLICT (url_key) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags,
  image_url = EXCLUDED.image_url,
  thumbnail_url = EXCLUDED.thumbnail_url,
  difficulty = EXCLUDED.difficulty,
  color_palette = EXCLUDED.color_palette,
  featured = EXCLUDED.featured,
  title_es = EXCLUDED.title_es,
  description_es = EXCLUDED.description_es,
  updated_at = NOW();

-- Thung Thung Thung Sahur
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, title_es, description_es, created_at, updated_at)
VALUES (
  'thung-thung-thung-sahur',
  'Thung Thung Thung Sahur',
  'Thung thung thung sahur! A rhythmic Italian meme that makes everyone laugh!',
  'Italian Brainrot',
  'italian,meme,brainrot,rhythm,music,humor,viral,trending,kids,teen',
  '/coloring-images/thung_thung_thung_sahur.png',
  '/coloring-images/thung_thung_thung_sahur.png',
  2,
  '["#FF6347","#FF4500","#FFA500","#FFD700","#FF8C00"]',
  false,
  0,
  '¡Thung Thung Thung Sahur!',
  '¡Thung thung thung sahur! ¡Un meme italiano rítmico que hace reír a todos!',
  NOW(),
  NOW()
) ON CONFLICT (url_key) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags,
  image_url = EXCLUDED.image_url,
  thumbnail_url = EXCLUDED.thumbnail_url,
  difficulty = EXCLUDED.difficulty,
  color_palette = EXCLUDED.color_palette,
  featured = EXCLUDED.featured,
  title_es = EXCLUDED.title_es,
  description_es = EXCLUDED.description_es,
  updated_at = NOW();

-- Tralalero Tralala
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, title_es, description_es, created_at, updated_at)
VALUES (
  'tralalero-tralala',
  'Tralalero Tralala',
  'Tralalero tralala! A musical Italian meme phrase full of joy and fun!',
  'Italian Brainrot',
  'italian,meme,brainrot,music,singing,humor,viral,trending,kids,teen',
  '/coloring-images/tralalero_tralala.png',
  '/coloring-images/tralalero_tralala.png',
  2,
  '["#9370DB","#8B008B","#BA55D3","#DDA0DD","#EE82EE"]',
  false,
  0,
  '¡Tralalero Tralala!',
  '¡Tralalero tralala! ¡Una frase musical de meme italiano llena de alegría y diversión!',
  NOW(),
  NOW()
) ON CONFLICT (url_key) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags,
  image_url = EXCLUDED.image_url,
  thumbnail_url = EXCLUDED.thumbnail_url,
  difficulty = EXCLUDED.difficulty,
  color_palette = EXCLUDED.color_palette,
  featured = EXCLUDED.featured,
  title_es = EXCLUDED.title_es,
  description_es = EXCLUDED.description_es,
  updated_at = NOW();

-- Udin Din Din Dun
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, title_es, description_es, created_at, updated_at)
VALUES (
  'udin-din-din-dun',
  'Udin Din Din Dun',
  'Udin din din dun! A catchy Italian meme beat that gets stuck in your head!',
  'Italian Brainrot',
  'italian,meme,brainrot,beat,music,humor,viral,trending,kids,teen',
  '/coloring-images/udin_din_din_dun.png',
  '/coloring-images/udin_din_din_dun.png',
  2,
  '["#32CD32","#228B22","#90EE90","#98FB98","#00FF00"]',
  false,
  0,
  '¡Udin Din Din Dun!',
  '¡Udin din din dun! ¡Un pegadizo ritmo de meme italiano que se queda en tu cabeza!',
  NOW(),
  NOW()
) ON CONFLICT (url_key) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags,
  image_url = EXCLUDED.image_url,
  thumbnail_url = EXCLUDED.thumbnail_url,
  difficulty = EXCLUDED.difficulty,
  color_palette = EXCLUDED.color_palette,
  featured = EXCLUDED.featured,
  title_es = EXCLUDED.title_es,
  description_es = EXCLUDED.description_es,
  updated_at = NOW();

-- Commit the changes
COMMIT;

-- Verify the new paintings were added
SELECT id, url_key, title, title_es, category, featured 
FROM paintings 
WHERE category = 'Italian Brainrot' 
ORDER BY created_at DESC;





