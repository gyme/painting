#!/usr/bin/env python3
"""
Script to add all new food paintings to the database with Spanish translations
"""

import os
import sys

# All new food paintings with English and Spanish metadata
NEW_FOOD_PAINTINGS = [
    {
        "url_key": "apple",
        "title_en": "Apple",
        "title_es": "Manzana",
        "description_en": "A delicious apple coloring page! Perfect for learning about healthy fruits and nutrition.",
        "description_es": "¡Una deliciosa página para colorear de manzana! Perfecta para aprender sobre frutas saludables y nutrición.",
        "category": "Food",
        "difficulty": 1,
        "tags": "apple,fruit,healthy,food,snack,nutrition",
        "image_file": "apple.png"
    },
    {
        "url_key": "banana",
        "title_en": "Banana",
        "title_es": "Plátano",
        "description_en": "A fun banana coloring page! Kids can learn about this popular yellow fruit.",
        "description_es": "¡Una divertida página para colorear de plátano! Los niños pueden aprender sobre esta popular fruta amarilla.",
        "category": "Food",
        "difficulty": 1,
        "tags": "banana,fruit,yellow,healthy,food,snack",
        "image_file": "banana.png"
    },
    {
        "url_key": "bread",
        "title_en": "Bread",
        "title_es": "Pan",
        "description_en": "A delicious loaf of bread coloring page! Learn about baking and this staple food.",
        "description_es": "¡Una deliciosa página para colorear de pan! Aprende sobre hornear y este alimento básico.",
        "category": "Food",
        "difficulty": 2,
        "tags": "bread,baking,food,bakery,loaf,wheat",
        "image_file": "bread.png"
    },
    {
        "url_key": "broccoli",
        "title_en": "Broccoli",
        "title_es": "Brócoli",
        "description_en": "Healthy broccoli coloring page! A fun way to learn about green vegetables.",
        "description_es": "¡Página para colorear de brócoli saludable! Una forma divertida de aprender sobre verduras verdes.",
        "category": "Food",
        "difficulty": 2,
        "tags": "broccoli,vegetable,healthy,green,food,nutrition",
        "image_file": "broccoli.png"
    },
    {
        "url_key": "carrot",
        "title_en": "Carrot",
        "title_es": "Zanahoria",
        "description_en": "A crunchy carrot coloring page! Perfect for learning about orange vegetables.",
        "description_es": "¡Una página para colorear de zanahoria crujiente! Perfecta para aprender sobre verduras naranjas.",
        "category": "Food",
        "difficulty": 1,
        "tags": "carrot,vegetable,healthy,orange,food,crunchy",
        "image_file": "carrot.png"
    },
    {
        "url_key": "cheese",
        "title_en": "Cheese",
        "title_es": "Queso",
        "description_en": "Delicious cheese coloring page! Kids can color this tasty dairy product.",
        "description_es": "¡Deliciosa página para colorear de queso! Los niños pueden colorear este sabroso producto lácteo.",
        "category": "Food",
        "difficulty": 2,
        "tags": "cheese,dairy,food,snack,yellow",
        "image_file": "cheese.png"
    },
    {
        "url_key": "corn",
        "title_en": "Corn",
        "title_es": "Maíz",
        "description_en": "Sweet corn on the cob coloring page! A fun vegetable that kids love to eat and color.",
        "description_es": "¡Página para colorear de mazorca de maíz dulce! Una verdura divertida que a los niños les encanta comer y colorear.",
        "category": "Food",
        "difficulty": 2,
        "tags": "corn,vegetable,yellow,food,cob,sweet",
        "image_file": "corn.png"
    },
    {
        "url_key": "cupcake",
        "title_en": "Cupcake",
        "title_es": "Cupcake",
        "description_en": "A sweet cupcake coloring page! Perfect for birthday parties and celebrations.",
        "description_es": "¡Una dulce página para colorear de cupcake! Perfecta para fiestas de cumpleaños y celebraciones.",
        "category": "Food",
        "difficulty": 2,
        "tags": "cupcake,dessert,sweet,cake,birthday,treat",
        "image_file": "cupcake.png"
    },
    {
        "url_key": "donuts",
        "title_en": "Donuts",
        "title_es": "Donas",
        "description_en": "Yummy donuts coloring page! Sweet treats with frosting and sprinkles to color.",
        "description_es": "¡Página para colorear de donas deliciosas! Dulces con glaseado y chispas para colorear.",
        "category": "Food",
        "difficulty": 2,
        "tags": "donuts,dessert,sweet,treats,frosting,sprinkles",
        "image_file": "donuts.png"
    },
    {
        "url_key": "fries",
        "title_en": "French Fries",
        "title_es": "Papas Fritas",
        "description_en": "Crispy french fries coloring page! A popular fast food favorite.",
        "description_es": "¡Página para colorear de papas fritas crujientes! Un favorito popular de comida rápida.",
        "category": "Food",
        "difficulty": 2,
        "tags": "fries,french fries,fast food,potatoes,snack",
        "image_file": "fries.png"
    },
    {
        "url_key": "grapes",
        "title_en": "Grapes",
        "title_es": "Uvas",
        "description_en": "A bunch of delicious grapes coloring page! Learn about this healthy fruit.",
        "description_es": "¡Una página para colorear de un racimo de uvas deliciosas! Aprende sobre esta fruta saludable.",
        "category": "Food",
        "difficulty": 2,
        "tags": "grapes,fruit,healthy,purple,bunch,snack",
        "image_file": "grapes.png"
    },
    {
        "url_key": "hamburger",
        "title_en": "Hamburger",
        "title_es": "Hamburguesa",
        "description_en": "A juicy hamburger coloring page! Color the bun, patty, lettuce, and toppings.",
        "description_es": "¡Una página para colorear de hamburguesa jugosa! Colorea el pan, la carne, la lechuga y los ingredientes.",
        "category": "Food",
        "difficulty": 2,
        "tags": "hamburger,burger,fast food,lunch,sandwich",
        "image_file": "humburger.png"
    },
    {
        "url_key": "hotdog",
        "title_en": "Hot Dog",
        "title_es": "Perrito Caliente",
        "description_en": "A tasty hot dog coloring page! Perfect for picnics and barbecues.",
        "description_es": "¡Una página para colorear de perrito caliente sabroso! Perfecta para picnics y barbacoas.",
        "category": "Food",
        "difficulty": 2,
        "tags": "hotdog,hot dog,fast food,picnic,bbq,sandwich",
        "image_file": "hotdog.png"
    },
    {
        "url_key": "ice-cream",
        "title_en": "Ice Cream",
        "title_es": "Helado",
        "description_en": "Delicious ice cream cone coloring page! A sweet summer treat to color.",
        "description_es": "¡Deliciosa página para colorear de cono de helado! Un dulce regalo de verano para colorear.",
        "category": "Food",
        "difficulty": 2,
        "tags": "ice cream,dessert,sweet,cone,summer,treat",
        "image_file": "ice_cream.png"
    },
    {
        "url_key": "pineapple",
        "title_en": "Pineapple",
        "title_es": "Piña",
        "description_en": "A tropical pineapple coloring page! Learn about this sweet and tangy fruit.",
        "description_es": "¡Una página para colorear de piña tropical! Aprende sobre esta fruta dulce y ácida.",
        "category": "Food",
        "difficulty": 2,
        "tags": "pineapple,fruit,tropical,yellow,sweet,healthy",
        "image_file": "pineapple.png"
    },
    {
        "url_key": "pizza",
        "title_en": "Pizza",
        "title_es": "Pizza",
        "description_en": "A delicious pizza slice coloring page! Color the cheese, sauce, and toppings.",
        "description_es": "¡Una deliciosa página para colorear de rebanada de pizza! Colorea el queso, la salsa y los ingredientes.",
        "category": "Food",
        "difficulty": 2,
        "tags": "pizza,italian,food,cheese,slice,dinner",
        "image_file": "pizza.png"
    },
    {
        "url_key": "sushi",
        "title_en": "Sushi",
        "title_es": "Sushi",
        "description_en": "Traditional Japanese sushi coloring page! Learn about this healthy and delicious food.",
        "description_es": "¡Página para colorear de sushi japonés tradicional! Aprende sobre esta comida saludable y deliciosa.",
        "category": "Food",
        "difficulty": 3,
        "tags": "sushi,japanese,food,rice,fish,healthy,asian",
        "image_file": "sushi.png"
    },
    {
        "url_key": "tortilla",
        "title_en": "Tortilla",
        "title_es": "Tortilla",
        "description_en": "A stack of tortillas coloring page! Learn about this important Mexican food.",
        "description_es": "¡Una página para colorear de pila de tortillas! Aprende sobre esta importante comida mexicana.",
        "category": "Food",
        "difficulty": 2,
        "tags": "tortilla,mexican,food,flatbread,corn,flour",
        "image_file": "tortilla.png"
    },
    {
        "url_key": "watermelon",
        "title_en": "Watermelon",
        "title_es": "Sandía",
        "description_en": "A juicy watermelon slice coloring page! Perfect summer fruit to color.",
        "description_es": "¡Una página para colorear de rebanada de sandía jugosa! Fruta de verano perfecta para colorear.",
        "category": "Food",
        "difficulty": 2,
        "tags": "watermelon,fruit,summer,juicy,red,healthy",
        "image_file": "watermelon.png"
    }
]

