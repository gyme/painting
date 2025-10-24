#!/usr/bin/env python3
"""
Final fix for both images with proper handling
"""

from PIL import Image, ImageFilter, ImageEnhance
import numpy as np
from scipy import ndimage
import os

BASE_PATH = "/Users/guym/Documents/d/paiting/frontend/public/coloring-images"

def fix_girl_guitar():
    """Fix girl playing guitar - already mostly good, just remove greyscale"""
    image_path = os.path.join(BASE_PATH, "girl_playing_guitar.png")
    print(f"  📝 Processing: girl_playing_guitar.png")
    
    # Restore from backup
    backup = os.path.join(BASE_PATH, "girl_playing_guitar.backup-original.png")
    img = Image.open(backup)
    print(f"     Size: {img.size}")
    
    # Convert to grayscale
    img_gray = img.convert('L')
    
    # Light contrast boost
    enhancer = ImageEnhance.Contrast(img_gray)
    img_gray = enhancer.enhance(1.5)
    
    # Threshold to pure black/white
    img_array = np.array(img_gray)
    binary = np.where(img_array < 195, 0, 255).astype(np.uint8)
    
    # Minimal line thickening (just fill small gaps)
    kernel = np.ones((2, 2), np.uint8)
    dilated = ndimage.binary_dilation(binary == 0, structure=kernel, iterations=1)
    binary = np.where(dilated, 0, 255).astype(np.uint8)
    
    # Convert back
    result = Image.fromarray(binary).convert('RGB')
    result.save(image_path, 'PNG', optimize=True)
    
    size_kb = os.path.getsize(image_path) / 1024
    print(f"     ✅ Fixed: Pure B&W, minimal line thickening")
    print(f"     📦 Size: {size_kb:.1f} KB\n")

def fix_surfer():
    """Fix surfer - handle palette mode properly"""
    image_path = os.path.join(BASE_PATH, "surfer.png")
    print(f"  📝 Processing: surfer.png")
    
    # Restore from backup
    backup = os.path.join(BASE_PATH, "surfer.backup-original.png")
    img = Image.open(backup)
    print(f"     Size: {img.size}, Mode: {img.mode}")
    
    # Convert palette to RGB properly
    if img.mode == 'P':
        # Check if it has transparency
        if 'transparency' in img.info:
            img = img.convert('RGBA')
            # Create white background
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[3])
            img = background
        else:
            img = img.convert('RGB')
    
    # Now convert to grayscale
    img_gray = img.convert('L')
    
    # Check and show pixel values
    img_array = np.array(img_gray)
    print(f"     Pixel range: {img_array.min()}-{img_array.max()}")
    print(f"     Mean: {img_array.mean():.1f}")
    
    # If all zeros or all white, there's an issue
    if img_array.max() - img_array.min() < 10:
        print(f"     ⚠️  Image appears empty or uniform")
        # Try direct RGB conversion without palette
        img_direct = Image.open(backup).convert('RGB')
        img_gray = img_direct.convert('L')
        img_array = np.array(img_gray)
        print(f"     Retry - Pixel range: {img_array.min()}-{img_array.max()}")
    
    # Boost contrast
    enhancer = ImageEnhance.Contrast(img_gray)
    img_gray = enhancer.enhance(2.0)
    img_array = np.array(img_gray)
    
    # Invert if dark background
    if np.mean(img_array) < 128:
        img_array = 255 - img_array
    
    # Threshold
    binary = np.where(img_array < 190, 0, 255).astype(np.uint8)
    
    black_pct = (np.sum(binary == 0) / binary.size) * 100
    print(f"     Black pixels: {black_pct:.2f}%")
    
    # Light thickening
    kernel = np.ones((2, 2), np.uint8)
    dilated = ndimage.binary_dilation(binary == 0, structure=kernel, iterations=1)
    binary = np.where(dilated, 0, 255).astype(np.uint8)
    
    # Convert and save
    result = Image.fromarray(binary).convert('RGB')
    result.save(image_path, 'PNG', optimize=True)
    
    size_kb = os.path.getsize(image_path) / 1024
    print(f"     ✅ Fixed: Pure B&W, minimal line thickening")
    print(f"     📦 Size: {size_kb:.1f} KB\n")

def main():
    print("🎨 Final Fix for Both Images")
    print("=" * 60)
    print()
    
    try:
        fix_girl_guitar()
        fix_surfer()
        
        print("=" * 60)
        print("✅ Both images fixed successfully!")
        print()
        print("🌐 Refresh browser (Cmd+Shift+R) to see changes!")
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()

