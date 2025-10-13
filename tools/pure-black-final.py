#!/usr/bin/env python3
"""Convert all grey lines to pure black and thicken them - NO EXTRA BACKUPS"""

from PIL import Image, ImageFilter, ImageOps
import os
import sys

def pure_black_thicken(input_path, thickness=5):
    """Convert all grey lines to pure black, then thicken"""
    try:
        # Use existing .backup file as source
        backup_path = input_path + '.backup'
        if os.path.exists(backup_path):
            source_file = backup_path
        else:
            source_file = input_path
        
        # Open image from backup
        img = Image.open(source_file)
        
        # Handle transparency
        if img.mode == 'P':
            img = img.convert('RGBA')
        elif img.mode not in ['RGB', 'RGBA']:
            img = img.convert('RGB')
        
        # Extract alpha
        if img.mode == 'RGBA':
            r, g, b, a = img.split()
            rgb_img = Image.merge('RGB', (r, g, b))
            alpha = a
        else:
            rgb_img = img
            alpha = None
        
        # Convert to grayscale
        gray = rgb_img.convert('L')
        
        # Aggressive threshold: convert all grey to black
        pure_bw = gray.point(lambda x: 0 if x < 240 else 255, mode='L')
        
        # Invert for dilation
        inverted = ImageOps.invert(pure_bw)
        
        # Thicken lines
        for i in range(thickness):
            inverted = inverted.filter(ImageFilter.MaxFilter(3))
        
        # Invert back
        thickened = ImageOps.invert(inverted)
        
        # Convert to RGB
        result = thickened.convert('RGB')
        
        # Restore alpha
        if alpha:
            result = result.convert('RGBA')
            result.putalpha(alpha)
        
        # Save directly to input path
        if input_path.lower().endswith(('.jpg', '.jpeg')):
            if result.mode == 'RGBA':
                bg = Image.new('RGB', result.size, (255, 255, 255))
                bg.paste(result, mask=result.split()[3])
                bg.save(input_path, "JPEG", quality=95, optimize=True)
            else:
                result.save(input_path, "JPEG", quality=95, optimize=True)
        else:
            result.save(input_path, "PNG", optimize=True)
        
        filename = os.path.basename(input_path)
        input_size = os.path.getsize(source_file) / 1024
        output_size = os.path.getsize(input_path) / 1024
        
        print(f"✓ {filename:<42} {input_size:>6.0f}KB → {output_size:>6.0f}KB")
        return True
        
    except Exception as e:
        print(f"✗ {os.path.basename(input_path):<42} Error: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(1)
    
    thickness = 5
    start_idx = 1
    if sys.argv[1] == '-t':
        thickness = int(sys.argv[2])
        start_idx = 3
    
    print(f"🎨 Pure Black + {thickness}x Thickening")
    print("=" * 90)
    
    for image_path in sys.argv[start_idx:]:
        if os.path.exists(image_path):
            pure_black_thicken(image_path, thickness)
    
    print("=" * 90)

