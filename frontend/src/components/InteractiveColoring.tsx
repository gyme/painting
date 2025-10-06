import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { getProfessionalColoringArt } from './ProfessionalColoringArt'

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
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
  }
`

const CanvasWrapper = styled.div`
  position: relative;
  border: 4px solid #333;
  border-radius: 15px;
  overflow: hidden;
  background: white;
  cursor: crosshair;
  
  canvas {
    display: block;
    width: 100%;
    height: auto;
  }
  
  @media (max-width: 768px) {
    border: none;
    border-radius: 0;
    margin: 0;
  }
`

const ColorPaletteContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (max-width: 768px) {
    margin-top: 0;
    padding: 1rem;
    background: white;
  }
`

const PaletteTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3436;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
    gap: 0.75rem;
  }
`

const ColorButton = styled.button<{ color: string; isSelected: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  border: ${props => props.isSelected ? '4px solid #2d3436' : '3px solid #ddd'};
  background: ${props => props.color};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${props => props.isSelected ? '0 6px 20px rgba(0, 0, 0, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)'};
  transform: ${props => props.isSelected ? 'scale(1.1)' : 'scale(1)'};

  &:hover {
    transform: scale(1.15);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    border-radius: 10px;
  }
`

const ToolsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    margin-top: 0.5rem;
    padding: 0 1rem 1rem 1rem;
  }
