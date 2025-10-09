#!/bin/bash

# Database Sync Script
# Syncs paintings with the remote production database

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
REMOTE_API="${REMOTE_API_URL:-https://kids-painting-backend-production.up.railway.app/api}"
IMAGES_DIR="../frontend/public/coloring-images"

echo -e "${BLUE}🔄 Database Sync Tool${NC}"
echo "=================================================================================="
echo ""

# Check if remote API is accessible
echo -e "${BLUE}🌐 Checking remote API...${NC}"
if curl -s -f "${REMOTE_API}/paintings?page=0&size=1" > /dev/null 2>&1; then
    echo -e "${GREEN}   ✅ Remote API is accessible${NC}"
else
    echo -e "${RED}   ❌ Cannot connect to remote API${NC}"
    echo "   URL: ${REMOTE_API}"
    echo ""
    echo -e "${YELLOW}💡 Manual sync option:${NC}"
    echo "   1. Connect to your Railway database"
    echo "   2. Run: backend/sync-database.sql"
    echo ""
    exit 1
fi

echo ""

# Get remote paintings count
echo -e "${BLUE}📊 Getting remote database info...${NC}"
REMOTE_COUNT=$(curl -s "${REMOTE_API}/paintings?page=0&size=1" | grep -o '"totalElements":[0-9]*' | grep -o '[0-9]*' || echo "0")
echo "   Remote database has: ${REMOTE_COUNT} paintings"

# Count local images
PNG_COUNT=$(ls -1 ${IMAGES_DIR}/*.png 2>/dev/null | wc -l | tr -d ' ')
JPG_COUNT=$(ls -1 ${IMAGES_DIR}/*.jpg 2>/dev/null | wc -l | tr -d ' ')
TOTAL_LOCAL=$((PNG_COUNT + JPG_COUNT))
echo "   Local images: ${TOTAL_LOCAL} (${PNG_COUNT} PNG + ${JPG_COUNT} JPG)"

echo ""

# Add Owl Mandala if it doesn't exist
echo -e "${BLUE}🦉 Checking for Owl Mandala...${NC}"
OWL_EXISTS=$(curl -s "${REMOTE_API}/paintings/owl-mandala" 2>&1 | grep -c "Owl Mandala" || echo "0")

if [ "$OWL_EXISTS" -eq "0" ]; then
    echo "   Adding Owl Mandala..."
    curl -s -X POST "${REMOTE_API}/paintings" \
      -H "Content-Type: application/json" \
      -d '{
        "urlKey": "owl-mandala",
        "title": "Owl Mandala",
        "description": "A wise owl mandala with intricate patterns perfect for relaxation!",
        "category": "Mandalas",
        "tags": "owl,mandala,patterns,intricate,meditation,relaxing,coloring,kids,adults,wisdom",
        "imageUrl": "/coloring-images/owl_mandala.png",
        "thumbnailUrl": "/coloring-images/owl_mandala.png",
        "difficulty": 3,
        "colorPalette": "[\"#8B4513\",\"#D2691E\",\"#DEB887\",\"#F4A460\",\"#CD853F\"]",
        "featured": true,
        "viewCount": 0
      }' > /dev/null 2>&1
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}   ✅ Owl Mandala added${NC}"
    else
        echo -e "${YELLOW}   ⚠️  Owl Mandala might already exist${NC}"
    fi
else
    echo -e "${GREEN}   ✅ Owl Mandala already exists${NC}"
fi

# Remove elephant and lion mandalas (images were deleted)
echo ""
echo -e "${BLUE}🗑️  Removing obsolete mandalas...${NC}"
for mandala in "elephant-mandala" "lion-mandala"; do
    curl -s -X DELETE "${REMOTE_API}/paintings/${mandala}" > /dev/null 2>&1
    echo "   Removed: ${mandala} (image not available)"
done

echo ""
echo "=================================================================================="
echo -e "${GREEN}✅ Sync complete!${NC}"
echo ""
echo "Current status:"
echo "  - Owl Mandala: ✅ Synced"
echo "  - Elephant Mandala: ❌ Removed (no image)"
echo "  - Lion Mandala: ❌ Removed (no image)"
echo ""

