#!/bin/bash

# Populate Database Script
# This script helps you add more paintings to the database via the REST API

echo "🎨 Kids Painting Database Populator"
echo "===================================="
echo ""

# Check if backend is running
if ! curl -s http://localhost:8080/api/paintings/categories > /dev/null 2>&1; then
    echo "❌ Backend is not running!"
    echo "Please start the backend first:"
    echo "  cd backend && ./mvnw spring-boot:run"
    exit 1
fi

echo "✅ Backend is running!"
echo ""

# Sample painting to add
cat > /tmp/new-painting.json << 'EOF'
{
  "urlKey": "example-painting",
  "title": "Example Painting",
  "description": "This is an example painting you can customize!",
  "category": "Animals",
  "tags": "example,test,sample",
  "imageUrl": "https://via.placeholder.com/600x450/FFB6C1/000000?text=Example",
  "thumbnailUrl": "https://via.placeholder.com/400x300/FFB6C1/000000?text=Example",
  "difficulty": 1,
  "colorPalette": "[\"#FFB6C1\",\"#87CEEB\",\"#90EE90\",\"#FFD700\"]",
  "svgPath": "",
  "featured": false
}
EOF

echo "📄 Sample painting JSON created at /tmp/new-painting.json"
echo ""
echo "To add this painting to the database, run:"
echo ""
echo "curl -X POST http://localhost:8080/api/paintings \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d @/tmp/new-painting.json"
echo ""
echo "Or modify /tmp/new-painting.json and run the above command!"
echo ""

# Offer to add it now
read -p "Would you like to add this sample painting now? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Adding painting..."
    response=$(curl -s -w "\n%{http_code}" -X POST http://localhost:8080/api/paintings \
      -H 'Content-Type: application/json' \
      -d @/tmp/new-painting.json)
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | head -n-1)
    
    if [ "$http_code" = "201" ]; then
        echo "✅ Painting added successfully!"
        echo "$body" | python3 -m json.tool 2>/dev/null || echo "$body"
    else
        echo "❌ Failed to add painting (HTTP $http_code)"
        echo "$body"
    fi
fi

echo ""
echo "📊 Current database statistics:"
echo ""

# Get counts
total=$(curl -s http://localhost:8080/api/paintings?size=1 | python3 -c "import sys, json; print(json.load(sys.stdin)['totalElements'])" 2>/dev/null || echo "?")
echo "Total paintings: $total"

# Get categories
echo "Categories:"
curl -s http://localhost:8080/api/paintings/categories | python3 -m json.tool 2>/dev/null || echo "Unable to fetch"

echo ""
echo "🎉 Done! Visit http://localhost:3000 to see your paintings!"
