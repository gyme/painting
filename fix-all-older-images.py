#!/usr/bin/env python3
"""
Fix all older images to ensure proper RGB format with pure black & white
"""

from PIL import Image, ImageEnhance, ImageFilter
import numpy as np
from scipy import ndimage
import os
import glob

IMAGE_DIR = "frontend/public/coloring-images"

def fix_image(png_path):
    """Fix image to proper coloring page format"""
    filename = os.path.basename(png_path)
    url_key = filename.replace('.png', '')
    webp_path = png_path.replace('.png', '.webp')
    
    print(f"Processing {url_key}...")
    
    try:
        # Open image
        img = Image.open(png_path)
        
        # Convert to RGB first (fixes palette mode issues)
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Convert to grayscale
        img = img.convert('L')
        
        # Sharpen + contrast (like LeBron)
        img = img.filter(ImageFilter.SHARPEN)
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(2.0)
        
        # Convert to numpy array
        img_array = np.array(img)
        
        # Apply threshold
        threshold = 120
        binary = np.where(img_array < threshold, 0, 255).astype(np.uint8)
        
        # Slight dilation
        structure = ndimage.generate_binary_structure(2, 1)
        inverted = 255 - binary
        dilated = ndimage.binary_dilation(inverted > 0, structure=structure, iterations=1)
        result = np.where(dilated, 0, 255).astype(np.uint8)
        
        # Convert back to PIL
        img = Image.fromarray(result)
        img = img.convert('RGB')
        
        # Save as WebP
        img.save(webp_path, 'WEBP', quality=95, method=6)
        
        # Save as PNG
        img.save(png_path, 'PNG', optimize=True)
        
        return True
        
    except Exception as e:
        print(f"❌ Error processing {url_key}: {e}")
        return False


def main():
    print("🎨 Fixing All Older Coloring Images")
    print("Ensuring proper RGB format with pure black & white")
    print("="*80)
    
    # Get all PNG files
    png_files = glob.glob(os.path.join(IMAGE_DIR, "*.png"))
    
    # Skip the recently added ones (they're already fixed)
    skip_files = {
        'giannis_antetokounmpo', 'jayson_tatum', 'kawhi_leonard', 'kevin_durant',
        'kobe_bryant', 'lebron_james', 'michael_jordan', 'stephen_curry',
        'k_pop_demon_hunters', 'mira', 'rumi', 'zoey', 'the_saja_boys',
        'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
        'flower_mandala', 'taylor_swift'
    }
    
    success = 0
    total = 0
    
    for png_path in sorted(png_files):
        url_key = os.path.basename(png_path).replace('.png', '')
        if url_key in skip_files:
            continue
            
        total += 1
        if fix_image(png_path):
            success += 1
    
    print("\n" + "="*80)
    print(f"✅ Processed {success}/{total} images successfully!")
    print("="*80)
    
    if success == total:
        print("\n✨ All older images now properly formatted!")
        print("\n📋 Next steps:")
        print("1. Test locally to verify images display")
        print("2. Deploy to production")


if __name__ == "__main__":
    main()



