import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { availableLanguages } from '../i18n'

const SwitcherContainer = styled.div`
  position: relative;
  display: inline-block;
`

const LanguageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 45px;
  height: 45px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem;
    font-size: 1.3rem;
    min-width: 40px;
    height: 40px;
  }
`

const LanguageDropdown = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(102, 126, 234, 0.3);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  min-width: 120px;
  z-index: 1000;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.2s ease;
`

const LanguageOption = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.75rem;
  background: ${props => props.$isActive ? '#667eea' : 'transparent'};
  color: ${props => props.$isActive ? 'white' : '#2d3436'};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1.8rem;
  
  &:first-child {
    border-radius: 10px 10px 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 10px 10px;
  }
  
  &:hover {
    background: ${props => props.$isActive ? '#5568d3' : 'rgba(102, 126, 234, 0.1)'};
  }
`

const LanguageIcon = styled.span`
  font-size: 1.8rem;
  line-height: 1;
`

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  
  const currentLanguage = availableLanguages.find(lang => lang.code === i18n.language) || availableLanguages[0]
  
  const handleLanguageChange = (langCode: string) => {
    // Get current path
    let currentPath = location.pathname + location.search + location.hash
    
    // Remove /es prefix if present
    const cleanPath = currentPath.replace(/^\/es/, '')
    
    // Add /es prefix for Spanish, or use clean path for English
    const newPath = langCode === 'es' ? `/es${cleanPath || '/'}` : (cleanPath || '/')
    
    // Navigate to new URL
    navigate(newPath)
    
    // Close dropdown
    setIsOpen(false)
  }
  
  const getLanguageFlag = (code: string) => {
    const flags: { [key: string]: string } = {
      'en': '🇺🇸',
      'es': '🇪🇸',
      // Add more flags as you add languages:
      // 'fr': '🇫🇷',
      // 'de': '🇩🇪',
      // 'pt': '🇵🇹',
      // 'it': '🇮🇹',
      // 'ja': '🇯🇵',
      // 'ko': '🇰🇷',
      // 'zh': '🇨🇳',
    }
    return flags[code] || '🌐'
  }
  
  return (
    <SwitcherContainer>
      <LanguageButton onClick={() => setIsOpen(!isOpen)} title={currentLanguage.nativeName}>
        <LanguageIcon>{getLanguageFlag(currentLanguage.code)}</LanguageIcon>
      </LanguageButton>
      
      <LanguageDropdown $isOpen={isOpen}>
        {availableLanguages.map(language => (
          <LanguageOption
            key={language.code}
            $isActive={i18n.language === language.code}
            onClick={() => handleLanguageChange(language.code)}
            title={language.nativeName}
          >
            <LanguageIcon>{getLanguageFlag(language.code)}</LanguageIcon>
          </LanguageOption>
        ))}
      </LanguageDropdown>
    </SwitcherContainer>
  )
}

export default LanguageSwitcher

