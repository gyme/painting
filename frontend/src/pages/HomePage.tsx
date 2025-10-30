import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { paintingsApi } from '../api/paintings'
import PaintingCard from '../components/PaintingCard'
import SEO from '../components/SEO'
import LocalizedLink from '../components/LocalizedLink'

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`

const Hero = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
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
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const CTAContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  margin: 2rem 0 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`

const CTAButton = styled(LocalizedLink)`
  padding: 1.2rem 2.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-size: 1.2rem;
  font-weight: 700;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(102, 126, 234, 0.5);
  }

  &.primary {
    background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
    font-size: 1.3rem;
    padding: 1.5rem 3rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
    justify-content: center;
    
    &.primary {
      font-size: 1.2rem;
      padding: 1.3rem 2rem;
    }
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

const SectionTitleLink = styled(LocalizedLink)`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: #ffd700;
    transform: translateX(5px);
  }

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

const CategoryCard = styled(LocalizedLink)`
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

function HomePage() {
  const { t } = useTranslation()
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
    () => paintingsApi.getPopularPaintings(0, 12),
    { 
      enabled: !searchQuery,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  )

  // Removed allPaintings query - not scalable for thousands of pages

  const { data: categories } = useQuery(
    'categories',
    () => paintingsApi.getAllCategories(),
    {
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
    'Halloween': '🎃',
    'Space': '🚀',
    'Ocean': '🌊',
    'Fantasy': '🦄',
    'Dinosaurs': '🦕',
    'Fairy Tales': '📚',
    'Mandalas': '🔯',
    'Occupations': '👨‍💼',
    'Italian Brainrot': '🇮🇹',
    'Basketball Players': '🏀',
    'K Pop Demon Hunters': '⚔️',
    'Numbers': '🔢',
    'Flowers': '🌸',
    'Celebrities': '🎭',
    'Inspiring People': '💫',
    'Soccer Players': '⚽',
  }

  const getCategoryIcon = (category: string): string => {
    return categoryIcons[category] || '🎨'
  }
  
  const getCategoryTranslationKey = (category: string): string => {
    return `categories.${category.toLowerCase()}`
  }

  if (searchQuery) {
    if (searchLoading) {
      return <Loading>🔍 Searching for "{searchQuery}"... ✨</Loading>
    }

    if (searchError) {
      return <Error>😢 Oops! Something went wrong. Please try again later.</Error>
    }

    // Filter categories that match search query
    const matchingCategories = categories?.filter(cat => 
      cat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(getCategoryTranslationKey(cat)).toLowerCase().includes(searchQuery.toLowerCase())
    ) || []

    const totalResults = (searchData?.totalElements || 0) + matchingCategories.length

    return (
      <Container>
        <Hero>
          <Title>🔍 Search Results for "{searchQuery}"</Title>
          <Subtitle>{totalResults} result{totalResults !== 1 ? 's' : ''} found</Subtitle>
        </Hero>

        {/* Show matching categories first */}
        {matchingCategories.length > 0 && (
          <Section>
            <SectionTitle>📂 Categories ({matchingCategories.length})</SectionTitle>
            <CategoriesGrid>
              {matchingCategories.map((category) => (
                <CategoryCard key={category} to={`/category/${category.replace(/ /g, '_')}`}>
                  <CategoryIcon>📂 {getCategoryIcon(category)}</CategoryIcon>
                  <CategoryName>{t(getCategoryTranslationKey(category))}</CategoryName>
                </CategoryCard>
              ))}
            </CategoriesGrid>
          </Section>
        )}

        {/* Show painting results */}
        {searchData && searchData.content.length > 0 && (
          <Section>
            <SectionTitle>🎨 Paintings ({searchData.totalElements})</SectionTitle>
            <Grid>
              {searchData.content.map((painting) => (
                <PaintingCard key={painting.id} painting={painting} />
              ))}
            </Grid>
          </Section>
        )}

        {/* No results message */}
        {totalResults === 0 && (
          <Error>No results found matching "{searchQuery}". Try a different search!</Error>
        )}
      </Container>
    )
  }

  if (featuredLoading || popularLoading) {
    return <Loading>🎨 {t('home.loading')} ✨</Loading>
  }

  if (featuredError || popularError) {
    return <Error>😢 {t('home.error')}</Error>
  }

  return (
    <>
      <SEO
        title={t('seo.home.title')}
        description={t('seo.home.description')}
        keywords={t('seo.home.keywords')}
      />
      <Container>
        <Hero>
          <Title>🎨 {t('home.title')}</Title>
          <Subtitle>{t('home.subtitle')}</Subtitle>
          <CTAContainer>
            <CTAButton to="/random" className="primary">
              🎲 {t('home.randomPage')}
            </CTAButton>
          </CTAContainer>
        </Hero>

        {/* Categories Section */}
        {categories && categories.length > 0 && (
          <Section id="categories">
            <SectionTitleLink to="/categories">
              📂 {t('home.browseByCategory')} →
            </SectionTitleLink>
            <CategoriesGrid>
              {categories.slice(0, 6).map((category) => (
                <CategoryCard key={category} to={`/category/${category.replace(/ /g, '_')}`}>
                  <CategoryIcon>{getCategoryIcon(category)}</CategoryIcon>
                  <CategoryName>{t(getCategoryTranslationKey(category))}</CategoryName>
                </CategoryCard>
              ))}
            </CategoriesGrid>
          </Section>
        )}

        {/* Featured Paintings */}
        {featuredData && featuredData.content.length > 0 && (
          <Section>
            <SectionTitle>⭐ {t('home.featuredPages')}</SectionTitle>
            <Grid>
              {featuredData.content.map((painting) => (
                <PaintingCard key={painting.id} painting={painting} />
              ))}
            </Grid>
          </Section>
        )}

        {/* Popular Paintings */}
        {popularData && popularData.content.length > 0 && (
          <Section>
            <SectionTitle>🔥 {t('home.popularPages')}</SectionTitle>
            <Grid>
              {popularData.content.map((painting) => (
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
