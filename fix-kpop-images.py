#!/usr/bin/env python3
"""
Fix K-Pop Demon Hunters images: Convert to pure black and white (no greyscale)
"""

from PIL import Image, ImageOps
import os

IMAGE_DIR = "frontend/public/coloring-images"

kpop_characters = [
    "k_pop_demon_hunters",
    "mira",
    "rumi",
    "zoey",
    "the_saja_boys"
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
    print("🎬 Fixing K-Pop Demon Hunters Images")
    print("Converting to pure black and white (no greyscale)")
    print("="*80)
    
    success = 0
    total = len(kpop_characters)
    
    for url_key in kpop_characters:
        if convert_to_pure_bw(url_key):
            success += 1
    
    print("\n" + "="*80)
    print(f"✅ Processed {success}/{total} images successfully!")
    print("="*80)
    
    if success == total:
        print("\n✨ All K-Pop Demon Hunters images are now pure black and white!")
        print("\n📋 Next steps:")
        print("1. Check the images in frontend/public/coloring-images/")
        print("2. Test locally: http://localhost:3000/painting/mira")
        print("3. Once verified, deploy to production")
    else:
        print("\n⚠️  Some images failed. Check errors above.")


if __name__ == "__main__":
    main()



