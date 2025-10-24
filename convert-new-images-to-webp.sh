#!/bin/bash

# Convert new sport and nature images to WebP format
# Sport: 9 images
# Nature: 3 images

echo "🖼️  Converting New Sport & Nature Images to WebP"
echo "================================================="

# Check if webp is installed
if ! command -v cwebp &> /dev/null; then
    echo "📦 Installing webp..."
    brew install webp
fi

INPUT_DIR="/Users/guym/Documents/d/paiting/frontend/public/coloring-images"

# List of new images to convert
NEW_IMAGES=(
    # Sport (9)
    "judo_match"
    "table_tennis"
    "hokey"
    "baseball"
    "swimmer"
    "volleyball_game"
    "tennis_player"
    "american_football_player"
    "golf_player"
    # Nature (3)
    "lake"
    "mountains"
    "forest"
)

echo ""
echo "Processing ${#NEW_IMAGES[@]} new images..."
echo ""

SUCCESS=0
FAILED=0

for img_name in "${NEW_IMAGES[@]}"; do
    PNG_FILE="$INPUT_DIR/${img_name}.png"
    WEBP_FILE="$INPUT_DIR/${img_name}.webp"
    
    if [ -f "$PNG_FILE" ]; then
        echo "🔄 Converting: ${img_name}.png"
        
        # Get original size
        ORIG_SIZE=$(du -h "$PNG_FILE" | cut -f1)
        
        # Convert to WebP (quality 90, visually identical)
        cwebp -q 90 -m 6 "$PNG_FILE" -o "$WEBP_FILE" 2>/dev/null
        
        if [ -f "$WEBP_FILE" ]; then
            WEBP_SIZE=$(du -h "$WEBP_FILE" | cut -f1)
            
            # Calculate savings
            ORIG_BYTES=$(stat -f%z "$PNG_FILE" 2>/dev/null || stat -c%s "$PNG_FILE" 2>/dev/null)
            WEBP_BYTES=$(stat -f%z "$WEBP_FILE" 2>/dev/null || stat -c%s "$WEBP_FILE" 2>/dev/null)
            SAVINGS=$((100 - (WEBP_BYTES * 100 / ORIG_BYTES)))
            
            echo "  ✅ PNG: $ORIG_SIZE → WebP: $WEBP_SIZE (-${SAVINGS}%)"
            SUCCESS=$((SUCCESS + 1))
        else
            echo "  ❌ Failed to create WebP"
            FAILED=$((FAILED + 1))
        fi
    else
        echo "⚠️  File not found: ${img_name}.png"
        FAILED=$((FAILED + 1))
    fi
    echo ""
done

echo "================================================="
echo "✅ Conversion Complete!"
echo "================================================="
echo "Success: $SUCCESS images converted"
echo "Failed: $FAILED images"
echo ""
echo "💡 WebP files are ready for production!"
echo "   Modern browsers will load these automatically."

