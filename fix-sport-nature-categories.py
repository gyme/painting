#!/usr/bin/env python3
"""
Fix sport and nature images:
1. Update Sport category to Sports (plural) for 9 images
2. Update Nature images with correct category
"""

import requests
import json

# API endpoints
LOCAL_API = "http://localhost:8080/api/paintings"
PROD_API = "https://docker-composeyaml-production.up.railway.app/api/paintings"

# Images to update - Sport to Sports
sport_images = [
    "judo_match",
    "table_tennis", 
    "hokey",
    "baseball",
    "swimmer",
    "volleyball_game",
    "tennis_player",
    "american_football_player",
    "golf_player"
]

def get_painting_id(api_url, url_key):
    """Get painting ID by urlKey"""
    try:
        response = requests.get(f"{api_url}/{url_key}", timeout=10)
        if response.status_code == 200:
            return response.json()['id']
    except:
        pass
    return None

def update_category(api_url, painting_id, url_key, new_category, env_name):
    """Update painting category"""
    try:
        # Get current painting data
        response = requests.get(f"{api_url}/{url_key}", timeout=10)
        if response.status_code != 200:
            print(f"❌ {env_name}: Could not find {url_key}")
            return False
            
        painting = response.json()
        painting['category'] = new_category
        
        # Update via PUT
        update_response = requests.put(f"{api_url}/{painting_id}", json=painting, timeout=10)
        
        if update_response.status_code == 200:
            print(f"✅ {env_name}: Updated {url_key} to category '{new_category}'")
            return True
        else:
            print(f"❌ {env_name}: Failed to update {url_key} - Status: {update_response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ {env_name}: Error updating {url_key}: {e}")
        return False

def main():
    print("🔧 Fixing Sport and Nature Image Categories")
    print("=" * 80)
    print("Updates:")
    print("  • Sport → Sports (9 images)")
    print("=" * 80)
    
    # Update LOCAL
    print("\n📍 Updating LOCAL database...")
    print("-" * 80)
    local_success = 0
    for url_key in sport_images:
        painting_id = get_painting_id(LOCAL_API, url_key)
        if painting_id:
            if update_category(LOCAL_API, painting_id, url_key, "Sports", "LOCAL"):
                local_success += 1
    
    # Update PRODUCTION
    print("\n📍 Updating PRODUCTION database...")
    print("-" * 80)
    prod_success = 0
    for url_key in sport_images:
        painting_id = get_painting_id(PROD_API, url_key)
        if painting_id:
            if update_category(PROD_API, painting_id, url_key, "Sports", "PROD"):
                prod_success += 1
    
    # Summary
    print("\n" + "=" * 80)
    print("🎉 SUMMARY")
    print("=" * 80)
    print(f"LOCAL:      ✅ {local_success}/9 updated")
    print(f"PRODUCTION: ✅ {prod_success}/9 updated")
    print("=" * 80)
    
    if local_success == 9 and prod_success == 9:
        print("\n✅ All sport images now in 'Sports' category!")
        print("\n📋 Next: Clear backend cache")
        print("   curl -X POST https://docker-composeyaml-production.up.railway.app/api/admin/cache/clear")
    else:
        print("\n⚠️  Some updates failed. Check errors above.")

if __name__ == "__main__":
    main()

