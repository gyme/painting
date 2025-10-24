#!/bin/bash

# Add all new paintings to LOCAL backend for testing
set -e

LOCAL_API="http://localhost:8080/api"

echo "🧪 Adding all new paintings to LOCAL backend for testing..."
echo "================================================"
echo ""

# Check if local backend is running
if ! curl -s "$LOCAL_API/paintings" > /dev/null 2>&1; then
    echo "❌ Error: Local backend not running on port 8080"
    echo ""
    echo "To start local backend:"
    echo "  cd /Users/guym/Documents/d/paiting/backend"
    echo "  bash start-backend.sh"
    echo ""
    exit 1
fi

echo "✅ Local backend is running"
echo ""

# Read the JSON file with all painting metadata
PAINTINGS_FILE="/Users/guym/Documents/d/paiting/tools/all_new_paintings.json"

if [ ! -f "$PAINTINGS_FILE" ]; then
    echo "❌ Error: Could not find paintings metadata file"
    exit 1
fi

SUCCESS=0
FAILED=0
SKIPPED=0

# Add each painting
cat "$PAINTINGS_FILE" | jq -c '.[]' | while read -r painting; do
    URL_KEY=$(echo "$painting" | jq -r '.key')
    TITLE_EN=$(echo "$painting" | jq -r '.title_en')
    TITLE_ES=$(echo "$painting" | jq -r '.title_es')
    DESC_EN=$(echo "$painting" | jq -r '.desc_en')
    DESC_ES=$(echo "$painting" | jq -r '.desc_es')
    CATEGORY=$(echo "$painting" | jq -r '.category')
    DIFFICULTY=$(echo "$painting" | jq -r '.diff')
    TAGS=$(echo "$painting" | jq -r '.tags')
    IMAGE_FILE=$(echo "$painting" | jq -r '.file')
    
    echo "➕ Adding: $TITLE_EN / $TITLE_ES"
    
    RESPONSE=$(curl -s -X POST "$LOCAL_API/paintings" \
        -H "Content-Type: application/json" \
        -d "{
          \"urlKey\": \"$URL_KEY\",
          \"title\": \"$TITLE_EN\",
          \"description\": \"$DESC_EN\",
          \"titleEs\": \"$TITLE_ES\",
          \"descriptionEs\": \"$DESC_ES\",
          \"category\": \"$CATEGORY\",
          \"difficulty\": $DIFFICULTY,
          \"tags\": \"$TAGS\",
          \"imageUrl\": \"/coloring-images/$IMAGE_FILE\",
          \"thumbnailUrl\": \"/coloring-images/$IMAGE_FILE\",
          \"featured\": false
        }" \
        -w "\n%{http_code}")
    
    HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
    
    if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "201" ]; then
        echo "   ✅ Success"
        ((SUCCESS++))
    elif [ "$HTTP_CODE" = "500" ]; then
        echo "   ⚠️  Already exists (skipped)"
        ((SKIPPED++))
    else
        echo "   ❌ Failed (HTTP $HTTP_CODE)"
        ((FAILED++))
    fi
done

echo ""
echo "================================================"
echo "✨ LOCAL TESTING SETUP COMPLETE!"
echo "   ✅ Successfully added: $SUCCESS paintings"
echo "   ⚠️  Already existed: $SKIPPED paintings"
if [ $FAILED -gt 0 ]; then
    echo "   ❌ Failed: $FAILED paintings"
fi
echo "================================================"
echo ""
echo "🚀 Next step: Start frontend to test"
echo "   cd /Users/guym/Documents/d/paiting/frontend"
echo "   npm run dev"
echo ""
echo "🌐 Then open: http://localhost:3000"


