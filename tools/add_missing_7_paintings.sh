#!/bin/bash

# Add 7 missing paintings to production
set -e

PROD_API="https://docker-composeyaml-production.up.railway.app/api"

echo "🎨 Adding 7 missing paintings to production..."
echo "================================================"

# 1. Clown
echo "➕ Adding: Clown"
curl -X POST "$PROD_API/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "clown",
    "title": "Happy Clown",
    "description": "A cheerful clown with a big smile, juggling balls and spreading joy! Perfect coloring page for kids who love circus fun.",
    "titleEs": "Payaso Feliz",
    "descriptionEs": "¡Un payaso alegre con una gran sonrisa, haciendo malabares y difundiendo alegría! Página para colorear perfecta para niños que aman la diversión del circo.",
    "category": "Characters",
    "difficulty": 2,
    "tags": "clown,circus,happy,fun,entertainment,juggling,performer",
    "imageUrl": "/coloring-images/clown.png",
    "thumbnailUrl": "/coloring-images/clown.png",
    "featured": false
  }' && echo " ✅ Added" || echo " ❌ Failed"

# 2. Crocodile
echo "➕ Adding: Crocodile"
curl -X POST "$PROD_API/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "crokodile",
    "title": "Crocodile",
    "description": "A friendly crocodile with big teeth and scaly skin! Kids will love coloring this amazing reptile.",
    "titleEs": "Cocodrilo",
    "descriptionEs": "¡Un cocodrilo amistoso con grandes dientes y piel escamosa! A los niños les encantará colorear este asombroso reptil.",
    "category": "Animals",
    "difficulty": 2,
    "tags": "crocodile,reptile,animal,water,swamp,wildlife,scales,teeth",
    "imageUrl": "/coloring-images/crokodile.png",
    "thumbnailUrl": "/coloring-images/crokodile.png",
    "featured": false
  }' && echo " ✅ Added" || echo " ❌ Failed"

# 3. Friendly Ice Cream
echo "➕ Adding: Friendly Ice Cream"
curl -X POST "$PROD_API/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "friendly-icecream",
    "title": "Friendly Ice Cream",
    "description": "An adorable ice cream cone with a sweet smile! Perfect for kids who love sweet treats and cute characters.",
    "titleEs": "Helado Amigable",
    "descriptionEs": "¡Un adorable cono de helado con una dulce sonrisa! Perfecto para niños que aman los dulces y los personajes lindos.",
    "category": "Food",
    "difficulty": 1,
    "tags": "ice cream,food,dessert,sweet,cute,kawaii,happy,treat",
    "imageUrl": "/coloring-images/friendly_icecream.png",
    "thumbnailUrl": "/coloring-images/friendly_icecream.png",
    "featured": false
  }' && echo " ✅ Added" || echo " ❌ Failed"

# 4. Girl Playing Guitar
echo "➕ Adding: Girl Playing Guitar"
curl -X POST "$PROD_API/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "girl-playing-guitar",
    "title": "Girl Playing Guitar",
    "description": "A talented girl playing her guitar! Perfect for kids who love music and performing arts.",
    "titleEs": "Niña Tocando Guitarra",
    "descriptionEs": "¡Una niña talentosa tocando su guitarra! Perfecto para niños que aman la música y las artes escénicas.",
    "category": "Characters",
    "difficulty": 2,
    "tags": "girl,guitar,music,musician,performer,instrument,talent,art",
    "imageUrl": "/coloring-images/girl_playing_guitar.png",
    "thumbnailUrl": "/coloring-images/girl_playing_guitar.png",
    "featured": false
  }' && echo " ✅ Added" || echo " ❌ Failed"

# 5. Lion Cub
echo "➕ Adding: Lion Cub"
curl -X POST "$PROD_API/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "lion-cub",
    "title": "Lion Cub",
    "description": "An adorable baby lion cub learning to roar! Perfect for kids who love cute baby animals.",
    "titleEs": "Cachorro de León",
    "descriptionEs": "¡Un adorable cachorro de león aprendiendo a rugir! Perfecto para niños que aman los animales bebés lindos.",
    "category": "Animals",
    "difficulty": 2,
    "tags": "lion,cub,baby,animal,safari,wildlife,cute,young",
    "imageUrl": "/coloring-images/lion_cub.png",
    "thumbnailUrl": "/coloring-images/lion_cub.png",
    "featured": false
  }' && echo " ✅ Added" || echo " ❌ Failed"

# 6. Surfer
echo "➕ Adding: Surfer"
curl -X POST "$PROD_API/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "surfer",
    "title": "Surfer",
    "description": "An awesome surfer riding the waves! Perfect for kids who love beach sports and ocean adventures.",
    "titleEs": "Surfista",
    "descriptionEs": "¡Un surfista increíble surfeando las olas! Perfecto para niños que aman los deportes de playa y las aventuras oceánicas.",
    "category": "Sports",
    "difficulty": 2,
    "tags": "surfer,surfing,sports,beach,ocean,waves,water,athletic",
    "imageUrl": "/coloring-images/surfer.png",
    "thumbnailUrl": "/coloring-images/surfer.png",
    "featured": false
  }' && echo " ✅ Added" || echo " ❌ Failed"

# 7. Pop Star Singer (Taylor Swift)
echo "➕ Adding: Pop Star Singer"
curl -X POST "$PROD_API/paintings" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "taylor-swift",
    "title": "Pop Star Singer",
    "description": "A famous pop star performing on stage! Perfect for kids who love music and dream of being performers.",
    "titleEs": "Cantante Estrella del Pop",
    "descriptionEs": "¡Una famosa estrella del pop actuando en el escenario! Perfecto para niños que aman la música y sueñan con ser artistas.",
    "category": "Characters",
    "difficulty": 2,
    "tags": "singer,pop star,music,performer,celebrity,stage,concert,famous",
    "imageUrl": "/coloring-images/taylor_swift.jpg",
    "thumbnailUrl": "/coloring-images/taylor_swift.jpg",
    "featured": true
  }' && echo " ✅ Added" || echo " ❌ Failed"

echo ""
echo "✅ Done! Check production database."
