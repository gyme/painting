import { useQuery } from 'react-query'
import styled from 'styled-components'
import { paintingsApi } from '../api/paintings'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
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

const BackLink = styled(LocalizedLink)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(-5px);
    color: #764ba2;
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
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const LanguageSection = styled.div`
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  border-radius: 15px;
  border: 2px solid #e0e0e0;
`

const LanguageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 3px solid #667eea;
`

const LanguageFlag = styled.span`
  font-size: 2.5rem;
`

const LanguageTitle = styled.h2`
  font-size: 2rem;
  color: #667eea;
  margin: 0;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const Section = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e0e0e0;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const LinksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const LinkItem = styled(LocalizedLink)`
  padding: 1rem 1.5rem;
  background: #f8f9fa;
  border-radius: 10px;
  text-decoration: none;
  color: #333;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 2px solid transparent;

  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    transform: translateX(5px);
    border-color: #667eea;
  }
`

const LinkIcon = styled.span`
  font-size: 1.2rem;
`

const LinkText = styled.span`
  flex: 1;
`

const Loading = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  font-size: 2rem;
  color: #667eea;
`

const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.2rem;
`

interface LinkItem {
  url: string
  title: string
}

interface LanguageLinks {
  categories: LinkItem[]
  paintings: LinkItem[]
}

interface GroupedLinks {
  en: LanguageLinks
  es: LanguageLinks
  // Future languages can be added here:
  // fr: LanguageLinks
  // de: LanguageLinks
}

