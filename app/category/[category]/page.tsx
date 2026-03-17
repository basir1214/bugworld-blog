import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostsByCategory } from '@/lib/posts'
import { PostCard } from '@/components/blog/PostCard'
import { CATEGORIES } from '@/types'
import { getCategoryEmoji } from '@/lib/utils'
import { AdUnit } from '@/components/ads/AdUnit'

interface Props {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  }))
}

function findCategory(slug: string) {
  return CATEGORIES.find(
    (cat) => cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = findCategory(category)
  if (!cat) return {}

  return {
    title: `${cat.name} Articles`,
    description: `Explore our collection of entomology articles about ${cat.name}. ${cat.description}`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const cat = findCategory(category)

  if (!cat) notFound()

  const posts = getPostsByCategory(cat.name)

  return (
    <div className="pt-24 pb-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category header */}
        <div className="mb-12 pb-8 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{getCategoryEmoji(cat.name)}</span>
            <div>
              <p className="text-forest-600 dark:text-forest-400 font-medium text-sm uppercase tracking-wider mb-1">
                Category
              </p>
              <h1 className="font-serif font-bold text-4xl md:text-5xl text-gray-900 dark:text-white">
                {cat.name}
              </h1>
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl ml-[88px]">
            {cat.description} — {posts.length} article{posts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">{getCategoryEmoji(cat.name)}</p>
            <p className="text-xl font-medium">No {cat.name} articles yet</p>
            <p className="mt-2 text-sm">Check back soon — new articles are generated daily!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        )}

        <div className="mt-12">
          <AdUnit />
        </div>
      </div>
    </div>
  )
}
