#!/usr/bin/env python3
"""
Post-process AI-generated images for coloring pages
- Converts to pure black & white
- Enhances line quality
- Optimizes for web
- Validates quality
"""

import os
import glob
import cv2
import numpy as np
from PIL import Image, ImageEnhance
from pathlib import Path

class ColoringPageProcessor:
    def __init__(self, input_dir='raw_images', output_dir='processed_images'):
        self.input_dir = input_dir
        self.output_dir = output_dir
        
        # Create directories if they don't exist
        Path(output_dir).mkdir(parents=True, exist_ok=True)
        
    def enhance_to_line_art(self, input_path, output_path):
        """Convert AI image to clean black & white line art"""
        print(f"  Processing: {os.path.basename(input_path)}")
        
        # Read image
        img = cv2.imread(input_path)
        if img is None:
            print(f"  ❌ Could not read image")
            return False
        
        # Convert to grayscale
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Enhance contrast using CLAHE
        clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8,8))
        enhanced = clahe.apply(gray)
        
        # Apply Gaussian blur to reduce noise
        blurred = cv2.GaussianBlur(enhanced, (3, 3), 0)
        
        # Adaptive thresholding for better line detection
        binary = cv2.adaptiveThreshold(
            blurred, 
            255, 
            cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
            cv2.THRESH_BINARY, 
            11, 
            2
        )
        
        # Invert if needed (lines should be black, background white)
        if np.mean(binary) < 127:
            binary = cv2.bitwise_not(binary)
        
        # Remove small noise
        kernel = np.ones((2,2), np.uint8)
        cleaned = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel)
        cleaned = cv2.morphologyEx(cleaned, cv2.MORPH_OPEN, kernel)
        
        # Optional: Thicken lines slightly for better coloring
        kernel = np.ones((2,2), np.uint8)
        thickened = cv2.erode(cleaned, kernel, iterations=1)
        
        # Save
        cv2.imwrite(output_path, thickened)
        return True
    
    def optimize_for_web(self, input_path, output_path, target_width=800, target_height=600):
        """Optimize image for web delivery"""
        try:
            img = Image.open(input_path)
            
            # Resize to standard dimensions while maintaining aspect ratio
            img.thumbnail((target_width, target_height), Image.LANCZOS)
            
            # Create a white canvas of exact size
            canvas = Image.new('RGB', (target_width, target_height), (255, 255, 255))
            
            # Paste image centered on canvas
            offset = ((target_width - img.width) // 2, (target_height - img.height) // 2)
            canvas.paste(img, offset)
            
            # Convert to RGB if needed
            if canvas.mode != 'RGB':
                canvas = canvas.convert('RGB')
            
            # Save with optimization
            canvas.save(output_path, 'PNG', optimize=True, quality=95)
            
            # Check file size
            file_size = os.path.getsize(output_path)
            if file_size > 500000:  # 500KB
                print(f"  ⚠️ Warning: File size is {file_size/1000:.0f}KB (target: <500KB)")
            
            return True
        except Exception as e:
            print(f"  ❌ Error optimizing: {e}")
            return False
    
    def check_quality(self, image_path):
        """Check if image meets quality standards"""
        issues = []
        
        try:
            img = Image.open(image_path)
            img_array = np.array(img.convert('L'))
            
            # Check dimensions
            if img.width < 600 or img.height < 400:
                issues.append("Resolution too low")
            
            # Check file size
            file_size = os.path.getsize(image_path)
            if file_size > 500000:
                issues.append(f"File too large ({file_size/1000:.0f}KB)")
            
            # Check if mostly black and white
            unique_values = len(np.unique(img_array))
            if unique_values > 50:
                issues.append(f"Too many gray tones ({unique_values})")
            
            # Check if background is mostly white
            white_pixels = np.sum(img_array > 240)
            total_pixels = img_array.size
            white_percentage = (white_pixels / total_pixels) * 100
            
            if white_percentage < 50:
                issues.append(f"Background not white enough ({white_percentage:.1f}%)")
            
            # Check if there are actual lines (not all white)
            black_pixels = np.sum(img_array < 100)
            black_percentage = (black_pixels / total_pixels) * 100
            
            if black_percentage < 5:
                issues.append("Too few lines (mostly blank)")
            elif black_percentage > 50:
                issues.append("Too many black pixels (too dark)")
            
        except Exception as e:
            issues.append(f"Error reading image: {e}")
        
        return issues
    
    def process_all(self, do_quality_check=True):
        """Process all images in input directory"""
        print("\n🎨 Coloring Page Post-Processing Pipeline")
        print("=" * 60)
        
        # Find all images
        image_patterns = ['*.png', '*.jpg', '*.jpeg', '*.webp']
        image_files = []
        for pattern in image_patterns:
            image_files.extend(glob.glob(os.path.join(self.input_dir, pattern)))
        
        if not image_files:
            print(f"❌ No images found in {self.input_dir}/")
            print("   Please place your AI-generated images there first.")
            return
        
        print(f"📁 Found {len(image_files)} images to process")
        print(f"📤 Output directory: {self.output_dir}/")
        print()
        
        successful = 0
        failed = 0
        quality_issues = []
        
        for img_path in image_files:
            filename = os.path.basename(img_path)
            name_without_ext = os.path.splitext(filename)[0]
            
            # Step 1: Enhance to line art
            temp_path = os.path.join(self.output_dir, f"temp_{name_without_ext}.png")
            if self.enhance_to_line_art(img_path, temp_path):
                
                # Step 2: Optimize for web
                final_path = os.path.join(self.output_dir, f"{name_without_ext}.png")
                if self.optimize_for_web(temp_path, final_path):
                    
                    # Step 3: Quality check
                    if do_quality_check:
                        issues = self.check_quality(final_path)
                        if issues:
                            quality_issues.append((name_without_ext, issues))
                            print(f"  ⚠️ Quality issues: {', '.join(issues)}")
                        else:
                            print(f"  ✅ Perfect quality!")
                    
                    successful += 1
                    
                    # Clean up temp file
                    try:
                        os.remove(temp_path)
                    except:
                        pass
                else:
                    failed += 1
            else:
                failed += 1
        
        # Summary
        print("\n" + "=" * 60)
        print(f"✨ Processing Complete!")
        print(f"   ✅ Successful: {successful}")
        print(f"   ❌ Failed: {failed}")
        
        if quality_issues:
            print(f"\n⚠️ Quality Issues Found in {len(quality_issues)} images:")
            for name, issues in quality_issues[:10]:  # Show first 10
                print(f"   • {name}: {', '.join(issues)}")
            if len(quality_issues) > 10:
                print(f"   ... and {len(quality_issues) - 10} more")
        else:
            print(f"\n🎉 All {successful} images passed quality checks!")
        
        print(f"\n📁 Processed images saved to: {self.output_dir}/")
        print("\n🚀 Next Steps:")
        print("1. Review images in processed_images/")
        print("2. Upload to your server: frontend/public/coloring-images/")
        print("3. Run database_import.py to add to database")

def main():
    """Main execution"""
    import argparse
    
    parser = argparse.ArgumentParser(description='Post-process coloring page images')
    parser.add_argument('--input', default='raw_images', help='Input directory')
    parser.add_argument('--output', default='processed_images', help='Output directory')
    parser.add_argument('--no-quality-check', action='store_true', help='Skip quality checks')
    
    args = parser.parse_args()
    
    processor = ColoringPageProcessor(args.input, args.output)
    processor.process_all(do_quality_check=not args.no_quality_check)

if __name__ == '__main__':
    main()

