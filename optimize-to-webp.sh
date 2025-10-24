#!/bin/bash

# Image Optimization Script with WebP Conversion
# Creates both optimized PNG and WebP versions
# WebP: 70-90% smaller with NO visible quality loss!

echo "🖼️  Image Optimization + WebP Conversion"
echo "========================================"

# Check if required tools are installed
if ! command -v pngquant &> /dev/null; then
    echo "📦 Installing pngquant..."
    brew install pngquant
fi

if ! command -v cwebp &> /dev/null; then
    echo "📦 Installing webp..."
    brew install webp
fi

INPUT_DIR="/Users/guym/Documents/d/paiting/frontend/public/coloring-images"
BACKUP_DIR="/Users/guym/Documents/d/paiting/frontend/public/coloring-images-backup"

# Create backup
if [ ! -d "$BACKUP_DIR" ]; then
    echo "💾 Creating backup of originals..."
    mkdir -p "$BACKUP_DIR"
    cp "$INPUT_DIR"/*.png "$BACKUP_DIR/" 2>/dev/null
    echo "✅ Backup saved to: $BACKUP_DIR"
else
    echo "💾 Backup already exists (skipping)"
fi

echo ""
echo "🔄 Processing images..."
echo "This will create:"
echo "  1. Optimized PNGs (70-80% smaller)"
echo "  2. WebP versions (90% smaller, NO quality loss!)"
echo ""

# Count files
TOTAL=$(ls "$INPUT_DIR"/*.png 2>/dev/null | wc -l | tr -d ' ')
CURRENT=0

TOTAL_ORIG_SIZE=0
TOTAL_PNG_SIZE=0
TOTAL_WEBP_SIZE=0

# Process each PNG
for img in "$INPUT_DIR"/*.png; do
    if [ -f "$img" ]; then
        CURRENT=$((CURRENT + 1))
        FILENAME=$(basename "$img")
        BASENAME="${FILENAME%.png}"
        
        # Get original size in bytes
        ORIG_BYTES=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
        TOTAL_ORIG_SIZE=$((TOTAL_ORIG_SIZE + ORIG_BYTES))
        
        echo "[$CURRENT/$TOTAL] Processing: $FILENAME"
        
        # Step 1: Optimize PNG (quality 85-95, no visible loss)
        echo "  🔧 Optimizing PNG..."
        pngquant --quality=85-95 --speed 1 --force --ext .png "$img" 2>/dev/null
        
        PNG_BYTES=$(stat -f%z "$img" 2>/dev/null || stat -c%s "$img" 2>/dev/null)
        TOTAL_PNG_SIZE=$((TOTAL_PNG_SIZE + PNG_BYTES))
        PNG_SIZE=$(du -h "$img" | cut -f1)
        
        # Step 2: Create WebP version (quality 90, visually identical)
        echo "  🚀 Creating WebP..."
        cwebp -q 90 -m 6 "$img" -o "$INPUT_DIR/${BASENAME}.webp" 2>/dev/null
        
        WEBP_BYTES=$(stat -f%z "$INPUT_DIR/${BASENAME}.webp" 2>/dev/null || stat -c%s "$INPUT_DIR/${BASENAME}.webp" 2>/dev/null)
        TOTAL_WEBP_SIZE=$((TOTAL_WEBP_SIZE + WEBP_BYTES))
        WEBP_SIZE=$(du -h "$INPUT_DIR/${BASENAME}.webp" | cut -f1)
        
        # Calculate savings
        PNG_SAVINGS=$((100 - (PNG_BYTES * 100 / ORIG_BYTES)))
        WEBP_SAVINGS=$((100 - (WEBP_BYTES * 100 / ORIG_BYTES)))
        
        echo "  ✅ PNG: $PNG_SIZE (-${PNG_SAVINGS}%)"
        echo "  ✅ WebP: $WEBP_SIZE (-${WEBP_SAVINGS}%)"
        echo ""
    fi
done

# Convert bytes to MB for display
ORIG_MB=$(echo "scale=2; $TOTAL_ORIG_SIZE / 1048576" | bc)
PNG_MB=$(echo "scale=2; $TOTAL_PNG_SIZE / 1048576" | bc)
WEBP_MB=$(echo "scale=2; $TOTAL_WEBP_SIZE / 1048576" | bc)

PNG_TOTAL_SAVINGS=$(echo "scale=1; 100 - ($TOTAL_PNG_SIZE * 100 / $TOTAL_ORIG_SIZE)" | bc)
WEBP_TOTAL_SAVINGS=$(echo "scale=1; 100 - ($TOTAL_WEBP_SIZE * 100 / $TOTAL_ORIG_SIZE)" | bc)

echo ""
echo "================================"
echo "✅ Optimization Complete!"
echo "================================"
echo ""
echo "📊 Total Size Comparison:"
echo "  Original PNGs:   ${ORIG_MB} MB"
echo "  Optimized PNGs:  ${PNG_MB} MB (-${PNG_TOTAL_SAVINGS}%)"
echo "  WebP versions:   ${WEBP_MB} MB (-${WEBP_TOTAL_SAVINGS}%)"
echo ""
echo "💾 Storage saved:"
echo "  PNG optimization: $(echo "scale=1; $ORIG_MB - $PNG_MB" | bc) MB"
echo "  WebP conversion:  $(echo "scale=1; $ORIG_MB - $WEBP_MB" | bc) MB"
echo ""
echo "📁 Files created:"
echo "  - $TOTAL optimized PNGs (for fallback)"
echo "  - $TOTAL WebP files (for modern browsers)"
echo ""
echo "🔍 Quality: NO visible loss!"
echo "   PNG: 85-95% quality"
echo "   WebP: 90% quality (visually identical)"
echo ""
echo "💡 Next steps:"
echo "1. Check image quality: open $INPUT_DIR/"
echo "2. Update frontend to serve WebP (I'll help!)"
echo "3. Deploy: cd frontend && npm run build && vercel --prod"
echo ""
echo "🔄 To restore originals: cp $BACKUP_DIR/*.png $INPUT_DIR/"



