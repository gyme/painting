-- Database Sync Script
-- This script ensures the remote database matches the local database
-- Date: 2025-10-09

-- Only add Owl Mandala (elephant and lion were removed due to image corruption)
-- Check if owl-mandala exists first, if not, insert it

INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, featured, view_count, created_at, updated_at)
SELECT 
  'owl-mandala',
  'Owl Mandala',
  'A wise owl mandala with intricate patterns perfect for relaxation!',
  'Mandalas',
  'owl,mandala,patterns,intricate,meditation,relaxing,coloring,kids,adults,wisdom',
  '/coloring-images/owl_mandala.png',
  '/coloring-images/owl_mandala.png',
  3,
  '["#8B4513","#D2691E","#DEB887","#F4A460","#CD853F"]',
  true,
  0,
  NOW(),
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM paintings WHERE url_key = 'owl-mandala'
);

-- Remove elephant and lion mandalas if they exist (images were corrupted/removed)
DELETE FROM paintings WHERE url_key = 'elephant-mandala';
DELETE FROM paintings WHERE url_key = 'lion-mandala';

-- Verify the sync
SELECT COUNT(*) as total_paintings FROM paintings;
SELECT url_key, title, category FROM paintings ORDER BY created_at DESC LIMIT 20;

