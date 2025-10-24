#!/bin/bash

# Fix all inspiring people image paths with proper leading slash

API="https://docker-composeyaml-production.up.railway.app/api"

echo "🔧 Fixing all inspiring people image paths..."

# IDs 439-457
for id in {439..457}; do
  echo "Fixing ID $id..."
  
  # Get painting data
  DATA=$(curl -s "$API/paintings/$id")
  
  # Update using Python to properly handle JSON and add leading slash
  echo "$DATA" | python3 -c "
import sys, json, requests

data = json.load(sys.stdin)

# Add leading slash if missing
if not data['imageUrl'].startswith('/'):
    data['imageUrl'] = '/' + data['imageUrl']
if not data['thumbnailUrl'].startswith('/'):
    data['thumbnailUrl'] = '/' + data['thumbnailUrl']

# Update
response = requests.put(
    '$API/paintings/' + str(data['id']),
    json=data,
    headers={'Content-Type': 'application/json'}
)

if response.status_code == 200:
    print(f'✅ Updated ID {data[\"id\"]}: {data[\"imageUrl\"]}')
else:
    print(f'❌ Failed ID {data[\"id\"]}: HTTP {response.status_code}')
"
done

echo ""
echo "✨ All paths fixed!"

