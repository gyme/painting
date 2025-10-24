#!/usr/bin/env python3
"""
Process new coloring images:
1. Clean greyscale and thicken lines if needed
2. Convert to WebP
3. Generate database entries with Spanish translations
"""

from PIL import Image, ImageFilter, ImageEnhance, ImageOps
import os

# Image processing configuration
IMAGE_DIR = "frontend/public/coloring-images"

# New images to process
new_images = {
    "Basketball Players": [
        "giannis_antetokounmpo",
        "jayson_tatum",
        "kawhi_leonard",
        "kevin_durant",
        "kobe_bryant",
        "lebron_james",
        "michael_jordan",
        "stephen_curry"
    ],
    "K Pop Demon Hunters": [
        "k_pop_demon_hunters",
        "mira",
        "rumi",
        "zoey",
        "the_saja_boys"
    ],
    "Numbers": [
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "ten"
    ],
    "Mandalas": [
        "flower_mandala"
    ]
}

# Spanish translations
translations = {
    # Basketball Players
    "giannis_antetokounmpo": {
        "title": "Giannis Antetokounmpo",
        "title_es": "Giannis Antetokounmpo",
        "description": "Color Giannis Antetokounmpo, the Greek Freak! Perfect for basketball fans and young athletes.",
        "description_es": "¡Colorea a Giannis Antetokounmpo, el Greek Freak! Perfecto para fanáticos del baloncesto y jóvenes atletas."
    },
    "jayson_tatum": {
        "title": "Jayson Tatum",
        "title_es": "Jayson Tatum",
        "description": "Color Jayson Tatum, Boston Celtics star! Perfect for basketball fans and young athletes.",
        "description_es": "¡Colorea a Jayson Tatum, estrella de Boston Celtics! Perfecto para fanáticos del baloncesto y jóvenes atletas."
    },
    "kawhi_leonard": {
        "title": "Kawhi Leonard",
        "title_es": "Kawhi Leonard",
        "description": "Color Kawhi Leonard, the Klaw! Perfect for basketball fans and young athletes.",
        "description_es": "¡Colorea a Kawhi Leonard, el Klaw! Perfecto para fanáticos del baloncesto y jóvenes atletas."
    },
    "kevin_durant": {
        "title": "Kevin Durant",
        "title_es": "Kevin Durant",
        "description": "Color Kevin Durant, NBA superstar! Perfect for basketball fans and young athletes.",
        "description_es": "¡Colorea a Kevin Durant, superestrella de la NBA! Perfecto para fanáticos del baloncesto y jóvenes atletas."
    },
    "kobe_bryant": {
        "title": "Kobe Bryant",
        "title_es": "Kobe Bryant",
        "description": "Color Kobe Bryant, the Black Mamba! Perfect for basketball fans and young athletes.",
        "description_es": "¡Colorea a Kobe Bryant, la Mamba Negra! Perfecto para fanáticos del baloncesto y jóvenes atletas."
    },
    "lebron_james": {
        "title": "LeBron James",
        "title_es": "LeBron James",
        "description": "Color LeBron James, the King! Perfect for basketball fans and young athletes.",
        "description_es": "¡Colorea a LeBron James, el Rey! Perfecto para fanáticos del baloncesto y jóvenes atletas."
    },
    "michael_jordan": {
        "title": "Michael Jordan",
        "title_es": "Michael Jordan",
        "description": "Color Michael Jordan, basketball legend! Perfect for basketball fans and young athletes.",
        "description_es": "¡Colorea a Michael Jordan, leyenda del baloncesto! Perfecto para fanáticos del baloncesto y jóvenes atletas."
    },
    "stephen_curry": {
        "title": "Stephen Curry",
        "title_es": "Stephen Curry",
        "description": "Color Stephen Curry, the three-point king! Perfect for basketball fans and young athletes.",
        "description_es": "¡Colorea a Stephen Curry, el rey de los triples! Perfecto para fanáticos del baloncesto y jóvenes atletas."
    },
    # K Pop Demon Hunters
    "k_pop_demon_hunters": {
        "title": "K-Pop Demon Hunters",
        "title_es": "Cazadores de Demonios K-Pop",
        "description": "Color the K-Pop Demon Hunters team! Perfect for fans of action and music.",
        "description_es": "¡Colorea al equipo de Cazadores de Demonios K-Pop! Perfecto para fanáticos de la acción y la música."
    },
    "mira": {
        "title": "Mira",
        "title_es": "Mira",
        "description": "Color Mira, the fierce demon hunter! Perfect for fans of action heroes.",
        "description_es": "¡Colorea a Mira, la feroz cazadora de demonios! Perfecto para fanáticos de héroes de acción."
    },
    "rumi": {
        "title": "Rumi",
        "title_es": "Rumi",
        "description": "Color Rumi, the brave demon hunter! Perfect for fans of action heroes.",
        "description_es": "¡Colorea a Rumi, la valiente cazadora de demonios! Perfecto para fanáticos de héroes de acción."
    },
    "zoey": {
        "title": "Zoey",
        "title_es": "Zoey",
        "description": "Color Zoey, the powerful demon hunter! Perfect for fans of action heroes.",
        "description_es": "¡Colorea a Zoey, la poderosa cazadora de demonios! Perfecto para fanáticos de héroes de acción."
    },
    "the_saja_boys": {
        "title": "The Saja Boys",
        "title_es": "Los Chicos Saja",
        "description": "Color the Saja Boys, demon hunting heroes! Perfect for fans of action teams.",
        "description_es": "¡Colorea a los Chicos Saja, héroes cazadores de demonios! Perfecto para fanáticos de equipos de acción."
    },
    # Numbers
    "zero": {
        "title": "Number Zero",
        "title_es": "Número Cero",
        "description": "Color the number 0! Perfect for learning numbers while having fun.",
        "description_es": "¡Colorea el número 0! Perfecto para aprender números mientras te diviertes."
    },
    "one": {
        "title": "Number One",
        "title_es": "Número Uno",
        "description": "Color the number 1! Perfect for learning numbers while having fun.",
        "description_es": "¡Colorea el número 1! Perfecto para aprender números mientras te diviertes."
    },
    "two": {
        "title": "Number Two",
        "title_es": "Número Dos",
        "description": "Color the number 2! Perfect for learning numbers while having fun.",
        "description_es": "¡Colorea el número 2! Perfecto para aprender números mientras te diviertes."
    },
    "three": {
        "title": "Number Three",
        "title_es": "Número Tres",
        "description": "Color the number 3! Perfect for learning numbers while having fun.",
        "description_es": "¡Colorea el número 3! Perfecto para aprender números mientras te diviertes."
    },
    "four": {
        "title": "Number Four",
        "title_es": "Número Cuatro",
        "description": "Color the number 4! Perfect for learning numbers while having fun.",
        "description_es": "¡Colorea el número 4! Perfecto para aprender números mientras te diviertes."
    },
    "five": {
        "title": "Number Five",
        "title_es": "Número Cinco",
        "description": "Color the number 5! Perfect for learning numbers while having fun.",
        "description_es": "¡Colorea el número 5! Perfecto para aprender números mientras te diviertes."
    },
    "six": {
        "title": "Number Six",
        "title_es": "Número Seis",
        "description": "Color the number 6! Perfect for learning numbers while having fun.",
        "description_es": "¡Colorea el número 6! Perfecto para aprender números mientras te diviertes."
    },
    "seven": {
        "title": "Number Seven",
        "title_es": "Número Siete",
        "description": "Color the number 7! Perfect for learning numbers while having fun.",
        "description_es": "¡Colorea el número 7! Perfecto para aprender números mientras te diviertes."
    },
    "eight": {
        "title": "Number Eight",
        "title_es": "Número Ocho",
        "description": "Color the number 8! Perfect for learning numbers while having fun.",
        "description_es": "¡Colorea el número 8! Perfecto para aprender números mientras te diviertes."
    },
    "nine": {
        "title": "Number Nine",
        "title_es": "Número Nueve",
        "description": "Color the number 9! Perfect for learning numbers while having fun.",
        "description_es": "¡Colorea el número 9! Perfecto para aprender números mientras te diviertes."
    },
    "ten": {
        "title": "Number Ten",
        "title_es": "Número Diez",
        "description": "Color the number 10! Perfect for learning numbers while having fun.",
        "description_es": "¡Colorea el número 10! Perfecto para aprender números mientras te diviertes."
    },
    # Mandalas
    "flower_mandala": {
        "title": "Flower Mandala",
        "title_es": "Mandala de Flores",
        "description": "Color a beautiful flower mandala! Perfect for relaxation and creativity.",
        "description_es": "¡Colorea un hermoso mandala de flores! Perfecto para relajación y creatividad."
    }
}


