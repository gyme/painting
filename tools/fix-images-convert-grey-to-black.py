from PIL import Image
import os
import sys

def fix_image_convert_grey_to_black(input_path, output_path, black_threshold=150, pure_black_threshold=80):
    """
    Fix coloring images by:
    1. Converting grey/light pixels to pure black (the outline)
    2. Converting white/very light pixels to transparent
    
    Args:
        input_path: Path to input image
        output_path: Path to save output image
        black_threshold: Pixels darker than this become black (0-255)
        pure_black_threshold: Pixels this dark or darker are kept as-is
    """
    try:
        # Open image
        img = Image.open(input_path)
        
        # Convert to RGBA if not already
        img = img.convert("RGBA")
        
        # Get image data
        pixels = img.load()
        width, height = img.size
        
        # Process each pixel
        for y in range(height):
            for x in range(width):
                r, g, b, a = pixels[x, y]
                
                # Calculate average brightness
                avg = (r + g + b) / 3
                
                # If it's already very dark (pure black lines), keep it
                if avg < pure_black_threshold:
                    pixels[x, y] = (r, g, b, 255)
                
                # If it's medium dark (grey anti-aliasing), convert to pure black
                elif avg < black_threshold:
                    pixels[x, y] = (0, 0, 0, 255)
                
                # If it's light (white background/halo), make transparent
                else:
                    pixels[x, y] = (255, 255, 255, 0)
        
        # Save as PNG with transparency
        img.save(output_path, "PNG", optimize=True)
        print(f"✓ Fixed: {os.path.basename(input_path)}")
        return True
        
    except Exception as e:
        print(f"✗ Error processing {input_path}: {e}")
        import traceback
        traceback.print_exc()
        return False

def process_directory(input_dir, output_dir=None, black_threshold=150, pure_black_threshold=80):
    """Process all images in a directory."""
    if output_dir is None:
        output_dir = input_dir
    
    os.makedirs(output_dir, exist_ok=True)
    
    # Supported formats
    extensions = ('.png', '.jpg', '.jpeg')
    
    processed = 0
    skipped = 0
    
    for filename in os.listdir(input_dir):
        if filename.lower().endswith(extensions):
            # Skip text files and README
            if filename in ['PLACE_IMAGES_HERE.txt', 'README.md', 'README.txt']:
                skipped += 1
                continue
                
            input_path = os.path.join(input_dir, filename)
            
            # Always save as PNG for transparency
            output_filename = os.path.splitext(filename)[0] + '.png'
            output_path = os.path.join(output_dir, output_filename)
            
            if fix_image_convert_grey_to_black(input_path, output_path, black_threshold, pure_black_threshold):
                processed += 1
    
    print(f"\n✓ Successfully processed {processed} images")
    if skipped > 0:
        print(f"⊘ Skipped {skipped} non-image files")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python fix-images-convert-grey-to-black.py <input_directory> [output_directory] [black_threshold] [pure_black_threshold]")
        print("\nParameters:")
        print("  black_threshold: Pixels with avg < this become black (default: 150)")
        print("  pure_black_threshold: Pixels this dark are kept as-is (default: 80)")
        print("\nExample: python fix-images-convert-grey-to-black.py ../frontend/public/coloring-images")
        sys.exit(1)
    
    input_dir = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else input_dir
    black_threshold = int(sys.argv[3]) if len(sys.argv) > 3 else 150
    pure_black_threshold = int(sys.argv[4]) if len(sys.argv) > 4 else 80
    
    print(f"Processing images in: {input_dir}")
    print(f"Output directory: {output_dir}")
    print(f"Black threshold: {black_threshold}")
    print(f"Pure black threshold: {pure_black_threshold}")
    print("=" * 60)
    print("Converting grey anti-aliasing to pure black...")
    print("Converting white/light pixels to transparent...")
    print("=" * 60)
    
    process_directory(input_dir, output_dir, black_threshold, pure_black_threshold)
