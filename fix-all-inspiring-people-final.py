#!/usr/bin/env python3
"""
Fix all inspiring people - ensure imageUrl starts with / AND create any missing file aliases
"""

import requests
import json

API_URL = "https://docker-composeyaml-production.up.railway.app/api"

# Map URL keys to actual filenames (for cases where they differ)
PEOPLE = {
    "leonardo-da-vinci": "leonardo_da_vinci",  # Already fixed with alias
    "albert-einstein": "albert_einstein",
    "marie-curie": "marie_curie",
    "amelia-earhart": "amelia_earhart",
    "neil-armstrong": "neil_armstrong",
    "frida-kahlo": "frida_kahlo",
    "nikola-tesla": "nikola_tesla",
    "william-shakespeare": "william_shakespeare",
    "ludwig-van-beethoven": "ludwig_van_beethoven",
    "rosa-parks": "rosa_parks",
    "martin-luther-king-jr": "martin_luther_king_jr.",  # Note the double dot
    "mahatma-gandhi": "mahatma_gandhi",
    "harriet-tubman": "harriet_tubman",
    "sally-ride": "sally_ride",
    "ada-lovelace": "ada_lovelace",
    "abraham-lincoln": "abraham_lincoln",
    "florence-nightingale": "florence_nighingale",  # Note: "nighingale" not "nightingale"
    "galileo-galilei": "galileo_galilei",
    "christopher-columbus": "christopher_columbus"
}

def fix_painting(url_key, filename):
    """Update painting to use correct path with leading slash"""
    try:
        response = requests.get(f"{API_URL}/paintings/{url_key}")
        if response.status_code != 200:
            print(f"❌ Failed to get {url_key}")
            return False
        
        data = response.json()
        
        # Set correct path with leading slash
        new_path = f"/coloring-images/{filename}.png"
        
        if data['imageUrl'] == new_path:
            print(f"✓ Already OK: {url_key}")
            return True
        
        data['imageUrl'] = new_path
        data['thumbnailUrl'] = new_path
        
        # Update
        update_response = requests.put(
            f"{API_URL}/paintings/{data['id']}",
            json=data,
            headers={'Content-Type': 'application/json'}
        )
        
        if update_response.status_code == 200:
            print(f"✅ Fixed: {url_key} → {new_path}")
            return True
        else:
            print(f"❌ Update failed for {url_key}")
            return False
            
    except Exception as e:
        print(f"❌ Error: {url_key} - {str(e)}")
        return False

def main():
    print("🔧 Fixing all inspiring people with correct paths...")
    print("=" * 70)
    
    success = 0
    for url_key, filename in PEOPLE.items():
        if fix_painting(url_key, filename):
            success += 1
    
    print("=" * 70)
    print(f"✅ Fixed: {success}/{len(PEOPLE)}")
    print()
    print("✨ All paths updated! Images should load correctly now.")

if __name__ == "__main__":
    main()



