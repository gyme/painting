#!/usr/bin/env python3
"""
Add new coloring pages to local and production databases via API
25 new images: Basketball Players (8), K Pop Demon Hunters (5), Numbers (11), Flower Mandala (1)
"""

import requests
import json

# API endpoints
LOCAL_API = "http://localhost:8080/api/paintings"
PROD_API = "https://docker-composeyaml-production.up.railway.app/api/paintings"

# New paintings data
paintings = [
    # Basketball Players (8)
    {
        "urlKey": "giannis_antetokounmpo",
        "title": "Giannis Antetokounmpo",
        "description": "Color Giannis Antetokounmpo, the Greek Freak! Perfect for basketball fans and young athletes.",
        "titleEs": "Giannis Antetokounmpo",
        "descriptionEs": "¡Colorea a Giannis Antetokounmpo, el Greek Freak! Perfecto para fanáticos del baloncesto y jóvenes atletas.",
        "category": "Basketball Players",
        "difficulty": 2,
        "imageUrl": "/coloring-images/giannis_antetokounmpo.png",
        "thumbnailUrl": "/coloring-images/giannis_antetokounmpo.png"
    },
    {
        "urlKey": "jayson_tatum",
        "title": "Jayson Tatum",
        "description": "Color Jayson Tatum, Boston Celtics star! Perfect for basketball fans and young athletes.",
        "titleEs": "Jayson Tatum",
        "descriptionEs": "¡Colorea a Jayson Tatum, estrella de Boston Celtics! Perfecto para fanáticos del baloncesto y jóvenes atletas.",
        "category": "Basketball Players",
        "difficulty": 2,
        "imageUrl": "/coloring-images/jayson_tatum.png",
        "thumbnailUrl": "/coloring-images/jayson_tatum.png"
    },
    {
        "urlKey": "kawhi_leonard",
        "title": "Kawhi Leonard",
        "description": "Color Kawhi Leonard, the Klaw! Perfect for basketball fans and young athletes.",
        "titleEs": "Kawhi Leonard",
        "descriptionEs": "¡Colorea a Kawhi Leonard, el Klaw! Perfecto para fanáticos del baloncesto y jóvenes atletas.",
        "category": "Basketball Players",
        "difficulty": 2,
        "imageUrl": "/coloring-images/kawhi_leonard.png",
        "thumbnailUrl": "/coloring-images/kawhi_leonard.png"
    },
    {
        "urlKey": "kevin_durant",
        "title": "Kevin Durant",
        "description": "Color Kevin Durant, NBA superstar! Perfect for basketball fans and young athletes.",
        "titleEs": "Kevin Durant",
        "descriptionEs": "¡Colorea a Kevin Durant, superestrella de la NBA! Perfecto para fanáticos del baloncesto y jóvenes atletas.",
        "category": "Basketball Players",
        "difficulty": 2,
        "imageUrl": "/coloring-images/kevin_durant.png",
        "thumbnailUrl": "/coloring-images/kevin_durant.png"
    },
    {
        "urlKey": "kobe_bryant",
        "title": "Kobe Bryant",
        "description": "Color Kobe Bryant, the Black Mamba! Perfect for basketball fans and young athletes.",
        "titleEs": "Kobe Bryant",
        "descriptionEs": "¡Colorea a Kobe Bryant, la Mamba Negra! Perfecto para fanáticos del baloncesto y jóvenes atletas.",
        "category": "Basketball Players",
        "difficulty": 2,
        "imageUrl": "/coloring-images/kobe_bryant.png",
        "thumbnailUrl": "/coloring-images/kobe_bryant.png"
    },
    {
        "urlKey": "lebron_james",
        "title": "LeBron James",
        "description": "Color LeBron James, the King! Perfect for basketball fans and young athletes.",
        "titleEs": "LeBron James",
        "descriptionEs": "¡Colorea a LeBron James, el Rey! Perfecto para fanáticos del baloncesto y jóvenes atletas.",
        "category": "Basketball Players",
        "difficulty": 2,
        "imageUrl": "/coloring-images/lebron_james.png",
        "thumbnailUrl": "/coloring-images/lebron_james.png"
    },
    {
        "urlKey": "michael_jordan",
        "title": "Michael Jordan",
        "description": "Color Michael Jordan, basketball legend! Perfect for basketball fans and young athletes.",
        "titleEs": "Michael Jordan",
        "descriptionEs": "¡Colorea a Michael Jordan, leyenda del baloncesto! Perfecto para fanáticos del baloncesto y jóvenes atletas.",
        "category": "Basketball Players",
        "difficulty": 2,
        "imageUrl": "/coloring-images/michael_jordan.png",
        "thumbnailUrl": "/coloring-images/michael_jordan.png"
    },
    {
        "urlKey": "stephen_curry",
        "title": "Stephen Curry",
        "description": "Color Stephen Curry, the three-point king! Perfect for basketball fans and young athletes.",
        "titleEs": "Stephen Curry",
        "descriptionEs": "¡Colorea a Stephen Curry, el rey de los triples! Perfecto para fanáticos del baloncesto y jóvenes atletas.",
        "category": "Basketball Players",
        "difficulty": 2,
        "imageUrl": "/coloring-images/stephen_curry.png",
        "thumbnailUrl": "/coloring-images/stephen_curry.png"
    },
    # K Pop Demon Hunters (5)
    {
        "urlKey": "k_pop_demon_hunters",
        "title": "K-Pop Demon Hunters",
        "description": "Color the K-Pop Demon Hunters team! Perfect for fans of action and music.",
        "titleEs": "Cazadores de Demonios K-Pop",
        "descriptionEs": "¡Colorea al equipo de Cazadores de Demonios K-Pop! Perfecto para fanáticos de la acción y la música.",
        "category": "K Pop Demon Hunters",
        "difficulty": 3,
        "imageUrl": "/coloring-images/k_pop_demon_hunters.png",
        "thumbnailUrl": "/coloring-images/k_pop_demon_hunters.png"
    },
    {
        "urlKey": "mira",
        "title": "Mira",
        "description": "Color Mira, the fierce demon hunter! Perfect for fans of action heroes.",
        "titleEs": "Mira",
        "descriptionEs": "¡Colorea a Mira, la feroz cazadora de demonios! Perfecto para fanáticos de héroes de acción.",
        "category": "K Pop Demon Hunters",
        "difficulty": 3,
        "imageUrl": "/coloring-images/mira.png",
        "thumbnailUrl": "/coloring-images/mira.png"
    },
    {
        "urlKey": "rumi",
        "title": "Rumi",
        "description": "Color Rumi, the brave demon hunter! Perfect for fans of action heroes.",
        "titleEs": "Rumi",
        "descriptionEs": "¡Colorea a Rumi, la valiente cazadora de demonios! Perfecto para fanáticos de héroes de acción.",
        "category": "K Pop Demon Hunters",
        "difficulty": 3,
        "imageUrl": "/coloring-images/rumi.png",
        "thumbnailUrl": "/coloring-images/rumi.png"
    },
    {
        "urlKey": "zoey",
        "title": "Zoey",
        "description": "Color Zoey, the powerful demon hunter! Perfect for fans of action heroes.",
        "titleEs": "Zoey",
        "descriptionEs": "¡Colorea a Zoey, la poderosa cazadora de demonios! Perfecto para fanáticos de héroes de acción.",
        "category": "K Pop Demon Hunters",
        "difficulty": 3,
        "imageUrl": "/coloring-images/zoey.png",
        "thumbnailUrl": "/coloring-images/zoey.png"
    },
    {
        "urlKey": "the_saja_boys",
        "title": "The Saja Boys",
        "description": "Color the Saja Boys, demon hunting heroes! Perfect for fans of action teams.",
        "titleEs": "Los Chicos Saja",
        "descriptionEs": "¡Colorea a los Chicos Saja, héroes cazadores de demonios! Perfecto para fanáticos de equipos de acción.",
        "category": "K Pop Demon Hunters",
        "difficulty": 3,
        "imageUrl": "/coloring-images/the_saja_boys.png",
        "thumbnailUrl": "/coloring-images/the_saja_boys.png"
    },
    # Numbers (11)
    {
        "urlKey": "zero",
        "title": "Number Zero",
        "description": "Color the number 0! Perfect for learning numbers while having fun.",
        "titleEs": "Número Cero",
        "descriptionEs": "¡Colorea el número 0! Perfecto para aprender números mientras te diviertes.",
        "category": "Numbers",
        "difficulty": 1,
        "imageUrl": "/coloring-images/zero.png",
        "thumbnailUrl": "/coloring-images/zero.png"
    },
    {
        "urlKey": "one",
        "title": "Number One",
        "description": "Color the number 1! Perfect for learning numbers while having fun.",
        "titleEs": "Número Uno",
        "descriptionEs": "¡Colorea el número 1! Perfecto para aprender números mientras te diviertes.",
        "category": "Numbers",
        "difficulty": 1,
        "imageUrl": "/coloring-images/one.png",
        "thumbnailUrl": "/coloring-images/one.png"
    },
    {
        "urlKey": "two",
        "title": "Number Two",
        "description": "Color the number 2! Perfect for learning numbers while having fun.",
        "titleEs": "Número Dos",
        "descriptionEs": "¡Colorea el número 2! Perfecto para aprender números mientras te diviertes.",
        "category": "Numbers",
        "difficulty": 1,
        "imageUrl": "/coloring-images/two.png",
        "thumbnailUrl": "/coloring-images/two.png"
    },
    {
        "urlKey": "three",
        "title": "Number Three",
        "description": "Color the number 3! Perfect for learning numbers while having fun.",
        "titleEs": "Número Tres",
        "descriptionEs": "¡Colorea el número 3! Perfecto para aprender números mientras te diviertes.",
        "category": "Numbers",
        "difficulty": 1,
        "imageUrl": "/coloring-images/three.png",
        "thumbnailUrl": "/coloring-images/three.png"
    },
    {
        "urlKey": "four",
        "title": "Number Four",
        "description": "Color the number 4! Perfect for learning numbers while having fun.",
        "titleEs": "Número Cuatro",
        "descriptionEs": "¡Colorea el número 4! Perfecto para aprender números mientras te diviertes.",
        "category": "Numbers",
        "difficulty": 1,
        "imageUrl": "/coloring-images/four.png",
        "thumbnailUrl": "/coloring-images/four.png"
    },
    {
        "urlKey": "five",
        "title": "Number Five",
        "description": "Color the number 5! Perfect for learning numbers while having fun.",
        "titleEs": "Número Cinco",
        "descriptionEs": "¡Colorea el número 5! Perfecto para aprender números mientras te diviertes.",
        "category": "Numbers",
        "difficulty": 1,
        "imageUrl": "/coloring-images/five.png",
        "thumbnailUrl": "/coloring-images/five.png"
    },
    {
        "urlKey": "six",
        "title": "Number Six",
        "description": "Color the number 6! Perfect for learning numbers while having fun.",
        "titleEs": "Número Seis",
        "descriptionEs": "¡Colorea el número 6! Perfecto para aprender números mientras te diviertes.",
        "category": "Numbers",
        "difficulty": 1,
        "imageUrl": "/coloring-images/six.png",
        "thumbnailUrl": "/coloring-images/six.png"
    },
    {
        "urlKey": "seven",
        "title": "Number Seven",
        "description": "Color the number 7! Perfect for learning numbers while having fun.",
        "titleEs": "Número Siete",
        "descriptionEs": "¡Colorea el número 7! Perfecto para aprender números mientras te diviertes.",
        "category": "Numbers",
        "difficulty": 1,
        "imageUrl": "/coloring-images/seven.png",
        "thumbnailUrl": "/coloring-images/seven.png"
    },
    {
        "urlKey": "eight",
        "title": "Number Eight",
        "description": "Color the number 8! Perfect for learning numbers while having fun.",
        "titleEs": "Número Ocho",
        "descriptionEs": "¡Colorea el número 8! Perfecto para aprender números mientras te diviertes.",
        "category": "Numbers",
        "difficulty": 1,
        "imageUrl": "/coloring-images/eight.png",
        "thumbnailUrl": "/coloring-images/eight.png"
    },
    {
        "urlKey": "nine",
        "title": "Number Nine",
        "description": "Color the number 9! Perfect for learning numbers while having fun.",
        "titleEs": "Número Nueve",
        "descriptionEs": "¡Colorea el número 9! Perfecto para aprender números mientras te diviertes.",
        "category": "Numbers",
        "difficulty": 1,
        "imageUrl": "/coloring-images/nine.png",
        "thumbnailUrl": "/coloring-images/nine.png"
    },
    {
        "urlKey": "ten",
        "title": "Number Ten",
        "description": "Color the number 10! Perfect for learning numbers while having fun.",
        "titleEs": "Número Diez",
        "descriptionEs": "¡Colorea el número 10! Perfecto para aprender números mientras te diviertes.",
        "category": "Numbers",
        "difficulty": 1,
        "imageUrl": "/coloring-images/ten.png",
        "thumbnailUrl": "/coloring-images/ten.png"
    },
    # Mandalas (1)
    {
        "urlKey": "flower_mandala",
        "title": "Flower Mandala",
        "description": "Color a beautiful flower mandala! Perfect for relaxation and creativity.",
        "titleEs": "Mandala de Flores",
        "descriptionEs": "¡Colorea un hermoso mandala de flores! Perfecto para relajación y creatividad.",
        "category": "Mandalas",
        "difficulty": 3,
        "imageUrl": "/coloring-images/flower_mandala.png",
        "thumbnailUrl": "/coloring-images/flower_mandala.png"
    }
]


