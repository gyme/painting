import { useQuery } from 'react-query'
import { useSearchParams, Link } from 'react-router-dom'
import styled from 'styled-components'
import { paintingsApi } from '../api/paintings'
import PaintingCard from '../components/PaintingCard'
import SEO from '../components/SEO'

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

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`

const CategoryCard = styled(Link)`
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem 1.5rem;
  border-radius: 20px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 3px solid transparent;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    border-color: #667eea;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`

const CategoryIcon = styled.div`
  font-size: 3rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

const CategoryName = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: #333;
  margin: 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`

const CategoryCount = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0;
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
    { 
      enabled: !searchQuery,
      staleTime: 10 * 60 * 1000, // 10 minutes - featured content doesn't change often
    }
  )

  const { data: popularData, isLoading: popularLoading, error: popularError } = useQuery(
    'popularPaintings',
    () => paintingsApi.getPopularPaintings(0, 6),
    { 
      enabled: !searchQuery,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  )

  const { data: allData, isLoading: allLoading, error: allError } = useQuery(
    'allPaintings',
    () => paintingsApi.getAllPaintings(0, 12),
    { 
      enabled: !searchQuery,
      staleTime: 3 * 60 * 1000, // 3 minutes
    }
  )

  const { data: categories } = useQuery(
    'categories',
    () => paintingsApi.getAllCategories(),
    {
      enabled: !searchQuery,
      staleTime: 30 * 60 * 1000, // 30 minutes - categories rarely change
    }
  )

  // Category icons mapping
  const categoryIcons: Record<string, string> = {
    'Animals': '🐶',
    'Nature': '🌳',
    'Vehicles': '🚗',
    'Characters': '👦',
    'Food': '🍕',
    'Sports': '⚽',
    'Holidays': '🎄',
    'Space': '🚀',
    'Ocean': '🌊',
    'Fantasy': '🦄',
    'Dinosaurs': '🦕',
    'Mandalas': '🔯',
  }

  const getCategoryIcon = (category: string): string => {
    return categoryIcons[category] || '🎨'
  }

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
    <>
      <SEO
        title="Free Coloring Pages for Kids"
        description="Explore hundreds of free printable coloring pages for kids! Color amazing animals, vehicles, nature scenes, and popular characters. Perfect for children of all ages."
        keywords="free coloring pages, kids coloring, printable coloring sheets, animal coloring pages, vehicle coloring pages, children activities, fun for kids"
      />
      <Container>
        <Hero>
          <Title>🎨 Welcome to Kids Painting Fun! 🌈</Title>
          <Subtitle>Color amazing animals, nature, and so much more!</Subtitle>
        </Hero>

        {/* Categories Section */}
        {categories && categories.length > 0 && (
          <Section>
            <SectionTitle>📂 Browse by Category</SectionTitle>
            <CategoriesGrid>
              {categories.map((category) => (
                <CategoryCard key={category} to={`/category/${category}`}>
                  <CategoryIcon>{getCategoryIcon(category)}</CategoryIcon>
                  <CategoryName>{category}</CategoryName>
                </CategoryCard>
              ))}
            </CategoriesGrid>
          </Section>
        )}

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
    </>
  )
}

export default HomePage
