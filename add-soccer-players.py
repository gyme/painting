#!/usr/bin/env python3
"""
Add Soccer Players coloring pages to the database via REST API
Usage:
  python3 add-soccer-players.py          # Add to local database
  python3 add-soccer-players.py production  # Add to production database
"""

import requests
import json
import sys

# Soccer Players data with Spanish translations
soccer_players = [
    {
        "urlKey": "cristiano-ronaldo",
        "name": "Cristiano Ronaldo",
        "nameSpanish": "Cristiano Ronaldo",
        "description": "Color this amazing portrait of Cristiano Ronaldo, one of the greatest soccer players of all time!",
        "descriptionSpanish": "¡Colorea este increíble retrato de Cristiano Ronaldo, uno de los mejores futbolistas de todos los tiempos!",
        "category": "Soccer Players",
        "imagePath": "/coloring-images/cristiano_ronaldo.png"
    },
    {
        "urlKey": "cristiano-ronaldo-playing",
        "name": "Cristiano Ronaldo Playing",
        "nameSpanish": "Cristiano Ronaldo Jugando",
        "description": "Color Cristiano Ronaldo in action on the field!",
        "descriptionSpanish": "¡Colorea a Cristiano Ronaldo en acción en el campo!",
        "category": "Soccer Players",
        "imagePath": "/coloring-images/cristiano_ronaldo_playing.png"
    },
    {
        "urlKey": "lionel-messi",
        "name": "Lionel Messi",
        "nameSpanish": "Lionel Messi",
        "description": "Color this portrait of Lionel Messi, the legendary Argentine soccer star!",
        "descriptionSpanish": "¡Colorea este retrato de Lionel Messi, la estrella legendaria del fútbol argentino!",
        "category": "Soccer Players",
        "imagePath": "/coloring-images/lionel_messi.png"
    },
    {
        "urlKey": "lionel-messi-playing",
        "name": "Lionel Messi Playing",
        "nameSpanish": "Lionel Messi Jugando",
        "description": "Color Lionel Messi showing his incredible skills on the field!",
        "descriptionSpanish": "¡Colorea a Lionel Messi mostrando sus increíbles habilidades en el campo!",
        "category": "Soccer Players",
        "imagePath": "/coloring-images/lionel_messi_playing.png"
    },
    {
        "urlKey": "neymar",
        "name": "Neymar",
        "nameSpanish": "Neymar",
        "description": "Color this exciting portrait of Brazilian superstar Neymar!",
        "descriptionSpanish": "¡Colorea este emocionante retrato de la superestrella brasileña Neymar!",
        "category": "Soccer Players",
        "imagePath": "/coloring-images/neymar.png"
    },
    {
        "urlKey": "kylian-mbappe",
        "name": "Kylian Mbappé",
        "nameSpanish": "Kylian Mbappé",
        "description": "Color this portrait of French speedster Kylian Mbappé!",
        "descriptionSpanish": "¡Colorea este retrato del velocista francés Kylian Mbappé!",
        "category": "Soccer Players",
        "imagePath": "/coloring-images/kylian_mbappe.png"
    },
    {
        "urlKey": "pele",
        "name": "Pelé",
        "nameSpanish": "Pelé",
        "description": "Color this portrait of Pelé, the king of soccer!",
        "descriptionSpanish": "¡Colorea este retrato de Pelé, el rey del fútbol!",
        "category": "Soccer Players",
        "imagePath": "/coloring-images/pele.png"
    },
    {
        "urlKey": "diego-maradona",
        "name": "Diego Maradona",
        "nameSpanish": "Diego Maradona",
        "description": "Color this portrait of Diego Maradona, the Argentine legend!",
        "descriptionSpanish": "¡Colorea este retrato de Diego Maradona, la leyenda argentina!",
        "category": "Soccer Players",
        "imagePath": "/coloring-images/diego_maradona.png"
    },
    {
        "urlKey": "ronaldinho",
        "name": "Ronaldinho",
        "nameSpanish": "Ronaldinho",
        "description": "Color this joyful portrait of Brazilian maestro Ronaldinho!",
        "descriptionSpanish": "¡Colorea este alegre retrato del maestro brasileño Ronaldinho!",
        "category": "Soccer Players",
        "imagePath": "/coloring-images/ronaldinho.png"
    },
    {
        "urlKey": "ronaldo-nazario",
        "name": "Ronaldo Nazário",
        "nameSpanish": "Ronaldo Nazário",
        "description": "Color this portrait of Ronaldo Nazário, the legendary Brazilian striker!",
        "descriptionSpanish": "¡Colorea este retrato de Ronaldo Nazário, el legendario delantero brasileño!",
        "category": "Soccer Players",
        "imagePath": "/coloring-images/ronaldo_nazario.png"
    },
    {
        "urlKey": "zinedine-zidane",
        "name": "Zinedine Zidane",
        "nameSpanish": "Zinedine Zidane",
        "description": "Color this portrait of French legend Zinedine Zidane!",
        "descriptionSpanish": "¡Colorea este retrato de la leyenda francesa Zinedine Zidane!",
        "category": "Soccer Players",
        "imagePath": "/coloring-images/zinedine_zidane.png"
    },
    {
        "urlKey": "david-beckham",
        "name": "David Beckham",
        "nameSpanish": "David Beckham",
        "description": "Color this portrait of English star David Beckham!",
        "descriptionSpanish": "¡Colorea este retrato de la estrella inglesa David Beckham!",
        "category": "Soccer Players",
        "imagePath": "/coloring-images/david_beckham.png"
    },
    {
        "urlKey": "johan-cruyff",
        "name": "Johan Cruyff",
        "nameSpanish": "Johan Cruyff",
        "description": "Color this portrait of Dutch master Johan Cruyff!",
        "descriptionSpanish": "¡Colorea este retrato del maestro holandés Johan Cruyff!",
        "category": "Soccer Players",
        "imagePath": "/coloring-images/johan_cruyff.png"
    },
    {
        "urlKey": "mohamed-salah",
        "name": "Mohamed Salah",
        "nameSpanish": "Mohamed Salah",
        "description": "Color this portrait of Egyptian superstar Mohamed Salah!",
        "descriptionSpanish": "¡Colorea este retrato de la superestrella egipcia Mohamed Salah!",
        "category": "Soccer Players",
        "imagePath": "/coloring-images/salah.png"
    },
    {
        "urlKey": "alisson-becker",
        "name": "Alisson Becker",
        "nameSpanish": "Alisson Becker",
        "description": "Color this portrait of Brazilian goalkeeper Alisson Becker!",
        "descriptionSpanish": "¡Colorea este retrato del portero brasileño Alisson Becker!",
        "category": "Soccer Players",
        "imagePath": "/coloring-images/alisson_becker.png"
    }
]

