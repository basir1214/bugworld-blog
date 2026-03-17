import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getAllPostSlugs, getPost, getRelatedPosts, extractTOC } from '@/lib/posts'
import { formatDate, getCategoryEmoji } from '@/lib/utils'
import { generateMetadata as genMeta, generateArticleSchema } from '@/lib/seo'
import { Badge } from '@/components/ui/Badge'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { AuthorSection } from '@/components/blog/AuthorSection'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { AffiliateSection } from '@/components/blog/AffiliateSection'
import { AdUnit } from '@/components/ads/AdUnit'
import { Calendar, Clock, ChevronLeft, Tag } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bugworld.vercel.app'

  return genMeta({
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    image: post.coverImage,
    url: `${siteUrl}/blog/${post.slug}`,
    type: 'article',
    publishedAt: post.publishedAt,
    author: post.author.name,
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  const relatedPosts = getRelatedPosts(slug, post.category, 3)

  // Extract raw markdown content for TOC
  const { getPostRawContent } = await import('@/lib/posts')
  const rawContent = getPostRawContent(slug) || ''
  const toc = extractTOC(rawContent)

  const articleSchema = generateArticleSchema(post)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="pt-20">
        {/* Hero */}
        <div className="relative h-[50vh] md:h-[60vh] min-h-[400px] max-h-[600px]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="max-w-4xl mx-auto">
              <Badge variant="category" category={post.category} className="mb-4">
                {getCategoryEmoji(post.category)} {post.category}
              </Badge>
              <h1 className="font-serif font-bold text-3xl md:text-5xl text-white mb-4 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={28}
                    height={28}
                    className="rounded-full object-cover"
                  />
                  <span>{post.author.name}</span>
                </div>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readingTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-forest-600 dark:hover:text-forest-400 transition-colors mb-8"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to articles
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
              {/* Main content */}
              <div>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 font-light border-l-4 border-forest-500 pl-5">
                  {post.excerpt}
                </p>

                {/* Mobile TOC */}
                {toc.length > 0 && (
                  <div className="lg:hidden mb-8">
                    <TableOfContents items={toc} />
                  </div>
                )}

                {/* Article body */}
                <div
                  className="prose-blog"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center flex-wrap gap-2">
                      <Tag className="w-4 h-4 text-gray-400" />
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="tag">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Affiliate section */}
                {post.affiliateLinks && post.affiliateLinks.length > 0 && (
                  <AffiliateSection links={post.affiliateLinks} />
                )}

                {/* Ad unit */}
                <AdUnit className="my-10" label="Advertisement" />

                {/* Author */}
                <div className="mt-10">
                  <AuthorSection author={post.author} />
                </div>
              </div>

              {/* Sidebar */}
              <aside className="hidden lg:block space-y-6">
                {/* TOC */}
                {toc.length > 0 && (
                  <div className="sticky top-24">
                    <TableOfContents items={toc} />

                    {/* Sidebar ad */}
                    <div className="mt-6">
                      <AdUnit format="rectangle" label="Advertisement" />
                    </div>
                  </div>
                )}
              </aside>
            </div>

            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <div className="mt-16 pt-12 border-t border-gray-100 dark:border-gray-800">
                <RelatedPosts posts={relatedPosts} />
              </div>
            )}
          </div>
        </div>
      </article>
    </>
  )
}
