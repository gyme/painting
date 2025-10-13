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
    padding: 0 !important;
    border-radius: 0;
    max-width: 100%;
    margin: 0;
    box-shadow: none;
    min-height: 100vh;
    height: 100vh; /* Fixed height for proper scrolling */
    display: flex;
    flex-direction: column;
    background: white;
    padding-bottom: 200px !important; /* Bottom padding for fixed controls */
    overflow-x: hidden;
    overflow-y: scroll; /* Always show scroll to make space clear */
    -webkit-overflow-scrolling: touch;
  }
`

const MainContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0;
  
  @media (min-width: 1025px) {
    gap: 2rem;
  }
  
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 0;
  }
  
  @media (max-width: 768px) {
    flex: 0 0 auto;
    min-height: 0;
    height: auto;
    overflow: visible;
    display: flex;
    flex-direction: column;
    padding: 0 !important;
    margin: 0 !important;
    gap: 0 !important;
    background: white;
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
    height: auto;
    overflow: visible;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background: white;
    padding: 0rem 0.5rem 200px 0.5rem !important; /* Bottom padding for scroll space */
    margin: 0 !important;
    position: relative;
    width: 100vw;
    max-width: 100vw;
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
    /* Hidden - using bottom color slider instead */
    display: none;
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

const CanvasWrapper = styled.div<{ $cursorType: string; $scale?: number; $translateX?: number; $translateY?: number }>`
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
  max-height: 85vh;
  
  canvas {
    display: block;
    width: 100%;
    height: auto;
    max-height: 60vh;
  }
  
  @media (max-width: 768px) {
    border: none;
    border-radius: 0;
    margin: 0 0 300px 0; /* Large bottom margin to ensure canvas is above fixed controls */
    padding: 0;
    width: calc(100vw - 1rem);
    max-width: calc(100vw - 1rem);
    height: auto;
    display: block;
    background: white;
    position: relative;
    overflow: visible;
    min-height: auto;
    
    canvas {
      display: block;
      background: white;
      width: 100% !important;
      max-width: 100% !important;
      height: auto !important;
      max-height: 70vh !important; /* Allow canvas to be larger - margin prevents cropping */
      margin: 0 0 250px 0 !important; /* Large margin below to prevent cropping by fixed controls */
      padding: 0 !important;
      touch-action: pan-x pan-y pinch-zoom; /* Allow zoom and panning */
      object-fit: contain;
    }
  }
`

/* Mobile spacer to prevent canvas from being cropped by fixed controls */
const MobileCanvasSpacer = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: none; /* Disabled - using wrapper margin instead */
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

const ColorGridWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
`

const ScrollArrow = styled.button<{ $side: 'left' | 'right'; $visible: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.$visible ? 'flex' : 'none'};
    position: absolute;
    top: 50%;
    ${props => props.$side}: 0;
    transform: translateY(-50%);
    z-index: 2;
    width: auto;
    height: auto;
    padding: 0;
    background: none;
    border: none;
    color: #667eea;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    
    svg {
      width: 32px;
      height: 32px;
      transition: all 0.2s ease;
      filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
    }
    
    &:hover {
      color: #764ba2;
      transform: translateY(-50%) ${props => props.$side === 'left' ? 'translateX(-3px)' : 'translateX(3px)'};
      
      svg {
        filter: drop-shadow(0 2px 4px rgba(102, 126, 234, 0.3));
      }
    }
    
    &:active {
      transform: translateY(-50%) scale(0.92);
    }
  }
`

const ColorGridScroll = styled.div`
  width: 100%;
  
  @media (max-width: 768px) {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    
    &::-webkit-scrollbar {
      display: none;
    }
    
    /* Smooth scroll */
    scroll-behavior: smooth;
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
    display: flex;
    flex-wrap: nowrap;
    gap: 1rem;
    justify-content: flex-start;
    width: auto;
    min-width: max-content;
    padding: 0 8px;
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
    width: 56px;
    height: 56px;
    border-radius: 12px;
    margin: 0;
    flex-shrink: 0;
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

const MobileColorSlider = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1.5px solid rgba(102, 126, 234, 0.1);
    padding: 0.9rem 0 0.9rem 0;
    position: fixed;
    bottom: 95px; /* Above the toolbar */
    left: 0.5rem;
    right: 0.5rem;
    z-index: 9;
    box-shadow: 
      0 8px 32px rgba(102, 126, 234, 0.08),
      0 4px 16px rgba(0, 0, 0, 0.06),
      inset 0 1px 2px rgba(255, 255, 255, 0.8);
    border-radius: 16px;
  }
