#!/usr/bin/env python3
"""
Fix all inspiring people image paths - ensure they start with /
"""

import requests

API_URL = "https://docker-composeyaml-production.up.railway.app/api"

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

def fix_image_paths(url_key):
    """Fix image paths to start with /"""
    try:
        response = requests.get(f"{API_URL}/paintings/{url_key}")
        if response.status_code != 200:
            print(f"❌ Failed to get {url_key}")
            return False
            
        painting = response.json()
        
        # Check if paths need fixing
        needs_update = False
        
        if painting['imageUrl'] and not painting['imageUrl'].startswith('/'):
            painting['imageUrl'] = '/' + painting['imageUrl']
            needs_update = True
            
        if painting['thumbnailUrl'] and not painting['thumbnailUrl'].startswith('/'):
            painting['thumbnailUrl'] = '/' + painting['thumbnailUrl']
            needs_update = True
        
        if needs_update:
            update_response = requests.put(
                f"{API_URL}/paintings/{painting['id']}",
                json=painting,
                headers={"Content-Type": "application/json"}
            )
            
            if update_response.status_code == 200:
                print(f"✅ Fixed: {url_key} → {painting['imageUrl']}")
                return True
            else:
                print(f"❌ Failed to update {url_key}")
                return False
        else:
            print(f"✓ Already OK: {url_key}")
            return True
            
    except Exception as e:
        print(f"❌ Error: {url_key} - {str(e)}")
        return False

def main():
    print("🔧 Fixing image paths for all inspiring people...")
    print("=" * 60)
    
    for person in PEOPLE:
        fix_image_paths(person)
    
    print("=" * 60)
    print("✨ Done! All image paths now start with /")

if __name__ == "__main__":
    main()

