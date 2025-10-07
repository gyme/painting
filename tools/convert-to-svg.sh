#!/bin/bash

# Convert PNG coloring images to SVG for perfect clean edges
# Usage: ./convert-to-svg.sh <input_directory> [output_directory]

INPUT_DIR="${1:-../frontend/public/coloring-images}"
OUTPUT_DIR="${2:-../frontend/public/coloring-images-svg}"

echo "Converting PNG images to SVG..."
echo "Input: $INPUT_DIR"
echo "Output: $OUTPUT_DIR"
echo "========================================"

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Counter
processed=0
failed=0

# Process each PNG file
for input_file in "$INPUT_DIR"/*.png; do
    # Get basename without extension
    filename=$(basename "$input_file" .png)
    
    # Skip text files
    if [[ "$filename" == "PLACE_IMAGES_HERE" ]]; then
        continue
    fi
    
    echo "Processing: $filename.png"
    
    # Temporary PBM file
    temp_pbm="/tmp/${filename}.pbm"
    output_svg="$OUTPUT_DIR/${filename}.svg"
    
    # Convert PNG to PBM (portable bitmap) using ImageMagick
    # -threshold 50% makes it pure black and white (no grey)
    if magick "$input_file" -threshold 50% -negate "$temp_pbm" 2>/dev/null; then
        # Convert PBM to SVG using potrace
        # -s: SVG output
        # -t: suppress progress bar
        # -k: retain white pixels (they become holes)
        # -a: corner threshold (0-1.34, higher = more round corners)
        if potrace -s -t -k 0.85 -a 1.0 "$temp_pbm" -o "$output_svg" 2>/dev/null; then
            echo "✓ Created: $filename.svg"
            ((processed++))
        else
            echo "✗ Failed: potrace failed for $filename"
            ((failed++))
        fi
        
        # Clean up temp file
        rm -f "$temp_pbm"
    else
        echo "✗ Failed: convert failed for $filename"
        ((failed++))
    fi
done

# Process JPG files too
for input_file in "$INPUT_DIR"/*.jpg; do
    if [ ! -f "$input_file" ]; then
        continue
    fi
    
    filename=$(basename "$input_file" .jpg)
    echo "Processing: $filename.jpg"
    
    temp_pbm="/tmp/${filename}.pbm"
    output_svg="$OUTPUT_DIR/${filename}.svg"
    
    if magick "$input_file" -threshold 50% -negate "$temp_pbm" 2>&1; then
        if potrace -s -k 0.85 "$temp_pbm" -o "$output_svg" 2>&1; then
            echo "✓ Created: $filename.svg"
            ((processed++))
        else
            echo "✗ Failed: potrace failed for $filename"
            ((failed++))
        fi
        rm -f "$temp_pbm"
    else
        echo "✗ Failed: magick failed for $filename"
        ((failed++))
    fi
done

echo "========================================"
echo "✓ Successfully converted: $processed images"
if [ $failed -gt 0 ]; then
    echo "✗ Failed: $failed images"
fi
echo ""
echo "SVG files are in: $OUTPUT_DIR"

