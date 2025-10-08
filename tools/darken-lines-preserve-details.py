#!/usr/bin/env python3
"""Darken lines while preserving all details and transparency"""

from PIL import Image
import os

def darken_lines_preserve_details(input_path, output_path, darken_factor=0.5):
    """
    Darken existing lines without removing any details.
    Preserves transparency and all gray tones.
    
    Args:
        input_path: Input image path
        output_path: Output image path
        darken_factor: How much to darken (0.5 = darken by 50%, making lines stronger)
    """
    try:
        # Open image and preserve alpha
        img = Image.open(input_path)
        
        if img.mode == 'RGBA':
            # Work with RGBA to preserve transparency
            pixels = img.load()
            width, height = img.size
            
            darkened = 0
            
            for y in range(height):
                for x in range(width):
                    r, g, b, a = pixels[x, y]
                    
                    # Only process visible pixels (not transparent)
                    if a > 0:
                        # Darken the pixel - multiply by darken_factor
                        # This makes dark lines darker while preserving details
                        new_r = int(r * darken_factor)
                        new_g = int(g * darken_factor)
                        new_b = int(b * darken_factor)
                        
                        if (new_r, new_g, new_b) != (r, g, b):
                            darkened += 1
                        
                        pixels[x, y] = (new_r, new_g, new_b, a)
        
        elif img.mode == 'RGB':
            # Work with RGB
            pixels = img.load()
            width, height = img.size
            
            darkened = 0
            
            for y in range(height):
                for x in range(width):
                    r, g, b = pixels[x, y]
                    
                    # Darken all pixels
                    new_r = int(r * darken_factor)
                    new_g = int(g * darken_factor)
                    new_b = int(b * darken_factor)
                    
                    if (new_r, new_g, new_b) != (r, g, b):
                        darkened += 1
                    
                    pixels[x, y] = (new_r, new_g, new_b)
        
        else:
            # Convert to RGB and process
            img = img.convert('RGB')
            pixels = img.load()
            width, height = img.size
            
            darkened = 0
            
            for y in range(height):
                for x in range(width):
                    r, g, b = pixels[x, y]
                    
                    new_r = int(r * darken_factor)
                    new_g = int(g * darken_factor)
                    new_b = int(b * darken_factor)
                    
                    if (new_r, new_g, new_b) != (r, g, b):
                        darkened += 1
                    
                    pixels[x, y] = (new_r, new_g, new_b)
        
        # Save
        img.save(output_path, "PNG", optimize=True)
        
        filename = os.path.basename(input_path)
        input_size = os.path.getsize(input_path) / 1024
        output_size = os.path.getsize(output_path) / 1024
        total_pixels = width * height
        darkened_percent = (darkened / total_pixels * 100) if total_pixels > 0 else 0
        
        print(f"✓ {filename:<40}")
        print(f"  Size: {input_size:.0f}KB → {output_size:.0f}KB")
        print(f"  Darkened: {darkened_percent:.1f}% of pixels")
        print(f"  Mode: {img.mode}")
        print()
        
        return True
        
    except Exception as e:
        print(f"✗ Error processing {input_path}: {e}")
        return False

if __name__ == "__main__":
    print("🎨 Darkening Lines (Preserving All Details)")
    print("=" * 90)
    print("This will make lines 50% darker while preserving all details and transparency")
    print()
    
    images = [
        '../frontend/public/coloring-images/elephant_mandala.png',
        '../frontend/public/coloring-images/lion_mandala.png'
    ]
    
    for img_path in images:
        # Darken by 50% - makes lines twice as strong
        darken_lines_preserve_details(img_path, img_path, darken_factor=0.5)
    
    print("=" * 90)
    print("✅ Complete! Lines are now 50% darker while preserving all details.")

