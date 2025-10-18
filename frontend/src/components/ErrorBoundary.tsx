import React, { Component, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { withTranslation, WithTranslation } from 'react-i18next'

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

const ErrorEmoji = styled.div`
  font-size: 5rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`

const Title = styled.h1`
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

interface Props extends WithTranslation {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    const { t } = this.props
    
    if (this.state.hasError) {
      return (
        <Container>
          <Content>
            <ErrorEmoji>😢</ErrorEmoji>
            
            <Title>{t('errorBoundary.title')}</Title>
            
            <Message>
              {t('errorBoundary.message')}
            </Message>
            
            <Button to="/" onClick={() => window.location.reload()}>
              🏠 {t('errorBoundary.backToHome')}
            </Button>
          </Content>
        </Container>
      )
    }

    return this.props.children
  }
}

export default withTranslation()(ErrorBoundary)
