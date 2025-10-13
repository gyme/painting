#!/usr/bin/env python3
"""Gently darken lines without thickening them"""

from PIL import Image, ImageEnhance
import os
import sys

def darken_lines_gently(input_path):
    """
    Darken existing lines without changing their thickness.
    Only applies contrast and slight darkening.
    """
    try:
        # Backup original
        backup_path = input_path + '.backup7'
        if not os.path.exists(backup_path):
            os.rename(input_path, backup_path)
            source_file = backup_path
        else:
            source_file = backup_path
        
        # Open image
        img = Image.open(source_file)
        original_mode = img.mode
        
        # Handle different modes
        if img.mode == 'P':
            # Palette mode - convert to RGBA to preserve transparency
            img = img.convert('RGBA')
        elif img.mode not in ['RGB', 'RGBA']:
            img = img.convert('RGB')
        
        # Process based on mode
        if img.mode == 'RGBA':
            # Split alpha
            r, g, b, a = img.split()
            rgb_img = Image.merge('RGB', (r, g, b))
            has_alpha = True
        else:
            rgb_img = img
            has_alpha = False
        
        # Apply GENTLE enhancements
        # 1. Increase contrast slightly (makes lines a bit darker)
        contrast = ImageEnhance.Contrast(rgb_img)
        enhanced = contrast.enhance(1.5)  # 50% more contrast (gentle)
        
        # 2. Darken very slightly (makes dark lines darker)
        brightness = ImageEnhance.Brightness(enhanced)
        enhanced = brightness.enhance(0.90)  # 10% darker (very gentle)
        
        # 3. Sharpen to make lines crisper
        sharpness = ImageEnhance.Sharpness(enhanced)
        enhanced = sharpness.enhance(1.3)  # 30% sharper
        
        # Restore alpha if needed
        if has_alpha:
            r, g, b = enhanced.split()
            enhanced = Image.merge('RGBA', (r, g, b, a))
        
        # Save with appropriate format
        if input_path.lower().endswith('.jpg') or input_path.lower().endswith('.jpeg'):
            if enhanced.mode == 'RGBA':
                # Convert to RGB for JPEG
                bg = Image.new('RGB', enhanced.size, (255, 255, 255))
                bg.paste(enhanced, mask=enhanced.split()[3])
                bg.save(input_path, "JPEG", quality=95, optimize=True)
            else:
                enhanced.save(input_path, "JPEG", quality=95, optimize=True)
        else:
            enhanced.save(input_path, "PNG", optimize=True)
        
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
        print("Usage: python3 darken-lines-gentle-final.py image1.png image2.jpg ...")
        sys.exit(1)
    
    print("🎨 Gently Darkening Lines (NO Thickening)")
    print("=" * 95)
    print("Enhancement: +50% contrast, -10% brightness, +30% sharpness")
    print("Lines will be DARKER but NOT THICKER")
    print("=" * 95)
    
    success = 0
    failed = 0
    
    for image_path in sys.argv[1:]:
        if os.path.exists(image_path):
            if darken_lines_gently(image_path):
                success += 1
            else:
                failed += 1
        else:
            print(f"✗ {os.path.basename(image_path):<42} File not found")
            failed += 1
    
    print("=" * 95)
    print(f"✅ Complete! {success} enhanced, {failed} failed")

