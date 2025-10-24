#!/bin/bash

# Move taxi from Animals to Vehicles category

BACKEND_URL="https://docker-composeyaml-production.up.railway.app"
PAINTING_ID=30

echo "🚕 Moving Taxi to Vehicles category..."

# Update the painting
curl -X PUT "${BACKEND_URL}/api/paintings/${PAINTING_ID}" \
  -H "Content-Type: application/json" \
  -d '{
    "urlKey": "taxi",
    "title": "Taxi",
    "titleEs": "Taxi",
    "description": "A wonderful taxi coloring page for kids who love vehicles!",
    "descriptionEs": "¡Una hermosa página para colorear de taxi! Perfecta para niños que aman los vehículos.",
    "category": "Vehicles",
    "tags": "taxi,vehicles,transportation,city,car,coloring,kids",
    "imageUrl": "/coloring-images/taxi.png",
    "thumbnailUrl": "/coloring-images/taxi.png",
    "difficulty": 2
  }'

echo ""
echo "✅ Taxi moved to Vehicles category!"


