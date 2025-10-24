#!/usr/bin/env python3
"""
Fix surfer image with a gentler approach to preserve content
"""

from PIL import Image, ImageFilter, ImageEnhance, ImageOps
import numpy as np
from scipy import ndimage
import os

BASE_PATH = "/Users/guym/Documents/d/paiting/frontend/public/coloring-images"
image_name = "surfer.png"

def fix_surfer_image(image_path):
    """
    Gentle processing to preserve content while removing greyscale
    """
    print(f"  📝 Processing: {os.path.basename(image_path)}")
    
    # Open image
    img = Image.open(image_path)
    original_size = img.size
    print(f"     Size: {original_size[0]}x{original_size[1]}")
    print(f"     Mode: {img.mode}")
    
    # Convert to RGB first if needed
    if img.mode in ('P', 'RGBA'):
        # Convert palette or RGBA to RGB
        rgb_img = Image.new('RGB', img.size, (255, 255, 255))
        if img.mode == 'RGBA':
            rgb_img.paste(img, mask=img.split()[3])  # Use alpha as mask
        else:
            rgb_img.paste(img)
        img = rgb_img
    
    # Convert to grayscale
    if img.mode != 'L':
        img = img.convert('L')
    
    # Slightly increase contrast
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.5)
    
    # Convert to numpy array
    img_array = np.array(img)
    
    print(f"     Pixel value range: {img_array.min()} to {img_array.max()}")
    print(f"     Mean brightness: {img_array.mean():.1f}")
    
    # Invert if needed (we want dark lines on light background)
    if np.mean(img_array) < 128:
        print(f"     Inverting image (dark background detected)")
        img_array = 255 - img_array
    
    # Use a gentler threshold - keep more detail
    # Anything darker than 180 becomes black, rest becomes white
    threshold = 180
    binary = np.where(img_array < threshold, 0, 255).astype(np.uint8)
    
    # Count black pixels to make sure we have content
    black_pixels = np.sum(binary == 0)
    total_pixels = binary.size
    black_percentage = (black_pixels / total_pixels) * 100
    print(f"     Black pixels: {black_percentage:.2f}%")
    
    if black_percentage < 1:
        print(f"     ⚠️  Warning: Very few black pixels, trying lower threshold")
        threshold = 150
        binary = np.where(img_array < threshold, 0, 255).astype(np.uint8)
        black_pixels = np.sum(binary == 0)
        black_percentage = (black_pixels / total_pixels) * 100
        print(f"     Black pixels (new): {black_percentage:.2f}%")
    
    # Light noise cleanup
    binary = ndimage.binary_opening(binary, structure=np.ones((2,2))).astype(np.uint8) * 255
    binary = ndimage.binary_closing(binary, structure=np.ones((2,2))).astype(np.uint8) * 255
    
    # Thicken lines gently - only 1 iteration with 3x3 kernel
    kernel = np.ones((3, 3), np.uint8)
    dilated = ndimage.binary_dilation(binary == 0, structure=kernel, iterations=1)
    binary = np.where(dilated, 0, 255).astype(np.uint8)
    
    # Slight smoothing
    result_img = Image.fromarray(binary, mode='L')
    result_img = result_img.filter(ImageFilter.GaussianBlur(radius=0.5))
    result_array = np.array(result_img)
    result_array = np.where(result_array < 128, 0, 255).astype(np.uint8)
    result_img = Image.fromarray(result_array, mode='L')
    
    # Convert to RGB
    result_img = result_img.convert('RGB')
    
    # Save
    result_img.save(image_path, 'PNG', optimize=True)
    print(f"     ✅ Fixed with gentle processing")
    
    size_kb = os.path.getsize(image_path) / 1024
    print(f"     📦 Size: {size_kb:.1f} KB")
    print()

def main():
    print("🎨 Fixing Surfer Image (Gentle Approach)")
    print("=" * 60)
    print()
    
    image_path = os.path.join(BASE_PATH, image_name)
    
    if not os.path.exists(image_path):
        print(f"  ❌ Not found: {image_name}")
        return
    
    try:
        fix_surfer_image(image_path)
        print("=" * 60)
        print("✅ Successfully processed surfer.png")
        print()
        print("🌐 Refresh your browser (Cmd+Shift+R) to see changes!")
    except Exception as e:
        print(f"  ❌ Error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()

