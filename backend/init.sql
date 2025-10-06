-- Initial database setup script
-- This will be automatically executed when the database is first created

-- Sample data for kids painting website
INSERT INTO paintings (url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, svg_path, featured, view_count, created_at, updated_at) VALUES
('happy-elephant', 'Happy Elephant', 'A cute and friendly elephant with big ears!', 'Animals', 'elephant,animals,cute,easy', '/images/elephant.jpg', '/images/elephant-thumb.jpg', 1, '["#E8E8E8","#FFB6C1","#87CEEB","#90EE90"]', 'M50,50 L100,50 L100,100 L50,100 Z', true, 0, NOW(), NOW()),
('colorful-butterfly', 'Colorful Butterfly', 'A beautiful butterfly with colorful wings', 'Animals', 'butterfly,insects,colorful,nature', '/images/butterfly.jpg', '/images/butterfly-thumb.jpg', 2, '["#FF69B4","#FFD700","#87CEEB","#98FB98"]', 'M50,50 L100,50 L100,100 L50,100 Z', true, 0, NOW(), NOW()),
('smiling-sun', 'Smiling Sun', 'A bright and happy sun to color!', 'Nature', 'sun,nature,happy,easy', '/images/sun.jpg', '/images/sun-thumb.jpg', 1, '["#FFD700","#FFA500","#FF4500","#FFFF00"]', 'M50,50 L100,50 L100,100 L50,100 Z', true, 0, NOW(), NOW()),
('cute-puppy', 'Cute Puppy', 'An adorable puppy dog waiting to be colored', 'Animals', 'dog,puppy,pet,animals', '/images/puppy.jpg', '/images/puppy-thumb.jpg', 2, '["#8B4513","#D2691E","#FFE4C4","#000000"]', 'M50,50 L100,50 L100,100 L50,100 Z', false, 0, NOW(), NOW()),
('rainbow-unicorn', 'Rainbow Unicorn', 'A magical unicorn with a rainbow mane', 'Fantasy', 'unicorn,magic,rainbow,fantasy', '/images/unicorn.jpg', '/images/unicorn-thumb.jpg', 3, '["#FF69B4","#FFD700","#87CEEB","#98FB98","#DDA0DD"]', 'M50,50 L100,50 L100,100 L50,100 Z', true, 0, NOW(), NOW()),
('friendly-dinosaur', 'Friendly Dinosaur', 'A friendly T-Rex who loves to play', 'Animals', 'dinosaur,trex,prehistoric,fun', '/images/dinosaur.jpg', '/images/dinosaur-thumb.jpg', 2, '["#228B22","#32CD32","#FFFF00","#FF6347"]', 'M50,50 L100,50 L100,100 L50,100 Z', false, 0, NOW(), NOW()),
('ocean-fish', 'Ocean Fish', 'A tropical fish swimming in the ocean', 'Animals', 'fish,ocean,sea,water', '/images/fish.jpg', '/images/fish-thumb.jpg', 2, '["#FF6347","#FFD700","#1E90FF","#00CED1"]', 'M50,50 L100,50 L100,100 L50,100 Z', false, 0, NOW(), NOW()),
('beautiful-flower', 'Beautiful Flower', 'A pretty flower with petals to color', 'Nature', 'flower,nature,garden,plants', '/images/flower.jpg', '/images/flower-thumb.jpg', 1, '["#FF69B4","#FFD700","#32CD32","#87CEEB"]', 'M50,50 L100,50 L100,100 L50,100 Z', false, 0, NOW(), NOW()),
('race-car', 'Race Car', 'A super fast racing car!', 'Vehicles', 'car,racing,fast,vehicles', '/images/car.jpg', '/images/car-thumb.jpg', 3, '["#FF0000","#000000","#C0C0C0","#FFFF00"]', 'M50,50 L100,50 L100,100 L50,100 Z', true, 0, NOW(), NOW()),
('space-rocket', 'Space Rocket', 'A rocket ship ready to blast off!', 'Vehicles', 'rocket,space,astronaut,stars', '/images/rocket.jpg', '/images/rocket-thumb.jpg', 2, '["#FF0000","#C0C0C0","#1E90FF","#FFD700"]', 'M50,50 L100,50 L100,100 L50,100 Z', false, 0, NOW(), NOW())
ON CONFLICT DO NOTHING;
