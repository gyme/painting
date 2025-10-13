#!/usr/bin/env python3
"""Gently enhance lines by increasing contrast"""

from PIL import Image, ImageEnhance
import os
import sys

def gentle_enhance(input_path):
    """Gently enhance lines by slightly increasing contrast"""
    try:
        # Backup original
        backup_path = input_path + '.backup3'
        if not os.path.exists(backup_path):
            os.rename(input_path, backup_path)
            source_file = backup_path
        else:
            source_file = backup_path
        
        # Open image
        img = Image.open(source_file)
        
        # Convert to RGB for processing (preserve mode for saving)
        original_mode = img.mode
        if img.mode == 'RGBA':
            alpha = img.split()[3]
            rgb_img = img.convert('RGB')
        elif img.mode in ['P', 'L']:
            rgb_img = img.convert('RGB')
            alpha = None
        else:
            rgb_img = img
            alpha = None
        
        # Apply gentle contrast enhancement (1.3 = 30% more contrast)
        enhancer = ImageEnhance.Contrast(rgb_img)
        enhanced = enhancer.enhance(1.3)
        
        # Apply gentle brightness reduction to darken lines just a bit
        brightness_enhancer = ImageEnhance.Brightness(enhanced)
        enhanced = brightness_enhancer.enhance(0.95)  # 5% darker
        
        # Restore alpha if it existed
        if alpha and original_mode == 'RGBA':
            enhanced.putalpha(alpha)
        
        # Save with appropriate format
        if input_path.lower().endswith('.jpg') or input_path.lower().endswith('.jpeg'):
            enhanced.save(input_path, "JPEG", quality=95, optimize=True)
        else:
            enhanced.save(input_path, "PNG", optimize=True)
        
        filename = os.path.basename(input_path)
        input_size = os.path.getsize(source_file) / 1024
        output_size = os.path.getsize(input_path) / 1024
        
        print(f"✓ {filename:<45} {input_size:>6.0f}KB → {output_size:>6.0f}KB")
        return True
        
    except Exception as e:
        print(f"✗ {os.path.basename(input_path):<45} Error: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 gentle-line-enhance.py image1.png image2.jpg ...")
        sys.exit(1)
    
    print("🎨 Gently Enhancing Lines (Safe Method)")
    print("=" * 90)
    print("Applying: +30% contrast, -5% brightness")
    print("=" * 90)
    
    success = 0
    failed = 0
    
    for image_path in sys.argv[1:]:
        if os.path.exists(image_path):
            if gentle_enhance(image_path):
                success += 1
            else:
                failed += 1
        else:
            print(f"✗ {os.path.basename(image_path):<45} File not found")
            failed += 1
    
    print("=" * 90)
    print(f"✅ Complete! {success} enhanced, {failed} failed")
    print("Originals backed up with .backup3 extension")

