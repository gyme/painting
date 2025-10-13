#!/usr/bin/env python3
"""Thicken ONLY the black lines, keep background pure white"""

from PIL import Image, ImageFilter, ImageOps
import os
import sys

def thicken_lines_only(input_path, thickness=3):
    """
    Thicken only the dark lines without affecting the white background.
    Uses morphological dilation to expand black lines.
    """
    try:
        # Backup original
        backup_path = input_path + '.backup6'
        if not os.path.exists(backup_path):
            os.rename(input_path, backup_path)
            source_file = backup_path
        else:
            source_file = backup_path
        
        # Open image
        img = Image.open(source_file)
        original_mode = img.mode
        
        # Convert to RGB for processing
        if img.mode == 'P':
            img = img.convert('RGBA')
            has_alpha = True
        elif img.mode == 'RGBA':
            has_alpha = True
        elif img.mode == 'RGB':
            has_alpha = False
        else:
            img = img.convert('RGB')
            has_alpha = False
        
        # Extract alpha if present
        if has_alpha:
            if img.mode == 'RGBA':
                r, g, b, a = img.split()
                rgb_img = Image.merge('RGB', (r, g, b))
                alpha = a
            else:
                rgb_img = img.convert('RGB')
                alpha = None
        else:
            rgb_img = img
            alpha = None
        
        # Convert to grayscale
        gray = rgb_img.convert('L')
        
        # Create a mask of lines (dark areas)
        # Anything darker than 200 is considered a line
        # Use point() to threshold: dark becomes 0 (black), light becomes 255 (white)
        line_mask = gray.point(lambda x: 0 if x < 200 else 255, mode='L')
        
        # Invert so lines are white on black background (for dilation to work)
        line_mask_inverted = ImageOps.invert(line_mask)
        
        # Dilate (expand) the lines multiple times based on thickness
        # This makes the white lines (actual drawing lines) thicker
        for i in range(thickness):
            line_mask_inverted = line_mask_inverted.filter(ImageFilter.MaxFilter(3))
        
        # Invert back so lines are black on white
        thickened_mask = ImageOps.invert(line_mask_inverted)
        
        # Create pure white background
        result = Image.new('RGB', rgb_img.size, (255, 255, 255))
        
        # Paste black lines onto white background
        result.paste(0, mask=ImageOps.invert(thickened_mask))
        
        # Restore alpha if it existed
        if alpha:
            result = result.convert('RGBA')
            result.putalpha(alpha)
        
        # Save with appropriate format
        if input_path.lower().endswith('.jpg') or input_path.lower().endswith('.jpeg'):
            # JPEG doesn't support transparency
            if result.mode == 'RGBA':
                # Convert to RGB with white background
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
        
        print(f"✓ {filename:<42} Thickness={thickness}x  {input_size:>6.0f}KB → {output_size:>6.0f}KB")
        return True
        
    except Exception as e:
        print(f"✗ {os.path.basename(input_path):<42} Error: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 thicken-lines-only.py [-t THICKNESS] image1.png image2.jpg ...")
        print("  THICKNESS: 1-5 (default: 3)")
        sys.exit(1)
    
    # Parse thickness argument
    thickness = 3
    start_idx = 1
    if sys.argv[1] == '-t' and len(sys.argv) > 2:
        thickness = int(sys.argv[2])
        start_idx = 3
    
    print("🎨 Thickening Lines Only (Background Preserved)")
    print("=" * 95)
    print(f"Thickness: {thickness}x dilation")
    print("Background will remain pure white (255, 255, 255)")
    print("=" * 95)
    
    success = 0
    failed = 0
    
    for image_path in sys.argv[start_idx:]:
        if os.path.exists(image_path):
            if thicken_lines_only(image_path, thickness):
                success += 1
            else:
                failed += 1
        else:
            print(f"✗ {os.path.basename(image_path):<42} File not found")
            failed += 1
    
    print("=" * 95)
    print(f"✅ Complete! {success} enhanced, {failed} failed")
    print("Originals backed up with .backup6 extension")