def add_to_database(api_url, env_name):
    """Add paintings to a database via API"""
    print(f"\n{'='*80}")
    print(f"Adding to {env_name} database: {api_url}")
    print('='*80)
    
    success_count = 0
    error_count = 0
    
    for painting in paintings:
        try:
            response = requests.post(api_url, json=painting, timeout=10)
            
            if response.status_code == 200 or response.status_code == 201:
                print(f"✅ Added: {painting['title']}")
                success_count += 1
            else:
                print(f"❌ Failed: {painting['title']} - Status: {response.status_code}")
                print(f"   Response: {response.text[:200]}")
                error_count += 1
                
        except Exception as e:
            print(f"❌ Error adding {painting['title']}: {e}")
            error_count += 1
    
    print(f"\n{'='*80}")
    print(f"{env_name} Results: ✅ {success_count} success, ❌ {error_count} errors")
    print('='*80)
    
    return success_count, error_count


def main():
    print("🎨 Adding 25 New Coloring Pages to Databases")
    print("=" * 80)
    print("Categories:")
    print("  • Basketball Players: 8")
    print("  • K Pop Demon Hunters: 5")
    print("  • Numbers: 11")
    print("  • Mandalas: 1 (Flower Mandala)")
    print("=" * 80)
    
    # Add to local database
    local_success, local_errors = add_to_database(LOCAL_API, "LOCAL")
    
    # Add to production database
    prod_success, prod_errors = add_to_database(PROD_API, "PRODUCTION")
    
    # Final summary
    print(f"\n{'='*80}")
    print("🎉 FINAL SUMMARY")
    print('='*80)
    print(f"LOCAL:      ✅ {local_success} added, ❌ {local_errors} errors")
    print(f"PRODUCTION: ✅ {prod_success} added, ❌ {prod_errors} errors")
    print('='*80)
    
    if local_errors == 0 and prod_errors == 0:
        print("\n✅ All paintings added successfully!")
        print("\n📋 Next steps:")
        print("1. Verify new categories appear on homepage and categories page")
        print("2. Check that images load correctly with WebP")
        print("3. Test Spanish translations")
        print("4. Clear backend cache if categories don't appear:")
        print("   curl -X POST https://docker-composeyaml-production.up.railway.app/api/admin/cache/clear/categories")
    else:
        print("\n⚠️  Some paintings failed to add. Check errors above.")


if __name__ == "__main__":
    main()



