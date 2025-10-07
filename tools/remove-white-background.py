from PIL import Image
import os
import sys

def remove_white_background(input_path, output_path, threshold=240):
    """
    Remove white background from an image and make it transparent.
    
    Args:
        input_path: Path to input image
        output_path: Path to save output image
        threshold: RGB value threshold (0-255). Pixels with all RGB values above this become transparent.
    """
    try:
        # Open image
        img = Image.open(input_path)
        
        # Convert to RGBA if not already
        img = img.convert("RGBA")
        
        # Get image data
        datas = img.getdata()
        
        new_data = []
        for item in datas:
            # If pixel is mostly white (above threshold), make it transparent
            if item[0] > threshold and item[1] > threshold and item[2] > threshold:
                new_data.append((255, 255, 255, 0))  # Transparent
            else:
                new_data.append(item)
        
        # Update image data
        img.putdata(new_data)
        
        # Save as PNG (supports transparency)
        img.save(output_path, "PNG")
        print(f"✓ Processed: {os.path.basename(input_path)}")
        return True
        
    except Exception as e:
        print(f"✗ Error processing {input_path}: {e}")
        return False

def process_directory(input_dir, output_dir=None, threshold=240):
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
            
            if remove_white_background(input_path, output_path, threshold):
                processed += 1
    
    print(f"\n✓ Successfully processed {processed} images")
    if skipped > 0:
        print(f"⊘ Skipped {skipped} non-image files")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python remove-white-background.py <input_directory> [output_directory] [threshold]")
        print("Example: python remove-white-background.py ../frontend/public/coloring-images")
        sys.exit(1)
    
    input_dir = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else input_dir
    threshold = int(sys.argv[3]) if len(sys.argv) > 3 else 240
    
    print(f"Processing images in: {input_dir}")
    print(f"Output directory: {output_dir}")
    print(f"White threshold: {threshold}")
    print("=" * 50)
    
    process_directory(input_dir, output_dir, threshold)
