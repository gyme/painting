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

function MostPopularPage() {
  const { t } = useTranslation()
  
  return (
    <>
      <SEO
        title="Most Popular Coloring Pages - Top Downloaded & Rated Pages"
        description="Discover the most popular coloring pages loved by thousands of kids! Our highest-rated, most downloaded coloring sheets across all categories."
        keywords="most popular coloring pages, best coloring pages, top rated coloring, favorite coloring pages, trending coloring sheets"
      />
      
      <Container>
        <Breadcrumbs items={[
          { label: 'Home', path: '/' },
          { label: 'Most Popular' }
        ]} />
        
        <Hero>
          <Title>⭐ {t('collections.popular.pageTitle')}</Title>
          <Subtitle>
            The highest-rated, most downloaded coloring pages loved by kids worldwide!
          </Subtitle>
        </Hero>

        <Content>
          <p>
            Based on downloads, ratings, and user feedback, these are the most popular coloring pages 
            on our site! Loved by thousands of families worldwide, these pages represent the very best 
            across all categories.
          </p>

          <h2>Why These Pages Stand Out</h2>
          <ul>
            <li><strong>Universal Appeal:</strong> Loved across all age groups</li>
            <li><strong>Perfect Difficulty:</strong> Challenging but achievable</li>
            <li><strong>Beautiful Designs:</strong> Result in frame-worthy art</li>
            <li><strong>Engaging Subjects:</strong> Topics kids are passionate about</li>
            <li><strong>Reusability:</strong> Kids want to color them multiple times!</li>
          </ul>

          <h2>Most Popular by Category</h2>
          <p>
            <strong>Animals:</strong> Puppy Dog, Cute Kitten, Majestic Lion - These three dominate downloads!<br/>
            <strong>Vehicles:</strong> Race Car, Fire Truck, Monster Truck - Speed and heroes win<br/>
            <strong>Fantasy:</strong> Unicorn, Dragon, Fairy - Magical creatures are timeless<br/>
            <strong>Characters:</strong> Popular TV and movie characters - Constantly evolving favorites<br/>
            <strong>Nature:</strong> Butterfly, Flowers, Rainbow - Beauty of nature appeals to all
          </p>

          <h2>Trending Now</h2>
          <p>
            Current trending themes include mandalas (growing mindfulness interest), seasonal pages 
            (always popular around holidays), and character pages (following latest movies/shows).
          </p>

          <h2>What Makes a Coloring Page Popular?</h2>
          <ul>
            <li>Clear, clean lines that are easy to see</li>
            <li>Just the right amount of detail</li>
            <li>Familiar subjects kids recognize and love</li>
            <li>Space for creativity in color choices</li>
            <li>Print quality optimized for home printers</li>
          </ul>

          <CTAButton to="/">
            Browse All Categories →
          </CTAButton>

          <p>
            <strong>Join thousands of happy families!</strong> Try our most popular pages and see why kids 
            love them so much.
          </p>
        </Content>
      </Container>
    </>
  )
}

export default MostPopularPage

