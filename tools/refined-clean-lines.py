#!/usr/bin/env python3
"""
Create refined clean outlines - balanced approach
- Clean lines without noise
- Moderate thickness
- Preserves details
"""

from PIL import Image, ImageFilter, ImageEnhance
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

def create_refined_outline(image_path):
    """
    Create clean outline with moderate lines, preserving details
    """
    print(f"  📝 Processing: {os.path.basename(image_path)}")
    
    # Load the original backup
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
    
    # Moderate contrast enhancement
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(2.5)
    
    # Sharpen slightly to make edges clearer
    img = img.filter(ImageFilter.SHARPEN)
    
    # Convert to numpy array
    img_array = np.array(img)
    
    # Invert if needed
    if np.mean(img_array) < 128:
        img_array = 255 - img_array
    
    # STEP 1: Threshold - more conservative to preserve details
    print(f"     🎯 Extracting lines...")
    threshold = 190  # More conservative threshold
    binary = img_array < threshold
    
    # STEP 2: Light morphological closing to connect very close lines only
    # Use smaller kernel to avoid filling in details
    print(f"     🔗 Connecting close lines...")
    closing_kernel = np.ones((3, 3))  # Smaller kernel
    binary = binary_closing(binary, structure=closing_kernel, iterations=1)
    
    # STEP 3: Remove small noise but keep detail features
    print(f"     🧹 Removing small noise...")
    
    # Label connected components
    labeled, num_features = ndimage.label(binary)
    
    # Calculate size of each component
    component_sizes = np.bincount(labeled.ravel())
    
    # Remove only very small components (noise dots)
    min_size = 30  # Smaller threshold to preserve detail features
    too_small = component_sizes < min_size
    too_small_mask = too_small[labeled]
    
    # Keep larger components
    binary = binary & ~too_small_mask
    
    # STEP 4: Very light dilation to slightly thicken lines
    print(f"     🖊️  Slight line thickening...")
    
    # Only 1 iteration of dilation with small kernel
    dilation_kernel = np.ones((2, 2))  # Smaller kernel
    binary = binary_dilation(binary, structure=dilation_kernel, iterations=1)
    
    # STEP 5: Gentle smoothing
    # Light opening to smooth without losing detail
    smoothing_kernel = np.ones((2, 2))
    binary = binary_opening(binary, structure=smoothing_kernel, iterations=1)
    
    # Convert back to 0-255 range
    result_array = np.where(binary, 0, 255).astype(np.uint8)
    
    # Convert to PIL Image
    result_img = Image.fromarray(result_array, 'L')
    
    # Very light gaussian blur for smooth edges
    result_img = result_img.filter(ImageFilter.GaussianBlur(radius=0.2))
    
    # Final threshold
    result_array = np.array(result_img)
    result_array = np.where(result_array < 128, 0, 255).astype(np.uint8)
    result_img = Image.fromarray(result_array, 'L')
    
    # Convert to RGB
    result_img = result_img.convert('RGB')
    
    # Save
    result_img.save(image_path, 'PNG', optimize=True)
    print(f"     ✅ Saved refined outline")
    
    size_mb = os.path.getsize(image_path) / (1024 * 1024)
    print(f"     📦 Size: {size_mb:.2f} MB")
    
    # Check line coverage
    result_check = np.array(result_img.convert('L'))
    black_pixels = np.sum(result_check < 128)
    total_pixels = result_check.size
    line_percentage = (black_pixels / total_pixels) * 100
    print(f"     📊 Line coverage: {line_percentage:.1f}%")
    print()

def main():
    print("🎨 Creating Refined Clean Outlines")
    print("=" * 60)
    print()
    print("Balanced approach:")
    print("  ✓ Clean solid lines (no dashes/dots)")
    print("  ✓ Moderate line thickness")
    print("  ✓ Preserves details and small features")
    print("  ✓ Perfect for coloring!")
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
            create_refined_outline(image_path)
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
    print("🔄 HARD REFRESH your browser:")
    print("   Mac: Cmd + Shift + R")
    print("   Windows: Ctrl + Shift + F5")

if __name__ == "__main__":
    main()





