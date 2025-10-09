# Line Fixing Guide

## Problem: Lines Too Thin

Some coloring images have lines that are too thin, making them:
- Hard to see
- Difficult to color within
- Look unprofessional

## Solution: Line Thickening Script

Use `thicken-lines.py` to automatically thicken lines in images.

---

## Quick Start

### Fix Specific Images

```bash
cd tools
python3 thicken-lines.py ../frontend/public/coloring-images/spider_man.png
```

### Fix Multiple Images

```bash
cd tools
python3 thicken-lines.py \
  ../frontend/public/coloring-images/spider_man.png \
  ../frontend/public/coloring-images/squirrel.png \
  ../frontend/public/coloring-images/basketball_player.png
```

### Fix All Images in Directory

```bash
cd frontend/public/coloring-images
python3 ../../../tools/thicken-lines.py --all
```

---

## Options

### Thickness Levels

```bash
# Slight thickening (good for already decent lines)
python3 thicken-lines.py image.png -t 1

# Medium thickening (default, good for most images)
python3 thicken-lines.py image.png -t 2

# Bold thickening (for very thin lines)
python3 thicken-lines.py image.png -t 3
```

### Processing Methods

```bash
# OpenCV method (faster, cleaner results)
python3 thicken-lines.py image.png --method opencv

# PIL method (fallback, works everywhere)
python3 thicken-lines.py image.png --method pil
```

---

## Workflow for New Images

When adding new coloring pages:

### Step 1: Add Image
```bash
cp new_image.png frontend/public/coloring-images/
```

### Step 2: Check if Lines Need Thickening

Open the image and check:
- ✅ Are lines clearly visible?
- ✅ Are lines thick enough to color within?
- ✅ Do lines look professional?

If **NO** to any → Run thickening script

### Step 3: Thicken Lines

```bash
cd tools
python3 thicken-lines.py ../frontend/public/coloring-images/new_image.png
```

### Step 4: Verify Result

- Original backed up as `new_image.png.backup`
- Check the processed image
- If too thick: restore backup and try `-t 1`
- If still too thin: try `-t 3`

### Step 5: Add to Database

```bash
# Add painting entry via API or SQL
curl -X POST https://your-backend/api/paintings \
  -H "Content-Type: application/json" \
  -d '{"urlKey":"new-image", "title":"New Image", ...}'
```

---

## Batch Processing

### Process All New Images

If you have a folder of new images:

```bash
# Copy all new images
cp ~/Downloads/new-coloring-pages/*.png frontend/public/coloring-images/

# Go to that directory
cd frontend/public/coloring-images

# Process all PNG files
python3 ../../../tools/thicken-lines.py *.png -t 2
```

### Process Only Specific Pattern

```bash
cd frontend/public/coloring-images
python3 ../../../tools/thicken-lines.py animal_*.png -t 2
```

---

## Troubleshooting

### "OpenCV not found"

The script will automatically fallback to PIL method. If you want OpenCV for better results:

```bash
pip3 install opencv-python
```

### Lines Too Thick

```bash
# Restore backup
mv image.png.backup image.png

# Try lighter thickness
python3 thicken-lines.py image.png -t 1
```

### Lines Still Too Thin

```bash
# Try maximum thickness
python3 thicken-lines.py image.png -t 3
```

### Image Quality Degraded

The script preserves quality, but if you notice issues:
- Check original image quality
- Try the other method (PIL vs OpenCV)
- Adjust threshold in script if needed

---

## Technical Details

### What the Script Does

1. **Converts to Grayscale** - Easier to process
2. **Increases Contrast** - Makes lines more prominent
3. **Applies Threshold** - Pure black/white (200 threshold)
4. **Morphological Dilation** - Expands black areas (lines)
5. **Smoothing** - Prevents jagged edges
6. **Saves Result** - Optimized PNG

### Backup System

- **Automatic**: First run creates `.backup` file
- **Safe**: Won't overwrite existing backups
- **Restore**: Simply rename backup file

### Performance

- **Speed**: ~1 second per image
- **Quality**: Preserves image resolution
- **Size**: Similar or smaller file size (PNG optimization)

---

## Examples

### Already Fixed

These images have been fixed with the script:
- ✅ `spider_man.png` - Lines were very thin
- ✅ `squirrel.png` - Lines barely visible
- ✅ `basketball_player.png` - Lines too light

### Before/After Comparison

**Before**: Lines 1-2px thick, hard to see
**After**: Lines 3-4px thick, clear and professional

---

## Integration with Workflow

### Adding to Sync Script

Add to `tools/sync-database.js`:

```javascript
// After uploading new image
if (needsLineThickening(imagePath)) {
  await execSync(`python3 thicken-lines.py ${imagePath} -t 2`);
}
```

### Automated Check

Create a pre-commit hook:

```bash
#!/bin/bash
# .git/hooks/pre-commit

for img in $(git diff --cached --name-only | grep coloring-images.*\.png); do
  if [ needs thickening ]; then
    python3 tools/thicken-lines.py "$img" -t 2
    git add "$img"
  fi
done
```

---

## Support

For issues or questions:
1. Check if OpenCV is installed: `pip3 show opencv-python`
2. Try PIL method: `--method pil`
3. Adjust thickness: `-t 1` to `-t 3`
4. Check backup: `ls -la *.backup`

---

**Last Updated**: October 9, 2025

