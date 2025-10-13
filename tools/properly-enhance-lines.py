#!/usr/bin/env python3
"""Properly enhance lines while preserving transparency"""

from PIL import Image, ImageEnhance, ImageFilter
import os
import sys

def enhance_lines_properly(input_path):
    """Enhance lines with proper transparency handling"""
    try:
        # Backup original
        backup_path = input_path + '.backup5'
        if not os.path.exists(backup_path):
            os.rename(input_path, backup_path)
            source_file = backup_path
        else:
            source_file = backup_path
        
        # Open image
        img = Image.open(source_file)
        original_mode = img.mode
        
        # Convert to RGBA to properly handle transparency
        if img.mode == 'P':
            # Palette mode - convert to RGBA to preserve transparency
            img = img.convert('RGBA')
        elif img.mode == 'RGB':
            # RGB - no transparency
            pass
        elif img.mode == 'L':
            # Grayscale
            img = img.convert('RGBA')
        # If already RGBA, keep it
        
        if img.mode == 'RGBA':
            # Split into RGB and alpha
            r, g, b, a = img.split()
            rgb_img = Image.merge('RGB', (r, g, b))
            
            # Enhance the RGB part
            # Strong contrast increase
            contrast = ImageEnhance.Contrast(rgb_img)
            rgb_img = contrast.enhance(2.0)  # Double the contrast
            
            # Darken significantly to make lines much stronger
            brightness = ImageEnhance.Brightness(rgb_img)
            rgb_img = brightness.enhance(0.75)  # 25% darker
            
            # Increase sharpness to make lines crisper
            sharpness = ImageEnhance.Sharpness(rgb_img)
            rgb_img = sharpness.enhance(1.5)
            
            # Recombine with alpha
            r, g, b = rgb_img.split()
            result = Image.merge('RGBA', (r, g, b, a))
            
        else:
            # RGB image
            # Strong contrast increase
            contrast = ImageEnhance.Contrast(img)
            result = contrast.enhance(2.0)  # Double the contrast
            
            # Darken significantly
            brightness = ImageEnhance.Brightness(result)
            result = brightness.enhance(0.75)  # 25% darker
            
            # Increase sharpness
            sharpness = ImageEnhance.Sharpness(result)
            result = sharpness.enhance(1.5)
        
        # Save with appropriate format
        if input_path.lower().endswith('.jpg') or input_path.lower().endswith('.jpeg'):
            # JPEG doesn't support transparency
            if result.mode == 'RGBA':
                # Convert to RGB with white background
                bg = Image.new('RGB', result.size, (255, 255, 255))
                bg.paste(result, mask=result.split()[3])
                bg.save(input_path, "JPEG", quality=95, optimize=True)
            else:
                result.save(input_path, "JPEG", quality=95, optimize=True)
        else:
            # PNG supports transparency
            result.save(input_path, "PNG", optimize=True)
        
        filename = os.path.basename(input_path)
        input_size = os.path.getsize(source_file) / 1024
        output_size = os.path.getsize(input_path) / 1024
        
        mode_info = f"{original_mode}→{result.mode}" if original_mode != result.mode else original_mode
        print(f"✓ {filename:<42} {mode_info:<12} {input_size:>6.0f}KB → {output_size:>6.0f}KB")
        return True
        
    except Exception as e:
        print(f"✗ {os.path.basename(input_path):<42} Error: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 properly-enhance-lines.py image1.png image2.jpg ...")
        sys.exit(1)
    
    print("🎨 Properly Enhancing Lines (Strong Enhancement)")
    print("=" * 95)
    print("Settings: 2x contrast, -25% brightness, 1.5x sharpness")
    print("Transparency preserved for PNG files")
    print("=" * 95)
    
    success = 0
    failed = 0
    
    for image_path in sys.argv[1:]:
        if os.path.exists(image_path):
            if enhance_lines_properly(image_path):
                success += 1
            else:
                failed += 1
        else:
            print(f"✗ {os.path.basename(image_path):<42} File not found")
            failed += 1
    
    print("=" * 95)
    print(f"✅ Complete! {success} enhanced, {failed} failed")
    print("Originals backed up with .backup5 extension")

