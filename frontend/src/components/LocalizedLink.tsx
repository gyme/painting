import { Link, LinkProps } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

/**
 * A wrapper around React Router's Link that automatically adds language prefix
 * Use this instead of Link to maintain language when navigating
 * 
 * Example:
 *   <LocalizedLink to="/blog">Blog</LocalizedLink>
 *   
 * When language is Spanish, automatically becomes:
 *   <Link to="/es/blog">Blog</Link>
 */
function LocalizedLink({ to, ...props }: LinkProps) {
  const { i18n } = useTranslation()
  
  // If 'to' is a string, add language prefix
  if (typeof to === 'string') {
    const prefix = i18n.language === 'es' ? '/es' : ''
    
    // Don't double-add prefix if already there
    const hasPrefix = to.startsWith('/es/') || to === '/es'
    
    const localizedTo = hasPrefix ? to : `${prefix}${to}`
    
    return <Link to={localizedTo} {...props} />
  }
  
  // If 'to' is an object, handle pathname
  if (typeof to === 'object' && to.pathname) {
    const prefix = i18n.language === 'es' ? '/es' : ''
    const hasPrefix = to.pathname.startsWith('/es/') || to.pathname === '/es'
    
    const localizedTo = {
      ...to,
      pathname: hasPrefix ? to.pathname : `${prefix}${to.pathname}`
    }
    
    return <Link to={localizedTo} {...props} />
  }
  
  // Fallback: use as-is
  return <Link to={to} {...props} />
}

export default LocalizedLink

