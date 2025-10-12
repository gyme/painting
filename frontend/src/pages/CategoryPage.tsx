import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { paintingsApi } from '../api/paintings'
import PaintingCard from '../components/PaintingCard'
import Breadcrumbs from '../components/Breadcrumbs'
import SEO from '../components/SEO'
import { getCategoryContent } from '../data/categoryContent'

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
`

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const Description = styled.div`
  max-width: 1200px;
  margin: 3rem auto 2rem;
  padding: 3rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  h2 {
    font-size: 1.8rem;
    color: #333;
    margin: 2rem 0 1rem 0;
    font-weight: 700;
    
    &:first-of-type {
      margin-top: 0;
    }
  }
  
  p {
    color: #666;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    font-size: 1.05rem;
    
    strong {
      color: #333;
      font-weight: 600;
    }
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 1.5rem 0;
    
    li {
      padding: 0.75rem 0;
      padding-left: 2rem;
      position: relative;
      color: #555;
      line-height: 1.6;
      font-size: 1.05rem;
      
      &:before {
        content: '✓';
        position: absolute;
        left: 0;
        color: #667eea;
        font-weight: bold;
        font-size: 1.2rem;
      }
    }
  }
  
  @media (max-width: 768px) {
    margin: 2rem 0 1rem;
    padding: 1.5rem;
    border-radius: 15px;
    
    h2 {
      font-size: 1.4rem;
      margin: 1.5rem 0 0.75rem 0;
      
      &:first-of-type {
        margin-top: 0;
      }
    }
    
    p {
      font-size: 1rem;
      margin-bottom: 1rem;
    }
    
    ul {
      margin: 1rem 0;
      
      li {
        padding: 0.5rem 0;
        padding-left: 1.5rem;
        font-size: 0.95rem;
        
        &:before {
          font-size: 1rem;
        }
      }
    }
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

const Loading = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  font-size: 2rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`

const Error = styled.div`
  text-align: center;
  padding: 2rem;
  background: rgba(231, 76, 60, 0.9);
  color: white;
  border-radius: 20px;
  font-size: 1.5rem;
  font-weight: 600;
`

const Empty = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  font-size: 1.5rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`

function CategoryPage() {
  const { category } = useParams<{ category: string }>()

  const { data, isLoading, error } = useQuery(
    ['categoryPaintings', category],
    () => paintingsApi.getPaintingsByCategory(category!, 0, 20), // Reduced from 50 to 20 for faster loading
    {
      staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    }
  )

  if (isLoading) {
    return <Loading>🎨 Loading {category} paintings... ✨</Loading>
  }

  if (error) {
    return <Error>😢 Oops! Something went wrong. Please try again later.</Error>
  }

  const getCategoryEmoji = (cat: string) => {
    switch (cat?.toLowerCase()) {
      case 'animals': return '🐶'
      case 'nature': return '🌳'
      case 'vehicles': return '🚗'
      case 'fantasy': return '🦄'
      default: return '🎨'
    }
  }

  const categoryDescriptions: { [key: string]: string } = {
    animals: 'Discover amazing animal coloring pages! Color cute puppies, wild lions, elephants, giraffes, and more. Perfect for animal-loving kids.',
    nature: 'Explore beautiful nature coloring pages! Color trees, flowers, beaches, rivers, and stunning landscapes. Bring nature to life with colors!',
    vehicles: 'Rev up with exciting vehicle coloring pages! Color cars, trucks, buses, trains, and more. Perfect for kids who love transportation!',
    fantasy: 'Enter a magical world with fantasy coloring pages! Color unicorns, dragons, castles, and magical creatures. Let imagination soar!',
    characters: 'Color your favorite characters! From Pikachu to Disney princesses, bring beloved characters to life with your creativity!',
    mandalas: 'Find peace and focus with beautiful mandala coloring pages! Symmetrical patterns perfect for mindfulness and relaxation.',
    sports: 'Get active with sports coloring pages! Soccer, basketball, swimming, and more athletic activities await.',
    holidays: 'Celebrate year-round with holiday coloring pages! Christmas, Halloween, Easter, and all your favorite special occasions.'
  }
  
  const content = getCategoryContent(category)

  return (
    <>
      <SEO
        title={`${category} Coloring Pages - Free Printable for Kids`}
        description={content?.description || categoryDescriptions[category?.toLowerCase() || ''] || `Browse our collection of ${category} coloring pages for kids. Free printable coloring sheets perfect for children of all ages!`}
        keywords={`${category} coloring pages, ${category} coloring sheets, kids ${category}, printable ${category}, free ${category} coloring, ${category} activities for kids`}
      />
      <Container>
        <Breadcrumbs items={[
          { label: 'Home', path: '/' },
          { label: category || 'Category' }
        ]} />
        <Header>
          <Title>{getCategoryEmoji(category!)} {category} Coloring Pages</Title>
        </Header>

        {data && data.content.length > 0 ? (
          <Grid>
            {data.content.map((painting) => (
              <PaintingCard key={painting.id} painting={painting} />
            ))}
          </Grid>
        ) : (
          <Empty>No paintings found in this category yet. Check back soon! 🎨</Empty>
        )}
        
        {content && (
          <Description>
            <h2>Why Choose Our {category} Coloring Pages?</h2>
            <p>{content.description}</p>
            
            <h2>Educational Benefits</h2>
            <ul>
              {content.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
            
            <p><strong>Age Range:</strong> {content.ageRange}</p>
            <p><strong>Learning Value:</strong> {content.learningValue}</p>
          </Description>
        )}
      </Container>
    </>
  )
}

export default CategoryPage
