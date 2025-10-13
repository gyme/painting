#!/bin/bash

# Sync Local Paintings to Railway Production Database
set -e

echo "🚀 Syncing paintings from local to Railway production..."
echo ""

# Check if local backend is running
if ! curl -s http://localhost:8080/api/paintings > /dev/null 2>&1; then
    echo "❌ Error: Local backend not running on port 8080"
    echo "Please start your backend first: cd backend && ./start-backend.sh"
    exit 1
fi

# Fetch all paintings from local
echo "📊 Fetching paintings from local database..."
LOCAL_DATA=$(curl -s "http://localhost:8080/api/paintings?page=0&size=200")
COUNT=$(echo "$LOCAL_DATA" | jq '.content | length')

echo "✅ Found $COUNT paintings in local database"
echo ""

# Generate SQL file
SQL_FILE="/tmp/paintings_sync_$(date +%Y%m%d_%H%M%S).sql"

echo "📝 Generating SQL statements..."

cat > "$SQL_FILE" << 'SQLHEADER'
-- Paintings Sync to Railway Production
-- This will INSERT new paintings or UPDATE existing ones

SQLHEADER

# Generate INSERT ON CONFLICT UPDATE for each painting
echo "$LOCAL_DATA" | jq -r '.content[] | 
"INSERT INTO paintings (id, url_key, title, description, category, tags, image_url, thumbnail_url, difficulty, color_palette, svg_path, featured, view_count, created_at, updated_at)
VALUES (
  \(.id),
  '\''\(.urlKey)'\'',
  '\''\(.title | gsub("'"'"'"; "'"'"''"'"'"))'\'',
  '\''\(.description | gsub("'"'"'"; "'"'"''"'"'"))'\'',
  '\''\(.category)'\'',
  '\''\(.tags)'\'',
  '\''\(.imageUrl)'\'',
  '\''\(.thumbnailUrl)'\'',
  \(.difficulty),
  '\''\(.colorPalette)'\'',
  \(if .svgPath then "'\''" + .svgPath + "'\''" else "NULL" end),
  \(.featured),
  \(.viewCount),
  NOW(),
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  url_key = EXCLUDED.url_key,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  tags = EXCLUDED.tags,
  image_url = EXCLUDED.image_url,
  thumbnail_url = EXCLUDED.thumbnail_url,
  difficulty = EXCLUDED.difficulty,
  color_palette = EXCLUDED.color_palette,
  svg_path = EXCLUDED.svg_path,
  featured = EXCLUDED.featured,
  updated_at = NOW();
"' >> "$SQL_FILE"

echo "✅ SQL file generated: $SQL_FILE"
echo ""

# Show file info
echo "📋 SQL file contains:"
wc -l "$SQL_FILE"
echo ""

# Execute on Railway
echo "🚂 Connecting to Railway and executing SQL..."
echo ""

cd /Users/guym/Documents/d/paiting/backend

# Execute the SQL file on Railway
railway run psql -f "$SQL_FILE"

echo ""
echo "✅ Sync complete!"
echo ""
echo "📊 Verifying..."

# Count paintings in production
PROD_COUNT=$(curl -s "https://docker-composeyaml-production.up.railway.app/api/paintings?page=0&size=200" | jq '.totalElements')

echo "   Local paintings: $COUNT"
echo "   Production paintings: $PROD_COUNT"
echo ""

if [ "$COUNT" -eq "$PROD_COUNT" ]; then
    echo "🎉 Success! All paintings synced to production!"
else
    echo "⚠️  Warning: Counts don't match. Please verify manually."
fi

echo ""
echo "🌐 View your site: https://painting-sand.vercel.app"

