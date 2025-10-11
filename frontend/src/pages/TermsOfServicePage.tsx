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
  return (
    <>
      <SEO
        title="Terms of Service"
        description="Terms of Service for MyColoringApp.com - Free coloring pages for kids"
        keywords="terms of service, terms and conditions, legal, coloring pages"
      />
      <Container>
        <Card>
          <Title>Terms of Service</Title>
          <UpdateDate>Last Updated: October 6, 2025</UpdateDate>

          <Section>
            <SectionTitle>1. Acceptance of Terms</SectionTitle>
            <Text>
              By accessing and using MyColoringApp.com ("the Website"), you accept and agree to be bound by the terms and provision of this agreement.
            </Text>
          </Section>

          <Section>
            <SectionTitle>2. Use License</SectionTitle>
            <Text>
              Permission is granted to temporarily download and print the coloring pages on MyColoringApp.com for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </Text>
            <List>
              <ListItem>Modify or copy the materials</ListItem>
              <ListItem>Use the materials for any commercial purpose</ListItem>
              <ListItem>Attempt to decompile or reverse engineer any software contained on the Website</ListItem>
              <ListItem>Remove any copyright or other proprietary notations from the materials</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>3. Free Content</SectionTitle>
            <Text>
              All coloring pages provided on this website are free for personal use. You may:
            </Text>
            <List>
              <ListItem>Print coloring pages for yourself, your family, or classroom use</ListItem>
              <ListItem>Color and share your creations on social media</ListItem>
              <ListItem>Use coloring pages for educational purposes</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>4. Prohibited Uses</SectionTitle>
            <Text>
              You may not use the Website:
            </Text>
            <List>
              <ListItem>For any unlawful purpose</ListItem>
              <ListItem>To solicit others to perform or participate in any unlawful acts</ListItem>
              <ListItem>To violate any international, federal, provincial or state regulations, rules, laws, or local ordinances</ListItem>
              <ListItem>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>5. Intellectual Property</SectionTitle>
            <Text>
              All content on this website, including but not limited to images, text, graphics, logos, and software, is the property of MyColoringApp.com and is protected by copyright laws.
            </Text>
          </Section>

          <Section>
            <SectionTitle>6. Disclaimer</SectionTitle>
            <Text>
              The materials on MyColoringApp.com are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </Text>
          </Section>

          <Section>
            <SectionTitle>7. Limitations</SectionTitle>
            <Text>
              In no event shall MyColoringApp.com or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on MyColoringApp.com.
            </Text>
          </Section>

          <Section>
            <SectionTitle>8. Changes to Terms</SectionTitle>
            <Text>
              We reserve the right to revise these terms of service at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
            </Text>
          </Section>

          <Section>
            <SectionTitle>9. Contact Information</SectionTitle>
            <Text>
              If you have any questions about these Terms of Service, please contact us through our Contact Us page.
            </Text>
          </Section>

          <BackButton to="/">←</BackButton>
        </Card>
      </Container>
    </>
  )
}

export default TermsOfServicePage
