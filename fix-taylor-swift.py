#!/usr/bin/env python3
"""
Fix Taylor Swift (Pop Star Singer) image
Convert JPG to PNG/WebP with proper black and white conversion
"""

from PIL import Image, ImageEnhance, ImageFilter
import numpy as np
from scipy import ndimage
import os

IMAGE_DIR = "frontend/public/coloring-images"

def fix_taylor_swift():
    """Convert Taylor Swift JPG to proper coloring page format"""
    jpg_path = os.path.join(IMAGE_DIR, "taylor_swift.jpg")
    png_path = os.path.join(IMAGE_DIR, "taylor_swift.png")
    webp_path = os.path.join(IMAGE_DIR, "taylor_swift.webp")
    
    if not os.path.exists(jpg_path):
        print(f"⚠️  Image not found: {jpg_path}")
        return False
    
    print(f"Processing taylor_swift.jpg...")
    
    try:
        # Open JPG image
        img = Image.open(jpg_path)
        
        # Convert to grayscale
        img = img.convert('L')
        
        # Sharpen + strong contrast (like LeBron)
        img = img.filter(ImageFilter.SHARPEN)
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(2.0)
        
        # Convert to numpy array
        img_array = np.array(img)
        
        # Apply threshold
        threshold = 120
        binary = np.where(img_array < threshold, 0, 255).astype(np.uint8)
        
        # Slight dilation to match other images
        structure = ndimage.generate_binary_structure(2, 1)
        inverted = 255 - binary
        dilated = ndimage.binary_dilation(inverted > 0, structure=structure, iterations=1)
        result = np.where(dilated, 0, 255).astype(np.uint8)
        
        # Convert back to PIL
        img = Image.fromarray(result)
        img = img.convert('RGB')
        
        # Save as WebP
        img.save(webp_path, 'WEBP', quality=95, method=6)
        print(f"✅ Created WebP: {webp_path}")
        
        # Save as PNG
        img.save(png_path, 'PNG', optimize=True)
        print(f"✅ Created PNG: {png_path}")
        
        return True
        
    except Exception as e:
        print(f"❌ Error processing taylor_swift: {e}")
        import traceback
        traceback.print_exc()
        return False


def main():
    print("🎤 Fixing Pop Star Singer (Taylor Swift) Image")
    print("="*80)
    
    if fix_taylor_swift():
        print("\n✅ Successfully fixed Pop Star Singer image!")
        print("\n📋 Next steps:")
        print("1. Test locally: http://localhost:3000/painting/taylor-swift")
        print("2. Deploy to production")
    else:
        print("\n❌ Failed to fix image")


if __name__ == "__main__":
    main()



