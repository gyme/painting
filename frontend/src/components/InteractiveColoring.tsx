import { useState, useRef, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { getProfessionalColoringArt } from './ProfessionalColoringArt'

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    padding: 0;
    border-radius: 0;
    max-width: 100%;
    margin: 0;
    box-shadow: none;
    min-height: 0;
    display: flex;
    flex-direction: column;
    background: white;
    flex: 1;
  }
`

const MainContent = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 0;
  }
  
  @media (max-width: 768px) {
    flex: 1;
    min-height: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
`

const CanvasSection = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 1024px) {
    width: 100%;
  }
  
  @media (max-width: 768px) {
    flex: 1;
    min-height: 0;
    overflow: visible;
    display: flex;
    flex-direction: column;
    background: white;
    padding: 0;
    margin: 0;
    position: relative;
  }
`

const ColorSection = styled.div<{ $isOpen?: boolean }>`
  width: 400px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  
  @media (max-width: 1024px) {
    width: 100%;
  }
  
  @media (max-width: 768px) {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) ${props => props.$isOpen ? 'scale(1)' : 'scale(0.9)'};
    width: 88%;
    max-width: 400px;
    padding: 0;
    gap: 0;
    background: transparent;
    border-radius: 24px;
    box-shadow: none;
    z-index: 2000;
    opacity: ${props => props.$isOpen ? '1' : '0'};
    pointer-events: ${props => props.$isOpen ? 'all' : 'none'};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: visible;
    max-height: none;
  }
`

const CanvasWrapper = styled.div<{ $cursorType: string }>`
  position: relative;
  border: 4px solid #333;
  border-radius: 15px;
  overflow: hidden;
  background: white;
  cursor: ${props => props.$cursorType};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  max-width: 100%;
  
  canvas {
    display: block;
    width: 100%;
    height: auto;
  }
  
  @media (max-width: 768px) {
    border: none;
    border-radius: 0;
    margin: 0;
    padding: 0;
    width: 100vw;
    height: calc(100vh - 240px);
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    position: relative;
    
    canvas {
      display: block;
      background: white;
      width: 100% !important;
      height: 100% !important;
      object-fit: contain;
      margin: auto;
    }
  }
`

const ColorPaletteContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  background: white;
  padding: 1.75rem 2rem 1.75rem 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(0, 0, 0, 0.06);
  
  @media (max-width: 1024px) {
    margin-top: 2rem;
  }
  
  @media (max-width: 768px) {
    margin-top: 0;
    border-radius: 20px;
    background: white;
    padding: 1.4rem 1.6rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    gap: 0.85rem;
  }
`

const PaletteTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  text-align: center;
  flex-shrink: 0;
  padding-bottom: 0.75rem;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    padding-bottom: 0.5rem;
  }
`

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.7rem;
  justify-items: center;
  align-items: center;
  width: 100%;
  max-width: 100%;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(6, 1fr);
    gap: 0.7rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(6, 1fr);
    gap: 0.5rem;
    justify-content: center;
    width: 100%;
  }
`

const ColorButton = styled.button<{ color: string; $isSelected: boolean }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: none;
  background: ${props => props.color};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.$isSelected 
    ? `0 8px 25px ${props.color}80, 0 0 0 3px white, 0 0 0 5px ${props.color}` 
    : '0 4px 15px rgba(0, 0, 0, 0.15)'};
  transform: ${props => props.$isSelected ? 'scale(1.08) translateY(-2px)' : 'scale(1)'};
  position: relative;

  &:hover {
    transform: scale(1.12) translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(0.95) translateY(0);
  }
  
  @media (max-width: 1024px) {
    width: 48px;
    height: 48px;
    border-radius: 12px;
  }
  
  @media (max-width: 768px) {
    width: 46px;
    height: 46px;
    border-radius: 11px;
    margin: 0 auto;
  }
`

const ToolsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.4rem;
  background: white;
  padding: 0.75rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  
  @media (max-width: 1024px) {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1rem;
    padding: 1rem;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`

const ToolButton = styled.button<{ $isActive?: boolean }>`
  padding: 0.5rem 0.5rem;
  background: ${props => props.$isActive ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f8f9fa'};
  color: ${props => props.$isActive ? 'white' : '#2d3436'};
  border: 2px solid ${props => props.$isActive ? '#667eea' : '#e9ecef'};
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  text-align: center;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    background: ${props => props.$isActive ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
  }
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: 1024px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    flex: 1;
    min-width: 100px;
  }
  
  @media (max-width: 768px) {
    padding: 0.7rem 0.5rem;
    font-size: 0.85rem;
    border-radius: 10px;
    white-space: nowrap;
  }
`

