#!/usr/bin/env python3
"""
Fix coloring page images with moderate processing
Remove greyscale while keeping appropriate line thickness
"""

from PIL import Image, ImageFilter, ImageEnhance
import numpy as np
from scipy import ndimage
import os

BASE_PATH = "/Users/guym/Documents/d/paiting/frontend/public/coloring-images"

images = [
    "girl_playing_guitar.png",
    "surfer.png"
]

def fix_image_moderate(image_path):
    """
    Moderate processing: remove greyscale, slightly thicker lines
    """
    print(f"  📝 Processing: {os.path.basename(image_path)}")
    
    # Open image
    img = Image.open(image_path)
    original_size = img.size
    print(f"     Size: {original_size[0]}x{original_size[1]}")
    print(f"     Mode: {img.mode}")
    
    # Convert palette or RGBA to RGB first
    if img.mode in ('P', 'RGBA', 'LA'):
        rgb_img = Image.new('RGB', img.size, (255, 255, 255))
        if img.mode in ('RGBA', 'LA'):
            # Use alpha channel as mask if present
            try:
                alpha_channel = img.split()[-1]
                rgb_img.paste(img.convert('RGB'), mask=alpha_channel)
            except:
                rgb_img.paste(img.convert('RGB'))
        else:
            rgb_img.paste(img.convert('RGB'))
        img = rgb_img
    
    # Convert to grayscale
    if img.mode != 'L':
        img = img.convert('L')
    
    # Moderate contrast boost
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.8)
    
    # Convert to numpy array
    img_array = np.array(img)
    
    print(f"     Pixel range: {img_array.min()}-{img_array.max()}, Mean: {img_array.mean():.1f}")
    
    # Invert if needed (dark lines on light background)
    if np.mean(img_array) < 128:
        print(f"     Inverting (dark background detected)")
        img_array = 255 - img_array
    
    # Moderate threshold - balance between detail and clean lines
    threshold = 190
    binary = np.where(img_array < threshold, 0, 255).astype(np.uint8)
    
    # Check if we have reasonable content
    black_percentage = (np.sum(binary == 0) / binary.size) * 100
    print(f"     Black pixels: {black_percentage:.2f}%")
    
    if black_percentage < 1:
        print(f"     Adjusting threshold (too few black pixels)")
        threshold = 160
        binary = np.where(img_array < threshold, 0, 255).astype(np.uint8)
        black_percentage = (np.sum(binary == 0) / binary.size) * 100
        print(f"     Black pixels (adjusted): {black_percentage:.2f}%")
    
    if black_percentage > 40:
        print(f"     Adjusting threshold (too many black pixels)")
        threshold = 210
        binary = np.where(img_array < threshold, 0, 255).astype(np.uint8)
        black_percentage = (np.sum(binary == 0) / binary.size) * 100
        print(f"     Black pixels (adjusted): {black_percentage:.2f}%")
    
    # Light cleanup
    binary = ndimage.binary_opening(binary, structure=np.ones((2,2))).astype(np.uint8) * 255
    binary = ndimage.binary_closing(binary, structure=np.ones((2,2))).astype(np.uint8) * 255
    
    # GENTLE line thickening - only 1 iteration with small kernel
    kernel = np.ones((2, 2), np.uint8)  # Smaller kernel = less thickening
    dilated = ndimage.binary_dilation(binary == 0, structure=kernel, iterations=1)
    binary = np.where(dilated, 0, 255).astype(np.uint8)
    
    # Very light smoothing
    result_img = Image.fromarray(binary, mode='L')
    result_img = result_img.filter(ImageFilter.GaussianBlur(radius=0.4))
    result_array = np.array(result_img)
    result_array = np.where(result_array < 128, 0, 255).astype(np.uint8)
    result_img = Image.fromarray(result_array, mode='L')
    
    # Convert to RGB (pure black and white)
    result_img = result_img.convert('RGB')
    
    # Save
    result_img.save(image_path, 'PNG', optimize=True)
    print(f"     ✅ Fixed: Removed greyscale, moderate line thickness")
    
    size_kb = os.path.getsize(image_path) / 1024
    print(f"     📦 Size: {size_kb:.1f} KB")
    print()

def main():
    print("🎨 Fixing Coloring Pages (Moderate Approach)")
    print("=" * 60)
    print("Removing greyscale with moderate line thickness")
    print("=" * 60)
    print()
    
    processed = 0
    failed = 0
    
    for image_name in images:
        image_path = os.path.join(BASE_PATH, image_name)
        
        if not os.path.exists(image_path):
            print(f"  ❌ Not found: {image_name}")
            failed += 1
            continue
        
        try:
            fix_image_moderate(image_path)
            processed += 1
        except Exception as e:
            print(f"  ❌ Error: {e}")
            import traceback
            traceback.print_exc()
            failed += 1
    
    print("=" * 60)
    print(f"✅ Successfully processed: {processed} images")
    if failed > 0:
        print(f"❌ Failed: {failed} images")
    print()
    print("🌐 Refresh browser (Cmd+Shift+R) to see changes!")
    print()
    print("📍 Images updated:")
    for img in images:
        print(f"   • {img}")

if __name__ == "__main__":
    main()

