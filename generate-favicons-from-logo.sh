#!/bin/bash

# Generate Favicons from Logo
# This script creates all required favicon sizes from the logo.png

set -e

LOGO="frontend/public/logo.png"
OUTPUT_DIR="frontend/public"

echo "🎨 Generating favicons from logo..."
echo ""

# Check if logo exists
if [ ! -f "$LOGO" ]; then
    echo "❌ Error: Logo not found at $LOGO"
    exit 1
fi

echo "✨ Creating favicon sizes..."

# Generate PNG favicons in different sizes
convert "$LOGO" -resize 16x16 -background none -flatten "$OUTPUT_DIR/favicon-16x16.png"
echo "✅ Created favicon-16x16.png"

convert "$LOGO" -resize 32x32 -background none -flatten "$OUTPUT_DIR/favicon-32x32.png"
echo "✅ Created favicon-32x32.png"

convert "$LOGO" -resize 48x48 -background none -flatten "$OUTPUT_DIR/favicon-48x48.png"
echo "✅ Created favicon-48x48.png"

convert "$LOGO" -resize 64x64 -background none -flatten "$OUTPUT_DIR/favicon-64x64.png"
echo "✅ Created favicon-64x64.png"

convert "$LOGO" -resize 128x128 -background none -flatten "$OUTPUT_DIR/favicon-128x128.png"
echo "✅ Created favicon-128x128.png"

convert "$LOGO" -resize 256x256 -background none -flatten "$OUTPUT_DIR/favicon-256x256.png"
echo "✅ Created favicon-256x256.png"

# Generate multi-size ICO file (for older browsers)
convert "$LOGO" -resize 16x16 -background none -flatten \
        "$LOGO" -resize 32x32 -background none -flatten \
        "$LOGO" -resize 48x48 -background none -flatten \
        "$OUTPUT_DIR/favicon.ico"
echo "✅ Created favicon.ico (multi-size)"

# Generate Apple Touch Icon (for iOS home screen)
convert "$LOGO" -resize 180x180 -background none -flatten "$OUTPUT_DIR/apple-touch-icon.png"
echo "✅ Created apple-touch-icon.png (180x180)"

# Generate SVG favicon (scalable, modern browsers)
# Copy the logo as SVG if it's already vector, or create a simple reference
# For now, we'll create a reference SVG that embeds the PNG
cat > "$OUTPUT_DIR/favicon.svg" << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <image href="/logo.png" x="0" y="0" width="512" height="512"/>
</svg>
EOF
echo "✅ Created favicon.svg"

echo ""
echo "🎉 All favicons generated successfully!"
echo ""
echo "Favicon files created:"
echo "  • favicon-16x16.png"
echo "  • favicon-32x32.png"
echo "  • favicon-48x48.png"
echo "  • favicon-64x64.png"
echo "  • favicon-128x128.png"
echo "  • favicon-256x256.png"
echo "  • favicon.ico (multi-size)"
echo "  • apple-touch-icon.png (180x180)"
echo "  • favicon.svg"
echo ""
echo "✨ Your colorful logo is now the favicon!"


