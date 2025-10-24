-- SQL to add new holiday paintings with Spanish translations
-- Generated automatically


-- 1. Hanukkah Menorah (English)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'hanuka-menorah',
    'Hanukkah Menorah',
    'A beautiful Hanukkah menorah coloring page perfect for celebrating the Festival of Lights! Kids can color the nine branches and learn about this special Jewish holiday tradition.',
    'Holidays',
    2,
    'hanukkah,menorah,jewish,holiday,festival,lights,candles,tradition',
    '/coloring-images/hanuka_menorah.png',
    'en'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 1. Menorá de Hanukkah (Spanish)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'hanuka-menorah',
    'Menorá de Hanukkah',
    '¡Una hermosa página para colorear de menorá de Hanukkah perfecta para celebrar la Fiesta de las Luces! Los niños pueden colorear las nueve ramas y aprender sobre esta tradición especial de la festividad judía.',
    'Holidays',
    2,
    'hanukkah,menorah,jewish,holiday,festival,lights,candles,tradition',
    '/coloring-images/hanuka_menorah.png',
    'es'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 2. Christmas Stockings (English)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'christmas-socks',
    'Christmas Stockings',
    'Festive Christmas stockings hanging by the fireplace! A fun coloring page featuring decorative holiday socks ready to be filled with treats and surprises.',
    'Holidays',
    1,
    'christmas,stockings,socks,holiday,fireplace,gifts,santa,decoration',
    '/coloring-images/christmas_socks.png',
    'en'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 2. Calcetines de Navidad (Spanish)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'christmas-socks',
    'Calcetines de Navidad',
    '¡Calcetines navideños festivos colgando junto a la chimenea! Una divertida página para colorear con calcetines decorativos listos para llenarse de golosinas y sorpresas.',
    'Holidays',
    1,
    'christmas,stockings,socks,holiday,fireplace,gifts,santa,decoration',
    '/coloring-images/christmas_socks.png',
    'es'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 3. Rudolph the Red-Nosed Reindeer (English)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'rudolph-the-reindeer',
    'Rudolph the Red-Nosed Reindeer',
    'The most famous reindeer of all! Color Rudolph with his bright red nose as he gets ready to guide Santa's sleigh through the snowy night.',
    'Holidays',
    2,
    'rudolph,reindeer,christmas,santa,red nose,holiday,sleigh,winter',
    '/coloring-images/rudolph.png',
    'en'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 3. Rodolfo el Reno de Nariz Roja (Spanish)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'rudolph-the-reindeer',
    'Rodolfo el Reno de Nariz Roja',
    '¡El reno más famoso de todos! Colorea a Rodolfo con su brillante nariz roja mientras se prepara para guiar el trineo de Santa en la noche nevada.',
    'Holidays',
    2,
    'rudolph,reindeer,christmas,santa,red nose,holiday,sleigh,winter',
    '/coloring-images/rudolph.png',
    'es'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 4. Santa Claus (English)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'santa-claus',
    'Santa Claus',
    'Ho ho ho! Santa Claus is ready to deliver presents! Color jolly Santa with his big beard, red suit, and warm smile as he prepares for Christmas Eve.',
    'Holidays',
    2,
    'santa,santa claus,christmas,holiday,presents,gifts,north pole,beard',
    '/coloring-images/santa_clause.png',
    'en'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 4. Papá Noel (Spanish)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'santa-claus',
    'Papá Noel',
    '¡Jo jo jo! ¡Papá Noel está listo para entregar regalos! Colorea al alegre Santa con su gran barba, traje rojo y cálida sonrisa mientras se prepara para la Nochebuena.',
    'Holidays',
    2,
    'santa,santa claus,christmas,holiday,presents,gifts,north pole,beard',
    '/coloring-images/santa_clause.png',
    'es'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 5. Christmas Tree (English)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'christmas-tree',
    'Christmas Tree',
    'A beautifully decorated Christmas tree! Color the ornaments, lights, star on top, and presents underneath this festive holiday tree.',
    'Holidays',
    2,
    'christmas,tree,ornaments,decorations,holiday,star,presents,festive',
    '/coloring-images/christmas_tree.png',
    'en'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 5. Árbol de Navidad (Spanish)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'christmas-tree',
    'Árbol de Navidad',
    '¡Un hermoso árbol de Navidad decorado! Colorea los adornos, las luces, la estrella en la punta y los regalos debajo de este festivo árbol navideño.',
    'Holidays',
    2,
    'christmas,tree,ornaments,decorations,holiday,star,presents,festive',
    '/coloring-images/christmas_tree.png',
    'es'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;
