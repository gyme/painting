#!/usr/bin/env python3
"""
Replace specific grey background color with white
Detects the background color and replaces it
"""

from PIL import Image
import os
from collections import Counter

def replace_grey_background(input_path, output_path, tolerance=30):
    """
    Detect grey background color and replace with white.
    
    Args:
        input_path: Path to input image
        output_path: Path to save output image
        tolerance: How similar pixels need to be to background (0-100)
    """
    try:
        # Open image
        img = Image.open(input_path).convert('RGB')
        pixels = img.load()
        width, height = img.size
        
        # Sample edges to detect background color
        bg_samples = []
        # Sample all edges
        for x in range(0, width, max(1, width // 50)):
            bg_samples.append(pixels[x, 0])  # Top
            bg_samples.append(pixels[x, height-1])  # Bottom
        for y in range(0, height, max(1, height // 50)):
            bg_samples.append(pixels[0, y])  # Left
            bg_samples.append(pixels[width-1, y])  # Right
        
        # Find most common color (background)
        bg_color = Counter(bg_samples).most_common(1)[0][0]
        bg_brightness = sum(bg_color) / 3
        
        print(f"  Detected background: RGB{bg_color}, brightness={bg_brightness:.1f}")
        
        # If background is already white-ish, skip
        if bg_brightness > 240:
            print(f"  Background already white, skipping")
            return True
        
        replaced_count = 0
        
        # Replace background pixels with white
        for y in range(height):
            for x in range(width):
                r, g, b = pixels[x, y]
                
                # Calculate color difference from background
                color_diff = abs(r - bg_color[0]) + abs(g - bg_color[1]) + abs(b - bg_color[2])
                
                if color_diff <= tolerance:
                    pixels[x, y] = (255, 255, 255)
                    replaced_count += 1
        
        # Save
        img.save(output_path, 'PNG', optimize=True)
        
        filename = os.path.basename(input_path)
        input_size = os.path.getsize(input_path) / 1024
        output_size = os.path.getsize(output_path) / 1024
        total_pixels = width * height
        replaced_percent = (replaced_count / total_pixels * 100) if total_pixels > 0 else 0
        
        print(f"✓ {filename:<40} | {input_size:.0f}KB → {output_size:.0f}KB | {replaced_percent:.1f}% replaced")
        return True
        
    except Exception as e:
        print(f"✗ Error processing {input_path}: {e}")
        return False

if __name__ == "__main__":
    import sys
    
    print("🎨 Grey Background Replacement Tool")
    print("=" * 90)
    print()
    
    base_dir = '../frontend/public/coloring-images'
    images_to_process = [
        os.path.join(base_dir, 'squirrel.png'),
        os.path.join(base_dir, 'spider_man.png')
    ]
    
    # Filter existing files
    images_to_process = [img for img in images_to_process if os.path.exists(img)]
    
    if not images_to_process:
        print("❌ No images found!")
        sys.exit(1)
    
    print(f"Processing {len(images_to_process)} image(s)...")
    print()
    
    success_count = 0
    
    for img_path in images_to_process:
        # Backup
        backup_path = img_path + '.backup-bg2'
        if not os.path.exists(backup_path):
            import shutil
            shutil.copy2(img_path, backup_path)
        
        # Process
        if replace_grey_background(img_path, img_path, tolerance=30):
            success_count += 1
        print()
    
    print("=" * 90)
    print(f"✅ Processed {success_count}/{len(images_to_process)} images successfully!")

