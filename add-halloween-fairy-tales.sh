#!/bin/bash

# Add new Halloween and Fairy Tales paintings to production

API_URL="https://docker-composeyaml-production.up.railway.app/api/paintings"

echo "🎃 Adding Halloween and Fairy Tales paintings..."
echo "================================================"

# Fairy Tales
echo "📚 Adding Fairy Tales..."

curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "aladin",
    "title": "Aladin",
    "titleEs": "Aladin",
    "description": "Color Aladin and his magical lamp! A classic tale of adventure and wishes.",
    "descriptionEs": "¡Colorea a Aladin y su lámpara mágica! Un cuento clásico de aventuras y deseos.",
    "category": "Fairy Tales",
    "difficulty": 3,
    "imageUrl": "/coloring-images/aladin.png",
    "thumbnailUrl": "/coloring-images/aladin.png"
  }' -s | grep -E "id|title" && echo "✅ Added Aladin"

curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "little-mermaid",
    "title": "The Little Mermaid",
    "titleEs": "La Sirenita",
    "description": "Color the Little Mermaid! A beautiful underwater princess story.",
    "descriptionEs": "¡Colorea a la Sirenita! Una hermosa historia de una princesa submarina.",
    "category": "Fairy Tales",
    "difficulty": 3,
    "imageUrl": "/coloring-images/little_mermaid.png",
    "thumbnailUrl": "/coloring-images/little_mermaid.png"
  }' -s | grep -E "id|title" && echo "✅ Added Little Mermaid"

curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "robin-hood",
    "title": "Robin Hood",
    "titleEs": "Robin Hood",
    "description": "Color Robin Hood, the legendary outlaw hero! Brave and kind.",
    "descriptionEs": "¡Colorea a Robin Hood, el legendario héroe forajido! Valiente y bondadoso.",
    "category": "Fairy Tales",
    "difficulty": 3,
    "imageUrl": "/coloring-images/robin_hood.png",
    "thumbnailUrl": "/coloring-images/robin_hood.png"
  }' -s | grep -E "id|title" && echo "✅ Added Robin Hood"

curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "queen-of-hearts",
    "title": "Queen of Hearts",
    "titleEs": "Reina de Corazones",
    "description": "Color the Queen of Hearts from Alice in Wonderland! A royal character.",
    "descriptionEs": "¡Colorea a la Reina de Corazones de Alicia en el País de las Maravillas! Un personaje real.",
    "category": "Fairy Tales",
    "difficulty": 3,
    "imageUrl": "/coloring-images/queen_of_hearts.png",
    "thumbnailUrl": "/coloring-images/queen_of_hearts.png"
  }' -s | grep -E "id|title" && echo "✅ Added Queen of Hearts"

curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "the-wizard-of-oz",
    "title": "The Wizard of Oz",
    "titleEs": "El Mago de Oz",
    "description": "Color Dorothy and friends from the Wizard of Oz! Follow the yellow brick road.",
    "descriptionEs": "¡Colorea a Dorothy y sus amigos del Mago de Oz! Sigue el camino de baldosas amarillas.",
    "category": "Fairy Tales",
    "difficulty": 3,
    "imageUrl": "/coloring-images/the_wizard_of_oz.png",
    "thumbnailUrl": "/coloring-images/the_wizard_of_oz.png"
  }' -s | grep -E "id|title" && echo "✅ Added Wizard of Oz"

# Animals
echo ""
echo "🦩 Adding Animals..."

curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "ostrich",
    "title": "Ostrich",
    "titleEs": "Avestruz",
    "description": "Color a tall ostrich! The fastest running bird in the world.",
    "descriptionEs": "¡Colorea un avestruz alto! El ave corredora más rápida del mundo.",
    "category": "Animals",
    "difficulty": 2,
    "imageUrl": "/coloring-images/ostrich.png",
    "thumbnailUrl": "/coloring-images/ostrich.png"
  }' -s | grep -E "id|title" && echo "✅ Added Ostrich"

# Halloween
echo ""
echo "🎃 Adding Halloween..."

curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "halloween-house",
    "title": "Halloween House",
    "titleEs": "Casa de Halloween",
    "description": "Color a spooky Halloween house! Perfect for the spooky season.",
    "descriptionEs": "¡Colorea una casa espeluznante de Halloween! Perfecta para la temporada de miedo.",
    "category": "Halloween",
    "difficulty": 3,
    "imageUrl": "/coloring-images/haloween_house.png",
    "thumbnailUrl": "/coloring-images/haloween_house.png"
  }' -s | grep -E "id|title" && echo "✅ Added Halloween House"

curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "halloween-scarecrow",
    "title": "Halloween Scarecrow",
    "titleEs": "Espantapájaros de Halloween",
    "description": "Color a friendly Halloween scarecrow! Not scary, just fun!",
    "descriptionEs": "¡Colorea un espantapájaros amigable de Halloween! ¡No da miedo, solo diversión!",
    "category": "Halloween",
    "difficulty": 2,
    "imageUrl": "/coloring-images/haloween_scarecraw.png",
    "thumbnailUrl": "/coloring-images/haloween_scarecraw.png"
  }' -s | grep -E "id|title" && echo "✅ Added Halloween Scarecrow"

curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "halloween-pumpkin-basket",
    "title": "Halloween Pumpkin Basket",
    "titleEs": "Cesta de Calabazas de Halloween",
    "description": "Color a pumpkin basket full of treats! Trick or treat!",
    "descriptionEs": "¡Colorea una cesta de calabazas llena de dulces! ¡Truco o trato!",
    "category": "Halloween",
    "difficulty": 2,
    "imageUrl": "/coloring-images/haloween_pumpkin_basket.png",
    "thumbnailUrl": "/coloring-images/haloween_pumpkin_basket.png"
  }' -s | grep -E "id|title" && echo "✅ Added Halloween Pumpkin Basket"

curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "halloween-cat",
    "title": "Halloween Cat",
    "titleEs": "Gato de Halloween",
    "description": "Color a cute Halloween black cat! A classic spooky symbol.",
    "descriptionEs": "¡Colorea un lindo gato negro de Halloween! Un símbolo espeluznante clásico.",
    "category": "Halloween",
    "difficulty": 2,
    "imageUrl": "/coloring-images/haloween_cat.png",
    "thumbnailUrl": "/coloring-images/haloween_cat.png"
  }' -s | grep -E "id|title" && echo "✅ Added Halloween Cat"

curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "trick-or-treat",
    "title": "Trick or Treat",
    "titleEs": "Truco o Trato",
    "description": "Color kids going trick or treating! The best Halloween tradition.",
    "descriptionEs": "¡Colorea niños yendo por dulces! La mejor tradición de Halloween.",
    "category": "Halloween",
    "difficulty": 3,
    "imageUrl": "/coloring-images/trick_or_treat.png",
    "thumbnailUrl": "/coloring-images/trick_or_treat.png"
  }' -s | grep -E "id|title" && echo "✅ Added Trick or Treat"

curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "friendly-ghost",
    "title": "Friendly Ghost",
    "titleEs": "Fantasma Amigable",
    "description": "Color a friendly ghost! Not scary, just cute and fun.",
    "descriptionEs": "¡Colorea un fantasma amigable! No da miedo, solo es lindo y divertido.",
    "category": "Halloween",
    "difficulty": 1,
    "imageUrl": "/coloring-images/friendly_ghost.png",
    "thumbnailUrl": "/coloring-images/friendly_ghost.png"
  }' -s | grep -E "id|title" && echo "✅ Added Friendly Ghost"

curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "pumpkins",
    "title": "Pumpkins",
    "titleEs": "Calabazas",
    "description": "Color Halloween pumpkins! Jack-o-lanterns ready to be carved.",
    "descriptionEs": "¡Colorea calabazas de Halloween! Listas para ser talladas.",
    "category": "Halloween",
    "difficulty": 2,
    "imageUrl": "/coloring-images/pumpkins.png",
    "thumbnailUrl": "/coloring-images/pumpkins.png"
  }' -s | grep -E "id|title" && echo "✅ Added Pumpkins"

echo ""
echo "================================================"
echo "✅ All paintings added successfully!"
echo "Total: 13 new paintings"
echo "  - 5 Fairy Tales"
echo "  - 1 Animal"
echo "  - 7 Halloween"


