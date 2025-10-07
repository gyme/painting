from PIL import Image, ImageFilter
import os
import sys

def remove_white_halo(input_path, output_path, aggressive=True):
    """
    Ultra-aggressive white halo removal.
    """
    try:
        # Open image
        img = Image.open(input_path)
        
        # Convert to RGBA
        img = img.convert("RGBA")
        
        # Get pixel data
        pixels = img.load()
        width, height = img.size
        
        # Ultra-aggressive: Any pixel that's not dark becomes transparent
        for y in range(height):
            for x in range(width):
                r, g, b, a = pixels[x, y]
                
                # Only keep truly dark pixels (black lines and very dark colors)
                # Everything else becomes transparent
                if aggressive:
                    # If ANY channel is above 100, make it transparent
                    if r > 100 or g > 100 or b > 100:
                        pixels[x, y] = (255, 255, 255, 0)
                    # If it's dark gray (all channels between 30-100), reduce alpha
                    elif r > 30 or g > 30 or b > 30:
                        # Keep it but make it semi-transparent to remove halos
                        avg = (r + g + b) / 3
                        alpha = int((100 - avg) * 2.55)  # Scale darkness to alpha
                        pixels[x, y] = (r, g, b, min(255, alpha))
                else:
                    # Less aggressive version
                    avg = (r + g + b) / 3
                    if avg > 200:
                        pixels[x, y] = (255, 255, 255, 0)
                    elif avg > 100:
                        alpha = int((200 - avg) * 2.55)
                        pixels[x, y] = (r, g, b, alpha)
        
        # Save as PNG
        img.save(output_path, "PNG", optimize=True)
        print(f"✓ Processed: {os.path.basename(input_path)}")
        return True
        
    except Exception as e:
        print(f"✗ Error processing {input_path}: {e}")
        return False

def process_directory(input_dir, output_dir=None, aggressive=True):
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
            
            if remove_white_halo(input_path, output_path, aggressive):
                processed += 1
    
    print(f"\n✓ Successfully processed {processed} images")
    if skipped > 0:
        print(f"⊘ Skipped {skipped} non-image files")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python remove-white-halo.py <input_directory> [output_directory] [aggressive=True]")
        print("Example: python remove-white-halo.py ../frontend/public/coloring-images")
        sys.exit(1)
    
    input_dir = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else input_dir
    aggressive = sys.argv[3].lower() != 'false' if len(sys.argv) > 3 else True
    
    print(f"Processing images in: {input_dir}")
    print(f"Output directory: {output_dir}")
    print(f"Aggressive mode: {aggressive}")
    print("=" * 50)
    
    process_directory(input_dir, output_dir, aggressive)
