import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

const Hero = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
`

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: white;
  max-width: 700px;
  margin: 0 auto;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`

const Content = styled.div`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  h2 {
    font-size: 2rem;
    color: #333;
    margin: 2rem 0 1rem 0;
  }
  
  p {
    color: #666;
    line-height: 1.8;
    margin-bottom: 1rem;
  }
  
  ul {
    margin: 1rem 0;
    padding-left: 2rem;
    
    li {
      color: #555;
      line-height: 1.8;
      margin-bottom: 0.75rem;
    }
  }
`

const CTAButton = styled(Link)`
  display: inline-block;
  margin: 2rem 0;
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
`

function EasyColoringPage() {
  const { t } = useTranslation()
  
  return (
    <>
      <SEO
        title="Easy Coloring Pages for Beginners - Simple Designs for Kids"
        description="Perfect easy coloring pages for beginners! Simple designs with large areas ideal for building confidence. Great for ages 3-6 learning to color."
        keywords="easy coloring pages, beginner coloring, simple coloring pages, coloring for beginners, easy designs, confidence building coloring"
      />
      
      <Container>
        <Breadcrumbs items={[
          { label: 'Home', path: '/' },
          { label: 'Easy Coloring Pages' }
        ]} />
        
        <Hero>
          <Title>✨ {t('collections.easy.pageTitle')}</Title>
          <Subtitle>
            Simple, confidence-building designs perfect for kids learning to color!
          </Subtitle>
        </Hero>

        <Content>
          <p>
            Starting out with coloring? These easy, beginner-friendly pages feature simple designs that 
            build confidence and develop skills. No frustration—just fun, successful coloring experiences!
          </p>

          <h2>What Makes These Pages "Easy"?</h2>
          <ul>
            <li><strong>Large Coloring Areas:</strong> Plenty of room, less pressure</li>
            <li><strong>Thick, Clear Lines:</strong> Easy to see boundaries</li>
            <li><strong>Simple Shapes:</strong> Basic circles, squares, and curves</li>
            <li><strong>Few Details:</strong> Not overwhelming for beginners</li>
            <li><strong>Quick to Complete:</strong> Sense of accomplishment in 10-15 minutes</li>
          </ul>

          <h2>Perfect For:</h2>
          <p>
            <strong>• Ages 3-6:</strong> Building foundational coloring skills<br/>
            <strong>• First-Time Colorers:</strong> Any age just starting out<br/>
            <strong>• Fine Motor Development:</strong> Practicing grip and control<br/>
            <strong>• Confidence Building:</strong> Guaranteed success<br/>
            <strong>• Quick Activities:</strong> Short attention spans welcome
          </p>

          <h2>Progression Path</h2>
          <p>
            <strong>Step 1:</strong> Start with single-object pages (one big flower, one animal)<br/>
            <strong>Step 2:</strong> Move to 2-3 object pages (simple scene)<br/>
            <strong>Step 3:</strong> Try pages with more sections but still large areas<br/>
            <strong>Step 4:</strong> Graduate to medium complexity when ready
          </p>

          <h2>Tips for Success</h2>
          <ul>
            <li>Use quality crayons that color smoothly</li>
            <li>Start with favorite colors for motivation</li>
            <li>Praise effort, not perfection</li>
            <li>Go outside the lines? That's okay!</li>
            <li>Display finished work proudly</li>
            <li>Practice daily for skill building</li>
          </ul>

          <h2>Building Skills Through Easy Pages</h2>
          <p>
            Even simple coloring builds important skills:
          </p>
          <ul>
            <li>Hand-eye coordination improves with each page</li>
            <li>Grip strength develops naturally</li>
            <li>Focus and attention span extend gradually</li>
            <li>Color recognition and naming practice</li>
            <li>Confidence grows with each completed page</li>
          </ul>

          <CTAButton to="/category/Animals">
            Browse Easy Coloring Pages →
          </CTAButton>

          <p>
            <strong>Remember:</strong> Everyone starts somewhere! These easy pages are designed to make 
            coloring fun and frustration-free while building the skills needed for more complex designs.
          </p>

          <p>
            <strong>Parent tip:</strong> Color alongside your child. They learn by watching you, and it's 
            a wonderful bonding activity!
          </p>
        </Content>
      </Container>
    </>
  )
}

export default EasyColoringPage

