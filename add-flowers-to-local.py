#!/usr/bin/env python3
import requests
import json

backend_url = "http://localhost:8080"

flowers = [
    {
        "urlKey": "rose",
        "title": "Rose",
        "titleEs": "Rosa",
        "description": "A beautiful rose coloring page perfect for kids who love flowers!",
        "descriptionEs": "¡Una hermosa página para colorear de rosa perfecta para niños que aman las flores!",
        "category": "Flowers",
        "tags": "rose,flowers,nature,garden,romantic,coloring,kids",
        "imageUrl": "/coloring-images/rose.webp",
        "thumbnailUrl": "/coloring-images/rose.webp",
        "difficulty": 2
    },
    {
        "urlKey": "sunflower",
        "title": "Sunflower",
        "titleEs": "Girasol",
        "description": "A bright sunflower coloring page perfect for kids who love flowers!",
        "descriptionEs": "¡Una brillante página para colorear de girasol perfecta para niños que aman las flores!",
        "category": "Flowers",
        "tags": "sunflower,flowers,nature,garden,yellow,coloring,kids",
        "imageUrl": "/coloring-images/sunflower.webp",
        "thumbnailUrl": "/coloring-images/sunflower.webp",
        "difficulty": 2
    },
    {
        "urlKey": "lavender",
        "title": "Lavender",
        "titleEs": "Lavanda",
        "description": "A lovely lavender coloring page perfect for kids who love flowers!",
        "descriptionEs": "¡Una encantadora página para colorear de lavanda perfecta para niños que aman las flores!",
        "category": "Flowers",
        "tags": "lavender,flowers,nature,garden,purple,coloring,kids",
        "imageUrl": "/coloring-images/lavender.webp",
        "thumbnailUrl": "/coloring-images/lavender.webp",
        "difficulty": 2
    },
    {
        "urlKey": "pansy",
        "title": "Pansy",
        "titleEs": "Pensamiento",
        "description": "A colorful pansy coloring page perfect for kids who love flowers!",
        "descriptionEs": "¡Una colorida página para colorear de pensamiento perfecta para niños que aman las flores!",
        "category": "Flowers",
        "tags": "pansy,flowers,nature,garden,colorful,coloring,kids",
        "imageUrl": "/coloring-images/pansy.webp",
        "thumbnailUrl": "/coloring-images/pansy.webp",
        "difficulty": 2
    },
    {
        "urlKey": "calla-lily",
        "title": "Calla Lily",
        "titleEs": "Cala",
        "description": "An elegant calla lily coloring page perfect for kids who love flowers!",
        "descriptionEs": "¡Una elegante página para colorear de cala perfecta para niños que aman las flores!",
        "category": "Flowers",
        "tags": "calla lily,flowers,nature,garden,elegant,coloring,kids",
        "imageUrl": "/coloring-images/calla_lily.webp",
        "thumbnailUrl": "/coloring-images/calla_lily.webp",
        "difficulty": 2
    },
    {
        "urlKey": "tulip",
        "title": "Tulip",
        "titleEs": "Tulipán",
        "description": "A beautiful tulip coloring page perfect for kids who love flowers!",
        "descriptionEs": "¡Una hermosa página para colorear de tulipán perfecta para niños que aman las flores!",
        "category": "Flowers",
        "tags": "tulip,flowers,nature,garden,spring,coloring,kids",
        "imageUrl": "/coloring-images/tulip.webp",
        "thumbnailUrl": "/coloring-images/tulip.webp",
        "difficulty": 1
    },
    {
        "urlKey": "iris",
        "title": "Iris",
        "titleEs": "Lirio",
        "description": "A graceful iris coloring page perfect for kids who love flowers!",
        "descriptionEs": "¡Una graciosa página para colorear de lirio perfecta para niños que aman las flores!",
        "category": "Flowers",
        "tags": "iris,flowers,nature,garden,purple,coloring,kids",
        "imageUrl": "/coloring-images/iris.webp",
        "thumbnailUrl": "/coloring-images/iris.webp",
        "difficulty": 2
    },
    {
        "urlKey": "cherry-blossom",
        "title": "Cherry Blossom",
        "titleEs": "Flor de Cerezo",
        "description": "A delicate cherry blossom coloring page perfect for kids who love flowers!",
        "descriptionEs": "¡Una delicada página para colorear de flor de cerezo perfecta para niños que aman las flores!",
        "category": "Flowers",
        "tags": "cherry blossom,flowers,nature,spring,japanese,coloring,kids",
        "imageUrl": "/coloring-images/cherry_blossom.webp",
        "thumbnailUrl": "/coloring-images/cherry_blossom.webp",
        "difficulty": 2
    },
    {
        "urlKey": "snapdragon",
        "title": "Snapdragon",
        "titleEs": "Boca de Dragón",
        "description": "A fun snapdragon coloring page perfect for kids who love flowers!",
        "descriptionEs": "¡Una divertida página para colorear de boca de dragón perfecta para niños que aman las flores!",
        "category": "Flowers",
        "tags": "snapdragon,flowers,nature,garden,colorful,coloring,kids",
        "imageUrl": "/coloring-images/snapdragon.webp",
        "thumbnailUrl": "/coloring-images/snapdragon.webp",
        "difficulty": 2
    },
    {
        "urlKey": "amaryllis",
        "title": "Amaryllis",
        "titleEs": "Amarilis",
        "description": "A stunning amaryllis coloring page perfect for kids who love flowers!",
        "descriptionEs": "¡Una impresionante página para colorear de amarilis perfecta para niños que aman las flores!",
        "category": "Flowers",
        "tags": "amaryllis,flowers,nature,garden,red,coloring,kids",
        "imageUrl": "/coloring-images/amaryllis.webp",
        "thumbnailUrl": "/coloring-images/amaryllis.webp",
        "difficulty": 2
    },
    {
        "urlKey": "daffodil",
        "title": "Daffodil",
        "titleEs": "Narciso",
        "description": "A cheerful daffodil coloring page perfect for kids who love flowers!",
        "descriptionEs": "¡Una alegre página para colorear de narciso perfecta para niños que aman las flores!",
        "category": "Flowers",
        "tags": "daffodil,flowers,nature,garden,spring,yellow,coloring,kids",
        "imageUrl": "/coloring-images/daffodil.webp",
        "thumbnailUrl": "/coloring-images/daffodil.webp",
        "difficulty": 2
    },
    {
        "urlKey": "daisy",
        "title": "Daisy",
        "titleEs": "Margarita",
        "description": "A simple daisy coloring page perfect for kids who love flowers!",
        "descriptionEs": "¡Una simple página para colorear de margarita perfecta para niños que aman las flores!",
        "category": "Flowers",
        "tags": "daisy,flowers,nature,garden,simple,white,coloring,kids",
        "imageUrl": "/coloring-images/daisy.webp",
        "thumbnailUrl": "/coloring-images/daisy.webp",
        "difficulty": 1
    }
]

