#!/bin/bash

# Submit Inspiring People URLs to IndexNow
# This notifies Bing and other search engines about the new pages

echo "🔔 Submitting Inspiring People to IndexNow..."
echo ""

# Base URL
BASE_URL="https://www.mycolor.fun"

# Array of URL keys for inspiring people
PEOPLE=(
    "leonardo-da-vinci"
    "albert-einstein"
    "marie-curie"
    "amelia-earhart"
    "neil-armstrong"
    "frida-kahlo"
    "nikola-tesla"
    "william-shakespeare"
    "ludwig-van-beethoven"
    "rosa-parks"
    "martin-luther-king-jr"
    "mahatma-gandhi"
    "harriet-tubman"
    "sally-ride"
    "ada-lovelace"
    "abraham-lincoln"
    "florence-nightingale"
    "galileo-galilei"
    "christopher-columbus"
)

# Submit each person (English and Spanish)
for person in "${PEOPLE[@]}"; do
    # English version
    node submit-to-indexnow.js "$BASE_URL/painting/$person"
    
    # Spanish version
    node submit-to-indexnow.js "$BASE_URL/es/painting/$person"
done

# Submit category page
node submit-to-indexnow.js "$BASE_URL/category/inspiring-people"
node submit-to-indexnow.js "$BASE_URL/es/category/inspiring-people"

echo ""
echo "✨ All inspiring people submitted to IndexNow!"
echo "📊 Total URLs submitted: $((${#PEOPLE[@]} * 2 + 2))"

