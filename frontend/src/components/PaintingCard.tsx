import { Link } from 'react-router-dom'
import { memo, useState } from 'react'
import styled from 'styled-components'
import { Painting } from '../api/paintings'
import { getProfessionalColoringArt } from './ProfessionalColoringArt'

// Mini SVG generator for cards (simplified versions - fallback only)
const getMiniSVG = (urlKey: string) => {
  const svgs: { [key: string]: string } = {
    'stitch': `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="55" rx="18" ry="20" fill="none" stroke="black" stroke-width="2"/><ellipse cx="50" cy="42" rx="20" ry="18" fill="none" stroke="black" stroke-width="2"/><ellipse cx="38" cy="32" rx="10" ry="16" transform="rotate(-25 38 32)" fill="none" stroke="black" stroke-width="2"/><ellipse cx="62" cy="32" rx="10" ry="16" transform="rotate(25 62 32)" fill="none" stroke="black" stroke-width="2"/><ellipse cx="45" cy="40" rx="6" ry="8" fill="black"/><ellipse cx="55" cy="40" rx="6" ry="8" fill="black"/><circle cx="50" cy="45" r="2" fill="black"/><ellipse cx="45" cy="72" rx="8" ry="6" fill="none" stroke="black" stroke-width="2"/><ellipse cx="55" cy="72" rx="8" ry="6" fill="none" stroke="black" stroke-width="2"/></svg>`,
    'elsa-frozen': `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="38" rx="14" ry="17" fill="none" stroke="black" stroke-width="2"/><path d="M 42 28 Q 35 26 32 32" fill="none" stroke="black" stroke-width="2"/><path d="M 58 28 Q 65 26 68 32" fill="none" stroke="black" stroke-width="2"/><ellipse cx="65" cy="38" rx="4" ry="14" transform="rotate(15 65 38)" fill="none" stroke="black" stroke-width="2"/><path d="M 40 30 L 42 24 L 44 30 L 46 24 L 48 30 L 50 24 L 52 30 L 54 24 L 56 30 L 58 24 L 60 30" fill="none" stroke="black" stroke-width="1.5"/><circle cx="47" cy="36" r="1.5" fill="black"/><circle cx="53" cy="36" r="1.5" fill="black"/><path d="M 38 50 L 42 50 L 42 60 L 38 68 Z" fill="none" stroke="black" stroke-width="2"/><path d="M 62 50 L 58 50 L 58 60 L 62 68 Z" fill="none" stroke="black" stroke-width="2"/><path d="M 38 68 Q 30 75 32 82 L 68 82 Q 70 75 62 68 Z" fill="none" stroke="black" stroke-width="2"/></svg>`,
    'anna-frozen': `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="38" rx="14" ry="17" fill="none" stroke="black" stroke-width="2"/><ellipse cx="35" cy="42" rx="5" ry="15" fill="none" stroke="black" stroke-width="2"/><ellipse cx="65" cy="42" rx="5" ry="15" fill="none" stroke="black" stroke-width="2"/><path d="M 45 28 Q 47 26 49 28" fill="none" stroke="black" stroke-width="2"/><circle cx="47" cy="36" r="1.5" fill="black"/><circle cx="53" cy="36" r="1.5" fill="black"/><path d="M 38 50 L 42 50 L 42 68 Z" fill="none" stroke="black" stroke-width="2"/><path d="M 62 50 L 58 50 L 58 68 Z" fill="none" stroke="black" stroke-width="2"/><path d="M 38 68 Q 32 75 35 82 L 65 82 Q 68 75 62 68 Z" fill="none" stroke="black" stroke-width="2"/><circle cx="45" cy="75" r="2.5" fill="none" stroke="black" stroke-width="1.5"/></svg>`,
    'belle-beauty-beast': `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="38" rx="13" ry="16" fill="none" stroke="black" stroke-width="2"/><path d="M 42 28 Q 38 25 34 28" fill="none" stroke="black" stroke-width="2"/><path d="M 58 28 Q 62 25 66 28" fill="none" stroke="black" stroke-width="2"/><path d="M 42 26 Q 40 22 38 24" fill="none" stroke="black" stroke-width="1.5"/><circle cx="47" cy="36" r="1.5" fill="black"/><circle cx="53" cy="36" r="1.5" fill="black"/><rect x="35" y="55" width="15" height="20" rx="1" fill="none" stroke="black" stroke-width="2"/><line x1="42.5" y1="55" x2="42.5" y2="75" stroke="black" stroke-width="1.5"/><path d="M 38 50 Q 35 52 35 60 Q 35 75 35 82 Q 42 85 50 85 Q 58 85 65 82 Q 65 75 65 60 Q 65 52 62 50 Z" fill="none" stroke="black" stroke-width="2"/><circle cx="78" cy="40" r="5" fill="none" stroke="black" stroke-width="1.5"/><line x1="78" y1="45" x2="78" y2="55" stroke="black" stroke-width="2"/></svg>`,
    'ariel-mermaid': `<svg viewBox="0 0 100 100"><path d="M 20 70 Q 35 68 50 70 Q 65 72 80 70" fill="none" stroke="black" stroke-width="1.5"/><ellipse cx="50" cy="38" rx="14" ry="17" fill="none" stroke="black" stroke-width="2"/><path d="M 40 28 Q 32 26 28 32 Q 30 40 35 45" fill="none" stroke="black" stroke-width="2"/><path d="M 60 28 Q 68 26 72 32 Q 70 40 65 45" fill="none" stroke="black" stroke-width="2"/><circle cx="47" cy="36" r="2" fill="black"/><circle cx="53" cy="36" r="2" fill="black"/><ellipse cx="42" cy="52" rx="7" ry="8" fill="none" stroke="black" stroke-width="2"/><ellipse cx="58" cy="52" rx="7" ry="8" fill="none" stroke="black" stroke-width="2"/><path d="M 45 62 Q 46 66 47 72 Q 47 78 47 82" fill="none" stroke="black" stroke-width="2"/><path d="M 55 62 Q 54 66 53 72 Q 53 78 53 82" fill="none" stroke="black" stroke-width="2"/><path d="M 47 82 Q 42 88 40 90" fill="none" stroke="black" stroke-width="2"/><path d="M 53 82 Q 58 88 60 90" fill="none" stroke="black" stroke-width="2"/></svg>`,
    'mickey-mouse': `<svg viewBox="0 0 100 100"><circle cx="35" cy="30" r="16" fill="none" stroke="black" stroke-width="2.5"/><circle cx="65" cy="30" r="16" fill="none" stroke="black" stroke-width="2.5"/><circle cx="50" cy="48" r="20" fill="none" stroke="black" stroke-width="2.5"/><ellipse cx="45" cy="45" rx="3" ry="4" fill="black"/><ellipse cx="55" cy="45" rx="3" ry="4" fill="black"/><ellipse cx="50" cy="51" rx="5" ry="6" fill="black"/><path d="M 40 55 Q 50 62 60 55" fill="none" stroke="black" stroke-width="2.5"/><ellipse cx="50" cy="75" rx="18" ry="20" fill="none" stroke="black" stroke-width="2.5"/><circle cx="50" cy="70" r="2.5" fill="black"/><circle cx="50" cy="78" r="2.5" fill="black"/></svg>`,
    'minnie-mouse': `<svg viewBox="0 0 100 100"><circle cx="35" cy="30" r="16" fill="none" stroke="black" stroke-width="2.5"/><circle cx="65" cy="30" r="16" fill="none" stroke="black" stroke-width="2.5"/><path d="M 28 22 Q 22 18 20 24 Q 23 28 28 26" fill="none" stroke="black" stroke-width="2"/><path d="M 32 20 Q 36 16 40 20 Q 38 24 32 24" fill="none" stroke="black" stroke-width="2"/><circle cx="30" cy="24" r="3.5" fill="none" stroke="black" stroke-width="2"/><circle cx="50" cy="48" r="20" fill="none" stroke="black" stroke-width="2.5"/><ellipse cx="45" cy="45" rx="3" ry="4" fill="black"/><ellipse cx="55" cy="45" rx="3" ry="4" fill="black"/><line x1="42" y1="43" x2="38" y2="41" stroke="black" stroke-width="1.5"/><line x1="58" y1="43" x2="62" y2="41" stroke="black" stroke-width="1.5"/><ellipse cx="50" cy="51" rx="5" ry="6" fill="black"/><path d="M 40 55 Q 50 62 60 55" fill="none" stroke="black" stroke-width="2.5"/><path d="M 42 68 Q 40 78 38 85" fill="none" stroke="black" stroke-width="2.5"/><path d="M 58 68 Q 60 78 62 85" fill="none" stroke="black" stroke-width="2.5"/><circle cx="45" cy="72" r="2.5" fill="none" stroke="black" stroke-width="1.5"/><circle cx="55" cy="76" r="2.5" fill="none" stroke="black" stroke-width="1.5"/></svg>`,
    'spiderman': `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="42" rx="18" ry="22" fill="none" stroke="black" stroke-width="2"/><line x1="50" y1="20" x2="50" y2="64" stroke="black" stroke-width="1.5"/><line x1="32" y1="42" x2="68" y2="42" stroke="black" stroke-width="1.5"/><ellipse cx="50" cy="42" rx="6" ry="8" fill="none" stroke="black" stroke-width="1.5"/><ellipse cx="50" cy="42" rx="12" ry="14" fill="none" stroke="black" stroke-width="1.5"/><path d="M 40 36 Q 38 40 40 46 Q 42 48 45 47 Q 47 44 46 40 Z" fill="white" stroke="black" stroke-width="2"/><path d="M 60 36 Q 62 40 60 46 Q 58 48 55 47 Q 53 44 54 40 Z" fill="white" stroke="black" stroke-width="2"/><path d="M 38 62 L 62 62 L 60 82 L 40 82 Z" fill="none" stroke="black" stroke-width="2"/><ellipse cx="50" cy="68" rx="6" ry="7" fill="black"/><line x1="50" y1="75" x2="50" y2="82" stroke="black" stroke-width="2.5"/><path d="M 46 70 L 40 68" stroke="black" stroke-width="2"/><path d="M 54 70 L 60 68" stroke="black" stroke-width="2"/></svg>`,
    'pikachu': `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="48" rx="20" ry="18" fill="none" stroke="black" stroke-width="2"/><path d="M 42 35 Q 38 22 36 15 L 40 18 Q 43 28 44 35" fill="none" stroke="black" stroke-width="2"/><path d="M 58 35 Q 62 22 64 15 L 60 18 Q 57 28 56 35" fill="none" stroke="black" stroke-width="2"/><path d="M 35 17 L 36 15 L 38 16" fill="black" stroke="black" stroke-width="1.5"/><path d="M 65 17 L 64 15 L 62 16" fill="black" stroke="black" stroke-width="1.5"/><circle cx="44" cy="46" r="4" fill="black"/><circle cx="56" cy="46" r="4" fill="black"/><circle cx="43" cy="44" r="1.5" fill="white"/><circle cx="55" cy="44" r="1.5" fill="white"/><circle cx="36" cy="50" r="6" fill="none" stroke="black" stroke-width="2"/><circle cx="64" cy="50" r="6" fill="none" stroke="black" stroke-width="2"/><ellipse cx="50" cy="66" rx="22" ry="24" fill="none" stroke="black" stroke-width="2"/><path d="M 68 68 L 72 66 L 70 72 L 76 70 L 72 76 L 70 72 L 68 75 Z" fill="none" stroke="black" stroke-width="2"/></svg>`,
    'olaf-frozen': `<svg viewBox="0 0 100 100"><circle cx="50" cy="32" r="14" fill="none" stroke="black" stroke-width="2"/><line x1="50" y1="18" x2="50" y2="14" stroke="black" stroke-width="2"/><line x1="50" y1="20" x2="46" y2="18" stroke="black" stroke-width="1.5"/><circle cx="46" cy="30" r="2" fill="black"/><circle cx="54" cy="30" r="2" fill="black"/><path d="M 50 34 L 60 36 L 50 37 Z" fill="none" stroke="black" stroke-width="2"/><circle cx="46" cy="40" r="1" fill="black"/><circle cx="50" cy="41" r="1" fill="black"/><circle cx="54" cy="40" r="1" fill="black"/><circle cx="50" cy="58" r="16" fill="none" stroke="black" stroke-width="2"/><circle cx="50" cy="52" r="2" fill="black"/><circle cx="50" cy="60" r="2" fill="black"/><circle cx="50" cy="80" r="15" fill="none" stroke="black" stroke-width="2"/><line x1="34" y1="54" x2="22" y2="50" stroke="black" stroke-width="2.5"/><line x1="66" y1="54" x2="78" y2="50" stroke="black" stroke-width="2.5"/></svg>`,
    'happy-elephant': `<svg viewBox="0 0 100 100"><circle cx="50" cy="45" r="20" fill="none" stroke="black" stroke-width="2"/><ellipse cx="35" cy="45" rx="7" ry="12" fill="none" stroke="black" stroke-width="2"/><ellipse cx="65" cy="45" rx="7" ry="12" fill="none" stroke="black" stroke-width="2"/><circle cx="45" cy="42" r="2" fill="black"/><circle cx="55" cy="42" r="2" fill="black"/></svg>`,
    'colorful-butterfly': `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="4" ry="12" fill="none" stroke="black" stroke-width="2"/><path d="M 46 45 Q 30 42 25 52 Q 30 60 46 55" fill="none" stroke="black" stroke-width="2"/><path d="M 54 45 Q 70 42 75 52 Q 70 60 54 55" fill="none" stroke="black" stroke-width="2"/></svg>`,
    'smiling-sun': `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="18" fill="none" stroke="black" stroke-width="2"/><line x1="50" y1="20" x2="50" y2="28" stroke="black" stroke-width="2"/><line x1="50" y1="72" x2="50" y2="80" stroke="black" stroke-width="2"/><line x1="20" y1="50" x2="28" y2="50" stroke="black" stroke-width="2"/><line x1="72" y1="50" x2="80" y2="50" stroke="black" stroke-width="2"/></svg>`,
    'cute-puppy': `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="18" fill="none" stroke="black" stroke-width="2"/><ellipse cx="37" cy="38" rx="7" ry="10" fill="none" stroke="black" stroke-width="2"/><ellipse cx="63" cy="38" rx="7" ry="10" fill="none" stroke="black" stroke-width="2"/><circle cx="45" cy="48" r="2" fill="black"/><circle cx="55" cy="48" r="2" fill="black"/></svg>`,
    'rainbow-unicorn': `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="16" fill="none" stroke="black" stroke-width="2"/><path d="M 50 34 L 53 25 L 50 23 L 47 25 Z" fill="none" stroke="black" stroke-width="2"/><circle cx="45" cy="48" r="2" fill="black"/><circle cx="55" cy="48" r="2" fill="black"/></svg>`,
    'friendly-dinosaur': `<svg viewBox="0 0 100 100"><ellipse cx="55" cy="50" rx="20" ry="12" fill="none" stroke="black" stroke-width="2"/><circle cx="40" cy="42" r="12" fill="none" stroke="black" stroke-width="2"/><circle cx="38" cy="40" r="2" fill="black"/><path d="M 45 38 L 47 30 L 49 38 L 51 30 L 53 38" fill="none" stroke="black" stroke-width="2"/></svg>`,
    'ocean-fish': `<svg viewBox="0 0 100 100"><ellipse cx="55" cy="50" rx="25" ry="15" fill="none" stroke="black" stroke-width="2"/><circle cx="65" cy="47" r="2" fill="black"/><path d="M 28 45 L 20 40 L 22 50 L 20 60 L 28 55 Z" fill="none" stroke="black" stroke-width="2"/><path d="M 78 45 L 88 48 L 88 52 L 78 55 Z" fill="none" stroke="black" stroke-width="2"/></svg>`,
    'beautiful-flower': `<svg viewBox="0 0 100 100"><circle cx="50" cy="40" r="8" fill="none" stroke="black" stroke-width="2"/><ellipse cx="50" cy="25" rx="8" ry="12" fill="none" stroke="black" stroke-width="2"/><ellipse cx="38" cy="35" rx="8" ry="12" transform="rotate(-60 38 35)" fill="none" stroke="black" stroke-width="2"/><ellipse cx="62" cy="35" rx="8" ry="12" transform="rotate(60 62 35)" fill="none" stroke="black" stroke-width="2"/><line x1="50" y1="48" x2="50" y2="75" stroke="black" stroke-width="2"/></svg>`,
    'race-car': `<svg viewBox="0 0 100 100"><rect x="25" y="45" width="50" height="12" fill="none" stroke="black" stroke-width="2"/><path d="M 35 45 L 40 30 L 60 30 L 65 45" fill="none" stroke="black" stroke-width="2"/><circle cx="38" cy="57" r="8" fill="none" stroke="black" stroke-width="2"/><circle cx="62" cy="57" r="8" fill="none" stroke="black" stroke-width="2"/></svg>`,
    'space-rocket': `<svg viewBox="0 0 100 100"><path d="M 50 20 L 58 40 L 58 65 L 50 70 L 42 65 L 42 40 Z" fill="none" stroke="black" stroke-width="2"/><circle cx="50" cy="35" r="6" fill="none" stroke="black" stroke-width="2"/><path d="M 42 65 L 35 80 L 42 72 Z" fill="none" stroke="black" stroke-width="2"/><path d="M 58 65 L 65 80 L 58 72 Z" fill="none" stroke="black" stroke-width="2"/></svg>`,
    'cute-kitten': `<svg viewBox="0 0 100 100"><circle cx="50" cy="48" r="18" fill="none" stroke="black" stroke-width="2"/><path d="M 38 32 L 32 20 L 40 28 Z" fill="none" stroke="black" stroke-width="2"/><path d="M 62 32 L 68 20 L 60 28 Z" fill="none" stroke="black" stroke-width="2"/><circle cx="45" cy="46" r="2" fill="black"/><circle cx="55" cy="46" r="2" fill="black"/></svg>`,
    'happy-frog': `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="52" rx="22" ry="12" fill="none" stroke="black" stroke-width="2"/><circle cx="40" cy="38" r="10" fill="none" stroke="black" stroke-width="2"/><circle cx="60" cy="38" r="10" fill="none" stroke="black" stroke-width="2"/><circle cx="40" cy="37" r="3" fill="black"/><circle cx="60" cy="37" r="3" fill="black"/></svg>`,
    'colorful-parrot': `<svg viewBox="0 0 100 100"><circle cx="50" cy="45" r="15" fill="none" stroke="black" stroke-width="2"/><circle cx="47" cy="43" r="2" fill="black"/><path d="M 60 43 Q 70 40 75 43" fill="none" stroke="black" stroke-width="2"/><ellipse cx="50" cy="62" rx="12" ry="15" fill="none" stroke="black" stroke-width="2"/><path d="M 40 45 L 30 48" fill="none" stroke="black" stroke-width="2"/><path d="M 60 45 L 70 48" fill="none" stroke="black" stroke-width="2"/></svg>`,
    'mountain-scene': `<svg viewBox="0 0 100 100"><path d="M 15 65 L 40 30 L 65 65 Z" fill="none" stroke="black" stroke-width="2"/><path d="M 55 65 L 75 40 L 85 65 Z" fill="none" stroke="black" stroke-width="2"/><line x1="10" y1="65" x2="90" y2="65" stroke="black" stroke-width="2"/><circle cx="25" cy="30" r="10" fill="none" stroke="black" stroke-width="2"/></svg>`,
    'fire-truck': `<svg viewBox="0 0 100 100"><rect x="25" y="42" width="50" height="18" fill="none" stroke="black" stroke-width="2"/><circle cx="35" cy="60" r="8" fill="none" stroke="black" stroke-width="2"/><circle cx="65" cy="60" r="8" fill="none" stroke="black" stroke-width="2"/><rect x="60" y="30" width="15" height="12" fill="none" stroke="black" stroke-width="2"/></svg>`,
    'magic-dragon': `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="48" rx="20" ry="12" fill="none" stroke="black" stroke-width="2"/><circle cx="38" cy="42" r="12" fill="none" stroke="black" stroke-width="2"/><circle cx="37" cy="40" r="2" fill="black"/><path d="M 43 35 L 45 28 L 47 35 L 49 28 L 51 35" fill="none" stroke="black" stroke-width="2"/><path d="M 70 45 Q 80 43 85 50" fill="none" stroke="black" stroke-width="2"/></svg>`,
    'smiling-dolphin': `<svg viewBox="0 0 100 100"><path d="M 30 52 Q 40 40 50 43 Q 65 45 72 52 Q 73 58 70 62 Q 60 65 50 62 Q 40 60 35 57 Q 28 54 30 52 Z" fill="none" stroke="black" stroke-width="2"/><circle cx="62" cy="50" r="2" fill="black"/><path d="M 50 38 L 53 28 L 56 33" fill="none" stroke="black" stroke-width="2"/></svg>`,
    'pretty-butterfly-garden': `<svg viewBox="0 0 100 100"><circle cx="35" cy="55" r="8" fill="none" stroke="black" stroke-width="2"/><ellipse cx="35" cy="42" rx="6" ry="10" fill="none" stroke="black" stroke-width="2"/><line x1="35" y1="47" x2="35" y2="70" stroke="black" stroke-width="2"/><ellipse cx="65" cy="45" rx="3" ry="10" fill="none" stroke="black" stroke-width="2"/><path d="M 63 42 Q 55 38 52 45" fill="none" stroke="black" stroke-width="2"/><path d="M 67 42 Q 75 38 78 45" fill="none" stroke="black" stroke-width="2"/></svg>`,
    'airplane': `<svg viewBox="0 0 100 100"><ellipse cx="50" cy="50" rx="25" ry="8" fill="none" stroke="black" stroke-width="2"/><rect x="47" y="42" width="6" height="16" fill="none" stroke="black" stroke-width="2"/><path d="M 25 50 L 15 45 L 16 50 L 15 55 L 25 50" fill="none" stroke="black" stroke-width="2"/><path d="M 75 50 L 85 45 L 84 50 L 85 55 L 75 50" fill="none" stroke="black" stroke-width="2"/></svg>`,
    'rainbow': `<svg viewBox="0 0 100 100"><path d="M 20 75 Q 50 30 80 75" fill="none" stroke="black" stroke-width="3"/><path d="M 25 75 Q 50 38 75 75" fill="none" stroke="black" stroke-width="3"/><path d="M 30 75 Q 50 46 70 75" fill="none" stroke="black" stroke-width="3"/><path d="M 35 75 Q 50 54 65 75" fill="none" stroke="black" stroke-width="3"/></svg>`,
    'sailboat': `<svg viewBox="0 0 100 100"><path d="M 35 58 L 65 58 L 60 70 L 40 70 Z" fill="none" stroke="black" stroke-width="2"/><line x1="50" y1="35" x2="50" y2="58" stroke="black" stroke-width="2"/><path d="M 50 35 L 40 58 L 50 55 Z" fill="none" stroke="black" stroke-width="2"/><path d="M 50 35 L 60 58 L 50 55 Z" fill="none" stroke="black" stroke-width="2"/></svg>`,
    'fairy-princess': `<svg viewBox="0 0 100 100"><circle cx="50" cy="38" r="12" fill="none" stroke="black" stroke-width="2"/><circle cx="47" cy="36" r="2" fill="black"/><circle cx="53" cy="36" r="2" fill="black"/><path d="M 42 35 Q 35 28 32 26" fill="none" stroke="black" stroke-width="1.5"/><path d="M 58 35 Q 65 28 68 26" fill="none" stroke="black" stroke-width="1.5"/><line x1="50" y1="50" x2="50" y2="62" stroke="black" stroke-width="2"/><path d="M 50 55 L 42 68" fill="none" stroke="black" stroke-width="2"/><path d="M 50 55 L 58 68" fill="none" stroke="black" stroke-width="2"/></svg>`,
    'polar-bear': `<svg viewBox="0 0 100 100"><circle cx="50" cy="47" r="18" fill="none" stroke="black" stroke-width="2"/><circle cx="38" cy="36" r="8" fill="none" stroke="black" stroke-width="2"/><circle cx="62" cy="36" r="8" fill="none" stroke="black" stroke-width="2"/><circle cx="45" cy="45" r="2" fill="black"/><circle cx="55" cy="45" r="2" fill="black"/></svg>`,
    'train': `<svg viewBox="0 0 100 100"><rect x="30" y="40" width="40" height="22" rx="3" fill="none" stroke="black" stroke-width="2"/><rect x="35" y="45" width="14" height="12" fill="none" stroke="black" stroke-width="1.5"/><rect x="51" y="45" width="14" height="12" fill="none" stroke="black" stroke-width="1.5"/><circle cx="40" cy="62" r="6" fill="none" stroke="black" stroke-width="2"/><circle cx="60" cy="62" r="6" fill="none" stroke="black" stroke-width="2"/></svg>`,
    'sunflower': `<svg viewBox="0 0 100 100"><circle cx="50" cy="42" r="10" fill="none" stroke="black" stroke-width="2"/><ellipse cx="50" cy="28" rx="7" ry="12" fill="none" stroke="black" stroke-width="2"/><ellipse cx="62" cy="33" rx="7" ry="12" transform="rotate(45 62 33)" fill="none" stroke="black" stroke-width="2"/><ellipse cx="67" cy="42" rx="12" ry="7" fill="none" stroke="black" stroke-width="2"/><ellipse cx="62" cy="51" rx="7" ry="12" transform="rotate(-45 62 51)" fill="none" stroke="black" stroke-width="2"/><ellipse cx="50" cy="56" rx="7" ry="12" fill="none" stroke="black" stroke-width="2"/><ellipse cx="38" cy="51" rx="7" ry="12" transform="rotate(45 38 51)" fill="none" stroke="black" stroke-width="2"/><ellipse cx="33" cy="42" rx="12" ry="7" fill="none" stroke="black" stroke-width="2"/><ellipse cx="38" cy="33" rx="7" ry="12" transform="rotate(-45 38 33)" fill="none" stroke="black" stroke-width="2"/><line x1="50" y1="52" x2="50" y2="78" stroke="black" stroke-width="2"/></svg>`,
    'castle': `<svg viewBox="0 0 100 100"><rect x="30" y="50" width="40" height="25" fill="none" stroke="black" stroke-width="2"/><rect x="25" y="40" width="8" height="35" fill="none" stroke="black" stroke-width="2"/><rect x="67" y="40" width="8" height="35" fill="none" stroke="black" stroke-width="2"/><rect x="27" y="35" width="4" height="5" fill="none" stroke="black" stroke-width="1.5"/><rect x="69" y="35" width="4" height="5" fill="none" stroke="black" stroke-width="1.5"/><path d="M 42 58 L 50 70 L 58 58" fill="none" stroke="black" stroke-width="2"/></svg>`,
  }
  return svgs[urlKey] || `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="22" fill="none" stroke="black" stroke-width="2"/><circle cx="45" cy="45" r="3" fill="black"/><circle cx="55" cy="45" r="3" fill="black"/><path d="M 42 58 Q 50 62 58 58" fill="none" stroke="black" stroke-width="2"/></svg>`
}

