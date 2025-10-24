#!/usr/bin/env python3
"""
Convert updated PNG images to WebP
"""

from PIL import Image
import os

IMAGE_DIR = "frontend/public/coloring-images"

# Updated images that need WebP regeneration
UPDATED_IMAGES = [
    "zoey.png",
    "the_saja_boys.png",
    "stephen_curry.png",
    "rumi.png",
    "mira.png",
    "puss_in_boots.png",
    "michael_jordan.png",
]

def convert_to_webp(png_filename):
    """Convert PNG to WebP"""
    png_path = os.path.join(IMAGE_DIR, png_filename)
    webp_path = png_path.replace('.png', '.webp')
    
    try:
        # Open PNG
        img = Image.open(png_path)
        
        # Convert to RGB if needed
        if img.mode in ('RGBA', 'LA', 'P'):
            # Create white background
            if img.mode == 'P':
                img = img.convert('RGBA')
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode in ('RGBA', 'LA'):
                background.paste(img, mask=img.split()[-1] if len(img.split()) > 3 else None)
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Save as WebP
        img.save(webp_path, 'WEBP', quality=90, method=6)
        print(f"✅ {png_filename} → WebP")
        
        return True
        
    except Exception as e:
        print(f"❌ {png_filename}: {e}")
        return False


def main():
    print("🎨 Converting updated images to WebP")
    print("="*80)
    
    success = 0
    
    for png_file in UPDATED_IMAGES:
        if convert_to_webp(png_file):
            success += 1
    
    print("\n" + "="*80)
    print(f"✅ Converted {success}/{len(UPDATED_IMAGES)} images to WebP!")
    print("="*80)


if __name__ == "__main__":
    main()


