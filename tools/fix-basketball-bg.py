#!/usr/bin/env python3
"""Fix basketball_player background"""

from PIL import Image
from collections import Counter
import shutil

img_path = '../frontend/public/coloring-images/basketball_player.png'

# Backup
backup_path = img_path + '.backup-bg3'
shutil.copy2(img_path, backup_path)

# Open image
img = Image.open(img_path).convert('RGB')
pixels = img.load()
width, height = img.size

# Sample edges to detect background
bg_samples = []
for x in range(0, width, max(1, width // 50)):
    bg_samples.append(pixels[x, 0])
    bg_samples.append(pixels[x, height-1])
for y in range(0, height, max(1, height // 50)):
    bg_samples.append(pixels[0, y])
    bg_samples.append(pixels[width-1, y])

# Find background color
bg_color = Counter(bg_samples).most_common(1)[0][0]
print(f"Detected background: RGB{bg_color}, brightness={sum(bg_color)/3:.1f}")

# Replace background with white
replaced = 0
tolerance = 30

for y in range(height):
    for x in range(width):
        r, g, b = pixels[x, y]
        color_diff = abs(r - bg_color[0]) + abs(g - bg_color[1]) + abs(b - bg_color[2])
        
        if color_diff <= tolerance:
            pixels[x, y] = (255, 255, 255)
            replaced += 1

# Save
img.save(img_path, 'PNG', optimize=True)

print(f"✅ Replaced {replaced} pixels ({replaced/(width*height)*100:.1f}%)")
print(f"✅ Background converted to white!")

