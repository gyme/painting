#!/usr/bin/env python3
"""
Convert coloring page images to pure black and white (no greyscale)
Ensures solid black lines on white background
"""

from PIL import Image
import numpy as np
import os

# Images to process
images = [
    "udin_din_din_dun.png",
    "tralalero_tralala.png",
    "thung_thung_thung_sahur.png",
    "capuchina_ballerina.png",
    "chimpanzini_bananini.png"
]

BASE_PATH = "/Users/guym/Documents/d/paiting/frontend/public/coloring-images"

def convert_to_black_white(image_path, threshold=128):
    """
    Convert image to pure black and white
    - threshold: pixel values below this become black (0), above become white (255)
    """
    print(f"  📝 Processing: {os.path.basename(image_path)}")
    
    # Open image
    img = Image.open(image_path)
    
    # Convert to grayscale first
    if img.mode != 'L':
        img = img.convert('L')
    
    # Get original size
    original_size = img.size
    print(f"     Size: {original_size[0]}x{original_size[1]}")
    
    # Convert to numpy array
    img_array = np.array(img)
    
    # Apply threshold - anything below threshold becomes black (0), above becomes white (255)
    # For coloring pages, we want lines to be black, so invert if needed
    binary_array = np.where(img_array < threshold, 0, 255).astype(np.uint8)
    
    # Convert back to PIL Image
    result_img = Image.fromarray(binary_array, mode='L')
    
    # Convert to RGB (keeping black and white)
    result_img = result_img.convert('RGB')
    
    # Create backup of original
    backup_path = image_path.replace('.png', '.backup-grayscale.png')
    if not os.path.exists(backup_path):
        img_original = Image.open(image_path)
        img_original.save(backup_path, 'PNG')
        print(f"     💾 Backup saved: {os.path.basename(backup_path)}")
    
    # Save the processed image
    result_img.save(image_path, 'PNG', optimize=True)
    print(f"     ✅ Converted to black & white")
    
    # Get file size
    size_mb = os.path.getsize(image_path) / (1024 * 1024)
    print(f"     📦 New size: {size_mb:.2f} MB")
    print()

def main():
    print("🎨 Converting Images to Pure Black & White")
    print("=" * 60)
    print()
    print("Processing 5 images...")
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
            convert_to_black_white(image_path, threshold=128)
            processed += 1
        except Exception as e:
            print(f"  ❌ Error processing {image_name}: {e}")
            failed += 1
    
    print("=" * 60)
    print(f"✅ Successfully processed: {processed} images")
    if failed > 0:
        print(f"❌ Failed: {failed} images")
    print()
    print("📋 Backups saved with .backup-grayscale extension")
    print("🌐 Refresh your browser to see the changes!")

if __name__ == "__main__":
    main()

