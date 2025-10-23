import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import LocalizedLink from '../components/LocalizedLink'
import SEO from '../components/SEO'

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem 2rem;
`

const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    padding: 2rem;
  }
`

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2d3436;
  margin-bottom: 1rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #636e72;
  text-align: center;
  margin-bottom: 3rem;
`

const ContactSection = styled.div`
  margin-bottom: 2rem;
`

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #667eea;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Text = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #2d3436;
  margin-bottom: 1rem;
`

const ContactInfo = styled.div`
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  padding: 1.5rem;
  border-radius: 15px;
  margin-bottom: 1.5rem;
`

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const Icon = styled.span`
  font-size: 1.5rem;
`

const Link2 = styled.a`
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
`

const BackButton = styled(LocalizedLink)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
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
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
`

const ButtonContainer = styled.div`
  text-align: center;
`

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 1rem;
`

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  color: white;
  font-size: 1.8rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  
  &:hover {
    transform: translateY(-5px) scale(1.15);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  }
  
  &:active {
    transform: translateY(-2px);
  }
`

function ContactUsPage() {
  const { t } = useTranslation()
  
  return (
    <>
      <SEO
        title={t('contact.title')}
        description={t('contact.subtitle')}
        keywords="contact us, contact, support, help, email, feedback"
      />
      <Container>
        <Card>
          <Title>📧 {t('contact.title')}</Title>
          <Subtitle>{t('contact.subtitle')}</Subtitle>

          <ContactSection>
            <SectionTitle>
              <Icon>💌</Icon>
              {t('contact.getInTouch')}
            </SectionTitle>
            <Text>
              {t('contact.getInTouchText')}
            </Text>
          </ContactSection>

          <ContactInfo>
            <InfoItem>
              <Icon>📧</Icon>
              <div>
                <strong>{t('contact.email')}:</strong>{' '}
                <Link2 href="mailto:support@mycolor.fun">
                  support@mycolor.fun
                </Link2>
              </div>
            </InfoItem>
            <InfoItem>
              <Icon>⏰</Icon>
              <div>
                <strong>{t('contact.responseTime')}:</strong> {t('contact.responseTimeText')}
              </div>
            </InfoItem>
          </ContactInfo>

          <ContactSection>
            <SectionTitle>
              <Icon>💡</Icon>
              {t('contact.whatToHearAbout')}
            </SectionTitle>
            <Text>
              • {t('contact.suggestions')}<br />
              • {t('contact.technicalIssues')}<br />
              • {t('contact.feedback')}<br />
              • {t('contact.partnerships')}<br />
              • {t('contact.generalQuestions')}<br />
            </Text>
          </ContactSection>

          <ContactSection>
            <SectionTitle>
              <Icon>🎨</Icon>
              {t('contact.requestPage')}
            </SectionTitle>
            <Text>
              {t('contact.requestPageText')}
            </Text>
          </ContactSection>

          <ContactSection>
            <SectionTitle>
              <Icon>⭐</Icon>
              {t('contact.followUs')}
            </SectionTitle>
            <Text>
              {t('contact.followUsText')}
            </Text>
            <SocialLinks>
              <SocialLink 
                href="https://www.facebook.com/profile.php?id=61582773927213" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </SocialLink>
            </SocialLinks>
          </ContactSection>

          <ButtonContainer>
            <BackButton to="/">← {t('contact.backToGallery')}</BackButton>
          </ButtonContainer>
        </Card>
      </Container>
    </>
  )
}

export default ContactUsPage