print("🌸 Adding flower paintings to LOCAL database...")
print(f"Total flowers: {len(flowers)}\n")

success_count = 0
error_count = 0

for flower in flowers:
    print(f"Adding {flower['title']}...")
    try:
        response = requests.post(
            f"{backend_url}/api/paintings",
            json=flower,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 200 or response.status_code == 201:
            result = response.json()
            print(f"  ✅ Success! ID: {result.get('id')}")
            success_count += 1
        else:
            print(f"  ❌ Error: {response.status_code}")
            print(f"     Response: {response.text[:200]}")
            error_count += 1
    except Exception as e:
        print(f"  ❌ Exception: {str(e)}")
        error_count += 1
    
    print()

print("\n" + "="*50)
print(f"✅ Successfully added: {success_count} flowers")
if error_count > 0:
    print(f"❌ Errors: {error_count} flowers")
print("="*50)

# Clear cache
print("\n🔄 Clearing local cache...")
try:
    response = requests.post(f"{backend_url}/api/admin/cache/clear", timeout=5)
    if response.status_code == 200:
        print("✅ Cache cleared!")
    else:
        print("⚠️  Cache clear may have failed")
except:
    print("⚠️  Cache clear endpoint not available, restart backend manually")

print("\n🎉 Done! Check http://localhost:3000/category/Flowers")


