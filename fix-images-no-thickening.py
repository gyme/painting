#!/usr/bin/env python3
"""
Fix images: Pure black and white with NO line thickening
Just clean conversion, no dilation
"""

from PIL import Image, ImageEnhance
import numpy as np
import os

IMAGE_DIR = "frontend/public/coloring-images"

# All basketball and K-Pop images
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

def clean_bw_conversion(url_key):
    """Convert to pure black and white - NO line thickening"""
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
        
        # Light contrast boost to make lines clearer
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(1.5)
        
        # Convert to numpy array
        img_array = np.array(img)
        
        # Apply binary threshold - NO DILATION, just convert
        # Threshold: pixels darker than this become black, lighter become white
        threshold = 140
        binary = np.where(img_array < threshold, 0, 255).astype(np.uint8)
        
        # Convert back to PIL (no thickening!)
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
    print("🎨 Converting Images: Pure Black & White (No Thickening)")
    print("="*80)
    
    success = 0
    total = len(all_images)
    
    for url_key in all_images:
        if clean_bw_conversion(url_key):
            success += 1
    
    print("\n" + "="*80)
    print(f"✅ Processed {success}/{total} images successfully!")
    print("="*80)
    
    if success == total:
        print("\n✨ All images now have clean, thin lines!")
        print("\n📋 Test locally:")
        print("- http://localhost:3000/painting/michael-jordan")
        print("- http://localhost:3000/painting/mira")
        print("\nLines should be thinner now with no greyscale")


if __name__ == "__main__":
    main()