def process_image(url_key, category):
    """Process a single image: clean, thicken lines, convert to WebP"""
    png_path = os.path.join(IMAGE_DIR, f"{url_key}.png")
    webp_path = os.path.join(IMAGE_DIR, f"{url_key}.webp")
    
    if not os.path.exists(png_path):
        print(f"⚠️  Image not found: {png_path}")
        return False
    
    print(f"Processing {url_key}...")
    
    try:
        # Open image
        img = Image.open(png_path)
        
        # Convert to grayscale if not already
        if img.mode != 'L':
            img = img.convert('L')
        
        # Increase contrast to make lines darker
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(1.5)  # Increase contrast by 50%
        
        # Apply edge enhancement to thicken lines slightly
        img = img.filter(ImageFilter.EDGE_ENHANCE)
        
        # Adjust brightness to ensure white background
        enhancer = ImageEnhance.Brightness(img)
        img = enhancer.enhance(1.1)
        
        # Convert back to RGB for web
        img = img.convert('RGB')
        
        # Save as high-quality WebP
        img.save(webp_path, 'WEBP', quality=90, method=6)
        print(f"✅ Created WebP: {webp_path}")
        
        # Also save the cleaned PNG
        img.save(png_path, 'PNG', optimize=True)
        print(f"✅ Updated PNG: {png_path}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error processing {url_key}: {e}")
        return False


