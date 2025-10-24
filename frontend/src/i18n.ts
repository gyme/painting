import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enTranslation from './locales/en/translation.json'
import esTranslation from './locales/es/translation.json'

// the translations
const resources = {
  en: {
    translation: enTranslation
  },
  es: {
    translation: esTranslation
  }
}

// Custom path-based language detector for SEO-friendly URLs
const pathLanguageDetector = {
  name: 'path',
  lookup(): string | undefined {
    const path = window.location.pathname
    // Check if path starts with /es/
    if (path.startsWith('/es/') || path === '/es') {
      return 'es'
    }
    // Default to undefined (will use next detector in order)
    return undefined
  },
  cacheUserLanguage() {
    // Don't cache from path detector - use localStorage detector for that
  }
}

// Create language detector instance and add custom detector
const languageDetector = new LanguageDetector()
languageDetector.addDetector(pathLanguageDetector)

i18n
  // detect user language with custom path detector
  .use(languageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: 'en', // default language is English
    // Don't set lng - let detection handle it
    debug: false,
    
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    
    detection: {
      // order and from where user language should be detected
      // PATH FIRST for SEO-friendly URLs (but LanguageRouteSync will override)
      order: ['path', 'navigator', 'htmlTag'],
      
      // keys or params to lookup language from
      lookupLocalStorage: 'i18nextLng',
      
      // Don't cache automatically - LanguageRouteSync handles this
      caches: [],
      excludeCacheFor: ['cimode'] // languages to not persist (cookie, localStorage)
    }
  })

export default i18n

// Export available languages for easy reference
export const availableLanguages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' }
]

// Helper function to get language prefix for URLs
export const getLanguagePrefix = (lang?: string): string => {
  const language = lang || i18n.language
  return language === 'es' ? '/es' : ''
}

// Helper function to get localized path
export const getLocalizedPath = (path: string, lang?: string): string => {
  const language = lang || i18n.language
  // Remove any existing language prefix
  const cleanPath = path.replace(/^\/(es|en)/, '')
  // Add language prefix for Spanish
  return language === 'es' ? `/es${cleanPath}` : cleanPath
}

// Helper to get alternate language URLs for hreflang tags
export const getAlternateUrls = (currentPath: string) => {
  // Remove language prefix if exists
  const cleanPath = currentPath.replace(/^\/(es|en)/, '')
  
  return {
    en: cleanPath || '/',
    es: `/es${cleanPath || '/'}`
  }
}

/*
 * TO ADD A NEW LANGUAGE:
 * 
 * 1. Create a new translation file:
 *    - Copy /src/locales/en/translation.json
 *    - Create /src/locales/[language-code]/translation.json
 *    - Translate all the keys
 * 
 * 2. Import the translation at the top of this file:
 *    import [languageCode]Translation from './locales/[language-code]/translation.json'
 * 
 * 3. Add it to the resources object:
 *    [languageCode]: {
 *      translation: [languageCode]Translation
 *    }
 * 
 * 4. Add it to availableLanguages array:
 *    { code: '[languageCode]', name: '[Language Name]', nativeName: '[Native Language Name]' }
 * 
 * 5. Update getLanguagePrefix() and getLocalizedPath() helpers
 * 
 * That's it! The language will automatically be available in the language switcher.
 * 
 * Example for French:
 * 1. Create /src/locales/fr/translation.json
 * 2. import frTranslation from './locales/fr/translation.json'
 * 3. fr: { translation: frTranslation }
 * 4. { code: 'fr', name: 'French', nativeName: 'Français' }
 * 5. Add /fr prefix handling
 */
