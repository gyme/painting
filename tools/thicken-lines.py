#!/usr/bin/env python3
"""
Thicken Lines Script
Makes thin black lines thicker/bolder for better coloring experience
"""

from PIL import Image, ImageFilter, ImageEnhance, ImageOps
import sys
import os

def thicken_lines(input_path, output_path, thickness=2):
    """
    Thicken black lines in a coloring page image.
    
    Args:
        input_path: Path to input image
        output_path: Path to save output image
        thickness: How much to thicken lines (1=slight, 2=medium, 3=bold)
    """
    try:
        # Open image
        img = Image.open(input_path)
        
        # Convert to RGB if needed
        if img.mode == 'RGBA':
            # Create white background
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[3] if img.mode == 'RGBA' else None)
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Convert to grayscale for processing
        gray = img.convert('L')
        
        # Increase contrast to make lines more prominent
        enhancer = ImageEnhance.Contrast(gray)
        gray = enhancer.enhance(2.0)
        
        # Apply threshold to get pure black/white
        # Anything darker than 200 becomes black, rest becomes white
        threshold = 200
        gray = gray.point(lambda x: 0 if x < threshold else 255, mode='1')
        
        # Convert back to grayscale for filtering
        gray = gray.convert('L')
        
        # Thicken lines by dilating (expanding black areas)
        # We do this by applying a minimum filter multiple times
        for _ in range(thickness):
            gray = gray.filter(ImageFilter.MinFilter(size=3))
        
        # Optional: Smooth the edges slightly to avoid jagged lines
        gray = gray.filter(ImageFilter.SMOOTH)
        
        # Convert back to RGB with white background
        result = Image.new('RGB', gray.size, (255, 255, 255))
        
        # Apply the thickened lines
        pixels_gray = gray.load()
        pixels_result = result.load()
        
        for y in range(gray.height):
            for x in range(gray.width):
                if pixels_gray[x, y] < 128:  # If it's dark (line)
                    pixels_result[x, y] = (0, 0, 0)  # Make it pure black
        
        # Save
        result.save(output_path, 'PNG', optimize=True)
        
        filename = os.path.basename(input_path)
        input_size = os.path.getsize(input_path) / 1024
        output_size = os.path.getsize(output_path) / 1024
        
        print(f"✓ {filename:<40} | {input_size:.0f}KB → {output_size:.0f}KB | Lines thickened")
        return True
        
    except Exception as e:
        print(f"✗ Error processing {input_path}: {e}")
        return False

def thicken_lines_opencv(input_path, output_path, thickness=2):
    """
    Alternative method using morphological dilation (requires OpenCV).
    This method is faster and produces cleaner results.
    """
    try:
        import cv2
        import numpy as np
        
        # Read image
        img = cv2.imread(input_path)
        
        if img is None:
            raise Exception(f"Could not read image: {input_path}")
        
        # Convert to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Threshold to get pure black/white
        _, binary = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY)
        
        # Invert so lines are white on black background
        binary = cv2.bitwise_not(binary)
        
        # Create kernel for dilation (thickening)
        kernel_size = thickness * 2 + 1  # thickness=1→3x3, thickness=2→5x5, thickness=3→7x7
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (kernel_size, kernel_size))
        
        # Dilate (thicken the lines)
        dilated = cv2.dilate(binary, kernel, iterations=1)
        
        # Optional: Smooth slightly
        dilated = cv2.GaussianBlur(dilated, (3, 3), 0)
        _, dilated = cv2.threshold(dilated, 127, 255, cv2.THRESH_BINARY)
        
        # Invert back (lines should be black on white)
        result = cv2.bitwise_not(dilated)
        
        # Convert to RGB
        result_rgb = cv2.cvtColor(result, cv2.COLOR_GRAY2BGR)
        
        # Save
        cv2.imwrite(output_path, result_rgb)
        
        filename = os.path.basename(input_path)
        input_size = os.path.getsize(input_path) / 1024
        output_size = os.path.getsize(output_path) / 1024
        
        print(f"✓ {filename:<40} | {input_size:.0f}KB → {output_size:.0f}KB | Lines thickened (OpenCV)")
        return True
        
    except ImportError:
        # OpenCV not available, fall back to PIL method
        return thicken_lines(input_path, output_path, thickness)
    except Exception as e:
        print(f"✗ Error processing {input_path}: {e}")
        return False

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description='Thicken lines in coloring page images')
    parser.add_argument('images', nargs='*', help='Image file(s) to process')
    parser.add_argument('-t', '--thickness', type=int, default=2, 
                        help='Line thickness (1=slight, 2=medium, 3=bold) [default: 2]')
    parser.add_argument('-m', '--method', choices=['pil', 'opencv'], default='opencv',
                        help='Processing method [default: opencv]')
    parser.add_argument('--all', action='store_true',
                        help='Process all PNG/JPG images in current directory')
    
    args = parser.parse_args()
    
    print("🎨 Line Thickening Tool")
    print("=" * 90)
    print(f"Thickness: {args.thickness} | Method: {args.method.upper()}")
    print()
    
    # Determine which images to process
    images_to_process = []
    
    if args.all:
        # Process all images in current directory
        for ext in ['*.png', '*.PNG', '*.jpg', '*.JPG', '*.jpeg', '*.JPEG']:
            import glob
            images_to_process.extend(glob.glob(ext))
    elif args.images:
        images_to_process = args.images
    else:
        # Default: process the problem images
        base_dir = '../frontend/public/coloring-images'
        problem_images = ['spider_man', 'squirrel', 'basketball_player']
        
        for name in problem_images:
            for ext in ['.png', '.jpg', '.PNG', '.JPG']:
                path = os.path.join(base_dir, name + ext)
                if os.path.exists(path):
                    images_to_process.append(path)
                    break
    
    if not images_to_process:
        print("❌ No images to process!")
        print()
        print("Usage:")
        print("  python thicken-lines.py                    # Process spider_man, squirrel, basketball_player")
        print("  python thicken-lines.py image1.png image2.png  # Process specific images")
        print("  python thicken-lines.py --all              # Process all images in current directory")
        print("  python thicken-lines.py image.png -t 3     # Use bold thickness")
        sys.exit(1)
    
    print(f"Processing {len(images_to_process)} image(s)...")
    print()
    
    success_count = 0
    
    for img_path in images_to_process:
        if not os.path.exists(img_path):
            print(f"⚠️  File not found: {img_path}")
            continue
        
        # Backup original
        backup_path = img_path + '.backup'
        if not os.path.exists(backup_path):
            import shutil
            shutil.copy2(img_path, backup_path)
        
        # Process
        if args.method == 'opencv':
            result = thicken_lines_opencv(img_path, img_path, args.thickness)
        else:
            result = thicken_lines(img_path, img_path, args.thickness)
        
        if result:
            success_count += 1
    
    print()
    print("=" * 90)
    print(f"✅ Processed {success_count}/{len(images_to_process)} images successfully!")
    print()
    print("💡 Tips:")
    print("  - Original images backed up with .backup extension")
    print("  - To restore: mv image.png.backup image.png")
    print("  - Adjust thickness with -t flag (1-3)")
    print("  - Use --method pil if OpenCV not available")

