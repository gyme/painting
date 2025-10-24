#!/usr/bin/env python3
"""
Regenerate WebP files from original PNG files without any processing
Just convert PNG to WebP, that's it
"""

from PIL import Image
import os
import glob

IMAGE_DIR = "frontend/public/coloring-images"

def regenerate_webp(png_path):
    """Simply convert PNG to WebP, no processing"""
    webp_path = png_path.replace('.png', '.webp')
    filename = os.path.basename(png_path)
    
    try:
        # Open PNG
        img = Image.open(png_path)
        
        # Convert to RGB if needed
        if img.mode in ('RGBA', 'LA', 'P'):
            # Create white background
            if img.mode == 'P':
                img = img.convert('RGBA')
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'RGBA' or img.mode == 'LA':
                background.paste(img, mask=img.split()[-1] if len(img.split()) > 3 else None)
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Save as WebP - no processing, just convert
        img.save(webp_path, 'WEBP', quality=90, method=6)
        print(f"✅ {filename}")
        
        return True
        
    except Exception as e:
        print(f"❌ {filename}: {e}")
        return False


def main():
    print("🎨 Regenerating WebP files from original PNGs")
    print("No processing - just simple conversion")
    print("="*80)
    
    # Get all PNG files
    png_files = glob.glob(os.path.join(IMAGE_DIR, "*.png"))
    
    success = 0
    total = len(png_files)
    
    for png_path in sorted(png_files):
        if regenerate_webp(png_path):
            success += 1
    
    print("\n" + "="*80)
    print(f"✅ Regenerated {success}/{total} WebP files!")
    print("="*80)


if __name__ == "__main__":
    main()



