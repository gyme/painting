#!/usr/bin/env python3
"""
Gentle Line Darkening Script
Makes existing lines darker/bolder without destroying the image
"""

from PIL import Image, ImageEnhance
import sys
import os

def darken_lines_gentle(input_path, output_path, darken_factor=0.4):
    """
    Gently darken existing lines by making dark pixels even darker.
    Preserves the image structure and only affects lines.
    
    Args:
        input_path: Path to input image
        output_path: Path to save output image
        darken_factor: How much to darken (0.3=gentle, 0.5=medium, 0.7=strong)
    """
    try:
        # Open image
        img = Image.open(input_path)
        
        # Convert to RGB if needed
        if img.mode == 'RGBA':
            # Flatten alpha channel to white background
            background = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'RGBA':
                background.paste(img, mask=img.split()[3])
            else:
                background.paste(img)
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Get pixel data
        pixels = img.load()
        width, height = img.size
        
        darkened_count = 0
        
        # Process each pixel
        for y in range(height):
            for x in range(width):
                r, g, b = pixels[x, y]
                brightness = (r + g + b) / 3
                
                # Only darken pixels that are already somewhat dark (likely lines)
                # Brightness < 180 means it's not pure white
                if brightness < 180:
                    # Calculate how dark the pixel should become
                    # The darker it already is, the darker it becomes
                    darkness_ratio = 1 - (brightness / 255)
                    additional_darkening = darkness_ratio * darken_factor
                    
                    # Apply darkening
                    new_r = int(r * (1 - additional_darkening))
                    new_g = int(g * (1 - additional_darkening))
                    new_b = int(b * (1 - additional_darkening))
                    
                    pixels[x, y] = (new_r, new_g, new_b)
                    darkened_count += 1
        
        # Save
        img.save(output_path, 'PNG', optimize=True)
        
        filename = os.path.basename(input_path)
        input_size = os.path.getsize(input_path) / 1024
        output_size = os.path.getsize(output_path) / 1024
        total_pixels = width * height
        darkened_percent = (darkened_count / total_pixels * 100) if total_pixels > 0 else 0
        
        print(f"✓ {filename:<40} | {input_size:.0f}KB → {output_size:.0f}KB | {darkened_percent:.1f}% darkened")
        return True
        
    except Exception as e:
        print(f"✗ Error processing {input_path}: {e}")
        return False

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description='Gently darken lines in coloring page images')
    parser.add_argument('images', nargs='*', help='Image file(s) to process')
    parser.add_argument('-f', '--factor', type=float, default=0.4, 
                        help='Darkening factor (0.3=gentle, 0.5=medium, 0.7=strong) [default: 0.4]')
    parser.add_argument('--all', action='store_true',
                        help='Process all PNG/JPG images in current directory')
    
    args = parser.parse_args()
    
    print("🎨 Gentle Line Darkening Tool")
    print("=" * 90)
    print(f"Darkening Factor: {args.factor}")
    print()
    
    # Determine which images to process
    images_to_process = []
    
    if args.all:
        import glob
        for ext in ['*.png', '*.PNG', '*.jpg', '*.JPG']:
            images_to_process.extend(glob.glob(ext))
    elif args.images:
        images_to_process = args.images
    else:
        # Default: process the problem images
        base_dir = '../frontend/public/coloring-images'
        problem_images = ['spider_man', 'squirrel', 'basketball_player']
        
        for name in problem_images:
            for ext in ['.png', '.jpg']:
                path = os.path.join(base_dir, name + ext)
                if os.path.exists(path):
                    images_to_process.append(path)
                    break
    
    if not images_to_process:
        print("❌ No images to process!")
        print()
        print("Usage:")
        print("  python3 darken-lines-gentle.py                      # Process spider_man, squirrel, basketball_player")
        print("  python3 darken-lines-gentle.py image1.png image2.png  # Process specific images")
        print("  python3 darken-lines-gentle.py --all                # Process all images")
        print("  python3 darken-lines-gentle.py image.png -f 0.6     # Use stronger darkening")
        sys.exit(1)
    
    print(f"Processing {len(images_to_process)} image(s)...")
    print()
    
    success_count = 0
    
    for img_path in images_to_process:
        if not os.path.exists(img_path):
            print(f"⚠️  File not found: {img_path}")
            continue
        
        # Backup original (only if backup doesn't exist)
        backup_path = img_path + '.backup-gentle'
        if not os.path.exists(backup_path):
            import shutil
            shutil.copy2(img_path, backup_path)
        
        # Process
        result = darken_lines_gentle(img_path, img_path, args.factor)
        
        if result:
            success_count += 1
    
    print()
    print("=" * 90)
    print(f"✅ Processed {success_count}/{len(images_to_process)} images successfully!")
    print()
    print("💡 Tips:")
    print("  - Originals backed up with .backup-gentle extension")
    print("  - To restore: mv image.png.backup-gentle image.png")
    print("  - Adjust factor: -f 0.3 (gentle) to -f 0.7 (strong)")
    print("  - This method preserves image structure, only darkens existing lines")