const MobileToolbar = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-top: 2px solid rgba(255, 255, 255, 0.2);
    padding: 0.7rem 0.9rem calc(0.7rem + env(safe-area-inset-bottom)) 0.9rem;
    box-shadow: 0 -4px 30px rgba(102, 126, 234, 0.4);
    flex-shrink: 0;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    backdrop-filter: blur(10px);
  }
`

const MobileButtonRow = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.5rem;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  justify-items: center;
  
  @media (max-width: 350px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.4rem;
  }
`

const MobileToolButton = styled.button<{ color?: string; $isActive?: boolean }>`
  padding: 0.7rem 0.5rem;
  background: ${props => props.color || (props.$isActive ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.25)')};
  color: white;
  border: 2px solid ${props => props.$isActive ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.3)'};
  border-radius: 15px;
  font-size: 0.7rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.$isActive 
    ? '0 6px 20px rgba(0, 0, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.3)'
    : '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  min-height: 70px;
  min-width: 0;
  flex: 1;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:active {
    transform: scale(0.95);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
    
    &::before {
      opacity: 1;
    }
  }
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  @media (max-width: 350px) {
    min-height: 65px;
    padding: 0.5rem 0.3rem;
    font-size: 0.65rem;
    gap: 0.15rem;
  }
`


const MobileOverlay = styled.div<{ $isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    z-index: 1999;
    opacity: ${props => props.$isOpen ? '1' : '0'};
    pointer-events: ${props => props.$isOpen ? 'all' : 'none'};
    transition: opacity 0.3s ease;
  }
`

const CloseButton = styled.button`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #ff4757;
    color: white;
    border: none;
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    
    &:active {
      transform: scale(0.9);
    }
  }
