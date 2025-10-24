#!/bin/bash

# Add Italian Brainrot paintings via REST API
set -e

echo "🇮🇹 Adding Italian Brainrot Paintings via API..."
echo "================================================="
echo ""

API_URL="http://localhost:8080/api"

# Check if backend is running
if ! curl -s "$API_URL/paintings" > /dev/null 2>&1; then
    echo "❌ Error: Backend not running on port 8080"
    exit 1
fi

echo "✅ Backend is running"
echo ""

# Function to add a painting
add_painting() {
    local url_key="$1"
    local title="$2"
    local description="$3"
    local title_es="$4"
    local description_es="$5"
    local color_palette="$6"
    local featured="$7"
    
    echo "  ➕ Adding: $title"
    
    HTTP_CODE=$(curl -s -w "%{http_code}" -o /tmp/painting_response.json \
        -X POST "$API_URL/paintings" \
        -H "Content-Type: application/json" \
        -d "{
            \"urlKey\": \"$url_key\",
            \"title\": \"$title\",
            \"description\": \"$description\",
            \"titleEs\": \"$title_es\",
            \"descriptionEs\": \"$description_es\",
            \"category\": \"Italian Brainrot\",
            \"tags\": \"italian,meme,brainrot,fun,viral,trending,humor,kids,teen\",
            \"imageUrl\": \"/coloring-images/${url_key//-/_}.png\",
            \"thumbnailUrl\": \"/coloring-images/${url_key//-/_}.png\",
            \"difficulty\": 2,
            \"colorPalette\": \"$color_palette\",
            \"featured\": $featured,
            \"viewCount\": 0
        }")
    
    if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "201" ]; then
        echo "     ✅ Success"
    else
        echo "     ❌ Failed (HTTP $HTTP_CODE)"
        cat /tmp/painting_response.json
        echo ""
    fi
}

echo "🎨 Adding 8 Italian Brainrot paintings..."
echo ""

# 1. Brr Brr Patapim
add_painting "brr-brr-patapim" \
    "Brr Brr Patapim" \
    "A fun Italian meme phrase - brr brr patapim! Perfect for creative coloring!" \
    "¡Brr Brr Patapim!" \
    "¡Una divertida frase meme italiana - brr brr patapim! ¡Perfecta para colorear creativamente!" \
    "[\"#FF6B6B\",\"#4ECDC4\",\"#45B7D1\",\"#FFA07A\",\"#98D8C8\"]" \
    "true"

# 2. Cappuccino Assassino
add_painting "cappuccino-assassino" \
    "Cappuccino Assassino" \
    "The legendary cappuccino assassino! A funny Italian meme for creative kids!" \
    "Cappuccino Asesino" \
    "¡El legendario cappuccino assassino! ¡Un divertido meme italiano para niños creativos!" \
    "[\"#6F4E37\",\"#D2691E\",\"#F5DEB3\",\"#FFE4C4\",\"#8B4513\"]" \
    "true"

# 3. Capuchina Ballerina
add_painting "capuchina-ballerina" \
    "Capuchina Ballerina" \
    "A dancing capuchina ballerina! A whimsical Italian meme character!" \
    "Capuchina Bailarina" \
    "¡Una bailarina capuchina danzante! ¡Un caprichoso personaje de meme italiano!" \
    "[\"#FF69B4\",\"#FFB6C1\",\"#FF1493\",\"#DDA0DD\",\"#FFC0CB\"]" \
    "false"

# 4. Chimpanzini Bananini
add_painting "chimpanzini-bananini" \
    "Chimpanzini Bananini" \
    "Chimpanzini bananini! A funny Italian rhyme meme about monkeys and bananas!" \
    "¡Chimpancitos Bananitas!" \
    "¡Chimpanzini bananini! ¡Una divertida rima de meme italiano sobre monos y plátanos!" \
    "[\"#8B4513\",\"#FFD700\",\"#FFA500\",\"#FFFF00\",\"#D2691E\"]" \
    "false"

# 5. Lirili Larila
add_painting "lirili-larila" \
    "Lirili Larila" \
    "Lirili larila! A catchy Italian meme phrase that everyone loves!" \
    "¡Lirili Larila!" \
    "¡Lirili larila! ¡Una pegadiza frase de meme italiano que todos aman!" \
    "[\"#87CEEB\",\"#4682B4\",\"#5F9EA0\",\"#6495ED\",\"#B0E0E6\"]" \
    "false"

# 6. Thung Thung Thung Sahur
add_painting "thung-thung-thung-sahur" \
    "Thung Thung Thung Sahur" \
    "Thung thung thung sahur! A rhythmic Italian meme that makes everyone laugh!" \
    "¡Thung Thung Thung Sahur!" \
    "¡Thung thung thung sahur! ¡Un meme italiano rítmico que hace reír a todos!" \
    "[\"#FF6347\",\"#FF4500\",\"#FFA500\",\"#FFD700\",\"#FF8C00\"]" \
    "false"

# 7. Tralalero Tralala
add_painting "tralalero-tralala" \
    "Tralalero Tralala" \
    "Tralalero tralala! A musical Italian meme phrase full of joy and fun!" \
    "¡Tralalero Tralala!" \
    "¡Tralalero tralala! ¡Una frase musical de meme italiano llena de alegría y diversión!" \
    "[\"#9370DB\",\"#8B008B\",\"#BA55D3\",\"#DDA0DD\",\"#EE82EE\"]" \
    "false"

# 8. Udin Din Din Dun
add_painting "udin-din-din-dun" \
    "Udin Din Din Dun" \
    "Udin din din dun! A catchy Italian meme beat that gets stuck in your head!" \
    "¡Udin Din Din Dun!" \
    "¡Udin din din dun! ¡Un pegadizo ritmo de meme italiano que se queda en tu cabeza!" \
    "[\"#32CD32\",\"#228B22\",\"#90EE90\",\"#98FB98\",\"#00FF00\"]" \
    "false"

echo ""
echo "✅ Done! Verifying..."
echo ""

# Verify the new category
echo "📊 Current categories:"
curl -s "$API_URL/paintings/categories" | jq -r '.[]' | sed 's/^/  - /'

echo ""
echo "🎉 Success! Italian Brainrot category added!"
echo ""
echo "🌐 View at: http://localhost:3000"
echo "   (Make sure your frontend is running)"





