#!/bin/bash

PROD_API="https://docker-composeyaml-production.up.railway.app/api"

echo "🎨 Moving mandalas to Mandalas category in production..."

# Get all mandala paintings and update their category
curl -s "$PROD_API/paintings?size=200" | jq -r '.content[] | select(.urlKey | contains("mandala")) | "\(.id) \(.urlKey)"' | while read id urlKey; do
  echo "Moving $urlKey (ID: $id) to Mandalas..."
  
  PAINTING=$(curl -s "$PROD_API/paintings/$urlKey")
  UPDATED=$(echo "$PAINTING" | jq '. + {category: "Mandalas"}')
  
  curl -s -X PUT "$PROD_API/paintings/$id" \
    -H "Content-Type: application/json" \
    -d "$UPDATED" | jq -r '.category' && echo "  ✅ Moved to Mandalas"
done

echo ""
echo "✅ Done!"
