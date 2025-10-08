#!/usr/bin/env python3
"""Aggressively strengthen black lines - make them pure black"""

from PIL import Image
import os

def strengthen_lines_aggressive(input_path, output_path, line_threshold=120):
    """
    Make all dark lines PURE BLACK for maximum strength.
    
    Args:
        input_path: Input image path
        output_path: Output image path
        line_threshold: Brightness below this becomes pure black (0-255)
    """
    try:
        # Open image
        img = Image.open(input_path)
        
        # Convert to RGB for processing
        if img.mode == 'RGBA':
            # Preserve alpha channel
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
                
                # If it's a line (dark pixel), make it PURE BLACK
                if brightness < line_threshold:
                    pixels[x, y] = (0, 0, 0)
                    strengthened += 1
        
        # Restore alpha if it existed
        if alpha:
            rgb_img.putalpha(alpha)
            rgb_img.save(output_path, "PNG", optimize=True)
        else:
            rgb_img.save(output_path, "PNG", optimize=True)
        
        filename = os.path.basename(input_path)
        input_size = os.path.getsize(input_path) / 1024
        output_size = os.path.getsize(output_path) / 1024
        total_pixels = width * height
        percent = (strengthened / total_pixels * 100) if total_pixels > 0 else 0
        
        print(f"✓ {filename:<40} | {input_size:.0f}KB → {output_size:.0f}KB | {percent:.1f}% → PURE BLACK")
        return True
        
    except Exception as e:
        print(f"✗ Error processing {input_path}: {e}")
        return False

if __name__ == "__main__":
    images = [
        '../frontend/public/coloring-images/elephant_mandala.png',
        '../frontend/public/coloring-images/lion_mandala.png'
    ]
    
    print("🎨 AGGRESSIVE Line Strengthening - Making Lines PURE BLACK")
    print("=" * 90)
    print("Converting all dark lines to RGB(0, 0, 0) for maximum strength...")
    print()
    
    for img_path in images:
        # Make all pixels below 120 brightness become pure black
        strengthen_lines_aggressive(img_path, img_path, line_threshold=120)
    
    print()
    print("=" * 90)
    print("✅ Lines are now PURE BLACK! Maximum strength achieved.")

