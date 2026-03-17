import type { PostMeta } from '@/types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bugworld.vercel.app'
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'BugWorld - Entomology Blog'

export function generateMetadata(options: {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedAt?: string
  author?: string
}) {
  const {
    title = SITE_NAME,
    description = 'Explore the hidden world of insects. Expert articles on entomology, insect behavior, ecology, and more.',
    image = `${SITE_URL}/og-default.jpg`,
    url = SITE_URL,
    type = 'website',
    publishedAt,
    author,
  } = options

  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      type,
      ...(publishedAt && { publishedTime: publishedAt }),
      ...(author && { authors: [author] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  }
}

export function generateArticleSchema(post: PostMeta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
  }
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Expert entomology blog covering insect behavior, ecology, and fascinating facts',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}
