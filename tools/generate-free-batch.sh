#!/bin/bash

###############################################################################
# Free Batch Prompt Generator
#
# Generates prompts for multiple subjects that you can use with FREE services
# like Bing Image Creator or Leonardo.ai
#
# Usage:
#   ./generate-free-batch.sh subjects.txt
###############################################################################

set -e

SUBJECTS_FILE="$1"

if [ -z "$SUBJECTS_FILE" ] || [ ! -f "$SUBJECTS_FILE" ]; then
  echo "❌ Error: Subjects file not found!"
  echo ""
  echo "Usage: $0 <subjects-file>"
  echo ""
  echo "Example:"
  echo "  ./generate-free-batch.sh my-subjects.txt"
  echo ""
  exit 1
fi

OUTPUT_FILE="free-prompts-$(date +%Y%m%d_%H%M%S).txt"
CHECKLIST_FILE="generation-checklist-$(date +%Y%m%d_%H%M%S).md"

echo ""
echo "🎨 Free Batch Prompt Generator"
echo "════════════════════════════════════════════════════════════"
echo ""

# Count subjects
TOTAL=$(grep -v '^#' "$SUBJECTS_FILE" | grep -v '^[[:space:]]*$' | wc -l | tr -d ' ')

echo "📋 Generating prompts for $TOTAL subjects..."
echo ""

# Generate prompts file
{
  echo "# Free Coloring Page Prompts"
  echo "# Generated: $(date)"
  echo "# Total subjects: $TOTAL"
  echo ""
  echo "Copy each prompt below and paste into Bing Image Creator (https://www.bing.com/create)"
  echo ""
  echo "═══════════════════════════════════════════════════════════════════════════════"
  echo ""
  
  index=0
  while IFS= read -r subject; do
    # Skip empty lines and comments
    [[ -z "$subject" || "$subject" =~ ^# ]] && continue
    
    index=$((index + 1))
    
    echo "━━━ IMAGE $index/$TOTAL ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "Subject: $subject"
    echo ""
    echo "SHORT PROMPT (recommended for Bing):"
    echo "────────────────────────────────────────────────────────────────────────────"
    echo "A professional coloring page illustration of $subject. Black line art only on white background. Intricate details with varied line weights. Clean vector style. No shading, no gray tones, no fills. Pure black outlines suitable for coloring. High detail level."
    echo ""
    echo "DETAILED PROMPT (use if short prompt adds unwanted elements):"
    echo "────────────────────────────────────────────────────────────────────────────"
    echo "Generate a highly detailed, professional-grade coloring page featuring: $subject"
    echo ""
    echo "STYLE: Intricate, hand-drawn vector line art suitable for kids coloring books."
    echo "LINE QUALITY: Clean, consistent vector lines with varied line weights (thick outlines, thinner interior details)."
    echo "RESTRICTIONS: Composed exclusively of pure black outlines on white background. Strictly exclude all shading, cross-hatching, stipple effects, gray tones, color fills, or gradients."
    echo "COMPOSITION: Centered, filling 80-90% of canvas with balanced negative space."
    echo ""
    echo "═══════════════════════════════════════════════════════════════════════════════"
    echo ""
    
  done < "$SUBJECTS_FILE"
  
  echo ""
  echo "✅ All $TOTAL prompts generated!"
  echo ""
  echo "Next steps:"
  echo "1. Go to https://www.bing.com/create"
  echo "2. Copy each SHORT PROMPT above"
  echo "3. Paste and click 'Create'"
  echo "4. Download your favorite result"
  echo "5. Repeat for all subjects"
  echo ""
  
} > "$OUTPUT_FILE"

# Generate checklist
{
  echo "# 🎨 Coloring Page Generation Checklist"
  echo ""
  echo "Generated: $(date)"
  echo "Total subjects: $TOTAL"
  echo ""
  echo "## 📋 Progress Tracker"
  echo ""
  echo "Check off each image as you complete it:"
  echo ""
  
  index=0
  while IFS= read -r subject; do
    [[ -z "$subject" || "$subject" =~ ^# ]] && continue
    index=$((index + 1))
    echo "- [ ] **Image $index**: $subject"
  done < "$SUBJECTS_FILE"
  
  echo ""
  echo "## 🚀 Instructions"
  echo ""
  echo "### For each subject:"
  echo ""
  echo "1. **Copy prompt** from \`$OUTPUT_FILE\`"
  echo "2. **Go to** [Bing Image Creator](https://www.bing.com/create)"
  echo "3. **Paste** the prompt"
  echo "4. **Click** 'Create' and wait ~60 seconds"
  echo "5. **Download** your favorite result (you get 4 options)"
  echo "6. **Save as**: \`frontend/public/coloring-images/[subject-name].png\`"
  echo "7. **Check off** this item in the list above"
  echo ""
  echo "### Tips:"
  echo ""
  echo "- ✅ **Process in batches**: Do 5 at a time, take a break"
  echo "- ✅ **Name files clearly**: Use descriptive names (lion.png, butterfly.png)"
  echo "- ✅ **Check quality**: Zoom in to verify pure black lines"
  echo "- ✅ **Save originals**: Keep a backup of generated images"
  echo ""
  echo "### After generating all images:"
  echo ""
  echo "\`\`\`bash"
  echo "# Import to database"
  echo "cd /Users/guym/Documents/d/paiting/tools"
  echo "node bulk-import-paintings.js ../frontend/public/coloring-images --auto-categorize"
  echo "\`\`\`"
  echo ""
  echo "## 📊 Statistics"
  echo ""
  echo "- **Total images**: $TOTAL"
  echo "- **Estimated time**: $(echo "$TOTAL * 2" | bc) minutes (~2 min per image)"
  echo "- **Cost**: FREE! 🎉"
  echo ""
  echo "## ✅ When Complete"
  echo ""
  echo "Once all images are generated and saved:"
  echo ""
  echo "1. Run bulk import: \`node bulk-import-paintings.js ../frontend/public/coloring-images\`"
  echo "2. Start app: \`cd .. && ./start.sh\`"
  echo "3. Visit: http://localhost:3000"
  echo "4. Enjoy your $TOTAL new coloring pages! 🎨✨"
  echo ""
  
} > "$CHECKLIST_FILE"

echo "✅ Files created:"
echo ""
echo "   📄 $OUTPUT_FILE"
echo "      All prompts ready to copy/paste"
echo ""
echo "   📋 $CHECKLIST_FILE"
echo "      Track your progress"
echo ""
echo "════════════════════════════════════════════════════════════"
echo ""
echo "🚀 Next Steps:"
echo ""
echo "1. Open: $OUTPUT_FILE"
echo "2. Go to: https://www.bing.com/create"
echo "3. Copy first prompt, paste, and generate"
echo "4. Download image"
echo "5. Repeat for all $TOTAL subjects"
echo "6. Import: node bulk-import-paintings.js ../frontend/public/coloring-images"
echo ""
echo "💡 Tip: Open $CHECKLIST_FILE to track your progress!"
echo ""
echo "Estimated time: $(echo "$TOTAL * 2" | bc) minutes (~2 min per image)"
echo "Cost: FREE! 🎉"
echo ""

