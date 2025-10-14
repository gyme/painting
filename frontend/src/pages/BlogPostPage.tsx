import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import LocalizedLink from '../components/LocalizedLink'
import SEO from '../components/SEO'
import { blogArticles } from '../data/blogArticles'

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
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
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateX(-5px);
  }
`

const Article = styled.article`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const Hero = styled.div<{ $color: string }>`
  height: 300px;
  background: ${props => props.$color};
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 6rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    height: 200px;
    font-size: 4rem;
  }
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #333;
  margin-bottom: 1rem;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #f0f0f0;
  color: #999;
  font-size: 0.95rem;
`

const Content = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
  
  h2 {
    font-size: 1.8rem;
    font-weight: 700;
    color: #333;
    margin: 2rem 0 1rem;
  }
  
  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    color: #444;
    margin: 1.5rem 0 0.75rem;
  }
  
  p {
    margin-bottom: 1.5rem;
  }
  
  ul, ol {
    margin: 1.5rem 0;
    padding-left: 2rem;
    
    li {
      margin-bottom: 0.75rem;
    }
  }
  
  strong {
    color: #333;
    font-weight: 600;
  }
  
  em {
    color: #667eea;
    font-style: normal;
    font-weight: 600;
  }
  
  blockquote {
    border-left: 4px solid #667eea;
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    color: #666;
  }
`

const RelatedSection = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid #f0f0f0;
`

const RelatedTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1.5rem;
`

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`

const RelatedCard = styled(LocalizedLink)`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  padding: 1.5rem;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 0.9rem;
    color: #666;
  }
`

const NotFound = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  
  h1 {
    font-size: 2rem;
    color: #333;
    margin-bottom: 1rem;
  }
  
  p {
    color: #666;
    margin-bottom: 2rem;
  }
`

function BlogPostPage() {
  const { t, i18n } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? blogArticles[slug] : null
  
  // Helper function to get localized content
  const getLocalizedContent = (article: any, field: string) => {
    const isSpanish = i18n.language === 'es'
    const spanishField = `${field}Es`
    
    if (isSpanish && article[spanishField]) {
      return article[spanishField]
    }
    return article[field]
  }

  if (!article) {
    return (
      <Container>
        <NotFound>
          <h1>{t('blog.articleNotFound')}</h1>
          <p>{t('blog.articleNotFoundDesc')}</p>
          <BackLink to="/blog">← {t('blog.backToBlog')}</BackLink>
        </NotFound>
      </Container>
    )
  }
  
  const localizedTitle = getLocalizedContent(article, 'title')
  const localizedExcerpt = getLocalizedContent(article, 'excerpt')
  const localizedContent = getLocalizedContent(article, 'content')
  const localizedDate = getLocalizedContent(article, 'date')
  const localizedReadTime = getLocalizedContent(article, 'readTime')
  const localizedKeywords = getLocalizedContent(article, 'keywords')

  return (
    <>
      <SEO 
        title={`${localizedTitle} | mycolor.fun Blog`}
        description={localizedExcerpt}
        keywords={localizedKeywords}
      />
      
      <Container>
        <BackLink to="/blog">← {t('blog.backToBlog')}</BackLink>
        
        <Article>
          <Hero $color={article.color}>
            {article.emoji}
          </Hero>
          
          <Title>{localizedTitle}</Title>
          
          <Meta>
            <span>📅 {localizedDate}</span>
            <span>⏱️ {localizedReadTime}</span>
            <span>✍️ {t('common.by')} mycolor.fun Team</span>
          </Meta>
          
          <Content dangerouslySetInnerHTML={{ __html: localizedContent }} />
          
          <RelatedSection>
            <RelatedTitle>🎨 {t('blog.startColoringToday')}</RelatedTitle>
            <RelatedGrid>
              <RelatedCard to="/category/Animals">
                <h4>🐶 {t('blog.animalPages')}</h4>
                <p>{t('blog.animalPagesDesc')}</p>
              </RelatedCard>
              <RelatedCard to="/category/Vehicles">
                <h4>🚗 {t('blog.vehiclePages')}</h4>
                <p>{t('blog.vehiclePagesDesc')}</p>
              </RelatedCard>
              <RelatedCard to="/">
                <h4>🎨 {t('blog.allPages')}</h4>
                <p>{t('blog.allPagesDesc')}</p>
              </RelatedCard>
            </RelatedGrid>
          </RelatedSection>
        </Article>
      </Container>
    </>
  )
}

export default BlogPostPage

