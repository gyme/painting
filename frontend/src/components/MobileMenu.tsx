import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const HamburgerButton = styled.button`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    transition: all 0.3s ease;
    z-index: 100;
    
    &:active {
      transform: scale(0.95);
    }
  }
`

const Overlay = styled.div<{ $isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(10px);
    z-index: 200;
    opacity: ${props => props.$isOpen ? '1' : '0'};
    pointer-events: ${props => props.$isOpen ? 'auto' : 'none'};
    transition: opacity 0.3s ease;
  }
`

const MenuContainer = styled.div<{ $isOpen: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    z-index: 300;
    padding: 0;
    opacity: ${props => props.$isOpen ? '1' : '0'};
    pointer-events: ${props => props.$isOpen ? 'auto' : 'none'};
    transform: scale(${props => props.$isOpen ? '1' : '0.95'});
    transition: all 0.3s ease;
    overflow-y: auto;
  }
`

const MenuHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 1.5rem;
  color: white;
`

const MenuHeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const MenuLogo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`

const CloseButton = styled.button`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.5);
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  line-height: 1;
  
  &:active {
    transform: scale(0.9);
    background: rgba(255, 255, 255, 0.3);
  }
`

const MenuContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 1.5rem;
  gap: 2rem;
`

const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const SectionTitle = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 0.75rem;
  padding-left: 1rem;
`

const MenuLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const MenuLink = styled(Link)<{ $isActive?: boolean }>`
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.3rem;
  padding: 1rem 1.5rem;
  border-radius: 15px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: ${props => props.$isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  backdrop-filter: blur(10px);
  border: 2px solid ${props => props.$isActive ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)'};
  
  &:active {
    transform: scale(0.95);
    background: rgba(255, 255, 255, 0.3);
  }
`

const MenuFooter = styled.div`
  padding: 1.5rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  line-height: 1.8;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
`

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const closeMenu = () => setIsOpen(false)
  
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <>
      <HamburgerButton 
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        ☰
      </HamburgerButton>

      <Overlay 
        $isOpen={isOpen} 
        onClick={closeMenu}
      />
      
      <MenuContainer $isOpen={isOpen}>
        <MenuHeader>
          <MenuHeaderTop>
            <MenuLogo>
              🎨 Kids Painting Fun!
            </MenuLogo>
            <CloseButton onClick={closeMenu} aria-label="Close menu">
              ×
            </CloseButton>
          </MenuHeaderTop>
        </MenuHeader>
        
        <MenuContent>
          <MenuSection>
            <SectionTitle>Navigation</SectionTitle>
            <MenuLinks>
              <MenuLink 
                to="/" 
                onClick={closeMenu}
                $isActive={isActive('/')}
              >
                🏠 Home
              </MenuLink>
              <MenuLink 
                to="/blog" 
                onClick={closeMenu}
                $isActive={isActive('/blog')}
              >
                ✏️ Blog
              </MenuLink>
              <MenuLink 
                to="/category/Animals" 
                onClick={closeMenu}
                $isActive={isActive('/category/Animals')}
              >
                🐶 Animals
              </MenuLink>
              <MenuLink 
                to="/category/Nature" 
                onClick={closeMenu}
                $isActive={isActive('/category/Nature')}
              >
                🌳 Nature
              </MenuLink>
              <MenuLink 
                to="/category/Vehicles" 
                onClick={closeMenu}
                $isActive={isActive('/category/Vehicles')}
              >
                🚗 Vehicles
              </MenuLink>
            </MenuLinks>
          </MenuSection>

          <MenuSection>
            <SectionTitle>Information</SectionTitle>
            <MenuLinks>
              <MenuLink 
                to="/contact" 
                onClick={closeMenu}
                $isActive={isActive('/contact')}
              >
                📧 Contact Us
              </MenuLink>
              <MenuLink 
                to="/terms" 
                onClick={closeMenu}
                $isActive={isActive('/terms')}
              >
                📄 Terms of Service
              </MenuLink>
              <MenuLink 
                to="/privacy" 
                onClick={closeMenu}
                $isActive={isActive('/privacy')}
              >
                🔒 Privacy Policy
              </MenuLink>
            </MenuLinks>
          </MenuSection>
        </MenuContent>
        
        <MenuFooter>
          © {new Date().getFullYear()} mycolor.fun
          <br />
          Free coloring pages for kids! 🌈
          <br />
          Print, Color, and Have Fun!
        </MenuFooter>
      </MenuContainer>
    </>
  )
}

export default MobileMenu
