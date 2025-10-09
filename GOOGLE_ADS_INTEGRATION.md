# Google AdSense Integration Guide

This guide explains how to integrate Google AdSense into the Kids Painting Fun website.

## Current Setup

The website is **prepared for Google Ads** with:
- ✅ Flexible layout that accommodates ad spaces
- ✅ Mobile-optimized spacing (50px margins reserved for ads)
- ✅ `AdSpace` component ready for ad insertion
- ✅ No image cropping even with ads present

## Ad Space Locations

The layout reserves space for ads in these strategic locations:

### 1. **Homepage**
- **Top Banner**: Above hero section (728x90 or responsive)
- **Between Sections**: Between category cards and featured paintings
- **Sidebar** (Desktop): Right side of content

### 2. **Painting Page** (Interactive Coloring)
- **Top**: Above the canvas (mobile: 320x50, desktop: 728x90)
- **Bottom**: Below the color tools (320x50)
- **Sidebar** (Desktop Only): Next to canvas

### 3. **Category Pages**
- **Top Banner**: Above category title
- **Between Rows**: Every 6-9 paintings

## Integration Steps

### Step 1: Get Google AdSense Account

1. Apply at [Google AdSense](https://www.google.com/adsense)
2. Get your **Publisher ID** (ca-pub-XXXXXXXXXXXXXXXX)
3. Create **Ad Units** for different placements
4. Get **Ad Slot IDs** for each unit

### Step 2: Add AdSense Script to HTML

Add to `frontend/index.html` in the `<head>` section:

```html
<!-- Google AdSense -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossorigin="anonymous"></script>
```

### Step 3: Enable Ads in Environment

Create/update `frontend/.env`:

```env
VITE_ADS_ENABLED=true
VITE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
```

### Step 4: Update AdSpace Component

Edit `frontend/src/components/AdSpace.tsx`:

```tsx
function AdSpace({ slot = 'top', height = 50 }: AdSpaceProps) {
  const adsEnabled = import.meta.env.VITE_ADS_ENABLED === 'true'
  const adClient = import.meta.env.VITE_ADSENSE_CLIENT

  useEffect(() => {
    if (adsEnabled && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (e) {
        console.error('AdSense error:', e)
      }
    }
  }, [adsEnabled])

  if (!adsEnabled) return null

  // Ad slot IDs for different placements
  const adSlots: Record<string, string> = {
    top: 'XXXXXXXXXX',      // Your top banner ad slot
    bottom: 'YYYYYYYYYY',   // Your bottom banner ad slot
    sidebar: 'ZZZZZZZZZZ',  // Your sidebar ad slot
  }

  return (
    <AdContainer $height={height} className="ad-enabled">
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client={adClient}
           data-ad-slot={adSlots[slot]}
           data-ad-format="auto"
           data-full-width-responsive="true">
      </ins>
    </AdContainer>
  )
}
```

### Step 5: Add Ads to Pages

#### HomePage.tsx
```tsx
import AdSpace from '../components/AdSpace'

function HomePage() {
  return (
    <Container>
      <AdSpace slot="top" height={90} />
      <Hero>...</Hero>
      
      <CategoriesSection>...</CategoriesSection>
      
      <AdSpace slot="sidebar" height={250} />
      
      <FeaturedSection>...</FeaturedSection>
    </Container>
  )
}
```

#### InteractiveColoring.tsx
```tsx
import AdSpace from './AdSpace'

function InteractiveColoring() {
  return (
    <Container>
      {/* Top ad - mobile friendly */}
      <AdSpace slot="top" height={50} />
      
      <MainContent>
        <CanvasSection>...</CanvasSection>
        <ColorSection>...</ColorSection>
      </MainContent>
      
      {/* Bottom ad - above toolbar on mobile */}
      <AdSpace slot="bottom" height={50} />
      
      <MobileToolbar>...</MobileToolbar>
    </Container>
  )
}
```

## Ad Sizes Recommendations

### Mobile (< 768px)
- **Banner**: 320x50 (Mobile Leaderboard)
- **Large Banner**: 320x100
- **Responsive**: Let AdSense auto-optimize

### Tablet (768px - 1024px)
- **Banner**: 728x90 (Leaderboard)
- **Medium Rectangle**: 300x250

### Desktop (> 1024px)
- **Large Leaderboard**: 970x90
- **Billboard**: 970x250
- **Sidebar**: 300x600 (Half Page)
- **Sidebar**: 300x250 (Medium Rectangle)

## Layout Adjustments

The current layout already accounts for ads:

### Mobile Canvas Height
```css
/* InteractiveColoring mobile canvas */
height: calc(100vh - 345px);
/* Breakdown:
   - Header with search: ~130px
   - Color slider: ~80px
   - Toolbar: ~85px
   - Ad space margin: ~50px
   = 345px total
*/
```

### Future-Proof Spacing
- All mobile layouts have `padding-bottom: 180px` to accommodate bottom ads
- Canvas uses `object-fit: contain` to prevent cropping
- Flexible height calculations work with dynamic ad sizes

## Testing Ads

1. **Development**: Use test ad units
   ```
   data-ad-client="ca-pub-3940256099942544"  // Google's test publisher ID
   data-ad-slot="1234567890"                   // Test slot
   ```

2. **Staging**: Use your real publisher ID but test mode
   - Enable test mode in AdSense dashboard
   - Verify ad placements don't break layout

3. **Production**: 
   - Enable real ads
   - Monitor revenue and user experience
   - Adjust placements based on performance

## Performance Optimization

### Lazy Loading Ads
```tsx
// Only load ads when visible
const [isVisible, setIsVisible] = useState(false)
const adRef = useRef<HTMLDivElement>(null)

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
      }
    },
    { threshold: 0.1 }
  )

  if (adRef.current) {
    observer.observe(adRef.current)
  }

  return () => observer.disconnect()
}, [])
```

### Ad Blocking Detection
```tsx
useEffect(() => {
  // Check if ad blocker is active
  if (window.adsbygoogle && window.adsbygoogle.loaded === false) {
    console.log('Ad blocker detected')
    // Optional: Show polite message
  }
}, [])
```

## Best Practices

1. ✅ **Don't overload**: Maximum 3 ads per page
2. ✅ **User experience first**: Never compromise coloring experience
3. ✅ **Mobile-friendly**: Use responsive ad units
4. ✅ **Fast loading**: Implement lazy loading
5. ✅ **A/B testing**: Test different ad placements
6. ✅ **Analytics**: Track revenue vs. user engagement

## Troubleshooting

### Ads Not Showing
- Check publisher ID is correct
- Verify ad slots are created in AdSense
- Ensure website is approved by AdSense
- Check browser console for errors
- Disable ad blockers for testing

### Layout Issues
- Adjust `height` prop in `AdSpace` components
- Update mobile spacing calculations
- Test on multiple devices
- Use Chrome DevTools device mode

### Revenue Optimization
- Try different ad sizes
- Experiment with placements
- Enable auto ads (optional)
- Monitor click-through rates (CTR)

## Support

- [Google AdSense Help Center](https://support.google.com/adsense)
- [AdSense Policy Center](https://support.google.com/adsense/answer/48182)
- [AdSense Optimization Tips](https://support.google.com/adsense/answer/17957)

---

**Note**: The current layout is optimized for ads but ads are **disabled by default**. Enable them only when your AdSense account is approved and configured.

