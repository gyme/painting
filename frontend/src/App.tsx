import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import styled from 'styled-components'
import Header from './components/Header'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'))
const PaintingPage = lazy(() => import('./pages/PaintingPage'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage'))
const ContactUsPage = lazy(() => import('./pages/ContactUsPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`

const LoadingFallback = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  font-size: 2rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`

function App() {
  return (
    <Router>
      <AppContainer>
        <Header />
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback>🎨 Loading... ✨</LoadingFallback>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/painting/:urlKey" element={<PaintingPage />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/terms" element={<TermsOfServicePage />} />
              <Route path="/contact" element={<ContactUsPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <Footer />
      </AppContainer>
    </Router>
  )
}

export default App
