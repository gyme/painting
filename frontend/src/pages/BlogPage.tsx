import { Link } from 'react-router-dom'
import styled from 'styled-components'
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

const BlogCard = styled(Link)`
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
    excerpt: 'Discover how coloring pages boost cognitive development, fine motor skills, and creativity in children aged 2-10.',
    date: 'October 12, 2025',
    readTime: '5 min read',
    emoji: '🎨',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 'coloring-child-development',
    title: 'How Coloring Supports Child Development: A Complete Guide',
    excerpt: 'Learn about the science behind coloring and its impact on emotional intelligence, concentration, and hand-eye coordination.',
    date: 'October 12, 2025',
    readTime: '7 min read',
    emoji: '🧠',
    color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    id: 'coloring-stress-relief-kids',
    title: 'Coloring as Stress Relief: Why Kids Need It More Than Ever',
    excerpt: 'In our digital age, coloring provides essential screen-free time and helps children manage anxiety and stress.',
    date: 'October 12, 2025',
    readTime: '6 min read',
    emoji: '😌',
    color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  }
]

function BlogPage() {
  return (
    <>
      <SEO 
        title="Coloring Pages Blog - Tips, Benefits & Educational Resources"
        description="Discover the educational benefits of coloring, child development tips, and expert advice on using coloring pages for learning and creativity."
        keywords="coloring benefits, child development, educational coloring, kids activities, parenting tips"
      />
      
      <Container>
        <Hero>
          <Title>✏️ Coloring Pages Blog</Title>
          <Subtitle>
            Expert insights on how coloring pages benefit child development, education, and creativity
          </Subtitle>
        </Hero>

        <BlogGrid>
          {blogPosts.map(post => (
            <BlogCard key={post.id} to={`/blog/${post.id}`}>
              <BlogImage $color={post.color}>
                {post.emoji}
              </BlogImage>
              <BlogContent>
                <BlogTitle>{post.title}</BlogTitle>
                <BlogMeta>
                  <span>📅 {post.date}</span>
                  <span>⏱️ {post.readTime}</span>
                </BlogMeta>
                <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                <ReadMore>Read full article</ReadMore>
              </BlogContent>
            </BlogCard>
          ))}
        </BlogGrid>
      </Container>
    </>
  )
}

export default BlogPage

