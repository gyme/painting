#!/usr/bin/env python3
"""
Convert Gray Background to White
Replaces grey backgrounds with pure white while preserving black lines
"""

from PIL import Image
import os
import sys

def convert_gray_to_white(input_path, output_path, white_threshold=200):
    """
    Convert grey background pixels to pure white.
    Preserves black lines and details.
    
    Args:
        input_path: Path to input image
        output_path: Path to save output image
        white_threshold: Brightness above which pixels become white (0-255)
    """
    try:
        # Open image
        img = Image.open(input_path)
        
        # Convert to RGB
        if img.mode == 'RGBA':
            # Flatten to white background
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[3] if img.mode == 'RGBA' else None)
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        
        pixels = img.load()
        width, height = img.size
        
        converted_count = 0
        
        # Process each pixel
        for y in range(height):
            for x in range(width):
                r, g, b = pixels[x, y]
                brightness = (r + g + b) / 3
                
                # If pixel is bright enough (not a line), make it pure white
                if brightness >= white_threshold:
                    pixels[x, y] = (255, 255, 255)
                    converted_count += 1
                # For grey pixels (not quite white, not quite black)
                # This catches grey backgrounds
                elif brightness > 100:  # Not a line (lines are dark)
                    # Check if it's greyish (low color variation)
                    color_range = max(r, g, b) - min(r, g, b)
                    if color_range < 30:  # Grey color (not much variation)
                        pixels[x, y] = (255, 255, 255)
                        converted_count += 1
        
        # Save
        img.save(output_path, 'PNG', optimize=True)
        
        filename = os.path.basename(input_path)
        input_size = os.path.getsize(input_path) / 1024
        output_size = os.path.getsize(output_path) / 1024
        total_pixels = width * height
        converted_percent = (converted_count / total_pixels * 100) if total_pixels > 0 else 0
        
        print(f"✓ {filename:<40} | {input_size:.0f}KB → {output_size:.0f}KB | {converted_percent:.1f}% → white")
        return True
        
    except Exception as e:
        print(f"✗ Error processing {input_path}: {e}")
        return False

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description='Convert grey backgrounds to white')
    parser.add_argument('images', nargs='*', help='Image file(s) to process')
    parser.add_argument('-t', '--threshold', type=int, default=200,
                        help='White threshold (0-255) [default: 200]')
    
    args = parser.parse_args()
    
    print("🎨 Grey Background to White Converter")
    print("=" * 90)
    print(f"White Threshold: {args.threshold}")
    print()
    
    # Determine images to process
    if args.images:
        images_to_process = args.images
    else:
        # Default: process squirrel and spider_man
        base_dir = '../frontend/public/coloring-images'
        images_to_process = [
            os.path.join(base_dir, 'squirrel.png'),
            os.path.join(base_dir, 'spider_man.png')
        ]
    
    if not images_to_process:
        print("❌ No images to process!")
        sys.exit(1)
    
    # Filter to existing files
    images_to_process = [img for img in images_to_process if os.path.exists(img)]
    
    if not images_to_process:
        print("❌ No valid image files found!")
        sys.exit(1)
    
    print(f"Processing {len(images_to_process)} image(s)...")
    print()
    
    success_count = 0
    
    for img_path in images_to_process:
        # Backup
        backup_path = img_path + '.backup-bgfix'
        if not os.path.exists(backup_path):
            import shutil
            shutil.copy2(img_path, backup_path)
        
        # Process
        if convert_gray_to_white(img_path, img_path, args.threshold):
            success_count += 1
    
    print()
    print("=" * 90)
    print(f"✅ Processed {success_count}/{len(images_to_process)} images successfully!")
    print()
    print("💡 Backups saved with .backup-bgfix extension")

