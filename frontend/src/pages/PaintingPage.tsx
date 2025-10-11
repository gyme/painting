import { useParams, Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { useRef } from 'react'
import { paintingsApi } from '../api/paintings'
import InteractiveColoring from '../components/InteractiveColoring'
import Breadcrumbs from '../components/Breadcrumbs'
import PaintingCard from '../components/PaintingCard'
import SEO from '../components/SEO'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 0;
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 75px); /* Account for header */
    background: white;
  }
`

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.9);
  color: #667eea;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    display: none;
  }

  @media print {
    display: none;
  }
`

const Card = styled.div`
  background: white;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    border-radius: 0;
    box-shadow: none;
  }

  @media print {
    box-shadow: none;
    border-radius: 0;
  }
`

const Content = styled.div<{ style?: any }>`
  padding: 3rem;

  @media (max-width: 768px) {
    padding: 0;
  }

  @media print {
    display: none;
  }
`

const MobileHidden = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`

const TitleSection = styled.div`
  flex: 1;
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

const Meta = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`

const Badge = styled.span<{ color?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: ${props => props.color || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  color: white;
  border-radius: 20px;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`

const Description = styled.p`
  font-size: 1.3rem;
  color: #636e72;
  line-height: 1.8;
  margin-bottom: 2rem;
`

const Section = styled.div`
  margin-bottom: 2rem;
`

const SectionTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  color: #2d3436;
  margin-bottom: 1rem;
`

const PrintButton = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1.2rem;
  font-weight: 700;
  font-family: 'Fredoka', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(46, 204, 113, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(46, 204, 113, 0.6);
  }

  &:active {
    transform: translateY(0);
  }
`

const Loading = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  font-size: 2rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`

const NotFoundContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`

const NotFoundCard = styled.div`
  background: white;
  border-radius: 30px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  margin-bottom: 3rem;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 2rem;
    border-radius: 20px;
  }
`

const NotFoundTitle = styled.h1`
  font-size: 3rem;
  color: #e74c3c;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const NotFoundMessage = styled.p`
  font-size: 1.3rem;
  color: #636e72;
  margin-bottom: 2rem;
  line-height: 1.6;
`

const NotFoundEmoji = styled.div`
  font-size: 5rem;
  margin-bottom: 1rem;
  animation: shake 2s ease-in-out infinite;
  
  @keyframes shake {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-10deg); }
    75% { transform: rotate(10deg); }
  }
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`

const SuggestionsSection = styled.div`
  background: white;
  border-radius: 30px;
  padding: 3rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    padding: 2rem;
    border-radius: 20px;
  }
`

const SuggestionsTitle = styled.h2`
  font-size: 2rem;
  color: #2d3436;
  margin-bottom: 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const PaintingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
`

function PaintingPage() {
  const { urlKey } = useParams<{ urlKey: string }>()
  const printFunctionRef = useRef<(() => void) | null>(null)

  const { data: painting, isLoading, error } = useQuery(
    ['painting', urlKey],
    () => paintingsApi.getPaintingByUrlKey(urlKey!)
  )

  // Fetch suggestions for 404 page
  const { data: suggestions } = useQuery(
    'paintings-suggestions',
    () => paintingsApi.getAllPaintings(),
    { enabled: !isLoading && (!!error || !painting) }
  )
  
  // Store the print function from InteractiveColoring
  const handlePrintReady = (printFn: () => void) => {
    printFunctionRef.current = printFn
  }

  if (isLoading) {
    return <Loading>🎨 Loading your painting... ✨</Loading>
  }

  if (error || !painting) {
    const randomPaintings = suggestions?.content?.slice(0, 6) || []
    
    return (
      <NotFoundContainer>
        <NotFoundCard>
          <NotFoundEmoji>🎨❌</NotFoundEmoji>
          <NotFoundTitle>Painting Not Found</NotFoundTitle>
          <NotFoundMessage>
            Oops! We couldn't find a coloring page called "{urlKey}".<br />
            Don't worry, we have plenty of other amazing pictures to color!
          </NotFoundMessage>
          <BackButton to="/">🏠 Back to Gallery</BackButton>
        </NotFoundCard>
        
        {randomPaintings.length > 0 && (
          <SuggestionsSection>
            <SuggestionsTitle>✨ Try These Instead!</SuggestionsTitle>
            <PaintingsGrid>
              {randomPaintings.map((suggestion: any) => (
                <PaintingCard key={suggestion.id} painting={suggestion} />
              ))}
            </PaintingsGrid>
            <div style={{ textAlign: 'center' }}>
              <BackButton to="/">View All Coloring Pages →</BackButton>
            </div>
          </SuggestionsSection>
        )}
      </NotFoundContainer>
    )
  }

  const handlePrint = () => {
    // Use the print function from InteractiveColoring component
    if (printFunctionRef.current) {
      printFunctionRef.current()
    } else {
      // Fallback to window.print if the function isn't ready yet
      window.print()
    }
  }

  const getDifficultyText = (difficulty: number) => {
    if (difficulty === 1) return 'Easy'
    if (difficulty === 2) return 'Medium'
    return 'Hard'
  }

  // Add structured data for the painting
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": painting.title,
    "description": painting.description,
    "image": painting.imageUrl,
    "category": painting.category,
    "keywords": painting.tags,
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": "https://schema.org/ViewAction",
      "userInteractionCount": painting.viewCount
    },
    "isAccessibleForFree": true,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }

  return (
    <>
      <SEO
        title={`${painting.title} - Coloring Page`}
        description={`${painting.description} Free printable ${painting.title.toLowerCase()} coloring page for kids. Difficulty: ${getDifficultyText(painting.difficulty)}. Category: ${painting.category}.`}
        keywords={`${painting.title}, ${painting.tags}, ${painting.category}, coloring page, printable, kids activity`}
        image={painting.imageUrl}
        type="article"
      />
      
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      <Container>
        <Breadcrumbs items={[
          { label: 'Home', path: '/' },
          { label: painting.category, path: `/category/${painting.category}` },
          { label: painting.title }
        ]} />
        <BackButton to="/">← Back to Gallery</BackButton>
        <Card>
        <Content>
          <InteractiveColoring 
            title={painting.title}
            imageUrl={painting.imageUrl}
            urlKey={painting.urlKey}
            onPrintReady={handlePrintReady}
          />
          
          <MobileHidden>
          <div style={{ marginTop: '3rem' }}>
          <Header>
            <TitleSection>
              <Title>{painting.title}</Title>
              <Meta>
                <Badge>{painting.category}</Badge>
                <Badge color={
                  painting.difficulty === 1 ? '#2ecc71' :
                  painting.difficulty === 2 ? '#f39c12' :
                  '#e74c3c'
                }>
                  {getDifficultyText(painting.difficulty)}
                </Badge>
                <Badge color="rgba(102, 126, 234, 0.8)">
                  👁️ {painting.viewCount} views
                </Badge>
              </Meta>
            </TitleSection>
            <PrintButton onClick={handlePrint}>🖨️ Print & Color!</PrintButton>
          </Header>

          <Description>{painting.description}</Description>

          {painting.tags && (
            <Section>
              <SectionTitle>🏷️ Tags:</SectionTitle>
              <Meta>
                {painting.tags.split(',').map((tag, index) => (
                  <Badge key={index} color="rgba(118, 75, 162, 0.8)">
                    {tag.trim()}
                  </Badge>
                ))}
              </Meta>
            </Section>
          )}
          </div>
          </MobileHidden>
        </Content>
      </Card>
      </Container>
    </>
  )
}

export default PaintingPage
