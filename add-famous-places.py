#!/usr/bin/env python3
"""
Add Famous Places coloring pages to the database via REST API
Usage:
  python3 add-famous-places.py          # Add to local database
  python3 add-famous-places.py production  # Add to production database
"""

import requests
import json
import sys

# Famous Places data with Spanish translations
famous_places = [
    {
        "urlKey": "eiffel-tower-paris",
        "name": "Eiffel Tower",
        "nameSpanish": "Torre Eiffel",
        "description": "Color this iconic Eiffel Tower in Paris, France! A symbol of romance and beauty.",
        "descriptionSpanish": "¡Colorea la icónica Torre Eiffel de París, Francia! Un símbolo de romance y belleza.",
        "category": "Famous Places",
        "imagePath": "/coloring-images/eiffel_tower_paris.png"
    },
    {
        "urlKey": "statue-of-liberty",
        "name": "Statue of Liberty",
        "nameSpanish": "Estatua de la Libertad",
        "description": "Color the Statue of Liberty in New York! A symbol of freedom and democracy.",
        "descriptionSpanish": "¡Colorea la Estatua de la Libertad en Nueva York! Un símbolo de libertad y democracia.",
        "category": "Famous Places",
        "imagePath": "/coloring-images/the_statue_of_liberty.png"
    },
    {
        "urlKey": "taj-mahal",
        "name": "Taj Mahal",
        "nameSpanish": "Taj Mahal",
        "description": "Color the beautiful Taj Mahal in India! One of the Seven Wonders of the World.",
        "descriptionSpanish": "¡Colorea el hermoso Taj Mahal en India! Una de las Siete Maravillas del Mundo.",
        "category": "Famous Places",
        "imagePath": "/coloring-images/taj_mahal.png"
    },
    {
        "urlKey": "great-wall-of-china",
        "name": "Great Wall of China",
        "nameSpanish": "Gran Muralla China",
        "description": "Color the magnificent Great Wall of China! An ancient wonder stretching thousands of miles.",
        "descriptionSpanish": "¡Colorea la magnífica Gran Muralla China! Una maravilla antigua que se extiende miles de millas.",
        "category": "Famous Places",
        "imagePath": "/coloring-images/great_wall_of_china.png"
    },
    {
        "urlKey": "big-ben",
        "name": "Big Ben",
        "nameSpanish": "Big Ben",
        "description": "Color Big Ben in London, England! The famous clock tower and icon of Britain.",
        "descriptionSpanish": "¡Colorea el Big Ben en Londres, Inglaterra! La famosa torre del reloj e ícono de Gran Bretaña.",
        "category": "Famous Places",
        "imagePath": "/coloring-images/the_big_ben.png"
    },
    {
        "urlKey": "colosseum-rome",
        "name": "Colosseum",
        "nameSpanish": "Coliseo",
        "description": "Color the ancient Colosseum in Rome, Italy! A magnificent Roman amphitheater.",
        "descriptionSpanish": "¡Colorea el antiguo Coliseo de Roma, Italia! Un magnífico anfiteatro romano.",
        "category": "Famous Places",
        "imagePath": "/coloring-images/the_colosseum_rome.png"
    },
    {
        "urlKey": "pyramids-of-giza",
        "name": "Pyramids of Giza",
        "nameSpanish": "Pirámides de Giza",
        "description": "Color the Pyramids of Giza in Egypt! Ancient wonders built thousands of years ago.",
        "descriptionSpanish": "¡Colorea las Pirámides de Giza en Egipto! Maravillas antiguas construidas hace miles de años.",
        "category": "Famous Places",
        "imagePath": "/coloring-images/the_pyramids.png"
    },
    {
        "urlKey": "leaning-tower-of-pisa",
        "name": "Leaning Tower of Pisa",
        "nameSpanish": "Torre Inclinada de Pisa",
        "description": "Color the famous Leaning Tower of Pisa in Italy! A tilted architectural wonder.",
        "descriptionSpanish": "¡Colorea la famosa Torre Inclinada de Pisa en Italia! Una maravilla arquitectónica inclinada.",
        "category": "Famous Places",
        "imagePath": "/coloring-images/pisa_tower_italy.png"
    },
    {
        "urlKey": "sydney-opera-house",
        "name": "Sydney Opera House",
        "nameSpanish": "Ópera de Sídney",
        "description": "Color the Sydney Opera House in Australia! An iconic modern architectural masterpiece.",
        "descriptionSpanish": "¡Colorea la Ópera de Sídney en Australia! Una obra maestra de la arquitectura moderna icónica.",
        "category": "Famous Places",
        "imagePath": "/coloring-images/opera_house_sydney.png"
    },
    {
        "urlKey": "mount-fuji",
        "name": "Mount Fuji",
        "nameSpanish": "Monte Fuji",
        "description": "Color Mount Fuji in Japan! A sacred mountain and symbol of natural beauty.",
        "descriptionSpanish": "¡Colorea el Monte Fuji en Japón! Una montaña sagrada y símbolo de belleza natural.",
        "category": "Famous Places",
        "imagePath": "/coloring-images/mount_fuji.png"
    },
    {
        "urlKey": "machu-picchu",
        "name": "Machu Picchu",
        "nameSpanish": "Machu Picchu",
        "description": "Color Machu Picchu in Peru! An ancient Incan city high in the mountains.",
        "descriptionSpanish": "¡Colorea Machu Picchu en Perú! Una antigua ciudad inca en lo alto de las montañas.",
        "category": "Famous Places",
        "imagePath": "/coloring-images/machu_picchu.png"
    },
    {
        "urlKey": "christ-the-redeemer",
        "name": "Christ the Redeemer",
        "nameSpanish": "Cristo Redentor",
        "description": "Color Christ the Redeemer in Rio de Janeiro, Brazil! An iconic statue overlooking the city.",
        "descriptionSpanish": "¡Colorea el Cristo Redentor en Río de Janeiro, Brasil! Una estatua icónica con vista a la ciudad.",
        "category": "Famous Places",
        "imagePath": "/coloring-images/christ_rio_de_janeiro.png"
    },
    {
        "urlKey": "brandenburg-gate",
        "name": "Brandenburg Gate",
        "nameSpanish": "Puerta de Brandeburgo",
        "description": "Color the Brandenburg Gate in Berlin, Germany! A symbol of unity and peace.",
        "descriptionSpanish": "¡Colorea la Puerta de Brandeburgo en Berlín, Alemania! Un símbolo de unidad y paz.",
        "category": "Famous Places",
        "imagePath": "/coloring-images/brandenburg_gate.png"
    },
    {
        "urlKey": "hollywood-sign",
        "name": "Hollywood Sign",
        "nameSpanish": "Letrero de Hollywood",
        "description": "Color the Hollywood Sign in Los Angeles! The famous symbol of the entertainment industry.",
        "descriptionSpanish": "¡Colorea el Letrero de Hollywood en Los Ángeles! El famoso símbolo de la industria del entretenimiento.",
        "category": "Famous Places",
        "imagePath": "/coloring-images/hollywood_sign.png"
    },
    {
        "urlKey": "golden-gate-bridge",
        "name": "Golden Gate Bridge",
        "nameSpanish": "Puente Golden Gate",
        "description": "Color the Golden Gate Bridge in San Francisco! An iconic red suspension bridge over the bay.",
        "descriptionSpanish": "¡Colorea el Puente Golden Gate en San Francisco! Un icónico puente colgante rojo sobre la bahía.",
        "category": "Famous Places",
        "imagePath": "/coloring-images/the_golden_bridge.png"
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
            "tags": "famous,landmark,monument,architecture,travel,world,heritage"
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
    print("🏛️ Adding Famous Places Coloring Pages")
    print("=" * 60)
    print(f"🌐 Target: {api_url}")
    print("=" * 60)
    
    # Update the global API_URL
    global API_URL
    API_URL = api_url
    
    success_count = 0
    fail_count = 0
    
    for place in famous_places:
        if add_painting(place):
            success_count += 1
        else:
            fail_count += 1
    
    print("=" * 60)
    print(f"✅ Successfully added: {success_count}")
    print(f"❌ Failed: {fail_count}")
    print(f"📊 Total: {len(famous_places)}")
    
    if success_count > 0:
        print("\n✅ Famous places added successfully!")
        if "localhost" in api_url:
            print("\n📋 Test locally at:")
            print("  - http://localhost:3000/category/Famous%20Places")
            print("  - http://localhost:3000/es/category/Famous%20Places")
        else:
            print("\n📋 Test in production at:")
            print("  - https://painting-sand.vercel.app/category/Famous%20Places")
            print("  - https://painting-sand.vercel.app/es/category/Famous%20Places")

if __name__ == "__main__":
    # Determine which environment to use
    if len(sys.argv) > 1 and sys.argv[1] == "production":
        API_URL = "https://docker-composeyaml-production.up.railway.app/api"
        print("🌍 PRODUCTION MODE\n")
    else:
        API_URL = "http://localhost:8080/api"
        print("🏠 LOCAL MODE\n")
    
    main(API_URL)

