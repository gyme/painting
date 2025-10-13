import { Link } from 'react-router-dom'
import styled from 'styled-components'
import SEO from '../components/SEO'
import Breadcrumbs from '../components/Breadcrumbs'

const Container = styled.div`
  max-width: 1200px;
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
  
  ul {
    margin: 1rem 0;
    padding-left: 2rem;
    
    li {
      color: #555;
      line-height: 1.8;
      margin-bottom: 0.75rem;
    }
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

function TopVehiclesPage() {
  return (
    <>
      <SEO
        title="Top 15 Vehicle Coloring Pages for Kids - Cars, Trucks & More"
        description="Discover the top 15 most popular vehicle coloring pages! Cars, trucks, trains, planes, and more transportation favorites kids love to color."
        keywords="top vehicle coloring pages, best car coloring, truck coloring pages, transportation coloring, kids vehicle coloring"
      />
      
      <Container>
        <Breadcrumbs items={[
          { label: 'Home', path: '/' },
          { label: 'Top Vehicle Coloring Pages' }
        ]} />
        
        <Hero>
          <Title>🚗 Top 15 Vehicle Coloring Pages</Title>
          <Subtitle>
            The most popular vehicle coloring pages - perfect for kids who love things that go!
          </Subtitle>
        </Hero>

        <Content>
          <p>
            Vehicle coloring pages are the #2 most requested theme! From race cars to fire trucks, 
            these top 15 vehicle pages are our most downloaded transportation coloring sheets. Perfect 
            for kids fascinated by how things move!
          </p>

          <h2>Our Top 15 Vehicle Coloring Pages</h2>

          <h3>1. Race Car 🏎️</h3>
          <p><strong>Fast, sleek, and exciting!</strong> Racing stripes and number customization make this a favorite.</p>

          <h3>2. Fire Truck 🚒</h3>
          <p><strong>Heroes on wheels!</strong> Ladder, hoses, and red color scheme kids know and love.</p>

          <h3>3. Police Car 🚓</h3>
          <p><strong>Protect and serve!</strong> Lights, sirens, and emergency vehicle appeal.</p>

          <h3>4. Monster Truck 🚙</h3>
          <p><strong>Big wheels, big fun!</strong> Oversized tires and powerful appearance.</p>

          <h3>5. School Bus 🚌</h3>
          <p><strong>Familiar and friendly!</strong> Kids ride these every day—personal connection.</p>

          <h3>6. Train Engine 🚂</h3>
          <p><strong>Classic transportation!</strong> Detailed engine with steam or modern features.</p>

          <h3>7. Airplane ✈️</h3>
          <p><strong>Soaring through the sky!</strong> Wings, propellers, and adventure appeal.</p>

          <h3>8. Dump Truck 🚛</h3>
          <p><strong>Construction power!</strong> Lifting bed and heavy-duty appearance.</p>

          <h3>9. Ambulance 🚑</h3>
          <p><strong>Life-saving vehicle!</strong> Medical symbols and emergency vehicle features.</p>

          <h3>10. Rocket Ship 🚀</h3>
          <p><strong>Space exploration!</strong> Futuristic design and space travel dreams.</p>

          <h3>11. Tractor 🚜</h3>
          <p><strong>Farm machinery!</strong> Big wheels and agricultural connection.</p>

          <h3>12. Motorcycle 🏍️</h3>
          <p><strong>Two-wheeled adventure!</strong> Cool factor with detailed bike design.</p>

          <h3>13. Boat/Ship ⛵</h3>
          <p><strong>Water transportation!</strong> Sails or motor, ocean adventures.</p>

          <h3>14. Helicopter 🚁</h3>
          <p><strong>Flying marvel!</strong> Rotating blades and hovering ability.</p>

          <h3>15. Construction Crane 🏗️</h3>
          <p><strong>Building big things!</strong> Mechanical details and construction appeal.</p>

          <h2>Why Vehicle Coloring Pages Are Popular</h2>
          <ul>
            <li>Children see these vehicles in everyday life</li>
            <li>Teach about different jobs and professions</li>
            <li>Mechanical details perfect for older kids</li>
            <li>Especially popular with boys ages 3-8</li>
            <li>Connect to favorite TV shows and toys</li>
          </ul>

          <CTAButton to="/category/Vehicles">
            Browse All Vehicle Coloring Pages →
          </CTAButton>

          <p><strong>Ready to color?</strong> Explore our complete vehicle collection with even more options!</p>
        </Content>
      </Container>
    </>
  )
}

export default TopVehiclesPage

