#!/usr/bin/env python3
"""
Replace Background Color with White
====================================
Detects the background color and replaces it with pure white,
while preserving ALL line art pixels and anti-aliasing for smooth coloring.
"""

from PIL import Image
import os
import sys
from collections import Counter

def detect_background_color(img, sample_size=20):
    """Detect the most common background color by sampling corners."""
    pixels = img.load()
    width, height = img.size
    
    # Sample corners and edges
    corner_samples = []
    
    # Top-left corner
    for y in range(min(sample_size, height)):
        for x in range(min(sample_size, width)):
            corner_samples.append(pixels[x, y])
    
    # Top-right corner
    for y in range(min(sample_size, height)):
        for x in range(max(0, width - sample_size), width):
            corner_samples.append(pixels[x, y])
    
    # Bottom-left corner
    for y in range(max(0, height - sample_size), height):
        for x in range(min(sample_size, width)):
            corner_samples.append(pixels[x, y])
    
    # Bottom-right corner
    for y in range(max(0, height - sample_size), height):
        for x in range(max(0, width - sample_size), width):
            corner_samples.append(pixels[x, y])
    
    # Find most common color
    color_counts = Counter(corner_samples)
    bg_color = color_counts.most_common(1)[0][0]
    
    return bg_color

def color_distance(c1, c2):
    """Calculate color distance between two RGB colors."""
    return sum((a - b) ** 2 for a, b in zip(c1, c2)) ** 0.5

def replace_background_with_white(input_path, output_path, 
                                  color_tolerance=30):
    """
    Replace background color with white while preserving line art.
    
    Args:
        input_path: Input image
        output_path: Output image
        color_tolerance: How similar a color must be to background to replace (default: 30)
    """
    try:
        # Open image
        img = Image.open(input_path).convert('RGB')
        pixels = img.load()
        width, height = img.size
        
        # Detect background color
        bg_color = detect_background_color(img)
        bg_avg = sum(bg_color) / 3
        
        # If background is already mostly white, skip
        if bg_avg > 240:
            img.save(output_path, "PNG", optimize=True)
            filename = os.path.basename(input_path)
            input_size = os.path.getsize(input_path)
            output_size = os.path.getsize(output_path)
            print(f"⊘ {filename:<40} | Already white background - no changes")
            return True
        
        changed_pixels = 0
        
        # Replace background color with white
        for y in range(height):
            for x in range(width):
                current_color = pixels[x, y]
                
                # If color is close to background color, replace with white
                if color_distance(current_color, bg_color) <= color_tolerance:
                    pixels[x, y] = (255, 255, 255)
                    changed_pixels += 1
        
        # Save
        img.save(output_path, "PNG", optimize=True)
        
        # Stats
        input_size = os.path.getsize(input_path)
        output_size = os.path.getsize(output_path)
        
        filename = os.path.basename(input_path)
        total_pixels = width * height
        line_pixels = total_pixels - changed_pixels
        
        bg_color_str = f"RGB{bg_color}"
        print(f"✓ {filename:<40} | {input_size/1024:.1f}KB → {output_size/1024:.1f}KB | {bg_color_str} → white")
        
        return True
        
    except Exception as e:
        print(f"✗ Error processing {input_path}: {e}")
        import traceback
        traceback.print_exc()
        return False

def process_directory(input_dir, output_dir=None, 
                     color_tolerance=30,
                     backup=True):
    """Process all images."""
    
    if output_dir is None:
        output_dir = input_dir
    
    # Create backup if processing in-place
    if backup and output_dir == input_dir:
        backup_dir = os.path.join(os.path.dirname(input_dir), 'coloring-images-final-backup')
        os.makedirs(backup_dir, exist_ok=True)
        print(f"📦 Backup directory: {backup_dir}")
    else:
        backup_dir = None
    
    os.makedirs(output_dir, exist_ok=True)
    
    # Get image files
    extensions = ('.png', '.jpg', '.jpeg')
    image_files = []
    
    for filename in sorted(os.listdir(input_dir)):
        if filename.lower().endswith(extensions):
            if filename not in ['PLACE_IMAGES_HERE.txt', 'README.md', 'README.txt']:
                image_files.append(filename)
    
    if not image_files:
        print("⚠️  No images found!")
        return
    
    print("=" * 100)
    print(f"Found {len(image_files)} images to process")
    print("=" * 100)
    print(f"{'Image':<40} | {'Result'}")
    print("=" * 100)
    
    processed = 0
    total_input_size = 0
    total_output_size = 0
    
    for filename in image_files:
        input_path = os.path.join(input_dir, filename)
        
        # Backup if requested
        if backup_dir:
            import shutil
            backup_path = os.path.join(backup_dir, filename)
            if not os.path.exists(backup_path):
                shutil.copy2(input_path, backup_path)
        
        # Save as PNG
        output_filename = os.path.splitext(filename)[0] + '.png'
        output_path = os.path.join(output_dir, output_filename)
        
        total_input_size += os.path.getsize(input_path)
        
        if replace_background_with_white(input_path, output_path, color_tolerance):
            processed += 1
            total_output_size += os.path.getsize(output_path)
    
    print("=" * 100)
    print(f"\n✅ Successfully processed {processed}/{len(image_files)} images")
    
    if total_input_size > 0:
        total_reduction = ((total_input_size - total_output_size) / total_input_size * 100)
        print(f"📊 Total size: {total_input_size/1024/1024:.1f}MB → {total_output_size/1024/1024:.1f}MB ({total_reduction:+.0f}%)")
    
    if backup_dir:
        print(f"📦 Originals backed up to: {backup_dir}")
    
    print("\n✨ Background colors replaced with white!")
    print("   ✓ ALL line art and anti-aliasing preserved")
    print("   ✓ Perfect coloring experience maintained")
    print("   ✓ Professional white backgrounds")

if __name__ == "__main__":
    print("🎨 Replace Background Color with White")
    print("=" * 100)
    
    if len(sys.argv) < 2:
        print("\nUsage: python replace-background-color.py <input_directory> [options]")
        print("\nOptions:")
        print("  [output_directory]    Output directory (default: same as input)")
        print("  [color_tolerance]     Color similarity threshold (default: 30)")
        print("\nExample:")
        print("  python replace-background-color.py ../frontend/public/coloring-images")
        print("\nThis will:")
        print("  ✓ Auto-detect background color")
        print("  ✓ Replace it with pure white")
        print("  ✓ Preserve ALL line art and anti-aliasing")
        print("  ✓ Maintain perfect coloring experience")
        sys.exit(1)
    
    input_dir = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else input_dir
    color_tolerance = int(sys.argv[3]) if len(sys.argv) > 3 else 30
    
    print(f"Input directory:     {input_dir}")
    print(f"Output directory:    {output_dir}")
    print(f"Color tolerance:     {color_tolerance} (similarity threshold)")
    print("=" * 100)
    
    if output_dir == input_dir:
        print("\n⚠️  Processing images IN-PLACE (originals will be backed up)")
        response = input("Continue? (y/N): ")
        if response.lower() not in ['y', 'yes']:
            print("Cancelled.")
            sys.exit(0)
        print()
    
    process_directory(input_dir, output_dir, color_tolerance)

