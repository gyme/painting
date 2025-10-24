#!/usr/bin/env python3
"""
Simplify decorative basketball players by removing mandala backgrounds
Focus on the central player figure only
"""

from PIL import Image, ImageFilter, ImageDraw, ImageEnhance
import numpy as np
from scipy import ndimage
import os

IMAGE_DIR = "frontend/public/coloring-images"

# Players with heavy decorative/mandala backgrounds
decorative_players = [
    "stephen_curry",
    "kawhi_leonard", 
    "jayson_tatum",
    "giannis_antetokounmpo"
]

def simplify_image(url_key):
    """Simplify image by isolating central figure and removing decorative background"""
    png_path = os.path.join(IMAGE_DIR, f"{url_key}.png")
    webp_path = os.path.join(IMAGE_DIR, f"{url_key}.webp")
    
    if not os.path.exists(png_path):
        print(f"⚠️  Image not found: {png_path}")
        return False
    
    print(f"Simplifying {url_key}...")
    
    try:
        # Open image
        img = Image.open(png_path)
        width, height = img.size
        
        # Convert to grayscale
        img = img.convert('L')
        
        # Increase contrast
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(1.8)
        
        # Convert to numpy array
        img_array = np.array(img)
        
        # Apply threshold to get binary image
        threshold = 140
        binary = np.where(img_array < threshold, 0, 255).astype(np.uint8)
        
        # Create a mask for the central region (where the player usually is)
        # Define central area: middle 70% of image
        mask = np.ones_like(binary) * 255
        center_x = width // 2
        center_y = height // 2
        
        # Create elliptical mask focused on center
        y_coords, x_coords = np.ogrid[:height, :width]
        
        # Ellipse parameters (adjust to focus on player)
        ellipse_x = center_x
        ellipse_y = center_y
        radius_x = width * 0.30  # 60% of width
        radius_y = height * 0.35  # 70% of height
        
        # Create elliptical mask
        ellipse_mask = ((x_coords - ellipse_x)**2 / radius_x**2 + 
                       (y_coords - ellipse_y)**2 / radius_y**2) <= 1
        
        # Apply mask: keep only content in central ellipse
        result = np.where(ellipse_mask, binary, 255)
        
        # Moderate line thickening (just 1 iteration)
        inverted = 255 - result
        structure = ndimage.generate_binary_structure(2, 1)
        dilated = ndimage.binary_dilation(inverted > 0, structure=structure, iterations=1)
        result = np.where(dilated, 0, 255).astype(np.uint8)
        
        # Convert back to PIL
        img = Image.fromarray(result)
        img = img.convert('RGB')
        
        # Save as high-quality WebP
        img.save(webp_path, 'WEBP', quality=95, method=6)
        print(f"✅ Simplified and saved WebP: {webp_path}")
        
        # Save PNG
        img.save(png_path, 'PNG', optimize=True)
        print(f"✅ Simplified and saved PNG: {png_path}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error processing {url_key}: {e}")
        import traceback
        traceback.print_exc()
        return False


def main():
    print("🎨 Simplifying Decorative Basketball Players")
    print("Removing mandala backgrounds, keeping central figures")
    print("="*80)
    
    success = 0
    total = len(decorative_players)
    
    for url_key in decorative_players:
        if simplify_image(url_key):
            success += 1
    
    print("\n" + "="*80)
    print(f"✅ Processed {success}/{total} images successfully!")
    print("="*80)
    
    if success == total:
        print("\n✨ Decorative players simplified!")
        print("\n📋 Next steps:")
        print("1. Check the images - they should now focus on the player")
        print("2. If they still look too busy, you may need simpler source images")
        print("3. Test locally to verify")
    else:
        print("\n⚠️  Some images failed. Check errors above.")
    
    print("\n💡 Note: If results aren't good, I recommend providing")
    print("   simpler source images without mandala backgrounds")


if __name__ == "__main__":
    main()



