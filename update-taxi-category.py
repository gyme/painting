#!/usr/bin/env python3
import requests
import json

backend_url = "https://docker-composeyaml-production.up.railway.app"

# First, get the current taxi painting
print("🔍 Fetching taxi painting...")
response = requests.get(f"{backend_url}/api/paintings/taxi")
taxi = response.json()

print(f"Current category: {taxi.get('category')}")
print(f"Current description: {taxi.get('description')}")

# Update the painting with correct category
painting_id = taxi['id']
print(f"\n🚕 Updating taxi (ID: {painting_id}) to Vehicles category...")

updated_data = {
    "urlKey": "taxi",
    "title": "Taxi",
    "titleEs": "Taxi",
    "description": "A wonderful taxi coloring page for kids who love vehicles!",
    "descriptionEs": "¡Una hermosa página para colorear de taxi! Perfecta para niños que aman los vehículos.",
    "category": "Vehicles",
    "tags": "taxi,vehicles,transportation,city,car,coloring,kids",
    "imageUrl": "/coloring-images/taxi.png",
    "thumbnailUrl": "/coloring-images/taxi.png",
    "difficulty": 2,
    "featured": False,
    "colorPalette": taxi.get('colorPalette'),
    "svgPath": taxi.get('svgPath', ''),
    "viewCount": taxi.get('viewCount', 0)
}

response = requests.put(
    f"{backend_url}/api/paintings/{painting_id}",
    json=updated_data,
    headers={"Content-Type": "application/json"}
)

if response.status_code == 200:
    result = response.json()
    print(f"✅ Successfully updated!")
    print(f"New category: {result.get('category')}")
    print(f"New description: {result.get('description')}")
    print(f"Updated at: {result.get('updatedAt')}")
else:
    print(f"❌ Error: {response.status_code}")
    print(response.text)

# Verify the change
print("\n🔍 Verifying update...")
verify_response = requests.get(f"{backend_url}/api/paintings/taxi")
verified = verify_response.json()
print(f"Verified category: {verified.get('category')}")

# Clear cache by calling the categories endpoint
print("\n🔄 Triggering category cache refresh...")
requests.get(f"{backend_url}/api/categories")
print("✅ Cache refresh triggered!")


