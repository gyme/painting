import { Link } from 'react-router-dom'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 2rem;
  margin-top: 4rem;
  border-top: 2px solid rgba(102, 126, 234, 0.2);
`

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
  text-align: center;
`

const Links = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (max-width: 768px) {
    gap: 1rem;
    flex-direction: column;
    align-items: center;
  }
`

const FooterLink = styled(Link)`
  color: #2d3436;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #667eea;
  }
`

const Copyright = styled.div`
  text-align: center;
  color: #636e72;
  font-size: 0.9rem;
`

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <Logo>🎨 mycolor.fun</Logo>
        
        <Links>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/contact">Contact Us</FooterLink>
          <FooterLink to="/terms">Terms of Service</FooterLink>
          <FooterLink to="/privacy">Privacy Policy</FooterLink>
        </Links>
        
        <Copyright>
          © {new Date().getFullYear()} mycolor.fun. All rights reserved.
          <br />
          Free coloring pages for kids - Print, Color, and Have Fun! 🌈
        </Copyright>
      </FooterContent>
    </FooterContainer>
  )
}

export default Footer
