#!/usr/bin/env python3
"""
BALANCED image cleaning: Great quality + Good performance
2x upscaling is the sweet spot for web apps.
"""

import os
import sys
from PIL import Image, ImageFilter
import numpy as np
import cv2

# BALANCED Configuration
UPSCALE_FACTOR = 2  # 2x upscale (balanced for web)
BLACK_THRESHOLD = 248  # Slightly more aggressive than before
WHITE_THRESHOLD = 190
DILATION_ITERATIONS = 2
COMPRESSION_QUALITY = 85  # Optimize file size

def balanced_clean_image(input_path, output_path):
    """
    Balanced cleaning: excellent quality + reasonable file size.
    """
    try:
        img = Image.open(input_path)
        
        has_alpha = img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info)
        
        if has_alpha:
            img_rgba = img.convert('RGBA')
            img_rgb = Image.new('RGB', img_rgba.size, (255, 255, 255))
            img_rgb.paste(img_rgba, mask=img_rgba.split()[3])
            alpha_channel = img_rgba.split()[3]
            alpha_upscaled = alpha_channel.resize(
                (alpha_channel.width * UPSCALE_FACTOR, alpha_channel.height * UPSCALE_FACTOR),
                Image.Resampling.LANCZOS
            )
        else:
            img_rgb = img.convert('RGB')
            alpha_upscaled = None
        
        # 2x upscale (4x smaller files than 3x, but still high quality)
        upscaled_width = img_rgb.width * UPSCALE_FACTOR
        upscaled_height = img_rgb.height * UPSCALE_FACTOR
        img_upscaled = img_rgb.resize((upscaled_width, upscaled_height), Image.Resampling.LANCZOS)
        
        # Slight blur for smoother edges
        img_upscaled = img_upscaled.filter(ImageFilter.GaussianBlur(radius=0.5))
        
        img_array = np.array(img_upscaled)
        gray = cv2.cvtColor(img_array, cv2.COLOR_RGB2GRAY)
        
        # Very aggressive threshold
        _, binary = cv2.threshold(gray, BLACK_THRESHOLD, 255, cv2.THRESH_BINARY)
        
        # Heavy dilation to close gaps
        kernel = np.ones((5, 5), np.uint8)
        dilated = cv2.erode(binary, kernel, iterations=DILATION_ITERATIONS)
        kernel_small = np.ones((3, 3), np.uint8)
        final = cv2.dilate(dilated, kernel_small, iterations=1)
        
        result_rgb = cv2.cvtColor(final, cv2.COLOR_GRAY2RGB)
        result_img = Image.fromarray(result_rgb)
        
        if alpha_upscaled:
            result_rgba = Image.new('RGBA', result_img.size)
            result_rgba.paste(result_img, (0, 0))
            result_rgba.putalpha(alpha_upscaled)
            result_img = result_rgba
        
        # Save with compression for better performance
        if output_path.lower().endswith('.png'):
            result_img.save(output_path, 'PNG', optimize=True, compress_level=6)
        else:
            result_img.save(output_path, 'JPEG', quality=COMPRESSION_QUALITY, optimize=True)
        
        return True
        
    except Exception as e:
        print(f"Error: {e}")
        return False


def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    images_dir = os.path.join(project_root, 'frontend', 'public', 'coloring-images')
    
    print(f"⚡ BALANCED CLEANING (Quality + Performance)")
    print(f"Directory: {images_dir}")
    print(f"Upscale: {UPSCALE_FACTOR}x (optimized for web)")
    print(f"Black threshold: {BLACK_THRESHOLD} (very aggressive)")
    print(f"Compression: {COMPRESSION_QUALITY}% (fast loading)")
    print()
    
    backup_dir = os.path.join(images_dir, 'originals-backup')
    os.makedirs(backup_dir, exist_ok=True)
    
    processed = 0
    skipped = 0
    
    for filename in sorted(os.listdir(images_dir)):
        if not (filename.lower().endswith('.png') or filename.lower().endswith('.jpg')):
            continue
        
        input_path = os.path.join(images_dir, filename)
        
        if os.path.isdir(input_path):
            continue
        
        backup_path = os.path.join(backup_dir, filename)
        if not os.path.exists(backup_path):
            import shutil
            shutil.copy2(input_path, backup_path)
        
        print(f"Processing: {filename}...", end=' ')
        
        base, ext = os.path.splitext(input_path)
        temp_path = base + '_temp' + ext
        
        if balanced_clean_image(input_path, temp_path):
            os.replace(temp_path, input_path)
            print("✓ Done")
            processed += 1
        else:
            print("✗ Failed")
            if os.path.exists(temp_path):
                os.remove(temp_path)
            skipped += 1
    
    print()
    print(f"✅ Summary:")
    print(f"  Processed: {processed}")
    print(f"  Resolution: 2x (2048x3072 typical)")
    print(f"  Quality: Excellent")
    print(f"  Performance: Fast (compressed files)")
    print(f"  Gaps: Closed (heavy dilation)")
    print()
    print("Refresh browser to see faster loading times!")


if __name__ == '__main__':
    main()

