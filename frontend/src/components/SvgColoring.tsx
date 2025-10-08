import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`

const SvgWrapper = styled.div`
  position: relative;
  width: 100%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  
  svg {
    width: 100%;
    height: auto;
    display: block;
    
    path, polygon, circle, ellipse, rect {
      cursor: pointer;
      transition: opacity 0.2s;
      
      &:hover {
        opacity: 0.8;
      }
    }
  }
`

const ColorPalette = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
`

const ColorButton = styled.button<{ $color: string; $active: boolean }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${props => props.$color};
  border: 3px solid ${props => props.$active ? '#4A90E2' : 'white'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
`

const ToolBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
`

const ToolButton = styled.button<{ $active: boolean }>`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  background: ${props => props.$active ? '#4A90E2' : 'white'};
  color: ${props => props.$active ? 'white' : '#333'};
  border: 2px solid ${props => props.$active ? '#4A90E2' : '#ddd'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.$active ? '#3A7BC8' : '#f0f0f0'};
  }
`

interface SvgColoringProps {
  svgPath: string
}

export const SvgColoring: React.FC<SvgColoringProps> = ({ svgPath }) => {
  const [selectedColor, setSelectedColor] = useState('#FFD700')
  const [selectedTool, setSelectedTool] = useState<'fill' | 'eraser'>('fill')
  const [svgContent, setSvgContent] = useState<string>('')
  const svgRef = useRef<HTMLDivElement>(null)

  const colors = [
    '#FFD700', // Gold
    '#FF6B6B', // Red
    '#4ECDC4', // Turquoise
    '#95E1D3', // Mint
    '#F38181', // Pink
    '#AA96DA', // Purple
    '#FCBAD3', // Light Pink
    '#A8D8EA', // Light Blue
    '#FF8C42', // Orange
    '#6C5B7B', // Dark Purple
    '#355C7D', // Navy
    '#F67280', // Coral
    '#C06C84', // Mauve
    '#F8B595', // Peach
    '#FFFFFF', // White (for eraser)
  ]

  useEffect(() => {
    // Load SVG file
    console.log('Loading SVG from:', svgPath)
    fetch(svgPath)
      .then(res => {
        console.log('SVG fetch response:', res.status)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.text()
      })
      .then(text => {
        console.log('SVG content loaded, length:', text.length)
        setSvgContent(text)
      })
      .catch(err => {
        console.error('Failed to load SVG:', err)
        console.error('SVG path was:', svgPath)
      })
  }, [svgPath])

  useEffect(() => {
    if (!svgContent || !svgRef.current) return

    // Parse and inject SVG
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = svgContent
    const svgElement = tempDiv.querySelector('svg')
    
    if (!svgElement) return

    // Clear previous content
    svgRef.current.innerHTML = ''
    
    // Append SVG
    svgRef.current.appendChild(svgElement)

    // Make all paths/shapes fillable
    const fillableElements = svgElement.querySelectorAll('path, polygon, circle, ellipse, rect')
    
    fillableElements.forEach((element) => {
      // Store original fill
      const originalFill = element.getAttribute('fill')
      if (!originalFill || originalFill === 'none') {
        element.setAttribute('fill', 'white')
      }

      // Add click handler
      element.addEventListener('click', () => {
        const currentFill = selectedTool === 'fill' ? selectedColor : '#FFFFFF'
        element.setAttribute('fill', currentFill)
      })
    })
  }, [svgContent, selectedColor, selectedTool])

  return (
    <Container>
      <ToolBar>
        <ToolButton
          $active={selectedTool === 'fill'}
          onClick={() => setSelectedTool('fill')}
        >
          🎨 Fill
        </ToolButton>
        <ToolButton
          $active={selectedTool === 'eraser'}
          onClick={() => setSelectedTool('eraser')}
        >
          🧹 Erase
        </ToolButton>
      </ToolBar>

      <SvgWrapper ref={svgRef}>
        {!svgContent && <p>Loading SVG...</p>}
      </SvgWrapper>

      <ColorPalette>
        {colors.map((color) => (
          <ColorButton
            key={color}
            $color={color}
            $active={selectedColor === color}
            onClick={() => setSelectedColor(color)}
            title={color}
          />
        ))}
      </ColorPalette>
    </Container>
  )
}
