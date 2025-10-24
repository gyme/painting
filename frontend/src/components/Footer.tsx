import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import LocalizedLink from './LocalizedLink'

const FooterContainer = styled.footer<{ $isColoringPage: boolean }>`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 2rem;
  margin-top: 4rem;
  border-top: 2px solid rgba(102, 126, 234, 0.2);
  min-height: 350px; /* Reserve space to prevent layout shift */
  
  @media (max-width: 768px) {
    padding: ${props => props.$isColoringPage 
      ? '1.5rem 1rem calc(1.5rem + 200px) 1rem' /* Extra padding for fixed coloring toolbars */
      : '1.5rem 1rem'
    };
    margin-top: 1rem;
    min-height: ${props => props.$isColoringPage ? '500px' : '300px'};
  }
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
  display: flex;
  justify-content: center;
  align-items: center;
`

const LogoImage = styled.img.attrs({
  width: '100',
  height: '100',
  loading: 'lazy', // Footer logo can load lazily
})`
  height: 100px;
  width: 100px;
  display: block;
  border-radius: 50%;
  background: white;
  padding: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 3px solid rgba(102, 126, 234, 0.3);
  
  @media (max-width: 768px) {
    height: 80px;
    width: 80px;
    padding: 3px;
  }
`

const Links = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    gap: 1rem;
    flex-direction: column;
    align-items: center;
  }
`

const FooterLink = styled(LocalizedLink)`
  color: #2d3436;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #667eea;
  }
`

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(102, 126, 234, 0.3);
  
  svg {
    width: 16px;
    height: 16px;
  }
  
  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 3px 10px rgba(102, 126, 234, 0.5);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`

const Copyright = styled.div`
  text-align: center;
  color: #636e72;
  font-size: 0.9rem;
`

function Footer() {
  const { t } = useTranslation()
  const location = useLocation()
  
  // Check if we're on a coloring/painting page (needs extra padding for mobile toolbars)
  const isColoringPage = location.pathname.includes('/painting/')
  
  return (
    <FooterContainer $isColoringPage={isColoringPage}>
      <FooterContent>
        <Logo>
          <LogoImage src="/logo-100.webp" alt="MyColorFun - Free Online Coloring Pages" />
        </Logo>
        
        <Links>
          <FooterLink to="/">{t('footer.home')}</FooterLink>
          <FooterLink to="/sitemap">Sitemap</FooterLink>
          <FooterLink to="/contact">{t('footer.contact')}</FooterLink>
          <FooterLink to="/terms">{t('footer.terms')}</FooterLink>
          <FooterLink to="/privacy">{t('footer.privacy')}</FooterLink>
          <SocialLink 
            href="https://www.facebook.com/profile.php?id=61582773927213" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Follow us on Facebook"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </SocialLink>
        </Links>
        
        <Copyright>
          {t('footer.copyright', { year: new Date().getFullYear() })}
          <br />
          {t('footer.tagline')} 🌈
        </Copyright>
      </FooterContent>
    </FooterContainer>
  )
}

export default Footer
