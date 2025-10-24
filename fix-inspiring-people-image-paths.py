#!/usr/bin/env python3
"""
Fix image paths for inspiring people - add leading slash
"""

import requests

API_URL = "https://docker-composeyaml-production.up.railway.app/api"

# All inspiring people URL keys
PEOPLE = [
    "leonardo-da-vinci",
    "albert-einstein",
    "marie-curie",
    "amelia-earhart",
    "neil-armstrong",
    "frida-kahlo",
    "nikola-tesla",
    "william-shakespeare",
    "ludwig-van-beethoven",
    "rosa-parks",
    "martin-luther-king-jr",
    "mahatma-gandhi",
    "harriet-tubman",
    "sally-ride",
    "ada-lovelace",
    "abraham-lincoln",
    "florence-nightingale",
    "galileo-galilei",
    "christopher-columbus"
]

def fix_painting(url_key):
    """Fix the image path for a painting"""
    try:
        # Get the painting
        response = requests.get(f"{API_URL}/paintings/{url_key}")
        if response.status_code != 200:
            print(f"❌ Failed to get {url_key}: HTTP {response.status_code}")
            return False
            
        painting = response.json()
        
        # Fix the image paths (add leading slash)
        if not painting['imageUrl'].startswith('/'):
            painting['imageUrl'] = '/' + painting['imageUrl']
        if not painting['thumbnailUrl'].startswith('/'):
            painting['thumbnailUrl'] = '/' + painting['thumbnailUrl']
        
        # Update the painting
        update_response = requests.put(
            f"{API_URL}/paintings/{painting['id']}",
            json=painting,
            headers={"Content-Type": "application/json"}
        )
        
        if update_response.status_code == 200:
            print(f"✅ Fixed: {url_key}")
            return True
        else:
            print(f"❌ Failed to update {url_key}: HTTP {update_response.status_code}")
            print(f"   Response: {update_response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error fixing {url_key}: {str(e)}")
        return False

def main():
    print("🔧 Fixing image paths for inspiring people...")
    print("=" * 60)
    
    success = 0
    failed = 0
    
    for person in PEOPLE:
        if fix_painting(person):
            success += 1
        else:
            failed += 1
    
    print("=" * 60)
    print(f"✅ Fixed: {success}")
    print(f"❌ Failed: {failed}")
    print()
    print("🎨 Image paths fixed! Refresh the website to see the images.")

if __name__ == "__main__":
    main()

