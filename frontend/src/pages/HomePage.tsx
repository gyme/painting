import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { paintingsApi } from '../api/paintings'
import PaintingCard from '../components/PaintingCard'

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`

const Hero = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
`

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: bounce 1s ease;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const Section = styled.section`
  margin-bottom: 3rem;
`

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1.5rem;
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

function HomePage() {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')

  const { data: searchData, isLoading: searchLoading, error: searchError } = useQuery(
    ['searchPaintings', searchQuery],
    () => paintingsApi.searchPaintings(searchQuery!, 0, 50),
    { enabled: !!searchQuery }
  )

  const { data: featuredData, isLoading: featuredLoading, error: featuredError } = useQuery(
    'featuredPaintings',
    () => paintingsApi.getFeaturedPaintings(0, 6),
    { enabled: !searchQuery }
  )

  const { data: popularData, isLoading: popularLoading, error: popularError } = useQuery(
    'popularPaintings',
    () => paintingsApi.getPopularPaintings(0, 6),
    { enabled: !searchQuery }
  )

  const { data: allData, isLoading: allLoading, error: allError } = useQuery(
    'allPaintings',
    () => paintingsApi.getAllPaintings(0, 12),
    { enabled: !searchQuery }
  )

  if (searchQuery) {
    if (searchLoading) {
      return <Loading>🔍 Searching for "{searchQuery}"... ✨</Loading>
    }

    if (searchError) {
      return <Error>😢 Oops! Something went wrong. Please try again later.</Error>
    }

    return (
      <Container>
        <Hero>
          <Title>🔍 Search Results for "{searchQuery}"</Title>
          <Subtitle>{searchData?.totalElements || 0} paintings found</Subtitle>
        </Hero>

        {searchData && searchData.content.length > 0 ? (
          <Section>
            <Grid>
              {searchData.content.map((painting) => (
                <PaintingCard key={painting.id} painting={painting} />
              ))}
            </Grid>
          </Section>
        ) : (
          <Error>No paintings found matching "{searchQuery}". Try a different search!</Error>
        )}
      </Container>
    )
  }

  if (featuredLoading || popularLoading || allLoading) {
    return <Loading>🎨 Loading amazing paintings... ✨</Loading>
  }

  if (featuredError || popularError || allError) {
    return <Error>😢 Oops! Something went wrong. Please try again later.</Error>
  }

  return (
    <Container>
      <Hero>
        <Title>🎨 Welcome to Kids Painting Fun! 🌈</Title>
        <Subtitle>Color amazing animals, nature, and so much more!</Subtitle>
      </Hero>

      {featuredData && featuredData.content.length > 0 && (
        <Section>
          <SectionTitle>⭐ Featured Paintings</SectionTitle>
          <Grid>
            {featuredData.content.map((painting) => (
              <PaintingCard key={painting.id} painting={painting} />
            ))}
          </Grid>
        </Section>
      )}

      {popularData && popularData.content.length > 0 && (
        <Section>
          <SectionTitle>🔥 Most Popular</SectionTitle>
          <Grid>
            {popularData.content.map((painting) => (
              <PaintingCard key={painting.id} painting={painting} />
            ))}
          </Grid>
        </Section>
      )}

      {allData && allData.content.length > 0 && (
        <Section>
          <SectionTitle>🎨 All Paintings</SectionTitle>
          <Grid>
            {allData.content.map((painting) => (
              <PaintingCard key={painting.id} painting={painting} />
            ))}
          </Grid>
        </Section>
      )}
    </Container>
  )
}

export default HomePage
