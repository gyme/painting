#!/bin/bash

# Quick helper script to submit a new painting to IndexNow
# Usage: ./submit-new-painting-indexnow.sh unicorn

if [ -z "$1" ]; then
  echo "❌ Error: Please provide a painting URL key"
  echo ""
  echo "Usage: ./submit-new-painting-indexnow.sh <url-key>"
  echo ""
  echo "Example:"
  echo "  ./submit-new-painting-indexnow.sh unicorn"
  echo ""
  echo "This will submit:"
  echo "  - https://painting-sand.vercel.app/painting/unicorn"
  echo "  - https://painting-sand.vercel.app/es/painting/unicorn"
  exit 1
fi

URL_KEY=$1
BASE_URL="https://painting-sand.vercel.app"

echo "🔔 Submitting painting to IndexNow..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎨 Painting: $URL_KEY"
echo ""

# Submit English version
echo "📤 Submitting English version..."
node submit-to-indexnow.js "$BASE_URL/painting/$URL_KEY"

echo ""

# Submit Spanish version
echo "📤 Submitting Spanish version..."
node submit-to-indexnow.js "$BASE_URL/es/painting/$URL_KEY"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Done! Both language versions submitted to IndexNow."

