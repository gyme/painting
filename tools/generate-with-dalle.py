#!/usr/bin/env python3
"""
DALL-E 3 Coloring Page Generator

This script uses OpenAI's DALL-E 3 API to generate professional coloring pages.

Requirements:
    pip install openai pillow requests

Usage:
    export OPENAI_API_KEY="your-key-here"
    python3 generate-with-dalle.py "majestic lion"
    
    # With options:
    python3 generate-with-dalle.py "cute puppy" --size 1024x1024 --quality hd
"""

import os
import sys
import json
import argparse
from datetime import datetime
from pathlib import Path

try:
    from openai import OpenAI
    import requests
    from PIL import Image
    from io import BytesIO
except ImportError:
    print("❌ Missing dependencies. Install with:")
    print("   pip install openai pillow requests")
    sys.exit(1)


def generate_coloring_page_prompt(subject: str) -> str:
    """Generate optimized prompt for coloring page creation."""
    return f"""Generate a highly detailed, professional-grade coloring page featuring: {subject}

STYLE: Intricate, hand-drawn vector line art suitable for kids coloring books. The aesthetic should be realistic or highly stylized but elegant.

LINE QUALITY: Use clean, consistent vector lines. Employ varied line weights (thick outlines, thinner interior details) to create depth and definition. All lines must form closed, clean paths suitable for vector tracing and filling.

RESTRICTIONS: The image must be composed exclusively of pure black outlines on a transparent or white background. Strictly exclude all shading, cross-hatching, stipple effects, gray tones, color fills, or subtle gradients. The final output must be a pure, ready-to-color blueprint.

COMPOSITION: The subject should be centered, filling 80-90% of the canvas with balanced negative space. Include intricate details that are age-appropriate and encourage creative coloring.

TECHNICAL SPECS:
- Pure black (#000000) lines only
- White background
- No shading, cross-hatching, or stippling
- No gray tones or color fills
- Varied line weights for depth
- Closed paths suitable for coloring
- Professional hand-drawn quality"""


def generate_image(client: OpenAI, subject: str, size: str = "1024x1024", 
                  quality: str = "standard") -> tuple:
    """
    Generate coloring page using DALL-E 3.
    
    Returns:
        tuple: (image_url, revised_prompt)
    """
    prompt = generate_coloring_page_prompt(subject)
    
    print(f"🎨 Generating coloring page for: {subject}")
    print(f"📐 Size: {size}, Quality: {quality}")
    print(f"\n📝 Using prompt:")
    print("─" * 60)
    print(prompt)
    print("─" * 60)
    print("\n⏳ Requesting image from DALL-E 3...")
    
    try:
        response = client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size=size,
            quality=quality,
            n=1,
        )
        
        image_url = response.data[0].url
        revised_prompt = response.data[0].revised_prompt
        
        return image_url, revised_prompt
        
    except Exception as e:
        print(f"❌ Error generating image: {e}")
        sys.exit(1)


def download_image(url: str, output_path: Path) -> None:
    """Download image from URL and save to disk."""
    print(f"\n⬇️  Downloading image...")
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        img = Image.open(BytesIO(response.content))
        img.save(output_path)
        
        print(f"✅ Image saved to: {output_path}")
        print(f"   Size: {img.size[0]}x{img.size[1]} pixels")
        print(f"   Format: {img.format}")
        
    except Exception as e:
        print(f"❌ Error downloading image: {e}")
        sys.exit(1)


def save_metadata(output_dir: Path, subject: str, url: str, revised_prompt: str) -> None:
    """Save generation metadata to JSON file."""
    metadata = {
        "subject": subject,
        "generated_at": datetime.now().isoformat(),
        "original_url": url,
        "revised_prompt": revised_prompt,
        "model": "dall-e-3"
    }
    
    metadata_path = output_dir / "metadata.json"
    with open(metadata_path, 'w') as f:
        json.dump(metadata, indent=2, fp=f)
    
    print(f"📄 Metadata saved to: {metadata_path}")


def post_process_instructions(output_path: Path) -> None:
    """Print post-processing instructions."""
    print("\n" + "═" * 60)
    print("📋 POST-PROCESSING STEPS")
    print("═" * 60)
    print("""
The generated image may need post-processing to ensure it meets
the strict requirements (pure black lines, no shading).

Quick Check:
1. Open the image in an image viewer
2. Zoom in and check for gray pixels or shading
3. If present, follow post-processing steps below

Photoshop:
1. Open image
2. Image → Mode → Grayscale
3. Image → Adjustments → Threshold (around 180-200)
4. Select white background and delete
5. Save as PNG with transparency

GIMP (Free):
1. Open image
2. Colors → Threshold (adjust to 0.70-0.80)
3. Select white with "Select by Color"
4. Edit → Clear
5. Layer → Transparency → Add Alpha Channel
6. Export as PNG

Online (Quick):
- Use Photopea (free): https://www.photopea.com
- Apply threshold adjustment
- Export as PNG

Next Steps:
1. Review the generated image
2. Post-process if needed
3. Copy to: frontend/public/coloring-images/
4. Add to database using: node tools/generate-painting.js
""")


def main():
    parser = argparse.ArgumentParser(
        description="Generate professional coloring pages using DALL-E 3"
    )
    parser.add_argument(
        "subject",
        type=str,
        help="Subject of the coloring page (e.g., 'majestic lion')"
    )
    parser.add_argument(
        "--size",
        type=str,
        default="1024x1024",
        choices=["1024x1024", "1024x1792", "1792x1024"],
        help="Image size (default: 1024x1024)"
    )
    parser.add_argument(
        "--quality",
        type=str,
        default="standard",
        choices=["standard", "hd"],
        help="Image quality (default: standard, hd costs more)"
    )
    parser.add_argument(
        "--output-dir",
        type=str,
        default="./generated",
        help="Output directory (default: ./generated)"
    )
    
    args = parser.parse_args()
    
    # Check for API key
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("❌ Error: OPENAI_API_KEY environment variable not set")
        print("\nSet it with:")
        print('   export OPENAI_API_KEY="your-key-here"')
        print("\nGet your API key at: https://platform.openai.com/api-keys")
        sys.exit(1)
    
    # Create output directory
    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Generate filename
    safe_subject = "".join(c if c.isalnum() or c in (' ', '-') else '' 
                          for c in args.subject)
    safe_subject = safe_subject.replace(' ', '-').lower()
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"coloring-page-{safe_subject}-{timestamp}.png"
    output_path = output_dir / filename
    
    # Initialize OpenAI client
    client = OpenAI(api_key=api_key)
    
    # Generate image
    image_url, revised_prompt = generate_image(
        client, 
        args.subject, 
        args.size, 
        args.quality
    )
    
    print("\n✨ Image generated successfully!")
    print(f"🔗 URL: {image_url}")
    print(f"\n📝 DALL-E's revised prompt:")
    print("─" * 60)
    print(revised_prompt)
    print("─" * 60)
    
    # Download image
    download_image(image_url, output_path)
    
    # Save metadata
    save_metadata(output_dir, args.subject, image_url, revised_prompt)
    
    # Print post-processing instructions
    post_process_instructions(output_path)
    
    print("\n✅ Done!")
    print(f"\n📁 Files created:")
    print(f"   • {output_path}")
    print(f"   • {output_dir / 'metadata.json'}")
    
    # Cost estimate
    cost = 0.040 if args.quality == "standard" else 0.080
    print(f"\n💰 Estimated cost: ${cost:.3f} USD")
    print("   (Check https://openai.com/pricing for current rates)")
    

if __name__ == "__main__":
    main()