`


interface InteractiveColoringProps {
  imageUrl: string
  urlKey: string
  title: string
  onPrintReady?: (printFn: () => void) => void
}

const colors = [
  // Row 1: Dark shades
  { name: 'Charcoal', value: '#36454F' },
  { name: 'Maroon', value: '#800000' },
  { name: 'Brown', value: '#8B4513' },
  { name: 'Dark Green', value: '#006400' },
  { name: 'Teal', value: '#008080' },
  { name: 'Navy', value: '#000080' },
  
  // Row 2: Medium dark
  { name: 'Indigo', value: '#4B0082' },
  { name: 'Crimson', value: '#DC143C' },
  { name: 'Rust', value: '#B7410E' },
  { name: 'Olive', value: '#808000' },
  { name: 'Sea Green', value: '#2E8B57' },
  { name: 'Royal Blue', value: '#4169E1' },
  
  // Row 3: Medium shades
  { name: 'Purple', value: '#9370DB' },
  { name: 'Red', value: '#FF0000' },
  { name: 'Orange', value: '#FFA500' },
  { name: 'Yellow Green', value: '#9ACD32' },
  { name: 'Emerald', value: '#50C878' },
  { name: 'Blue', value: '#0066FF' },
  
  // Row 4: Bright shades
  { name: 'Magenta', value: '#FF00FF' },
  { name: 'Hot Pink', value: '#FF1493' },
  { name: 'Coral', value: '#FF7F50' },
  { name: 'Lime', value: '#00FF00' },
  { name: 'Aqua', value: '#00CED1' },
  { name: 'Sky Blue', value: '#00BFFF' },
  
  // Row 5: Pastel shades
  { name: 'Lavender', value: '#E6E6FA' },
  { name: 'Pink', value: '#FFB6C1' },
  { name: 'Peach', value: '#FFDAB9' },
  { name: 'Mint', value: '#98FF98' },
  { name: 'Powder Blue', value: '#B0E0E6' },
  { name: 'Periwinkle', value: '#CCCCFF' },
  
  // Row 6: Light & Neutral
  { name: 'White', value: '#FFFFFF' },
  { name: 'Cream', value: '#FFFDD0' },
  { name: 'Yellow', value: '#FFFF00' },
  { name: 'Beige', value: '#F5F5DC' },
  { name: 'Silver', value: '#C0C0C0' },
  { name: 'Gray', value: '#808080' },
]

function InteractiveColoring({ imageUrl, urlKey, title, onPrintReady }: InteractiveColoringProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedColor, setSelectedColor] = useState(colors[0].value)
  const originalImageRef = useRef<HTMLImageElement | null>(null)
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
  const isProcessingRef = useRef(false)
  
  // Tool selection: 'fill', 'brush', 'eraser'
  const [selectedTool, setSelectedTool] = useState<'fill' | 'brush' | 'eraser'>('fill')
  const [brushSize] = useState(10)
  const isDrawingRef = useRef(false)
  
  // Undo/Redo history
  const [history, setHistory] = useState<ImageData[]>([])
  const [historyStep, setHistoryStep] = useState(-1)
  
  // Prevent scrolling on mobile
  useEffect(() => {
    if (window.innerWidth <= 768) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      
      return () => {
        document.body.style.overflow = ''
        document.body.style.position = ''
        document.body.style.width = ''
      }
    }
  }, [])
  
  // WATERMARK CONFIGURATION - Change this to your website name
  const WATERMARK_TEXT = 'MyColoringApp.com' // ← CHANGE THIS!

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    // Set canvas size - optimized for performance on all devices
    const isMobile = window.innerWidth <= 768
    if (isMobile) {
      // On mobile, fill entire available space
      // Account for header (~60px), breadcrumbs (~40px) and toolbar (~140px with safe area + margins + padding) = 240px total
      const availableHeight = window.innerHeight - 240
      canvas.width = window.innerWidth
      canvas.height = availableHeight
    } else {
      // Desktop: also reduce size for better performance
      canvas.width = 600
      canvas.height = 800
    }

    // Fill with white background
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Try to load real coloring image first
    const img = new Image()
    img.crossOrigin = 'anonymous'
    
    // Construct proper image path
    const getImagePath = () => {
      // Check if imageUrl is valid
      if (imageUrl && !imageUrl.includes('placeholder') && !imageUrl.includes('example.com')) {
        console.log('Using imageUrl:', imageUrl)
        // Always use PNG, not JPG
        const pngUrl = imageUrl.replace('.jpg', '.png')
        console.log('Corrected to PNG:', pngUrl)
        return pngUrl
      }
      // Fallback: construct from urlKey
      const fileName = urlKey.replace(/-/g, '_')
      const path = `/coloring-images/${fileName}.png`
      console.log('Using constructed path:', path)
      return path
    }
    
    // Try local images first, then fall back to drawing
    img.onload = () => {
      console.log('Image loaded successfully:', img.src, 'Size:', img.width, 'x', img.height)
      // Store the image for later use (clear, etc.)
      originalImageRef.current = img
      
      // Draw the loaded image
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      // Always use contain mode (fit entire image) - never crop
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height)
      const x = (canvas.width - img.width * scale) / 2
      const y = (canvas.height - img.height * scale) / 2
      console.log('Drawing image at:', x, y, 'scale:', scale)
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
      
      // Replace grey background with white for display (keeps original for perfect coloring)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      const greyBg = { r: 76, g: 105, b: 113 } // The grey background color
      const tolerance = 30 // Color similarity threshold
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        
        // Calculate distance from grey background color
        const distance = Math.sqrt(
          Math.pow(r - greyBg.r, 2) +
          Math.pow(g - greyBg.g, 2) +
          Math.pow(b - greyBg.b, 2)
        )
        
        // If pixel is close to grey background, make it white
        if (distance <= tolerance) {
          data[i] = 255     // R
          data[i + 1] = 255 // G
          data[i + 2] = 255 // B
          // Keep alpha as-is
        }
      }
      
      ctx.putImageData(imageData, 0, 0)
      
      // No watermark during coloring - only on save/print
    }
    
    img.onerror = (e) => {
      console.error('Image failed to load:', img.src, e)
      // PNG failed, try JPG
      if (img.src.endsWith('.png')) {
        const fileName = urlKey.replace(/-/g, '_')
        const jpgPath = `/coloring-images/${fileName}.jpg`
        const absoluteJpgPath = `${window.location.origin}${jpgPath}`
        console.log('Trying JPG fallback:', absoluteJpgPath)
        img.src = absoluteJpgPath
        return
      }
      
      console.log('Both PNG and JPG failed, trying SVG artwork')
      // Both PNG and JPG failed, try our professional high-quality SVG artwork
      const originalArt = getProfessionalColoringArt(urlKey)
      if (originalArt) {
        console.log('Found SVG artwork for:', urlKey)
        // Render SVG to canvas
        const svgBlob = new Blob([originalArt], { type: 'image/svg+xml;charset=utf-8' })
        const url = URL.createObjectURL(svgBlob)
        const svgImg = new Image()
        svgImg.onload = () => {
          console.log('SVG loaded successfully')
          // Store the SVG image for later use
          originalImageRef.current = svgImg
          
          ctx.fillStyle = 'white'
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          // Always use contain mode (fit entire image) - never crop
          const scale = Math.min(canvas.width / svgImg.width, canvas.height / svgImg.height)
          const x = (canvas.width - svgImg.width * scale) / 2
          const y = (canvas.height - svgImg.height * scale) / 2
          ctx.drawImage(svgImg, x, y, svgImg.width * scale, svgImg.height * scale)
          
          // Replace grey background with white for display
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const data = imageData.data
          const greyBg = { r: 76, g: 105, b: 113 }
          const tolerance = 30
          
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i]
            const g = data[i + 1]
            const b = data[i + 2]
            
            const distance = Math.sqrt(
              Math.pow(r - greyBg.r, 2) +
              Math.pow(g - greyBg.g, 2) +
              Math.pow(b - greyBg.b, 2)
            )
            
            if (distance <= tolerance) {
              data[i] = 255
              data[i + 1] = 255
              data[i + 2] = 255
            }
          }
          
          ctx.putImageData(imageData, 0, 0)
          
          // No watermark during coloring - only on save/print
          
          URL.revokeObjectURL(url)
        }
        svgImg.src = url
      } else {
        console.log('No SVG artwork found for:', urlKey)
      }
      // Remove fallback drawing - if no artwork exists, canvas stays white
    }
    
    // Try to load the image
    const imagePath = getImagePath()
    // Force absolute URL with current origin to avoid cache issues
    const absolutePath = imagePath.startsWith('http') ? imagePath : `${window.location.origin}${imagePath}`
    console.log('Loading image from:', absolutePath)
    img.src = absolutePath
    
  }, [imageUrl, urlKey, WATERMARK_TEXT])

  // Attach touch event listeners with { passive: false } to allow preventDefault
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      const touch = e.touches[0]
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx || !canvas) return

      const coords = getCanvasCoordinates(touch as any)
      if (!coords) return

      const { x, y } = coords

      if (selectedTool === 'fill' || selectedTool === 'eraser') {
        if (isProcessingRef.current) {
          console.log('Already processing, please wait...')
          return
        }

        isProcessingRef.current = true
        
        try {
          saveToHistory(ctx)
          const fillColor = selectedTool === 'eraser' ? '#FFFFFF' : selectedColor
          floodFill(ctx, Math.floor(x), Math.floor(y), fillColor)
        } finally {
          setTimeout(() => {
            isProcessingRef.current = false
          }, 100)
        }
      } else {
        isDrawingRef.current = true
        saveToHistory(ctx)
        drawBrush(x, y, selectedColor)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      if (!isDrawingRef.current || selectedTool === 'fill' || selectedTool === 'eraser') return

      const touch = e.touches[0]
      const coords = getCanvasCoordinates(touch as any)
      if (!coords) return

      const { x, y } = coords
      drawBrush(x, y, selectedColor)
    }

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault()
      isDrawingRef.current = false
    }

    // Add listeners with { passive: false } to allow preventDefault
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false })
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false })

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchend', handleTouchEnd)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTool, selectedColor, brushSize])

  // Removed all draw functions - using professional SVG artwork instead

  const isBlackLine = useCallback((color: { r: number, g: number, b: number }): boolean => {
    // Consider pixels as black lines if they're very dark (black or near-black)
    // This threshold allows fill/erase to work on grey areas
    return color.r < 30 && color.g < 30 && color.b < 30
  }, [])

  const isOriginalArtwork = useCallback((color: { r: number, g: number, b: number }): boolean => {
    // For brush protection: protect darker pixels including shading
    // This prevents the brush from painting over grey/shaded areas
    return color.r < 80 && color.g < 80 && color.b < 80
  }, [])

  const saveToHistory = useCallback((ctx: CanvasRenderingContext2D) => {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
    setHistory(prevHistory => {
      const newHistory = prevHistory.slice(0, historyStep + 1)
      newHistory.push(imageData)
      
      // Limit history to last 10 states to prevent memory issues on mobile
      if (newHistory.length > 10) {
        newHistory.shift()
        return newHistory
      }
      return newHistory
    })
    
    setHistoryStep(prev => {
      const newStep = prev + 1
      return newStep >= 10 ? 9 : newStep
    })
  }, [historyStep])

  const getCanvasCoordinates = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.Touch) => {
    const canvas = canvasRef.current
    if (!canvas) return null

    const rect = canvas.getBoundingClientRect()
    
    // Calculate the actual displayed canvas size with object-fit: contain
    const canvasAspect = canvas.width / canvas.height
    const displayAspect = rect.width / rect.height
    
    let displayWidth, displayHeight, offsetX, offsetY
    
    if (displayAspect > canvasAspect) {
      // Pillarboxed (black bars on sides)
      displayHeight = rect.height
      displayWidth = displayHeight * canvasAspect
      offsetX = (rect.width - displayWidth) / 2
      offsetY = 0
    } else {
      // Letterboxed (black bars on top/bottom)
      displayWidth = rect.width
      displayHeight = displayWidth / canvasAspect
      offsetX = 0
      offsetY = (rect.height - displayHeight) / 2
    }
    
    // Convert click position to canvas coordinates
    // Both MouseEvent and Touch have clientX and clientY properties
    const clientX = e.clientX
    const clientY = e.clientY
    const clickX = clientX - rect.left - offsetX
    const clickY = clientY - rect.top - offsetY
    
    const x = (clickX / displayWidth) * canvas.width
    const y = (clickY / displayHeight) * canvas.height

    return { x, y }
  }, [])

  const drawBrush = useCallback((x: number, y: number, color: string) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d', { willReadFrequently: true })
    if (!ctx || !canvas) return

    // Optimize: Only read a small region around the brush, not the entire canvas
    const size = brushSize * 2 + 1
    const startX = Math.max(0, Math.floor(x - brushSize))
    const startY = Math.max(0, Math.floor(y - brushSize))
    const width = Math.min(size, canvas.width - startX)
    const height = Math.min(size, canvas.height - startY)
    
    // Only read the small region we need
    const imageData = ctx.getImageData(startX, startY, width, height)
    
    // Draw brush stroke pixel by pixel in the small region
    for (let i = -brushSize; i <= brushSize; i++) {
      for (let j = -brushSize; j <= brushSize; j++) {
        const distance = Math.sqrt(i * i + j * j)
        if (distance <= brushSize) {
          const pixelX = Math.floor(x + i)
          const pixelY = Math.floor(y + j)
          
          // Convert to local coordinates in the small region
          const localX = pixelX - startX
          const localY = pixelY - startY
          
          if (localX >= 0 && localX < width && localY >= 0 && localY < height) {
            const index = (localY * imageData.width + localX) * 4
            const pixelColor = {
              r: imageData.data[index],
              g: imageData.data[index + 1],
              b: imageData.data[index + 2]
            }
            
            // Don't paint over original artwork (uses stricter threshold)
            if (!isOriginalArtwork(pixelColor)) {
              const rgb = hexToRgb(color)
              imageData.data[index] = rgb.r
              imageData.data[index + 1] = rgb.g
              imageData.data[index + 2] = rgb.b
              imageData.data[index + 3] = 255
            }
          }
        }
      }
    }
    
    // Write back only the small region
    ctx.putImageData(imageData, startX, startY)
  }, [brushSize, isOriginalArtwork])

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d', { willReadFrequently: true })
    if (!ctx || !canvas) return

    const coords = getCanvasCoordinates(e)
    if (!coords) return

    const { x, y } = coords

    if (selectedTool === 'fill' || selectedTool === 'eraser') {
      // Prevent multiple simultaneous operations
      if (isProcessingRef.current) {
        console.log('Already processing, please wait...')
        return
      }

      // Set processing flag
      isProcessingRef.current = true
      
      try {
        // Save state before filling
        saveToHistory(ctx)
        
        // Use white for eraser, selected color for fill
        const fillColor = selectedTool === 'eraser' ? '#FFFFFF' : selectedColor
        floodFill(ctx, Math.floor(x), Math.floor(y), fillColor)
      } finally {
        // Reset processing flag AFTER fill completes
        setTimeout(() => {
          isProcessingRef.current = false
        }, 100)
      }
    } else {
      // Brush tool
      isDrawingRef.current = true
      saveToHistory(ctx)
      drawBrush(x, y, selectedColor)
    }
  }

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || selectedTool === 'fill' || selectedTool === 'eraser') return

    const coords = getCanvasCoordinates(e)
    if (!coords) return

    const { x, y } = coords
    drawBrush(x, y, selectedColor)
  }

  const handleCanvasMouseUp = () => {
    isDrawingRef.current = false
  }


  const floodFill = (ctx: CanvasRenderingContext2D, startX: number, startY: number, fillColor: string) => {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
    const targetColor = getPixelColor(imageData, startX, startY)
    const fillColorRGB = hexToRgb(fillColor)
    
    // Don't fill if clicking on black lines (original artwork)
    if (isBlackLine(targetColor)) {
      console.log('Cannot color over black lines!')
      return
    }
    
    if (colorsMatch(targetColor, fillColorRGB, 5)) return

    const width = imageData.width
    const height = imageData.height
    
    // Optimized tolerance for ULTRA-high quality images (3x upscaled, heavy dilation)
    // Balanced to handle both light and dark colors perfectly
    // 25 is the sweet spot: dark colors fill cleanly, light colors don't bleed
    const tolerance = 25
    
    // Scanline flood fill - much faster than pixel-by-pixel
    const stack: [number, number][] = [[startX, startY]]
    
    while (stack.length > 0) {
      const [x, y] = stack.pop()!
      
      if (y < 0 || y >= height || x < 0 || x >= width) continue
      
      let currentX = x
      const currentY = y
      
      // Move left to find the leftmost pixel in this row
      while (currentX >= 0) {
        const color = getPixelColor(imageData, currentX, currentY)
        if (isBlackLine(color) || !colorsMatch(color, targetColor, tolerance)) break
        currentX--
      }
      currentX++ // Step back to the valid pixel
      
      let spanAbove = false
      let spanBelow = false
      
      // Fill the scanline from left to right
      while (currentX < width) {
        const color = getPixelColor(imageData, currentX, currentY)
        
        // Stop if we hit a boundary
        if (isBlackLine(color) || !colorsMatch(color, targetColor, tolerance)) break
        
        // Fill this pixel
        setPixelColor(imageData, currentX, currentY, fillColorRGB)
        
        // Check pixel above
        if (currentY > 0) {
          const colorAbove = getPixelColor(imageData, currentX, currentY - 1)
          if (!isBlackLine(colorAbove) && colorsMatch(colorAbove, targetColor, tolerance)) {
            if (!spanAbove) {
              stack.push([currentX, currentY - 1])
              spanAbove = true
            }
          } else {
            spanAbove = false
          }
        }
        
        // Check pixel below
        if (currentY < height - 1) {
          const colorBelow = getPixelColor(imageData, currentX, currentY + 1)
          if (!isBlackLine(colorBelow) && colorsMatch(colorBelow, targetColor, tolerance)) {
            if (!spanBelow) {
              stack.push([currentX, currentY + 1])
              spanBelow = true
            }
          } else {
            spanBelow = false
          }
        }
        
        currentX++
      }
    }
    
    ctx.putImageData(imageData, 0, 0)
    // Edge filling disabled for performance - flood fill with tolerance handles most cases
  }

  const getPixelColor = (imageData: ImageData, x: number, y: number) => {
    const index = (y * imageData.width + x) * 4
    return {
      r: imageData.data[index],
      g: imageData.data[index + 1],
      b: imageData.data[index + 2],
      a: imageData.data[index + 3]
    }
  }

  const setPixelColor = (imageData: ImageData, x: number, y: number, color: { r: number, g: number, b: number }) => {
    const index = (y * imageData.width + x) * 4
    imageData.data[index] = color.r
    imageData.data[index + 1] = color.g
    imageData.data[index + 2] = color.b
    imageData.data[index + 3] = 255
  }

  const hexToRgb = useCallback((hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 }
  }, [])

  const colorsMatch = useCallback((a: any, b: any, tolerance: number = 10) => {
    // Lower tolerance for more accurate fills - prevents color bleeding
    return Math.abs(a.r - b.r) <= tolerance && 
           Math.abs(a.g - b.g) <= tolerance && 
           Math.abs(a.b - b.b) <= tolerance
  }, [])

  const undo = useCallback(() => {
    if (historyStep <= 0) return
    
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d', { willReadFrequently: true })
    if (!ctx || !canvas) return
    
    const previousState = history[historyStep - 1]
    ctx.putImageData(previousState, 0, 0)
    setHistoryStep(historyStep - 1)
  }, [history, historyStep])

  const redo = useCallback(() => {
    if (historyStep >= history.length - 1) return
    
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d', { willReadFrequently: true })
    if (!ctx || !canvas) return
    
    const nextState = history[historyStep + 1]
    ctx.putImageData(nextState, 0, 0)
    setHistoryStep(historyStep + 1)
  }, [history, historyStep])

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    // Save state before clearing
    saveToHistory(ctx)

    // Clear canvas
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Reload the original image if we have it stored
    if (originalImageRef.current) {
      const img = originalImageRef.current
      // Always use contain mode (fit entire image) - never crop
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height)
      const x = (canvas.width - img.width * scale) / 2
      const y = (canvas.height - img.height * scale) / 2
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
      
      // Replace grey background with white for display
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      const greyBg = { r: 76, g: 105, b: 113 }
      const tolerance = 30
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        
        const distance = Math.sqrt(
          Math.pow(r - greyBg.r, 2) +
          Math.pow(g - greyBg.g, 2) +
          Math.pow(b - greyBg.b, 2)
        )
        
        if (distance <= tolerance) {
          data[i] = 255
          data[i + 1] = 255
          data[i + 2] = 255
        }
      }
      
      ctx.putImageData(imageData, 0, 0)
      
      // No watermark during coloring - only on save/print
    }
  }, [saveToHistory])

  const saveImage = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    // Create a temporary canvas with watermark for saving
    const saveCanvas = document.createElement('canvas')
    saveCanvas.width = canvas.width
    saveCanvas.height = canvas.height
    const saveCtx = saveCanvas.getContext('2d', { willReadFrequently: true })
    if (!saveCtx) return
    
    // Copy current canvas
    saveCtx.drawImage(canvas, 0, 0)
    
    // Add watermark for saved image
    saveCtx.save()
    saveCtx.globalAlpha = 1.0
    saveCtx.font = 'bold 24px Arial'
    saveCtx.fillStyle = '#000000'
    saveCtx.textAlign = 'center'
    saveCtx.fillText(WATERMARK_TEXT, saveCanvas.width / 2, saveCanvas.height - 30)
    saveCtx.restore()
    
    const link = document.createElement('a')
    link.download = `${title || 'coloring-page'}.png`
    link.href = saveCanvas.toDataURL()
    link.click()
  }, [title, WATERMARK_TEXT])


  const printImage = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    // Create a temporary canvas without the watermark for printing
    const printCanvas = document.createElement('canvas')
    printCanvas.width = canvas.width
    printCanvas.height = canvas.height
    const printCtx = printCanvas.getContext('2d', { willReadFrequently: true })
    if (!printCtx) return
    
    // Get the current canvas data
    const currentImageData = canvas.getContext('2d', { willReadFrequently: true })?.getImageData(0, 0, canvas.width, canvas.height)
    if (!currentImageData) return
    
    // Draw white background
    printCtx.fillStyle = 'white'
    printCtx.fillRect(0, 0, printCanvas.width, printCanvas.height)
    
    // Redraw the original image without watermark
    if (originalImageRef.current) {
      const img = originalImageRef.current
      // Always use contain mode (fit entire image) - never crop
      const scale = Math.min(printCanvas.width / img.width, printCanvas.height / img.height)
      const x = (printCanvas.width - img.width * scale) / 2
      const y = (printCanvas.height - img.height * scale) / 2
      printCtx.drawImage(img, x, y, img.width * scale, img.height * scale)
      
      // Apply all the colored areas from the current canvas (but skip the watermark area)
      const colored = printCtx.getImageData(0, 0, printCanvas.width, printCanvas.height)
      for (let i = 0; i < currentImageData.data.length; i += 4) {
        const r = currentImageData.data[i]
        const g = currentImageData.data[i + 1]
        const b = currentImageData.data[i + 2]
        const a = currentImageData.data[i + 3]
        
        // If this pixel is colored (not white, not black line), copy it
        if (!(r === 255 && g === 255 && b === 255) && !(r < 30 && g < 30 && b < 30)) {
          colored.data[i] = r
          colored.data[i + 1] = g
          colored.data[i + 2] = b
          colored.data[i + 3] = a
        }
      }
      printCtx.putImageData(colored, 0, 0)
    } else {
      // If no original image, just use the current canvas without watermark
      printCtx.putImageData(currentImageData, 0, 0)
    }
    
    // Add watermark in solid black for printing (no transparency, clear and sharp)
    printCtx.save()
    printCtx.globalAlpha = 1.0
    printCtx.font = 'bold 24px Arial'
    printCtx.fillStyle = '#000000' // Solid black
    printCtx.textAlign = 'center'
    printCtx.fillText(WATERMARK_TEXT, printCanvas.width / 2, printCanvas.height - 30)
    printCtx.restore()
    
    const dataUrl = printCanvas.toDataURL()
    const printWindow = window.open('', '_blank')
    if (!printWindow) return
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Print - ${title}</title>
          <style>
            @page { 
              margin: 0; 
              size: auto; 
            }
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            html, body { 
              width: 100%;
              height: 100%;
              margin: 0;
              padding: 0;
            }
            body { 
              display: flex;
              justify-content: center;
              align-items: center;
            }
            img { 
              width: 100%;
              height: 100%;
              object-fit: contain;
              display: block;
            }
            @media print {
              html, body {
                width: 100%;
                height: 100%;
              }
              img { 
                width: 100vw;
                height: 100vh;
                object-fit: contain;
                page-break-after: avoid;
                page-break-before: avoid;
                page-break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          <img src="${dataUrl}" onload="window.print(); window.close();" />
        </body>
      </html>
    `)
    printWindow.document.close()
  }, [title, WATERMARK_TEXT])
  
  // Expose print function to parent component
  useEffect(() => {
    if (onPrintReady) {
      onPrintReady(printImage)
    }
  }, [onPrintReady, printImage])

  // Determine cursor type based on selected tool
  const getCursorType = useCallback(() => {
    if (selectedTool === 'fill') return 'crosshair'
    if (selectedTool === 'brush') return 'crosshair'
    if (selectedTool === 'eraser') return 'cell'
    return 'default'
  }, [selectedTool])

  return (
    <Container>
      <MainContent>
        <CanvasSection>
          <CanvasWrapper $cursorType={getCursorType()}>
            <canvas
              ref={canvasRef}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onMouseLeave={handleCanvasMouseUp}
            />
          </CanvasWrapper>
        </CanvasSection>

        {/* Mobile Overlay */}
        <MobileOverlay 
          $isOpen={isColorPickerOpen} 
          onClick={() => setIsColorPickerOpen(false)}
        />

        <ColorSection $isOpen={isColorPickerOpen}>
          <CloseButton onClick={() => setIsColorPickerOpen(false)}>
            ×
          </CloseButton>
          
          <ColorPaletteContainer>
            <PaletteTitle>🎨 Pick a Color</PaletteTitle>
            <ColorGrid>
              {colors.map((color, index) => (
                <ColorButton
                  key={`${color.name}-${index}`}
                  color={color.value}
                  $isSelected={selectedColor === color.value}
                  onClick={() => {
                    setSelectedColor(color.value)
                    // Auto-close on mobile after selecting color
                    if (window.innerWidth <= 768) {
                      setTimeout(() => setIsColorPickerOpen(false), 300)
                    }
                  }}
                  title={color.name}
                />
              ))}
            </ColorGrid>
          </ColorPaletteContainer>

          <ToolsContainer>
            <ToolButton 
              $isActive={selectedTool === 'fill'}
              onClick={() => setSelectedTool('fill')}
            >
              🪣 Fill
            </ToolButton>
            <ToolButton 
              $isActive={selectedTool === 'brush'}
              onClick={() => setSelectedTool('brush')}
            >
              ✏️ Brush
            </ToolButton>
            <ToolButton 
              $isActive={selectedTool === 'eraser'}
              onClick={() => setSelectedTool('eraser')}
            >
              🧹 Eraser
            </ToolButton>
            <ToolButton 
              onClick={() => {
                undo()
                if (window.innerWidth <= 768) {
                  setIsColorPickerOpen(false)
                }
              }} 
              disabled={historyStep <= 0}
            >
              ↶ Undo
            </ToolButton>
            <ToolButton 
              onClick={() => {
                redo()
                if (window.innerWidth <= 768) {
                  setIsColorPickerOpen(false)
                }
              }}
              disabled={historyStep >= history.length - 1}
            >
              ↷ Redo
            </ToolButton>
            <ToolButton onClick={() => {
              clearCanvas()
              if (window.innerWidth <= 768) {
                setIsColorPickerOpen(false)
              }
            }}>
              🗑️ Clear
            </ToolButton>
            <ToolButton onClick={() => {
              saveImage()
              if (window.innerWidth <= 768) {
                setIsColorPickerOpen(false)
              }
            }}>
              💾 Save
            </ToolButton>
            <ToolButton onClick={() => {
              printImage()
              if (window.innerWidth <= 768) {
                setIsColorPickerOpen(false)
              }
            }}>
              🖨️ Print
            </ToolButton>
          </ToolsContainer>
        </ColorSection>
      </MainContent>

      {/* Mobile Toolbar - Static at bottom */}
        <MobileToolbar>
          <MobileButtonRow>
            <MobileToolButton
              $isActive={selectedTool === 'fill'}
              onClick={() => setSelectedTool('fill')}
            >
              <span style={{ fontSize: '1.8rem', lineHeight: '1' }}>🪣</span>
              <span>Fill</span>
            </MobileToolButton>
            <MobileToolButton
              $isActive={selectedTool === 'brush'}
              onClick={() => setSelectedTool('brush')}
            >
              <span style={{ fontSize: '1.8rem', lineHeight: '1' }}>✏️</span>
              <span>Brush</span>
            </MobileToolButton>
            <MobileToolButton
              $isActive={selectedTool === 'eraser'}
              onClick={() => setSelectedTool('eraser')}
            >
              <span style={{ fontSize: '1.8rem', lineHeight: '1' }}>🧹</span>
              <span>Erase</span>
            </MobileToolButton>
            <MobileToolButton
              color={selectedColor}
              onClick={() => setIsColorPickerOpen(true)}
            >
              <span style={{ fontSize: '1.8rem', lineHeight: '1' }}>🎨</span>
              <span>Color</span>
            </MobileToolButton>
            <MobileToolButton onClick={undo} disabled={historyStep <= 0}>
              <span style={{ fontSize: '1.8rem', lineHeight: '1' }}>↶</span>
              <span>Undo</span>
            </MobileToolButton>
            <MobileToolButton onClick={printImage}>
              <span style={{ fontSize: '1.8rem', lineHeight: '1' }}>🖨️</span>
              <span>Print</span>
            </MobileToolButton>
          </MobileButtonRow>
        </MobileToolbar>
    </Container>
  )
}

export default InteractiveColoring
