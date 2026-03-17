import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { unified } from 'unified'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import remarkParse from 'remark-parse'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeStringify from 'rehype-stringify'
import type { Post, PostMeta, TOCItem } from '@/types'

const ARTICLES_DIR = path.join(process.cwd(), 'content/articles')

// Ensure articles directory exists
if (!fs.existsSync(ARTICLES_DIR)) {
  fs.mkdirSync(ARTICLES_DIR, { recursive: true })
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return []
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
}

export function getAllPosts(): PostMeta[] {
  const slugs = getAllPostSlugs()
  return slugs
    .map((slug) => getPostMeta(slug))
    .filter((post): post is PostMeta => post !== null)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export function getPostMeta(slug: string): PostMeta | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  const stats = readingTime(content)

  return {
    slug,
    title: data.title || 'Untitled',
    excerpt: data.excerpt || '',
    coverImage: data.coverImage || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    category: data.category || 'Fascinating Facts',
    tags: data.tags || [],
    author: data.author || {
      name: 'Dr. Elena Marsh',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
      bio: 'Entomologist and science writer.',
      role: 'Lead Entomologist & Editor',
    },
    publishedAt: data.publishedAt || new Date().toISOString(),
    updatedAt: data.updatedAt,
    readingTime: stats.text,
    featured: data.featured || false,
    metaTitle: data.metaTitle,
    metaDescription: data.metaDescription,
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  const stats = readingTime(content)

  // Process markdown to HTML with syntax highlighting
  const processedContent = await unified()
    .use(remarkParse as any)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: 'wrap' })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)

  return {
    slug,
    title: data.title || 'Untitled',
    excerpt: data.excerpt || '',
    content: processedContent.toString(),
    coverImage: data.coverImage || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    category: data.category || 'Fascinating Facts',
    tags: data.tags || [],
    author: data.author || {
      name: 'Dr. Elena Marsh',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
      bio: 'Entomologist and science writer.',
      role: 'Lead Entomologist & Editor',
    },
    publishedAt: data.publishedAt || new Date().toISOString(),
    updatedAt: data.updatedAt,
    readingTime: stats.text,
    featured: data.featured || false,
    metaTitle: data.metaTitle,
    metaDescription: data.metaDescription,
    affiliateLinks: data.affiliateLinks || [],
  }
}

export function getFeaturedPosts(count = 3): PostMeta[] {
  const allPosts = getAllPosts()
  const featured = allPosts.filter((p) => p.featured)
  if (featured.length >= count) return featured.slice(0, count)
  // Fill with latest posts if not enough featured
  const latestNonFeatured = allPosts.filter((p) => !p.featured)
  return [...featured, ...latestNonFeatured].slice(0, count)
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  )
}

export function getRelatedPosts(slug: string, category: string, limit = 3): PostMeta[] {
  return getAllPosts()
    .filter((p) => p.slug !== slug && p.category === category)
    .slice(0, limit)
}

export function extractTOC(content: string): TOCItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const toc: TOCItem[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].replace(/[*_`]/g, '')
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    toc.push({ id, text, level })
  }

  return toc
}

export function getPostRawContent(slug: string): string | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  return fs.readFileSync(filePath, 'utf-8')
}
