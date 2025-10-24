#!/usr/bin/env python3
"""
Add new sport and nature coloring pages to local and production databases via API
Sport: 9 images (judo, table tennis, hockey, baseball, swimmer, volleyball, tennis, american football, golf)
Nature: 3 images (lake, mountains, forest)
"""

import requests
import json

# API endpoints
LOCAL_API = "http://localhost:8080/api/paintings"
PROD_API = "https://docker-composeyaml-production.up.railway.app/api/paintings"

# New paintings data with Spanish translations
paintings = [
    # Sport Category (9 images)
    {
        "urlKey": "judo_match",
        "title": "Judo Match",
        "description": "Color an exciting judo match! Perfect for martial arts fans and young athletes.",
        "titleEs": "Combate de Judo",
        "descriptionEs": "¡Colorea un emocionante combate de judo! Perfecto para fanáticos de las artes marciales y jóvenes atletas.",
        "category": "Sport",
        "difficulty": 2,
        "imageUrl": "/coloring-images/judo_match.png",
        "thumbnailUrl": "/coloring-images/judo_match.png"
    },
    {
        "urlKey": "table_tennis",
        "title": "Table Tennis",
        "description": "Color a table tennis player in action! Perfect for ping pong fans.",
        "titleEs": "Tenis de Mesa",
        "descriptionEs": "¡Colorea un jugador de tenis de mesa en acción! Perfecto para fanáticos del ping pong.",
        "category": "Sport",
        "difficulty": 2,
        "imageUrl": "/coloring-images/table_tennis.png",
        "thumbnailUrl": "/coloring-images/table_tennis.png"
    },
    {
        "urlKey": "hokey",
        "title": "Hockey Player",
        "description": "Color a hockey player on the ice! Perfect for hockey fans and winter sports enthusiasts.",
        "titleEs": "Jugador de Hockey",
        "descriptionEs": "¡Colorea un jugador de hockey sobre hielo! Perfecto para fanáticos del hockey y deportes de invierno.",
        "category": "Sport",
        "difficulty": 2,
        "imageUrl": "/coloring-images/hokey.png",
        "thumbnailUrl": "/coloring-images/hokey.png"
    },
    {
        "urlKey": "baseball",
        "title": "Baseball Player",
        "description": "Color a baseball player at bat! Perfect for baseball fans and young athletes.",
        "titleEs": "Jugador de Béisbol",
        "descriptionEs": "¡Colorea un jugador de béisbol bateando! Perfecto para fanáticos del béisbol y jóvenes atletas.",
        "category": "Sport",
        "difficulty": 2,
        "imageUrl": "/coloring-images/baseball.png",
        "thumbnailUrl": "/coloring-images/baseball.png"
    },
    {
        "urlKey": "swimmer",
        "title": "Swimmer",
        "description": "Color a swimmer diving through the water! Perfect for swimming fans and water sports enthusiasts.",
        "titleEs": "Nadador",
        "descriptionEs": "¡Colorea un nadador atravesando el agua! Perfecto para fanáticos de la natación y deportes acuáticos.",
        "category": "Sport",
        "difficulty": 2,
        "imageUrl": "/coloring-images/swimmer.png",
        "thumbnailUrl": "/coloring-images/swimmer.png"
    },
    {
        "urlKey": "volleyball_game",
        "title": "Volleyball Game",
        "description": "Color an exciting volleyball game! Perfect for volleyball fans and team sports enthusiasts.",
        "titleEs": "Partido de Voleibol",
        "descriptionEs": "¡Colorea un emocionante partido de voleibol! Perfecto para fanáticos del voleibol y deportes de equipo.",
        "category": "Sport",
        "difficulty": 2,
        "imageUrl": "/coloring-images/volleyball_game.png",
        "thumbnailUrl": "/coloring-images/volleyball_game.png"
    },
    {
        "urlKey": "tennis_player",
        "title": "Tennis Player",
        "description": "Color a tennis player serving! Perfect for tennis fans and young athletes.",
        "titleEs": "Jugador de Tenis",
        "descriptionEs": "¡Colorea un jugador de tenis sirviendo! Perfecto para fanáticos del tenis y jóvenes atletas.",
        "category": "Sport",
        "difficulty": 2,
        "imageUrl": "/coloring-images/tennis_player.png",
        "thumbnailUrl": "/coloring-images/tennis_player.png"
    },
    {
        "urlKey": "american_football_player",
        "title": "American Football Player",
        "description": "Color an American football player in action! Perfect for football fans and young athletes.",
        "titleEs": "Jugador de Fútbol Americano",
        "descriptionEs": "¡Colorea un jugador de fútbol americano en acción! Perfecto para fanáticos del fútbol americano y jóvenes atletas.",
        "category": "Sport",
        "difficulty": 2,
        "imageUrl": "/coloring-images/american_football_player.png",
        "thumbnailUrl": "/coloring-images/american_football_player.png"
    },
    {
        "urlKey": "golf_player",
        "title": "Golf Player",
        "description": "Color a golf player swinging! Perfect for golf fans and young athletes.",
        "titleEs": "Jugador de Golf",
        "descriptionEs": "¡Colorea un jugador de golf haciendo swing! Perfecto para fanáticos del golf y jóvenes atletas.",
        "category": "Sport",
        "difficulty": 2,
        "imageUrl": "/coloring-images/golf_player.png",
        "thumbnailUrl": "/coloring-images/golf_player.png"
    },
    # Nature Category (3 images)
    {
        "urlKey": "lake",
        "title": "Beautiful Lake",
        "description": "Color a peaceful lake surrounded by nature! Perfect for nature lovers and relaxation.",
        "titleEs": "Lago Hermoso",
        "descriptionEs": "¡Colorea un lago tranquilo rodeado de naturaleza! Perfecto para amantes de la naturaleza y relajación.",
        "category": "Nature",
        "difficulty": 2,
        "imageUrl": "/coloring-images/lake.png",
        "thumbnailUrl": "/coloring-images/lake.png"
    },
    {
        "urlKey": "mountains",
        "title": "Mountain Landscape",
        "description": "Color majestic mountains! Perfect for nature lovers and outdoor enthusiasts.",
        "titleEs": "Paisaje de Montañas",
        "descriptionEs": "¡Colorea majestuosas montañas! Perfecto para amantes de la naturaleza y entusiastas del aire libre.",
        "category": "Nature",
        "difficulty": 2,
        "imageUrl": "/coloring-images/mountains.png",
        "thumbnailUrl": "/coloring-images/mountains.png"
    },
    {
        "urlKey": "forest",
        "title": "Forest Scene",
        "description": "Color a beautiful forest scene! Perfect for nature lovers and woodland adventures.",
        "titleEs": "Escena del Bosque",
        "descriptionEs": "¡Colorea una hermosa escena del bosque! Perfecto para amantes de la naturaleza y aventuras en el bosque.",
        "category": "Nature",
        "difficulty": 2,
        "imageUrl": "/coloring-images/forest.png",
        "thumbnailUrl": "/coloring-images/forest.png"
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
    print("🎨 Adding 12 New Sport and Nature Coloring Pages to Databases")
    print("=" * 80)
    print("Categories:")
    print("  • Sport: 9 images")
    print("    - Judo Match, Table Tennis, Hockey, Baseball")
    print("    - Swimmer, Volleyball, Tennis, American Football, Golf")
    print("  • Nature: 3 images")
    print("    - Lake, Mountains, Forest")
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
        print("2. Check that images load correctly")
        print("3. Test Spanish translations")
        print("4. Regenerate sitemap with: cd frontend && node generate-sitemap.js")
        print("5. Clear backend cache if categories don't appear:")
        print("   curl -X POST https://docker-composeyaml-production.up.railway.app/api/admin/cache/clear/categories")
    else:
        print("\n⚠️  Some paintings failed to add. Check errors above.")


if __name__ == "__main__":
    main()

