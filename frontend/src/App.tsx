import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import styled from 'styled-components'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import PaintingPage from './pages/PaintingPage'
import CategoryPage from './pages/CategoryPage'

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`

function App() {
  return (
    <Router>
      <AppContainer>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/painting/:urlKey" element={<PaintingPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
        </Routes>
      </AppContainer>
    </Router>
  )
}

export default App