function LetterSitemapPage() {
  const { t } = useTranslation()
  const { letter } = useParams<{ letter: string }>()
  const currentLetter = (letter || 'A').toUpperCase()

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
    { url: '/', title: 'Home', titleEs: 'Inicio', icon: '🏠' },
    { url: '/categories', title: 'Categories', titleEs: 'Categorías', icon: '📂' },
    { url: '/random', title: 'Random Coloring Page', titleEs: 'Página para Colorear Aleatoria', icon: '🎲' },
    { url: '/best-for-toddlers', title: 'Best for Toddlers', titleEs: 'Mejor para Niños Pequeños', icon: '👶' },
    { url: '/easy-coloring', title: 'Easy Coloring Pages', titleEs: 'Páginas para Colorear Fáciles', icon: '⭐' },
    { url: '/most-popular', title: 'Most Popular', titleEs: 'Más Populares', icon: '🔥' },
    { url: '/top-animals', title: 'Top Animals', titleEs: 'Mejores Animales', icon: '🐾' },
    { url: '/top-vehicles', title: 'Top Vehicles', titleEs: 'Mejores Vehículos', icon: '🚗' },
    { url: '/blog', title: 'Blog', titleEs: 'Blog', icon: '📝' },
    { url: '/about', title: 'About Us', titleEs: 'Sobre Nosotros', icon: 'ℹ️' },
    { url: '/copyright', title: 'Copyright', titleEs: 'Derechos de Autor', icon: '©' },
  ]

  if (paintingsLoading || categoriesLoading) {
    return (
      <Container>
        <Content>
          <Loading>{t('page.loading')} ✨</Loading>
        </Content>
      </Container>
    )
  }

  // Group links for this letter by language
  const groupedLinks: GroupedLinks = {
    en: { categories: [], paintings: [] },
    es: { categories: [], paintings: [] }
  }
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  // Add categories (both EN and ES)
  categories?.forEach(category => {
    const categoryUrlKey = category.replace(/ /g, '_')
    const titleEn = category
    const titleEs = t(getCategoryTranslationKey(category))

    // English
    const firstLetterEn = titleEn.charAt(0).toUpperCase()
    const letterGroupEn = alphabet.includes(firstLetterEn) ? firstLetterEn : '#'
    if (letterGroupEn === currentLetter) {
      groupedLinks.en.categories.push({
        url: `/category/${categoryUrlKey}`,
        title: titleEn
      })
    }

    // Spanish (if different)
    if (titleEs !== titleEn) {
      const firstLetterEs = titleEs.charAt(0).toUpperCase()
      const letterGroupEs = alphabet.includes(firstLetterEs) ? firstLetterEs : '#'
      if (letterGroupEs === currentLetter) {
        groupedLinks.es.categories.push({
          url: `/es/category/${categoryUrlKey}`,
          title: titleEs
        })
      }
    }
  })

  // Add paintings (both EN and ES)
  paintingsData?.content.forEach(painting => {
    // English
    const firstLetterEn = painting.title.charAt(0).toUpperCase()
    const letterGroupEn = alphabet.includes(firstLetterEn) ? firstLetterEn : '#'
    if (letterGroupEn === currentLetter) {
      groupedLinks.en.paintings.push({
        url: `/painting/${painting.urlKey}`,
        title: painting.title
      })
    }

    // Spanish
    const titleEs = painting.titleEs || painting.title
    if (titleEs !== painting.title) {
      const firstLetterEs = titleEs.charAt(0).toUpperCase()
      const letterGroupEs = alphabet.includes(firstLetterEs) ? firstLetterEs : '#'
      if (letterGroupEs === currentLetter) {
        groupedLinks.es.paintings.push({
          url: `/es/painting/${painting.urlKey}`,
          title: titleEs
        })
      }
    }
  })

  // Add static pages
  staticPages.forEach(page => {
    // English
    const firstLetterEn = page.title.charAt(0).toUpperCase()
    const letterGroupEn = alphabet.includes(firstLetterEn) ? firstLetterEn : '#'
    if (letterGroupEn === currentLetter) {
      groupedLinks.en.paintings.push({
        url: page.url,
        title: `${page.icon} ${page.title}`
      })
    }

    // Spanish
    const firstLetterEs = page.titleEs.charAt(0).toUpperCase()
    const letterGroupEs = alphabet.includes(firstLetterEs) ? firstLetterEs : '#'
    if (letterGroupEs === currentLetter) {
      groupedLinks.es.paintings.push({
        url: `/es${page.url}`,
        title: `${page.icon} ${page.titleEs}`
      })
    }
  })

  const totalLinks = 
    groupedLinks.en.categories.length + groupedLinks.en.paintings.length +
    groupedLinks.es.categories.length + groupedLinks.es.paintings.length

  return (
    <>
      <SEO
        title={`${t('sitemap.title')} ${currentLetter} - Browse Coloring Pages`}
        description={`Browse all coloring pages starting with ${currentLetter}. Find free printable coloring pages for kids.`}
        keywords={`sitemap ${currentLetter}, coloring pages ${currentLetter}, browse coloring pages`}
      />
      <Container>
        <Content>
          <BackLink to="/sitemap">← {t('sitemap.backToSitemap')}</BackLink>
          
          <Title>{currentLetter}</Title>
          <Subtitle>{totalLinks} {t('sitemap.pages')}</Subtitle>

          {totalLinks === 0 ? (
            <EmptyMessage>{t('sitemap.noPages', { letter: currentLetter })}</EmptyMessage>
          ) : (
            <>
              {/* English Section */}
              {(groupedLinks.en.categories.length > 0 || groupedLinks.en.paintings.length > 0) && (
                <LanguageSection>
                  <LanguageHeader>
                    <LanguageFlag>🇬🇧</LanguageFlag>
                    <LanguageTitle>English</LanguageTitle>
                  </LanguageHeader>

                  {groupedLinks.en.categories.length > 0 && (
                    <Section>
                      <SectionTitle>📂 {t('sitemap.categories')} ({groupedLinks.en.categories.length})</SectionTitle>
                      <LinksGrid>
                        {groupedLinks.en.categories
                          .sort((a, b) => a.title.localeCompare(b.title))
                          .map((link, index) => (
                            <LinkItem key={`en-cat-${index}`} to={link.url}>
                              <LinkIcon>📂</LinkIcon>
                              <LinkText>{link.title}</LinkText>
                            </LinkItem>
                          ))}
                      </LinksGrid>
                    </Section>
                  )}

                  {groupedLinks.en.paintings.length > 0 && (
                    <Section>
                      <SectionTitle>🎨 {t('sitemap.pagesSection')} ({groupedLinks.en.paintings.length})</SectionTitle>
                      <LinksGrid>
                        {groupedLinks.en.paintings
                          .sort((a, b) => a.title.localeCompare(b.title))
                          .map((link, index) => (
                            <LinkItem key={`en-page-${index}`} to={link.url}>
                              <LinkIcon>🎨</LinkIcon>
                              <LinkText>{link.title}</LinkText>
                            </LinkItem>
                          ))}
                      </LinksGrid>
                    </Section>
                  )}
                </LanguageSection>
              )}

              {/* Spanish Section */}
              {(groupedLinks.es.categories.length > 0 || groupedLinks.es.paintings.length > 0) && (
                <LanguageSection>
                  <LanguageHeader>
                    <LanguageFlag>🇪🇸</LanguageFlag>
                    <LanguageTitle>Español</LanguageTitle>
                  </LanguageHeader>

                  {groupedLinks.es.categories.length > 0 && (
                    <Section>
                      <SectionTitle>📂 {t('sitemap.categories')} ({groupedLinks.es.categories.length})</SectionTitle>
                      <LinksGrid>
                        {groupedLinks.es.categories
                          .sort((a, b) => a.title.localeCompare(b.title))
                          .map((link, index) => (
                            <LinkItem key={`es-cat-${index}`} to={link.url}>
                              <LinkIcon>📂</LinkIcon>
                              <LinkText>{link.title}</LinkText>
                            </LinkItem>
                          ))}
                      </LinksGrid>
                    </Section>
                  )}

                  {groupedLinks.es.paintings.length > 0 && (
                    <Section>
                      <SectionTitle>🎨 {t('sitemap.pagesSection')} ({groupedLinks.es.paintings.length})</SectionTitle>
                      <LinksGrid>
                        {groupedLinks.es.paintings
                          .sort((a, b) => a.title.localeCompare(b.title))
                          .map((link, index) => (
                            <LinkItem key={`es-page-${index}`} to={link.url}>
                              <LinkIcon>🎨</LinkIcon>
                              <LinkText>{link.title}</LinkText>
                            </LinkItem>
                          ))}
                      </LinksGrid>
                    </Section>
                  )}
                </LanguageSection>
              )}
            </>
          )}
        </Content>
      </Container>
    </>
  )
}

export default LetterSitemapPage