`

const ToolButton = styled.button<{ isActive?: boolean }>`
  padding: 0.8rem 1.5rem;
  background: ${props => props.isActive ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
  color: ${props => props.isActive ? 'white' : '#2d3436'};
  border: 3px solid ${props => props.isActive ? '#667eea' : '#ddd'};
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
`

interface InteractiveColoringProps {
  imageUrl: string
  urlKey: string
  title: string
  onPrintReady?: (printFn: () => void) => void
}

const colors = [
  // Primary Colors
  { name: 'Red', value: '#FF0000' },
  { name: 'Orange', value: '#FFA500' },
  { name: 'Yellow', value: '#FFFF00' },
  { name: 'Green', value: '#32CD32' },
  { name: 'Blue', value: '#1E90FF' },
  { name: 'Purple', value: '#9370DB' },
  { name: 'Pink', value: '#FF69B4' },
  { name: 'Brown', value: '#8B4513' },
  
  // Light/Pastel Colors
  { name: 'Light Blue', value: '#87CEEB' },
  { name: 'Light Pink', value: '#FFB6C1' },
  { name: 'Light Green', value: '#90EE90' },
  { name: 'Peach', value: '#FFCBA4' },
  { name: 'Lavender', value: '#E6E6FA' },
  { name: 'Mint', value: '#98FF98' },
  { name: 'Baby Blue', value: '#89CFF0' },
  { name: 'Cream', value: '#FFFDD0' },
  
  // Bright/Vibrant Colors
  { name: 'Hot Pink', value: '#FF1493' },
  { name: 'Lime Green', value: '#00FF00' },
  { name: 'Turquoise', value: '#40E0D0' },
  { name: 'Magenta', value: '#FF00FF' },
  { name: 'Coral', value: '#FF7F50' },
  { name: 'Teal', value: '#008080' },
  
  // Dark/Rich Colors
  { name: 'Navy Blue', value: '#000080' },
  { name: 'Forest Green', value: '#228B22' },
  { name: 'Maroon', value: '#800000' },
  { name: 'Dark Purple', value: '#6A0DAD' },
  
  // Neutrals
  { name: 'White', value: '#FFFFFF' },
  { name: 'Light Gray', value: '#D3D3D3' },
  { name: 'Gray', value: '#808080' },
  { name: 'Beige', value: '#F5F5DC' },
  
  // Metallic
  { name: 'Gold', value: '#FFD700' },
  { name: 'Silver', value: '#C0C0C0' },
  
  // Additional Vibrant Colors
  { name: 'Cyan', value: '#00FFFF' },
  { name: 'Violet', value: '#8B00FF' },
  { name: 'Amber', value: '#FFBF00' },
  { name: 'Salmon', value: '#FA8072' },
  { name: 'Olive', value: '#808000' },
  { name: 'Indigo', value: '#4B0082' },
  { name: 'Rose', value: '#FF007F' },
  { name: 'Emerald', value: '#50C878' },
]

function InteractiveColoring({ urlKey, title, onPrintReady }: InteractiveColoringProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedColor, setSelectedColor] = useState(colors[0].value)
  const originalImageRef = useRef<HTMLImageElement | null>(null)
  
  // Undo/Redo history
  const [history, setHistory] = useState<ImageData[]>([])
  const [historyStep, setHistoryStep] = useState(-1)
  
  // WATERMARK CONFIGURATION - Change this to your website name
  const WATERMARK_TEXT = 'MyColoringApp.com' // ← CHANGE THIS!

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size - bigger on mobile for better visibility
    const isMobile = window.innerWidth <= 768
    if (isMobile) {
      // On mobile, use FULL width - edge to edge
      canvas.width = window.innerWidth
      // Make canvas very tall - most of the screen minus space for colors/buttons
      canvas.height = Math.max(window.innerHeight * 0.65, window.innerWidth * 1.6)
    } else {
      canvas.width = 800
      canvas.height = 1000
    }

    // Fill with white background
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Try to load real coloring image first
    const img = new Image()
    img.crossOrigin = 'anonymous'
    
    // Try local images first, then fall back to drawing
    const addWatermark = (ctx: CanvasRenderingContext2D) => {
      ctx.save()
      ctx.globalAlpha = 1.0
      ctx.font = 'bold 24px Arial'
      ctx.fillStyle = '#000000'
      ctx.textAlign = 'center'
      ctx.fillText(WATERMARK_TEXT, canvas.width / 2, canvas.height - 30)
      ctx.restore()
    }

    img.onload = () => {
      // Store the image for later use (clear, etc.)
      originalImageRef.current = img
      
      // Draw the loaded image
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      // Always use contain mode (fit entire image) - never crop
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height)
      const x = (canvas.width - img.width * scale) / 2
      const y = (canvas.height - img.height * scale) / 2
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
      
      // Add watermark
      addWatermark(ctx)
    }
    
    img.onerror = () => {
      // PNG not found, try our professional high-quality SVG artwork
      const originalArt = getProfessionalColoringArt(urlKey)
      if (originalArt) {
        // Render SVG to canvas
        const svgBlob = new Blob([originalArt], { type: 'image/svg+xml;charset=utf-8' })
        const url = URL.createObjectURL(svgBlob)
        const svgImg = new Image()
        svgImg.onload = () => {
          // Store the SVG image for later use
          originalImageRef.current = svgImg
          
          ctx.fillStyle = 'white'
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          // Always use contain mode (fit entire image) - never crop
          const scale = Math.min(canvas.width / svgImg.width, canvas.height / svgImg.height)
          const x = (canvas.width - svgImg.width * scale) / 2
          const y = (canvas.height - svgImg.height * scale) / 2
          ctx.drawImage(svgImg, x, y, svgImg.width * scale, svgImg.height * scale)
          
          // Add watermark
          addWatermark(ctx)
          
          URL.revokeObjectURL(url)
        }
        svgImg.src = url
      }
      // Remove fallback drawing - if no artwork exists, canvas stays white
    }
    
    // Try to load PNG from public folder first
    img.src = `/coloring-images/${urlKey}.png`
    
  }, [urlKey, WATERMARK_TEXT])

  // Removed all draw functions - using professional SVG artwork instead

  const isBlackLine = (color: { r: number, g: number, b: number }): boolean => {
    // Consider pixels as black lines if they're very dark (black or near-black)
    return color.r < 30 && color.g < 30 && color.b < 30
  }

  const saveToHistory = (ctx: CanvasRenderingContext2D) => {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
    const newHistory = history.slice(0, historyStep + 1)
    newHistory.push(imageData)
    
    // Limit history to last 20 states to prevent memory issues
    if (newHistory.length > 20) {
      newHistory.shift()
    } else {
      setHistoryStep(historyStep + 1)
    }
    
    setHistory(newHistory)
  }

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Save state before filling
    saveToHistory(ctx)
    
    // Only fill tool is available
    floodFill(ctx, Math.floor(x), Math.floor(y), selectedColor)
  }

  const floodFill = (ctx: CanvasRenderingContext2D, x: number, y: number, fillColor: string) => {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
    const targetColor = getPixelColor(imageData, x, y)
    const fillColorRGB = hexToRgb(fillColor)
    
    // Don't fill if clicking on black lines (original artwork)
    if (isBlackLine(targetColor)) {
      console.log('Cannot color over black lines!')
      return
    }
    
    if (colorsMatch(targetColor, fillColorRGB)) return

    const visited = new Set<string>()
    const stack: [number, number][] = [[x, y]]
    
    // Moderate tolerance to prevent color bleeding while still catching edges
    const fillTolerance = 35
    
    while (stack.length > 0) {
      const [currentX, currentY] = stack.pop()!
      
      if (currentX < 0 || currentX >= imageData.width || currentY < 0 || currentY >= imageData.height) continue
      
      const key = `${currentX},${currentY}`
      if (visited.has(key)) continue
      visited.add(key)
      
      const currentColor = getPixelColor(imageData, currentX, currentY)
      
      // Don't color over black lines
      if (isBlackLine(currentColor)) continue
      
      // Use higher tolerance for matching to catch edge pixels
      if (!colorsMatch(currentColor, targetColor, fillTolerance)) continue
      
      setPixelColor(imageData, currentX, currentY, fillColorRGB)
      
      // Add diagonal directions for better edge coverage
      stack.push([currentX + 1, currentY])
      stack.push([currentX - 1, currentY])
      stack.push([currentX, currentY + 1])
      stack.push([currentX, currentY - 1])
      
      // Add diagonal fills to catch corner pixels
      stack.push([currentX + 1, currentY + 1])
      stack.push([currentX + 1, currentY - 1])
      stack.push([currentX - 1, currentY + 1])
      stack.push([currentX - 1, currentY - 1])
    }
    
    ctx.putImageData(imageData, 0, 0)
    
    // Apply 2 passes to fill small gaps near edges (reduced to prevent bleeding)
    for (let pass = 0; pass < 2; pass++) {
      fillEdgeGaps(ctx, imageData, fillColorRGB, targetColor)
    }
  }
  
  const fillEdgeGaps = (ctx: CanvasRenderingContext2D, _originalData: ImageData, fillColorRGB: any, originalTarget: any) => {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
    let foundGaps = false
    
    // Look for white/light pixels near filled areas
    for (let y = 1; y < imageData.height - 1; y++) {
      for (let x = 1; x < imageData.width - 1; x++) {
        const currentColor = getPixelColor(imageData, x, y)
        
        // Skip if already filled or is a black line
        if (colorsMatch(currentColor, fillColorRGB, 15)) continue
        if (isBlackLine(currentColor)) continue
        
        // Check if this pixel is similar to the original target color (moderate tolerance)
        if (!colorsMatch(currentColor, originalTarget, 50)) continue
        
        // Check if surrounded by filled pixels (meaning it's a gap)
        let filledNeighbors = 0
        const neighbors = [
          [x+1, y], [x-1, y], [x, y+1], [x, y-1],
          [x+1, y+1], [x+1, y-1], [x-1, y+1], [x-1, y-1]
        ]
        
        for (const [nx, ny] of neighbors) {
          if (nx < 0 || nx >= imageData.width || ny < 0 || ny >= imageData.height) continue
          const neighborColor = getPixelColor(imageData, nx, ny)
          if (colorsMatch(neighborColor, fillColorRGB, 15)) {
            filledNeighbors++
          }
        }
        
        // Require 6 or more neighbors to be filled (more conservative to prevent bleeding)
        if (filledNeighbors >= 6) {
          setPixelColor(imageData, x, y, fillColorRGB)
          foundGaps = true
        }
      }
    }
    
    if (foundGaps) {
      ctx.putImageData(imageData, 0, 0)
    }
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

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 }
  }

  const colorsMatch = (a: any, b: any, tolerance: number = 30) => {
    // Increased tolerance to handle anti-aliasing and color variations
    return Math.abs(a.r - b.r) < tolerance && 
           Math.abs(a.g - b.g) < tolerance && 
           Math.abs(a.b - b.b) < tolerance
  }

  const undo = () => {
    if (historyStep <= 0) return
    
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !canvas) return
    
    const previousState = history[historyStep - 1]
    ctx.putImageData(previousState, 0, 0)
    setHistoryStep(historyStep - 1)
  }

  const redo = () => {
    if (historyStep >= history.length - 1) return
    
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!ctx || !canvas) return
    
    const nextState = history[historyStep + 1]
    ctx.putImageData(nextState, 0, 0)
    setHistoryStep(historyStep + 1)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
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
      
      // Re-add watermark
      ctx.save()
      ctx.globalAlpha = 1.0
      ctx.font = 'bold 24px Arial'
      ctx.fillStyle = '#000000'
      ctx.textAlign = 'center'
      ctx.fillText(WATERMARK_TEXT, canvas.width / 2, canvas.height - 30)
      ctx.restore()
    }
  }

  const saveImage = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const link = document.createElement('a')
    link.download = `${title || 'coloring-page'}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  const printImage = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    // Create a temporary canvas without the watermark for printing
    const printCanvas = document.createElement('canvas')
    printCanvas.width = canvas.width
    printCanvas.height = canvas.height
    const printCtx = printCanvas.getContext('2d')
    if (!printCtx) return
    
    // Get the current canvas data
    const currentImageData = canvas.getContext('2d')?.getImageData(0, 0, canvas.width, canvas.height)
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
  }
  
  // Expose print function to parent component
  useEffect(() => {
    if (onPrintReady) {
      onPrintReady(printImage)
    }
  }, [onPrintReady, printImage])

  return (
    <Container>
      <CanvasWrapper>
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
        />
      </CanvasWrapper>

      <ColorPaletteContainer>
        <PaletteTitle>🎨 Pick a Color:</PaletteTitle>
        <ColorGrid>
          {colors.map((color) => (
            <ColorButton
              key={color.value}
              color={color.value}
              isSelected={selectedColor === color.value}
              onClick={() => setSelectedColor(color.value)}
              title={color.name}
            />
          ))}
        </ColorGrid>
      </ColorPaletteContainer>

      <ToolsContainer>
        <ToolButton isActive>
          Fill
        </ToolButton>
        <ToolButton 
          onClick={undo} 
          disabled={historyStep <= 0}
          style={{ opacity: historyStep <= 0 ? 0.5 : 1, cursor: historyStep <= 0 ? 'not-allowed' : 'pointer' }}
        >
          ↶ Undo
        </ToolButton>
        <ToolButton 
          onClick={redo}
          disabled={historyStep >= history.length - 1}
          style={{ opacity: historyStep >= history.length - 1 ? 0.5 : 1, cursor: historyStep >= history.length - 1 ? 'not-allowed' : 'pointer' }}
        >
          ↷ Redo
        </ToolButton>
        <ToolButton onClick={clearCanvas}>
          🗑️ Clear
        </ToolButton>
        <ToolButton onClick={saveImage}>
          💾 Save
        </ToolButton>
        <ToolButton onClick={printImage}>
          🖨️ Print
        </ToolButton>
      </ToolsContainer>
    </Container>
  )
}

export default InteractiveColoring