def generate_sql():
    """Generate SQL INSERT statements for all food paintings"""
    
    print("=" * 70)
    print("🍎 GENERATING SQL FOR FOOD PAINTINGS")
    print("=" * 70)
    print()
    print(f"Total paintings to add: {len(NEW_FOOD_PAINTINGS)}")
    print()
    
    sql_statements = []
    
    for idx, painting in enumerate(NEW_FOOD_PAINTINGS, 1):
        # Escape single quotes in text
        title_en = painting['title_en'].replace("'", "''")
        title_es = painting['title_es'].replace("'", "''")
        desc_en = painting['description_en'].replace("'", "''")
        desc_es = painting['description_es'].replace("'", "''")
        
        # English insert
        sql_en = f"""
-- {idx}. {painting['title_en']} (English)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    '{painting['url_key']}',
    '{title_en}',
    '{desc_en}',
    '{painting['category']}',
    {painting['difficulty']},
    '{painting['tags']}',
    '/coloring-images/{painting['image_file']}',
    'en'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;
"""
        
        # Spanish insert
        sql_es = f"""
-- {idx}. {painting['title_es']} (Spanish)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    '{painting['url_key']}',
    '{title_es}',
    '{desc_es}',
    '{painting['category']}',
    {painting['difficulty']},
    '{painting['tags']}',
    '/coloring-images/{painting['image_file']}',
    'es'
) ON CONFLICT (url_key, language_code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    difficulty = EXCLUDED.difficulty,
    tags = EXCLUDED.tags,
    image_url = EXCLUDED.image_url;
"""
        
        sql_statements.append(sql_en)
        sql_statements.append(sql_es)
        
        print(f"✅ {painting['title_en']} / {painting['title_es']}")
    
    # Write to SQL file
    output_file = '/Users/guym/Documents/d/paiting/backend/add-food-paintings.sql'
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("-- SQL to add all food paintings with Spanish translations\n")
        f.write(f"-- Generated automatically - {len(NEW_FOOD_PAINTINGS)} paintings\n")
        f.write("-- All paintings are in the 'Food' category\n\n")
        f.write('\n'.join(sql_statements))
    
    print()
    print("=" * 70)
    print(f"✅ SQL file generated: {output_file}")
    print("=" * 70)
    print()
    print("📋 Next steps:")
    print("1. Run the SQL file on your local database:")
    print("   psql -U your_user -d your_db -f backend/add-food-paintings.sql")
    print()
    print("2. Or use the backend SQL endpoint if available")
    print()
    print(f"📊 Summary:")
    print(f"   • Total paintings: {len(NEW_FOOD_PAINTINGS)}")
    print(f"   • Category: Food")
    print(f"   • Languages: English + Spanish")
    print(f"   • SQL inserts: {len(NEW_FOOD_PAINTINGS) * 2}")
    print()

if __name__ == "__main__":
    generate_sql()

