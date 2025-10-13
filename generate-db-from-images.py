#!/usr/bin/env python3
"""
Generate database from actual images in the coloring-images directory.
This ensures the database matches what images actually exist.
"""

import os
import requests
import json
from pathlib import Path

# Paths
IMAGES_DIR = "/Users/guym/Documents/d/paiting/frontend/public/coloring-images"
API_URL = "http://localhost:8080/api/paintings"

# Category detection based on filename
def detect_category(filename):
    filename_lower = filename.lower()
    
    if any(word in filename_lower for word in ['mandala']):
        return 'Animals'  # Mandalas go in Animals for now
    elif any(word in filename_lower for word in ['car', 'truck', 'bus', 'train', 'vehicle', 'taxi', 'police_car', 'fire_truck', 'sport_car']):
        return 'Vehicles'
    elif any(word in filename_lower for word in ['tree', 'flower', 'sun_flower', 'beach', 'river', 'nature', 'bonsai']):
        return 'Nature'
    elif any(word in filename_lower for word in ['fairy', 'wizard', 'wizzard', 'unicorn', 'dragon', 'princess', 'queen', 'castle', 'witch', 'magic']):
        return 'Fantasy'
    elif any(word in filename_lower for word in ['bear', 'cat', 'dog', 'elephant', 'lion', 'tiger', 'giraffe', 'rhino', 'fox', 'bird', 'owl', 'animal', 'pig', 'hamster', 'bat', 'scarecrow', 'squirrel', 'koala', 'kuala']):
        return 'Animals'
    elif any(word in filename_lower for word in ['pikachu', 'stitch', 'mickey', 'minnie', 'elsa', 'anna', 'belle', 'ariel', 'olaf', 'spider', 'character']):
        return 'Characters'
    elif any(word in filename_lower for word in ['chef', 'police', 'soccer', 'student', 'karate', 'drummer', 'basketball', 'astronaut', 'toy_builder', 'builder']):
        return 'Characters'
    else:
        return 'Characters'  # Default

# Generate nice title from filename
def generate_title(filename):
    # Remove extension
    name = os.path.splitext(filename)[0]
    
    # Replace underscores with spaces
    name = name.replace('_', ' ')
    
    # Capitalize each word
    words = name.split()
    title = ' '.join(word.capitalize() for word in words)
    
    return title

# Generate description
def generate_description(title, category):
    descriptions = {
        'Animals': f"A beautiful {title.lower()} coloring page! Perfect for kids who love animals.",
        'Vehicles': f"An exciting {title.lower()} ready for coloring! Great for kids who love vehicles.",
        'Nature': f"A peaceful {title.lower()} coloring page. Bring nature to life with colors!",
        'Fantasy': f"A magical {title.lower()} from a fantasy world! Let your imagination soar.",
        'Characters': f"Color this amazing {title.lower()}! Perfect for creative kids."
    }
    return descriptions.get(category, f"A fun {title.lower()} coloring page for kids!")

# Generate URL key
def generate_url_key(filename):
    name = os.path.splitext(filename)[0]
    return name.replace('_', '-').lower()

# Estimate difficulty
def estimate_difficulty(category, filename):
    filename_lower = filename.lower()
    
    if 'mandala' in filename_lower:
        return 3  # Mandalas are complex
    elif any(word in filename_lower for word in ['cute', 'simple', 'little', 'baby']):
        return 1  # Simple/cute images
    elif category in ['Vehicles', 'Nature']:
        return 2  # Medium complexity
    else:
        return 2  # Default medium

# Color palettes by category
COLOR_PALETTES = {
    'Animals': '["#FF6B6B","#4ECDC4","#45B7D1","#FFA07A","#98D8C8"]',
    'Vehicles': '["#FF6347","#4169E1","#32CD32","#FFD700","#FF8C00"]',
    'Nature': '["#228B22","#90EE90","#87CEEB","#FFD700","#8B4513"]',
    'Fantasy': '["#FF69B4","#DDA0DD","#87CEEB","#FFD700","#F0E68C"]',
    'Characters': '["#FF6B9D","#C44569","#F8B500","#4834DF","#6F1E51"]'
}

