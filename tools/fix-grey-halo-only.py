from PIL import Image
import os
import sys

def fix_grey_halo_only(input_path, output_path):
    """
    CAREFULLY fix only the grey anti-aliasing halo without destroying the image.
    
    Strategy:
    - Keep black lines (avg < 50): unchanged
    - Keep white areas and colored areas (50-220): unchanged  
    - Fix light grey halo (220-250): make more transparent
    - Fix very light grey/white (>250): make transparent
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
                
                # Keep very dark pixels (pure black lines) - unchanged
                if avg < 50:
                    pixels[x, y] = (r, g, b, 255)
                
                # Keep medium range (colored areas and white fill areas) - unchanged
                elif avg < 220:
                    pixels[x, y] = (r, g, b, 255)
                
                # Light grey halo (anti-aliasing) - reduce opacity based on brightness
                elif avg < 250:
                    # Gradually fade these out
                    alpha_value = int((250 - avg) * 8)  # Maps 220-250 to some transparency
                    pixels[x, y] = (r, g, b, alpha_value)
                
                # Very light/white - make fully transparent
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

def process_directory(input_dir, output_dir=None):
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
            
            if fix_grey_halo_only(input_path, output_path):
                processed += 1
    
    print(f"\n✓ Successfully processed {processed} images")
    if skipped > 0:
        print(f"⊘ Skipped {skipped} non-image files")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python fix-grey-halo-only.py <input_directory> [output_directory]")
        print("\nThis script CAREFULLY removes only the light grey anti-aliasing halo")
        print("without destroying the actual image content.")
        print("\nExample: python fix-grey-halo-only.py ../frontend/public/coloring-images")
        sys.exit(1)
    
    input_dir = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else input_dir
    
    print(f"Processing images in: {input_dir}")
    print(f"Output directory: {output_dir}")
    print("=" * 60)
    print("Carefully removing light grey anti-aliasing halo only...")
    print("Preserving all image content and black lines...")
    print("=" * 60)
    
    process_directory(input_dir, output_dir)
