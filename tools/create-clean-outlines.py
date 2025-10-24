#!/usr/bin/env python3
"""
Create clean, solid outlines from noisy coloring pages
- Connects broken/dashed lines
- Removes noise dots
- Creates consistent solid black lines
"""

from PIL import Image, ImageFilter, ImageDraw, ImageEnhance
import numpy as np
from scipy import ndimage
from scipy.ndimage import binary_dilation, binary_erosion, binary_closing, binary_opening
import os

# Images to process
images = [
    "udin_din_din_dun.png",
    "tralalero_tralala.png", 
    "thung_thung_thung_sahur.png",
    "capuchina_ballerina.png",
    "chimpanzini_bananini.png"
]

BASE_PATH = "/Users/guym/Documents/d/paiting/frontend/public/coloring-images"

def create_clean_outline(image_path):
    """
    Create clean outline with solid lines, no noise
    """
    print(f"  📝 Processing: {os.path.basename(image_path)}")
    
    # Load the original backup if it exists
    backup_path = image_path.replace('.png', '.backup-original.png')
    if os.path.exists(backup_path):
        img = Image.open(backup_path)
        print(f"     📂 Using original backup")
    else:
        img = Image.open(image_path)
    
    original_size = img.size
    print(f"     📏 Size: {original_size[0]}x{original_size[1]}")
    
    # Convert to grayscale
    if img.mode != 'L':
        img = img.convert('L')
    
    # Enhance contrast significantly
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(3.0)
    
    # Convert to numpy array
    img_array = np.array(img)
    
    # Invert if needed (black lines on white background)
    if np.mean(img_array) < 128:
        img_array = 255 - img_array
    
    # STEP 1: Aggressive threshold to get black and white
    # Use a high threshold to capture all line pixels
    threshold = 180  # More aggressive - captures more as lines
    binary = img_array < threshold
    
    # STEP 2: Connect broken lines using morphological closing
    # This connects nearby line segments
    print(f"     🔗 Connecting broken lines...")
    
    # Use a larger kernel for closing to bridge gaps
    closing_kernel = np.ones((5, 5))
    binary = binary_closing(binary, structure=closing_kernel, iterations=2)
    
    # STEP 3: Remove small isolated noise
    print(f"     🧹 Removing noise...")
    
    # Label connected components
    labeled, num_features = ndimage.label(binary)
    
    # Calculate size of each component
    component_sizes = np.bincount(labeled.ravel())
    
    # Remove components smaller than threshold (these are noise dots)
    min_size = 50  # pixels - anything smaller is noise
    too_small = component_sizes < min_size
    too_small_mask = too_small[labeled]
    
    # Keep only large components (actual lines)
    binary = binary & ~too_small_mask
    
    # STEP 4: Thicken lines to make them more visible
    print(f"     🖊️  Thickening lines...")
    
    # Dilate to thicken lines
    dilation_kernel = np.ones((3, 3))
    binary = binary_dilation(binary, structure=dilation_kernel, iterations=1)
    
    # STEP 5: Smooth the lines
    # Apply opening to smooth out jagged edges
    smoothing_kernel = np.ones((2, 2))
    binary = binary_opening(binary, structure=smoothing_kernel, iterations=1)
    
    # Final closing to ensure solid lines
    binary = binary_closing(binary, structure=np.ones((3, 3)), iterations=1)
    
    # Convert back to 0-255 range
    result_array = np.where(binary, 0, 255).astype(np.uint8)
    
    # Convert to PIL Image
    result_img = Image.fromarray(result_array, 'L')
    
    # Apply slight gaussian blur and re-threshold for smoother edges
    result_img = result_img.filter(ImageFilter.GaussianBlur(radius=0.3))
    result_array = np.array(result_img)
    result_array = np.where(result_array < 128, 0, 255).astype(np.uint8)
    result_img = Image.fromarray(result_array, 'L')
    
    # Convert to RGB
    result_img = result_img.convert('RGB')
    
    # Save
    result_img.save(image_path, 'PNG', optimize=True)
    print(f"     ✅ Saved clean outline")
    
    size_mb = os.path.getsize(image_path) / (1024 * 1024)
    print(f"     📦 Size: {size_mb:.2f} MB")
    
    # Count remaining black pixels to verify we have content
    result_check = np.array(result_img.convert('L'))
    black_pixels = np.sum(result_check < 128)
    total_pixels = result_check.size
    line_percentage = (black_pixels / total_pixels) * 100
    print(f"     📊 Line coverage: {line_percentage:.1f}%")
    print()

def main():
    print("🎨 Creating Clean Coloring Page Outlines")
    print("=" * 60)
    print()
    print("This will:")
    print("  • Connect broken/dashed lines")
    print("  • Remove noise dots and artifacts")
    print("  • Create solid, thick black lines")
    print("  • Perfect for coloring!")
    print()
    
    processed = 0
    failed = 0
    
    for image_name in images:
        image_path = os.path.join(BASE_PATH, image_name)
        
        if not os.path.exists(image_path):
            print(f"  ❌ Not found: {image_name}")
            failed += 1
            continue
        
        try:
            create_clean_outline(image_path)
            processed += 1
        except Exception as e:
            print(f"  ❌ Error processing {image_name}: {e}")
            import traceback
            traceback.print_exc()
            failed += 1
    
    print("=" * 60)
    print(f"✅ Successfully processed: {processed} images")
    if failed > 0:
        print(f"❌ Failed: {failed} images")
    print()
    print("🔄 HARD REFRESH your browser to see changes:")
    print("   Mac: Cmd + Shift + R")
    print("   Windows: Ctrl + Shift + F5")

if __name__ == "__main__":
    main()





