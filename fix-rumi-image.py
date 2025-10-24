#!/usr/bin/env python3
"""
Fix Rumi image: Remove greyscale and make lines thicker
"""

from PIL import Image, ImageOps, ImageEnhance
import numpy as np
import cv2

IMAGE_PATH = "frontend/public/coloring-images/rumi.png"

def fix_rumi_image():
    print("🎨 Fixing Rumi image...")
    print("="*80)
    
    # Open image
    img = Image.open(IMAGE_PATH)
    print(f"Original size: {img.size}")
    print(f"Original mode: {img.mode}")
    
    # Convert to RGB if needed
    if img.mode in ('RGBA', 'LA', 'P'):
        if img.mode == 'P':
            img = img.convert('RGBA')
        background = Image.new('RGB', img.size, (255, 255, 255))
        if img.mode in ('RGBA', 'LA'):
            background.paste(img, mask=img.split()[-1] if len(img.split()) > 3 else None)
        img = background
    elif img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Convert to greyscale first
    img = img.convert('L')
    
    # Increase contrast
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(2.0)
    
    # Apply threshold to make it pure black and white (no greyscale)
    # Lower threshold = more black (thicker lines)
    threshold = 180  # Lower value = thicker lines
    img = img.point(lambda x: 255 if x > threshold else 0)
    
    # Convert to numpy array for morphological operations
    img_array = np.array(img)
    
    # Invert so lines are white on black (for dilation)
    img_array_inv = cv2.bitwise_not(img_array)
    
    # Create kernel for thickening
    kernel = np.ones((2, 2), np.uint8)  # Small kernel for moderate thickening
    
    # Dilate to thicken lines
    img_array_thick = cv2.dilate(img_array_inv, kernel, iterations=1)
    
    # Invert back
    img_array_final = cv2.bitwise_not(img_array_thick)
    
    # Convert back to PIL
    img_final = Image.fromarray(img_array_final)
    
    # Convert to RGB for consistency
    img_final = img_final.convert('RGB')
    
    # Save as PNG
    img_final.save(IMAGE_PATH, 'PNG', optimize=True)
    print(f"✅ Saved PNG: {IMAGE_PATH}")
    
    # Save as WebP
    webp_path = IMAGE_PATH.replace('.png', '.webp')
    img_final.save(webp_path, 'WEBP', quality=90, method=6)
    print(f"✅ Saved WebP: {webp_path}")
    
    print("="*80)
    print("✅ Rumi image fixed!")
    print("   - Greyscale removed (pure black & white)")
    print("   - Lines made thicker")
    print("="*80)

if __name__ == "__main__":
    fix_rumi_image()


