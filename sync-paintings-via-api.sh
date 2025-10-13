#!/bin/bash

# Sync paintings to production via REST API
set -e

echo "🚀 Syncing paintings from local to production via API..."
echo ""

LOCAL_API="http://localhost:8080/api"
PROD_API="https://docker-composeyaml-production.up.railway.app/api"

# Check if local backend is running
if ! curl -s "$LOCAL_API/paintings" > /dev/null 2>&1; then
    echo "❌ Error: Local backend not running on port 8080"
    exit 1
fi

# Fetch all local paintings
echo "📊 Fetching paintings from local database..."
LOCAL_PAINTINGS=$(curl -s "$LOCAL_API/paintings?page=0&size=200" | jq '.content')
LOCAL_COUNT=$(echo "$LOCAL_PAINTINGS" | jq 'length')

echo "✅ Found $LOCAL_COUNT paintings in local database"
echo ""

# Fetch production paintings to see what's missing
echo "📊 Fetching paintings from production..."
PROD_PAINTINGS=$(curl -s "$PROD_API/paintings?page=0&size=200" | jq '.content')
PROD_COUNT=$(echo "$PROD_PAINTINGS" | jq 'length')

echo "✅ Found $PROD_COUNT paintings in production"
echo ""

# Find missing paintings
echo "🔍 Finding paintings to sync..."
ADDED=0
UPDATED=0

echo "$LOCAL_PAINTINGS" | jq -c '.[]' | while read -r painting; do
    ID=$(echo "$painting" | jq -r '.id')
    URL_KEY=$(echo "$painting" | jq -r '.urlKey')
    TITLE=$(echo "$painting" | jq -r '.title')
    
    # Check if painting exists in production
    PROD_PAINTING=$(echo "$PROD_PAINTINGS" | jq ".[] | select(.id == $ID)")
    
    if [ -z "$PROD_PAINTING" ]; then
        echo "  ➕ Adding: $TITLE (ID: $ID, Key: $URL_KEY)"
        
        # POST new painting to production
        RESPONSE=$(curl -s -X POST "$PROD_API/paintings" \
            -H "Content-Type: application/json" \
            -d "$painting" \
            -w "\n%{http_code}")
        
        HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
        
        if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "201" ]; then
            echo "     ✅ Added successfully"
            ((ADDED++)) || true
        else
            echo "     ❌ Failed (HTTP $HTTP_CODE)"
        fi
    fi
done

echo ""
echo "✅ Sync complete!"
echo ""
echo "📊 Summary:"
echo "   Local paintings: $LOCAL_COUNT"
echo "   Production before: $PROD_COUNT"
echo "   New paintings added: $ADDED"
echo ""

# Verify final count
FINAL_COUNT=$(curl -s "$PROD_API/paintings?page=0&size=200" | jq '.totalElements')
echo "   Production now: $FINAL_COUNT"
echo ""

if [ "$LOCAL_COUNT" -eq "$FINAL_COUNT" ]; then
    echo "🎉 Success! All paintings synced!"
else
    echo "⚠️  Note: Counts still differ. This might be normal if some IDs were skipped."
fi

echo ""
echo "🌐 View your site: https://painting-sand.vercel.app"

