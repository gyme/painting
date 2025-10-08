#!/usr/bin/env python3
"""
Professional Coloring Book Image Cleaner
=========================================
Transforms images into clean, professional coloring book pages:
- Pure white background (#FFFFFF)
- Crisp black lines (#000000)
- No grey halos or artifacts
- Professional printed coloring book appearance
"""

from PIL import Image, ImageEnhance, ImageFilter
import os
import sys

def clean_coloring_image(input_path, output_path, 
                         black_threshold=128,
                         white_threshold=200,
                         contrast_boost=1.5,
                         sharpen=True):
    """
    Clean and enhance coloring book image for professional appearance.
    
    Args:
        input_path: Input image path
        output_path: Output image path
        black_threshold: Pixels darker than this become pure black (0-255)
        white_threshold: Pixels lighter than this become pure white (0-255)
        contrast_boost: Contrast enhancement factor (1.0 = no change, 2.0 = double)
        sharpen: Apply sharpening filter for crisp lines
    """
    try:
        # Open and convert to RGB
        img = Image.open(input_path).convert('RGB')
        
        # Step 1: Increase contrast to separate lines from background
        if contrast_boost > 1.0:
            enhancer = ImageEnhance.Contrast(img)
            img = enhancer.enhance(contrast_boost)
        
        # Step 2: Sharpen lines for crisp edges
        if sharpen:
            img = img.filter(ImageFilter.SHARPEN)
        
        # Step 3: Convert to black and white with thresholds
        pixels = img.load()
        width, height = img.size
        
        processed_count = 0
        for y in range(height):
            for x in range(width):
                r, g, b = pixels[x, y]
                
                # Calculate average brightness
                avg = (r + g + b) / 3
                
                # Pure black for dark pixels (lines)
                if avg < black_threshold:
                    pixels[x, y] = (0, 0, 0)
                    processed_count += 1
                # Pure white for light pixels (background)
                elif avg > white_threshold:
                    pixels[x, y] = (255, 255, 255)
                # Grey pixels in between - decide based on which threshold they're closer to
                else:
                    # Distance to black threshold vs white threshold
                    distance_to_black = abs(avg - black_threshold)
                    distance_to_white = abs(avg - white_threshold)
                    
                    if distance_to_black < distance_to_white:
                        pixels[x, y] = (0, 0, 0)  # Closer to black
                        processed_count += 1
                    else:
                        pixels[x, y] = (255, 255, 255)  # Closer to white
        
        # Step 4: Final pass - remove any remaining grey halos
        # Apply median filter to clean up stray pixels
        img = img.filter(ImageFilter.MedianFilter(size=3))
        
        # Step 5: One more sharpening pass for ultra-crisp lines
        if sharpen:
            img = img.filter(ImageFilter.SHARPEN)
        
        # Save as optimized PNG
        img.save(output_path, "PNG", optimize=True)
        
        # Calculate file size reduction
        input_size = os.path.getsize(input_path)
        output_size = os.path.getsize(output_path)
        reduction = ((input_size - output_size) / input_size * 100) if input_size > 0 else 0
        
        print(f"✓ {os.path.basename(input_path):<40} | {input_size/1024:.1f}KB → {output_size/1024:.1f}KB ({reduction:+.0f}%)")
        return True
        
    except Exception as e:
        print(f"✗ Error processing {input_path}: {e}")
        import traceback
        traceback.print_exc()
        return False

