import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import LocalizedLink from './LocalizedLink'

const BreadcrumbContainer = styled.nav`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  background: #f8f9fa;
  border-radius: 10px;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    border-radius: 8px;
    background: #f8f9fa;
    gap: 0.25rem;
  }
`

const BreadcrumbLink = styled(LocalizedLink)`
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #764ba2;
    text-decoration: underline;
  }
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
    font-weight: 500;
  }
`

const BreadcrumbText = styled.span`
  color: #2d3748;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
    font-weight: 600;
  }
`

const Separator = styled.span`
  color: #a0aec0;
  margin: 0 0.5rem;
  
  @media (max-width: 768px) {
    margin: 0 0.25rem;
    font-size: 0.875rem;
  }
`

interface Breadcrumb {
  label: string
  path?: string
}

interface BreadcrumbsProps {
  items?: Breadcrumb[]
}

function Breadcrumbs({ items }: BreadcrumbsProps) {
  const location = useLocation()
  const { t } = useTranslation()

  // Helper to translate labels
  const translateLabel = (label: string): string => {
    // Translate "Home"
    if (label === 'Home') {
      return t('nav.home')
    }
    
    // Translate category names (Animals, Vehicles, Nature, etc.)
    const knownCategories = ['Animals', 'Vehicles', 'Nature', 'Characters', 'Fantasy', 'Food', 'Holidays', 'Sports', 'Space', 'Ocean', 'Dinosaurs', 'Fairy Tales', 'Mandalas']
    if (knownCategories.includes(label)) {
      return t(`categories.${label.toLowerCase()}`)
    }
    
    // Translate common routes
    if (label === 'Blog') {
      return t('nav.blog')
    }
    
    if (label === 'Contact') {
      return t('footer.contact')
    }
    
    if (label === 'Privacy') {
      return t('footer.privacy')
    }
    
    if (label === 'Terms') {
      return t('footer.terms')
    }
    
    // Default: return as is
    return label
  }

  // Auto-generate breadcrumbs if not provided
  const generateBreadcrumbs = (): Breadcrumb[] => {
    // Remove /es/ prefix from path for breadcrumb generation
    const cleanPath = location.pathname.replace(/^\/es/, '')
    const paths = cleanPath.split('/').filter(Boolean)
    const breadcrumbs: Breadcrumb[] = [{ label: 'Home', path: '/' }]

    let currentPath = ''
    paths.forEach((path, index) => {
      currentPath += `/${path}`
      const isLast = index === paths.length - 1

      // Capitalize and format the path
      let label = path
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      // Special formatting for common routes
      if (path === 'painting') {
        label = 'Coloring'
      }

      breadcrumbs.push({
        label,
        path: isLast ? undefined : currentPath
      })
    })

    return breadcrumbs
  }

  const breadcrumbs = items || generateBreadcrumbs()

  return (
    <BreadcrumbContainer>
      {breadcrumbs.map((crumb, index) => (
        <span key={index}>
          {index > 0 && <Separator>/</Separator>}
          {crumb.path ? (
            <BreadcrumbLink to={crumb.path}>{translateLabel(crumb.label)}</BreadcrumbLink>
          ) : (
            <BreadcrumbText>{translateLabel(crumb.label)}</BreadcrumbText>
          )}
        </span>
      ))}
    </BreadcrumbContainer>
  )
}

export default Breadcrumbs

