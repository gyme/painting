#!/usr/bin/env python3
"""
Generate AI prompts for mass coloring page creation
"""

import pandas as pd
import csv

# Sample keyword categories - expand this massively!
KEYWORDS = {
    "Animals": [
        "cute puppy playing", "baby elephant with butterfly", "friendly lion",
        "jumping dolphin", "sleeping cat", "running horse", "baby penguin",
        "happy frog", "colorful parrot", "wise owl", "playful monkey",
        "gentle deer", "funny giraffe", "fluffy bunny", "red panda",
    ],
    "Fantasy": [
        "magical unicorn with rainbow", "friendly dragon", "fairy princess",
        "wizard with staff", "mermaid underwater", "castle in clouds",
        "phoenix bird", "cute witch with cat", "magic wand with stars",
        "enchanted forest", "flying pegasus", "gnome with mushroom",
    ],
    "Vehicles": [
        "race car speeding", "fire truck", "airplane flying", "sailboat",
        "train with carriages", "rocket ship", "hot air balloon",
        "motorcycle", "school bus", "construction truck", "police car",
    ],
    "Nature": [
        "beautiful sunflower", "rose flower", "butterfly on flower",
        "rainbow in sky", "sun with clouds", "moon and stars",
        "tree with birds", "mountain landscape", "beach scene",
        "waterfall", "autumn leaves", "spring garden",
    ],
    "Food": [
        "ice cream cone", "birthday cake", "cupcake", "pizza slice",
        "fruit basket", "donut", "cookie", "apple", "watermelon slice",
    ],
    "Holidays": [
        "christmas tree", "santa claus", "snowman", "halloween pumpkin",
        "easter bunny", "valentine heart", "thanksgiving turkey",
        "birthday balloons", "fireworks", "christmas stocking",
    ],
}

def create_url_key(keyword):
    """Convert keyword to URL-friendly format"""
    return keyword.lower().replace(' ', '-').replace(',', '')

def create_midjourney_prompt(keyword):
    """Generate optimized Midjourney prompt"""
    return f"coloring page for kids, {keyword}, simple black and white line art, thick bold outlines, no shading, no color, white background, suitable for ages 4-8, high detail, professional illustration style --ar 4:3 --v 6 --style raw"

def create_dalle_prompt(keyword):
    """Generate optimized DALL-E prompt"""
    return f"A coloring page illustration for children featuring {keyword}. Black and white line art only, thick bold outlines, no shading or gray tones, clean white background, simple and fun design suitable for kids ages 4-10 to color with crayons."

def create_stable_diffusion_prompt(keyword):
    """Generate optimized Stable Diffusion prompt"""
    positive = f"coloring book page, {keyword}, black and white line art, thick outlines, no shading, no color, white background, children's illustration, simple, professional, high quality"
    negative = "color, shading, gradient, gray, shadows, watermark, text, signature, complex, photograph"
    return positive, negative

def assign_difficulty(keyword):
    """Assign difficulty level based on keyword complexity"""
    easy_keywords = ['simple', 'basic', 'easy', 'cute', 'baby', 'little']
    hard_keywords = ['detailed', 'intricate', 'complex', 'realistic', 'advanced']
    
    keyword_lower = keyword.lower()
    
    if any(word in keyword_lower for word in easy_keywords):
        return 1
    elif any(word in keyword_lower for word in hard_keywords):
        return 3
    else:
        return 2

def generate_description(keyword, category):
    """Generate SEO-friendly description"""
    clean_keyword = keyword.replace('-', ' ')
    return f"A fun and engaging {clean_keyword} coloring page for kids! Perfect for ages 4-10, this printable coloring page features {clean_keyword} with bold outlines that are easy for children to color. Great for developing creativity and fine motor skills."

def generate_tags(keyword):
    """Generate relevant tags from keyword"""
    words = keyword.lower().split()
    tags = words[:5]  # Take first 5 words
    return ','.join(tags)

def main():
    """Generate comprehensive prompts CSV"""
    print("🎨 Generating AI Prompts for Coloring Pages...")
    print("=" * 60)
    
    data = []
    total_keywords = 0
    
    for category, keywords in KEYWORDS.items():
        print(f"\n📁 Category: {category} ({len(keywords)} keywords)")
        
        for keyword in keywords:
            url_key = create_url_key(keyword)
            title = keyword.title()
            
            sd_positive, sd_negative = create_stable_diffusion_prompt(keyword)
            
            row = {
                'Category': category,
                'Keyword': keyword,
                'Title': title,
                'URL Key': url_key,
                'Description': generate_description(keyword, category),
                'Difficulty': assign_difficulty(keyword),
                'Tags': generate_tags(keyword),
                'Midjourney Prompt': create_midjourney_prompt(keyword),
                'DALL-E Prompt': create_dalle_prompt(keyword),
                'Stable Diffusion Positive': sd_positive,
                'Stable Diffusion Negative': sd_negative,
                'Priority': 'High' if total_keywords < 50 else 'Medium',
            }
            
            data.append(row)
            total_keywords += 1
            print(f"  ✅ {url_key}")
    
    # Create DataFrame
    df = pd.DataFrame(data)
    
    # Save to CSV
    output_file = 'coloring_page_prompts.csv'
    df.to_csv(output_file, index=False)
    
    print("\n" + "=" * 60)
    print(f"✨ SUCCESS! Generated {total_keywords} prompts")
    print(f"📄 Saved to: {output_file}")
    print("\n📊 Summary by Category:")
    print(df['Category'].value_counts().to_string())
    print("\n🎯 Next Steps:")
    print("1. Open coloring_page_prompts.csv")
    print("2. Add more keywords to expand your library")
    print("3. Use the prompts with Midjourney, DALL-E, or Stable Diffusion")
    print("4. Run image_postprocessing.py after generation")

if __name__ == '__main__':
    main()

