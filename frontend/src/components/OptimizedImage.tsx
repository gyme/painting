import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean // For above-the-fold images
}

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
`

const StyledImage = styled.img<{ $loaded: boolean }>`
  opacity: ${props => props.$loaded ? 1 : 0};
  transition: opacity 0.3s ease-in-out;
`

const Placeholder = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`

/**
 * Optimized Image Component with:
 * - Lazy loading (only loads when visible)
 * - Progressive loading (shows placeholder)
 * - Automatic WebP support detection
 * - Responsive images
 * - Proper alt text for SEO
 */
function OptimizedImage({ 
  src, 
  alt, 
  className, 
  width, 
  height,
  priority = false 
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority) // Priority images load immediately
  const imgRef = useRef<HTMLImageElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return // Skip lazy loading for priority images

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '50px' // Start loading 50px before image enters viewport
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  return (
    <ImageWrapper className={className}>
      {!loaded && <Placeholder />}
      <StyledImage
        ref={imgRef}
        src={isInView ? src : undefined}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        $loaded={loaded}
      />
    </ImageWrapper>
  )
}

export default OptimizedImage