`

const MobileSliderWrapper = styled.div`
  position: relative;
  width: 100%;
`

const MobileScrollArrow = styled.button<{ $side: 'left' | 'right'; $visible: boolean }>`
  display: ${props => props.$visible ? 'flex' : 'none'};
  position: fixed;
  bottom: 0px;
  ${props => props.$side === 'left' ? 'left: -20px' : 'right: -18px'};
  z-index: 11;
  width: 20px;
  height: 90px;
  padding: 0;
  background: transparent;
  border: none;
  color: #667eea;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.15);
  
  svg {
    width: 24px;
    height: 24px;
    transition: all 0.2s ease;
  }
  
  &:hover {
    color: #764ba2;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.25);
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.92);
  }
`

const ColorSliderScroll = styled.div`
  display: flex;
  gap: 0.6rem;
  padding: 0 0.8rem;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  scroll-behavior: smooth;
  
  &::-webkit-scrollbar {
    display: none;
  }
`

const MobileColorButton = styled.button<{ color: string; $isSelected: boolean }>`
  width: 60px;
  height: 60px;
  min-width: 60px;
  border-radius: 16px;
  background-color: ${props => props.color};
  border: ${props => props.$isSelected ? '3px solid #667eea' : '2px solid rgba(255, 255, 255, 0.9)'};
  box-shadow: ${props => props.$isSelected 
    ? '0 6px 20px rgba(102, 126, 234, 0.35), 0 2px 8px rgba(0, 0, 0, 0.15), inset 0 2px 8px rgba(255, 255, 255, 0.25)' 
    : '0 3px 12px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.08), inset 0 2px 8px rgba(255, 255, 255, 0.25)'};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: 14px;
    padding: 1px;
    background: ${props => props.$isSelected 
      ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.4), rgba(118, 142, 247, 0.4))' 
      : 'transparent'};
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: ${props => props.$isSelected ? 1 : 0};
    transition: opacity 0.3s ease;
  }
  
  &:active {
    transform: scale(0.92);
    box-shadow: ${props => props.$isSelected 
      ? '0 2px 10px rgba(102, 126, 234, 0.3), 0 1px 4px rgba(0, 0, 0, 0.1), inset 0 2px 8px rgba(255, 255, 255, 0.25)' 
      : '0 1px 6px rgba(0, 0, 0, 0.15), inset 0 2px 8px rgba(255, 255, 255, 0.25)'};
  }
