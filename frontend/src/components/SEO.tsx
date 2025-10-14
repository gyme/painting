import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getAlternateUrls } from '../i18n'

interface SEOProps {
  title: string
  description: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
}

function SEO({ 
  title, 
  description, 
  keywords = 'coloring pages, kids coloring, printable coloring sheets, free coloring pages, children activities',
  image = '/og-image.png',
  url = window.location.href,
  type = 'website'
}: SEOProps) {
  
  const { i18n } = useTranslation()
  const location = useLocation()
  const siteName = 'mycolor.fun'
  const fullTitle = `${title} | ${siteName}`
  const currentLanguage = i18n.language
  const baseUrl = window.location.origin
  
  useEffect(() => {
    // Update document title
    document.title = fullTitle
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name'
      let element = document.querySelector(`meta[${attribute}="${name}"]`)
      
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.appendChild(element)
      }
      
      element.setAttribute('content', content)
    }
    
    // Update or create link tags (for hreflang)
    const updateLinkTag = (rel: string, href: string, hreflang?: string) => {
      const selector = hreflang 
        ? `link[rel="${rel}"][hreflang="${hreflang}"]`
        : `link[rel="${rel}"]`
      
      let element = document.querySelector(selector) as HTMLLinkElement
      
      if (!element) {
        element = document.createElement('link')
        element.setAttribute('rel', rel)
        if (hreflang) {
          element.setAttribute('hreflang', hreflang)
        }
        document.head.appendChild(element)
      }
      
      element.setAttribute('href', href)
    }
    
    // Standard meta tags
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)
    updateMetaTag('language', currentLanguage)
    
    // Open Graph tags with language
    updateMetaTag('og:title', fullTitle, true)
    updateMetaTag('og:description', description, true)
    updateMetaTag('og:type', type, true)
    updateMetaTag('og:url', url, true)
    updateMetaTag('og:image', image.startsWith('http') ? image : `${baseUrl}${image}`, true)
    updateMetaTag('og:site_name', siteName, true)
    updateMetaTag('og:locale', currentLanguage === 'es' ? 'es_ES' : 'en_US', true)
    
    // Add alternate locales
    if (currentLanguage === 'en') {
      updateMetaTag('og:locale:alternate', 'es_ES', true)
    } else {
      updateMetaTag('og:locale:alternate', 'en_US', true)
    }
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', fullTitle)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', image.startsWith('http') ? image : `${baseUrl}${image}`)
    
    // Additional SEO tags
    updateMetaTag('robots', 'index, follow')
    updateMetaTag('author', siteName)
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0')
    
    // Add hreflang tags for bilingual SEO
    const alternateUrls = getAlternateUrls(location.pathname)
    
    // Canonical URL (current language)
    updateLinkTag('canonical', `${baseUrl}${url.replace(baseUrl, '')}`)
    
    // Hreflang for English
    updateLinkTag('alternate', `${baseUrl}${alternateUrls.en}`, 'en')
    
    // Hreflang for Spanish
    updateLinkTag('alternate', `${baseUrl}${alternateUrls.es}`, 'es')
    
    // x-default (usually points to English)
    updateLinkTag('alternate', `${baseUrl}${alternateUrls.en}`, 'x-default')
    
  }, [fullTitle, description, keywords, image, url, type, siteName, currentLanguage, location.pathname, baseUrl])
  
  return null
}

export default SEO
