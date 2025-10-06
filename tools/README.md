# 🛠️ Painting Generation Tools

This directory contains utilities to help you easily add new paintings to the website.

## 🎨 Coloring Page Generation Tools

### generate-coloring-page.js (NEW!)

Generate optimized prompts for creating professional coloring pages with AI image generation services.

**Quick Start:**
```bash
node generate-coloring-page.js "majestic lion"
```

This will create service-specific prompts for DALL-E, Midjourney, Stable Diffusion, and more, plus post-processing instructions.

### generate-with-dalle.py (NEW!)

Directly generate coloring pages using OpenAI's DALL-E 3 API.

**Requirements:**
```bash
pip install openai pillow requests
export OPENAI_API_KEY="your-key-here"
```

**Usage:**
```bash
python3 generate-with-dalle.py "cute puppy" --quality hd
```

### COLORING_PAGE_GENERATION.md (NEW!)

Comprehensive guide covering:
- Multiple AI generation methods (DALL-E, Midjourney, Stable Diffusion)
- Free and paid options
- Post-processing techniques
- Quality standards
- Integration workflows

**Read this first** if you're new to generating coloring pages!

---

## 📝 Metadata Generation Tools

### generate-painting.js

An interactive tool to create new painting entries (metadata only, not the image).

### Usage

```bash
node generate-painting.js
```

Follow the prompts to enter:
- Title
- Description
- Category
- Tags
- Difficulty
- Featured status

The tool will generate a JSON object that you can POST to the API.

### Using with LLMs

You can use Large Language Models (like ChatGPT or Claude) to help generate painting metadata:

1. **Generate Description:**
```
Generate a short, kid-friendly description (1-2 sentences) for a painting of: [cute puppy]
```

2. **Generate Tags:**
```
Generate 4-6 relevant tags (comma-separated) for a kids' coloring page about: [cute puppy]
```

3. **Full Generation:**
```
I need to create a new coloring page for kids. Please generate a JSON object for a painting of "cute puppy" with these fields:
- title: A catchy, kid-friendly title
- description: A short 1-2 sentence description
- category: One of [Animals, Nature, Vehicles, Fantasy]
- tags: 4-6 relevant tags (comma-separated)
- difficulty: 1 (Easy), 2 (Medium), or 3 (Hard)
- colorPalette: 4-5 hex color codes in JSON array format
- featured: true or false
```

### Example Output

```json
{
  "urlKey": "cute-puppy",
  "title": "Cute Puppy",
  "description": "An adorable puppy dog waiting to be colored!",
  "category": "Animals",
  "tags": "dog,puppy,pet,animals,cute",
  "imageUrl": "/images/cute-puppy.jpg",
  "thumbnailUrl": "/images/cute-puppy-thumb.jpg",
  "difficulty": 2,
  "colorPalette": "[\"#8B4513\",\"#D2691E\",\"#FFE4C4\",\"#000000\",\"#FFFFFF\"]",
  "svgPath": "",
  "featured": false
}
```

### Adding the Painting

1. **Prepare Images:**
   - Create or download the painting image
   - Create a thumbnail (recommended: 400x300px)
   - Place in your images directory

2. **POST to API:**
```bash
curl -X POST http://localhost:8080/api/paintings \
  -H "Content-Type: application/json" \
  -d @painting-cute-puppy.json
```

3. **Verify:**
   - Visit http://localhost:3000
   - Your painting should appear in the gallery!

## Tips for Creating Great Paintings

1. **Title**: Keep it short and exciting (e.g., "Super Fast Rocket!")
2. **Description**: Make it fun and encouraging for kids
3. **Category**: Choose the most appropriate category
4. **Tags**: Include both specific and general terms
5. **Difficulty**: 
   - Easy (1): Simple shapes, 3-4 colors
   - Medium (2): More detail, 5-6 colors
   - Hard (3): Complex designs, many colors
6. **Color Palette**: Choose bright, appealing colors
7. **Featured**: Only mark the best paintings as featured

## Batch Import

To import multiple paintings at once, create a JSON array:

```json
[
  { painting1 },
  { painting2 },
  { painting3 }
]
```

Then use a script to POST each one:

```bash
for painting in $(cat paintings.json | jq -c '.[]'); do
  curl -X POST http://localhost:8080/api/paintings \
    -H "Content-Type: application/json" \
    -d "$painting"
done
```

## Color Palette Guidelines

Choose colors that:
- Are bright and appealing to kids
- Work well together
- Include variety (light and dark)
- Are easy to distinguish

Example palettes:
- **Animals**: Browns, tans, black, white
- **Nature**: Greens, blues, yellows, browns
- **Vehicles**: Reds, blues, yellows, grays, black
- **Fantasy**: Pinks, purples, blues, golds

## Need More Help?

Check out the main README.md in the project root for more information!
