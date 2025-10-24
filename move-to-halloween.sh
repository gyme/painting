#!/bin/bash

# Move existing Halloween-themed paintings to Halloween category

API_URL="https://docker-composeyaml-production.up.railway.app/api/paintings"

echo "🎃 Moving paintings to Halloween category..."
echo "============================================"

# Update witch (ID 36)
curl -X PUT "$API_URL/36" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "witch",
    "title": "Witch",
    "titleEs": "Bruja",
    "description": "Color a friendly witch! Perfect for Halloween.",
    "descriptionEs": "¡Colorea una bruja amigable! Perfecto para Halloween.",
    "category": "Halloween",
    "difficulty": 2,
    "imageUrl": "/coloring-images/witch.png",
    "thumbnailUrl": "/coloring-images/witch.png"
  }' -s | grep -E "id|title" && echo "✅ Moved Witch"

# Update witch-cat (ID 37)
curl -X PUT "$API_URL/37" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "witch-cat",
    "title": "Witch Cat",
    "titleEs": "Gato Bruja",
    "description": "Color a magical witch cat! A perfect Halloween companion.",
    "descriptionEs": "¡Colorea un gato mágico de bruja! Un compañero perfecto de Halloween.",
    "category": "Halloween",
    "difficulty": 2,
    "imageUrl": "/coloring-images/witch_cat.png",
    "thumbnailUrl": "/coloring-images/witch_cat.png"
  }' -s | grep -E "id|title" && echo "✅ Moved Witch Cat"

# Update witch-hat (ID 38)
curl -X PUT "$API_URL/38" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "witch-hat",
    "title": "Witch Hat",
    "titleEs": "Sombrero de Bruja",
    "description": "Color a classic witch hat! A spooky Halloween accessory.",
    "descriptionEs": "¡Colorea un sombrero de bruja clásico! Un accesorio espeluznante de Halloween.",
    "category": "Halloween",
    "difficulty": 1,
    "imageUrl": "/coloring-images/witch_hat.png",
    "thumbnailUrl": "/coloring-images/witch_hat.png"
  }' -s | grep -E "id|title" && echo "✅ Moved Witch Hat"

# Update cute-scarecrow (ID 88)
curl -X PUT "$API_URL/88" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "cute-scarecrow",
    "title": "Cute Scarecrow",
    "titleEs": "Espantapájaros Lindo",
    "description": "Color a cute scarecrow! Perfect for fall and Halloween.",
    "descriptionEs": "¡Colorea un espantapájaros lindo! Perfecto para otoño y Halloween.",
    "category": "Halloween",
    "difficulty": 2,
    "imageUrl": "/coloring-images/cute_scarecrow.png",
    "thumbnailUrl": "/coloring-images/cute_scarecrow.png"
  }' -s | grep -E "id|title" && echo "✅ Moved Cute Scarecrow"

echo ""
echo "============================================"
echo "✅ All paintings moved to Halloween!"
echo "Total: 4 paintings moved"


