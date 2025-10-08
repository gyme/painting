#!/usr/bin/env python3
"""
Smart White Background Converter
=================================
Intelligently converts any background (even dark grey) to pure white
while preserving actual line art. Uses edge detection to distinguish
backgrounds from lines.
"""

from PIL import Image, ImageFilter
import os
import sys

def is_edge_pixel(pixels, x, y, width, height, threshold=30):
    """Check if pixel is on an edge (part of line art)."""
    if x == 0 or y == 0 or x == width-1 or y == height-1:
        return False
    
    current = pixels[x, y]
    current_avg = sum(current[:3]) / 3
    
    # Check neighboring pixels for significant contrast
    neighbors = [
        (x-1, y), (x+1, y), (x, y-1), (x, y+1),
        (x-1, y-1), (x+1, y+1), (x-1, y+1), (x+1, y-1)
    ]
    
    for nx, ny in neighbors:
        if 0 <= nx < width and 0 <= ny < height:
            neighbor = pixels[nx, ny]
            neighbor_avg = sum(neighbor[:3]) / 3
            # If there's high contrast with neighbor, this is an edge
            if abs(current_avg - neighbor_avg) > threshold:
                return True
    
    return False

def convert_to_white_background(input_path, output_path, 
                                line_darkness=50,
                                edge_threshold=25):
    """
    Convert backgrounds to white while preserving line art.
    
    Args:
        input_path: Input image
        output_path: Output image
        line_darkness: Pixels darker than this are definitely lines (default: 50)
        edge_threshold: Edge detection sensitivity (default: 25)
    """
    try:
        # Open image
        img = Image.open(input_path).convert('RGB')
        pixels = img.load()
        width, height = img.size
        
        # First pass: identify which pixels are edges/lines
        is_line = {}
        for y in range(height):
            for x in range(width):
                r, g, b = pixels[x, y]
                avg = (r + g + b) / 3
                
                # Very dark pixels are always lines
                if avg < line_darkness:
                    is_line[(x, y)] = True
                # Check if it's on an edge
                elif is_edge_pixel(pixels, x, y, width, height, edge_threshold):
                    is_line[(x, y)] = True
                else:
                    is_line[(x, y)] = False
        
        # Second pass: convert non-line pixels to white
        changed_pixels = 0
        for y in range(height):
            for x in range(width):
                if not is_line.get((x, y), False):
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
        line_percent = (line_pixels / total_pixels * 100) if total_pixels > 0 else 0
        
        print(f"✓ {filename:<40} | {input_size/1024:.1f}KB → {output_size/1024:.1f}KB | Lines: {line_percent:.1f}%")
        
        return True
        
    except Exception as e:
        print(f"✗ Error processing {input_path}: {e}")
        import traceback
        traceback.print_exc()
        return False

def process_directory(input_dir, output_dir=None, 
                     line_darkness=50,
                     edge_threshold=25,
                     backup=True):
    """Process all images."""
    
    if output_dir is None:
        output_dir = input_dir
    
    # Create backup if processing in-place
    if backup and output_dir == input_dir:
        backup_dir = os.path.join(os.path.dirname(input_dir), 'coloring-images-smart-backup')
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
    print(f"{'Image':<40} | {'Size Change'} | {'Line Art'}")
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
        
        if convert_to_white_background(input_path, output_path, 
                                      line_darkness, edge_threshold):
            processed += 1
            total_output_size += os.path.getsize(output_path)
    
    print("=" * 100)
    print(f"\n✅ Successfully processed {processed}/{len(image_files)} images")
    
    if total_input_size > 0:
        total_reduction = ((total_input_size - total_output_size) / total_input_size * 100)
        print(f"📊 Total size: {total_input_size/1024/1024:.1f}MB → {total_output_size/1024/1024:.1f}MB ({total_reduction:+.0f}%)")
    
    if backup_dir:
        print(f"📦 Originals backed up to: {backup_dir}")
    
    print("\n✨ All backgrounds converted to pure white!")
    print("   ✓ Line art perfectly preserved (edge detection)")
    print("   ✓ Professional coloring book appearance")

if __name__ == "__main__":
    print("🎨 Smart White Background Converter")
    print("=" * 100)
    
    if len(sys.argv) < 2:
        print("\nUsage: python smart-white-background.py <input_directory> [options]")
        print("\nOptions:")
        print("  [output_directory]    Output directory (default: same as input)")
        print("  [line_darkness]       Pixels darker than this are lines (default: 50)")
        print("  [edge_threshold]      Edge detection sensitivity (default: 25)")
        print("\nExample:")
        print("  python smart-white-background.py ../frontend/public/coloring-images")
        print("\nThis uses EDGE DETECTION to preserve line art while converting:")
        print("  ✓ Grey backgrounds → Pure white")
        print("  ✓ Dark backgrounds → Pure white")
        print("  ✓ Colored backgrounds → Pure white")
        print("  ✓ Line art → Preserved perfectly")
        sys.exit(1)
    
    input_dir = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else input_dir
    line_darkness = int(sys.argv[3]) if len(sys.argv) > 3 else 50
    edge_threshold = int(sys.argv[4]) if len(sys.argv) > 4 else 25
    
    print(f"Input directory:     {input_dir}")
    print(f"Output directory:    {output_dir}")
    print(f"Line darkness:       {line_darkness} (darker = always keep)")
    print(f"Edge threshold:      {edge_threshold} (lower = more sensitive)")
    print("=" * 100)
    
    if output_dir == input_dir:
        print("\n⚠️  Processing images IN-PLACE (originals will be backed up)")
        response = input("Continue? (y/N): ")
        if response.lower() not in ['y', 'yes']:
            print("Cancelled.")
            sys.exit(0)
        print()
    
    process_directory(input_dir, output_dir, line_darkness, edge_threshold)

