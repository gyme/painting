#!/usr/bin/env python3
"""
Match LeBron's quality for all images
Slightly thicker lines than current (but not too thick)
"""

from PIL import Image, ImageEnhance, ImageFilter
import numpy as np
from scipy import ndimage
import os

IMAGE_DIR = "frontend/public/coloring-images"

# All images EXCEPT lebron (since he's already good)
images_to_fix = [
    # Basketball Players
    "giannis_antetokounmpo",
    "jayson_tatum",
    "kawhi_leonard",
    "kevin_durant",
    "kobe_bryant",
    # "lebron_james",  # Skip - already good!
    "michael_jordan",
    "stephen_curry",
    # K-Pop Demon Hunters
    "k_pop_demon_hunters",
    "mira",
    "rumi",
    "zoey",
    "the_saja_boys"
]

def thicken_slightly(url_key):
    """Make lines slightly thicker to match LeBron's quality"""
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
        
        # Sharpen + strong contrast (like before)
        img = img.filter(ImageFilter.SHARPEN)
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(2.0)
        
        # Convert to numpy array
        img_array = np.array(img)
        
        # Lower threshold to capture more as black
        threshold = 120  # Lower = more black
        binary = np.where(img_array < threshold, 0, 255).astype(np.uint8)
        
        # Apply dilation to thicken lines SLIGHTLY (1 iteration)
        structure = ndimage.generate_binary_structure(2, 1)
        inverted = 255 - binary
        dilated = ndimage.binary_dilation(inverted > 0, structure=structure, iterations=1)
        result = np.where(dilated, 0, 255).astype(np.uint8)
        
        # Convert back to PIL
        img = Image.fromarray(result)
        img = img.convert('RGB')
        
        # Save as high-quality WebP
        img.save(webp_path, 'WEBP', quality=95, method=6)
        print(f"✅ Created WebP: {webp_path}")
        
        # Save PNG
        img.save(png_path, 'PNG', optimize=True)
        print(f"✅ Updated PNG: {png_path}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error processing {url_key}: {e}")
        import traceback
        traceback.print_exc()
        return False


def main():
    print("🎨 Matching LeBron's Line Quality")
    print("Slightly thicker lines (like LeBron)")
    print("="*80)
    
    success = 0
    total = len(images_to_fix)
    
    for url_key in images_to_fix:
        if thicken_slightly(url_key):
            success += 1
    
    print("\n" + "="*80)
    print(f"✅ Processed {success}/{total} images successfully!")
    print("="*80)
    
    if success == total:
        print("\n✨ All images now match LeBron's quality!")
        print("\n📋 Test locally:")
        print("- http://localhost:3000/painting/michael-jordan")
        print("- http://localhost:3000/painting/stephen-curry")
        print("- http://localhost:3000/painting/mira")
        print("\nLines should be similar thickness to LeBron now")


if __name__ == "__main__":
    main()



