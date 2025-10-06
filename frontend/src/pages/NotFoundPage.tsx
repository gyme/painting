import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div`
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`

const Content = styled.div`
  max-width: 600px;
  width: 100%;
  background: white;
  border-radius: 30px;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    padding: 2rem;
    border-radius: 20px;
  }
`

const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: 900;
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 5rem;
  }
`

const ColoringImage = styled.div`
  margin: 2rem 0;
  
  svg {
    width: 200px;
    height: 200px;
    animation: float 3s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }
  
  @media (max-width: 768px) {
    svg {
      width: 150px;
      height: 150px;
    }
  }
`

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  margin: 1rem 0 0.5rem 0;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

const Message = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin: 1rem 0 2rem 0;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
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
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }
`

const SecondaryButton = styled(Button)`
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  box-shadow: 0 4px 15px rgba(240, 147, 251, 0.4);
  
  &:hover {
    box-shadow: 0 6px 20px rgba(240, 147, 251, 0.6);
  }
`

const SadCrayonSVG = () => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    {/* Crayon body */}
    <path
      d="M 100 40 L 110 60 L 110 170 Q 105 180 100 180 Q 95 180 90 170 L 90 60 Z"
      fill="#FF6B6B"
      stroke="#000"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    
    {/* Crayon tip */}
    <path
      d="M 100 20 L 110 60 L 90 60 Z"
      fill="#FFD93D"
      stroke="#000"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    
    {/* Label */}
    <rect
      x="90"
      y="80"
      width="20"
      height="30"
      fill="white"
      stroke="#000"
      strokeWidth="2"
      rx="2"
    />
    
    {/* Sad face on crayon */}
    <circle cx="95" cy="120" r="3" fill="#000" />
    <circle cx="105" cy="120" r="3" fill="#000" />
    <path
      d="M 93 135 Q 100 130 107 135"
      fill="none"
      stroke="#000"
      strokeWidth="2"
      strokeLinecap="round"
    />
    
    {/* Tear drop */}
    <path
      d="M 108 122 Q 112 130 108 135 Q 106 133 108 122"
      fill="#87CEEB"
      stroke="#000"
      strokeWidth="1.5"
    />
  </svg>
)

function NotFoundPage() {
  return (
    <Container>
      <Content>
        <ErrorCode>404</ErrorCode>
        
        <ColoringImage>
          <SadCrayonSVG />
        </ColoringImage>
        
        <Title>Oops! This Page is Missing!</Title>
        
        <Message>
          Looks like this coloring page ran away! 🎨<br />
          Don't worry, we have plenty of other amazing pictures to color!
        </Message>
        
        <ButtonContainer>
          <Button to="/">
            🏠 Back to Gallery
          </Button>
          <SecondaryButton to="/category/Animals">
            🐾 Browse Animals
          </SecondaryButton>
        </ButtonContainer>
      </Content>
    </Container>
  )
}

export default NotFoundPage