def main():
    print("🎨 Generating Database from Images")
    print("=" * 60)
    print()
    
    # Check if backend is running
    try:
        response = requests.get(f"{API_URL}?page=0&size=1", timeout=5)
        if response.status_code != 200:
            print("❌ Backend is not responding. Please start it first.")
            print("   Run: cd backend && ./start-backend.sh")
            return
    except:
        print("❌ Cannot connect to backend at http://localhost:8080")
        print("   Please start the backend first.")
        return
    
    print("✅ Backend is running\n")
    
    # Get all image files
    image_files = []
    for ext in ['*.png', '*.jpg', '*.jpeg']:
        image_files.extend(Path(IMAGES_DIR).glob(ext))
    
    # Filter out backup files
    image_files = [f for f in image_files if not any(x in f.name for x in ['.backup', 'backup-', '-orig'])]
    
    print(f"Found {len(image_files)} images in {IMAGES_DIR}\n")
    
    # Clear existing data
    print("1. Clearing existing paintings...")
    try:
        existing = requests.get(f"{API_URL}?page=0&size=1000").json()
        for painting in existing.get('content', []):
            requests.delete(f"{API_URL}/{painting['id']}")
        print(f"   ✅ Cleared {len(existing.get('content', []))} old paintings\n")
    except:
        print("   ⚠️  Could not clear old data\n")
    
    # Generate and import paintings
    print("2. Creating paintings from images...")
    print()
    
    created_count = 0
    error_count = 0
    featured_count = 0
    
    for image_file in sorted(image_files):
        filename = image_file.name
        title = generate_title(filename)
        url_key = generate_url_key(filename)
        category = detect_category(filename)
        description = generate_description(title, category)
        difficulty = estimate_difficulty(category, filename)
        
        # Determine if featured (first few of each category)
        featured = featured_count < 6 and any(x in filename.lower() for x in ['mandala', 'fairy', 'princess', 'tiger', 'wizard', 'stitch'])
        if featured:
            featured_count += 1
        
        # Create painting object
        painting = {
            "urlKey": url_key,
            "title": title,
            "description": description,
            "category": category,
            "tags": url_key.replace('-', ','),
            "imageUrl": f"/coloring-images/{filename}",
            "thumbnailUrl": f"/coloring-images/{filename}",
            "difficulty": difficulty,
            "colorPalette": COLOR_PALETTES.get(category, COLOR_PALETTES['Characters']),
            "featured": featured,
            "viewCount": 0,
            "svgPath": ""
        }
        
        try:
            response = requests.post(API_URL, json=painting)
            if response.status_code in [200, 201]:
                created_count += 1
                featured_icon = " ⭐" if featured else ""
                print(f"   ✅ {title}{featured_icon} ({category})")
            else:
                error_count += 1
                print(f"   ❌ Failed: {title} - {response.status_code}")
        except Exception as e:
            error_count += 1
            print(f"   ❌ Error: {title} - {e}")
    
    print()
    print("=" * 60)
    print("✅ Database Generation Complete!")
    print("=" * 60)
    print()
    print(f"  ✅ Created: {created_count} paintings")
    print(f"  ⭐ Featured: {featured_count} paintings")
    if error_count > 0:
        print(f"  ❌ Errors: {error_count}")
    print()
    print("Database file: backend/painting.mv.db")
    print("(Data will persist across restarts)")
    print()
    print("Next steps:")
    print("  1. Start admin tool: ./serve-admin-tool.sh")
    print("  2. Open: http://localhost:8081/admin-tool.html")
    print("  3. Fine-tune titles, descriptions, and categories")
    print()

if __name__ == "__main__":
    main()

