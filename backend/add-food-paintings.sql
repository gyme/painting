-- SQL to add all food paintings with Spanish translations
-- Generated automatically - 19 paintings
-- All paintings are in the 'Food' category


-- 1. Apple (English)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'apple',
    'Apple',
    'A delicious apple coloring page! Perfect for learning about healthy fruits and nutrition.',
    'Food',
    1,
    'apple,fruit,healthy,food,snack,nutrition',
    '/coloring-images/apple.png',
    'en'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 1. Manzana (Spanish)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'apple',
    'Manzana',
    '¡Una deliciosa página para colorear de manzana! Perfecta para aprender sobre frutas saludables y nutrición.',
    'Food',
    1,
    'apple,fruit,healthy,food,snack,nutrition',
    '/coloring-images/apple.png',
    'es'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 2. Banana (English)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'banana',
    'Banana',
    'A fun banana coloring page! Kids can learn about this popular yellow fruit.',
    'Food',
    1,
    'banana,fruit,yellow,healthy,food,snack',
    '/coloring-images/banana.png',
    'en'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 2. Plátano (Spanish)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'banana',
    'Plátano',
    '¡Una divertida página para colorear de plátano! Los niños pueden aprender sobre esta popular fruta amarilla.',
    'Food',
    1,
    'banana,fruit,yellow,healthy,food,snack',
    '/coloring-images/banana.png',
    'es'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 3. Bread (English)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'bread',
    'Bread',
    'A delicious loaf of bread coloring page! Learn about baking and this staple food.',
    'Food',
    2,
    'bread,baking,food,bakery,loaf,wheat',
    '/coloring-images/bread.png',
    'en'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 3. Pan (Spanish)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'bread',
    'Pan',
    '¡Una deliciosa página para colorear de pan! Aprende sobre hornear y este alimento básico.',
    'Food',
    2,
    'bread,baking,food,bakery,loaf,wheat',
    '/coloring-images/bread.png',
    'es'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 4. Broccoli (English)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'broccoli',
    'Broccoli',
    'Healthy broccoli coloring page! A fun way to learn about green vegetables.',
    'Food',
    2,
    'broccoli,vegetable,healthy,green,food,nutrition',
    '/coloring-images/broccoli.png',
    'en'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 4. Brócoli (Spanish)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'broccoli',
    'Brócoli',
    '¡Página para colorear de brócoli saludable! Una forma divertida de aprender sobre verduras verdes.',
    'Food',
    2,
    'broccoli,vegetable,healthy,green,food,nutrition',
    '/coloring-images/broccoli.png',
    'es'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 5. Carrot (English)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'carrot',
    'Carrot',
    'A crunchy carrot coloring page! Perfect for learning about orange vegetables.',
    'Food',
    1,
    'carrot,vegetable,healthy,orange,food,crunchy',
    '/coloring-images/carrot.png',
    'en'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 5. Zanahoria (Spanish)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'carrot',
    'Zanahoria',
    '¡Una página para colorear de zanahoria crujiente! Perfecta para aprender sobre verduras naranjas.',
    'Food',
    1,
    'carrot,vegetable,healthy,orange,food,crunchy',
    '/coloring-images/carrot.png',
    'es'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 6. Cheese (English)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'cheese',
    'Cheese',
    'Delicious cheese coloring page! Kids can color this tasty dairy product.',
    'Food',
    2,
    'cheese,dairy,food,snack,yellow',
    '/coloring-images/cheese.png',
    'en'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 6. Queso (Spanish)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'cheese',
    'Queso',
    '¡Deliciosa página para colorear de queso! Los niños pueden colorear este sabroso producto lácteo.',
    'Food',
    2,
    'cheese,dairy,food,snack,yellow',
    '/coloring-images/cheese.png',
    'es'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 7. Corn (English)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'corn',
    'Corn',
    'Sweet corn on the cob coloring page! A fun vegetable that kids love to eat and color.',
    'Food',
    2,
    'corn,vegetable,yellow,food,cob,sweet',
    '/coloring-images/corn.png',
    'en'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 7. Maíz (Spanish)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'corn',
    'Maíz',
    '¡Página para colorear de mazorca de maíz dulce! Una verdura divertida que a los niños les encanta comer y colorear.',
    'Food',
    2,
    'corn,vegetable,yellow,food,cob,sweet',
    '/coloring-images/corn.png',
    'es'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 8. Cupcake (English)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'cupcake',
    'Cupcake',
    'A sweet cupcake coloring page! Perfect for birthday parties and celebrations.',
    'Food',
    2,
    'cupcake,dessert,sweet,cake,birthday,treat',
    '/coloring-images/cupcake.png',
    'en'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 8. Cupcake (Spanish)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'cupcake',
    'Cupcake',
    '¡Una dulce página para colorear de cupcake! Perfecta para fiestas de cumpleaños y celebraciones.',
    'Food',
    2,
    'cupcake,dessert,sweet,cake,birthday,treat',
    '/coloring-images/cupcake.png',
    'es'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 9. Donuts (English)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'donuts',
    'Donuts',
    'Yummy donuts coloring page! Sweet treats with frosting and sprinkles to color.',
    'Food',
    2,
    'donuts,dessert,sweet,treats,frosting,sprinkles',
    '/coloring-images/donuts.png',
    'en'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 9. Donas (Spanish)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'donuts',
    'Donas',
    '¡Página para colorear de donas deliciosas! Dulces con glaseado y chispas para colorear.',
    'Food',
    2,
    'donuts,dessert,sweet,treats,frosting,sprinkles',
    '/coloring-images/donuts.png',
    'es'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 10. French Fries (English)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'fries',
    'French Fries',
    'Crispy french fries coloring page! A popular fast food favorite.',
    'Food',
    2,
    'fries,french fries,fast food,potatoes,snack',
    '/coloring-images/fries.png',
    'en'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 10. Papas Fritas (Spanish)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'fries',
    'Papas Fritas',
    '¡Página para colorear de papas fritas crujientes! Un favorito popular de comida rápida.',
    'Food',
    2,
    'fries,french fries,fast food,potatoes,snack',
    '/coloring-images/fries.png',
    'es'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 11. Grapes (English)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'grapes',
    'Grapes',
    'A bunch of delicious grapes coloring page! Learn about this healthy fruit.',
    'Food',
    2,
    'grapes,fruit,healthy,purple,bunch,snack',
    '/coloring-images/grapes.png',
    'en'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 11. Uvas (Spanish)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'grapes',
    'Uvas',
    '¡Una página para colorear de un racimo de uvas deliciosas! Aprende sobre esta fruta saludable.',
    'Food',
    2,
    'grapes,fruit,healthy,purple,bunch,snack',
    '/coloring-images/grapes.png',
    'es'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 12. Hamburger (English)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'hamburger',
    'Hamburger',
    'A juicy hamburger coloring page! Color the bun, patty, lettuce, and toppings.',
    'Food',
    2,
    'hamburger,burger,fast food,lunch,sandwich',
    '/coloring-images/humburger.png',
    'en'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 12. Hamburguesa (Spanish)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'hamburger',
    'Hamburguesa',
    '¡Una página para colorear de hamburguesa jugosa! Colorea el pan, la carne, la lechuga y los ingredientes.',
    'Food',
    2,
    'hamburger,burger,fast food,lunch,sandwich',
    '/coloring-images/humburger.png',
    'es'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 13. Hot Dog (English)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'hotdog',
    'Hot Dog',
    'A tasty hot dog coloring page! Perfect for picnics and barbecues.',
    'Food',
    2,
    'hotdog,hot dog,fast food,picnic,bbq,sandwich',
    '/coloring-images/hotdog.png',
    'en'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 13. Perrito Caliente (Spanish)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'hotdog',
    'Perrito Caliente',
    '¡Una página para colorear de perrito caliente sabroso! Perfecta para picnics y barbacoas.',
    'Food',
    2,
    'hotdog,hot dog,fast food,picnic,bbq,sandwich',
    '/coloring-images/hotdog.png',
    'es'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 14. Ice Cream (English)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'ice-cream',
    'Ice Cream',
    'Delicious ice cream cone coloring page! A sweet summer treat to color.',
    'Food',
    2,
    'ice cream,dessert,sweet,cone,summer,treat',
    '/coloring-images/ice_cream.png',
    'en'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 14. Helado (Spanish)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'ice-cream',
    'Helado',
    '¡Deliciosa página para colorear de cono de helado! Un dulce regalo de verano para colorear.',
    'Food',
    2,
    'ice cream,dessert,sweet,cone,summer,treat',
    '/coloring-images/ice_cream.png',
    'es'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 15. Pineapple (English)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'pineapple',
    'Pineapple',
    'A tropical pineapple coloring page! Learn about this sweet and tangy fruit.',
    'Food',
    2,
    'pineapple,fruit,tropical,yellow,sweet,healthy',
    '/coloring-images/pineapple.png',
    'en'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 15. Piña (Spanish)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'pineapple',
    'Piña',
    '¡Una página para colorear de piña tropical! Aprende sobre esta fruta dulce y ácida.',
    'Food',
    2,
    'pineapple,fruit,tropical,yellow,sweet,healthy',
    '/coloring-images/pineapple.png',
    'es'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 16. Pizza (English)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'pizza',
    'Pizza',
    'A delicious pizza slice coloring page! Color the cheese, sauce, and toppings.',
    'Food',
    2,
    'pizza,italian,food,cheese,slice,dinner',
    '/coloring-images/pizza.png',
    'en'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 16. Pizza (Spanish)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'pizza',
    'Pizza',
    '¡Una deliciosa página para colorear de rebanada de pizza! Colorea el queso, la salsa y los ingredientes.',
    'Food',
    2,
    'pizza,italian,food,cheese,slice,dinner',
    '/coloring-images/pizza.png',
    'es'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 17. Sushi (English)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'sushi',
    'Sushi',
    'Traditional Japanese sushi coloring page! Learn about this healthy and delicious food.',
    'Food',
    3,
    'sushi,japanese,food,rice,fish,healthy,asian',
    '/coloring-images/sushi.png',
    'en'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 17. Sushi (Spanish)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'sushi',
    'Sushi',
    '¡Página para colorear de sushi japonés tradicional! Aprende sobre esta comida saludable y deliciosa.',
    'Food',
    3,
    'sushi,japanese,food,rice,fish,healthy,asian',
    '/coloring-images/sushi.png',
    'es'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 18. Tortilla (English)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'tortilla',
    'Tortilla',
    'A stack of tortillas coloring page! Learn about this important Mexican food.',
    'Food',
    2,
    'tortilla,mexican,food,flatbread,corn,flour',
    '/coloring-images/tortilla.png',
    'en'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 18. Tortilla (Spanish)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'tortilla',
    'Tortilla',
    '¡Una página para colorear de pila de tortillas! Aprende sobre esta importante comida mexicana.',
    'Food',
    2,
    'tortilla,mexican,food,flatbread,corn,flour',
    '/coloring-images/tortilla.png',
    'es'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 19. Watermelon (English)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'watermelon',
    'Watermelon',
    'A juicy watermelon slice coloring page! Perfect summer fruit to color.',
    'Food',
    2,
    'watermelon,fruit,summer,juicy,red,healthy',
    '/coloring-images/watermelon.png',
    'en'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;


-- 19. Sandía (Spanish)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    'watermelon',
    'Sandía',
    '¡Una página para colorear de rebanada de sandía jugosa! Fruta de verano perfecta para colorear.',
    'Food',
    2,
    'watermelon,fruit,summer,juicy,red,healthy',
    '/coloring-images/watermelon.png',
    'es'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;
