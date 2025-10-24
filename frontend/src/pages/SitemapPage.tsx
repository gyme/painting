import { useQuery } from 'react-query'
import styled from 'styled-components'
import { paintingsApi } from '../api/paintings'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'
import LocalizedLink from '../components/LocalizedLink'

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
`

const Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`

const Title = styled.h1`
  font-size: 3rem;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const LanguageInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`

const LanguageBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border: 2px solid #667eea;
  border-radius: 50px;
  font-weight: 600;
  color: #667eea;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`

const LanguageFlag = styled.span`
  font-size: 1.5rem;
`

const AlphabetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
  }
`

const LetterCard = styled(LocalizedLink)<{ $hasContent: boolean }>`
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${props => props.$hasContent 
    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
    : '#f0f0f0'};
  color: ${props => props.$hasContent ? 'white' : '#ccc'};
  border-radius: 15px;
  text-decoration: none;
  font-size: 2.5rem;
  font-weight: 700;
  transition: all 0.3s ease;
  box-shadow: ${props => props.$hasContent ? '0 4px 15px rgba(102, 126, 234, 0.3)' : 'none'};
  cursor: ${props => props.$hasContent ? 'pointer' : 'default'};
  pointer-events: ${props => props.$hasContent ? 'auto' : 'none'};

  &:hover {
    transform: ${props => props.$hasContent ? 'translateY(-5px) scale(1.05)' : 'none'};
    box-shadow: ${props => props.$hasContent ? '0 8px 25px rgba(102, 126, 234, 0.4)' : 'none'};
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`

const LetterCount = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: 0.5rem;
  opacity: 0.9;
`

const Loading = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  font-size: 2rem;
  color: #667eea;
`

interface LetterStats {
  [letter: string]: number
}

function SitemapPage() {
  const { t } = useTranslation()

  // Fetch all paintings
  const { data: paintingsData, isLoading: paintingsLoading } = useQuery(
    'allPaintingsSitemap',
    () => paintingsApi.getAllPaintings(0, 1000),
    {
      staleTime: 60 * 60 * 1000, // 1 hour
    }
  )

  // Fetch all categories
  const { data: categories, isLoading: categoriesLoading } = useQuery(
    'categories',
    () => paintingsApi.getAllCategories(),
    {
      staleTime: 30 * 60 * 1000,
    }
  )

  const getCategoryTranslationKey = (category: string): string => {
    return `categories.${category.toLowerCase()}`
  }

  // Static pages
  const staticPages = [
    { title: 'Home', titleEs: 'Inicio' },
    { title: 'Categories', titleEs: 'Categorías' },
    { title: 'Random Coloring Page', titleEs: 'Página para Colorear Aleatoria' },
    { title: 'Best for Toddlers', titleEs: 'Mejor para Niños Pequeños' },
    { title: 'Easy Coloring Pages', titleEs: 'Páginas para Colorear Fáciles' },
    { title: 'Most Popular', titleEs: 'Más Populares' },
    { title: 'Top Animals', titleEs: 'Mejores Animales' },
    { title: 'Top Vehicles', titleEs: 'Mejores Vehículos' },
    { title: 'Blog', titleEs: 'Blog' },
    { title: 'About Us', titleEs: 'Sobre Nosotros' },
    { title: 'Copyright', titleEs: 'Derechos de Autor' },
  ]

  if (paintingsLoading || categoriesLoading) {
    return (
      <Container>
        <Content>
          <Loading>🗺️ {t('sitemap.loading')} ✨</Loading>
        </Content>
      </Container>
    )
  }

  // Count links per letter
  const letterStats: LetterStats = {}
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  // Initialize alphabet
  alphabet.forEach(letter => {
    letterStats[letter] = 0
  })
  letterStats['#'] = 0

  // Count categories
  categories?.forEach(category => {
    const titleEn = category
    const titleEs = t(getCategoryTranslationKey(category))

    const firstLetterEn = titleEn.charAt(0).toUpperCase()
    const letterGroupEn = alphabet.includes(firstLetterEn) ? firstLetterEn : '#'
    letterStats[letterGroupEn]++

    if (titleEs !== titleEn) {
      const firstLetterEs = titleEs.charAt(0).toUpperCase()
      const letterGroupEs = alphabet.includes(firstLetterEs) ? firstLetterEs : '#'
      letterStats[letterGroupEs]++
    }
  })

  // Count paintings
  paintingsData?.content.forEach(painting => {
    const firstLetterEn = painting.title.charAt(0).toUpperCase()
    const letterGroupEn = alphabet.includes(firstLetterEn) ? firstLetterEn : '#'
    letterStats[letterGroupEn]++

    const titleEs = painting.titleEs || painting.title
    if (titleEs !== painting.title) {
      const firstLetterEs = titleEs.charAt(0).toUpperCase()
      const letterGroupEs = alphabet.includes(firstLetterEs) ? firstLetterEs : '#'
      letterStats[letterGroupEs]++
    }
  })

  // Count static pages
  staticPages.forEach(page => {
    const firstLetterEn = page.title.charAt(0).toUpperCase()
    const letterGroupEn = alphabet.includes(firstLetterEn) ? firstLetterEn : '#'
    letterStats[letterGroupEn]++

    const firstLetterEs = page.titleEs.charAt(0).toUpperCase()
    const letterGroupEs = alphabet.includes(firstLetterEs) ? firstLetterEs : '#'
    letterStats[letterGroupEs]++
  })

  const totalLinks = Object.values(letterStats).reduce((sum, count) => sum + count, 0)

  return (
    <>
      <SEO
        title={`${t('sitemap.title')} - All Coloring Pages`}
        description="Browse all our coloring pages organized alphabetically. Find animals, vehicles, fairy tales, and more free printable coloring pages for kids."
        keywords="sitemap, all coloring pages, browse coloring pages, coloring pages index"
      />
      <Container>
        <Content>
          <Title>🗺️ {t('sitemap.title')}</Title>
          <Subtitle>
            {t('sitemap.browse', { count: totalLinks })}
            <br />
            {t('sitemap.summary', { 
              paintings: paintingsData?.totalElements || 0, 
              categories: categories?.length || 0 
            })}
          </Subtitle>

          <LanguageInfo>
            <LanguageBadge>
              <LanguageFlag>🇬🇧</LanguageFlag>
              <span>English</span>
            </LanguageBadge>
            <LanguageBadge>
              <LanguageFlag>🇪🇸</LanguageFlag>
              <span>Español</span>
            </LanguageBadge>
            {/* Future languages can be added here:
            <LanguageBadge>
              <LanguageFlag>🇫🇷</LanguageFlag>
              <span>Français</span>
            </LanguageBadge>
            */}
          </LanguageInfo>

          <AlphabetGrid>
            {[...alphabet, '#'].map(letter => {
              const count = letterStats[letter]
              const hasContent = count > 0

              return (
                <LetterCard
                  key={letter}
                  to={hasContent ? `/sitemap/${letter}` : '#'}
                  $hasContent={hasContent}
                >
                  {letter}
                  {hasContent && <LetterCount>{count}</LetterCount>}
                </LetterCard>
              )
            })}
          </AlphabetGrid>
        </Content>
      </Container>
    </>
  )
}

export default SitemapPage
