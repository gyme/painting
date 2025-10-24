#!/usr/bin/env python3
"""
Fix production paintings:
1. Fix Easter Bunny preview
2. Move karate, basketball-player, soccer-player to Sports category
"""

import requests
import json

PROD_API = "https://docker-composeyaml-production.up.railway.app/api"

def get_painting(url_key):
    """Get a painting by URL key"""
    try:
        response = requests.get(f"{PROD_API}/paintings/{url_key}", timeout=10)
        if response.status_code == 200:
            return response.json()
        return None
    except:
        return None

def update_painting(painting_id, updates):
    """Update a painting"""
    try:
        response = requests.put(
            f"{PROD_API}/paintings/{painting_id}",
            json=updates,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        return response.status_code in [200, 201]
    except:
        return False

def main():
    print("🔧 Fixing Production Paintings")
    print("=" * 60)
    print()
    
    # 1. Fix Easter Bunny preview
    print("🐰 Fixing Easter Bunny preview...")
    easter_bunny = get_painting("easter-bunny")
    if not easter_bunny:
        easter_bunny = get_painting("easter_bunny")
    
    if easter_bunny:
        print(f"   Found: {easter_bunny['title']}")
        print(f"   Current image: {easter_bunny.get('imageUrl', 'N/A')}")
        
        # Update with correct image path
        easter_bunny['imageUrl'] = '/coloring-images/easter_bunny.png'
        easter_bunny['thumbnailUrl'] = '/coloring-images/easter_bunny.png'
        
        if update_painting(easter_bunny['id'], easter_bunny):
            print(f"   ✅ Fixed Easter Bunny image")
        else:
            print(f"   ❌ Failed to update Easter Bunny")
    else:
        print("   ⚠️  Easter Bunny not found")
    
    print()
    
    # 2. Move sports paintings to Sports category
    sports_paintings = [
        ('karate', 'Karate'),
        ('basketball-player', 'Basketball Player'),
        ('soccer-player', 'Soccer Player')
    ]
    
    print("⚽ Moving paintings to Sports category...")
    moved = 0
    
    for url_key, name in sports_paintings:
        painting = get_painting(url_key)
        if not painting:
            # Try with underscore
            painting = get_painting(url_key.replace('-', '_'))
        
        if painting:
            print(f"   📝 {name}")
            print(f"      Current category: {painting['category']}")
            
            if painting['category'] != 'Sports':
                painting['category'] = 'Sports'
                
                if update_painting(painting['id'], painting):
                    print(f"      ✅ Moved to Sports")
                    moved += 1
                else:
                    print(f"      ❌ Failed to update")
            else:
                print(f"      ⏭️  Already in Sports")
        else:
            print(f"   ❌ {name} not found")
    
    print()
    print("=" * 60)
    print(f"✅ Moved {moved} paintings to Sports category")
    print()
    
    # Verify categories
    print("📊 Verifying categories...")
    try:
        response = requests.get(f"{PROD_API}/paintings/categories", timeout=10)
        categories = response.json()
        print("Current categories:")
        for cat in categories:
            print(f"  - {cat}")
        
        if "Italian Brainrot" in categories:
            print()
            print("🎉 Italian Brainrot is live!")
    except:
        pass
    
    print()
    print("🌐 Check your site: https://painting-sand.vercel.app")

if __name__ == "__main__":
    main()





