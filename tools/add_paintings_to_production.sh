#!/bin/bash

# Add new paintings directly to production API
set -e

PROD_API="https://docker-composeyaml-production.up.railway.app/api"

echo "🎨 Adding new holiday paintings to production..."
echo "================================================"
echo ""

# Array of paintings to add (English + Spanish in same row)
declare -a PAINTINGS=(
# 1. Hanukkah Menorah
'{
  "urlKey": "hanuka-menorah",
  "title": "Hanukkah Menorah",
  "description": "A beautiful Hanukkah menorah coloring page perfect for celebrating the Festival of Lights! Kids can color the nine branches and learn about this special Jewish holiday tradition.",
  "titleEs": "Menorá de Hanukkah",
  "descriptionEs": "¡Una hermosa página para colorear de menorá de Hanukkah perfecta para celebrar la Fiesta de las Luces! Los niños pueden colorear las nueve ramas y aprender sobre esta tradición especial de la festividad judía.",
  "category": "Holidays",
  "difficulty": 2,
  "tags": "hanukkah,menorah,jewish,holiday,festival,lights,candles,tradition",
  "imageUrl": "/coloring-images/hanuka_menorah.png",
  "thumbnailUrl": "/coloring-images/hanuka_menorah.png",
  "featured": false
}'

# 2. Christmas Stockings
'{
  "urlKey": "christmas-socks",
  "title": "Christmas Stockings",
  "description": "Festive Christmas stockings hanging by the fireplace! A fun coloring page featuring decorative holiday socks ready to be filled with treats and surprises.",
  "titleEs": "Calcetines de Navidad",
  "descriptionEs": "¡Calcetines navideños festivos colgando junto a la chimenea! Una divertida página para colorear con calcetines decorativos listos para llenarse de golosinas y sorpresas.",
  "category": "Holidays",
  "difficulty": 1,
  "tags": "christmas,stockings,socks,holiday,fireplace,gifts,santa,decoration",
  "imageUrl": "/coloring-images/christmas_socks.png",
  "thumbnailUrl": "/coloring-images/christmas_socks.png",
  "featured": false
}'

# 3. Rudolph the Reindeer
'{
  "urlKey": "rudolph-the-reindeer",
  "title": "Rudolph the Red-Nosed Reindeer",
  "description": "The most famous reindeer of all! Color Rudolph with his bright red nose as he gets ready to guide Santa'\''s sleigh through the snowy night.",
  "titleEs": "Rodolfo el Reno de Nariz Roja",
  "descriptionEs": "¡El reno más famoso de todos! Colorea a Rodolfo con su brillante nariz roja mientras se prepara para guiar el trineo de Santa en la noche nevada.",
  "category": "Holidays",
  "difficulty": 2,
  "tags": "rudolph,reindeer,christmas,santa,red nose,holiday,sleigh,winter",
  "imageUrl": "/coloring-images/rudolph.png",
  "thumbnailUrl": "/coloring-images/rudolph.png",
  "featured": false
}'

# 4. Santa Claus
'{
  "urlKey": "santa-claus",
  "title": "Santa Claus",
  "description": "Ho ho ho! Santa Claus is ready to deliver presents! Color jolly Santa with his big beard, red suit, and warm smile as he prepares for Christmas Eve.",
  "titleEs": "Papá Noel",
  "descriptionEs": "¡Jo jo jo! ¡Papá Noel está listo para entregar regalos! Colorea al alegre Santa con su gran barba, traje rojo y cálida sonrisa mientras se prepara para la Nochebuena.",
  "category": "Holidays",
  "difficulty": 2,
  "tags": "santa,santa claus,christmas,holiday,presents,gifts,north pole,beard",
  "imageUrl": "/coloring-images/santa_clause.png",
  "thumbnailUrl": "/coloring-images/santa_clause.png",
  "featured": false
}'

# 5. Christmas Tree
'{
  "urlKey": "christmas-tree",
  "title": "Christmas Tree",
  "description": "A beautifully decorated Christmas tree! Color the ornaments, lights, star on top, and presents underneath this festive holiday tree.",
  "titleEs": "Árbol de Navidad",
  "descriptionEs": "¡Un hermoso árbol de Navidad decorado! Colorea los adornos, las luces, la estrella en la punta y los regalos debajo de este festivo árbol navideño.",
  "category": "Holidays",
  "difficulty": 2,
  "tags": "christmas,tree,ornaments,decorations,holiday,star,presents,festive",
  "imageUrl": "/coloring-images/christmas_tree.png",
  "thumbnailUrl": "/coloring-images/christmas_tree.png",
  "featured": false
}'
)

SUCCESS=0
FAILED=0

# Add each painting
for painting in "${PAINTINGS[@]}"; do
    TITLE=$(echo "$painting" | jq -r '.title')
    TITLE_ES=$(echo "$painting" | jq -r '.titleEs')
    
    echo "➕ Adding: $TITLE / $TITLE_ES"
    
    RESPONSE=$(curl -s -X POST "$PROD_API/paintings" \
        -H "Content-Type: application/json" \
        -d "$painting" \
        -w "\n%{http_code}")
    
    HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
    
    if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "201" ]; then
        echo "   ✅ Success"
        ((SUCCESS++))
    else
        echo "   ❌ Failed (HTTP $HTTP_CODE)"
        ((FAILED++))
    fi
done

echo ""
echo "================================================"
echo "✨ COMPLETE!"
echo "   ✅ Successfully added: $SUCCESS paintings"
if [ $FAILED -gt 0 ]; then
    echo "   ❌ Failed: $FAILED paintings"
fi
echo "================================================"
echo ""
echo "🌐 View your site: https://painting-sand.vercel.app"
echo ""
echo "📋 Next step: Update sitemaps"
echo "   cd /Users/guym/Documents/d/paiting/frontend"
echo "   npm run generate-sitemap"

