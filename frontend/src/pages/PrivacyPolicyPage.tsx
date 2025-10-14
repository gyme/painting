import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'

const Container = styled.div`
  max-width: 900px;
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
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const UpdateDate = styled.p`
  color: #636e72;
  font-size: 1rem;
  margin-bottom: 2rem;
`

const Section = styled.section`
  margin-bottom: 2rem;
`

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #667eea;
  margin-bottom: 1rem;
`

const Text = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #2d3436;
  margin-bottom: 1rem;
`

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  margin-top: 2rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  }
`

function PrivacyPolicyPage() {
  const { t } = useTranslation()
  
  return (
    <>
      <SEO
        title={t('privacy.title')}
        description={t('privacy.intro')}
        keywords="privacy policy, privacy, data protection, security, kids safety"
      />
      <Container>
        <Card>
          <Title>{t('privacy.title')}</Title>
          <UpdateDate>{t('privacy.lastUpdated')}: October 6, 2025</UpdateDate>

          <Section>
            <SectionTitle>1. {t('privacy.intro')}</SectionTitle>
            <Text>
              {t('privacy.intro')}
            </Text>
          </Section>

          <Section>
            <SectionTitle>2. {t('privacy.infoWeCollect')}</SectionTitle>
            <Text>{t('privacy.infoWeCollectText')}</Text>
            <Text><strong>{t('privacy.usageData')}:</strong> {t('privacy.usageDataText')}</Text>
            <Text><strong>{t('privacy.cookies')}:</strong> {t('privacy.cookiesText')}</Text>
          </Section>

          <Section>
            <SectionTitle>3. {t('privacy.howWeUse')}</SectionTitle>
            <Text>{t('privacy.howWeUseList')}</Text>
          </Section>

          <Section>
            <SectionTitle>4. {t('privacy.dataProtection')}</SectionTitle>
            <Text>{t('privacy.dataProtectionText')}</Text>
          </Section>

          <Section>
            <SectionTitle>5. {t('privacy.thirdParty')}</SectionTitle>
            <Text>{t('privacy.thirdPartyText')}</Text>
          </Section>

          <Section>
            <SectionTitle>6. {t('privacy.childrenPrivacy')}</SectionTitle>
            <Text>{t('privacy.childrenPrivacyText')}</Text>
          </Section>

          <Section>
            <SectionTitle>7. {t('privacy.changes')}</SectionTitle>
            <Text>{t('privacy.changesText')}</Text>
          </Section>

          <Section>
            <SectionTitle>8. {t('privacy.contactUs')}</SectionTitle>
            <Text>{t('privacy.contactUsText')}</Text>
          </Section>

          <BackButton to="/">← {t('contact.backToGallery')}</BackButton>
        </Card>
      </Container>
    </>
  )
}

export default PrivacyPolicyPage
