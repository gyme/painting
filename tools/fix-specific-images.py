#!/usr/bin/env python3
"""Fix background on specific new images"""

from PIL import Image
import os
from collections import Counter

def get_most_common_color(img, sample_size=100):
    """Get the most common background color by sampling edges."""
    pixels = img.load()
    width, height = img.size
    
    edge_colors = []
    
    # Sample all 4 edges
    for x in range(0, width, max(1, width // sample_size)):
        edge_colors.append(pixels[x, 0])  # Top
        edge_colors.append(pixels[x, height-1])  # Bottom
    
    for y in range(0, height, max(1, height // sample_size)):
        edge_colors.append(pixels[0, y])  # Left
        edge_colors.append(pixels[width-1, y])  # Right
    
    # Find most common
    color_counts = Counter(edge_colors)
    bg_color = color_counts.most_common(1)[0][0]
    
    return bg_color

def replace_exact_background_only(input_path, output_path, tolerance=5):
    """Replace ONLY exact background color pixels with white."""
    try:
        img = Image.open(input_path).convert('RGB')
        pixels = img.load()
        width, height = img.size
        
        # Detect background color
        bg_color = get_most_common_color(img)
        bg_avg = sum(bg_color) / 3
        
        # Skip if already white
        if bg_avg > 240:
            img.save(output_path, "PNG", optimize=True)
            filename = os.path.basename(input_path)
            print(f"⊘ {filename:<40} | Already white background")
            return True
        
        replaced = 0
        
        # Replace ONLY exact background color pixels
        for y in range(height):
            for x in range(width):
                r, g, b = pixels[x, y]
                
                # Check if this pixel is EXACTLY the background color
                color_diff = abs(r - bg_color[0]) + abs(g - bg_color[1]) + abs(b - bg_color[2])
                
                if color_diff <= tolerance:
                    pixels[x, y] = (255, 255, 255)
                    replaced += 1
        
        # Save
        img.save(output_path, "PNG", optimize=True)
        
        input_size = os.path.getsize(input_path)
        output_size = os.path.getsize(output_path)
        
        filename = os.path.basename(input_path)
        total_pixels = width * height
        percent_replaced = (replaced / total_pixels * 100) if total_pixels > 0 else 0
        
        print(f"✓ {filename:<40} | {input_size/1024:.0f}KB → {output_size/1024:.0f}KB | {percent_replaced:.1f}% BG replaced")
        
        return True
        
    except Exception as e:
        print(f"✗ Error: {input_path}: {e}")
        return False

# Process specific images
images = [
    '../frontend/public/coloring-images/elephant_mandala.png',
    '../frontend/public/coloring-images/lion_mandala.png',
    '../frontend/public/coloring-images/owl_mandala.png',
    '../frontend/public/coloring-images/fairy.png'
]

print("🎨 Fixing backgrounds for new images...")
print("=" * 90)

for img_path in images:
    replace_exact_background_only(img_path, img_path, tolerance=5)

print("=" * 90)
print("✅ All images fixed!")

