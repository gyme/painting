import cv2
import numpy as np
import os
import sys

def remove_white_halo_opencv(input_path, output_path, dilate_amount=2):
    """
    Remove white halo by expanding black lines and removing white background.
    """
    try:
        # Read image
        img = cv2.imread(input_path, cv2.IMREAD_UNCHANGED)
        
        # Convert to BGRA if needed
        if len(img.shape) == 2:  # Grayscale
            img = cv2.cvtColor(img, cv2.COLOR_GRAY2BGRA)
        elif img.shape[2] == 3:  # BGR
            img = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
        
        # Create a mask of dark pixels (the black lines and dark areas)
        # These are the pixels we want to KEEP
        gray = cv2.cvtColor(img, cv2.COLOR_BGRA2GRAY)
        _, dark_mask = cv2.threshold(gray, 50, 255, cv2.THRESH_BINARY_INV)
        
        # Dilate (expand) the black lines to cover white halos
        kernel = np.ones((dilate_amount, dilate_amount), np.uint8)
        dark_mask_dilated = cv2.dilate(dark_mask, kernel, iterations=1)
        
        # Create transparency mask
        # Everything that's not a dilated dark line becomes transparent
        alpha_mask = np.zeros(img.shape[:2], dtype=np.uint8)
        
        # For each pixel:
        for y in range(img.shape[0]):
            for x in range(img.shape[1]):
                b, g, r, a = img[y, x]
                
                # If it's in the dilated dark area, keep it fully opaque
                if dark_mask_dilated[y, x] > 0:
                    alpha_mask[y, x] = 255
                # If it's light (potential white halo or background)
                elif b > 150 and g > 150 and r > 150:
                    alpha_mask[y, x] = 0  # Make transparent
                # If it's medium (might be colored areas)
                else:
                    # Keep it but check if it's very light
                    avg = (int(b) + int(g) + int(r)) / 3
                    if avg > 200:
                        alpha_mask[y, x] = 0
                    else:
                        alpha_mask[y, x] = 255
        
        # Apply the alpha mask
        img[:, :, 3] = alpha_mask
        
        # Save result
        cv2.imwrite(output_path, img)
        print(f"✓ Processed: {os.path.basename(input_path)}")
        return True
        
    except Exception as e:
        print(f"✗ Error processing {input_path}: {e}")
        import traceback
        traceback.print_exc()
        return False

def process_directory(input_dir, output_dir=None, dilate_amount=2):
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
            
            if remove_white_halo_opencv(input_path, output_path, dilate_amount):
                processed += 1
    
    print(f"\n✓ Successfully processed {processed} images")
    if skipped > 0:
        print(f"⊘ Skipped {skipped} non-image files")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python remove-halo-opencv.py <input_directory> [output_directory] [dilate_amount]")
        print("Example: python remove-halo-opencv.py ../frontend/public/coloring-images . 2")
        print("Dilate amount: 1-3 pixels (higher = more aggressive line expansion)")
        sys.exit(1)
    
    input_dir = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else input_dir
    dilate_amount = int(sys.argv[3]) if len(sys.argv) > 3 else 2
    
    print(f"Processing images in: {input_dir}")
    print(f"Output directory: {output_dir}")
    print(f"Dilate amount: {dilate_amount} pixels")
    print("=" * 50)
    
    process_directory(input_dir, output_dir, dilate_amount)
