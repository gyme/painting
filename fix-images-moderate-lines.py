#!/usr/bin/env python3
"""
Fix images: Pure black and white with moderate line thickness
"""

from PIL import Image, ImageFilter, ImageOps, ImageEnhance
import numpy as np
from scipy import ndimage
import os

IMAGE_DIR = "frontend/public/coloring-images"

# All images to fix
images_to_fix = [
    # Basketball Players
    "giannis_antetokounmpo",
    "jayson_tatum",
    "kawhi_leonard",
    "kevin_durant",
    "kobe_bryant",
    "lebron_james",
    "michael_jordan",
    "stephen_curry",
    # K-Pop Demon Hunters
    "k_pop_demon_hunters",
    "mira",
    "rumi",
    "zoey",
    "the_saja_boys"
]

def moderate_lines(url_key):
    """Convert image to pure black and white with moderate line thickness"""
    png_path = os.path.join(IMAGE_DIR, f"{url_key}.png")
    webp_path = os.path.join(IMAGE_DIR, f"{url_key}.webp")
    
    if not os.path.exists(png_path):
        print(f"⚠️  Image not found: {png_path}")
        return False
    
    print(f"Processing {url_key}...")
    
    try:
        # Open image
        img = Image.open(png_path)
        
        # Convert to grayscale
        img = img.convert('L')
        
        # Increase contrast to make lines more visible
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(1.8)  # Slightly less contrast
        
        # Apply binary threshold
        threshold = 140
        img_array = np.array(img)
        
        # Create binary image (0 = black/line, 255 = white/background)
        binary = np.where(img_array < threshold, 0, 255).astype(np.uint8)
        
        # Dilate (thicken) the black lines - but less than before
        structure = ndimage.generate_binary_structure(2, 1)
        
        # Invert for dilation
        inverted = 255 - binary
        
        # Dilate with only 1 iteration for moderate thickness
        dilated = ndimage.binary_dilation(inverted > 0, structure=structure, iterations=1)
        
        # Convert back (black lines on white background)
        result = np.where(dilated, 0, 255).astype(np.uint8)
        
        # Convert back to PIL Image
        img = Image.fromarray(result)
        
        # Convert to RGB (maintaining black and white)
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
        import traceback
        traceback.print_exc()
        return False


def main():
    print("🎨 Fixing Images: Moderate Line Thickness + Pure Black & White")
    print("="*80)
    
    success = 0
    total = len(images_to_fix)
    
    for url_key in images_to_fix:
        if moderate_lines(url_key):
            success += 1
    
    print("\n" + "="*80)
    print(f"✅ Processed {success}/{total} images successfully!")
    print("="*80)
    
    if success == total:
        print("\n✨ All images now have moderate line thickness!")
        print("\n📋 Next steps:")
        print("1. Check the images in frontend/public/coloring-images/")
        print("2. Test locally to verify the lines look good")
        print("3. Once verified, deploy to production")
    else:
        print("\n⚠️  Some images failed. Check errors above.")


if __name__ == "__main__":
    main()



