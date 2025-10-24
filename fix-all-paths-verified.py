#!/usr/bin/env python3
"""
Fix all inspiring people image paths - add leading slash and verify
"""

import requests
import json
import time

API_URL = "https://docker-composeyaml-production.up.railway.app/api"

PEOPLE = [
    "leonardo-da-vinci", "albert-einstein", "marie-curie", "amelia-earhart",
    "neil-armstrong", "frida-kahlo", "nikola-tesla", "william-shakespeare",
    "ludwig-van-beethoven", "rosa-parks", "martin-luther-king-jr", "mahatma-gandhi",
    "harriet-tubman", "sally-ride", "ada-lovelace", "abraham-lincoln",
    "florence-nightingale", "galileo-galilei", "christopher-columbus"
]

def fix_painting(url_key):
    """Fix image paths for a single painting"""
    try:
        # Get painting
        response = requests.get(f"{API_URL}/paintings/{url_key}")
        if response.status_code != 200:
            print(f"❌ Failed to get {url_key}")
            return False
        
        data = response.json()
        original_image = data['imageUrl']
        
        # Check if needs fixing
        if data['imageUrl'].startswith('/'):
            print(f"✓ Already OK: {url_key}")
            return True
        
        # Fix paths
        data['imageUrl'] = '/' + data['imageUrl']
        data['thumbnailUrl'] = '/' + data['thumbnailUrl']
        
        # Update
        update_response = requests.put(
            f"{API_URL}/paintings/{data['id']}",
            json=data,
            headers={'Content-Type': 'application/json'}
        )
        
        if update_response.status_code == 200:
            result = update_response.json()
            if result['imageUrl'].startswith('/'):
                print(f"✅ Fixed: {url_key}")
                print(f"   {original_image} → {result['imageUrl']}")
                return True
            else:
                print(f"⚠️  Updated but path still wrong: {url_key}")
                return False
        else:
            print(f"❌ Update failed for {url_key}: HTTP {update_response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Error fixing {url_key}: {str(e)}")
        return False

def main():
    print("🔧 Fixing all inspiring people image paths...")
    print("=" * 70)
    
    success = 0
    failed = 0
    
    for person in PEOPLE:
        if fix_painting(person):
            success += 1
        else:
            failed += 1
        time.sleep(0.2)  # Small delay to avoid overwhelming the API
    
    print("=" * 70)
    print(f"✅ Success: {success}/{len(PEOPLE)}")
    print(f"❌ Failed: {failed}/{len(PEOPLE)}")
    print()
    print("✨ All images should now load correctly!")

if __name__ == "__main__":
    main()

