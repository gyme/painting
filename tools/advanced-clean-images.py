#!/usr/bin/env python3
"""
Advanced image cleaning with upscaling and morphological operations.
This creates higher quality coloring images with no gaps.
"""

import os
import sys
from PIL import Image, ImageFilter
import numpy as np
import cv2

# Configuration
UPSCALE_FACTOR = 2  # Upscale by 2x for better quality
BLACK_THRESHOLD = 240  # Ultra-aggressive black threshold
WHITE_THRESHOLD = 195  # White threshold

def clean_and_upscale_image(input_path, output_path):
    """
    Advanced cleaning: upscale, threshold, dilate, and enhance.
    
    Args:
        input_path: Path to input image
        output_path: Path to save cleaned image
    """
    try:
        # Open image
        img = Image.open(input_path)
        
        # Check if image has transparency
        has_alpha = img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info)
        
        # Convert to RGB for processing (we'll handle alpha later)
        if has_alpha:
            # Save alpha channel
            img_rgba = img.convert('RGBA')
            img_rgb = Image.new('RGB', img_rgba.size, (255, 255, 255))
            img_rgb.paste(img_rgba, mask=img_rgba.split()[3])  # Paste using alpha
            alpha_channel = img_rgba.split()[3]
            # Upscale alpha too
            alpha_upscaled = alpha_channel.resize(
                (alpha_channel.width * UPSCALE_FACTOR, alpha_channel.height * UPSCALE_FACTOR),
                Image.Resampling.LANCZOS
            )
        else:
            img_rgb = img.convert('RGB')
            alpha_upscaled = None
        
        # Upscale the image for better quality
        upscaled_width = img_rgb.width * UPSCALE_FACTOR
        upscaled_height = img_rgb.height * UPSCALE_FACTOR
        img_upscaled = img_rgb.resize((upscaled_width, upscaled_height), Image.Resampling.LANCZOS)
        
        # Convert to numpy for OpenCV processing
        img_array = np.array(img_upscaled)
        
        # Convert RGB to grayscale
        gray = cv2.cvtColor(img_array, cv2.COLOR_RGB2GRAY)
        
        # Apply ultra-aggressive binary threshold
        # Anything below 240 becomes black (0), above becomes white (255)
        _, binary = cv2.threshold(gray, BLACK_THRESHOLD, 255, cv2.THRESH_BINARY)
        
        # Dilate black lines slightly to close any tiny gaps
        # This ensures there are NO gaps in the black outlines
        kernel = np.ones((3, 3), np.uint8)
        dilated = cv2.erode(binary, kernel, iterations=1)  # Erode = thicken black (inverse of dilate on binary)
        
        # Convert back to RGB
        result_rgb = cv2.cvtColor(dilated, cv2.COLOR_GRAY2RGB)
        
        # Convert back to PIL
        result_img = Image.fromarray(result_rgb)
        
        # If image had alpha, restore it
        if alpha_upscaled:
            result_rgba = Image.new('RGBA', result_img.size)
            result_rgba.paste(result_img, (0, 0))
            result_rgba.putalpha(alpha_upscaled)
            result_img = result_rgba
        
        # Save with high quality
        if output_path.lower().endswith('.png'):
            result_img.save(output_path, 'PNG', optimize=True)
        else:
            result_img.save(output_path, 'JPEG', quality=95, optimize=True)
        
        return True
        
    except Exception as e:
        print(f"Error processing {input_path}: {e}")
        return False


def main():
    # Get images directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    images_dir = os.path.join(project_root, 'frontend', 'public', 'coloring-images')
    
    print(f"Advanced cleaning (upscale {UPSCALE_FACTOR}x) in: {images_dir}")
    print(f"Black threshold: {BLACK_THRESHOLD} (ultra-aggressive)")
    print(f"Morphological dilation: YES (closes gaps)")
    print()
    
    # Create backup directory
    backup_dir = os.path.join(images_dir, 'originals-backup')
    os.makedirs(backup_dir, exist_ok=True)
    
    processed = 0
    skipped = 0
    
    for filename in sorted(os.listdir(images_dir)):
        if not (filename.lower().endswith('.png') or filename.lower().endswith('.jpg')):
            continue
        
        input_path = os.path.join(images_dir, filename)
        
        # Skip if it's a directory
        if os.path.isdir(input_path):
            continue
        
        # Create backup if doesn't exist
        backup_path = os.path.join(backup_dir, filename)
        if not os.path.exists(backup_path):
            import shutil
            shutil.copy2(input_path, backup_path)
        
        # Clean the image
        print(f"Processing: {filename}...", end=' ')
        
        # Use a temp file first (preserve the extension)
        base, ext = os.path.splitext(input_path)
        temp_path = base + '_temp' + ext
        
        if clean_and_upscale_image(input_path, temp_path):
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
    print(f"  Images are now {UPSCALE_FACTOR}x higher resolution")
    print(f"  Black lines are thickened to close gaps")
    print(f"  Backups saved to: {backup_dir}")
    print()
    print("If images look broken, restore from backup:")
    print(f"  cp {backup_dir}/* {images_dir}/")


if __name__ == '__main__':
    main()

