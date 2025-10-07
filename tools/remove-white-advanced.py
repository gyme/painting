from PIL import Image, ImageFilter
import os
import sys

def remove_white_advanced(input_path, output_path, threshold=240, edge_blur=True):
    """
    Advanced white background removal with edge handling.
    """
    try:
        # Open image
        img = Image.open(input_path)
        
        # Convert to RGBA if not already
        img = img.convert("RGBA")
        
        # Get image data
        pixels = img.load()
        width, height = img.size
        
        # First pass: make white pixels transparent
        for y in range(height):
            for x in range(width):
                r, g, b, a = pixels[x, y]
                
                # If pixel is light (above threshold), make it transparent
                if r > threshold and g > threshold and b > threshold:
                    pixels[x, y] = (255, 255, 255, 0)
                # Also handle light gray anti-aliasing pixels
                elif r > threshold - 50 and g > threshold - 50 and b > threshold - 50:
                    # Make semi-transparent based on how light it is
                    avg = (r + g + b) / 3
                    alpha = max(0, min(255, int((threshold - avg) * 5)))
                    pixels[x, y] = (r, g, b, alpha)
        
        # Optional: Blur alpha channel slightly to smooth edges
        if edge_blur:
            # Extract alpha channel
            alpha_channel = img.split()[3]
            # Blur it slightly
            alpha_channel = alpha_channel.filter(ImageFilter.GaussianBlur(0.5))
            # Put it back
            r, g, b, _ = img.split()
            img = Image.merge("RGBA", (r, g, b, alpha_channel))
        
        # Save as PNG
        img.save(output_path, "PNG")
        print(f"✓ Processed: {os.path.basename(input_path)}")
        return True
        
    except Exception as e:
        print(f"✗ Error processing {input_path}: {e}")
        return False

def process_directory(input_dir, output_dir=None, threshold=240, edge_blur=True):
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
            
            if remove_white_advanced(input_path, output_path, threshold, edge_blur):
                processed += 1
    
    print(f"\n✓ Successfully processed {processed} images")
    if skipped > 0:
        print(f"⊘ Skipped {skipped} non-image files")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python remove-white-advanced.py <input_directory> [output_directory] [threshold] [edge_blur]")
        print("Example: python remove-white-advanced.py ../frontend/public/coloring-images . 200 True")
        sys.exit(1)
    
    input_dir = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else input_dir
    threshold = int(sys.argv[3]) if len(sys.argv) > 3 else 200
    edge_blur = sys.argv[4].lower() != 'false' if len(sys.argv) > 4 else True
    
    print(f"Processing images in: {input_dir}")
    print(f"Output directory: {output_dir}")
    print(f"White threshold: {threshold}")
    print(f"Edge blur: {edge_blur}")
    print("=" * 50)
    
    process_directory(input_dir, output_dir, threshold, edge_blur)
