import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

const Card = styled.div`
  background: white;
  border-radius: 30px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    padding: 2rem;
    border-radius: 20px;
  }
`

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #2d3436;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const Section = styled.section`
  margin-bottom: 2.5rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #2d3436;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const Paragraph = styled.p`
  font-size: 1.1rem;
  color: #636e72;
  line-height: 1.8;
  margin-bottom: 1rem;
`

const List = styled.ul`
  list-style: disc;
  padding-left: 2rem;
  margin-bottom: 1rem;
`

const ListItem = styled.li`
  font-size: 1.1rem;
  color: #636e72;
  line-height: 1.8;
  margin-bottom: 0.5rem;
`

const ContactBox = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  border-radius: 20px;
  color: white;
  margin-top: 2rem;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 0.5rem;
  }

  a {
    color: white;
    text-decoration: underline;
    font-weight: 600;

    &:hover {
      opacity: 0.9;
    }
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
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
`

const Strong = styled.strong`
  color: #2d3436;
  font-weight: 700;
`

function CopyrightPage() {
  const { t } = useTranslation()
  
  return (
    <>
      <SEO
        title="Copyright Policy & DMCA Notice"
        description="Copyright policy, DMCA compliance, and intellectual property information for mycolor.fun. Learn about our content licensing and how to report copyright infringement."
        keywords="copyright policy, DMCA, intellectual property, content licensing, copyright infringement"
      />
      <Container>
        <Card>
          <Title>📋 {t('copyright.title')}</Title>
          <Paragraph style={{ fontSize: '1.2rem', color: '#2d3436', marginBottom: '2rem' }}>
            Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </Paragraph>

          <Section>
            <SectionTitle>Copyright Ownership</SectionTitle>
            <Paragraph>
              All coloring pages and artwork available on <Strong>mycolor.fun</Strong> are either:
            </Paragraph>
            <List>
              <ListItem><Strong>Original works</Strong> created by or for mycolor.fun</ListItem>
              <ListItem><Strong>Licensed content</Strong> used with proper authorization</ListItem>
              <ListItem><Strong>Public domain</Strong> materials where applicable</ListItem>
            </List>
            <Paragraph>
              All original content on this website is protected by copyright law. Unauthorized reproduction, 
              distribution, or commercial use is prohibited without express written permission.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Permitted Use</SectionTitle>
            <Paragraph>
              Users are granted a <Strong>limited, non-commercial, personal use license</Strong> to:
            </Paragraph>
            <List>
              <ListItem>Download and print coloring pages for personal, non-commercial use</ListItem>
              <ListItem>Use in educational settings (schools, libraries, homeschooling)</ListItem>
              <ListItem>Share links to our pages on social media</ListItem>
              <ListItem>Print for family and friends in private settings</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>Prohibited Use</SectionTitle>
            <Paragraph>
              The following uses are <Strong>strictly prohibited</Strong> without written authorization:
            </Paragraph>
            <List>
              <ListItem>Commercial redistribution or sale of coloring pages</ListItem>
              <ListItem>Claiming ownership of our artwork</ListItem>
              <ListItem>Modifying and redistributing as your own</ListItem>
              <ListItem>Mass distribution or republishing on other websites</ListItem>
              <ListItem>Using in commercial products or publications</ListItem>
              <ListItem>Creating derivative works for commercial purposes</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>DMCA Compliance</SectionTitle>
            <Paragraph>
              <Strong>mycolor.fun</Strong> respects the intellectual property rights of others and expects 
              our users to do the same. We comply with the Digital Millennium Copyright Act (DMCA) and will 
              respond promptly to valid notices of copyright infringement.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Reporting Copyright Infringement</SectionTitle>
            <Paragraph>
              If you believe that your copyrighted work has been used on our website in a way that constitutes 
              copyright infringement, please provide our Copyright Agent with the following information:
            </Paragraph>
            <List>
              <ListItem>A physical or electronic signature of the copyright owner or authorized representative</ListItem>
              <ListItem>Identification of the copyrighted work claimed to have been infringed</ListItem>
              <ListItem>Identification of the material on our site that is claimed to be infringing (with URL)</ListItem>
              <ListItem>Your contact information (address, phone number, email address)</ListItem>
              <ListItem>A statement of good faith belief that the use is not authorized</ListItem>
              <ListItem>A statement that the information provided is accurate and you are authorized to act</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>Character & Licensed Content Policy</SectionTitle>
            <Paragraph>
              We are committed to respecting intellectual property rights, including trademarked characters 
              and licensed properties. We maintain a rigorous review process to ensure:
            </Paragraph>
            <List>
              <ListItem>All character-based content is either properly licensed or original</ListItem>
              <ListItem>No unauthorized use of copyrighted or trademarked characters</ListItem>
              <ListItem>Proper attribution for licensed content</ListItem>
              <ListItem>Immediate removal of any content found to be infringing</ListItem>
            </List>
            <Paragraph>
              Popular character coloring pages are only hosted if they fall under one of these categories:
            </Paragraph>
            <List>
              <ListItem><Strong>Licensed:</Strong> We have obtained proper licensing agreements</ListItem>
              <ListItem><Strong>Original:</Strong> Our own creative interpretations and original designs</ListItem>
              <ListItem><Strong>Public Domain:</Strong> Characters whose copyright has expired</ListItem>
            </List>
          </Section>

          <ContactBox>
            <h3>📧 DMCA Copyright Agent Contact</h3>
            <p><Strong>Email:</Strong> <a href="mailto:copyright@mycolor.fun">copyright@mycolor.fun</a></p>
            <p><Strong>Subject Line:</Strong> "DMCA Takedown Notice - [Description]"</p>
            <p><Strong>Response Time:</Strong> We review all DMCA notices within 24-48 hours</p>
            <Paragraph style={{ marginTop: '1rem', fontSize: '1rem' }}>
              Please note that false claims may result in legal liability. We recommend consulting 
              with legal counsel before submitting a DMCA notice.
            </Paragraph>
          </ContactBox>

          <Section style={{ marginTop: '2rem' }}>
            <SectionTitle>Counter-Notification</SectionTitle>
            <Paragraph>
              If you believe that content you posted was wrongly removed due to a DMCA notice, you may 
              submit a counter-notification. Please contact our Copyright Agent at the email address above 
              with "DMCA Counter-Notification" in the subject line.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Content Removal</SectionTitle>
            <Paragraph>
              Upon receipt of a valid DMCA notice, we will:
            </Paragraph>
            <List>
              <ListItem>Remove or disable access to the allegedly infringing material</ListItem>
              <ListItem>Notify the content provider of the removal</ListItem>
              <ListItem>Document the complaint for our records</ListItem>
              <ListItem>Take appropriate action for repeat infringers</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>Questions?</SectionTitle>
            <Paragraph>
              If you have questions about our copyright policy or licensing inquiries, please contact 
              us at <a href="mailto:legal@mycolor.fun" style={{ color: '#667eea', textDecoration: 'underline' }}>legal@mycolor.fun</a>.
            </Paragraph>
            <Paragraph>
              For general inquiries, visit our <Link to="/contact" style={{ color: '#667eea', textDecoration: 'underline' }}>Contact Page</Link>.
            </Paragraph>
          </Section>

          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <BackButton to="/">
              ← Back to Home
            </BackButton>
          </div>
        </Card>
      </Container>
    </>
  )
}

export default CopyrightPage

