import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

/**
 * Component that synchronizes the i18n language with the current route
 * Detects /es/ prefix and automatically switches language
 * ALWAYS prioritizes URL path over localStorage
 */
function LanguageRouteSync() {
  const location = useLocation()
  const { i18n } = useTranslation()

  useEffect(() => {
    // Check if the current path starts with /es/
    const isSpanish = location.pathname.startsWith('/es/') || location.pathname === '/es'
    const targetLanguage = isSpanish ? 'es' : 'en'
    
    // ALWAYS force the language based on URL (ignore localStorage)
    // This ensures /es/ URLs always show Spanish
    if (i18n.language !== targetLanguage) {
      console.log(`🌍 URL-based language detection: ${location.pathname} → ${targetLanguage}`)
      i18n.changeLanguage(targetLanguage)
    }
    
    // Also update localStorage to keep it in sync
    localStorage.setItem('i18nextLng', targetLanguage)
  }, [location.pathname, i18n])

  // This component doesn't render anything
  return null
}

export default LanguageRouteSync

