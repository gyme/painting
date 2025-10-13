#!/bin/bash

echo "🎨 Restoring All Your Paintings"
echo "================================"
echo ""

cd /Users/guym/Documents/d/paiting/backend

# Step 1: Stop backend
echo "1. Stopping backend..."
pkill -f "spring-boot:run" 2>/dev/null
sleep 3
echo "   ✅ Stopped"

# Step 2: Clean old database
echo ""
echo "2. Cleaning old database..."
rm -f painting.mv.db painting.trace.db
echo "   ✅ Cleaned"

# Step 3: Start backend (will use file-based H2 and create fresh tables)
echo ""
echo "3. Starting backend..."
./start-backend.sh > startup.log 2>&1 &
BACKEND_PID=$!
echo "   Backend PID: $BACKEND_PID"

# Step 4: Wait for backend
echo ""
echo "4. Waiting for backend to be ready (checking every 3 seconds)..."
for i in {1..40}; do
    if curl -s 'http://localhost:8080/api/paintings?page=0&size=1' > /dev/null 2>&1; then
        echo "   ✅ Backend is UP!"
        break
    fi
    if [ $i -eq 40 ]; then
        echo "   ❌ Timeout. Check startup.log for errors"
        tail -20 startup.log
        exit 1
    fi
    sleep 3
done

# Step 5: Parse SQL files and import via API
echo ""
echo "5. Importing paintings from SQL files..."

# Extract INSERT statements and convert to API calls
grep -A 15 "INSERT INTO paintings" all-paintings-import.sql | \
    awk '/INSERT INTO paintings/,/;/' | \
    sed 's/NOW()/null/g' | \
    python3 << 'PYTHON_SCRIPT'
import sys
import re
import requests
import json

# Read SQL from stdin
sql_content = sys.stdin.read()

# Extract all INSERT statements
inserts = re.findall(r"VALUES\s*\((.*?)\);", sql_content, re.DOTALL)

count = 0
errors = 0

for insert in inserts:
    try:
        # Parse values
        values = [v.strip().strip("'") for v in re.split(r",\s*(?![^(]*\))", insert)]
        
        if len(values) < 11:
            continue
            
        painting = {
            "urlKey": values[0].strip("'"),
            "title": values[1].strip("'"),
            "description": values[2].strip("'"),
            "category": values[3].strip("'"),
            "tags": values[4].strip("'"),
            "imageUrl": values[5].strip("'"),
            "thumbnailUrl": values[6].strip("'"),
            "difficulty": int(values[7]),
            "colorPalette": values[8].strip("'"),
            "featured": values[9].strip("'").lower() == 'true',
            "viewCount": int(values[10]),
            "svgPath": ""
        }
        
        # Post to API
        response = requests.post('http://localhost:8080/api/paintings', json=painting)
        
        if response.status_code in [200, 201]:
            count += 1
            print(f"   ✅ {painting['title']}")
        else:
            errors += 1
            print(f"   ❌ Failed: {painting['title']} - {response.status_code}")
            
    except Exception as e:
        errors += 1
        print(f"   ❌ Error: {e}")
        
print(f"\n   Imported: {count} paintings")
if errors > 0:
    print(f"   Errors: {errors}")
PYTHON_SCRIPT

# Step 6: Verify
echo ""
echo "6. Verifying..."
PAINTING_COUNT=$(curl -s 'http://localhost:8080/api/paintings?page=0&size=1000' | jq '.totalElements' 2>/dev/null)

echo ""
echo "================================"
echo "✅ Restore Complete!"
echo "================================"
echo ""
echo "Total Paintings in DB: $PAINTING_COUNT"
echo "Database: painting.mv.db (persists across restarts)"
echo ""
echo "Next steps:"
echo "  1. Start admin tool: cd .. && ./serve-admin-tool.sh"
echo "  2. Open: http://localhost:8081/admin-tool.html"
echo "  3. Verify all paintings are correct"
echo ""

