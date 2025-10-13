#!/bin/bash

# Image Optimization Script
# This script converts PNG images to WebP format for better performance
# WebP typically provides 25-35% better compression than PNG

echo "🖼️  Starting image optimization..."
echo ""

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "❌ cwebp is not installed!"
    echo "Install it with:"
    echo "  macOS: brew install webp"
    echo "  Linux: sudo apt-get install webp"
    exit 1
fi

# Navigate to images directory
cd public/coloring-images || exit 1

echo "📊 Before optimization:"
du -sh . | awk '{print "Total size: " $1}'
echo ""

# Create WebP versions
count=0
for img in *.png; do
    if [ -f "$img" ]; then
        # Skip if WebP already exists and is newer
        if [ -f "${img%.png}.webp" ] && [ "${img%.png}.webp" -nt "$img" ]; then
            echo "⏭️  Skipping $img (WebP is up to date)"
            continue
        fi
        
        echo "🔄 Converting $img..."
        cwebp -q 85 -m 6 "$img" -o "${img%.png}.webp" 2>/dev/null
        
        if [ $? -eq 0 ]; then
            ((count++))
            original_size=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
            webp_size=$(stat -f%z "${img%.png}.webp" 2>/dev/null || stat -c%s "${img%.png}.webp" 2>/dev/null)
            savings=$((100 - (webp_size * 100 / original_size)))
            echo "   ✅ Saved ${savings}%"
        else
            echo "   ❌ Failed"
        fi
    fi
done

echo ""
echo "✨ Optimization complete!"
echo "   Converted $count images to WebP"
echo ""
echo "📊 After optimization:"
du -sh . | awk '{print "Total size: " $1}'
echo ""
echo "💡 Next steps:"
echo "   1. Update image paths to use WebP with PNG fallback"
echo "   2. Commit the new WebP files"
echo "   3. Deploy to see performance improvement"

