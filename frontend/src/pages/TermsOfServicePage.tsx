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
  justify-content: center;
  color: #667eea;
  text-decoration: none;
  font-size: 1.5rem;
  transition: all 0.2s ease;
  margin-top: 2rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;

  &:hover {
    color: #764ba2;
    background: rgba(102, 126, 234, 0.1);
    transform: translateX(-3px);
  }
`

function TermsOfServicePage() {
  const { t } = useTranslation()
  
  return (
    <>
      <SEO
        title={t('terms.title')}
        description={t('terms.intro')}
        keywords="terms of service, terms and conditions, legal, coloring pages"
      />
      <Container>
        <Card>
          <Title>{t('terms.title')}</Title>
          <UpdateDate>{t('terms.lastUpdated')}: October 6, 2025</UpdateDate>

          <Section>
            <SectionTitle>1. {t('terms.intro')}</SectionTitle>
            <Text>{t('terms.intro')}</Text>
          </Section>

          <Section>
            <SectionTitle>2. {t('terms.useOfService')}</SectionTitle>
            <Text>{t('terms.useOfServiceText')}</Text>
          </Section>

          <Section>
            <SectionTitle>3. {t('terms.allowed')}</SectionTitle>
            <Text>{t('terms.allowedList')}</Text>
          </Section>

          <Section>
            <SectionTitle>4. {t('terms.notAllowed')}</SectionTitle>
            <Text>{t('terms.notAllowedList')}</Text>
          </Section>

          <Section>
            <SectionTitle>5. {t('terms.intellectual')}</SectionTitle>
            <Text>{t('terms.intellectualText')}</Text>
          </Section>

          <Section>
            <SectionTitle>6. {t('terms.disclaimer')}</SectionTitle>
            <Text>{t('terms.disclaimerText')}</Text>
          </Section>

          <Section>
            <SectionTitle>7. {t('terms.changes')}</SectionTitle>
            <Text>{t('terms.changesText')}</Text>
          </Section>

          <Section>
            <SectionTitle>8. {t('terms.contactUs')}</SectionTitle>
            <Text>{t('terms.contactUsText')}</Text>
          </Section>

          <BackButton to="/">← {t('contact.backToGallery')}</BackButton>
        </Card>
      </Container>
    </>
  )
}

export default TermsOfServicePage
