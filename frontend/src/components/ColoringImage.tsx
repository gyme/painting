import styled from 'styled-components'

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  background: white;
  padding: 2rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media print {
    padding: 0;
    border-radius: 0;
    page-break-inside: avoid;
  }
`

const SVGColoring = styled.svg`
  max-width: 100%;
  height: auto;
  border: 3px solid #333;
  border-radius: 15px;
  background: white;

  @media print {
    border: 2px solid #000;
    border-radius: 0;
    page-break-inside: avoid;
  }
`

interface ColoringImageProps {
  title: string
  imageUrl: string
  urlKey: string
}

// SVG coloring templates for each painting
const getColoringSVG = (urlKey: string, title: string) => {
  const templates: { [key: string]: string } = {
    'stitch': `
      <svg viewBox="0 0 500 600" xmlns="http://www.w3.org/2000/svg">
        <!-- Detailed Stitch coloring page -->
        <!-- Large rounded head -->
        <ellipse cx="250" cy="220" rx="110" ry="100" fill="white" stroke="black" stroke-width="4"/>
        
        <!-- Giant alien ears with inner detail -->
        <path d="M 160 180 Q 120 120 110 60 Q 105 40 115 35 Q 125 32 135 40 Q 145 120 165 180 Z" fill="white" stroke="black" stroke-width="4"/>
        <path d="M 340 180 Q 380 120 390 60 Q 395 40 385 35 Q 375 32 365 40 Q 355 120 335 180 Z" fill="white" stroke="black" stroke-width="4"/>
        <!-- Ear inner lines -->
        <path d="M 130 150 Q 120 100 115 55" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 140 160 Q 130 110 125 65" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 370 150 Q 380 100 385 55" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 360 160 Q 370 110 375 65" fill="none" stroke="black" stroke-width="2"/>
        
        <!-- Huge expressive eyes -->
        <ellipse cx="210" cy="210" rx="35" ry="45" fill="white" stroke="black" stroke-width="4"/>
        <ellipse cx="290" cy="210" rx="35" ry="45" fill="white" stroke="black" stroke-width="4"/>
        <!-- Pupils -->
        <ellipse cx="215" cy="205" rx="20" ry="28" fill="black"/>
        <ellipse cx="285" cy="205" rx="20" ry="28" fill="black"/>
        <!-- Eye highlights -->
        <ellipse cx="208" cy="195" rx="8" ry="12" fill="white"/>
        <ellipse cx="278" cy="195" rx="8" ry="12" fill="white"/>
        <circle cx="222" cy="215" r="4" fill="white"/>
        <circle cx="292" cy="215" r="4" fill="white"/>
        
        <!-- Cute button nose -->
        <ellipse cx="250" cy="240" rx="12" ry="10" fill="black"/>
        <ellipse cx="245" cy="237" rx="4" ry="3" fill="white"/>
        
        <!-- Big smile with visible teeth -->
        <path d="M 200 260 Q 250 290 300 260" fill="none" stroke="black" stroke-width="4" stroke-linecap="round"/>
        <path d="M 210 265 Q 250 285 290 265" fill="white" stroke="black" stroke-width="3"/>
        <!-- Teeth -->
        <line x1="230" y1="268" x2="230" y2="278" stroke="black" stroke-width="3"/>
        <line x1="242" y1="270" x2="242" y2="281" stroke="black" stroke-width="3"/>
        <line x1="254" y1="270" x2="254" y2="281" stroke="black" stroke-width="3"/>
        <line x1="266" y1="268" x2="266" y2="278" stroke="black" stroke-width="3"/>
        
        <!-- Fur tufts on top of head -->
        <path d="M 250 120 Q 245 115 240 118" fill="none" stroke="black" stroke-width="3" stroke-linecap="round"/>
        <path d="M 250 120 Q 255 115 260 118" fill="none" stroke="black" stroke-width="3" stroke-linecap="round"/>
        <path d="M 240 125 Q 235 120 230 123" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M 260 125 Q 265 120 270 123" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round"/>
        
        <!-- Chunky body -->
        <ellipse cx="250" cy="380" rx="95" ry="110" fill="white" stroke="black" stroke-width="4"/>
        
        <!-- Chest/belly marking -->
        <path d="M 210 320 Q 200 360 205 410 Q 250 420 295 410 Q 300 360 290 320 Q 270 310 250 310 Q 230 310 210 320 Z" fill="white" stroke="black" stroke-width="3"/>
        
        <!-- Short strong arms -->
        <ellipse cx="155" cy="340" rx="28" ry="50" transform="rotate(-35 155 340)" fill="white" stroke="black" stroke-width="4"/>
        <ellipse cx="345" cy="340" rx="28" ry="50" transform="rotate(35 345 340)" fill="white" stroke="black" stroke-width="4"/>
        
        <!-- Hands with 3 claws each -->
        <ellipse cx="130" cy="375" rx="30" ry="25" fill="white" stroke="black" stroke-width="4"/>
        <ellipse cx="370" cy="375" rx="30" ry="25" fill="white" stroke="black" stroke-width="4"/>
        <!-- Claws -->
        <path d="M 120 385 L 115 395 M 130 388 L 128 398 M 140 385 L 145 395" stroke="black" stroke-width="3" stroke-linecap="round"/>
        <path d="M 380 385 L 385 395 M 370 388 L 372 398 M 360 385 L 355 395" stroke="black" stroke-width="3" stroke-linecap="round"/>
        
        <!-- Short legs -->
        <ellipse cx="210" cy="490" rx="30" ry="55" fill="white" stroke="black" stroke-width="4"/>
        <ellipse cx="290" cy="490" rx="30" ry="55" fill="white" stroke="black" stroke-width="4"/>
        
        <!-- Big feet with toe pads -->
        <ellipse cx="210" cy="540" rx="40" ry="30" fill="white" stroke="black" stroke-width="4"/>
        <ellipse cx="290" cy="540" rx="40" ry="30" fill="white" stroke="black" stroke-width="4"/>
        <!-- Toe pads (3 per foot) -->
        <circle cx="195" cy="545" r="8" fill="white" stroke="black" stroke-width="2.5"/>
        <circle cx="210" cy="548" r="8" fill="white" stroke="black" stroke-width="2.5"/>
        <circle cx="225" cy="545" r="8" fill="white" stroke="black" stroke-width="2.5"/>
        <circle cx="275" cy="545" r="8" fill="white" stroke="black" stroke-width="2.5"/>
        <circle cx="290" cy="548" r="8" fill="white" stroke="black" stroke-width="2.5"/>
        <circle cx="305" cy="545" r="8" fill="white" stroke="black" stroke-width="2.5"/>
        
        <!-- Spiky back ridges -->
        <path d="M 155 360 Q 150 355 155 350" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M 165 340 Q 160 335 165 330" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M 335 360 Q 340 355 335 350" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M 325 340 Q 330 335 325 330" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round"/>
        
        <!-- Additional fur texture details -->
        <path d="M 180 200 L 175 195" stroke="black" stroke-width="2" stroke-linecap="round"/>
        <path d="M 170 210 L 165 207" stroke="black" stroke-width="2" stroke-linecap="round"/>
        <path d="M 320 200 L 325 195" stroke="black" stroke-width="2" stroke-linecap="round"/>
        <path d="M 330 210 L 335 207" stroke="black" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `,
    'elsa-frozen': `
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <!-- Snowflakes background -->
        <path d="M 50 50 L 55 45 M 50 50 L 45 45 M 50 50 L 50 40 M 50 50 L 50 60 M 50 50 L 55 55 M 50 50 L 45 55" stroke="black" stroke-width="1.5"/>
        <path d="M 350 80 L 355 75 M 350 80 L 345 75 M 350 80 L 350 70 M 350 80 L 350 90 M 350 80 L 355 85 M 350 80 L 345 85" stroke="black" stroke-width="1.5"/>
        <path d="M 80 320 L 85 315 M 80 320 L 75 315 M 80 320 L 80 310 M 80 320 L 80 330 M 80 320 L 85 325 M 80 320 L 75 325" stroke="black" stroke-width="1.5"/>
        
        <!-- Elsa's head -->
        <ellipse cx="200" cy="130" rx="45" ry="55" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Hair/braid detail -->
        <path d="M 180 90 Q 160 85 150 95 Q 145 110 150 130 Q 155 145 160 160" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 220 90 Q 240 85 250 95 Q 255 110 250 130 Q 245 145 240 160" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 200 75 Q 210 70 220 75 Q 225 85 220 95" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="240" cy="160" rx="12" ry="45" transform="rotate(20 240 160)" fill="none" stroke="black" stroke-width="3"/>
        <line x1="235" y1="140" x2="245" y2="140" stroke="black" stroke-width="2"/>
        <line x1="235" y1="155" x2="245" y2="155" stroke="black" stroke-width="2"/>
        <line x1="235" y1="170" x2="245" y2="170" stroke="black" stroke-width="2"/>
        <line x1="235" y1="185" x2="245" y2="185" stroke="black" stroke-width="2"/>
        
        <!-- Crown -->
        <path d="M 170 85 L 175 75 L 180 85 L 185 70 L 190 85 L 195 75 L 200 85 L 205 75 L 210 85 L 215 70 L 220 85 L 225 75 L 230 85" fill="none" stroke="black" stroke-width="2"/>
        <line x1="170" y1="85" x2="230" y2="85" stroke="black" stroke-width="2"/>
        
        <!-- Face features -->
        <circle cx="185" cy="125" r="4" fill="black"/>
        <circle cx="215" cy="125" r="4" fill="black"/>
        <path d="M 182 120 Q 180 115 185 115" fill="none" stroke="black" stroke-width="1.5"/>
        <path d="M 218 120 Q 220 115 215 115" fill="none" stroke="black" stroke-width="1.5"/>
        <ellipse cx="200" cy="135" rx="3" ry="4" fill="black"/>
        <path d="M 190 145 Q 200 150 210 145" fill="none" stroke="black" stroke-width="2"/>
        
        <!-- Neck and shoulders -->
        <rect x="185" y="180" width="30" height="25" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Dress bodice -->
        <path d="M 160 205 L 180 205 L 185 240 L 160 280 Z" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 240 205 L 220 205 L 215 240 L 240 280 Z" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 185 240 Q 200 245 215 240" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Dress skirt with ice crystal pattern -->
        <path d="M 160 280 Q 120 320 130 380 L 270 380 Q 280 320 240 280 Z" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 170 300 L 175 320 L 170 340" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 200 290 L 200 320 L 195 350" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 230 300 L 225 320 L 230 340" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="180" cy="310" r="8" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="220" cy="310" r="8" fill="none" stroke="black" stroke-width="2"/>
        
        <!-- Arms -->
        <path d="M 160 210 Q 120 220 110 250 L 105 270" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 240 210 Q 280 220 290 250 L 295 270" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Hands with magic sparkles -->
        <ellipse cx="100" cy="280" rx="12" ry="15" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="300" cy="280" rx="12" ry="15" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 85 270 L 90 265 M 85 275 L 80 275 M 85 280 L 85 285" stroke="black" stroke-width="2"/>
        <path d="M 315 270 L 310 265 M 315 275 L 320 275 M 315 280 L 315 285" stroke="black" stroke-width="2"/>
      </svg>
    `,
    'anna-frozen': `
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <!-- Anna's head -->
        <ellipse cx="200" cy="130" rx="45" ry="55" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Hair with braids -->
        <path d="M 175 85 Q 150 80 140 95 Q 135 110 135 130" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 225 85 Q 250 80 260 95 Q 265 110 265 130" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="135" cy="145" rx="15" ry="50" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="265" cy="145" rx="15" ry="50" fill="none" stroke="black" stroke-width="3"/>
        <line x1="130" y1="125" x2="140" y2="125" stroke="black" stroke-width="2"/>
        <line x1="130" y1="140" x2="140" y2="140" stroke="black" stroke-width="2"/>
        <line x1="130" y1="155" x2="140" y2="155" stroke="black" stroke-width="2"/>
        <line x1="130" y1="170" x2="140" y2="170" stroke="black" stroke-width="2"/>
        <line x1="260" y1="125" x2="270" y2="125" stroke="black" stroke-width="2"/>
        <line x1="260" y1="140" x2="270" y2="140" stroke="black" stroke-width="2"/>
        <line x1="260" y1="155" x2="270" y2="155" stroke="black" stroke-width="2"/>
        <line x1="260" y1="170" x2="270" y2="170" stroke="black" stroke-width="2"/>
        
        <!-- White streak in hair -->
        <path d="M 185 80 Q 190 75 195 80 Q 200 100 200 120" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Face features -->
        <circle cx="185" cy="125" r="4" fill="black"/>
        <circle cx="215" cy="125" r="4" fill="black"/>
        <path d="M 182 120 Q 180 115 185 115" fill="none" stroke="black" stroke-width="1.5"/>
        <path d="M 218 120 Q 220 115 215 115" fill="none" stroke="black" stroke-width="1.5"/>
        <path d="M 170 130 Q 165 135 170 140" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 230 130 Q 235 135 230 140" fill="none" stroke="black" stroke-width="2"/>
        <ellipse cx="200" cy="135" rx="3" ry="4" fill="black"/>
        <path d="M 190 145 Q 200 150 210 145" fill="none" stroke="black" stroke-width="2"/>
        
        <!-- Neck and cape collar -->
        <rect x="185" y="180" width="30" height="20" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 140 200 Q 160 195 185 200 L 185 210" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 260 200 Q 240 195 215 200 L 215 210" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Dress bodice with Nordic pattern -->
        <path d="M 160 210 L 185 210 L 185 260 L 160 285 Z" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 240 210 L 215 210 L 215 260 L 240 285 Z" fill="none" stroke="black" stroke-width="3"/>
        <rect x="185" y="210" width="30" height="50" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 190 220 L 195 225 L 190 230" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 205 220 L 210 225 L 205 230" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 190 240 L 195 245 L 190 250" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 205 240 L 210 245 L 205 250" fill="none" stroke="black" stroke-width="2"/>
        
        <!-- Skirt -->
        <path d="M 160 285 Q 130 320 140 380 L 260 380 Q 270 320 240 285 Z" fill="none" stroke="black" stroke-width="3"/>
        <line x1="180" y1="290" x2="175" y2="380" stroke="black" stroke-width="2"/>
        <line x1="220" y1="290" x2="225" y2="380" stroke="black" stroke-width="2"/>
        <path d="M 160 330 Q 200 335 240 330" fill="none" stroke="black" stroke-width="2"/>
        
        <!-- Arms -->
        <path d="M 160 220 Q 130 235 125 260" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 240 220 Q 270 235 275 260" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Hands -->
        <ellipse cx="120" cy="270" rx="12" ry="15" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="280" cy="270" rx="12" ry="15" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Boots -->
        <ellipse cx="170" cy="385" rx="20" ry="12" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="230" cy="385" rx="20" ry="12" fill="none" stroke="black" stroke-width="3"/>
      </svg>
    `,
    'belle-beauty-beast': `
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <!-- Belle's head -->
        <ellipse cx="200" cy="130" rx="42" ry="52" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Hair pulled back with bow -->
        <path d="M 175 85 Q 150 75 135 85 Q 125 95 130 110 Q 135 125 145 135" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 225 85 Q 250 75 265 85 Q 275 95 270 110 Q 265 125 255 135" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 190 75 Q 200 65 210 75" fill="none" stroke="black" stroke-width="3"/>
        <!-- Hair bow -->
        <path d="M 175 80 Q 165 75 160 85 Q 165 90 175 85" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 185 75 Q 180 65 175 70 Q 175 80 185 80" fill="none" stroke="black" stroke-width="2"/>
        
        <!-- Face features -->
        <circle cx="185" cy="125" r="4" fill="black"/>
        <circle cx="215" cy="125" r="4" fill="black"/>
        <path d="M 182 120 Q 180 115 185 115" fill="none" stroke="black" stroke-width="1.5"/>
        <path d="M 218 120 Q 220 115 215 115" fill="none" stroke="black" stroke-width="1.5"/>
        <ellipse cx="200" cy="135" rx="3" ry="4" fill="black"/>
        <path d="M 190 145 Q 200 150 210 145" fill="none" stroke="black" stroke-width="2"/>
        
        <!-- Book in hands -->
        <rect x="140" y="240" width="60" height="80" rx="3" fill="none" stroke="black" stroke-width="3"/>
        <line x1="170" y1="240" x2="170" y2="320" stroke="black" stroke-width="2"/>
        <line x1="150" y1="260" x2="190" y2="260" stroke="black" stroke-width="1.5"/>
        <line x1="150" y1="270" x2="190" y2="270" stroke="black" stroke-width="1.5"/>
        <line x1="150" y1="280" x2="185" y2="280" stroke="black" stroke-width="1.5"/>
        <line x1="150" y1="290" x2="190" y2="290" stroke="black" stroke-width="1.5"/>
        <line x1="150" y1="300" x2="185" y2="300" stroke="black" stroke-width="1.5"/>
        
        <!-- Neck and shoulders -->
        <rect x="185" y="180" width="30" height="20" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Dress bodice -->
        <path d="M 155 200 L 180 200 L 185 240 L 155 250 Z" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 245 200 L 220 200 L 215 240 L 245 250 Z" fill="none" stroke="black" stroke-width="3"/>
        <rect x="180" y="200" width="40" height="55" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Dress skirt (ball gown style) -->
        <path d="M 155 250 Q 100 290 90 360 Q 95 380 120 385 L 280 385 Q 305 380 310 360 Q 300 290 245 250 Z" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 155 270 Q 135 300 130 340" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 245 270 Q 265 300 270 340" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 120 360 Q 200 370 280 360" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="180" cy="290" r="8" fill="none" stroke="black" stroke-width="1.5"/>
        <circle cx="220" cy="290" r="8" fill="none" stroke="black" stroke-width="1.5"/>
        <circle cx="200" cy="320" r="8" fill="none" stroke="black" stroke-width="1.5"/>
        
        <!-- Arms -->
        <path d="M 155 210 Q 130 220 120 235" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 245 210 Q 270 230 265 250" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Hands holding book -->
        <ellipse cx="130" cy="250" rx="12" ry="15" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="210" cy="255" rx="12" ry="15" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Rose (Beauty and the Beast theme) -->
        <circle cx="320" cy="150" r="15" fill="none" stroke="black" stroke-width="2"/>
        <ellipse cx="320" cy="135" rx="10" ry="13" fill="none" stroke="black" stroke-width="2"/>
        <ellipse cx="310" cy="145" rx="10" ry="13" transform="rotate(-30 310 145)" fill="none" stroke="black" stroke-width="2"/>
        <ellipse cx="330" cy="145" rx="10" ry="13" transform="rotate(30 330 145)" fill="none" stroke="black" stroke-width="2"/>
        <line x1="320" y1="165" x2="320" y2="200" stroke="black" stroke-width="3"/>
        <path d="M 320 175 Q 310 180 308 188" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 320 185 Q 332 188 334 195" fill="none" stroke="black" stroke-width="2"/>
      </svg>
    `,
    'ariel-mermaid': `
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <!-- Ocean waves background -->
        <path d="M 0 320 Q 50 310 100 320 Q 150 330 200 320 Q 250 310 300 320 Q 350 330 400 320" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 0 340 Q 50 330 100 340 Q 150 350 200 340 Q 250 330 300 340 Q 350 350 400 340" fill="none" stroke="black" stroke-width="2"/>
        
        <!-- Ariel's head -->
        <ellipse cx="200" cy="130" rx="45" ry="55" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Long flowing hair -->
        <path d="M 160 90 Q 130 85 110 100 Q 100 115 105 135 Q 110 155 120 175 Q 130 195 140 215" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 240 90 Q 270 85 290 100 Q 300 115 295 135 Q 290 155 280 175 Q 270 195 260 215" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 170 85 Q 145 95 130 120 Q 125 140 130 160" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 230 85 Q 255 95 270 120 Q 275 140 270 160" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 190 75 Q 180 80 175 95" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 210 75 Q 220 80 225 95" fill="none" stroke="black" stroke-width="2"/>
        
        <!-- Face features -->
        <circle cx="185" cy="125" r="5" fill="black"/>
        <circle cx="215" cy="125" r="5" fill="black"/>
        <path d="M 182 118 Q 178 113 185 113" fill="none" stroke="black" stroke-width="1.5"/>
        <path d="M 218 118 Q 222 113 215 113" fill="none" stroke="black" stroke-width="1.5"/>
        <ellipse cx="200" cy="135" rx="3" ry="4" fill="black"/>
        <path d="M 190 145 Q 200 150 210 145" fill="none" stroke="black" stroke-width="2"/>
        
        <!-- Seashell top -->
        <ellipse cx="175" cy="210" rx="22" ry="25" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="225" cy="210" rx="22" ry="25" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 165 200 Q 170 210 165 220" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 175 198 Q 180 210 175 222" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 185 197 Q 190 210 185 223" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 215 197 Q 210 210 215 223" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 225 198 Q 220 210 225 222" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 235 200 Q 230 210 235 220" fill="none" stroke="black" stroke-width="2"/>
        
        <!-- Torso/waist -->
        <path d="M 165 235 Q 170 250 175 265" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 235 235 Q 230 250 225 265" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 175 265 Q 185 268 200 268 Q 215 268 225 265" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Mermaid tail -->
        <path d="M 175 265 Q 170 290 168 315 Q 165 340 165 365" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 225 265 Q 230 290 232 315 Q 235 340 235 365" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 165 365 Q 180 375 200 375 Q 220 375 235 365" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Tail fin -->
        <path d="M 165 365 Q 140 380 130 390 Q 140 395 165 385" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 200 375 Q 190 390 195 395 Q 205 395 210 390" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 235 365 Q 260 380 270 390 Q 260 395 235 385" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Scales on tail -->
        <path d="M 175 280 Q 185 278 200 278 Q 215 278 225 280" fill="none" stroke="black" stroke-width="1.5"/>
        <path d="M 173 295 Q 185 293 200 293 Q 215 293 227 295" fill="none" stroke="black" stroke-width="1.5"/>
        <path d="M 171 310 Q 185 308 200 308 Q 215 308 229 310" fill="none" stroke="black" stroke-width="1.5"/>
        <path d="M 169 325 Q 185 323 200 323 Q 215 323 231 325" fill="none" stroke="black" stroke-width="1.5"/>
        <path d="M 167 340 Q 185 338 200 338 Q 215 338 233 340" fill="none" stroke="black" stroke-width="1.5"/>
        <path d="M 166 355 Q 185 353 200 353 Q 215 353 234 355" fill="none" stroke="black" stroke-width="1.5"/>
        
        <!-- Arms -->
        <path d="M 165 200 Q 140 210 130 230" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 235 200 Q 260 210 270 230" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Hands -->
        <ellipse cx="125" cy="240" rx="12" ry="15" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="275" cy="240" rx="12" ry="15" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Bubbles -->
        <circle cx="80" cy="260" r="8" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="320" cy="280" r="6" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="90" cy="300" r="5" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="330" cy="250" r="7" fill="none" stroke="black" stroke-width="2"/>
      </svg>
    `,
    'mickey-mouse': `
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <!-- Mickey's iconic ears -->
        <circle cx="140" cy="110" r="55" fill="none" stroke="black" stroke-width="4"/>
        <circle cx="260" cy="110" r="55" fill="none" stroke="black" stroke-width="4"/>
        
        <!-- Mickey's head -->
        <circle cx="200" cy="170" r="70" fill="none" stroke="black" stroke-width="4"/>
        
        <!-- Face features -->
        <ellipse cx="175" cy="160" rx="8" ry="12" fill="black"/>
        <ellipse cx="225" cy="160" rx="8" ry="12" fill="black"/>
        <circle cx="177" cy="156" r="3" fill="white"/>
        <circle cx="227" cy="156" r="3" fill="white"/>
        
        <!-- Nose -->
        <ellipse cx="200" cy="185" rx="18" ry="22" fill="black"/>
        <ellipse cx="195" cy="180" rx="6" ry="8" fill="white"/>
        
        <!-- Mouth -->
        <path d="M 160 195 Q 200 225 240 195" fill="none" stroke="black" stroke-width="4"/>
        <path d="M 200 185 L 200 210" stroke="black" stroke-width="3"/>
        <path d="M 160 205 Q 165 215 175 215" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 240 205 Q 235 215 225 215" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Tongue -->
        <ellipse cx="200" cy="215" rx="15" ry="8" fill="none" stroke="black" stroke-width="2"/>
        
        <!-- Body with buttons -->
        <ellipse cx="200" cy="290" rx="60" ry="70" fill="none" stroke="black" stroke-width="4"/>
        <circle cx="200" cy="270" r="8" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="200" cy="295" r="8" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Arms -->
        <ellipse cx="145" cy="270" rx="20" ry="45" transform="rotate(-25 145 270)" fill="none" stroke="black" stroke-width="4"/>
        <ellipse cx="255" cy="270" rx="20" ry="45" transform="rotate(25 255 270)" fill="none" stroke="black" stroke-width="4"/>
        
        <!-- Gloves/hands -->
        <ellipse cx="125" cy="305" rx="25" ry="22" fill="none" stroke="black" stroke-width="4"/>
        <ellipse cx="275" cy="305" rx="25" ry="22" fill="none" stroke="black" stroke-width="4"/>
        <path d="M 118 295 Q 115 290 118 285" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 282 295 Q 285 290 282 285" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Legs -->
        <ellipse cx="175" cy="355" rx="18" ry="35" fill="none" stroke="black" stroke-width="4"/>
        <ellipse cx="225" cy="355" rx="18" ry="35" fill="none" stroke="black" stroke-width="4"/>
        
        <!-- Shoes -->
        <ellipse cx="165" cy="385" rx="30" ry="18" fill="none" stroke="black" stroke-width="4"/>
        <ellipse cx="235" cy="385" rx="30" ry="18" fill="none" stroke="black" stroke-width="4"/>
        <line x1="145" y1="385" x2="140" y2="380" stroke="black" stroke-width="3"/>
        <line x1="215" y1="385" x2="210" y2="380" stroke="black" stroke-width="3"/>
      </svg>
    `,
    'minnie-mouse': `
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <!-- Minnie's ears -->
        <circle cx="140" cy="110" r="55" fill="none" stroke="black" stroke-width="4"/>
        <circle cx="260" cy="110" r="55" fill="none" stroke="black" stroke-width="4"/>
        
        <!-- Bow on left ear -->
        <path d="M 110 85 Q 95 75 85 85 Q 90 95 105 95" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 125 75 Q 135 65 145 75 Q 140 85 125 85" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="115" cy="85" r="12" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="105" cy="92" r="4" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="120" cy="88" r="4" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="112" cy="78" r="4" fill="none" stroke="black" stroke-width="2"/>
        
        <!-- Minnie's head -->
        <circle cx="200" cy="170" r="70" fill="none" stroke="black" stroke-width="4"/>
        
        <!-- Face features with eyelashes -->
        <ellipse cx="175" cy="160" rx="8" ry="12" fill="black"/>
        <ellipse cx="225" cy="160" rx="8" ry="12" fill="black"/>
        <circle cx="177" cy="156" r="3" fill="white"/>
        <circle cx="227" cy="156" r="3" fill="white"/>
        <line x1="168" y1="152" x2="158" y2="148" stroke="black" stroke-width="2"/>
        <line x1="170" y1="155" x2="160" y2="153" stroke="black" stroke-width="2"/>
        <line x1="172" y1="158" x2="162" y2="158" stroke="black" stroke-width="2"/>
        <line x1="232" y1="152" x2="242" y2="148" stroke="black" stroke-width="2"/>
        <line x1="230" y1="155" x2="240" y2="153" stroke="black" stroke-width="2"/>
        <line x1="228" y1="158" x2="238" y2="158" stroke="black" stroke-width="2"/>
        
        <!-- Nose -->
        <ellipse cx="200" cy="185" rx="18" ry="22" fill="black"/>
        <ellipse cx="195" cy="180" rx="6" ry="8" fill="white"/>
        
        <!-- Mouth with smile -->
        <path d="M 160 195 Q 200 220 240 195" fill="none" stroke="black" stroke-width="4"/>
        <path d="M 200 185 L 200 210" stroke="black" stroke-width="3"/>
        <path d="M 165 205 Q 170 212 180 210" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 235 205 Q 230 212 220 210" fill="none" stroke="black" stroke-width="2"/>
        
        <!-- Body with polka dot dress -->
        <path d="M 170 240 Q 160 280 150 330 Q 155 360 170 365" fill="none" stroke="black" stroke-width="4"/>
        <path d="M 230 240 Q 240 280 250 330 Q 245 360 230 365" fill="none" stroke="black" stroke-width="4"/>
        <path d="M 170 365 Q 200 370 230 365" fill="none" stroke="black" stroke-width="4"/>
        <path d="M 170 240 Q 200 245 230 240" fill="none" stroke="black" stroke-width="4"/>
        
        <!-- Polka dots on dress -->
        <circle cx="180" cy="270" r="8" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="220" cy="280" r="8" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="200" cy="300" r="8" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="175" cy="320" r="8" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="225" cy="310" r="8" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="190" cy="340" r="8" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="210" cy="330" r="8" fill="none" stroke="black" stroke-width="2"/>
        
        <!-- Arms -->
        <ellipse cx="145" cy="260" rx="20" ry="40" transform="rotate(-30 145 260)" fill="none" stroke="black" stroke-width="4"/>
        <ellipse cx="255" cy="260" rx="20" ry="40" transform="rotate(30 255 260)" fill="none" stroke="black" stroke-width="4"/>
        
        <!-- Gloves -->
        <ellipse cx="125" cy="295" rx="25" ry="22" fill="none" stroke="black" stroke-width="4"/>
        <ellipse cx="275" cy="295" rx="25" ry="22" fill="none" stroke="black" stroke-width="4"/>
        
        <!-- Legs -->
        <ellipse cx="180" cy="380" rx="15" ry="22" fill="none" stroke="black" stroke-width="4"/>
        <ellipse cx="220" cy="380" rx="15" ry="22" fill="none" stroke="black" stroke-width="4"/>
        
        <!-- Shoes with bows -->
        <ellipse cx="175" cy="395" rx="28" ry="15" fill="none" stroke="black" stroke-width="4"/>
        <ellipse cx="225" cy="395" rx="28" ry="15" fill="none" stroke="black" stroke-width="4"/>
        <path d="M 165 390 Q 160 385 165 380" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 185 390 Q 190 385 185 380" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 215 390 Q 210 385 215 380" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 235 390 Q 240 385 235 380" fill="none" stroke="black" stroke-width="2"/>
      </svg>
    `,
    'spiderman': `
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <!-- Spider-Man's head/mask -->
        <ellipse cx="200" cy="150" rx="55" ry="65" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Web pattern on mask -->
        <line x1="200" y1="85" x2="200" y2="215" stroke="black" stroke-width="2"/>
        <line x1="145" y1="150" x2="255" y2="150" stroke="black" stroke-width="2"/>
        <ellipse cx="200" cy="150" rx="15" ry="20" fill="none" stroke="black" stroke-width="2"/>
        <ellipse cx="200" cy="150" rx="30" ry="35" fill="none" stroke="black" stroke-width="2"/>
        <ellipse cx="200" cy="150" rx="45" ry="50" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 185 95 Q 200 100 215 95" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 175 110 Q 200 115 225 110" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 170 130 Q 200 135 230 130" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 170 170 Q 200 175 230 170" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 175 190 Q 200 195 225 190" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 185 205 Q 200 208 215 205" fill="none" stroke="black" stroke-width="2"/>
        
        <!-- Eyes (spider-man style) -->
        <path d="M 165 135 Q 155 145 158 160 Q 162 165 172 163 Q 180 160 183 150 Q 182 138 172 135 Z" fill="white" stroke="black" stroke-width="3"/>
        <path d="M 235 135 Q 245 145 242 160 Q 238 165 228 163 Q 220 160 217 150 Q 218 138 228 135 Z" fill="white" stroke="black" stroke-width="3"/>
        
        <!-- Neck and shoulders -->
        <rect x="185" y="210" width="30" height="20" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Torso with spider emblem -->
        <path d="M 155 230 L 245 230 L 235 340 L 165 340 Z" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Spider emblem on chest -->
        <ellipse cx="200" cy="260" rx="18" ry="22" fill="black"/>
        <ellipse cx="200" cy="260" rx="10" ry="12" fill="none" stroke="black" stroke-width="2"/>
        <line x1="200" y1="282" x2="200" y2="310" stroke="black" stroke-width="4"/>
        <path d="M 185 265 L 165 260" stroke="black" stroke-width="3"/>
        <path d="M 185 270 L 160 275" stroke="black" stroke-width="3"/>
        <path d="M 187 278 L 162 290" stroke="black" stroke-width="3"/>
        <path d="M 215 265 L 235 260" stroke="black" stroke-width="3"/>
        <path d="M 215 270 L 240 275" stroke="black" stroke-width="3"/>
        <path d="M 213 278 L 238 290" stroke="black" stroke-width="3"/>
        <path d="M 195 295 L 175 315" stroke="black" stroke-width="3"/>
        <path d="M 205 295 L 225 315" stroke="black" stroke-width="3"/>
        
        <!-- Web pattern on torso -->
        <line x1="155" y1="245" x2="245" y2="245" stroke="black" stroke-width="1.5"/>
        <line x1="158" y1="260" x2="242" y2="260" stroke="black" stroke-width="1.5"/>
        <line x1="161" y1="275" x2="239" y2="275" stroke="black" stroke-width="1.5"/>
        <line x1="163" y1="290" x2="237" y2="290" stroke="black" stroke-width="1.5"/>
        <line x1="164" y1="305" x2="236" y2="305" stroke="black" stroke-width="1.5"/>
        <line x1="165" y1="320" x2="235" y2="320" stroke="black" stroke-width="1.5"/>
        
        <!-- Arms in action pose -->
        <path d="M 155 235 Q 120 245 100 270 L 90 290" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 245 235 Q 280 230 300 215 L 315 205" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Hands -->
        <ellipse cx="85" cy="300" rx="15" ry="18" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="320" cy="200" rx="15" ry="18" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Web shooting gesture from right hand -->
        <path d="M 320 195 Q 340 180 360 175" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 322 200 Q 345 190 365 190" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 320 205 Q 340 200 360 205" fill="none" stroke="black" stroke-width="2"/>
        
        <!-- Legs -->
        <path d="M 175 340 Q 170 365 175 385" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 225 340 Q 235 360 240 380" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Feet/boots -->
        <ellipse cx="180" cy="390" rx="20" ry="12" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="245" cy="385" rx="20" ry="12" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Web lines in background -->
        <line x1="350" y1="60" x2="380" y2="40" stroke="black" stroke-width="1.5"/>
        <line x1="355" y1="70" x2="390" y2="65" stroke="black" stroke-width="1.5"/>
        <line x1="50" y1="100" x2="20" y2="90" stroke="black" stroke-width="1.5"/>
        <line x1="45" y1="120" x2="15" y2="130" stroke="black" stroke-width="1.5"/>
      </svg>
    `,
    'pikachu': `
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <!-- Pikachu's head -->
        <ellipse cx="200" cy="170" rx="65" ry="60" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Ears -->
        <path d="M 160 120 Q 145 80 140 50 L 155 55 Q 165 90 170 120" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 240 120 Q 255 80 260 50 L 245 55 Q 235 90 230 120" fill="none" stroke="black" stroke-width="3"/>
        <!-- Black tips on ears -->
        <path d="M 135 60 L 140 50 L 145 55" fill="black" stroke="black" stroke-width="2"/>
        <path d="M 255 60 L 260 50 L 265 55" fill="black" stroke="black" stroke-width="2"/>
        
        <!-- Eyes -->
        <circle cx="180" cy="160" r="12" fill="black"/>
        <circle cx="220" cy="160" r="12" fill="black"/>
        <circle cx="177" cy="157" r="4" fill="white"/>
        <circle cx="217" cy="157" r="4" fill="white"/>
        
        <!-- Cheeks (electric pouches) -->
        <circle cx="150" cy="175" r="18" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="250" cy="175" r="18" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Nose -->
        <ellipse cx="200" cy="180" rx="5" ry="6" fill="black"/>
        
        <!-- Mouth -->
        <path d="M 190 190 Q 200 195 210 190" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 185 195 Q 180 200 182 205" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 215 195 Q 220 200 218 205" fill="none" stroke="black" stroke-width="2"/>
        
        <!-- Body -->
        <ellipse cx="200" cy="270" rx="70" ry="75" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Belly stripes -->
        <path d="M 165 250 Q 175 245 185 248" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 235 250 Q 225 245 215 248" fill="none" stroke="black" stroke-width="2"/>
        
        <!-- Arms -->
        <ellipse cx="145" cy="250" rx="18" ry="40" transform="rotate(-20 145 250)" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="255" cy="250" rx="18" ry="40" transform="rotate(20 255 250)" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Legs -->
        <ellipse cx="175" cy="335" rx="25" ry="35" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="225" cy="335" rx="25" ry="35" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Feet -->
        <ellipse cx="170" cy="365" rx="28" ry="18" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="230" cy="365" rx="28" ry="18" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Tail (lightning bolt shape) -->
        <path d="M 260 290 L 280 280 L 270 300 L 295 290 L 285 310 L 305 300 L 285 330 L 275 310 L 265 320 L 270 300 L 260 310 Z" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 270 305 L 280 295 L 285 305" fill="none" stroke="black" stroke-width="2"/>
        
        <!-- Back stripes -->
        <path d="M 230 230 Q 240 225 250 230" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 235 270 Q 245 265 255 270" fill="none" stroke="black" stroke-width="2"/>
        
        <!-- Electric sparks around Pikachu -->
        <path d="M 90 180 L 95 175 L 92 185 L 97 183" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 310 180 L 305 175 L 308 185 L 303 183" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 120 280 L 125 275 L 122 285 L 127 283" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 280 340 L 285 335 L 282 345 L 287 343" fill="none" stroke="black" stroke-width="2"/>
      </svg>
    `,
    'olaf-frozen': `
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <!-- Snowflakes in background -->
        <path d="M 60 60 L 65 55 M 60 60 L 55 55 M 60 60 L 60 50 M 60 60 L 60 70 M 60 60 L 65 65 M 60 60 L 55 65" stroke="black" stroke-width="1.5"/>
        <path d="M 340 80 L 345 75 M 340 80 L 335 75 M 340 80 L 340 70 M 340 80 L 340 90 M 340 80 L 345 85 M 340 80 L 335 85" stroke="black" stroke-width="1.5"/>
        
        <!-- Olaf's head (snowball) -->
        <circle cx="200" cy="120" r="50" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Hair (twig) -->
        <line x1="200" y1="70" x2="200" y2="55" stroke="black" stroke-width="3"/>
        <line x1="200" y1="62" x2="190" y2="58" stroke="black" stroke-width="2"/>
        <line x1="200" y1="66" x2="210" y2="60" stroke="black" stroke-width="2"/>
        
        <!-- Eyes (coal) -->
        <circle cx="185" cy="110" r="5" fill="black"/>
        <circle cx="215" cy="110" r="5" fill="black"/>
        
        <!-- Carrot nose -->
        <path d="M 200 125 L 230 130 L 200 132 Z" fill="none" stroke="black" stroke-width="3"/>
        <line x1="210" y1="128" x2="210" y2="131" stroke="black" stroke-width="2"/>
        <line x1="220" y1="129" x2="220" y2="131" stroke="black" stroke-width="2"/>
        
        <!-- Mouth (coal pieces) -->
        <circle cx="180" cy="145" r="3" fill="black"/>
        <circle cx="190" cy="148" r="3" fill="black"/>
        <circle cx="200" cy="150" r="3" fill="black"/>
        <circle cx="210" cy="148" r="3" fill="black"/>
        <circle cx="220" cy="145" r="3" fill="black"/>
        
        <!-- Eyebrows -->
        <path d="M 175 100 Q 180 97 190 100" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 225 100 Q 220 97 210 100" fill="none" stroke="black" stroke-width="2"/>
        
        <!-- Middle snowball (body) -->
        <circle cx="200" cy="230" r="60" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Buttons (coal) -->
        <circle cx="200" cy="210" r="6" fill="black"/>
        <circle cx="200" cy="235" r="6" fill="black"/>
        <circle cx="200" cy="260" r="6" fill="black"/>
        
        <!-- Bottom snowball -->
        <circle cx="200" cy="340" r="55" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Stick arms -->
        <line x1="145" y1="215" x2="90" y2="200" stroke="black" stroke-width="4"/>
        <line x1="255" y1="215" x2="310" y2="200" stroke="black" stroke-width="4"/>
        
        <!-- Fingers (small twigs) -->
        <line x1="100" y1="205" x2="95" y2="195" stroke="black" stroke-width="3"/>
        <line x1="95" y1="203" x2="88" y2="198" stroke="black" stroke-width="3"/>
        <line x1="90" y1="200" x2="82" y2="200" stroke="black" stroke-width="3"/>
        <line x1="300" y1="205" x2="305" y2="195" stroke="black" stroke-width="3"/>
        <line x1="305" y1="203" x2="312" y2="198" stroke="black" stroke-width="3"/>
        <line x1="310" y1="200" x2="318" y2="200" stroke="black" stroke-width="3"/>
        
        <!-- Knots on arms -->
        <circle cx="120" cy="208" r="6" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="280" cy="208" r="6" fill="none" stroke="black" stroke-width="2"/>
        
        <!-- Feet detail -->
        <ellipse cx="170" cy="385" rx="25" ry="12" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="230" cy="385" rx="25" ry="12" fill="none" stroke="black" stroke-width="3"/>
        
        <!-- Snow texture on body -->
        <path d="M 155 225 Q 160 220 165 225" fill="none" stroke="black" stroke-width="1.5"/>
        <path d="M 235 225 Q 240 220 245 225" fill="none" stroke="black" stroke-width="1.5"/>
        <path d="M 155 340 Q 160 335 165 340" fill="none" stroke="black" stroke-width="1.5"/>
        <path d="M 235 340 Q 240 335 245 340" fill="none" stroke="black" stroke-width="1.5"/>
      </svg>
    `,
    'happy-elephant': `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <circle cx="200" cy="130" r="70" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="130" cy="130" rx="25" ry="50" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="270" cy="130" rx="25" ry="50" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="180" cy="120" r="6" fill="black"/>
        <circle cx="220" cy="120" r="6" fill="black"/>
        <ellipse cx="200" cy="150" rx="15" ry="25" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 190 180 Q 200 190 210 180" fill="none" stroke="black" stroke-width="3"/>
        <rect x="185" y="200" width="10" height="30" fill="none" stroke="black" stroke-width="2"/>
        <rect x="205" y="200" width="10" height="30" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 185 230 L 175 250 M 215 230 L 225 250" stroke="black" stroke-width="2" fill="none"/>
      </svg>
    `,
    'colorful-butterfly': `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="200" cy="150" rx="15" ry="40" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="200" cy="120" r="12" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 200 110 Q 190 90 185 80" stroke="black" stroke-width="2" fill="none"/>
        <path d="M 200 110 Q 210 90 215 80" stroke="black" stroke-width="2" fill="none"/>
        <path d="M 185 130 Q 120 100 100 140 Q 80 180 120 200 Q 140 210 185 180" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 215 130 Q 280 100 300 140 Q 320 180 280 200 Q 260 210 215 180" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="140" cy="150" r="15" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="260" cy="150" r="15" fill="none" stroke="black" stroke-width="2"/>
      </svg>
    `,
    'smiling-sun': `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <circle cx="200" cy="150" r="60" fill="none" stroke="black" stroke-width="4"/>
        <circle cx="185" cy="140" r="5" fill="black"/>
        <circle cx="215" cy="140" r="5" fill="black"/>
        <path d="M 175 165 Q 200 180 225 165" fill="none" stroke="black" stroke-width="3"/>
        <line x1="200" y1="70" x2="200" y2="40" stroke="black" stroke-width="4"/>
        <line x1="200" y1="230" x2="200" y2="260" stroke="black" stroke-width="4"/>
        <line x1="120" y1="150" x2="90" y2="150" stroke="black" stroke-width="4"/>
        <line x1="280" y1="150" x2="310" y2="150" stroke="black" stroke-width="4"/>
        <line x1="145" y1="95" x2="125" y2="75" stroke="black" stroke-width="4"/>
        <line x1="255" y1="95" x2="275" y2="75" stroke="black" stroke-width="4"/>
        <line x1="145" y1="205" x2="125" y2="225" stroke="black" stroke-width="4"/>
        <line x1="255" y1="205" x2="275" y2="225" stroke="black" stroke-width="4"/>
      </svg>
    `,
    'cute-puppy': `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <circle cx="200" cy="140" r="50" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="160" cy="100" rx="20" ry="35" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="240" cy="100" rx="20" ry="35" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="185" cy="135" r="6" fill="black"/>
        <circle cx="215" cy="135" r="6" fill="black"/>
        <ellipse cx="200" cy="155" rx="8" ry="12" fill="black"/>
        <path d="M 200 167 L 200 175" stroke="black" stroke-width="2"/>
        <path d="M 180 175 Q 200 185 220 175" fill="none" stroke="black" stroke-width="2"/>
        <ellipse cx="200" cy="210" rx="40" ry="30" fill="none" stroke="black" stroke-width="3"/>
        <rect x="165" y="235" width="15" height="35" rx="5" fill="none" stroke="black" stroke-width="2"/>
        <rect x="220" y="235" width="15" height="35" rx="5" fill="none" stroke="black" stroke-width="2"/>
      </svg>
    `,
    'rainbow-unicorn': `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <circle cx="200" cy="140" r="45" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="165" cy="120" rx="15" ry="25" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="235" cy="120" rx="15" ry="25" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="185" cy="135" r="5" fill="black"/>
        <circle cx="215" cy="135" r="5" fill="black"/>
        <path d="M 180 155 Q 200 162 220 155" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 200 95 L 210 65 L 200 60 L 190 65 Z" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 180 100 Q 170 80 160 70 Q 150 75 155 85" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 220 100 Q 230 80 240 70 Q 250 75 245 85" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="200" cy="195" rx="35" ry="25" fill="none" stroke="black" stroke-width="3"/>
        <rect x="170" y="215" width="12" height="40" fill="none" stroke="black" stroke-width="2"/>
        <rect x="218" y="215" width="12" height="40" fill="none" stroke="black" stroke-width="2"/>
      </svg>
    `,
    'friendly-dinosaur': `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="200" cy="160" rx="70" ry="45" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="150" cy="130" r="35" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="140" cy="125" r="5" fill="black"/>
        <path d="M 125 140 Q 130 145 135 140" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 180 100 L 185 85 L 190 100 L 195 85 L 200 100 L 205 85 L 210 100" fill="none" stroke="black" stroke-width="3"/>
        <rect x="160" y="200" width="15" height="35" fill="none" stroke="black" stroke-width="2"/>
        <rect x="200" y="200" width="15" height="35" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 270 150 Q 290 150 300 165 L 290 175" fill="none" stroke="black" stroke-width="3"/>
      </svg>
    `,
    'ocean-fish': `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="220" cy="150" rx="80" ry="50" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="260" cy="140" r="6" fill="black"/>
        <path d="M 135 120 L 100 100 L 110 150 L 100 200 L 135 180 Z" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 295 130 L 320 110 L 330 150 L 320 190 L 295 170 Z" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 210 100 L 230 80 L 250 100" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 180 150 L 185 145 L 190 150 L 195 145 L 200 150" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 280 145 Q 285 150 280 155" fill="none" stroke="black" stroke-width="2"/>
      </svg>
    `,
    'beautiful-flower': `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <circle cx="200" cy="120" r="15" fill="none" stroke="black" stroke-width="2"/>
        <ellipse cx="200" cy="85" rx="20" ry="30" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="165" cy="105" rx="20" ry="30" transform="rotate(-60 165 105)" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="235" cy="105" rx="20" ry="30" transform="rotate(60 235 105)" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="165" cy="135" rx="20" ry="30" transform="rotate(-120 165 135)" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="235" cy="135" rx="20" ry="30" transform="rotate(120 235 135)" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="200" cy="155" rx="20" ry="30" fill="none" stroke="black" stroke-width="3"/>
        <line x1="200" y1="150" x2="200" y2="250" stroke="black" stroke-width="4"/>
        <path d="M 200 190 Q 170 200 160 210" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 200 210 Q 230 220 240 230" fill="none" stroke="black" stroke-width="3"/>
      </svg>
    `,
    'race-car': `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <rect x="100" y="140" width="200" height="40" rx="5" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 140 140 L 160 100 L 240 100 L 260 140" fill="none" stroke="black" stroke-width="3"/>
        <rect x="170" y="110" width="60" height="30" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="150" cy="180" r="25" fill="none" stroke="black" stroke-width="4"/>
        <circle cx="250" cy="180" r="25" fill="none" stroke="black" stroke-width="4"/>
        <circle cx="150" cy="180" r="12" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="250" cy="180" r="12" fill="none" stroke="black" stroke-width="2"/>
        <rect x="280" y="155" width="20" height="15" fill="none" stroke="black" stroke-width="2"/>
      </svg>
    `,
    'space-rocket': `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <path d="M 200 50 L 230 120 L 230 200 L 200 220 L 170 200 L 170 120 Z" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 200 50 Q 180 50 170 120" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 200 50 Q 220 50 230 120" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="200" cy="100" r="15" fill="none" stroke="black" stroke-width="3"/>
        <rect x="185" y="140" width="30" height="20" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 170 200 L 150 240 L 170 220 Z" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 230 200 L 250 240 L 230 220 Z" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 200 220 L 200 250" fill="none" stroke="black" stroke-width="3"/>
      </svg>
    `,
    'cute-kitten': `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <circle cx="200" cy="140" r="50" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 155 90 L 140 60 L 160 80 Z" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 245 90 L 260 60 L 240 80 Z" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="185" cy="135" r="6" fill="black"/>
        <circle cx="215" cy="135" r="6" fill="black"/>
        <ellipse cx="200" cy="150" rx="6" ry="8" fill="black"/>
        <path d="M 180 165 Q 200 172 220 165" fill="none" stroke="black" stroke-width="2"/>
        <line x1="160" y1="150" x2="140" y2="145" stroke="black" stroke-width="2"/>
        <line x1="160" y1="155" x2="135" y2="155" stroke="black" stroke-width="2"/>
        <line x1="240" y1="150" x2="260" y2="145" stroke="black" stroke-width="2"/>
        <line x1="240" y1="155" x2="265" y2="155" stroke="black" stroke-width="2"/>
        <ellipse cx="200" cy="200" rx="35" ry="25" fill="none" stroke="black" stroke-width="3"/>
        <rect x="175" y="220" width="12" height="30" fill="none" stroke="black" stroke-width="2"/>
        <rect x="213" y="220" width="12" height="30" fill="none" stroke="black" stroke-width="2"/>
      </svg>
    `,
    'happy-frog': `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="200" cy="160" rx="70" ry="40" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="160" cy="120" r="25" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="240" cy="120" r="25" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="160" cy="118" r="8" fill="black"/>
        <circle cx="240" cy="118" r="8" fill="black"/>
        <path d="M 180 170 Q 200 180 220 170" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="150" cy="200" rx="30" ry="15" fill="none" stroke="black" stroke-width="2"/>
        <ellipse cx="250" cy="200" rx="30" ry="15" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 130 210 L 110 230 L 120 235 L 130 230" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 270" cy="210" L 290 230 L 280 235 L 270 230" fill="none" stroke="black" stroke-width="2"/>
      </svg>
    `,
    'colorful-parrot': `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <circle cx="200" cy="130" r="40" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="190" cy="125" r="5" fill="black"/>
        <path d="M 225 125 Q 245 115 260 120" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 170 100 L 165 85 L 175 90 L 175 80 L 185 90 Z" fill="none" stroke="black" stroke-width="2"/>
        <ellipse cx="200" cy="180" rx="35" ry="45" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 180 220 Q 165 230 160 250" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 220 220 Q 235 230 240 250" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 165 130 L 140 140 L 145 150 L 150 155" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 235 130 L 260 140 L 255 150 L 250 155" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 185 225 L 180 260 M 215 225 L 220 260" stroke="black" stroke-width="2"/>
      </svg>
    `,
    'mountain-scene': `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <path d="M 50 200 L 150 80 L 250 200 Z" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 150 80 L 170 100 L 180 90 L 190 110 L 200 95 L 220 120 L 250 200" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 200 200 L 280 120 L 350 200 Z" fill="none" stroke="black" stroke-width="3"/>
        <line x1="50" y1="200" x2="350" y2="200" stroke="black" stroke-width="3"/>
        <circle cx="80" cy="100" r="30" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 100 220 L 120 230 L 140 220 L 160 235 L 180 225" fill="none" stroke="black" stroke-width="2"/>
      </svg>
    `,
    'fire-truck': `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <rect x="80" y="130" width="240" height="60" rx="5" fill="none" stroke="black" stroke-width="3"/>
        <rect x="250" y="100" width="70" height="30" fill="none" stroke="black" stroke-width="3"/>
        <rect x="100" y="140" width="40" height="30" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="130" cy="190" r="25" fill="none" stroke="black" stroke-width="4"/>
        <circle cx="270" cy="190" r="25" fill="none" stroke="black" stroke-width="4"/>
        <rect x="90" y="105" width="15" height="25" fill="none" stroke="black" stroke-width="2"/>
        <rect x="115" y="105" width="15" height="25" fill="none" stroke="black" stroke-width="2"/>
        <line x1="80" y1="160" x2="50" y2="160" stroke="black" stroke-width="3"/>
        <line x1="50" y1="155" x2="50" y2="165" stroke="black" stroke-width="3"/>
      </svg>
    `,
    'magic-dragon': `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="200" cy="140" rx="60" ry="40" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="150" cy="120" r="35" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="145" cy="115" r="6" fill="black"/>
        <path d="M 125 130 Q 130 135 135 130" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 170 100 L 175 80 L 180 100 L 185 75 L 190 100 L 195 80 L 200 100" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 260 130 Q 290 125 310 145 Q 305 160 280 155" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 175 170 Q 160 185 150 210" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 225 170 Q 240 185 250 210" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 280 125 L 295 115 L 290 120 L 300 115" fill="none" stroke="black" stroke-width="2"/>
      </svg>
    `,
    'smiling-dolphin': `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <path d="M 120 160 Q 150 120 200 130 Q 250 135 280 155 Q 290 170 280 185 Q 250 200 200 190 Q 150 185 130 175 Q 110 165 120 160 Z" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="240" cy="150" r="5" fill="black"/>
        <path d="M 220 165 Q 230 170 240 165" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 110 165 L 80 150 L 85 170 L 90 175" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 200 120 L 210 95 L 220 100 L 225 110" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 285 175 L 310 180 L 305 190 L 285 185" fill="none" stroke="black" stroke-width="3"/>
      </svg>
    `,
    'pretty-butterfly-garden': `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="180" r="20" fill="none" stroke="black" stroke-width="2"/>
        <ellipse cx="100" cy="145" rx="15" ry="25" fill="none" stroke="black" stroke-width="2"/>
        <line x1="100" y1="160" x2="100" y2="220" stroke="black" stroke-width="3"/>
        <circle cx="200" cy="180" r="20" fill="none" stroke="black" stroke-width="2"/>
        <ellipse cx="200" cy="145" rx="15" ry="25" fill="none" stroke="black" stroke-width="2"/>
        <line x1="200" y1="160" x2="200" y2="220" stroke="black" stroke-width="3"/>
        <ellipse cx="300" cy="140" rx="5" ry="15" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 295 135 Q 270 120 260 140 Q 270 155 295 145" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 305 135 Q 330 120 340 140 Q 330 155 305 145" fill="none" stroke="black" stroke-width="2"/>
      </svg>
    `,
    'airplane': `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="200" cy="150" rx="80" ry="25" fill="none" stroke="black" stroke-width="3"/>
        <rect x="190" y="125" width="20" height="50" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 120 150 L 60 130 L 65 150 L 60 170 L 120 150" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 280 150 L 340 130 L 335 150 L 340 170 L 280 150" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 195 175 L 165 210 L 170 215 L 195 190" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 205 175 L 235 210 L 230 215 L 205 190" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="170" cy="145" r="10" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="230" cy="145" r="10" fill="none" stroke="black" stroke-width="2"/>
      </svg>
    `,
    'rainbow': `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <path d="M 50 250 Q 200 50 350 250" fill="none" stroke="black" stroke-width="8"/>
        <path d="M 70 250 Q 200 80 330 250" fill="none" stroke="black" stroke-width="8"/>
        <path d="M 90 250 Q 200 110 310 250" fill="none" stroke="black" stroke-width="8"/>
        <path d="M 110 250 Q 200 140 290 250" fill="none" stroke="black" stroke-width="8"/>
        <path d="M 130 250 Q 200 170 270 250" fill="none" stroke="black" stroke-width="8"/>
        <path d="M 150 250 Q 200 200 250 250" fill="none" stroke="black" stroke-width="8"/>
        <line x1="50" y1="250" x2="350" y2="250" stroke="black" stroke-width="3"/>
      </svg>
    `,
    'sailboat': `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <path d="M 120 180 L 280 180 L 250 220 L 150 220 Z" fill="none" stroke="black" stroke-width="3"/>
        <line x1="200" y1="100" x2="200" y2="180" stroke="black" stroke-width="4"/>
        <path d="M 200 100 L 160 180 L 200 170 Z" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 200 100 L 240 180 L 200 170 Z" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 50 220 Q 200 210 350 220 Q 350 230 200 225 Q 50 230 50 220" fill="none" stroke="black" stroke-width="3"/>
      </svg>
    `,
    'fairy-princess': `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <circle cx="200" cy="110" r="30" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="190" cy="105" r="4" fill="black"/>
        <circle cx="210" cy="105" r="4" fill="black"/>
        <path d="M 190 120 Q 200 125 210 120" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 170 100 Q 155 80 145 75 Q 150 90 160 95" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 230 100 Q 245 80 255 75 Q 250 90 240 95" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 200 140 L 200 180" stroke="black" stroke-width="3"/>
        <path d="M 200 155 L 170 200 Q 165 210 170 220" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 200 155 L 230 200 Q 235 210 230 220" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 180 145 Q 150 160 140 180 L 150 185" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 220 145 Q 250 160 260 180 L 250 185" fill="none" stroke="black" stroke-width="2"/>
        <polygon points="190,95 195,85 200,80 205,85 210,95" fill="none" stroke="black" stroke-width="2"/>
      </svg>
    `,
    'polar-bear': `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <circle cx="200" cy="140" r="50" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="160" cy="110" r="20" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="240" cy="110" r="20" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="185" cy="135" r="5" fill="black"/>
        <circle cx="215" cy="135" r="5" fill="black"/>
        <ellipse cx="200" cy="150" rx="8" ry="10" fill="black"/>
        <path d="M 180 165 Q 200 170 220 165" fill="none" stroke="black" stroke-width="2"/>
        <ellipse cx="200" cy="210" rx="45" ry="30" fill="none" stroke="black" stroke-width="3"/>
        <rect x="165" y="235" width="15" height="30" fill="none" stroke="black" stroke-width="2"/>
        <rect x="220" y="235" width="15" height="30" fill="none" stroke="black" stroke-width="2"/>
      </svg>
    `,
    'train': `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <rect x="100" y="120" width="200" height="90" rx="10" fill="none" stroke="black" stroke-width="3"/>
        <rect x="115" y="135" width="70" height="50" fill="none" stroke="black" stroke-width="2"/>
        <rect x="215" y="135" width="70" height="50" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="140" cy="210" r="20" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="200" cy="210" r="20" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="260" cy="210" r="20" fill="none" stroke="black" stroke-width="3"/>
        <rect x="90" y="100" width="30" height="20" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 100 120 L 80 100 L 80 120" fill="none" stroke="black" stroke-width="3"/>
      </svg>
    `,
    'sunflower': `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <circle cx="200" cy="120" r="25" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="200" cy="80" rx="18" ry="30" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="235" cy="95" rx="18" ry="30" transform="rotate(45 235 95)" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="250" cy="120" rx="30" ry="18" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="235" cy="145" rx="18" ry="30" transform="rotate(-45 235 145)" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="200" cy="160" rx="18" ry="30" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="165" cy="145" rx="18" ry="30" transform="rotate(45 165 145)" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="150" cy="120" rx="30" ry="18" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="165" cy="95" rx="18" ry="30" transform="rotate(-45 165 95)" fill="none" stroke="black" stroke-width="3"/>
        <line x1="200" y1="145" x2="200" y2="250" stroke="black" stroke-width="5"/>
        <path d="M 200 180 Q 170 190 165 200" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 200 210 Q 230 215 235 225" fill="none" stroke="black" stroke-width="3"/>
      </svg>
    `,
    'castle': `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <rect x="100" y="150" width="200" height="100" fill="none" stroke="black" stroke-width="3"/>
        <rect x="80" y="120" width="40" height="130" fill="none" stroke="black" stroke-width="3"/>
        <rect x="280" y="120" width="40" height="130" fill="none" stroke="black" stroke-width="3"/>
        <rect x="90" y="100" width="20" height="20" fill="none" stroke="black" stroke-width="2"/>
        <rect x="290" y="100" width="20" height="20" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 100 150 L 110 150 L 110 140 L 120 140 L 120 150 L 140 150 L 140 140 L 150 140 L 150 150 L 160 150" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 240 150 L 250 150 L 250 140 L 260 140 L 260 150 L 280 150 L 280 140 L 290 140 L 290 150 L 300 150" fill="none" stroke="black" stroke-width="2"/>
        <rect x="170" y="190" width="60" height="60" rx="30" ry="10" fill="none" stroke="black" stroke-width="3"/>
        <line x1="200" y1="190" x2="200" y2="250" stroke="black" stroke-width="2"/>
        <rect x="120" y="170" width="25" height="35" fill="none" stroke="black" stroke-width="2"/>
        <rect x="255" y="170" width="25" height="35" fill="none" stroke="black" stroke-width="2"/>
      </svg>
    `,
  }

  // Default template for paintings without specific SVG
  const defaultTemplate = `
    <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
      <circle cx="200" cy="150" r="70" fill="none" stroke="black" stroke-width="3"/>
      <circle cx="180" cy="140" r="8" fill="black"/>
      <circle cx="220" cy="140" r="8" fill="black"/>
      <path d="M 180 170 Q 200 182 220 170" fill="none" stroke="black" stroke-width="3"/>
      <text x="200" y="260" font-size="18" text-anchor="middle" fill="#666" font-family="Arial">${title}</text>
    </svg>
  `

  return templates[urlKey] || defaultTemplate
}

function ColoringImage({ title, urlKey }: ColoringImageProps) {
  // Use SVG for coloring book style
  const svgContent = getColoringSVG(urlKey, title)

  return (
    <ImageWrapper className="coloring-image">
      <SVGColoring dangerouslySetInnerHTML={{ __html: svgContent.replace('<svg', '<svg width="100%" height="auto"') }} />
    </ImageWrapper>
  )
}

export default ColoringImage