const Card = styled(Link)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  }
`

const ImageContainer = styled.div`
  position: relative;
  padding-top: 75%; /* 4:3 aspect ratio */
  background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%);
  overflow: hidden;
`

const CardImage = styled.img.attrs({
  loading: 'lazy' // Native lazy loading for better performance
})`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain; /* Changed from cover to contain - shows full image without cropping */
  background: white;
`

const SVGContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  
  svg {
    width: 100%;
    height: 100%;
    max-width: 200px;
    max-height: 200px;
  }
`

const Badge = styled.div<{ difficulty: number }>`
  position: absolute;
  top: 10px;
  right: 10px;
  background: ${props => 
    props.difficulty === 1 ? '#2ecc71' :
    props.difficulty === 2 ? '#f39c12' :
    '#e74c3c'
  };
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 15px;
  font-weight: 700;
  font-size: 0.9rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`

const FeaturedBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 15px;
  font-weight: 700;
  font-size: 0.9rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  animation: pulse 2s infinite;
`

const Content = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3436;
  margin: 0;
`

const Description = styled.p`
  font-size: 1rem;
  color: #636e72;
  margin: 0;
  line-height: 1.5;
  flex: 1;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #f0f0f0;
`

const Category = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 600;
`

const Views = styled.span`
  color: #b2bec3;
  font-size: 0.9rem;
  font-weight: 600;
