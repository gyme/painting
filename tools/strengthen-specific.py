#!/usr/bin/env python3
"""Strengthen lines for specific images"""

from PIL import Image
import os
import sys

def strengthen_lines(input_path, line_threshold=120, strengthen_factor=1.5):
    """Strengthen dark lines by making them darker/blacker"""
    try:
        # Backup original
        backup_path = input_path + '.backup2'
        if not os.path.exists(backup_path):
            os.rename(input_path, backup_path)
            source_file = backup_path
        else:
            source_file = backup_path
        
        # Open image
        img = Image.open(source_file)
        
        # Convert to RGB for processing
        if img.mode == 'RGBA':
            alpha = img.split()[3]
            rgb_img = img.convert('RGB')
        else:
            rgb_img = img.convert('RGB')
            alpha = None
        
        pixels = rgb_img.load()
        width, height = rgb_img.size
        
        strengthened = 0
        
        # Process each pixel
        for y in range(height):
            for x in range(width):
                r, g, b = pixels[x, y]
                brightness = (r + g + b) / 3
                
                # If it's a line (dark pixel)
                if brightness < line_threshold:
                    # Make it even darker/blacker
                    darkness = 1 - (brightness / line_threshold)
                    
                    # Apply strengthening
                    new_r = max(0, int(r * (1 - darkness * strengthen_factor)))
                    new_g = max(0, int(g * (1 - darkness * strengthen_factor)))
                    new_b = max(0, int(b * (1 - darkness * strengthen_factor)))
                    
                    pixels[x, y] = (new_r, new_g, new_b)
                    strengthened += 1
        
        # Save with alpha if it existed
        if alpha:
            rgb_img.putalpha(alpha)
        
        # Determine output format based on input
        if input_path.lower().endswith('.jpg') or input_path.lower().endswith('.jpeg'):
            rgb_img.save(input_path, "JPEG", quality=95, optimize=True)
        else:
            rgb_img.save(input_path, "PNG", optimize=True)
        
        filename = os.path.basename(input_path)
        input_size = os.path.getsize(source_file) / 1024
        output_size = os.path.getsize(input_path) / 1024
        total_pixels = width * height
        percent = (strengthened / total_pixels * 100) if total_pixels > 0 else 0
        
        print(f"✓ {filename:<40} {input_size:>6.0f}KB → {output_size:>6.0f}KB | {percent:>5.1f}% lines strengthened")
        return True
        
    except Exception as e:
        print(f"✗ {os.path.basename(input_path):<40} Error: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 strengthen-specific.py image1.png image2.jpg ...")
        sys.exit(1)
    
    print("🎨 Strengthening Lines for Better Coloring")
    print("=" * 90)
    
    success = 0
    failed = 0
    
    for image_path in sys.argv[1:]:
        if os.path.exists(image_path):
            if strengthen_lines(image_path):
                success += 1
            else:
                failed += 1
        else:
            print(f"✗ {os.path.basename(image_path):<40} File not found")
            failed += 1
    
    print("=" * 90)
    print(f"✅ Complete! {success} strengthened, {failed} failed")

