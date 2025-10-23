import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import SearchBar from './SearchBar'
import MobileMenu from './MobileMenu'
import LanguageSwitcher from './LanguageSwitcher'
import LocalizedLink from './LocalizedLink'

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }
`

const Nav = styled.nav`
  max-width: 1340px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex: 0 0 auto;
  }
`

const RightSection = styled.div`
  display: none;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: 1200px) {
    display: flex;
  }
`

const SearchWrapper = styled.div`
  flex: 1;
  max-width: 600px;
  
  @media (max-width: 768px) {
    display: none; /* Hide on mobile in top row */
  }
`

const MobileSearchWrapper = styled.div`
  display: none;
  width: 100%;
  
  @media (max-width: 768px) {
    display: block;
  }
`

const Logo = styled(LocalizedLink)`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
    animation: bounce 0.5s ease;
  }
`

const LogoImage = styled.img`
  height: 80px;
  width: auto;
  display: block;
  border-radius: 50%;
  background: white;
  padding: 3px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border: 3px solid rgba(255, 255, 255, 0.8);

  @media (max-width: 768px) {
    height: 60px;
    padding: 2px;
    border: 2px solid rgba(255, 255, 255, 0.8);
  }

  @media (max-width: 480px) {
    height: 50px;
  }
`

const NavLinks = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
  margin-left: auto;

  @media (max-width: 1200px) {
    display: none;
  }
`

const NavButton = styled(LocalizedLink)`
  padding: 0.6rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.3);
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.5);
  }

  &:active {
    transform: translateY(0);
  }

  &.primary {
    background: rgba(46, 204, 113, 0.8);
    border-color: rgba(46, 204, 113, 1);
    
    &:hover {
      background: rgba(46, 204, 113, 0.9);
    }
  }

  @media (max-width: 1200px) {
    padding: 0.5rem 0.8rem;
    font-size: 0.9rem;
  }
`

function Header() {
  const { t } = useTranslation()
  
  return (
    <HeaderContainer>
      <Nav>
        <TopRow>
          <LeftSection>
            <Logo to="/">
              <LogoImage src="/logo.png" alt="MyColorFun - Online Coloring Pages" />
            </Logo>
          </LeftSection>
          
          {/* Search bar in middle - desktop only */}
          <SearchWrapper>
            <SearchBar />
          </SearchWrapper>
          
          {/* Desktop navigation with language switcher */}
          <NavLinks>
            <NavButton to="/">🏠 {t('nav.home')}</NavButton>
            <NavButton to="/random" className="primary">🎲 {t('nav.random')}</NavButton>
            <NavButton to="/blog">📝 {t('nav.blog')}</NavButton>
            <LanguageSwitcher />
          </NavLinks>
          
          {/* Mobile right section - language switcher + hamburger menu */}
          <RightSection>
            <LanguageSwitcher />
            <MobileMenu />
          </RightSection>
        </TopRow>
        
        {/* Search bar below on mobile */}
        <MobileSearchWrapper>
          <SearchBar />
        </MobileSearchWrapper>
      </Nav>
    </HeaderContainer>
  )
}

export default Header
