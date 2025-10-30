#!/bin/bash

# Convert celebrity PNG images to WebP format for better performance
cd frontend/public/coloring-images

echo "🎬 Converting Celebrity Images to WebP..."
echo "=========================================="

celebrities=(
  "beyonce"
  "zendaya"
  "taylor_swift"
  "ariana_grande"
  "dwayne_johnson"
  "brad_pitt"
  "leonardo_dicaprio"
  "robert_downey_jr"
  "tom_cruise"
  "adele"
  "chris_evans"
  "arnold_schwarzeneegger"
  "jim_carrey"
  "hugh_jackman"
  "sylvester_stallone"
  "morgan_freeman"
  "will_smith"
  "cameron_diaz"
  "george_clooney"
  "harrison_ford"
  "keanu_reeves"
  "angelina_jolie"
  "jackie_chan"
  "adam_sandler"
  "rihana"
  "justin_bieber"
  "robert_de_niro"
)

count=0
for celebrity in "${celebrities[@]}"; do
  if [ -f "${celebrity}.png" ]; then
    if command -v magick &> /dev/null; then
      magick "${celebrity}.png" -quality 85 "${celebrity}.webp"
      echo "✅ Converted ${celebrity}.png to WebP"
      ((count++))
    else
      echo "⚠️  ImageMagick not found, skipping ${celebrity}.png"
    fi
  else
    echo "❌ ${celebrity}.png not found"
  fi
done

echo "=========================================="
echo "✅ Converted $count celebrity images to WebP"
echo "💾 Total savings: WebP images are typically 25-35% smaller!"



