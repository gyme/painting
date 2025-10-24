#!/usr/bin/env python3
"""
Apply moderate line thickness to action shot basketball players
"""

from PIL import Image, ImageEnhance
import numpy as np
from scipy import ndimage
import os

IMAGE_DIR = "frontend/public/coloring-images"

# Action shot players (not the decorative ones)
action_players = [
    "michael_jordan",
    "lebron_james",
    "kobe_bryant",
    "kevin_durant"
]

def moderate_lines(url_key):
    """Apply moderate line thickness - not too thin, not too thick"""
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
        
        # Moderate contrast boost
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(1.8)
        
        # Convert to numpy array
        img_array = np.array(img)
        
        # Apply binary threshold
        threshold = 140
        binary = np.where(img_array < threshold, 0, 255).astype(np.uint8)
        
        # Moderate line thickening (1 iteration only)
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
    print("🏀 Applying Moderate Lines to Action Players")
    print("="*80)
    
    success = 0
    total = len(action_players)
    
    for url_key in action_players:
        if moderate_lines(url_key):
            success += 1
    
    print("\n" + "="*80)
    print(f"✅ Processed {success}/{total} images successfully!")
    print("="*80)
    
    if success == total:
        print("\n✨ All basketball players now have consistent, moderate line thickness!")
        print("\n📋 Test locally:")
        print("- http://localhost:3000/painting/stephen-curry (simplified)")
        print("- http://localhost:3000/painting/michael-jordan (moderate)")
        print("- http://localhost:3000/painting/kawhi-leonard (simplified)")
        print("- http://localhost:3000/painting/lebron-james (moderate)")


if __name__ == "__main__":
    main()



