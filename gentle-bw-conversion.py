#!/usr/bin/env python3
"""
Very gentle black and white conversion
Just removes greyscale, keeps original line thickness
"""

from PIL import Image
import numpy as np
import os

IMAGE_DIR = "frontend/public/coloring-images"

# All images to convert
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

def gentle_bw_conversion(url_key):
    """Very gentle conversion: just remove greyscale, keep original lines"""
    png_path = os.path.join(IMAGE_DIR, f"{url_key}.png")
    webp_path = os.path.join(IMAGE_DIR, f"{url_key}.webp")
    
    if not os.path.exists(png_path):
        print(f"⚠️  Image not found: {png_path}")
        return False
    
    print(f"Processing {url_key}...")
    
    try:
        # Open image
        img = Image.open(png_path)
        
        # Convert to grayscale if not already
        img = img.convert('L')
        
        # Convert to numpy array
        img_array = np.array(img)
        
        # Very simple threshold - just convert to pure black/white
        # Use 127 (middle) as threshold
        # Anything < 127 becomes black (0), anything >= 127 becomes white (255)
        binary = np.where(img_array < 127, 0, 255).astype(np.uint8)
        
        # Convert back to PIL
        img = Image.fromarray(binary)
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
    print("🎨 Gentle Black & White Conversion")
    print("Just removing greyscale, keeping original line thickness")
    print("="*80)
    
    success = 0
    total = len(all_images)
    
    for url_key in all_images:
        if gentle_bw_conversion(url_key):
            success += 1
    
    print("\n" + "="*80)
    print(f"✅ Processed {success}/{total} images successfully!")
    print("="*80)
    
    if success == total:
        print("\n✨ All images converted to pure black & white!")
        print("\n📋 Test locally:")
        print("- http://localhost:3000/painting/michael-jordan")
        print("- http://localhost:3000/painting/stephen-curry")
        print("- http://localhost:3000/painting/mira")
        print("\nIf the lines are still not right, we may need simpler source images")


if __name__ == "__main__":
    main()



