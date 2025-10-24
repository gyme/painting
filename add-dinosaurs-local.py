#!/usr/bin/env python3
"""
Add dinosaur paintings to LOCAL database
"""

import requests
import json

API_URL = "http://localhost:8080/api"

# Dinosaur data with Spanish translations
dinosaurs = [
    {
        "urlKey": "t-rex",
        "title": "T-Rex",
        "titleEs": "T-Rex",
        "description": "Color a mighty T-Rex! Perfect for dinosaur-loving kids.",
        "descriptionEs": "¡Colorea un poderoso T-Rex! Perfecto para niños amantes de los dinosaurios.",
        "category": "Dinosaurs",
        "imageUrl": "/coloring-images/t_rex.png",
        "thumbnailUrl": "/coloring-images/t_rex.png",
        "difficulty": 3,
        "featured": False
    },
    {
        "urlKey": "triceratops",
        "title": "Triceratops",
        "titleEs": "Triceratops",
        "description": "Color a three-horned Triceratops! Great for young artists.",
        "descriptionEs": "¡Colorea un Triceratops de tres cuernos! Genial para jóvenes artistas.",
        "category": "Dinosaurs",
        "imageUrl": "/coloring-images/triceratops.png",
        "thumbnailUrl": "/coloring-images/triceratops.png",
        "difficulty": 3,
        "featured": False
    },
    {
        "urlKey": "stegosaurus",
        "title": "Stegosaurus",
        "titleEs": "Estegosaurio",
        "description": "Color a plated Stegosaurus! Fun for creative kids.",
        "descriptionEs": "¡Colorea un Estegosaurio con placas! Divertido para niños creativos.",
        "category": "Dinosaurs",
        "imageUrl": "/coloring-images/stegosaurus.png",
        "thumbnailUrl": "/coloring-images/stegosaurus.png",
        "difficulty": 3,
        "featured": False
    },
    {
        "urlKey": "velociraptor",
        "title": "Velociraptor",
        "titleEs": "Velociraptor",
        "description": "Color a swift Velociraptor! Perfect for dino fans.",
        "descriptionEs": "¡Colorea un veloz Velociraptor! Perfecto para fanáticos de los dinosaurios.",
        "category": "Dinosaurs",
        "imageUrl": "/coloring-images/velociraptor.png",
        "thumbnailUrl": "/coloring-images/velociraptor.png",
        "difficulty": 3,
        "featured": False
    },
    {
        "urlKey": "brachiosaurus",
        "title": "Brachiosaurus",
        "titleEs": "Braquiosaurio",
        "description": "Color a long-necked Brachiosaurus! Great for young paleontologists.",
        "descriptionEs": "¡Colorea un Braquiosaurio de cuello largo! Genial para jóvenes paleontólogos.",
        "category": "Dinosaurs",
        "imageUrl": "/coloring-images/brachiosaurus.png",
        "thumbnailUrl": "/coloring-images/brachiosaurus.png",
        "difficulty": 3,
        "featured": False
    },
    {
        "urlKey": "spinosaurus",
        "title": "Spinosaurus",
        "titleEs": "Espinosaurio",
        "description": "Color a sail-backed Spinosaurus! Fun for adventurous kids.",
        "descriptionEs": "¡Colorea un Espinosaurio con vela dorsal! Divertido para niños aventureros.",
        "category": "Dinosaurs",
        "imageUrl": "/coloring-images/spinosaurus.png",
        "thumbnailUrl": "/coloring-images/spinosaurus.png",
        "difficulty": 4,
        "featured": False
    },
    {
        "urlKey": "pteranodon",
        "title": "Pteranodon",
        "titleEs": "Pteranodon",
        "description": "Color a flying Pteranodon! Perfect for sky-loving artists.",
        "descriptionEs": "¡Colorea un Pteranodon volador! Perfecto para artistas amantes del cielo.",
        "category": "Dinosaurs",
        "imageUrl": "/coloring-images/pteranodon.png",
        "thumbnailUrl": "/coloring-images/pteranodon.png",
        "difficulty": 3,
        "featured": False
    },
    {
        "urlKey": "ankylosaurus",
        "title": "Ankylosaurus",
        "titleEs": "Anquilosaurio",
        "description": "Color an armored Ankylosaurus! Great for creative kids.",
        "descriptionEs": "¡Colorea un Anquilosaurio acorazado! Genial para niños creativos.",
        "category": "Dinosaurs",
        "imageUrl": "/coloring-images/ankylosaurus.png",
        "thumbnailUrl": "/coloring-images/ankylosaurus.png",
        "difficulty": 3,
        "featured": False
    },
    {
        "urlKey": "parasaurolophus",
        "title": "Parasaurolophus",
        "titleEs": "Parasaurolofus",
        "description": "Color a crested Parasaurolophus! Fun for young explorers.",
        "descriptionEs": "¡Colorea un Parasaurolofus con cresta! Divertido para jóvenes exploradores.",
        "category": "Dinosaurs",
        "imageUrl": "/coloring-images/parasaurolophus.png",
        "thumbnailUrl": "/coloring-images/parasaurolophus.png",
        "difficulty": 3,
        "featured": False
    }
]

def add_dinosaurs():
    """Add all dinosaurs to local database"""
    print(f"🦖 Adding {len(dinosaurs)} dinosaurs to LOCAL database...")
    print(f"API URL: {API_URL}\n")
    
    success_count = 0
    error_count = 0
    
    for dino in dinosaurs:
        try:
            print(f"Adding: {dino['title']} ({dino['titleEs']})...")
            
            response = requests.post(
                f"{API_URL}/paintings",
                json=dino,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code in [200, 201]:
                success_count += 1
                print(f"  ✅ Success! ID: {response.json().get('id')}")
            else:
                error_count += 1
                print(f"  ❌ Failed: {response.status_code} - {response.text}")
                
        except Exception as e:
            error_count += 1
            print(f"  ❌ Error: {str(e)}")
        
        print()
    
    print(f"\n{'='*50}")
    print(f"✅ Successfully added: {success_count} dinosaurs")
    if error_count > 0:
        print(f"❌ Failed: {error_count} dinosaurs")
    print(f"{'='*50}")
    
    # Verify
    print("\n🔍 Verifying dinosaurs in database...")
    try:
        response = requests.get(f"{API_URL}/paintings/category/Dinosaurs")
        if response.status_code == 200:
            data = response.json()
            count = data.get('totalElements', 0)
            print(f"✅ Found {count} dinosaurs in Dinosaurs category")
            
            if count > 0:
                print("\n📋 Local URLs to test:")
                for painting in data.get('content', []):
                    url_key = painting.get('urlKey', '')
                    print(f"  - http://localhost:3000/coloring-page/{url_key}")
                    print(f"  - http://localhost:3000/es/coloring-page/{url_key}")
    except Exception as e:
        print(f"❌ Verification failed: {str(e)}")

if __name__ == "__main__":
    add_dinosaurs()

