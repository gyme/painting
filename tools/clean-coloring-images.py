#!/usr/bin/env python3
"""
Clean coloring images by converting grey anti-aliasing to black.
This improves flood fill performance by reducing the white halo effect.
"""

import os
import sys
from PIL import Image
import numpy as np

# Thresholds (adjust these if needed)
BLACK_THRESHOLD = 240  # Pixels darker than this become pure black (ABSOLUTE MAXIMUM!)
WHITE_THRESHOLD = 195  # Pixels lighter than this stay white

def clean_image(input_path, output_path):
    """
    Clean a coloring image by converting grey pixels to black.
    
    Args:
        input_path: Path to input image
        output_path: Path to save cleaned image
    """
    try:
        # Open image
        img = Image.open(input_path)
        
        # Check if image has transparency
        has_alpha = img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info)
        
        # Convert to appropriate mode
        if has_alpha:
            img = img.convert('RGBA')
            img_array = np.array(img)
            # Process RGB channels, preserve alpha
            for y in range(img_array.shape[0]):
                for x in range(img_array.shape[1]):
                    r, g, b, a = img_array[y, x]
                    
                    # Only process non-transparent pixels
                    if a > 0:
                        # Calculate brightness
                        brightness = (int(r) + int(g) + int(b)) // 3
                        
                        # If very dark, make it pure black
                        if brightness < BLACK_THRESHOLD:
                            img_array[y, x] = [0, 0, 0, a]
                        # If very light, keep it light
                        elif brightness > WHITE_THRESHOLD:
                            img_array[y, x] = [255, 255, 255, a]
                        # Grey pixels - decide black or white
                        else:
                            if brightness < (BLACK_THRESHOLD + WHITE_THRESHOLD) // 2:
                                img_array[y, x] = [0, 0, 0, a]
                            else:
                                img_array[y, x] = [255, 255, 255, a]
            
            cleaned_img = Image.fromarray(img_array.astype('uint8'), 'RGBA')
        else:
            # No transparency - process as RGB
            if img.mode != 'RGB':
                img = img.convert('RGB')
            
            img_array = np.array(img)
            height, width = img_array.shape[:2]
            
            for y in range(height):
                for x in range(width):
                    r, g, b = img_array[y, x]
                    
                    brightness = (int(r) + int(g) + int(b)) // 3
                    
                    if brightness < BLACK_THRESHOLD:
                        img_array[y, x] = [0, 0, 0]
                    elif brightness > WHITE_THRESHOLD:
                        img_array[y, x] = [255, 255, 255]
                    else:
                        if brightness < (BLACK_THRESHOLD + WHITE_THRESHOLD) // 2:
                            img_array[y, x] = [0, 0, 0]
                        else:
                            img_array[y, x] = [255, 255, 255]
            
            cleaned_img = Image.fromarray(img_array.astype('uint8'), 'RGB')
        
        # Save with appropriate format
        if output_path.lower().endswith('.png'):
            cleaned_img.save(output_path, 'PNG', quality=95, optimize=True)
        else:
            cleaned_img.save(output_path, 'JPEG', quality=95, optimize=True)
        
        return True
        
    except Exception as e:
        print(f"Error processing {input_path}: {e}")
        return False


def main():
    """Process all PNG and JPG images in the coloring-images directory."""
    
    # Get the directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    images_dir = os.path.join(os.path.dirname(script_dir), 'frontend', 'public', 'coloring-images')
    
    if not os.path.exists(images_dir):
        print(f"Error: Directory not found: {images_dir}")
        return
    
    print(f"Cleaning images in: {images_dir}")
    print(f"Black threshold: {BLACK_THRESHOLD} (darker pixels → black)")
    print(f"White threshold: {WHITE_THRESHOLD} (lighter pixels → white)")
    print()
    
    # Create backup directory
    backup_dir = os.path.join(images_dir, 'originals-backup')
    os.makedirs(backup_dir, exist_ok=True)
    
    # Process each image
    processed = 0
    skipped = 0
    
    for filename in sorted(os.listdir(images_dir)):
        if not (filename.lower().endswith('.png') or filename.lower().endswith('.jpg')):
            continue
        
        input_path = os.path.join(images_dir, filename)
        
        # Skip if it's a directory
        if os.path.isdir(input_path):
            continue
        
        # Create backup
        backup_path = os.path.join(backup_dir, filename)
        if not os.path.exists(backup_path):
            import shutil
            shutil.copy2(input_path, backup_path)
        
        # Clean the image
        print(f"Processing: {filename}...", end=' ')
        
        # Use a temp file first (preserve the extension)
        base, ext = os.path.splitext(input_path)
        temp_path = base + '_temp' + ext
        
        if clean_image(input_path, temp_path):
            # Replace original with cleaned version
            os.replace(temp_path, input_path)
            print("✓ Done")
            processed += 1
        else:
            print("✗ Failed")
            if os.path.exists(temp_path):
                os.remove(temp_path)
            skipped += 1
    
    print()
    print(f"Summary:")
    print(f"  Processed: {processed}")
    print(f"  Skipped: {skipped}")
    print(f"  Backups saved to: {backup_dir}")
    print()
    print("If images look broken, restore from backup:")
    print(f"  cp {backup_dir}/* {images_dir}/")


if __name__ == '__main__':
    main()
