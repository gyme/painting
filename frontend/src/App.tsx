import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import Header from './components/Header'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import HomePage from './pages/HomePage'
import PaintingPage from './pages/PaintingPage'
import CategoryPage from './pages/CategoryPage'
import NotFoundPage from './pages/NotFoundPage'
import TermsOfServicePage from './pages/TermsOfServicePage'
import ContactUsPage from './pages/ContactUsPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`

function App() {
  return (
    <Router>
      <AppContainer>
        <Header />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/painting/:urlKey" element={<PaintingPage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ErrorBoundary>
        <Footer />
      </AppContainer>
    </Router>
  )
}

export default App
