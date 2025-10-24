#!/bin/bash

cd /Users/guym/Documents/d/paiting/frontend/public/coloring-images

echo "🌸 Converting flower images to WebP..."

flowers=(
  "rose"
  "sunflower"
  "lavender"
  "pansy"
  "calla_lily"
  "tulip"
  "iris"
  "cherry_blossom"
  "snapdragon"
  "amaryllis"
  "daffodil"
  "daisy"
)

for flower in "${flowers[@]}"; do
  if [ -f "${flower}.png" ]; then
    echo "Converting ${flower}.png..."
    cwebp -q 90 "${flower}.png" -o "${flower}.webp"
    echo "✅ ${flower}.webp created"
  else
    echo "❌ ${flower}.png not found"
  fi
done

echo ""
echo "✅ All flower images converted to WebP!"


