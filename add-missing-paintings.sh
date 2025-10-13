#!/bin/bash

echo "Adding missing paintings..."
echo ""

API_URL="http://localhost:8080/api/paintings"

# Bird Mandala
echo "1. Adding Bird Mandala..."
curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "bird-mandala",
    "title": "Bird Mandala",
    "description": "A beautiful bird mandala with intricate feather patterns and symmetry!",
    "category": "Animals",
    "tags": "bird,mandala,patterns,intricate,meditation,relaxing",
    "imageUrl": "/coloring-images/bird_mandala.png",
    "thumbnailUrl": "/coloring-images/bird_mandala.png",
    "difficulty": 3,
    "colorPalette": "[\"#87CEEB\",\"#4682B4\",\"#5F9EA0\",\"#6495ED\",\"#B0E0E6\"]",
    "featured": true,
    "viewCount": 0,
    "svgPath": ""
  }' > /dev/null && echo "   ✅ Bird Mandala added"

# Fairy
echo "2. Adding Fairy..."
curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "fairy",
    "title": "Fairy",
    "description": "A magical fairy from a fantasy world! Let your imagination soar.",
    "category": "Fantasy",
    "tags": "fairy,fantasy,magic,wings,enchanted",
    "imageUrl": "/coloring-images/fairy.png",
    "thumbnailUrl": "/coloring-images/fairy.png",
    "difficulty": 2,
    "colorPalette": "[\"#FF69B4\",\"#DDA0DD\",\"#87CEEB\",\"#FFD700\",\"#F0E68C\"]",
    "featured": true,
    "viewCount": 0,
    "svgPath": ""
  }' > /dev/null && echo "   ✅ Fairy added"

# Super Dino
echo "3. Adding Super Dino..."
curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "super-dino",
    "title": "Super Dino",
    "description": "A super cool dinosaur coloring page! Perfect for kids who love dinosaurs.",
    "category": "Animals",
    "tags": "dinosaur,dino,super,cool,prehistoric",
    "imageUrl": "/coloring-images/super_dino.png",
    "thumbnailUrl": "/coloring-images/super_dino.png",
    "difficulty": 2,
    "colorPalette": "[\"#FF6B6B\",\"#4ECDC4\",\"#45B7D1\",\"#FFA07A\",\"#98D8C8\"]",
    "featured": false,
    "viewCount": 0,
    "svgPath": ""
  }' > /dev/null && echo "   ✅ Super Dino added"

# Unicorn
echo "4. Adding Unicorn..."
curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "unicorn",
    "title": "Unicorn",
    "description": "A magical unicorn from a fantasy world! Let your imagination soar.",
    "category": "Fantasy",
    "tags": "unicorn,fantasy,magic,horn,rainbow",
    "imageUrl": "/coloring-images/unicorn.png",
    "thumbnailUrl": "/coloring-images/unicorn.png",
    "difficulty": 2,
    "colorPalette": "[\"#FF69B4\",\"#DDA0DD\",\"#87CEEB\",\"#FFD700\",\"#F0E68C\"]",
    "featured": false,
    "viewCount": 0,
    "svgPath": ""
  }' > /dev/null && echo "   ✅ Unicorn added"

echo ""
echo "✅ All 4 paintings added successfully!"
echo ""

# Get total count
TOTAL=$(curl -s 'http://localhost:8080/api/paintings?page=0&size=1' | jq '.totalElements' 2>/dev/null)
echo "Total paintings in database: $TOTAL"

