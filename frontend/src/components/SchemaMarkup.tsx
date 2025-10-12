import { Helmet } from 'react-helmet'

interface CreativeWorkSchema {
  type: 'CreativeWork'
  name: string
  image: string
  description: string
  author: string
  datePublished?: string
  keywords?: string
}

interface ArticleSchema {
  type: 'Article'
  headline: string
  image: string
  author: string
  publisher: {
    name: string
    logo: string
  }
  datePublished: string
  dateModified?: string
  description: string
}

interface WebsiteSchema {
  type: 'Website'
  name: string
  url: string
  description: string
  potentialAction?: {
    type: 'SearchAction'
    target: string
    query: string
  }
}

type SchemaProps = CreativeWorkSchema | ArticleSchema | WebsiteSchema

/**
 * Schema Markup Component for SEO
 * 
 * Adds JSON-LD structured data to help search engines understand your content
 * Results in rich snippets in Google search results
 */
function SchemaMarkup(props: SchemaProps) {
  let schema: any = {}

  if (props.type === 'CreativeWork') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      'name': props.name,
      'image': props.image,
      'description': props.description,
      'author': {
        '@type': 'Organization',
        'name': props.author
      },
      'datePublished': props.datePublished || new Date().toISOString(),
      'keywords': props.keywords || ''
    }
  } else if (props.type === 'Article') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': props.headline,
      'image': props.image,
      'author': {
        '@type': 'Organization',
        'name': props.author
      },
      'publisher': {
        '@type': 'Organization',
        'name': props.publisher.name,
        'logo': {
          '@type': 'ImageObject',
          'url': props.publisher.logo
        }
      },
      'datePublished': props.datePublished,
      'dateModified': props.dateModified || props.datePublished,
      'description': props.description
    }
  } else if (props.type === 'Website') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': props.name,
      'url': props.url,
      'description': props.description
    }

    if (props.potentialAction) {
      schema.potentialAction = {
        '@type': 'SearchAction',
        'target': props.potentialAction.target,
        'query-input': props.potentialAction.query
      }
    }
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}

export default SchemaMarkup

