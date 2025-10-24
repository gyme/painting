#!/usr/bin/env python3
"""
Update category name from 'inspiring-people' to 'inspiring people'
This matches the pattern of other categories like 'fairy tales', 'italian brainrot', etc.
"""

import requests

API_URL = "https://docker-composeyaml-production.up.railway.app/api"

# All inspiring people URL keys (IDs 439-457)
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

def update_painting_category(url_key):
    """Update the category field for a painting"""
    try:
        # Get the painting
        response = requests.get(f"{API_URL}/paintings/{url_key}")
        if response.status_code != 200:
            print(f"❌ Failed to get {url_key}: HTTP {response.status_code}")
            return False
            
        painting = response.json()
        
        # Check current category
        if painting['category'] == 'inspiring-people':
            # Update to 'inspiring people' (with space, lowercase)
            painting['category'] = 'inspiring people'
            
            # Update the painting
            update_response = requests.put(
                f"{API_URL}/paintings/{painting['id']}",
                json=painting,
                headers={"Content-Type": "application/json"}
            )
            
            if update_response.status_code == 200:
                print(f"✅ Updated: {url_key} (ID: {painting['id']})")
                return True
            else:
                print(f"❌ Failed to update {url_key}: HTTP {update_response.status_code}")
                return False
        else:
            print(f"⚠️  {url_key} already has category: {painting['category']}")
            return True
            
    except Exception as e:
        print(f"❌ Error updating {url_key}: {str(e)}")
        return False

def main():
    print("🔧 Updating category name from 'inspiring-people' to 'inspiring people'")
    print("=" * 70)
    
    success = 0
    failed = 0
    
    for person in PEOPLE:
        if update_painting_category(person):
            success += 1
        else:
            failed += 1
    
    print("=" * 70)
    print(f"✅ Updated: {success}")
    print(f"❌ Failed: {failed}")
    print()
    print("✨ Category name updated!")
    print()
    print("📝 Note: URLs will automatically work with the new name:")
    print("   - /category/inspiring-people → still works")
    print("   - /category/inspiring_people → still works")
    print("   Both convert to 'inspiring people' for the API call")

if __name__ == "__main__":
    main()

