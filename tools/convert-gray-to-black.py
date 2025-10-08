#!/usr/bin/env python3
"""Convert all gray colors to pure black, keep white as white"""

from PIL import Image
import os

def convert_gray_to_black(input_path, output_path, white_threshold=240):
    """
    Convert all gray pixels to pure black, keep white pixels white.
    
    Args:
        input_path: Input image path
        output_path: Output image path
        white_threshold: Brightness above this stays white (0-255)
    """
    try:
        # Open image
        img = Image.open(input_path)
        
        # Convert to RGB
        if img.mode == 'RGBA':
            alpha = img.split()[3]
            img = img.convert('RGB')
        else:
            img = img.convert('RGB')
            alpha = None
        
        pixels = img.load()
        width, height = img.size
        
        black_count = 0
        white_count = 0
        
        # Process each pixel
        for y in range(height):
            for x in range(width):
                r, g, b = pixels[x, y]
                brightness = (r + g + b) / 3
                
                if brightness >= white_threshold:
                    # Keep as pure white
                    pixels[x, y] = (255, 255, 255)
                    white_count += 1
                else:
                    # Convert to pure black (any gray or dark color)
                    pixels[x, y] = (0, 0, 0)
                    black_count += 1
        
        # Restore alpha if needed
        if alpha:
            img.putalpha(alpha)
        
        # Save
        img.save(output_path, "PNG", optimize=True)
        
        filename = os.path.basename(input_path)
        input_size = os.path.getsize(input_path) / 1024
        output_size = os.path.getsize(output_path) / 1024
        total_pixels = width * height
        black_percent = (black_count / total_pixels * 100) if total_pixels > 0 else 0
        white_percent = (white_count / total_pixels * 100) if total_pixels > 0 else 0
        
        print(f"✓ {filename:<40}")
        print(f"  Size: {input_size:.0f}KB → {output_size:.0f}KB")
        print(f"  Black: {black_percent:.1f}% | White: {white_percent:.1f}%")
        print()
        
        return True
        
    except Exception as e:
        print(f"✗ Error processing {input_path}: {e}")
        return False

if __name__ == "__main__":
    import subprocess
    
    print("🎨 Converting Gray to Black for Mandala Images")
    print("=" * 90)
    print()
    
    # Step 1: Restore original images from git
    print("Step 1: Restoring original images from git...")
    subprocess.run([
        'git', 'checkout', 'c786016', '--',
        'frontend/public/coloring-images/elephant_mandala.png',
        'frontend/public/coloring-images/lion_mandala.png'
    ], cwd='/Users/guym/Documents/d/paiting')
    print("✓ Originals restored\n")
    
    # Step 2: Convert gray to black
    print("Step 2: Converting all gray colors to pure black...")
    print()
    
    images = [
        '../frontend/public/coloring-images/elephant_mandala.png',
        '../frontend/public/coloring-images/lion_mandala.png'
    ]
    
    for img_path in images:
        # Threshold 240: anything below 240 brightness becomes black, 240+ stays white
        convert_gray_to_black(img_path, img_path, white_threshold=240)
    
    print("=" * 90)
    print("✅ Complete! All gray colors converted to pure black.")

