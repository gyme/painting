#!/bin/bash

# Convert nature photographs to coloring book line art
# These images were color photos and need to be converted to black & white line drawings

echo "🎨 Converting Nature Images to Line Art for Coloring"
echo "===================================================="

INPUT_DIR="/Users/guym/Documents/d/paiting/frontend/public/coloring-images"

# Check if ImageMagick is installed
if ! command -v magick &> /dev/null; then
    echo "📦 Installing ImageMagick..."
    brew install imagemagick
fi

cd "$INPUT_DIR"

# List of nature images to convert
IMAGES=(
    "lake"
    "mountains"
    "forest"
)

echo ""
echo "Converting 3 nature images to coloring book style..."
echo ""

for img_name in "${IMAGES[@]}"; do
    INPUT="$img_name.png"
    OUTPUT="${img_name}_lineart.png"
    
    if [ -f "$INPUT" ]; then
        echo "🔄 Processing: $img_name"
        
        # Create backup
        cp "$INPUT" "${img_name}_original_backup.png"
        
        # Method 1: Edge detection with dilation for thicker lines
        magick "$INPUT" \
            -resize 1000x1500 \
            -colorspace Gray \
            -edge 1 \
            -negate \
            -threshold 85% \
            -morphology Dilate Octagon \
            -morphology Dilate Octagon \
            -negate \
            "$OUTPUT"
        
        if [ -f "$OUTPUT" ]; then
            # Replace original with line art version
            mv "$OUTPUT" "$INPUT"
            
            # Regenerate WebP
            cwebp -q 90 -m 6 "$INPUT" -o "${img_name}.webp" 2>/dev/null
            
            echo "  ✅ Converted to line art"
            echo "  📦 Backup saved as: ${img_name}_original_backup.png"
            echo ""
        else
            echo "  ❌ Conversion failed"
            echo ""
        fi
    else
        echo "⚠️  File not found: $INPUT"
        echo ""
    fi
done

echo "===================================================="
echo "✅ Conversion Complete!"
echo "===================================================="
echo ""
echo "Nature images are now black & white line art suitable for coloring."
echo ""
echo "📋 Next steps:"
echo "1. Check the images visually"
echo "2. If satisfied, deploy to production"
echo "3. Original color photos backed up as *_original_backup.png"

