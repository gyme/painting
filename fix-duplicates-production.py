#!/usr/bin/env python3
"""
Find and remove duplicate paintings in production
Keep the one with more views
"""

import requests
from collections import defaultdict

PROD_API = "https://docker-composeyaml-production.up.railway.app/api"

def get_all_paintings():
    """Get all paintings from production"""
    paintings = []
    page = 0
    while True:
        try:
            response = requests.get(f"{PROD_API}/paintings?page={page}&size=100", timeout=10)
            if response.status_code == 200:
                data = response.json()
                paintings.extend(data['content'])
                if data['last']:
                    break
                page += 1
            else:
                break
        except:
            break
    return paintings

def delete_painting(painting_id):
    """Delete a painting by ID"""
    try:
        response = requests.delete(f"{PROD_API}/paintings/{painting_id}", timeout=10)
        return response.status_code in [200, 204]
    except:
        return False

def main():
    print("🔍 Finding duplicate paintings in production...")
    print("=" * 60)
    print()
    
    # Get all paintings
    paintings = get_all_paintings()
    print(f"📊 Found {len(paintings)} total paintings")
    print()
    
    # Group by urlKey to find duplicates
    url_key_map = defaultdict(list)
    for painting in paintings:
        url_key_map[painting['urlKey']].append(painting)
    
    # Find duplicates
    duplicates = {k: v for k, v in url_key_map.items() if len(v) > 1}
    
    if not duplicates:
        print("✅ No duplicates found!")
        return
    
    print(f"⚠️  Found {len(duplicates)} duplicate entries:")
    print()
    
    deleted_count = 0
    
    for url_key, paintings_list in duplicates.items():
        print(f"🔄 {url_key}")
        print(f"   Found {len(paintings_list)} copies:")
        
        # Sort by view count (keep the one with most views)
        paintings_list.sort(key=lambda p: p.get('viewCount', 0), reverse=True)
        
        # Show details
        for i, painting in enumerate(paintings_list):
            status = "KEEP" if i == 0 else "DELETE"
            print(f"   [{status}] ID: {painting['id']:3d} | "
                  f"Views: {painting.get('viewCount', 0):3d} | "
                  f"Category: {painting['category']:15s} | "
                  f"Created: {painting.get('createdAt', 'N/A')[:10]}")
        
        # Delete all but the first (highest views)
        for painting in paintings_list[1:]:
            if delete_painting(painting['id']):
                print(f"   ✅ Deleted ID {painting['id']}")
                deleted_count += 1
            else:
                print(f"   ❌ Failed to delete ID {painting['id']}")
        
        print()
    
    print("=" * 60)
    print(f"✅ Removed {deleted_count} duplicate paintings")
    print()
    
    # Verify final count
    final_paintings = get_all_paintings()
    print(f"📊 Final count: {len(final_paintings)} paintings")
    print()
    print("🌐 Check your site: https://painting-sand.vercel.app")

if __name__ == "__main__":
    main()





