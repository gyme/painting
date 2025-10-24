import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
`

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`

const Header = styled.div`
  text-align: center;
  color: white;
  margin-bottom: 4rem;
`

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.5rem;
  opacity: 0.95;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

const CollectionCard = styled(Link)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  }
`

const CollectionIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`

const CollectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #2d3436;
  margin-bottom: 0.5rem;
`

const CollectionDescription = styled.p`
  font-size: 1.1rem;
  color: #636e72;
  line-height: 1.6;
`

const collectionIcons: Record<string, string> = {
  'easy': '😊',
  'animals': '🐾',
  'printable': '🖨️',
  'toddlers': '👶',
  'popular': '⭐',
  'detailed': '🎨',
  'characters': '👑',
  'vehicles': '🚗',
  'educational': '📚',
  'seasonal': '🎃'
}

const collectionIds = ['easy', 'animals', 'printable', 'toddlers', 'popular', 'detailed', 'characters', 'vehicles', 'educational', 'seasonal']

function CollectionsIndexPage() {
  const { t } = useTranslation()
  
  return (
    <>
      <SEO
        title="Free Coloring Page Collections - Browse by Theme & Difficulty"
        description="Explore our curated collections of free printable coloring pages! Easy pages for toddlers, detailed pages for adults, animals, vehicles, characters, and more!"
        keywords="coloring page collections, free printable coloring pages, easy coloring, detailed coloring, animal coloring, vehicle coloring"
      />
      <Container>
        <Content>
          <Header>
            <Title>✨ {t('collections.title')}</Title>
            <Subtitle>
              {t('collections.subtitle')}
            </Subtitle>
          </Header>

          <Grid>
            {collectionIds.map((id) => (
              <CollectionCard key={id} to={`/collections/${id}`}>
                <CollectionIcon>{collectionIcons[id]}</CollectionIcon>
                <CollectionTitle>{t(`collections.${id}.title`)}</CollectionTitle>
                <CollectionDescription>{t(`collections.${id}.description`)}</CollectionDescription>
              </CollectionCard>
            ))}
          </Grid>
        </Content>
      </Container>
    </>
  )
}

export default CollectionsIndexPage

