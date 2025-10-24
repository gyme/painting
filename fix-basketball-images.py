#!/usr/bin/env python3
"""
Fix basketball player images: Convert to pure black and white (no greyscale)
"""

from PIL import Image, ImageOps
import os

IMAGE_DIR = "frontend/public/coloring-images"

basketball_players = [
    "giannis_antetokounmpo",
    "jayson_tatum",
    "kawhi_leonard",
    "kevin_durant",
    "kobe_bryant",
    "lebron_james",
    "michael_jordan",
    "stephen_curry"
]

def convert_to_pure_bw(url_key):
    """Convert image to pure black and white (no greyscale)"""
    png_path = os.path.join(IMAGE_DIR, f"{url_key}.png")
    webp_path = os.path.join(IMAGE_DIR, f"{url_key}.webp")
    
    if not os.path.exists(png_path):
        print(f"⚠️  Image not found: {png_path}")
        return False
    
    print(f"Processing {url_key}...")
    
    try:
        # Open image
        img = Image.open(png_path)
        
        # Convert to grayscale first
        img = img.convert('L')
        
        # Apply binary threshold to make pure black and white
        # Threshold at 128 (middle): anything darker becomes black, lighter becomes white
        # You can adjust this value: lower = more black, higher = more white
        threshold = 128
        img = img.point(lambda x: 0 if x < threshold else 255, '1')
        
        # Convert back to RGB for web (but maintaining black and white colors)
        img = img.convert('RGB')
        
        # Save as high-quality WebP
        img.save(webp_path, 'WEBP', quality=95, method=6)
        print(f"✅ Created WebP: {webp_path}")
        
        # Also save the PNG
        img.save(png_path, 'PNG', optimize=True)
        print(f"✅ Updated PNG: {png_path}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error processing {url_key}: {e}")
        return False


def main():
    print("🏀 Fixing Basketball Player Images")
    print("Converting to pure black and white (no greyscale)")
    print("="*80)
    
    success = 0
    total = len(basketball_players)
    
    for url_key in basketball_players:
        if convert_to_pure_bw(url_key):
            success += 1
    
    print("\n" + "="*80)
    print(f"✅ Processed {success}/{total} images successfully!")
    print("="*80)
    
    if success == total:
        print("\n✨ All basketball player images are now pure black and white!")
        print("\n📋 Next steps:")
        print("1. Check the images in frontend/public/coloring-images/")
        print("2. Deploy to production: cd frontend && npm run build && vercel --prod")
    else:
        print("\n⚠️  Some images failed. Check errors above.")


if __name__ == "__main__":
    main()



