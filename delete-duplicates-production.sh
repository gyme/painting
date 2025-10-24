#!/bin/bash

# Delete duplicate paintings from production
# These are old entries with underscores that were replaced by hyphen versions

API_URL="https://docker-composeyaml-production.up.railway.app/api/paintings"

echo "🗑️  Deleting duplicate paintings from production..."
echo "=========================================="

# Basketball Players duplicates (old underscore versions)
echo ""
echo "Deleting Basketball Players duplicates..."
for id in 169 170 171 172 173 174 175 176; do
  echo "Deleting ID $id..."
  curl -X DELETE "$API_URL/$id" -s -w "\n"
done

# K Pop Demon Hunters duplicates (old underscore versions)  
echo ""
echo "Deleting K Pop Demon Hunters duplicates..."
for id in 177 178 179 180 181; do
  echo "Deleting ID $id..."
  curl -X DELETE "$API_URL/$id" -s -w "\n"
done

echo ""
echo "=========================================="
echo "✅ All duplicates deleted!"
echo "=========================================="


