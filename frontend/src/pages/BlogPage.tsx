import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import LocalizedLink from '../components/LocalizedLink'
import SEO from '../components/SEO'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
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
    font-size: 2.5rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: white;
  max-width: 600px;
  margin: 0 auto;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

const BlogCard = styled(LocalizedLink)`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`

const BlogImage = styled.div<{ $color: string }>`
  height: 200px;
  background: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
`

const BlogContent = styled.div`
  padding: 1.5rem;
`

const BlogTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
`

const BlogMeta = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #999;
  margin-bottom: 1rem;
`

const BlogExcerpt = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
`

const ReadMore = styled.span`
  color: #667eea;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  &:after {
    content: '→';
    transition: transform 0.3s ease;
  }
  
  ${BlogCard}:hover &:after {
    transform: translateX(5px);
  }
`

const blogPosts = [
  {
    id: 'educational-benefits-coloring',
    title: 'The Educational Benefits of Coloring for Children',
    titleEs: 'Los Beneficios Educativos de Colorear para Niños',
    excerpt: 'Discover how coloring pages boost cognitive development, fine motor skills, and creativity in children aged 2-10.',
    excerptEs: 'Descubre cómo las páginas para colorear impulsan el desarrollo cognitivo, las habilidades motoras finas y la creatividad en niños de 2 a 10 años.',
    date: 'October 12, 2025',
    dateEs: '12 de octubre, 2025',
    readTime: '5 min read',
    readTimeEs: '5 min de lectura',
    emoji: '🎨',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 'coloring-child-development',
    title: 'How Coloring Supports Child Development: A Complete Guide',
    titleEs: 'Cómo Colorear Apoya el Desarrollo Infantil: Guía Completa',
    excerpt: 'Learn about the science behind coloring and its impact on emotional intelligence, concentration, and hand-eye coordination.',
    excerptEs: 'Aprende sobre la ciencia detrás de colorear y su impacto en la inteligencia emocional, la concentración y la coordinación mano-ojo.',
    date: 'October 12, 2025',
    dateEs: '12 de octubre, 2025',
    readTime: '7 min read',
    readTimeEs: '7 min de lectura',
    emoji: '🧠',
    color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    id: 'coloring-stress-relief-kids',
    title: 'Coloring as Stress Relief: Why Kids Need It More Than Ever',
    titleEs: 'Colorear como Alivio del Estrés: Por Qué los Niños lo Necesitan Más que Nunca',
    excerpt: 'In our digital age, coloring provides essential screen-free time and helps children manage anxiety and stress.',
    excerptEs: 'En nuestra era digital, colorear proporciona tiempo esencial sin pantallas y ayuda a los niños a manejar la ansiedad y el estrés.',
    date: 'October 12, 2025',
    dateEs: '12 de octubre, 2025',
    readTime: '6 min read',
    readTimeEs: '6 min de lectura',
    emoji: '😌',
    color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    id: 'coloring-pages-by-age',
    title: 'Best Coloring Pages for Every Age: 2-10 Years Complete Guide',
    excerpt: 'Find the perfect coloring pages for your child\'s age and skill level. Age-appropriate recommendations for toddlers to elementary kids.',
    date: 'October 12, 2025',
    readTime: '8 min read',
    emoji: '👶',
    color: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)'
  },
  {
    id: 'homeschool-coloring-activities',
    title: 'Using Coloring Pages for Homeschooling: Creative Learning Activities',
    excerpt: 'Transform coloring pages into powerful educational tools. Practical activities for teaching math, science, language arts, and more through coloring.',
    date: 'October 12, 2025',
    readTime: '9 min read',
    emoji: '📚',
    color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  },
  {
    id: 'fine-motor-skills-development',
    title: 'Fine Motor Skills: How Coloring Prepares Children for Writing',
    excerpt: 'The crucial connection between coloring and handwriting. Learn how coloring develops the muscles and coordination needed for writing success.',
    date: 'October 12, 2025',
    readTime: '7 min read',
    emoji: '✍️',
    color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
  },
  {
    id: 'printable-coloring-pages-guide',
    title: 'Complete Guide to Printing Coloring Pages: Save Money & Get Best Results',
    excerpt: 'Expert tips for printing high-quality coloring pages at home. Learn how to save ink, choose the right paper, and troubleshoot common printing problems.',
    date: 'October 12, 2025',
    readTime: '6 min read',
    emoji: '🖨️',
    color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
  },
  {
    id: 'seasonal-coloring-activities',
    title: 'Seasonal Coloring Pages: Year-Round Activities for Every Holiday',
    excerpt: 'Complete guide to seasonal coloring activities. Holiday-specific ideas, seasonal crafts, and themed projects for every time of year.',
    date: 'October 12, 2025',
    readTime: '10 min read',
    emoji: '🎃',
    color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #ffecd2 100%)'
  },
  {
    id: 'color-theory-for-kids',
    title: 'Teaching Color Theory Through Coloring: Fun Art Lessons for Kids',
    excerpt: 'Make color theory fun and accessible! Learn how to teach primary colors, color mixing, warm/cool colors, and more through coloring activities.',
    date: 'October 12, 2025',
    readTime: '8 min read',
    emoji: '🎨',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
  },
  {
    id: 'screen-free-activities',
    title: 'Screen-Free Activities: Why Coloring is the Perfect Digital Detox for Kids',
    excerpt: 'Combat screen addiction with engaging coloring activities. Practical strategies for reducing screen time and creating healthy tech boundaries.',
    date: 'October 12, 2025',
    readTime: '7 min read',
    emoji: '📵',
    color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
  },
  {
    id: 'mindful-coloring-meditation',
    title: 'Mindful Coloring: Teaching Meditation and Mindfulness to Children',
    excerpt: 'Use coloring as a gateway to mindfulness practice. Simple techniques to help children develop focus, calm, and emotional regulation through mindful coloring.',
    date: 'October 12, 2025',
    readTime: '7 min read',
    emoji: '🧘',
    color: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)'
  },
  {
    id: 'party-activities-coloring',
    title: 'Coloring Pages for Parties: Creative Activities for Birthday Parties & Events',
    excerpt: 'Make parties memorable with coloring activities! Ideas for birthday parties, baby showers, school events, and more. Includes free party planning tips.',
    date: 'October 12, 2025',
    readTime: '9 min read',
    emoji: '🎉',
    color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ff9a9e 100%)'
  }
]

function BlogPage() {
  const { t, i18n } = useTranslation()
  
  // Helper function to get localized content
  const getLocalizedContent = (post: any, field: string) => {
    const isSpanish = i18n.language === 'es'
    const spanishField = `${field}Es`
    
    if (isSpanish && post[spanishField]) {
      return post[spanishField]
    }
    return post[field]
  }
  
  return (
    <>
      <SEO 
        title={t('seo.blog.title')}
        description={t('seo.blog.description')}
        keywords={t('seo.blog.keywords')}
      />
      
      <Container>
        <Hero>
          <Title>✏️ {t('blog.title')}</Title>
          <Subtitle>
            {t('blog.subtitle')}
          </Subtitle>
        </Hero>

        <BlogGrid>
          {blogPosts.map(post => (
            <BlogCard key={post.id} to={`/blog/${post.id}`}>
              <BlogImage $color={post.color}>
                {post.emoji}
              </BlogImage>
              <BlogContent>
                <BlogTitle>{getLocalizedContent(post, 'title')}</BlogTitle>
                <BlogMeta>
                  <span>📅 {getLocalizedContent(post, 'date')}</span>
                  <span>⏱️ {getLocalizedContent(post, 'readTime')}</span>
                </BlogMeta>
                <BlogExcerpt>{getLocalizedContent(post, 'excerpt')}</BlogExcerpt>
                <ReadMore>{t('blog.readFullArticle')}</ReadMore>
              </BlogContent>
            </BlogCard>
          ))}
        </BlogGrid>
      </Container>
    </>
  )
}

export default BlogPage

