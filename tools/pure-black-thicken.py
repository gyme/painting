#!/usr/bin/env python3
"""Convert all grey lines to pure black and thicken them"""

from PIL import Image, ImageFilter, ImageOps
import os
import sys

def pure_black_thicken(input_path, thickness=5):
    """
    Convert all grey lines to pure black, then thicken.
    This ensures strong, solid black lines perfect for coloring.
    """
    try:
        # Backup original
        backup_path = input_path + '.backup8'
        if not os.path.exists(backup_path):
            os.rename(input_path, backup_path)
            source_file = backup_path
        else:
            source_file = backup_path
        
        # Open image
        img = Image.open(source_file)
        original_mode = img.mode
        
        # Handle transparency
        if img.mode == 'P':
            img = img.convert('RGBA')
        elif img.mode not in ['RGB', 'RGBA']:
            img = img.convert('RGB')
        
        # Extract alpha if present
        if img.mode == 'RGBA':
            r, g, b, a = img.split()
            rgb_img = Image.merge('RGB', (r, g, b))
            has_alpha = True
            alpha = a
        else:
            rgb_img = img
            has_alpha = False
            alpha = None
        
        # Convert to grayscale
        gray = rgb_img.convert('L')
        
        # Apply aggressive threshold: anything not pure white becomes black
        # This converts ALL grey tones to pure black
        threshold = 240  # Higher threshold = more aggressive black conversion
        pure_bw = gray.point(lambda x: 0 if x < threshold else 255, mode='L')
        
        # Invert so black lines become white (for dilation)
        inverted = ImageOps.invert(pure_bw)
        
        # Apply dilation (thickening) multiple times
        for i in range(thickness):
            inverted = inverted.filter(ImageFilter.MaxFilter(3))
        
        # Invert back so lines are black again
        thickened = ImageOps.invert(inverted)
        
        # Convert back to RGB
        result = thickened.convert('RGB')
        
        # Restore alpha if needed
        if has_alpha and alpha:
            result = result.convert('RGBA')
            result.putalpha(alpha)
        
        # Save
        if input_path.lower().endswith('.jpg') or input_path.lower().endswith('.jpeg'):
            if result.mode == 'RGBA':
                bg = Image.new('RGB', result.size, (255, 255, 255))
                bg.paste(result, mask=result.split()[3] if result.mode == 'RGBA' else None)
                bg.save(input_path, "JPEG", quality=95, optimize=True)
            else:
                result.save(input_path, "JPEG", quality=95, optimize=True)
        else:
            result.save(input_path, "PNG", optimize=True)
        
        filename = os.path.basename(input_path)
        input_size = os.path.getsize(source_file) / 1024
        output_size = os.path.getsize(input_path) / 1024
        
        print(f"✓ {filename:<42} {input_size:>6.0f}KB → {output_size:>6.0f}KB | Pure Black + {thickness}x")
        return True
        
    except Exception as e:
        print(f"✗ {os.path.basename(input_path):<42} Error: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 pure-black-thicken.py [-t THICKNESS] image1.png ...")
        print("  THICKNESS: 1-7 (default: 5)")
        sys.exit(1)
    
    # Parse thickness
    thickness = 5
    start_idx = 1
    if sys.argv[1] == '-t' and len(sys.argv) > 2:
        thickness = int(sys.argv[2])
        start_idx = 3
    
    print("🎨 Pure Black Lines + Thickening")
    print("=" * 95)
    print(f"Converting all grey tones to PURE BLACK (0,0,0)")
    print(f"Then applying {thickness}x thickening")
    print("=" * 95)
    
    success = 0
    failed = 0
    
    for image_path in sys.argv[start_idx:]:
        if os.path.exists(image_path):
            if pure_black_thicken(image_path, thickness):
                success += 1
            else:
                failed += 1
        else:
            print(f"✗ {os.path.basename(image_path):<42} File not found")
            failed += 1
    
    print("=" * 95)
    print(f"✅ Complete! {success} enhanced, {failed} failed")

