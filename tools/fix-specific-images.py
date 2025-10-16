#!/usr/bin/env python3
"""
Fix specific coloring page images to have clean, solid black lines
Uses advanced image processing to clean up, remove greyscale, and thicken lines
"""

from PIL import Image, ImageFilter, ImageOps, ImageEnhance
import numpy as np
from scipy import ndimage
import os

# Images to process
images = [
    "girl_playing_guitar.png",
    "surfer.png"
]

BASE_PATH = "/Users/guym/Documents/d/paiting/frontend/public/coloring-images"

def clean_coloring_page(image_path):
    """
    Clean up coloring page image with solid black lines
    Removes greyscale and adds thicker lines
    """
    print(f"  📝 Processing: {os.path.basename(image_path)}")
    
    # Open image
    img = Image.open(image_path)
    original_size = img.size
    print(f"     Size: {original_size[0]}x{original_size[1]}")
    
    # Convert to grayscale first
    if img.mode != 'L':
        img = img.convert('L')
    
    # Increase contrast to make lines more prominent
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(2.5)  # Higher contrast for better line definition
    
    # Convert to numpy array
    img_array = np.array(img)
    
    # Invert if needed (we want black lines on white background)
    # Check if the image is mostly white (background should be white)
    if np.mean(img_array) < 128:
        img_array = 255 - img_array
    
    # Apply aggressive threshold to get pure black and white
    # Remove ALL greyscale - anything darker than 200 becomes black, rest becomes white
    threshold = 200
    binary = np.where(img_array < threshold, 0, 255).astype(np.uint8)
    
    # Clean up noise - remove small white spots on black areas
    # and small black spots on white areas
    binary = ndimage.binary_opening(binary, structure=np.ones((2,2))).astype(np.uint8) * 255
    binary = ndimage.binary_closing(binary, structure=np.ones((2,2))).astype(np.uint8) * 255
    
    # Thicken the black lines MORE using dilation
    # This makes the lines MUCH thicker and more solid
    kernel = np.ones((4, 4), np.uint8)  # Increased from (3,3) to (4,4) for thicker lines
    dilated = ndimage.binary_dilation(binary == 0, structure=kernel, iterations=2)  # 2 iterations for extra thickness
    binary = np.where(dilated, 0, 255).astype(np.uint8)
    
    # Apply a slight blur and re-threshold to smooth jagged edges
    result_img = Image.fromarray(binary, mode='L')
    result_img = result_img.filter(ImageFilter.GaussianBlur(radius=0.7))
    result_array = np.array(result_img)
    result_array = np.where(result_array < 128, 0, 255).astype(np.uint8)
    result_img = Image.fromarray(result_array, mode='L')
    
    # Convert to RGB while keeping pure black and white (no greyscale)
    result_img = result_img.convert('RGB')
    
    # Backup original if not already backed up
    backup_path = image_path.replace('.png', '.backup-original.png')
    
    if os.path.exists(backup_path):
        print(f"     💾 Using original backup (already exists)")
    else:
        # Create new backup
        img_original = Image.open(image_path)
        img_original.save(backup_path, 'PNG')
        print(f"     💾 Created backup of original")
    
    # Save the cleaned image
    result_img.save(image_path, 'PNG', optimize=True)
    print(f"     ✅ Fixed: Removed greyscale + Added thicker lines")
    
    size_kb = os.path.getsize(image_path) / 1024
    print(f"     📦 Size: {size_kb:.1f} KB")
    print()

def main():
    print("🎨 Fixing Coloring Pages")
    print("=" * 60)
    print("Removing greyscale and adding thicker black lines")
    print("=" * 60)
    print()
    
    # Check if scipy is available
    try:
        import scipy
        print("✅ All required libraries available")
    except ImportError:
        print("⚠️  Installing scipy for better image processing...")
        import subprocess
        subprocess.check_call(['pip3', 'install', 'scipy'])
        print("✅ scipy installed")
    
    print()
    print(f"Processing {len(images)} images...")
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
            clean_coloring_page(image_path)
            processed += 1
        except Exception as e:
            print(f"  ❌ Error processing {image_name}: {e}")
            import traceback
            traceback.print_exc()
            failed += 1
    
    print("=" * 60)
    print(f"✅ Successfully processed: {processed} images")
    if failed > 0:
        print(f"❌ Failed: {failed} images")
    print()
    print("📋 Original backups saved with .backup-original.png extension")
    print("🌐 Refresh your browser (hard refresh: Cmd+Shift+R) to see changes!")
    print()
    print("📍 Images updated at:")
    for image_name in images:
        print(f"   • {image_name}")

if __name__ == "__main__":
    main()
