import { useParams, Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { paintingsApi } from '../api/paintings'
import InteractiveColoring from '../components/InteractiveColoring'
import Breadcrumbs from '../components/Breadcrumbs'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
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

  @media print {
    display: none;
  }
`

const Card = styled.div`
  background: white;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  @media print {
    box-shadow: none;
    border-radius: 0;
  }
`

const Content = styled.div`
  padding: 3rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }

  @media print {
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

const Error = styled.div`
  text-align: center;
  padding: 2rem;
  background: rgba(231, 76, 60, 0.9);
  color: white;
  border-radius: 20px;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 2rem;
`

function PaintingPage() {
  const { urlKey } = useParams<{ urlKey: string }>()

  const { data: painting, isLoading, error } = useQuery(
    ['painting', urlKey],
    () => paintingsApi.getPaintingByUrlKey(urlKey!)
  )

  if (isLoading) {
    return <Loading>🎨 Loading your painting... ✨</Loading>
  }

  if (error || !painting) {
    return <Error>😢 Oops! We couldn't find that painting.</Error>
  }

  const handlePrint = () => {
    window.print()
  }

  const getDifficultyText = (difficulty: number) => {
    if (difficulty === 1) return 'Easy'
    if (difficulty === 2) return 'Medium'
    return 'Hard'
  }

  return (
    <Container>
      <Breadcrumbs items={[
        { label: 'Home', path: '/' },
        { label: painting.category, path: '/' },
        { label: painting.title }
      ]} />
      <BackButton to="/">← Back to Gallery</BackButton>
      <Card>
        <Content style={{ paddingTop: '2rem' }}>
          <InteractiveColoring 
            title={painting.title}
            imageUrl={painting.imageUrl}
            urlKey={painting.urlKey}
          />
          
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
        </Content>
      </Card>
    </Container>
  )
}

export default PaintingPage
