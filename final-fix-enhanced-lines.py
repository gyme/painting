#!/usr/bin/env python3
"""
Final fix: Enhanced lines - solid and continuous but not too thick
Sharpening + contrast + morphological closing
"""

from PIL import Image, ImageEnhance, ImageFilter
import numpy as np
from scipy import ndimage
import os

IMAGE_DIR = "frontend/public/coloring-images"

# All images to fix
all_images = [
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

def enhance_lines(url_key):
    """Enhance lines: make them solid and continuous, not too thick"""
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
        
        # Step 1: Sharpen to make lines more defined
        img = img.filter(ImageFilter.SHARPEN)
        
        # Step 2: Increase contrast to make lines darker
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(2.0)  # Strong contrast
        
        # Convert to numpy array
        img_array = np.array(img)
        
        # Step 3: Apply threshold
        threshold = 130  # Slightly lower to capture more line details
        binary = np.where(img_array < threshold, 0, 255).astype(np.uint8)
        
        # Step 4: Morphological closing to connect broken lines (very light)
        # Closing = dilation then erosion, which fills small gaps
        structure = np.array([[0, 1, 0],
                             [1, 1, 1],
                             [0, 1, 0]], dtype=np.uint8)
        
        # Invert for morphological operations
        inverted = 255 - binary
        
        # Apply closing (fills gaps without thickening too much)
        closed = ndimage.binary_closing(inverted > 0, structure=structure, iterations=1)
        
        # Convert back
        result = np.where(closed, 0, 255).astype(np.uint8)
        
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
    print("🎨 Final Fix: Enhanced Lines (Solid & Continuous)")
    print("Sharpening + Contrast + Morphological Closing")
    print("="*80)
    
    success = 0
    total = len(all_images)
    
    for url_key in all_images:
        if enhance_lines(url_key):
            success += 1
    
    print("\n" + "="*80)
    print(f"✅ Processed {success}/{total} images successfully!")
    print("="*80)
    
    if success == total:
        print("\n✨ All images enhanced with solid, continuous lines!")
        print("\n📋 Test locally:")
        print("- http://localhost:3000/painting/michael-jordan")
        print("- http://localhost:3000/painting/stephen-curry")
        print("- http://localhost:3000/painting/mira")
        print("\nLines should be solid and clear, not too thin or too thick")
    else:
        print("\n⚠️  Some images failed.")


if __name__ == "__main__":
    main()



