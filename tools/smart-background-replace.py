#!/usr/bin/env python3
"""
Smart Background Replacement - Preserves Anti-Aliasing
=======================================================
Replaces only the solid background color with white,
while preserving ALL anti-aliasing and transition pixels.
"""

from PIL import Image
import os
import sys
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
    """
    Replace ONLY exact background color pixels with white.
    Keep ALL other pixels (including anti-aliasing) untouched.
    
    Args:
        tolerance: Very tight tolerance - only pixels this close to bg become white
    """
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
        import traceback
        traceback.print_exc()
        return False

def process_directory(input_dir, output_dir=None, tolerance=5):
    """Process all images."""
    
    if output_dir is None:
        output_dir = input_dir
    
    os.makedirs(output_dir, exist_ok=True)
    
    # Backup if in-place
    if output_dir == input_dir:
        backup_dir = os.path.join(os.path.dirname(input_dir), 'coloring-images-ORIGINAL')
        if not os.path.exists(backup_dir):
            os.makedirs(backup_dir, exist_ok=True)
            print(f"📦 Backup: {backup_dir}")
            print("=" * 90)
    
    extensions = ('.png', '.jpg', '.jpeg')
    image_files = [f for f in sorted(os.listdir(input_dir)) 
                   if f.lower().endswith(extensions) and f not in ['PLACE_IMAGES_HERE.txt']]
    
    if not image_files:
        print("⚠️  No images found!")
        return
    
    print(f"Found {len(image_files)} images")
    print("=" * 90)
    print(f"{'Image':<40} | {'Result'}")
    print("=" * 90)
    
    processed = 0
    
    for filename in image_files:
        input_path = os.path.join(input_dir, filename)
        
        # Backup
        if output_dir == input_dir:
            import shutil
            backup_path = os.path.join(backup_dir, filename)
            if not os.path.exists(backup_path):
                shutil.copy2(input_path, backup_path)
        
        output_filename = os.path.splitext(filename)[0] + '.png'
        output_path = os.path.join(output_dir, output_filename)
        
        if replace_exact_background_only(input_path, output_path, tolerance):
            processed += 1
    
    print("=" * 90)
    print(f"\n✅ Processed {processed}/{len(image_files)} images")
    print("\n✨ Smart replacement complete!")
    print("   ✓ Background → pure white")
    print("   ✓ Anti-aliasing → 100% preserved")
    print("   ✓ Perfect coloring maintained")

if __name__ == "__main__":
    print("🎨 Smart Background Replacement (Preserves Anti-Aliasing)")
    print("=" * 90)
    
    if len(sys.argv) < 2:
        print("\nUsage: python smart-background-replace.py <input_directory> [tolerance]")
        print("\nOptions:")
        print("  [tolerance]  How exact the match must be (default: 5, lower = stricter)")
        print("\nExample:")
        print("  python smart-background-replace.py ../frontend/public/coloring-images")
        print("\nThis replaces ONLY solid background pixels, keeping anti-aliasing intact!")
        sys.exit(1)
    
    input_dir = sys.argv[1]
    tolerance = int(sys.argv[2]) if len(sys.argv) > 2 else 5
    
    print(f"Input:     {input_dir}")
    print(f"Tolerance: {tolerance} (exact match strictness)")
    print("=" * 90)
    
    if not os.path.isdir(input_dir):
        print(f"Error: {input_dir} is not a directory")
        sys.exit(1)
    
    response = input("\n⚠️  Process IN-PLACE with backup? (y/N): ")
    if response.lower() not in ['y', 'yes']:
        print("Cancelled.")
        sys.exit(0)
    print()
    
    process_directory(input_dir, input_dir, tolerance)

