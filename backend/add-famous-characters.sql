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