def generate_sql():
    """Generate SQL INSERT statements for all new images"""
    print("\n" + "="*80)
    print("SQL INSERT STATEMENTS FOR DATABASE")
    print("="*80 + "\n")
    
    painting_id = 1000  # Starting ID (will be auto-incremented)
    
    for category, url_keys in new_images.items():
        print(f"\n-- {category} --")
        for url_key in url_keys:
            if url_key not in translations:
                print(f"⚠️  Missing translation for {url_key}")
                continue
            
            trans = translations[url_key]
            
            # Determine difficulty based on category
            if category == "Numbers":
                difficulty = 1  # Easy
            elif category == "Basketball Players":
                difficulty = 2  # Medium
            elif category == "K Pop Demon Hunters":
                difficulty = 3  # Hard
            else:  # Mandalas
                difficulty = 3  # Hard
            
            print(f"""
INSERT INTO paintings (
    url_key, title, description, title_es, description_es,
    category, difficulty, image_url, thumbnail_url, created_at
) VALUES (
    '{url_key}',
    '{trans['title']}',
    '{trans['description']}',
    '{trans['title_es']}',
    '{trans['description_es']}',
    '{category}',
    {difficulty},
    '/coloring-images/{url_key}.png',
    '/coloring-images/{url_key}.png',
    CURRENT_TIMESTAMP
);""")


def main():
    print("🎨 Processing New Coloring Images\n")
    print("="*80)
    
    # Process all images
    total = 0
    success = 0
    
    for category, url_keys in new_images.items():
        print(f"\n📁 {category}")
        print("-" * 80)
        for url_key in url_keys:
            total += 1
            if process_image(url_key, category):
                success += 1
    
    print("\n" + "="*80)
    print(f"✅ Processed {success}/{total} images successfully!")
    print("="*80)
    
    # Generate SQL
    generate_sql()
    
    print("\n" + "="*80)
    print("✅ DONE! Next steps:")
    print("1. Review the processed images in frontend/public/coloring-images/")
    print("2. Copy the SQL statements above and run them on your database")
    print("3. Update frontend/src/utils/coloringImages.ts")
    print("4. Update frontend/src/locales/*/translation.json for category names")
    print("="*80)


if __name__ == "__main__":
    main()



