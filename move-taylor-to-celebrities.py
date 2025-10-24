#!/usr/bin/env python3
"""
Move Taylor Swift to celebrities category
"""

import requests
import sys

# API endpoint - Production
API_URL = "https://docker-composeyaml-production.up.railway.app/api"

def get_painting_by_search(search_term):
    """Get a painting by searching for it"""
    try:
        response = requests.get(f"{API_URL}/paintings/search?keyword={search_term}")
        if response.status_code == 200:
            data = response.json()
            if data['content'] and len(data['content']) > 0:
                # Find exact match by title
                for painting in data['content']:
                    if painting['title'].lower() == search_term.lower():
                        return painting
                # Return first result if no exact match
                return data['content'][0]
            return None
        else:
            print(f"❌ Failed to search paintings: HTTP {response.status_code}")
            print(f"Response: {response.text}")
            return None
    except Exception as e:
        print(f"❌ Error searching paintings: {e}")
        return None

def update_painting_category(painting_id, new_category):
    """Update a painting's category"""
    try:
        # Get the full painting data first
        response = requests.get(f"{API_URL}/paintings/{painting_id}")
        if response.status_code != 200:
            print(f"❌ Failed to fetch painting details: HTTP {response.status_code}")
            return False
        
        painting_data = response.json()
        
        # Update the category
        painting_data['category'] = new_category
        
        # Send the update
        response = requests.put(
            f"{API_URL}/paintings/{painting_id}",
            json=painting_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            print(f"✅ Successfully updated painting {painting_id} to category: {new_category}")
            return True
        else:
            print(f"❌ Failed to update painting: HTTP {response.status_code}")
            print(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error updating painting: {e}")
        return False

def main():
    print("🎤 Moving Taylor Swift to Celebrities Category")
    print("=" * 60)
    
    # Get Taylor Swift's painting
    print("\n📖 Searching for Taylor Swift painting...")
    painting = get_painting_by_search("Taylor Swift")
    
    if not painting:
        print("❌ Could not find Taylor Swift painting")
        sys.exit(1)
    
    print(f"✅ Found painting: {painting['title']}")
    print(f"   Current category: {painting['category']}")
    print(f"   ID: {painting['id']}")
    
    # Update category to celebrities
    print(f"\n🔄 Updating category to 'celebrities'...")
    success = update_painting_category(painting['id'], 'celebrities')
    
    if success:
        print("\n" + "=" * 60)
        print("✅ Taylor Swift successfully moved to celebrities category!")
        print("=" * 60)
    else:
        print("\n" + "=" * 60)
        print("❌ Failed to move Taylor Swift")
        print("=" * 60)
        sys.exit(1)

if __name__ == "__main__":
    main()