def process_directory(input_dir, output_dir=None, 
                     black_threshold=128,
                     white_threshold=200,
                     contrast_boost=1.5,
                     sharpen=True,
                     backup=True):
    """Process all images in a directory."""
    
    # Default: process in-place
    if output_dir is None:
        output_dir = input_dir
    
    # Create backup if processing in-place
    if backup and output_dir == input_dir:
        backup_dir = os.path.join(os.path.dirname(input_dir), 'coloring-images-before-cleaning')
        os.makedirs(backup_dir, exist_ok=True)
        print(f"📦 Backup directory: {backup_dir}")
        print("=" * 80)
    else:
        backup_dir = None
    
    os.makedirs(output_dir, exist_ok=True)
    
    # Supported formats
    extensions = ('.png', '.jpg', '.jpeg')
    
    # Get all image files
    image_files = []
    for filename in sorted(os.listdir(input_dir)):
        if filename.lower().endswith(extensions):
            # Skip text files
            if filename in ['PLACE_IMAGES_HERE.txt', 'README.md', 'README.txt']:
                continue
            image_files.append(filename)
    
    if not image_files:
        print("⚠️  No images found!")
        return
    
    print(f"Found {len(image_files)} images to process")
    print("=" * 80)
    print(f"{'Image':<40} | {'Size Reduction'}")
    print("=" * 80)
    
    processed = 0
    total_input_size = 0
    total_output_size = 0
    
    for filename in image_files:
        input_path = os.path.join(input_dir, filename)
        
        # Backup original if requested
        if backup_dir:
            import shutil
            backup_path = os.path.join(backup_dir, filename)
            if not os.path.exists(backup_path):
                shutil.copy2(input_path, backup_path)
        
        # Always save as PNG for quality
        output_filename = os.path.splitext(filename)[0] + '.png'
        output_path = os.path.join(output_dir, output_filename)
        
        # Track sizes
        total_input_size += os.path.getsize(input_path)
        
        if clean_coloring_image(input_path, output_path, 
                                black_threshold, white_threshold, 
                                contrast_boost, sharpen):
            processed += 1
            total_output_size += os.path.getsize(output_path)
    
    # Summary
    print("=" * 80)
    print(f"\n✅ Successfully processed {processed}/{len(image_files)} images")
    
    if total_input_size > 0:
        total_reduction = ((total_input_size - total_output_size) / total_input_size * 100)
        print(f"📊 Total size: {total_input_size/1024/1024:.1f}MB → {total_output_size/1024/1024:.1f}MB ({total_reduction:+.0f}%)")
    
    if backup_dir:
        print(f"📦 Originals backed up to: {backup_dir}")
    
    print("\n✨ All images now have professional coloring book appearance!")
    print("   - Pure white backgrounds")
    print("   - Crisp black lines")
    print("   - No grey halos")

if __name__ == "__main__":
    print("🎨 Professional Coloring Book Image Cleaner")
    print("=" * 80)
    
    if len(sys.argv) < 2:
        print("\nUsage: python professional-coloring-cleaner.py <input_directory> [options]")
        print("\nOptions:")
        print("  [output_directory]   Output directory (default: same as input)")
        print("  [black_threshold]    Pixels darker than this → black (default: 128)")
        print("  [white_threshold]    Pixels lighter than this → white (default: 200)")
        print("  [contrast_boost]     Contrast enhancement (default: 1.5)")
        print("  [sharpen]            Apply sharpening (default: True)")
        print("\nExample:")
        print("  python professional-coloring-cleaner.py ../frontend/public/coloring-images")
        print("\nThis will create clean, professional coloring book images with:")
        print("  ✓ Pure white background (#FFFFFF)")
        print("  ✓ Crisp black lines (#000000)")
        print("  ✓ No grey halos or artifacts")
        sys.exit(1)
    
    input_dir = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else input_dir
    black_threshold = int(sys.argv[3]) if len(sys.argv) > 3 else 128
    white_threshold = int(sys.argv[4]) if len(sys.argv) > 4 else 200
    contrast_boost = float(sys.argv[5]) if len(sys.argv) > 5 else 1.5
    sharpen = sys.argv[6].lower() != 'false' if len(sys.argv) > 6 else True
    
    print(f"Input directory:  {input_dir}")
    print(f"Output directory: {output_dir}")
    print(f"Black threshold:  {black_threshold} (darker → black)")
    print(f"White threshold:  {white_threshold} (lighter → white)")
    print(f"Contrast boost:   {contrast_boost}x")
    print(f"Sharpen lines:    {sharpen}")
    print("=" * 80)
    
    # Confirm if processing in-place
    if output_dir == input_dir:
        print("\n⚠️  Processing images IN-PLACE (originals will be backed up)")
        response = input("Continue? (y/N): ")
        if response.lower() not in ['y', 'yes']:
            print("Cancelled.")
            sys.exit(0)
        print()
    
    process_directory(input_dir, output_dir, black_threshold, white_threshold, 
                     contrast_boost, sharpen)

