#!/bin/bash

# Fix image paths for all inspiring people paintings
# The paths need to start with / to work with the frontend

API="https://docker-composeyaml-production.up.railway.app/api"

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

echo "🔧 Fixing image paths..."

for person in "${PEOPLE[@]}"; do
    echo "Processing: $person"
    
    # Get the painting
    DATA=$(curl -s "$API/paintings/$person")
    
    # Extract ID and fix paths
    ID=$(echo "$DATA" | python3 -c "import sys, json; print(json.load(sys.stdin)['id'])")
    
    # Update with corrected paths
    echo "$DATA" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if not data['imageUrl'].startswith('/'):
    data['imageUrl'] = '/' + data['imageUrl']
if not data['thumbnailUrl'].startswith('/'):
    data['thumbnailUrl'] = '/' + data['thumbnailUrl']
print(json.dumps(data))
" | curl -s -X PUT "$API/paintings/$ID" \
    -H "Content-Type: application/json" \
    -d @- > /dev/null
    
    echo "✅ Fixed: $person (ID: $ID)"
done

echo ""
echo "✨ All paths fixed!"