def add_painting(painting):
    """Add a painting to the database"""
    try:
        data = {
            "urlKey": painting["urlKey"],
            "title": painting["name"],
            "titleEs": painting["nameSpanish"],
            "description": painting["description"],
            "descriptionEs": painting["descriptionSpanish"],
            "category": painting["category"],
            "imageUrl": painting["imagePath"],
            "thumbnailUrl": painting["imagePath"],
            "difficulty": 3,
            "featured": False,
            "viewCount": 0,
            "tags": "soccer,football,player,sports,athlete,legend,star"
        }
        
        response = requests.post(
            f"{API_URL}/paintings",
            json=data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code in [200, 201]:
            print(f"✅ Added {painting['name']}")
            return True
        else:
            print(f"❌ Failed to add {painting['name']}: HTTP {response.status_code}")
            print(f"   Response: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Failed to add {painting['name']}: {str(e)}")
        return False

def main(api_url):
    print("⚽ Adding Soccer Players Coloring Pages")
    print("=" * 60)
    print(f"🌐 Target: {api_url}")
    print("=" * 60)
    
    # Update the global API_URL
    global API_URL
    API_URL = api_url
    
    success_count = 0
    fail_count = 0
    
    for player in soccer_players:
        if add_painting(player):
            success_count += 1
        else:
            fail_count += 1
    
    print("=" * 60)
    print(f"✅ Successfully added: {success_count}")
    print(f"❌ Failed: {fail_count}")
    print(f"📊 Total: {len(soccer_players)}")
    
    if success_count > 0:
        print("\n✅ Soccer players added successfully!")
        if "localhost" in api_url:
            print("\n📋 Test locally at:")
            print("  - http://localhost:3000/category/Soccer%20Players")
            print("  - http://localhost:3000/es/category/Soccer%20Players")
        else:
            print("\n📋 Test in production at:")
            print("  - https://painting-sand.vercel.app/category/Soccer%20Players")
            print("  - https://painting-sand.vercel.app/es/category/Soccer%20Players")

if __name__ == "__main__":
    # Determine which environment to use
    if len(sys.argv) > 1 and sys.argv[1] == "production":
        API_URL = "https://docker-composeyaml-production.up.railway.app/api"
        print("🌍 PRODUCTION MODE\n")
    else:
        API_URL = "http://localhost:8080/api"
        print("🏠 LOCAL MODE\n")
    
    main(API_URL)

