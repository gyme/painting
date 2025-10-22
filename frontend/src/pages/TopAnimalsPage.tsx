import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'

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
    font-size: 2rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: white;
  max-width: 700px;
  margin: 0 auto;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`

const Content = styled.div`
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  h2 {
    font-size: 2rem;
    color: #333;
    margin: 2rem 0 1rem 0;
    
    &:first-of-type {
      margin-top: 0;
    }
  }
  
  h3 {
    font-size: 1.5rem;
    color: #444;
    margin: 1.5rem 0 0.75rem 0;
  }
  
  p {
    color: #666;
    line-height: 1.8;
    margin-bottom: 1rem;
  }
  
  ul, ol {
    margin: 1rem 0;
    padding-left: 2rem;
    
    li {
      color: #555;
      line-height: 1.8;
      margin-bottom: 0.75rem;
      
      strong {
        color: #333;
      }
    }
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const CTAButton = styled(Link)`
  display: inline-block;
  margin: 2rem 0;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  }
`

function TopAnimalsPage() {
  const { t } = useTranslation()
  
  return (
    <>
      <SEO
        title="Top 20 Animal Coloring Pages for Kids - Most Popular Choices"
        description="Discover the top 20 most popular animal coloring pages! From cute puppies to wild lions, find the best animal coloring sheets kids love most."
        keywords="top animal coloring pages, best animal coloring, popular animal coloring sheets, kids animal coloring, favorite animal pages"
      />
      
      <Container>
        <Breadcrumbs items={[
          { label: 'Home', path: '/' },
          { label: 'Top Animal Coloring Pages' }
        ]} />
        
        <Hero>
          <Title>🐶 {t('collections.animals.pageTitle')}</Title>
          <Subtitle>
            The most popular animal coloring pages loved by kids worldwide!
          </Subtitle>
        </Hero>

        <Content>
          <p>
            Animals are the #1 most requested coloring theme! From adorable pets to majestic wild creatures, 
            these top 20 animal coloring pages are our most downloaded and highest-rated. Perfect for animal-loving 
            kids of all ages!
          </p>

          <h2>Why Animal Coloring Pages Are So Popular</h2>
          <ul>
            <li><strong>Universal Appeal:</strong> Every child has favorite animals they want to color</li>
            <li><strong>Educational Value:</strong> Learn about different species, habitats, and characteristics</li>
            <li><strong>Emotional Connection:</strong> Children form bonds with animals through coloring</li>
            <li><strong>Variety:</strong> From cute and cuddly to fierce and wild</li>
            <li><strong>Color Practice:</strong> Real animal colors teach observation skills</li>
          </ul>

          <h2>Our Top 20 Most Popular Animal Coloring Pages</h2>

          <h3>1. Puppy Dog 🐕</h3>
          <p>
            <strong>Why Kids Love It:</strong> Adorable and relatable—most kids know and love dogs!<br/>
            <strong>Age Range:</strong> 2-8 years<br/>
            <strong>Difficulty:</strong> Easy to Medium
          </p>

          <h3>2. Cute Kitten 🐱</h3>
          <p>
            <strong>Why Kids Love It:</strong> Sweet, cuddly, and fun to add personality with colors.<br/>
            <strong>Age Range:</strong> 2-8 years<br/>
            <strong>Difficulty:</strong> Easy to Medium
          </p>

          <h3>3. Majestic Lion 🦁</h3>
          <p>
            <strong>Why Kids Love It:</strong> The king of the jungle! Impressive mane to color creatively.<br/>
            <strong>Age Range:</strong> 4-10 years<br/>
            <strong>Difficulty:</strong> Medium to Challenging
          </p>

          <h3>4. Playful Dolphin 🐬</h3>
          <p>
            <strong>Why Kids Love It:</strong> Friendly, intelligent, and associated with fun ocean adventures.<br/>
            <strong>Age Range:</strong> 3-10 years<br/>
            <strong>Difficulty:</strong> Easy to Medium
          </p>

          <h3>5. Gentle Elephant 🐘</h3>
          <p>
            <strong>Why Kids Love It:</strong> Large, gentle giants with fun details like big ears and trunk.<br/>
            <strong>Age Range:</strong> 3-10 years<br/>
            <strong>Difficulty:</strong> Medium
          </p>

          <h3>6. Colorful Butterfly 🦋</h3>
          <p>
            <strong>Why Kids Love It:</strong> Symmetrical wings perfect for creative color combinations.<br/>
            <strong>Age Range:</strong> 3-10 years<br/>
            <strong>Difficulty:</strong> Easy to Challenging (depending on detail)
          </p>

          <h3>7. Tall Giraffe 🦒</h3>
          <p>
            <strong>Why Kids Love It:</strong> Unique spots pattern and impressive height.<br/>
            <strong>Age Range:</strong> 3-10 years<br/>
            <strong>Difficulty:</strong> Medium
          </p>

          <h3>8. Cute Bunny Rabbit 🐰</h3>
          <p>
            <strong>Why Kids Love It:</strong> Soft, fluffy, and associated with Easter and spring.<br/>
            <strong>Age Range:</strong> 2-8 years<br/>
            <strong>Difficulty:</strong> Easy to Medium
          </p>

          <h3>9. Fierce Tiger 🐯</h3>
          <p>
            <strong>Why Kids Love It:</strong> Powerful and beautiful with distinctive stripes.<br/>
            <strong>Age Range:</strong> 4-10 years<br/>
            <strong>Difficulty:</strong> Medium to Challenging
          </p>

          <h3>10. Wise Owl 🦉</h3>
          <p>
            <strong>Why Kids Love It:</strong> Big eyes, interesting feather patterns, and wise appearance.<br/>
            <strong>Age Range:</strong> 4-10 years<br/>
            <strong>Difficulty:</strong> Medium
          </p>

          <h3>11. Happy Horse 🐴</h3>
          <p>
            <strong>Why Kids Love It:</strong> Graceful, strong, and many kids dream of riding horses.<br/>
            <strong>Age Range:</strong> 4-10 years<br/>
            <strong>Difficulty:</strong> Medium
          </p>

          <h3>12. Cuddly Bear 🐻</h3>
          <p>
            <strong>Why Kids Love It:</strong> Teddy bear associations make bears feel friendly and huggable.<br/>
            <strong>Age Range:</strong> 3-10 years<br/>
            <strong>Difficulty:</strong> Medium
          </p>

          <h3>13. Colorful Parrot 🦜</h3>
          <p>
            <strong>Why Kids Love It:</strong> Bright, rainbow-colored feathers are fun to recreate.<br/>
            <strong>Age Range:</strong> 4-10 years<br/>
            <strong>Difficulty:</strong> Medium to Challenging
          </p>

          <h3>14. Cute Penguin 🐧</h3>
          <p>
            <strong>Why Kids Love It:</strong> Adorable waddling birds in tuxedo-like coloring.<br/>
            <strong>Age Range:</strong> 3-10 years<br/>
            <strong>Difficulty:</strong> Easy to Medium
          </p>

          <h3>15. Friendly Fox 🦊</h3>
          <p>
            <strong>Why Kids Love It:</strong> Cute and clever with beautiful orange/red coloring.<br/>
            <strong>Age Range:</strong> 4-10 years<br/>
            <strong>Difficulty:</strong> Medium
          </p>

          <h3>16. Silly Monkey 🐵</h3>
          <p>
            <strong>Why Kids Love It:</strong> Fun, playful, and often shown in funny poses.<br/>
            <strong>Age Range:</strong> 3-10 years<br/>
            <strong>Difficulty:</strong> Medium
          </p>

          <h3>17. Striped Zebra 🦓</h3>
          <p>
            <strong>Why Kids Love It:</strong> Distinctive black and white stripes are visually striking.<br/>
            <strong>Age Range:</strong> 3-10 years<br/>
            <strong>Difficulty:</strong> Easy to Medium
          </p>

          <h3>18. Speedy Cheetah 🐆</h3>
          <p>
            <strong>Why Kids Love It:</strong> Fastest land animal with cool spots pattern.<br/>
            <strong>Age Range:</strong> 5-10 years<br/>
            <strong>Difficulty:</strong> Medium to Challenging
          </p>

          <h3>19. Sea Turtle 🐢</h3>
          <p>
            <strong>Why Kids Love It:</strong> Unique shell pattern and connection to ocean conservation.<br/>
            <strong>Age Range:</strong> 3-10 years<br/>
            <strong>Difficulty:</strong> Medium
          </p>

          <h3>20. Spotted Ladybug 🐞</h3>
          <p>
            <strong>Why Kids Love It:</strong> Small, cute, and simple—perfect for young colorers!<br/>
            <strong>Age Range:</strong> 2-8 years<br/>
            <strong>Difficulty:</strong> Easy
          </p>

          <h2>Tips for Coloring Animal Pages</h2>
          <ul>
            <li><strong>Research Real Colors:</strong> Look at photos to learn accurate animal coloring</li>
            <li><strong>Get Creative:</strong> It's also fun to use imaginative colors (purple elephants!)</li>
            <li><strong>Add Details:</strong> Shade fur texture, add highlights to eyes</li>
            <li><strong>Learn Facts:</strong> Research the animal while coloring to make it educational</li>
            <li><strong>Create Habitats:</strong> Add background scenes showing where the animal lives</li>
          </ul>

          <h2>Educational Benefits of Animal Coloring</h2>
          <p>
            Coloring animals isn't just fun—it's educational! Children learn:
          </p>
          <ul>
            <li>Animal names and characteristics</li>
            <li>Where different animals live (habitats)</li>
            <li>What animals eat (herbivores, carnivores, omnivores)</li>
            <li>Conservation and caring for wildlife</li>
            <li>Fine motor skills and color recognition</li>
          </ul>

          <CTAButton to="/category/Animals">
            Browse All Animal Coloring Pages →
          </CTAButton>

          <h2>Why Choose Our Animal Coloring Pages?</h2>
          <ul>
            <li>✅ <strong>100% Free:</strong> No subscription or payment required</li>
            <li>✅ <strong>High Quality:</strong> Clear lines perfect for coloring</li>
            <li>✅ <strong>Printable:</strong> Optimized for home printing</li>
            <li>✅ <strong>Age-Appropriate:</strong> Options for all skill levels</li>
            <li>✅ <strong>Educational:</strong> Learn while creating art</li>
          </ul>

          <p>
            <strong>Ready to start coloring?</strong> Browse our complete collection of animal coloring pages 
            and find even more favorites!
          </p>

          <CTAButton to="/category/Animals">
            Explore Animal Coloring Pages
          </CTAButton>
        </Content>
      </Container>
    </>
  )
}

export default TopAnimalsPage

