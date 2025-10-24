#!/bin/bash

# Better conversion for nature images - preserve more detail for coloring

echo "🎨 Converting Nature Images with Better Detail"
echo "=============================================="

INPUT_DIR="/Users/guym/Documents/d/paiting/frontend/public/coloring-images"
cd "$INPUT_DIR"

# Restore from backup and try better conversion
IMAGES=("lake" "mountains" "forest")

for img_name in "${IMAGES[@]}"; do
    BACKUP="${img_name}_original_backup.png"
    OUTPUT="$img_name.png"
    
    if [ -f "$BACKUP" ]; then
        echo "🔄 Processing: $img_name with better algorithm..."
        
        # Multi-step process for better line art:
        # 1. Resize to good resolution
        # 2. Convert to grayscale
        # 3. Apply slight blur to reduce noise
        # 4. Edge detection with Canny-like effect
        # 5. Clean up and invert
        magick "$BACKUP" \
            -resize 1200x1800 \
            -colorspace Gray \
            -blur 0x0.5 \
            -canny 0x1+10%+30% \
            -morphology Close Octagon:1 \
            -negate \
            "$OUTPUT"
        
        if [ -f "$OUTPUT" ]; then
            # Check file size - should be reasonable (50KB-500KB)
            SIZE=$(stat -f%z "$OUTPUT" 2>/dev/null || stat -c%s "$OUTPUT" 2>/dev/null)
            SIZE_KB=$((SIZE / 1024))
            
            echo "  ✅ Converted (${SIZE_KB}KB)"
            
            # Regenerate WebP
            cwebp -q 90 -m 6 "$OUTPUT" -o "${img_name}.webp" 2>/dev/null
            echo "  ✅ WebP created"
            echo ""
        else
            echo "  ❌ Failed"
            echo ""
        fi
    else
        echo "⚠️  Backup not found: $BACKUP"
        echo ""
    fi
done

echo "=============================================="
echo "✅ Conversion Complete!"
echo "=============================================="
echo ""
echo "Check the images - they should have more detail now."

