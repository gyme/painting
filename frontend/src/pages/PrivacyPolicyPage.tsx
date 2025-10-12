import styled from 'styled-components'
import { Link } from 'react-router-dom'
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

const List = styled.ul`
  margin-left: 2rem;
  margin-bottom: 1rem;
`

const ListItem = styled.li`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #2d3436;
  margin-bottom: 0.5rem;
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
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Privacy Policy for mycolor.fun - Learn how we protect your information"
        keywords="privacy policy, privacy, data protection, security, kids safety"
      />
      <Container>
        <Card>
          <Title>Privacy Policy</Title>
          <UpdateDate>Last Updated: October 6, 2025</UpdateDate>

          <Section>
            <SectionTitle>1. Introduction</SectionTitle>
            <Text>
              Welcome to mycolor.fun ("we," "our," or "us"). We are committed to protecting your privacy and the privacy of children who use our website. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
            </Text>
          </Section>

          <Section>
            <SectionTitle>2. Information We Collect</SectionTitle>
            <Text>
              mycolor.fun is designed to be safe for children. We do not knowingly collect personal information from children under 13 years of age.
            </Text>
            <Text>
              We may collect the following non-personal information:
            </Text>
            <List>
              <ListItem>Browser type and version</ListItem>
              <ListItem>Operating system</ListItem>
              <ListItem>Pages visited and time spent on pages</ListItem>
              <ListItem>General location information (country/city level only)</ListItem>
              <ListItem>Device type (mobile, tablet, desktop)</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>3. How We Use Information</SectionTitle>
            <Text>
              We use the collected information to:
            </Text>
            <List>
              <ListItem>Improve our website and user experience</ListItem>
              <ListItem>Understand which coloring pages are most popular</ListItem>
              <ListItem>Analyze website traffic and usage patterns</ListItem>
              <ListItem>Fix technical issues</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>4. Cookies</SectionTitle>
            <Text>
              We may use cookies to enhance your experience on our website. Cookies are small text files stored on your device. You can choose to disable cookies through your browser settings, but this may affect some features of the website.
            </Text>
          </Section>

          <Section>
            <SectionTitle>5. Children's Privacy</SectionTitle>
            <Text>
              Our website is designed for children and families. We take children's privacy seriously and comply with the Children's Online Privacy Protection Act (COPPA). We do not:
            </Text>
            <List>
              <ListItem>Collect personal information from children</ListItem>
              <ListItem>Require registration or accounts</ListItem>
              <ListItem>Display targeted advertising to children</ListItem>
              <ListItem>Share children's information with third parties</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>6. Third-Party Services</SectionTitle>
            <Text>
              We do not sell, trade, or transfer your information to third parties. We may use trusted third-party services for:
            </Text>
            <List>
              <ListItem>Website hosting</ListItem>
              <ListItem>Analytics (to improve our service)</ListItem>
            </List>
            <Text>
              These services are contractually obligated to keep your information confidential and use it only for the purposes we specify.
            </Text>
          </Section>

          <Section>
            <SectionTitle>7. Data Security</SectionTitle>
            <Text>
              We implement appropriate security measures to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </Text>
          </Section>

          <Section>
            <SectionTitle>8. User Content</SectionTitle>
            <Text>
              When you color and save images on our website, these are stored locally on your device. We do not collect or store the colored images you create.
            </Text>
          </Section>

          <Section>
            <SectionTitle>9. External Links</SectionTitle>
            <Text>
              Our website may contain links to external sites. We are not responsible for the privacy practices of these sites. We encourage you to read the privacy policies of any external websites you visit.
            </Text>
          </Section>

          <Section>
            <SectionTitle>10. Your Rights</SectionTitle>
            <Text>
              You have the right to:
            </Text>
            <List>
              <ListItem>Access any information we have collected</ListItem>
              <ListItem>Request deletion of your information</ListItem>
              <ListItem>Opt-out of analytics tracking</ListItem>
              <ListItem>Ask questions about our privacy practices</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>11. Changes to This Policy</SectionTitle>
            <Text>
              We may update this Privacy Policy from time to time. We will notify users of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </Text>
          </Section>

          <Section>
            <SectionTitle>12. Contact Us</SectionTitle>
            <Text>
              If you have any questions about this Privacy Policy or our privacy practices, please contact us through our Contact Us page.
            </Text>
          </Section>

          <BackButton to="/">← Back to Gallery</BackButton>
        </Card>
      </Container>
    </>
  )
}

export default PrivacyPolicyPage