`

const MobileToolbar = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    border-top: 2px solid rgba(102, 126, 234, 0.1);
    padding: 0.7rem 0.9rem calc(0.7rem + env(safe-area-inset-bottom)) 0.9rem;
    box-shadow: 0 -4px 20px rgba(102, 126, 234, 0.08);
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
  background: ${props => props.color || (props.$isActive ? 'rgba(102, 126, 234, 0.15)' : 'rgba(102, 126, 234, 0.08)')};
  color: ${props => props.$isActive ? '#667eea' : '#7c8ff0'};
  border: 2px solid ${props => props.$isActive ? 'rgba(102, 126, 234, 0.3)' : 'rgba(102, 126, 234, 0.15)'};
  border-radius: 15px;
  font-size: 0.7rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.$isActive 
    ? '0 4px 12px rgba(102, 126, 234, 0.2), inset 0 2px 0 rgba(255, 255, 255, 0.5)'
    : '0 2px 8px rgba(102, 126, 234, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.3)'};
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
    background: linear-gradient(180deg, rgba(102, 126, 234, 0.15) 0%, rgba(102, 126, 234, 0) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:active {
    transform: scale(0.95);
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3);
    
    &::before {
      opacity: 1;
    }
  }
  
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
    border-color: rgba(102, 126, 234, 0.08);
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
    /* Hidden - using bottom color slider instead of popup */
    display: none;
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
  // Row 1: Deep Dark Colors
  { name: 'Black', value: '#000000' },
  { name: 'Dark Brown', value: '#3E2723' },
  { name: 'Dark Red', value: '#8B0000' },
  { name: 'Forest Green', value: '#0B4D1B' },
  { name: 'Navy Blue', value: '#001F3F' },
  { name: 'Deep Purple', value: '#4A148C' },
  { name: 'Charcoal', value: '#2C3539' },
  
  // Row 2: Rich Medium Colors
  { name: 'Brown', value: '#8B4513' },
  { name: 'Maroon', value: '#B03060' },
  { name: 'Burnt Orange', value: '#A0522D' },
  { name: 'Olive', value: '#6B8E23' },
  { name: 'Teal', value: '#008B8B' },
  { name: 'Royal Blue', value: '#2B5FD3' },
  { name: 'Indigo', value: '#6A0DAD' },
  
  // Row 3: Bold Vibrant Colors
  { name: 'Bright Red', value: '#FF0000' },
  { name: 'Tangerine', value: '#FF8C00' },
  { name: 'Golden Yellow', value: '#FFD700' },
  { name: 'Lime Green', value: '#32CD32' },
  { name: 'Emerald', value: '#00C853' },
  { name: 'Turquoise', value: '#40E0D0' },
  { name: 'Bright Blue', value: '#0066FF' },
  
  // Row 4: Electric Bright Colors
  { name: 'Hot Pink', value: '#FF1493' },
  { name: 'Deep Rose', value: '#C71585' },
  { name: 'Neon Orange', value: '#FF6600' },
  { name: 'Bright Yellow', value: '#FFFF00' },
  { name: 'Kelly Green', value: '#00AA00' },
  { name: 'Aqua', value: '#00FFFF' },
  { name: 'Steel Blue', value: '#4682B4' },
  
  // Row 5: Soft Pastel Colors
  { name: 'Baby Pink', value: '#FFC0CB' },
  { name: 'Coral', value: '#FF7F7F' },
  { name: 'Peach', value: '#FFCC99' },
  { name: 'Magenta', value: '#a6ff00' },
  { name: 'Mint', value: '#BAFFC9' },
  { name: 'Sky Blue', value: '#BAE1FF' },
  { name: 'Lavender', value: '#D7C3F1' },
  
  // Row 6: Light & Neutral Colors
  { name: 'White', value: '#FFFFFF' },
  { name: 'Salmon', value: '#FA8072' },
  { name: 'Cream', value: '#FFF8DC' },
  { name: 'Sand', value: '#F4E4C1' },
  { name: 'Light Gray', value: '#D3D3D3' },
  { name: 'Medium Gray', value: '#808080' },
  { name: 'Steel Gray', value: '#4D4D4D' },
]

function InteractiveColoring({ imageUrl, urlKey, title, onPrintReady }: InteractiveColoringProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mainContentRef = useRef<HTMLDivElement>(null)
  const [selectedColor, setSelectedColor] = useState(colors[0].value)
  const originalImageRef = useRef<HTMLImageElement | null>(null)
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
  const isProcessingRef = useRef(false)
  const colorScrollRef = useRef<HTMLDivElement>(null)
  const mobileColorScrollRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)
  const [showMobileLeftArrow, setShowMobileLeftArrow] = useState(false)
  const [showMobileRightArrow, setShowMobileRightArrow] = useState(false)
  
  // Tool selection: 'fill', 'brush', 'eraser'
  const [selectedTool, setSelectedTool] = useState<'fill' | 'brush' | 'eraser'>('fill')
  const [brushSize] = useState(10)
  const isDrawingRef = useRef(false)
  
  // Undo/Redo history
  const [history, setHistory] = useState<ImageData[]>([])
  const [historyStep, setHistoryStep] = useState(-1)
  const historyStepRef = useRef(-1)
  
  // Store original black pixels to distinguish from user-painted black
  const originalBlackPixelsRef = useRef<Set<string>>(new Set())
  
  // Mobile zoom state - using scroll instead of translate
  const [scale, setScale] = useState(1)
  const lastTouchDistanceRef = useRef<number>(0)
  const lastTouchCenterRef = useRef<{ x: number, y: number } | null>(null)
  
  // Keep historyStepRef in sync with historyStep state
  useEffect(() => {
    historyStepRef.current = historyStep
  }, [historyStep])
  
  // Remove gap on mobile - use MutationObserver to catch ANY style changes
  useEffect(() => {
    if (window.innerWidth <= 768 && mainContentRef.current) {
      const element = mainContentRef.current
      
      const forceRemoveGap = () => {
        element.style.setProperty('padding', '0', 'important')
        element.style.setProperty('padding-top', '0', 'important')
        element.style.setProperty('margin', '0', 'important')
        element.style.setProperty('gap', '0', 'important')
        
        // Also remove the attribute entirely if it exists
        if (element.getAttribute('style')?.includes('padding-top')) {
          element.setAttribute('style', element.getAttribute('style')!.replace(/padding-top:\s*[^;]+;?/gi, ''))
        }
      }
      
      // Initial removal
      forceRemoveGap()
      
      // Watch for any style attribute changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            forceRemoveGap()
          }
        })
      })
      
      observer.observe(element, {
        attributes: true,
        attributeFilter: ['style']
      })
      
      // Also run periodically as backup
      const interval = setInterval(forceRemoveGap, 100)
      
      return () => {
        observer.disconnect()
        clearInterval(interval)
      }
    }
  }, [])

  // Handle scroll arrows visibility on mobile color palette
  useEffect(() => {
    const handleScroll = () => {
      if (colorScrollRef.current && window.innerWidth <= 768) {
        const { scrollLeft, scrollWidth, clientWidth } = colorScrollRef.current
        const hasScroll = scrollWidth > clientWidth
        console.log('🎨 Scroll check:', { 
          scrollLeft, 
          scrollWidth, 
          clientWidth, 
          hasScroll,
          colorCount: colors.length,
          showLeft: scrollLeft > 10,
          showRight: hasScroll && scrollLeft < scrollWidth - clientWidth - 10
        })
        setShowLeftArrow(scrollLeft > 10)
        setShowRightArrow(hasScroll && scrollLeft < scrollWidth - clientWidth - 10)
      }
    }

    // Wait for the element to have dimensions
    const checkDimensions = () => {
      const scrollElement = colorScrollRef.current
      if (scrollElement && scrollElement.clientWidth > 0) {
        console.log('✅ Element has dimensions, setting up scroll detection')
        // Initial check
        handleScroll()
        
        // Listen to scroll events
        scrollElement.addEventListener('scroll', handleScroll)
        
        // Also check on window resize
        window.addEventListener('resize', handleScroll)
        
        return true
      }
      return false
    }

    // Try multiple times until element has dimensions
    let attempts = 0
    const maxAttempts = 10
    const checkInterval = setInterval(() => {
      attempts++
      if (checkDimensions() || attempts >= maxAttempts) {
        clearInterval(checkInterval)
        if (attempts >= maxAttempts) {
          console.warn('⚠️ Could not detect color palette dimensions after', attempts, 'attempts')
        }
      }
    }, 50)

    return () => {
      clearInterval(checkInterval)
      const scrollElement = colorScrollRef.current
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleScroll)
      }
    }
  }, [isColorPickerOpen])

  // Handle scroll arrows for mobile color slider (bottom of screen)
  useEffect(() => {
    const handleScroll = () => {
      if (mobileColorScrollRef.current && window.innerWidth <= 768) {
        const { scrollLeft, scrollWidth, clientWidth } = mobileColorScrollRef.current
        const hasScroll = scrollWidth > clientWidth
        console.log('📱 Mobile slider check:', { 
          scrollLeft, 
          scrollWidth, 
          clientWidth, 
          hasScroll,
          showLeft: scrollLeft > 10,
          showRight: hasScroll && scrollLeft < scrollWidth - clientWidth - 10
        })
        setShowMobileLeftArrow(scrollLeft > 10)
        setShowMobileRightArrow(hasScroll && scrollLeft < scrollWidth - clientWidth - 10)
      }
    }

    // Wait for the element to have dimensions
    const checkDimensions = () => {
      const scrollElement = mobileColorScrollRef.current
      if (scrollElement && scrollElement.clientWidth > 0) {
        console.log('✅ Mobile slider has dimensions, setting up scroll detection')
        // Initial check
        handleScroll()
        
        // Listen to scroll events
        scrollElement.addEventListener('scroll', handleScroll)
        
        // Also check on window resize
        window.addEventListener('resize', handleScroll)
        
        return true
      }
      return false
    }

    // Try multiple times until element has dimensions
    let attempts = 0
    const maxAttempts = 10
    const checkInterval = setInterval(() => {
      attempts++
      if (checkDimensions() || attempts >= maxAttempts) {
        clearInterval(checkInterval)
        if (attempts >= maxAttempts) {
          console.warn('⚠️ Could not detect mobile slider dimensions after', attempts, 'attempts')
        }
      }
    }, 50)

    return () => {
      clearInterval(checkInterval)
      const scrollElement = mobileColorScrollRef.current
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleScroll)
      }
    }
  }, [])

  // Prevent scrolling on mobile - canvas fits viewport
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
  const WATERMARK_TEXT = 'mycolor.fun' // ← CHANGE THIS!

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

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
      
      // Set canvas size AFTER image loads
      const isMobile = window.innerWidth <= 768
      if (isMobile) {
        // On mobile: canvas width is full screen, height based on image aspect ratio
        const availableWidth = window.innerWidth
        
        // Calculate image aspect ratio
        const imageAspect = img.width / img.height
        
        // Set canvas to full width, height based on image aspect ratio
        canvas.width = availableWidth
        canvas.height = availableWidth / imageAspect
        
        // Fill entire canvas with white
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        // Draw image to fill entire canvas (full width, no black borders)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      } else {
        // Desktop: fixed width, height based on aspect ratio
        canvas.width = 600
        canvas.height = (img.height / img.width) * canvas.width
        console.log('Desktop canvas size:', canvas.width, 'x', canvas.height)
        
        // Fill with white background
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        // Draw the loaded image at full canvas size
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
      
      // Convert grey background to white for perfect coloring (like white brush)
      // More aggressive to match manual white brush effectiveness
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        const avg = (r + g + b) / 3
        
        // Replace grey background and light pixels (but not black lines)
        // This matches what white brush does: paint over everything except dark lines
        if (avg > 50) {  // Not black lines (< 50)
          // Check if it's greyish (low color variation = background)
          const colorRange = Math.max(r, g, b) - Math.min(r, g, b)
          if (colorRange < 50) {  // Grey/neutral colors
            data[i] = 255
            data[i + 1] = 255
            data[i + 2] = 255
          }
        }
      }
      
      ctx.putImageData(imageData, 0, 0)
      
      // Store original black pixels for protection (after cleaning background)
      originalBlackPixelsRef.current.clear()
      const finalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const finalData = finalImageData.data
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const idx = (y * canvas.width + x) * 4
          const r = finalData[idx]
          const g = finalData[idx + 1]
          const b = finalData[idx + 2]
          // Store coordinates of original black/dark pixels
          if (r < 30 && g < 30 && b < 30) {
            originalBlackPixelsRef.current.add(`${x},${y}`)
          }
        }
      }
      console.log('Stored', originalBlackPixelsRef.current.size, 'original black pixels for protection')
      
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
          console.log('SVG loaded successfully:', svgImg.width, 'x', svgImg.height)
          // Store the SVG image for later use
          originalImageRef.current = svgImg
          
          // Set canvas size AFTER SVG loads
          const isMobile = window.innerWidth <= 768
          if (isMobile) {
            // On mobile: canvas width is full screen, height based on image aspect ratio
            const availableWidth = window.innerWidth
            
            // Calculate image aspect ratio
            const imageAspect = svgImg.width / svgImg.height
            
            // Set canvas to full width, height based on image aspect ratio
            canvas.width = availableWidth
            canvas.height = availableWidth / imageAspect
            
            // Fill entire canvas with white
            ctx.fillStyle = 'white'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            
            // Draw image to fill entire canvas (full width, no black borders)
            ctx.drawImage(svgImg, 0, 0, canvas.width, canvas.height)
          } else {
            // Desktop: fixed width, height based on aspect ratio
            canvas.width = 600
            canvas.height = (svgImg.height / svgImg.width) * canvas.width
            
            // Fill with white background
            ctx.fillStyle = 'white'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
            
            // Draw the loaded SVG at full canvas size
            ctx.drawImage(svgImg, 0, 0, canvas.width, canvas.height)
          }
          
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
      // With touch-action: pan-x pan-y pinch-zoom, browser handles multi-touch zoom
      // We only get single-touch events for drawing
      if (e.touches.length !== 1) {
        return // Ignore if not exactly one touch
      }

      const touch = e.touches[0]

      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx || !canvas) return

      const coords = getCanvasCoordinates(touch as any)
      if (!coords) return

      const { x, y } = coords

      if (selectedTool === 'fill' || selectedTool === 'eraser') {
        e.preventDefault() // Prevent scrolling only when actively using tools
        
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
        // Brush tool - draw immediately, then save to history
        e.preventDefault() // Prevent scrolling during drawing
        isDrawingRef.current = true
        
        // Draw first for immediate feedback
        requestAnimationFrame(() => {
          drawBrush(x, y, selectedColor)
        })
        
        // Save history after drawing starts
        requestAnimationFrame(() => {
          saveToHistory(ctx)
        })
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      // With touch-action: pan-x pan-y pinch-zoom, browser handles zoom
      if (e.touches.length !== 1) {
        return // Ignore if not exactly one touch
      }
      
      if (!isDrawingRef.current || selectedTool === 'fill' || selectedTool === 'eraser') return

      e.preventDefault() // Prevent scrolling during brush drawing
      
      const touch = e.touches[0]
      const coords = getCanvasCoordinates(touch as any)
      if (!coords) return

      const { x, y } = coords
      requestAnimationFrame(() => {
        drawBrush(x, y, selectedColor)
      })
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length === 0) {
        e.preventDefault()
        isDrawingRef.current = false
        lastTouchDistanceRef.current = 0
        lastTouchCenterRef.current = null
      }
      // Don't prevent default if touches remain (user may be zooming)
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
  }, [selectedTool, selectedColor, brushSize, scale])

  // Removed all draw functions - using professional SVG artwork instead

  const isBlackLine = useCallback((x: number, y: number, _color: { r: number, g: number, b: number }): boolean => {
    // Only protect original black pixels, not user-painted black
    const pixelKey = `${x},${y}`
    return originalBlackPixelsRef.current.has(pixelKey)
  }, [])

  const isOriginalArtwork = useCallback((x: number, y: number, _color: { r: number, g: number, b: number }): boolean => {
    // For brush protection: ONLY protect original black pixels, not user-painted black
    // This allows overriding user-painted black areas with other colors
    const pixelKey = `${x},${y}`
    return originalBlackPixelsRef.current.has(pixelKey)
  }, [])

  const saveToHistory = useCallback((ctx: CanvasRenderingContext2D) => {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
    
    setHistory(prevHistory => {
      // Use ref to get the actual current step
      const currentStep = historyStepRef.current
      const newHistory = prevHistory.slice(0, currentStep + 1)
      newHistory.push(imageData)
      
      // Limit history to last 10 states
      if (newHistory.length > 10) {
        const trimmed = newHistory.slice(newHistory.length - 10)
        // Update step to point to last item after trimming
        historyStepRef.current = 9
        setHistoryStep(9)
        return trimmed
      }
      
      // Update step to point to the newly added item
      historyStepRef.current = newHistory.length - 1
      setHistoryStep(newHistory.length - 1)
      return newHistory
    })
  }, [])

  const getCanvasCoordinates = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.Touch) => {
    const canvas = canvasRef.current
    if (!canvas) return null

    const rect = canvas.getBoundingClientRect()
    
    // Get click position in viewport
    const clientX = e.clientX
    const clientY = e.clientY
    
    // Calculate click position relative to canvas
    // rect.left and rect.top already account for scroll position
    const clickX = clientX - rect.left
    const clickY = clientY - rect.top
    
    // Scale from display coordinates to canvas internal coordinates
    const x = (clickX / rect.width) * canvas.width
    const y = (clickY / rect.height) * canvas.height

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
            
            // Don't paint over original artwork (only original black pixels)
            if (!isOriginalArtwork(pixelX, pixelY, pixelColor)) {
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
    e.preventDefault()
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
      // Brush tool - draw immediately, then save to history
      isDrawingRef.current = true
      
      // Draw first for immediate feedback
      requestAnimationFrame(() => {
        drawBrush(x, y, selectedColor)
      })
      
      // Save history after drawing starts
      requestAnimationFrame(() => {
        saveToHistory(ctx)
      })
    }
  }

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    if (!isDrawingRef.current || selectedTool === 'fill' || selectedTool === 'eraser') return

    const coords = getCanvasCoordinates(e)
    if (!coords) return

    const { x, y } = coords
    requestAnimationFrame(() => {
      drawBrush(x, y, selectedColor)
    })
  }

  const handleCanvasMouseUp = () => {
    isDrawingRef.current = false
  }


  const floodFill = (ctx: CanvasRenderingContext2D, startX: number, startY: number, fillColor: string) => {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
    const targetColor = getPixelColor(imageData, startX, startY)
    const fillColorRGB = hexToRgb(fillColor)
    
    // Don't fill if clicking on original black lines (original artwork)
    if (isBlackLine(startX, startY, targetColor)) {
      console.log('Cannot color over original black lines!')
      return
    }
    
    if (colorsMatch(targetColor, fillColorRGB, 5)) return

    const width = imageData.width
    const height = imageData.height
    
    // Reduced tolerance for better performance - white backgrounds need less
    const tolerance = 20
    
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
        if (isBlackLine(currentX, currentY, color) || !colorsMatch(color, targetColor, tolerance)) break
        currentX--
      }
      currentX++ // Step back to the valid pixel
      
      let spanAbove = false
      let spanBelow = false
      
      // Fill the scanline from left to right
      while (currentX < width) {
        const color = getPixelColor(imageData, currentX, currentY)
        
        // Stop if we hit a boundary
        if (isBlackLine(currentX, currentY, color) || !colorsMatch(color, targetColor, tolerance)) break
        
        // Fill this pixel
        setPixelColor(imageData, currentX, currentY, fillColorRGB)
        
        // Check pixel above
        if (currentY > 0) {
          const colorAbove = getPixelColor(imageData, currentX, currentY - 1)
          if (!isBlackLine(currentX, currentY - 1, colorAbove) && colorsMatch(colorAbove, targetColor, tolerance)) {
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
          if (!isBlackLine(currentX, currentY + 1, colorBelow) && colorsMatch(colorBelow, targetColor, tolerance)) {
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
    const currentStep = historyStepRef.current
    if (currentStep <= 0) return
    
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d', { willReadFrequently: true })
    if (!ctx || !canvas) return
    
    setHistory(prevHistory => {
      const previousState = prevHistory[currentStep - 1]
      if (previousState) {
        ctx.putImageData(previousState, 0, 0)
        historyStepRef.current = currentStep - 1
        setHistoryStep(currentStep - 1)
      }
      return prevHistory
    })
  }, [])

  const redo = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d', { willReadFrequently: true })
    if (!ctx || !canvas) return
    
    setHistory(prevHistory => {
      const currentStep = historyStepRef.current
      if (currentStep >= prevHistory.length - 1) return prevHistory
      
      const nextState = prevHistory[currentStep + 1]
      if (nextState) {
        ctx.putImageData(nextState, 0, 0)
        historyStepRef.current = currentStep + 1
        setHistoryStep(currentStep + 1)
      }
      return prevHistory
    })
  }, [])

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
      
      // Use same positioning logic as initial image load
      const isMobile = window.innerWidth <= 768
      if (isMobile) {
        // Mobile: fill entire canvas with white
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        // Draw image to fill entire canvas (full width, no black borders)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      } else {
        // Desktop: draw at full canvas size
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
      
      // Convert grey background to white for perfect coloring (like white brush)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        const avg = (r + g + b) / 3
        
        if (avg > 50) {
          const colorRange = Math.max(r, g, b) - Math.min(r, g, b)
          if (colorRange < 50) {
            data[i] = 255
            data[i + 1] = 255
            data[i + 2] = 255
          }
        }
      }
      
      ctx.putImageData(imageData, 0, 0)
      
      // Restore original black pixels map
      originalBlackPixelsRef.current.clear()
      const finalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const finalData = finalImageData.data
      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const idx = (y * canvas.width + x) * 4
          const r = finalData[idx]
          const g = finalData[idx + 1]
          const b = finalData[idx + 2]
          if (r < 30 && g < 30 && b < 30) {
            originalBlackPixelsRef.current.add(`${x},${y}`)
          }
        }
      }
      
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
    
    // Add minimal watermark at bottom right for saved image
    saveCtx.save()
    saveCtx.globalAlpha = 0.8
    saveCtx.font = '14px Arial'
    saveCtx.fillStyle = '#666666'
    saveCtx.textAlign = 'right'
    saveCtx.fillText(WATERMARK_TEXT, saveCanvas.width - 10, saveCanvas.height - 10)
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
      // Draw at full canvas size (canvas already sized to match image aspect ratio)
      printCtx.drawImage(img, 0, 0, printCanvas.width, printCanvas.height)
      
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
    
    // Add minimal watermark at bottom right for printing
    printCtx.save()
    printCtx.globalAlpha = 0.6
    printCtx.font = '12px Arial'
    printCtx.fillStyle = '#888888'
    printCtx.textAlign = 'right'
    printCtx.fillText(WATERMARK_TEXT, printCanvas.width - 10, printCanvas.height - 10)
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
      <MainContent ref={mainContentRef}>
        <CanvasSection>
          <CanvasWrapper 
            $cursorType={getCursorType()} 
            $scale={scale}
          >
            <canvas
              ref={canvasRef}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onMouseLeave={handleCanvasMouseUp}
            />
          </CanvasWrapper>
          <MobileCanvasSpacer />
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
            <ColorGridWrapper>
              <ScrollArrow 
                $side="left" 
                $visible={showLeftArrow}
                onClick={() => {
                  if (colorScrollRef.current) {
                    colorScrollRef.current.scrollBy({ left: -200, behavior: 'smooth' })
                  }
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </ScrollArrow>
              
              <ColorGridScroll ref={colorScrollRef}>
            <ColorGrid>
                  {colors.map((color, index) => {
                    if (index === 0) console.log('🎨 Rendering', colors.length, 'colors')
                    return (
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
                    )
                  })}
            </ColorGrid>
              </ColorGridScroll>
              
              <ScrollArrow 
                $side="right" 
                $visible={showRightArrow}
                onClick={() => {
                  if (colorScrollRef.current) {
                    colorScrollRef.current.scrollBy({ left: 200, behavior: 'smooth' })
                  }
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </ScrollArrow>
            </ColorGridWrapper>
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

      {/* Mobile Color Slider - Horizontal scrollable colors */}
      <MobileColorSlider>
                <MobileScrollArrow
            $side="left"
            $visible={showMobileLeftArrow}
            onClick={() => {
              if (mobileColorScrollRef.current) {
                mobileColorScrollRef.current.scrollBy({ left: -10, behavior: 'smooth' })
              }
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </MobileScrollArrow>

        <MobileSliderWrapper>

          <ColorSliderScroll ref={mobileColorScrollRef}>
          {colors.map((color, index) => (
            <MobileColorButton
              key={`mobile-${color.name}-${index}`}
              color={color.value}
              $isSelected={selectedColor === color.value}
              onClick={() => setSelectedColor(color.value)}
              title={color.name}
            />
          ))}
        </ColorSliderScroll>
          
          <MobileScrollArrow 
            $side="right" 
            $visible={showMobileRightArrow}
            onClick={() => {
              if (mobileColorScrollRef.current) {
                mobileColorScrollRef.current.scrollBy({ left: 10, behavior: 'smooth' })
              }
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </MobileScrollArrow>
        </MobileSliderWrapper>
      </MobileColorSlider>

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
            <MobileToolButton onClick={clearCanvas}>
              <span style={{ fontSize: '1.8rem', lineHeight: '1' }}>🗑️</span>
              <span>Clear</span>
            </MobileToolButton>
            <MobileToolButton onClick={undo} disabled={historyStep <= 0}>
              <span style={{ fontSize: '1.8rem', lineHeight: '1' }}>↶</span>
              <span>Undo</span>
            </MobileToolButton>
            {scale > 1 ? (
              <MobileToolButton 
                onClick={() => {
                  setScale(1)
                }}
                $isActive={true}
              >
                <span style={{ fontSize: '1.8rem', lineHeight: '1' }}>🔍</span>
                <span>Reset</span>
              </MobileToolButton>
            ) : (
              <MobileToolButton onClick={printImage}>
                <span style={{ fontSize: '1.8rem', lineHeight: '1' }}>🖨️</span>
                <span>Print</span>
              </MobileToolButton>
            )}
          </MobileButtonRow>
        </MobileToolbar>
    </Container>
  )
}

export default InteractiveColoring
