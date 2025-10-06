import styled from 'styled-components'
import { Link } from 'react-router-dom'
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
  display: inline-block;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  }
`

const ButtonContainer = styled.div`
  text-align: center;
`

function ContactUsPage() {
  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with MyColoringApp.com - We'd love to hear from you!"
        keywords="contact us, contact, support, help, email, feedback"
      />
      <Container>
        <Card>
          <Title>📧 Contact Us</Title>
          <Subtitle>We'd love to hear from you!</Subtitle>

          <ContactSection>
            <SectionTitle>
              <Icon>💌</Icon>
              Get in Touch
            </SectionTitle>
            <Text>
              Have a question, suggestion, or just want to say hi? We're here to help! Feel free to reach out to us using any of the methods below.
            </Text>
          </ContactSection>

          <ContactInfo>
            <InfoItem>
              <Icon>📧</Icon>
              <div>
                <strong>Email:</strong>{' '}
                <Link2 href="mailto:support@mycoloringapp.com">
                  support@mycoloringapp.com
                </Link2>
              </div>
            </InfoItem>
            <InfoItem>
              <Icon>⏰</Icon>
              <div>
                <strong>Response Time:</strong> We typically respond within 24-48 hours
              </div>
            </InfoItem>
          </ContactInfo>

          <ContactSection>
            <SectionTitle>
              <Icon>💡</Icon>
              What We'd Love to Hear About
            </SectionTitle>
            <Text>
              • Suggestions for new coloring pages<br />
              • Technical issues or bugs<br />
              • Feedback on existing pages<br />
              • Partnership or collaboration inquiries<br />
              • General questions or comments<br />
            </Text>
          </ContactSection>

          <ContactSection>
            <SectionTitle>
              <Icon>🎨</Icon>
              Request a Coloring Page
            </SectionTitle>
            <Text>
              Do you have a specific coloring page in mind that you'd like to see on our website? Let us know! We're always adding new designs and would love to hear your ideas.
            </Text>
          </ContactSection>

          <ContactSection>
            <SectionTitle>
              <Icon>⭐</Icon>
              Follow Us
            </SectionTitle>
            <Text>
              Stay updated with new coloring pages and announcements! (Add your social media links here when ready)
            </Text>
          </ContactSection>

          <ButtonContainer>
            <BackButton to="/">← Back to Gallery</BackButton>
          </ButtonContainer>
        </Card>
      </Container>
    </>
  )
}

export default ContactUsPage
