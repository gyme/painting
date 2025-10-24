import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { paintingsApi } from '../api/paintings'
import PaintingCard from '../components/PaintingCard'
import SEO from '../components/SEO'
import { Painting } from '../api/paintings'

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
  margin-bottom: 3rem;
`

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const Description = styled.p`
  font-size: 1.3rem;
  opacity: 0.95;
  max-width: 800px;
  margin: 0 auto 1rem;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`

const Stats = styled.div`
  font-size: 1.1rem;
  opacity: 0.9;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`

const Loading = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  font-size: 2rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`

interface CollectionConfig {
  id: string
  filter: (painting: Painting) => boolean
  seoKeywords: string
}

const collections: Record<string, CollectionConfig> = {
  'easy': {
    id: 'easy',
    filter: (p) => p.difficulty === 1,
    seoKeywords: 'easy coloring pages, simple coloring pages, beginner coloring, toddler coloring'
  },
  'animals': {
    id: 'animals',
    filter: (p) => ['Animals', 'Dinosaurs', 'Ocean', 'Farm Animals'].includes(p.category),
    seoKeywords: 'animal coloring pages, pet coloring, wild animals, zoo animals, farm animals'
  },
  'printable': {
    id: 'printable',
    filter: () => true,
    seoKeywords: 'free printable coloring pages, print and color, free coloring sheets'
  },
  'toddlers': {
    id: 'toddlers',
    filter: (p) => p.difficulty === 1 && ['Animals', 'Vehicles', 'Food', 'Numbers'].includes(p.category),
    seoKeywords: 'toddler coloring pages, ages 2-4, preschool coloring, simple coloring'
  },
  'popular': {
    id: 'popular',
    filter: (p) => p.viewCount > 10 || p.featured,
    seoKeywords: 'popular coloring pages, best coloring pages, top coloring, favorite coloring'
  },
  'detailed': {
    id: 'detailed',
    filter: (p) => p.difficulty === 3 || p.category === 'Mandalas',
    seoKeywords: 'detailed coloring pages, complex coloring, advanced coloring, adult coloring'
  },
  'characters': {
    id: 'characters',
    filter: (p) => ['Characters', 'Fairy Tales', 'Fantasy', 'Occupations'].includes(p.category),
    seoKeywords: 'character coloring pages, people coloring, princess coloring, hero coloring'
  },
  'vehicles': {
    id: 'vehicles',
    filter: (p) => ['Vehicles', 'Space'].includes(p.category),
    seoKeywords: 'vehicle coloring pages, car coloring, truck coloring, transportation coloring'
  },
  'educational': {
    id: 'educational',
    filter: (p) => ['Numbers', 'Dinosaurs', 'Animals', 'Occupations'].includes(p.category),
    seoKeywords: 'educational coloring pages, learning coloring, preschool coloring, kindergarten'
  },
  'seasonal': {
    id: 'seasonal',
    filter: (p) => ['Holidays', 'Halloween'].includes(p.category),
    seoKeywords: 'holiday coloring pages, seasonal coloring, Christmas coloring, Halloween coloring'
  }
}

function CollectionPage() {
  const { t } = useTranslation()
  const { collectionId } = useParams<{ collectionId: string }>()
  
  const collection = collections[collectionId || 'easy'] || collections.easy
  
  // Get translated title and description
  const title = t(`collections.${collection.id}.title`)
  const description = t(`collections.${collection.id}.description`)

  const { data: paintingsData, isLoading } = useQuery(
    ['paintings', 'collection', collectionId],
    () => paintingsApi.getAllPaintings(0, 200),
    {
      staleTime: 10 * 60 * 1000,
    }
  )

  if (isLoading) {
    return <Loading>🎨 {t('collections.loading')} ✨</Loading>
  }

  const filteredPaintings = paintingsData?.content?.filter(collection.filter) || []

  return (
    <>
      <SEO
        title={`${title} - Free Printable Coloring Pages for Kids`}
        description={description}
        keywords={collection.seoKeywords}
      />
      <Container>
        <Content>
          <Header>
            <Title>{title}</Title>
            <Description>{description}</Description>
            <Stats>
              ✨ {filteredPaintings.length} {t('collections.available')}
            </Stats>
          </Header>

          <Grid>
            {filteredPaintings.map((painting) => (
              <PaintingCard key={painting.id} painting={painting} />
            ))}
          </Grid>
        </Content>
      </Container>
    </>
  )
}

export default CollectionPage