`

interface PaintingCardProps {
  painting: Painting
}

const PaintingCard = memo(function PaintingCard({ painting }: PaintingCardProps) {
  const [imageError, setImageError] = useState(false)
  
  const getDifficultyText = (difficulty: number) => {
    if (difficulty === 1) return '⭐ Easy'
    if (difficulty === 2) return '⭐⭐ Medium'
    return '⭐⭐⭐ Hard'
  }

  // Construct proper image path from urlKey
  // Try PNG first, then fallback to JPG if PNG fails
  const getImagePath = () => {
    // First check if painting has a valid imageUrl
    if (painting.imageUrl && 
        !painting.imageUrl.includes('placeholder') && 
        !painting.imageUrl.includes('example.com')) {
      return painting.imageUrl
    }
    
    // Fallback: construct from urlKey
    // Convert urlKey like "spooky-christmas" to "spooky_christmas.png"
    const fileName = painting.urlKey.replace(/-/g, '_')
    return `/coloring-images/${fileName}.png`
  }

  const imagePath = getImagePath()
  
  return (
    <Card to={`/painting/${painting.urlKey}`}>
      <ImageContainer>
        {/* Show PNG/JPG image directly - no SVG overlay */}
        {!imageError ? (
          <CardImage 
            src={imagePath}
            alt={painting.title}
            onError={(e) => {
              const target = e.target as HTMLImageElement
              // If PNG fails, try JPG
              if (target.src.endsWith('.png')) {
                target.src = target.src.replace('.png', '.jpg')
              } else {
                // Both PNG and JPG failed - show SVG fallback
                setImageError(true)
              }
            }}
          />
        ) : (
          <SVGContainer 
            dangerouslySetInnerHTML={{ __html: getProfessionalColoringArt(painting.urlKey) || getMiniSVG(painting.urlKey) }} 
          />
        )}
        
        {painting.featured && <FeaturedBadge>⭐ Featured!</FeaturedBadge>}
        <Badge difficulty={painting.difficulty}>
          {getDifficultyText(painting.difficulty)}
        </Badge>
      </ImageContainer>
      <Content>
        <Title>{painting.title}</Title>
        <Description>{painting.description}</Description>
        <Footer>
          <Category>{painting.category}</Category>
          <Views>👁️ {painting.viewCount} views</Views>
        </Footer>
      </Content>
    </Card>
  )
})

export default PaintingCard
