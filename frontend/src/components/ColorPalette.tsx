import styled from 'styled-components'

const PaletteContainer = styled.div`
  @media print {
    display: none;
  }
`

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
    gap: 0.8rem;
  }
`

const ColorSwatch = styled.div<{ color: string }>`
  width: 100%;
  aspect-ratio: 1;
  background: ${props => props.color};
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
  cursor: pointer;
  position: relative;
  border: 3px solid #fff;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  }

  &::after {
    content: attr(data-name);
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.7rem;
    color: #666;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.2s;
  }

  &:hover::after {
    opacity: 1;
  }
`

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3436;
  margin: 2rem 0 1rem 0;
`

// 10 Most Common Colors for Kids
const commonColors = [
  { name: 'Red', color: '#FF0000' },
  { name: 'Orange', color: '#FFA500' },
  { name: 'Yellow', color: '#FFD700' },
  { name: 'Green', color: '#32CD32' },
  { name: 'Blue', color: '#1E90FF' },
  { name: 'Purple', color: '#9370DB' },
  { name: 'Pink', color: '#FF69B4' },
  { name: 'Brown', color: '#8B4513' },
  { name: 'Black', color: '#000000' },
  { name: 'White', color: '#FFFFFF' },
]

interface ColorPaletteProps {
  suggestedColors?: string[]
}

function ColorPalette({ suggestedColors }: ColorPaletteProps) {
  return (
    <PaletteContainer>
      {suggestedColors && suggestedColors.length > 0 && (
        <>
          <SectionTitle>🎨 Suggested Colors:</SectionTitle>
          <ColorGrid>
            {suggestedColors.map((color, index) => (
              <ColorSwatch 
                key={index} 
                color={color}
                data-name={color}
                title={color}
              />
            ))}
          </ColorGrid>
        </>
      )}

      <SectionTitle>🌈 All Colors:</SectionTitle>
      <ColorGrid>
        {commonColors.map((colorInfo, index) => (
          <ColorSwatch 
            key={index} 
            color={colorInfo.color}
            data-name={colorInfo.name}
            title={`${colorInfo.name} - ${colorInfo.color}`}
          />
        ))}
      </ColorGrid>
    </PaletteContainer>
  )
}

export default ColorPalette
