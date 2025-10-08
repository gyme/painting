#!/usr/bin/env python3
"""
Gentle Background Cleaner - Preserves line art quality
======================================================
Removes grey/colored backgrounds and replaces with pure white,
while carefully preserving all line art and details.
"""

from PIL import Image
import os
import sys

def clean_background_gently(input_path, output_path, 
                            bg_min_brightness=180,
                            preserve_below=150):
    """
    Gently clean background - only touch clearly non-line pixels.
    
    Args:
        input_path: Input image
        output_path: Output image
        bg_min_brightness: Pixels brighter than this → white (default: 180)
        preserve_below: Never touch pixels darker than this (default: 150)
    """
    try:
        # Open image
        img = Image.open(input_path).convert('RGB')
        pixels = img.load()
        width, height = img.size
        
        changed_pixels = 0
        
        # Process each pixel very conservatively
        for y in range(height):
            for x in range(width):
                r, g, b = pixels[x, y]
                avg = (r + g + b) / 3
                
                # PRESERVE: Never touch dark pixels (these are lines/details)
                if avg < preserve_below:
                    continue
                
                # CLEAN: Only clean clearly bright background pixels
                if avg >= bg_min_brightness:
                    pixels[x, y] = (255, 255, 255)
                    changed_pixels += 1
                # MIDDLE GROUND: For medium pixels, check if they're greyish
                elif avg >= preserve_below:
                    # Calculate color variance - grey pixels have low variance
                    variance = max(r, g, b) - min(r, g, b)
                    
                    # If it's fairly grey and fairly bright, make it white
                    if variance < 30 and avg > 170:
                        pixels[x, y] = (255, 255, 255)
                        changed_pixels += 1
        
        # Save
        img.save(output_path, "PNG", optimize=True)
        
        # Stats
        input_size = os.path.getsize(input_path)
        output_size = os.path.getsize(output_path)
        reduction = ((input_size - output_size) / input_size * 100) if input_size > 0 else 0
        
        filename = os.path.basename(input_path)
        if changed_pixels > 0:
            print(f"✓ {filename:<40} | {input_size/1024:.1f}KB → {output_size/1024:.1f}KB | {changed_pixels:,} pixels cleaned")
        else:
            print(f"⊘ {filename:<40} | Already clean (no changes needed)")
        
        return True
        
    except Exception as e:
        print(f"✗ Error processing {input_path}: {e}")
        import traceback
        traceback.print_exc()
        return False

def process_directory(input_dir, output_dir=None, 
                     bg_min_brightness=180,
                     preserve_below=150,
                     backup=True):
    """Process all images gently."""
    
    if output_dir is None:
        output_dir = input_dir
    
    # Create backup if processing in-place
    if backup and output_dir == input_dir:
        backup_dir = os.path.join(os.path.dirname(input_dir), 'coloring-images-gentle-backup')
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
    print(f"{'Image':<40} | {'Size Change'}")
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
        
        if clean_background_gently(input_path, output_path, 
                                   bg_min_brightness, preserve_below):
            processed += 1
            total_output_size += os.path.getsize(output_path)
    
    print("=" * 100)
    print(f"\n✅ Successfully processed {processed}/{len(image_files)} images")
    
    if total_input_size > 0:
        total_reduction = ((total_input_size - total_output_size) / total_input_size * 100)
        print(f"📊 Total size: {total_input_size/1024/1024:.1f}MB → {total_output_size/1024/1024:.1f}MB ({total_reduction:+.0f}%)")
    
    if backup_dir:
        print(f"📦 Originals backed up to: {backup_dir}")
    
    print("\n✨ Background cleaned while preserving all line art quality!")

if __name__ == "__main__":
    print("🎨 Gentle Background Cleaner - Preserves Line Art")
    print("=" * 100)
    
    if len(sys.argv) < 2:
        print("\nUsage: python gentle-background-cleaner.py <input_directory> [options]")
        print("\nOptions:")
        print("  [output_directory]    Output directory (default: same as input)")
        print("  [bg_min_brightness]   Clean pixels brighter than this (default: 180)")
        print("  [preserve_below]      Never touch pixels darker than this (default: 150)")
        print("\nExample:")
        print("  python gentle-background-cleaner.py ../frontend/public/coloring-images")
        print("\nThis will GENTLY clean backgrounds while preserving:")
        print("  ✓ All line art (black lines)")
        print("  ✓ All anti-aliasing and smoothing")
        print("  ✓ All fine details")
        sys.exit(1)
    
    input_dir = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else input_dir
    bg_min_brightness = int(sys.argv[3]) if len(sys.argv) > 3 else 180
    preserve_below = int(sys.argv[4]) if len(sys.argv) > 4 else 150
    
    print(f"Input directory:     {input_dir}")
    print(f"Output directory:    {output_dir}")
    print(f"Clean brightness ≥:  {bg_min_brightness} (make white)")
    print(f"Preserve darkness <: {preserve_below} (never touch)")
    print("=" * 100)
    
    if output_dir == input_dir:
        print("\n⚠️  Processing images IN-PLACE (originals will be backed up)")
        response = input("Continue? (y/N): ")
        if response.lower() not in ['y', 'yes']:
            print("Cancelled.")
            sys.exit(0)
        print()
    
    process_directory(input_dir, output_dir, bg_min_brightness, preserve_below)

