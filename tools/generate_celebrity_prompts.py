#!/usr/bin/env python3
"""
Generate AI prompts for celebrity-themed coloring pages
NOTE: These are "inspired by" or generic celebrity types to avoid likeness rights issues
"""

import pandas as pd
import csv

# Celebrity-inspired themes (legally safe approach)
CELEBRITY_THEMES = [
    {
        "keyword": "famous pop star singing",
        "title": "Pop Star Performer",
        "description": "A pop star singing on stage with microphone",
        "category": "Famous People",
    },
    {
        "keyword": "movie star on red carpet",
        "title": "Movie Star Red Carpet",
        "description": "An elegant movie star walking the red carpet",
        "category": "Famous People",
    },
    {
        "keyword": "famous athlete with trophy",
        "title": "Champion Athlete",
        "description": "A champion athlete holding a trophy",
        "category": "Famous People",
    },
    {
        "keyword": "rock star playing guitar",
        "title": "Rock Star Guitarist",
        "description": "A cool rock star playing electric guitar",
        "category": "Famous People",
    },
    {
        "keyword": "famous dancer performing",
        "title": "Professional Dancer",
        "description": "A professional dancer in graceful pose",
        "category": "Famous People",
    },
    {
        "keyword": "tv show host with microphone",
        "title": "TV Show Host",
        "description": "A friendly TV show host with microphone",
        "category": "Famous People",
    },
    {
        "keyword": "famous chef cooking",
        "title": "Celebrity Chef",
        "description": "A celebrity chef preparing delicious food",
        "category": "Famous People",
    },
    {
        "keyword": "fashion model on runway",
        "title": "Fashion Model",
        "description": "A fashionable model walking the runway",
        "category": "Famous People",
    },
    {
        "keyword": "famous musician with piano",
        "title": "Pianist Musician",
        "description": "A talented musician playing piano",
        "category": "Famous People",
    },
    {
        "keyword": "superhero movie star",
        "title": "Superhero Character",
        "description": "A superhero character in heroic pose",
        "category": "Famous People",
    },
]

def create_url_key(keyword):
    """Convert keyword to URL-friendly format"""
    return keyword.lower().replace(' ', '-').replace(',', '')

def create_midjourney_prompt(keyword):
    """Generate optimized Midjourney prompt"""
    return f"coloring page for kids, {keyword}, simple black and white line art, thick bold outlines, no shading, no color, white background, suitable for ages 4-8, high detail, professional illustration style, generic person without specific facial features --ar 4:3 --v 6 --style raw"

def create_dalle_prompt(keyword):
    """Generate optimized DALL-E prompt"""
    return f"A coloring page illustration for children featuring {keyword}. Black and white line art only, thick bold outlines, no shading or gray tones, clean white background, simple and fun design suitable for kids ages 4-10 to color with crayons. Generic person without recognizable features."

def create_stable_diffusion_prompt(keyword):
    """Generate optimized Stable Diffusion prompt"""
    positive = f"coloring book page, {keyword}, black and white line art, thick outlines, no shading, no color, white background, children's illustration, simple, professional, high quality, generic person, no specific facial features"
    negative = "color, shading, gradient, gray, shadows, watermark, text, signature, complex, photograph, realistic face, celebrity likeness, specific person"
    return positive, negative

def generate_description(theme):
    """Generate SEO-friendly description"""
    return f"A fun and engaging {theme['title']} coloring page for kids! {theme['description']}. Perfect for ages 4-10, this printable coloring page features bold outlines that are easy for children to color. Great for kids who dream of being famous!"

def generate_tags(keyword):
    """Generate relevant tags from keyword"""
    words = keyword.lower().split()
    tags = words[:5]
    return ','.join(tags)

def main():
    """Generate celebrity-themed prompts"""
    print("🎬 Generating Celebrity-Themed Coloring Page Prompts...")
    print("=" * 70)
    print("⚠️  LEGAL NOTE: These are generic 'celebrity-style' images")
    print("   NOT actual celebrity likenesses to avoid legal issues")
    print("=" * 70)
    print()
    
    data = []
    
    for idx, theme in enumerate(CELEBRITY_THEMES, 1):
        keyword = theme['keyword']
        url_key = create_url_key(keyword)
        
        sd_positive, sd_negative = create_stable_diffusion_prompt(keyword)
        
        row = {
            'Category': theme['category'],
            'Keyword': keyword,
            'Title': theme['title'],
            'URL Key': url_key,
            'Description': generate_description(theme),
            'Difficulty': 2,  # Medium difficulty
            'Tags': generate_tags(keyword),
            'Midjourney Prompt': create_midjourney_prompt(keyword),
            'DALL-E Prompt': create_dalle_prompt(keyword),
            'Stable Diffusion Positive': sd_positive,
            'Stable Diffusion Negative': sd_negative,
            'Priority': 'High',
        }
        
        data.append(row)
        print(f"{idx}. ✅ {theme['title']} ({url_key})")
    
    # Create DataFrame
    df = pd.DataFrame(data)
    
    # Save to CSV
    output_file = 'celebrity_coloring_prompts.csv'
    df.to_csv(output_file, index=False)
    
    print("\n" + "=" * 70)
    print(f"✨ SUCCESS! Generated {len(CELEBRITY_THEMES)} celebrity-themed prompts")
    print(f"📄 Saved to: {output_file}")
    
    print("\n📋 Summary:")
    for idx, theme in enumerate(CELEBRITY_THEMES, 1):
        print(f"   {idx}. {theme['title']}")
    
    print("\n🎯 Next Steps:")
    print("1. Open celebrity_coloring_prompts.csv")
    print("2. Copy prompts to your AI tool (Midjourney/DALL-E/Stable Diffusion)")
    print("3. Generate the images")
    print("4. Run: python3 image_postprocessing.py")
    print("5. Run: python3 database_import.py --csv celebrity_coloring_prompts.csv")
    
    print("\n⚖️  LEGAL TIP:")
    print("   These prompts create GENERIC celebrity-type characters")
    print("   NOT specific celebrity likenesses, which is legally safe!")
    
    print("\n🎨 Sample Midjourney Prompt:")
    print(f"\n   {df.iloc[0]['Midjourney Prompt']}")

if __name__ == '__main__':
    main()

