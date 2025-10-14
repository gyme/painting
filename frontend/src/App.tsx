import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import Header from './components/Header'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import LanguageRouteSync from './components/LanguageRouteSync'

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'))
const PaintingPage = lazy(() => import('./pages/PaintingPage'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const TermsOfServicePage = lazy(() => import('./pages/TermsOfServicePage'))
const ContactUsPage = lazy(() => import('./pages/ContactUsPage'))
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'))
const CopyrightPage = lazy(() => import('./pages/CopyrightPage'))

// Collection/Listicle pages
const TopAnimalsPage = lazy(() => import('./pages/TopAnimalsPage'))
const TopVehiclesPage = lazy(() => import('./pages/TopVehiclesPage'))
const BestForToddlersPage = lazy(() => import('./pages/BestForToddlersPage'))
const MostPopularPage = lazy(() => import('./pages/MostPopularPage'))
const EasyColoringPage = lazy(() => import('./pages/EasyColoringPage'))
const RandomPage = lazy(() => import('./pages/RandomPage'))

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow-x: hidden;
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

function LoadingIndicator() {
  const { t } = useTranslation()
  return <LoadingFallback>🎨 {t('page.loading')} ✨</LoadingFallback>
}

function App() {
  return (
    <Router>
      <LanguageRouteSync />
      <AppContainer>
        <Header />
        <ErrorBoundary>
          <Suspense fallback={<LoadingIndicator />}>
            <main id="main-content" role="main">
            <Routes>
              {/* English routes (default) */}
              <Route path="/" element={<HomePage />} />
              <Route path="/random" element={<RandomPage />} />
              <Route path="/painting/:urlKey" element={<PaintingPage />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              
              {/* Collection/Listicle Pages */}
              <Route path="/top-animal-coloring-pages" element={<TopAnimalsPage />} />
              <Route path="/top-vehicle-coloring-pages" element={<TopVehiclesPage />} />
              <Route path="/best-coloring-pages-for-toddlers" element={<BestForToddlersPage />} />
              <Route path="/most-popular-coloring-pages" element={<MostPopularPage />} />
              <Route path="/easy-coloring-pages" element={<EasyColoringPage />} />
              
              {/* Static Pages */}
              <Route path="/terms" element={<TermsOfServicePage />} />
              <Route path="/contact" element={<ContactUsPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/copyright" element={<CopyrightPage />} />
              
              {/* Spanish routes (/es/ prefix) - Same components, different URLs for SEO */}
              <Route path="/es" element={<HomePage />} />
              <Route path="/es/random" element={<RandomPage />} />
              <Route path="/es/painting/:urlKey" element={<PaintingPage />} />
              <Route path="/es/category/:category" element={<CategoryPage />} />
              <Route path="/es/blog" element={<BlogPage />} />
              <Route path="/es/blog/:slug" element={<BlogPostPage />} />
              
              {/* Spanish Collection/Listicle Pages */}
              <Route path="/es/top-animal-coloring-pages" element={<TopAnimalsPage />} />
              <Route path="/es/top-vehicle-coloring-pages" element={<TopVehiclesPage />} />
              <Route path="/es/best-coloring-pages-for-toddlers" element={<BestForToddlersPage />} />
              <Route path="/es/most-popular-coloring-pages" element={<MostPopularPage />} />
              <Route path="/es/easy-coloring-pages" element={<EasyColoringPage />} />
              
              {/* Spanish Static Pages */}
              <Route path="/es/terms" element={<TermsOfServicePage />} />
              <Route path="/es/contact" element={<ContactUsPage />} />
              <Route path="/es/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/es/copyright" element={<CopyrightPage />} />
              
              {/* 404 - Must be last */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            </main>
          </Suspense>
        </ErrorBoundary>
        <Footer />
      </AppContainer>
    </Router>
  )
}

export default App
