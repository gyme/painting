#!/bin/bash

# Refresh cache for all inspiring people by accessing each painting
# This triggers incrementViewCount which updates the cache

API="https://docker-composeyaml-production.up.railway.app/api"

PEOPLE=(
    "leonardo-da-vinci" "albert-einstein" "marie-curie" "amelia-earhart"
    "neil-armstrong" "frida-kahlo" "nikola-tesla" "william-shakespeare"
    "ludwig-van-beethoven" "rosa-parks" "martin-luther-king-jr" "mahatma-gandhi"
    "harriet-tubman" "sally-ride" "ada-lovelace" "abraham-lincoln"
    "florence-nightingale" "galileo-galilei" "christopher-columbus"
)

echo "🔄 Refreshing cache for all inspiring people..."
echo ""

for person in "${PEOPLE[@]}"; do
    # Access the painting (this increments view count and refreshes cache)
    result=$(curl -s "$API/paintings/$person" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    imageUrl = data.get('imageUrl', '')
    if imageUrl.startswith('/'):
        print(f'✅ {data[\"title\"]}: {imageUrl}')
    else:
        print(f'❌ {data[\"title\"]}: {imageUrl} (needs refresh)')
except:
    print('❌ Error')
")
    echo "$result"
    sleep 0.1
done

echo ""
echo "✨ Cache refresh complete!"



