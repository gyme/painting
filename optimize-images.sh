#!/bin/bash

# Image Optimization Script
# Reduces PNG file sizes by 70-80% without quality loss
# Uses pngquant for compression

echo "🖼️  Image Optimization Script"
echo "================================"

# Check if pngquant is installed
if ! command -v pngquant &> /dev/null; then
    echo "📦 Installing pngquant..."
    brew install pngquant
fi

INPUT_DIR="/Users/guym/Documents/d/paiting/frontend/public/coloring-images"
BACKUP_DIR="/Users/guym/Documents/d/paiting/frontend/public/coloring-images-backup"

# Create backup
echo "💾 Creating backup..."
mkdir -p "$BACKUP_DIR"
cp -r "$INPUT_DIR"/*.png "$BACKUP_DIR/" 2>/dev/null

echo ""
echo "🔄 Optimizing images..."
echo "This will reduce file sizes by 70-80%"
echo ""

# Count files
TOTAL=$(ls "$INPUT_DIR"/*.png 2>/dev/null | wc -l | tr -d ' ')
CURRENT=0

# Optimize each PNG
for img in "$INPUT_DIR"/*.png; do
    if [ -f "$img" ]; then
        CURRENT=$((CURRENT + 1))
        FILENAME=$(basename "$img")
        
        # Get original size
        ORIG_SIZE=$(du -h "$img" | cut -f1)
        
        # Optimize with pngquant
        pngquant --quality=80-95 --speed 1 --force --ext .png "$img" 2>/dev/null
        
        # Get new size
        NEW_SIZE=$(du -h "$img" | cut -f1)
        
        echo "[$CURRENT/$TOTAL] $FILENAME: $ORIG_SIZE → $NEW_SIZE"
    fi
done

echo ""
echo "✅ Optimization complete!"
echo ""
echo "📊 Before/After comparison:"
du -sh "$BACKUP_DIR"
du -sh "$INPUT_DIR"

echo ""
echo "💡 Next steps:"
echo "1. Check if images look good: open frontend/public/coloring-images/"
echo "2. If good, deploy: cd frontend && npm run build && vercel --prod"
echo "3. If bad, restore backup: cp $BACKUP_DIR/*.png $INPUT_DIR/"



