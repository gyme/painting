import { useEffect } from 'react'

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
  
  const siteName = 'mycolor.fun'
  const fullTitle = `${title} | ${siteName}`
  
  useEffect(() => {
    // Update document title
    document.title = fullTitle
    
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
    
    // Standard meta tags
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)
    
    // Open Graph tags
    updateMetaTag('og:title', fullTitle, true)
    updateMetaTag('og:description', description, true)
    updateMetaTag('og:type', type, true)
    updateMetaTag('og:url', url, true)
    updateMetaTag('og:image', image.startsWith('http') ? image : `${window.location.origin}${image}`, true)
    updateMetaTag('og:site_name', siteName, true)
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', fullTitle)
    updateMetaTag('twitter:description', description)
    updateMetaTag('twitter:image', image.startsWith('http') ? image : `${window.location.origin}${image}`)
    
    // Additional SEO tags
    updateMetaTag('robots', 'index, follow')
    updateMetaTag('author', siteName)
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0')
    
  }, [fullTitle, description, keywords, image, url, type, siteName])
  
  return null
}

export default SEO
