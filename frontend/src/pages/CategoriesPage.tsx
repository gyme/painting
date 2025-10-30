import { useQuery } from 'react-query'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { paintingsApi } from '../api/paintings'
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
  padding: 3rem 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
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
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`

const CategoryCard = styled(LocalizedLink)`
  background: rgba(255, 255, 255, 0.95);
  padding: 3rem 2rem;
  border-radius: 25px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 3px solid transparent;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
    border-color: #667eea;

    &::before {
      transform: scaleX(1);
    }
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`

const CategoryIcon = styled.div`
  font-size: 4rem;
  animation: bounce 2s ease infinite;

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`

const CategoryName = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3748;
  margin: 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const CategoryCount = styled.span`
  font-size: 0.9rem;
  color: #667eea;
  font-weight: 600;
  padding: 0.3rem 0.8rem;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 15px;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`

const Loading = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  font-size: 2rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`

function CategoriesPage() {
  const { t } = useTranslation()

  const { data: categories, isLoading } = useQuery(
    'categories',
    () => paintingsApi.getAllCategories(),
    {
      staleTime: 30 * 60 * 1000, // 30 minutes
    }
  )

  // Category icons mapping
  const categoryIcons: Record<string, string> = {
    'ABC': '🔤',
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
    'Mothers Day': '💐',
  }

  const getCategoryIcon = (category: string): string => {
    return categoryIcons[category] || '🎨'
  }

  const getCategoryTranslationKey = (category: string): string => {
    return `categories.${category.toLowerCase()}`
  }

  if (isLoading) {
    return (
      <Container>
        <Loading>🎨 {t('page.loading')}</Loading>
      </Container>
    )
  }

  return (
    <>
      <SEO
        title={t('seo.categories.title')}
        description={t('seo.categories.description')}
        keywords={t('seo.categories.keywords')}
      />
      <Container>
        <Hero>
          <Title>📂 {t('categories.title', 'All Categories')}</Title>
          <Subtitle>
            {t('categories.subtitle', 'Choose a category and start coloring!')}
          </Subtitle>
        </Hero>

        <CategoriesGrid>
          {categories?.map((category) => (
            <CategoryCard key={category} to={`/category/${category.replace(/ /g, '_')}`}>
              <CategoryIcon>{getCategoryIcon(category)}</CategoryIcon>
              <CategoryName>{t(getCategoryTranslationKey(category))}</CategoryName>
              <CategoryCount>{t('categories.explore', 'Explore')} →</CategoryCount>
            </CategoryCard>
          ))}
        </CategoriesGrid>
      </Container>
    </>
  )
}

export default CategoriesPage

