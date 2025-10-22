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

function BestForToddlersPage() {
  const { t } = useTranslation()
  
  return (
    <>
      <SEO
        title="Best Coloring Pages for Toddlers (Ages 2-4) - Simple & Fun"
        description="Perfect first coloring pages for toddlers! Simple designs with thick lines ideal for little hands learning to color. Ages 2-4."
        keywords="toddler coloring pages, coloring for 2 year olds, simple coloring pages, easy coloring for toddlers, first coloring pages"
      />
      
      <Container>
        <Breadcrumbs items={[
          { label: 'Home', path: '/' },
          { label: 'Best for Toddlers' }
        ]} />
        
        <Hero>
          <Title>👶 {t('collections.toddlers.pageTitle')}</Title>
          <Subtitle>
            Perfect first coloring pages for ages 2-4 with simple, engaging designs!
          </Subtitle>
        </Hero>

        <Content>
          <p>
            Starting your toddler's coloring journey? These specially selected pages feature large areas, 
            thick lines, and simple shapes perfect for little hands just learning to color. No frustration, 
            just fun!
          </p>

          <h2>What Makes a Good Toddler Coloring Page?</h2>
          <ul>
            <li><strong>Extra Thick Lines (5-10mm):</strong> Easy to see and stay within</li>
            <li><strong>Large Areas:</strong> Room for scribbling without pressure</li>
            <li><strong>Simple Shapes:</strong> Circles, squares, basic objects</li>
            <li><strong>Few Elements:</strong> 1-3 objects per page maximum</li>
            <li><strong>Familiar Objects:</strong> Things they see every day</li>
          </ul>

          <h2>Best Themes for Toddlers</h2>
          <p>
            <strong>1. Simple Animals</strong> - Big cat, dog, fish, butterfly with minimal details<br/>
            <strong>2. Basic Shapes</strong> - Circle sun, square house, triangle tree<br/>
            <strong>3. Everyday Objects</strong> - Ball, apple, flower, car<br/>
            <strong>4. Friendly Faces</strong> - Happy sun, smiling moon, simple people
          </p>

          <h2>Coloring Tips for Toddlers</h2>
          <ul>
            <li>Use jumbo crayons (easier to grip)</li>
            <li>Start with 5-10 minute sessions</li>
            <li>Praise effort, not perfection</li>
            <li>Color together to model the activity</li>
            <li>Don't worry about staying in lines!</li>
            <li>Make it fun, not a lesson</li>
          </ul>

          <h2>Developmental Benefits</h2>
          <p>
            Even simple coloring helps toddlers:
          </p>
          <ul>
            <li>Develop hand-eye coordination</li>
            <li>Build grip strength for writing</li>
            <li>Learn color names</li>
            <li>Practice focus and concentration</li>
            <li>Express creativity</li>
          </ul>

          <CTAButton to="/category/Animals">
            Browse Simple Coloring Pages →
          </CTAButton>

          <p>
            <strong>Remember:</strong> The goal for toddlers is exploration and fun, not perfection. 
            Celebrate every colorful scribble!
          </p>
        </Content>
      </Container>
    </>
  )
}

export default BestForToddlersPage

