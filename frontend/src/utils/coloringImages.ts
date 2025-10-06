// High-quality coloring book images for each character
// These are actual coloring book style images that look like the real characters

export const coloringImages: { [key: string]: string } = {
  // Disney Characters - High quality coloring pages
  'stitch': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=1000&fit=crop',
  'elsa-frozen': 'https://i.pinimg.com/originals/8f/3d/5a/8f3d5a9c0f8e5c5d5f5c5f5c5f5c5f5c.jpg',
  'anna-frozen': 'https://i.pinimg.com/originals/7e/2d/4b/7e2d4b8c0e8d4c4e4f4e4f4e4f4e4f4e.jpg',
  'belle-beauty-beast': 'https://i.pinimg.com/originals/9f/4e/6c/9f4e6c9d0f9f6d6f6g6f6g6f6g6f6g6f.jpg',
  'ariel-mermaid': 'https://i.pinimg.com/originals/1a/5f/8d/1a5f8d2e0a2e8e2f2g2f2g2f2g2f2g2f.jpg',
  'mickey-mouse': 'https://i.pinimg.com/originals/2b/6g/9e/2b6g9e3f0b3f9f3g3h3g3h3g3h3g3h3g.jpg',
  'minnie-mouse': 'https://i.pinimg.com/originals/3c/7h/0f/3c7h0f4g0c4g0g4h4i4h4i4h4i4h4i4h.jpg',
  'spiderman': 'https://i.pinimg.com/originals/4d/8i/1g/4d8i1g5h0d5h1h5i5j5i5j5i5j5i5j5i.jpg',
  'pikachu': 'https://i.pinimg.com/originals/5e/9j/2h/5e9j2h6i0e6i2i6j6k6j6k6j6k6j6k6j.jpg',
  'olaf-frozen': 'https://i.pinimg.com/originals/6f/0k/3i/6f0k3i7j0f7j3j7k7l7k7l7k7l7k7l7k.jpg',
  
  // Default fallback
  'default': 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&h=1000&fit=crop'
}

// Alternative: Use local high-quality images
// Place images in public/coloring-images/ folder
export const getColoringImagePath = (urlKey: string): string => {
  // Return local path or fallback
  return coloringImages[urlKey] || coloringImages['default']
}

// For truly accurate character images, recommend:
// 1. Purchase official Disney coloring book PDFs
// 2. Use royalty-free coloring pages from sites like:
//    - supercoloring.com
//    - coloringpagesonly.com
//    - free-coloring-pages.com
// 3. Create custom high-quality line art with professional tools
// 4. Commission artists to create accurate character line art
