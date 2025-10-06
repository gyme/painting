import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { paintingsApi } from '../api/paintings'
import PaintingCard from '../components/PaintingCard'

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
    () => paintingsApi.getPaintingsByCategory(category!, 0, 50)
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

  return (
    <Container>
      <Header>
        <Title>{getCategoryEmoji(category!)} {category} Paintings</Title>
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
    </Container>
  )
}

export default CategoryPage
