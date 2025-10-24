#!/usr/bin/env python3
"""
Script to add new paintings to the database with Spanish translations
"""

import os
import sys

# New paintings to add with metadata
NEW_PAINTINGS = [
    {
        "url_key": "hanuka-menorah",
        "title_en": "Hanukkah Menorah",
        "title_es": "Menorá de Hanukkah",
        "description_en": "A beautiful Hanukkah menorah coloring page perfect for celebrating the Festival of Lights! Kids can color the nine branches and learn about this special Jewish holiday tradition.",
        "description_es": "¡Una hermosa página para colorear de menorá de Hanukkah perfecta para celebrar la Fiesta de las Luces! Los niños pueden colorear las nueve ramas y aprender sobre esta tradición especial de la festividad judía.",
        "category": "Holidays",
        "difficulty": 2,
        "tags": "hanukkah,menorah,jewish,holiday,festival,lights,candles,tradition",
        "image_file": "hanuka_menorah.png"
    },
    {
        "url_key": "christmas-socks",
        "title_en": "Christmas Stockings",
        "title_es": "Calcetines de Navidad",
        "description_en": "Festive Christmas stockings hanging by the fireplace! A fun coloring page featuring decorative holiday socks ready to be filled with treats and surprises.",
        "description_es": "¡Calcetines navideños festivos colgando junto a la chimenea! Una divertida página para colorear con calcetines decorativos listos para llenarse de golosinas y sorpresas.",
        "category": "Holidays",
        "difficulty": 1,
        "tags": "christmas,stockings,socks,holiday,fireplace,gifts,santa,decoration",
        "image_file": "christmas_socks.png"
    },
    {
        "url_key": "rudolph-the-reindeer",
        "title_en": "Rudolph the Red-Nosed Reindeer",
        "title_es": "Rodolfo el Reno de Nariz Roja",
        "description_en": "The most famous reindeer of all! Color Rudolph with his bright red nose as he gets ready to guide Santa's sleigh through the snowy night.",
        "description_es": "¡El reno más famoso de todos! Colorea a Rodolfo con su brillante nariz roja mientras se prepara para guiar el trineo de Santa en la noche nevada.",
        "category": "Holidays",
        "difficulty": 2,
        "tags": "rudolph,reindeer,christmas,santa,red nose,holiday,sleigh,winter",
        "image_file": "rudolph.png"
    },
    {
        "url_key": "santa-claus",
        "title_en": "Santa Claus",
        "title_es": "Papá Noel",
        "description_en": "Ho ho ho! Santa Claus is ready to deliver presents! Color jolly Santa with his big beard, red suit, and warm smile as he prepares for Christmas Eve.",
        "description_es": "¡Jo jo jo! ¡Papá Noel está listo para entregar regalos! Colorea al alegre Santa con su gran barba, traje rojo y cálida sonrisa mientras se prepara para la Nochebuena.",
        "category": "Holidays",
        "difficulty": 2,
        "tags": "santa,santa claus,christmas,holiday,presents,gifts,north pole,beard",
        "image_file": "santa_clause.png"
    },
    {
        "url_key": "christmas-tree",
        "title_en": "Christmas Tree",
        "title_es": "Árbol de Navidad",
        "description_en": "A beautifully decorated Christmas tree! Color the ornaments, lights, star on top, and presents underneath this festive holiday tree.",
        "description_es": "¡Un hermoso árbol de Navidad decorado! Colorea los adornos, las luces, la estrella en la punta y los regalos debajo de este festivo árbol navideño.",
        "category": "Holidays",
        "difficulty": 2,
        "tags": "christmas,tree,ornaments,decorations,holiday,star,presents,festive",
        "image_file": "christmas_tree.png"
    }
]

def generate_sql():
    """Generate SQL INSERT statements"""
    
    print("=" * 70)
    print("🎨 GENERATING SQL FOR NEW PAINTINGS")
    print("=" * 70)
    print()
    
    sql_statements = []
    
    for idx, painting in enumerate(NEW_PAINTINGS, 1):
        # English insert
        sql_en = f"""
-- {idx}. {painting['title_en']} (English)
INSERT INTO paintings (url_key, title, description, category, difficulty, tags, image_url, language_code) 
VALUES (
    '{painting['url_key']}',
    '{painting['title_en']}',
    '{painting['description_en']}',
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
    '{painting['title_es']}',
    '{painting['description_es']}',
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
    output_file = '/Users/guym/Documents/d/paiting/backend/add-holiday-paintings.sql'
    
    with open(output_file, 'w') as f:
        f.write("-- SQL to add new holiday paintings with Spanish translations\n")
        f.write("-- Generated automatically\n\n")
        f.write('\n'.join(sql_statements))
    
    print()
    print("=" * 70)
    print(f"✨ SUCCESS! Generated SQL file")
    print(f"📄 File: {output_file}")
    print(f"📊 Total paintings: {len(NEW_PAINTINGS)} (× 2 languages = {len(NEW_PAINTINGS) * 2} rows)")
    print()
    print("🚀 Next Steps:")
    print("1. Review the SQL file")
    print("2. Apply to local database:")
    print("   cd /Users/guym/Documents/d/paiting/backend")
    print("   cat add-holiday-paintings.sql | psql your_database")
    print()
    print("3. OR sync to production via API:")
    print("   cd /Users/guym/Documents/d/paiting")
    print("   bash sync-paintings-via-api.sh")
    print()
    print("4. Update sitemaps:")
    print("   cd /Users/guym/Documents/d/paiting/frontend")
    print("   npm run generate-sitemap")
    print("=" * 70)

if __name__ == '__main__':
    generate_sql()


