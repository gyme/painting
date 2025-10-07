import { Link } from 'react-router-dom'
import styled from 'styled-components'
import SearchBar from './SearchBar'
import MobileMenu from './MobileMenu'

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`

const Nav = styled.nav`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`

const Logo = styled(Link)`
  font-size: 2rem;
  font-weight: 700;
  color: #667eea;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
    animation: bounce 0.5s ease;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    display: none;
  }
`

const NavButton = styled(Link)`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
`

function Header() {
  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">
          🎨 Kids Painting Fun!
        </Logo>
        <NavLinks>
          <SearchBar />
          <NavButton to="/">🏠 Home</NavButton>
          <NavButton to="/category/Animals">🐶 Animals</NavButton>
          <NavButton to="/category/Nature">🌳 Nature</NavButton>
          <NavButton to="/category/Vehicles">🚗 Vehicles</NavButton>
        </NavLinks>
        <MobileMenu />
      </Nav>
    </HeaderContainer>
  )
}

export default Header
