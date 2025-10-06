#!/bin/bash

###############################################################################
# Batch Coloring Page Generator
#
# This script automates the generation of multiple coloring pages using
# DALL-E 3 API. Perfect for generating hundreds or thousands of images.
#
# Requirements:
#   - OpenAI API key set in environment
#   - Python dependencies installed (openai, pillow, requests)
#
# Usage:
#   ./batch-generate-images.sh subjects.txt
#   ./batch-generate-images.sh subjects.txt --quality hd --parallel 5
###############################################################################

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default settings
QUALITY="standard"
PARALLEL_JOBS=3
OUTPUT_DIR="../frontend/public/coloring-images"
METADATA_FILE="batch-generation-metadata.json"

# Parse arguments
SUBJECTS_FILE="$1"
shift

while [[ $# -gt 0 ]]; do
  case $1 in
    --quality)
      QUALITY="$2"
      shift 2
      ;;
    --parallel)
      PARALLEL_JOBS="$2"
      shift 2
      ;;
    --output-dir)
      OUTPUT_DIR="$2"
      shift 2
      ;;
    *)
      echo -e "${RED}Unknown option: $1${NC}"
      exit 1
      ;;
  esac
done

# Validate inputs
if [ -z "$SUBJECTS_FILE" ] || [ ! -f "$SUBJECTS_FILE" ]; then
  echo -e "${RED}❌ Error: Subjects file not found!${NC}"
  echo ""
  echo "Usage: $0 <subjects-file> [options]"
  echo ""
  echo "Options:"
  echo "  --quality <standard|hd>    Image quality (default: standard)"
  echo "  --parallel <number>        Parallel jobs (default: 3)"
  echo "  --output-dir <path>        Output directory"
  echo ""
  echo "Example subjects file format:"
  echo "  majestic lion"
  echo "  beautiful butterfly"
  echo "  racing car"
  echo ""
  exit 1
fi

if [ -z "$OPENAI_API_KEY" ]; then
  echo -e "${RED}❌ Error: OPENAI_API_KEY not set!${NC}"
  echo ""
  echo "Set your API key:"
  echo "  export OPENAI_API_KEY='sk-your-key-here'"
  echo ""
  echo "Get your API key at: https://platform.openai.com/api-keys"
  exit 1
fi

# Check Python dependencies
if ! python3 -c "import openai, PIL, requests" 2>/dev/null; then
  echo -e "${RED}❌ Error: Missing Python dependencies!${NC}"
  echo ""
  echo "Install with:"
  echo "  pip install openai pillow requests"
  exit 1
fi

# Create output directory
mkdir -p "$OUTPUT_DIR"
mkdir -p "generated/batch-$(date +%Y%m%d_%H%M%S)"

# Count total subjects
TOTAL=$(wc -l < "$SUBJECTS_FILE" | tr -d ' ')

echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}🎨 Batch Coloring Page Generator${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}Configuration:${NC}"
echo "  • Subjects file: $SUBJECTS_FILE"
echo "  • Total subjects: $TOTAL"
echo "  • Quality: $QUALITY"
echo "  • Parallel jobs: $PARALLEL_JOBS"
echo "  • Output directory: $OUTPUT_DIR"
echo ""

# Cost estimation
if [ "$QUALITY" = "hd" ]; then
  COST_PER_IMAGE=0.080
else
  COST_PER_IMAGE=0.040
fi
TOTAL_COST=$(echo "$TOTAL * $COST_PER_IMAGE" | bc)

echo -e "${YELLOW}💰 Cost Estimate:${NC}"
echo "  • Cost per image: \$$(printf "%.3f" $COST_PER_IMAGE)"
echo "  • Total estimated cost: \$$(printf "%.2f" $TOTAL_COST)"
echo ""

# Confirm
read -p "Continue? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Cancelled."
  exit 0
fi

echo ""
echo -e "${GREEN}🚀 Starting batch generation...${NC}"
echo ""

# Initialize metadata
echo "[]" > "$METADATA_FILE"

# Function to generate single image
generate_image() {
  local subject="$1"
  local index="$2"
  local total="$3"
  
  echo -e "${BLUE}[$index/$total]${NC} Generating: $subject"
  
  # Generate with Python script
  python3 generate-with-dalle.py "$subject" \
    --quality "$QUALITY" \
    --output-dir "$OUTPUT_DIR" \
    2>&1 | grep -E "(✅|❌|Error)" || true
}

export -f generate_image
export QUALITY OUTPUT_DIR OPENAI_API_KEY BLUE NC GREEN RED

# Generate images in parallel
index=0
while IFS= read -r subject; do
  # Skip empty lines and comments
  [[ -z "$subject" || "$subject" =~ ^# ]] && continue
  
  index=$((index + 1))
  
  generate_image "$subject" "$index" "$TOTAL"
  
  # Parallel job control
  if [ $((index % PARALLEL_JOBS)) -eq 0 ]; then
    wait
  fi
  
  # Rate limiting (to avoid API limits)
  sleep 2
  
done < "$SUBJECTS_FILE"

# Wait for all jobs to complete
wait

echo ""
echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ Batch generation complete!${NC}"
echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}📊 Summary:${NC}"
echo "  • Total subjects processed: $TOTAL"
echo "  • Output directory: $OUTPUT_DIR"
echo "  • Estimated cost: \$$(printf "%.2f" $TOTAL_COST)"
echo ""
echo -e "${YELLOW}📋 Next Steps:${NC}"
echo "  1. Review generated images in: $OUTPUT_DIR"
echo "  2. Post-process if needed (threshold adjustment)"
echo "  3. Bulk import to database:"
echo "     node bulk-import-paintings.js $OUTPUT_DIR"
echo ""
echo -e "${GREEN}Happy coloring! 🎨✨${NC}"

