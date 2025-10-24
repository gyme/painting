-- Add Italian Brainrot Paintings for H2 Database
-- A new fun category with Italian meme phrases
-- Date: 2025-10-15

-- ============================================
-- ITALIAN BRAINROT CATEGORY (8 images)
-- ============================================

-- Brr Brr Patapim
MERGE INTO paintings (id, url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, title_es, description_es, created_at, updated_at)
KEY (url_key)
VALUES (
  NULL,
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
  CURRENT_TIMESTAMP(),
  CURRENT_TIMESTAMP()
);

-- Cappuccino Assassino
MERGE INTO paintings (id, url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, title_es, description_es, created_at, updated_at)
KEY (url_key)
VALUES (
  NULL,
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
  CURRENT_TIMESTAMP(),
  CURRENT_TIMESTAMP()
);

-- Capuchina Ballerina
MERGE INTO paintings (id, url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, title_es, description_es, created_at, updated_at)
KEY (url_key)
VALUES (
  NULL,
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
  CURRENT_TIMESTAMP(),
  CURRENT_TIMESTAMP()
);

-- Chimpanzini Bananini
MERGE INTO paintings (id, url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, title_es, description_es, created_at, updated_at)
KEY (url_key)
VALUES (
  NULL,
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
  CURRENT_TIMESTAMP(),
  CURRENT_TIMESTAMP()
);

-- Lirili Larila
MERGE INTO paintings (id, url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, title_es, description_es, created_at, updated_at)
KEY (url_key)
VALUES (
  NULL,
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
  CURRENT_TIMESTAMP(),
  CURRENT_TIMESTAMP()
);

-- Thung Thung Thung Sahur
MERGE INTO paintings (id, url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, title_es, description_es, created_at, updated_at)
KEY (url_key)
VALUES (
  NULL,
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
  CURRENT_TIMESTAMP(),
  CURRENT_TIMESTAMP()
);

-- Tralalero Tralala
MERGE INTO paintings (id, url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, title_es, description_es, created_at, updated_at)
KEY (url_key)
VALUES (
  NULL,
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
  CURRENT_TIMESTAMP(),
  CURRENT_TIMESTAMP()
);

-- Udin Din Din Dun
MERGE INTO paintings (id, url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, title_es, description_es, created_at, updated_at)
KEY (url_key)
VALUES (
  NULL,
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
  CURRENT_TIMESTAMP(),
  CURRENT_TIMESTAMP()
);

-- Commit the changes
COMMIT;





