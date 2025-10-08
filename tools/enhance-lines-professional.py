#!/usr/bin/env python3
"""Professional line enhancement with contrast boosting"""

from PIL import Image, ImageFilter, ImageEnhance
import os

def enhance_lines_professional(input_path, output_path):
    """
    Enhance lines using professional image processing:
    1. Increase contrast dramatically
    2. Sharpen edges
    3. Threshold to make lines pure black and background pure white
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
        
        # Step 1: Increase contrast DRAMATICALLY (3x)
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(3.0)
        
        # Step 2: Sharpen the image to make edges crisp
        img = img.filter(ImageFilter.SHARPEN)
        img = img.filter(ImageFilter.SHARPEN)  # Apply twice
        
        # Step 3: Increase brightness slightly to lighten background
        brightness_enhancer = ImageEnhance.Brightness(img)
        img = brightness_enhancer.enhance(1.2)
        
        # Step 4: Apply threshold - make it pure black/white
        pixels = img.load()
        width, height = img.size
        
        black_count = 0
        white_count = 0
        
        # More aggressive threshold - anything below 180 becomes black
        threshold = 180
        
        for y in range(height):
            for x in range(width):
                r, g, b = pixels[x, y]
                brightness = (r + g + b) / 3
                
                if brightness < threshold:
                    # Make it PURE BLACK
                    pixels[x, y] = (0, 0, 0)
                    black_count += 1
                else:
                    # Make it PURE WHITE
                    pixels[x, y] = (255, 255, 255)
                    white_count += 1
        
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
        
        print(f"✓ {filename:<40} | {input_size:.0f}KB → {output_size:.0f}KB | {black_percent:.1f}% black lines")
        return True
        
    except Exception as e:
        print(f"✗ Error processing {input_path}: {e}")
        return False

if __name__ == "__main__":
    images = [
        '../frontend/public/coloring-images/elephant_mandala.png',
        '../frontend/public/coloring-images/lion_mandala.png'
    ]
    
    print("🎨 Professional Line Enhancement")
    print("=" * 90)
    print("Steps: Contrast 3x → Sharpen 2x → Brighten 1.2x → Threshold 180")
    print()
    
    for img_path in images:
        enhance_lines_professional(img_path, img_path)
    
    print()
    print("=" * 90)
    print("✅ Professional enhancement complete! Pure black lines + pure white background.")

