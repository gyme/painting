#!/usr/bin/env python3
"""Enhance lines while properly handling all image modes"""

from PIL import Image, ImageEnhance
import os
import sys

def enhance_lines(input_path):
    """Enhance lines with proper handling for all image modes"""
    try:
        # Backup original
        backup_path = input_path + '.backup4'
        if not os.path.exists(backup_path):
            os.rename(input_path, backup_path)
            source_file = backup_path
        else:
            source_file = backup_path
        
        # Open image
        img = Image.open(source_file)
        original_mode = img.mode
        
        # Convert palette images to RGB first (properly)
        if img.mode == 'P':
            img = img.convert('RGB')
        elif img.mode == 'RGBA':
            # Split alpha channel
            alpha = img.split()[3]
            img = img.convert('RGB')
        else:
            alpha = None
        
        # Now apply enhancements to RGB image
        # Increase contrast to make lines more defined
        enhancer = ImageEnhance.Contrast(img)
        enhanced = enhancer.enhance(1.4)  # 40% more contrast
        
        # Slightly darken to make lines stronger
        brightness_enhancer = ImageEnhance.Brightness(enhanced)
        enhanced = brightness_enhancer.enhance(0.92)  # 8% darker
        
        # Restore alpha if needed
        if 'alpha' in locals() and alpha:
            enhanced.putalpha(alpha)
        
        # Save with appropriate format
        if input_path.lower().endswith('.jpg') or input_path.lower().endswith('.jpeg'):
            enhanced.save(input_path, "JPEG", quality=95, optimize=True)
        else:
            # Save as RGB PNG (not palette) to preserve quality
            enhanced.save(input_path, "PNG", optimize=True)
        
        filename = os.path.basename(input_path)
        input_size = os.path.getsize(source_file) / 1024
        output_size = os.path.getsize(input_path) / 1024
        
        mode_info = f"{original_mode}→RGB" if original_mode == 'P' else original_mode
        print(f"✓ {filename:<42} {mode_info:<10} {input_size:>6.0f}KB → {output_size:>6.0f}KB")
        return True
        
    except Exception as e:
        print(f"✗ {os.path.basename(input_path):<42} Error: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 enhance-all-modes.py image1.png image2.jpg ...")
        sys.exit(1)
    
    print("🎨 Enhancing Lines (All Image Modes Supported)")
    print("=" * 95)
    print("Settings: +40% contrast, -8% brightness")
    print("Palette images will be converted to RGB for better quality")
    print("=" * 95)
    
    success = 0
    failed = 0
    
    for image_path in sys.argv[1:]:
        if os.path.exists(image_path):
            if enhance_lines(image_path):
                success += 1
            else:
                failed += 1
        else:
            print(f"✗ {os.path.basename(image_path):<42} File not found")
            failed += 1
    
    print("=" * 95)
    print(f"✅ Complete! {success} enhanced, {failed} failed")
    print("Originals backed up with .backup4 extension")

