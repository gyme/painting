#!/bin/bash

# Fix Spanish translations for ALL paintings
set -e

API_URL="http://localhost:8080/api"

echo "🔧 Fixing Spanish translations for ALL paintings..."
echo "================================================"
echo ""

# Counter
SUCCESS=0
FAILED=0

# Update from metadata file
if [ -f "all_new_paintings.json" ]; then
    echo "📝 Updating from metadata file..."
    cat all_new_paintings.json | jq -c '.[]' | while read painting; do
        URL_KEY=$(echo "$painting" | jq -r '.key')
        TITLE_ES=$(echo "$painting" | jq -r '.title_es')
        DESC_ES=$(echo "$painting" | jq -r '.desc_es')
        
        # Get painting from backend
        PAINTING_JSON=$(curl -s "$API_URL/paintings/$URL_KEY")
        ID=$(echo "$PAINTING_JSON" | jq -r '.id')
        
        if [ "$ID" != "null" ] && [ "$ID" != "" ]; then
            echo "Updating: $URL_KEY (ID: $ID)"
            
            # Update painting with Spanish translations
            UPDATED=$(echo "$PAINTING_JSON" | jq --arg titleEs "$TITLE_ES" --arg descEs "$DESC_ES" \
                '. + {titleEs: $titleEs, descriptionEs: $descEs}')
            
            # PUT request
            RESPONSE=$(curl -s -X PUT "$API_URL/paintings/$ID" \
                -H "Content-Type: application/json" \
                -d "$UPDATED")
            
            # Verify update
            UPDATED_TITLE_ES=$(echo "$RESPONSE" | jq -r '.titleEs')
            if [ "$UPDATED_TITLE_ES" != "null" ] && [ "$UPDATED_TITLE_ES" != "" ]; then
                echo "  ✅ Updated: $UPDATED_TITLE_ES"
                ((SUCCESS++))
            else
                echo "  ❌ Failed to update"
                ((FAILED++))
            fi
        fi
    done
fi

echo ""
echo "================================================"
echo "✨ Complete!"
echo "   ✅ Successfully updated: $SUCCESS"
echo "   ❌ Failed: $FAILED"
echo "================================================"

# Verify how many are still missing
MISSING=$(curl -s "$API_URL/paintings?size=200" | jq '[.content[] | select(.titleEs == null)] | length')
echo ""
echo "📊 Still missing Spanish: $MISSING paintings"

if [ "$MISSING" -gt 0 ]; then
    echo ""
    echo "⚠️  Some paintings still missing translations:"
    curl -s "$API_URL/paintings?size=200" | jq -r '.content[] | select(.titleEs == null) | "  - \(.urlKey)"' | head -10
fi


