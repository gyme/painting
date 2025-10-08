#!/usr/bin/env python3
"""Strengthen black lines in coloring images for better coloring experience"""

from PIL import Image, ImageEnhance
import os
import sys

def strengthen_lines(input_path, output_path, line_threshold=100, strengthen_factor=2.0):
    """
    Strengthen dark lines by making them darker/blacker.
    
    Args:
        input_path: Input image path
        output_path: Output image path
        line_threshold: Brightness below this is considered a line (0-255)
        strengthen_factor: How much to darken lines (1.0 = no change, 2.0 = darker)
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
                
                # If it's a line (dark pixel)
                if brightness < line_threshold:
                    # Make it even darker/blacker
                    # The darker it is, the more we strengthen it
                    darkness = 1 - (brightness / line_threshold)
                    
                    # Apply strengthening
                    new_r = max(0, int(r * (1 - darkness * strengthen_factor)))
                    new_g = max(0, int(g * (1 - darkness * strengthen_factor)))
                    new_b = max(0, int(b * (1 - darkness * strengthen_factor)))
                    
                    pixels[x, y] = (new_r, new_g, new_b)
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
        
        print(f"✓ {filename:<40} | {input_size:.0f}KB → {output_size:.0f}KB | {percent:.1f}% lines strengthened")
        return True
        
    except Exception as e:
        print(f"✗ Error processing {input_path}: {e}")
        return False

if __name__ == "__main__":
    images = [
        '../frontend/public/coloring-images/elephant_mandala.png',
        '../frontend/public/coloring-images/lion_mandala.png'
    ]
    
    print("🎨 Strengthening Lines for Better Coloring")
    print("=" * 90)
    print("Making dark lines darker and more defined...")
    print()
    
    for img_path in images:
        # Strengthen lines: pixels below 100 brightness become much darker
        strengthen_lines(img_path, img_path, line_threshold=100, strengthen_factor=0.3)
    
    print()
    print("=" * 90)
    print("✅ Lines strengthened! The coloring experience should now be much better.")

