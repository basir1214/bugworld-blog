import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'
import { PostCard } from '@/components/blog/PostCard'
import { CATEGORIES } from '@/types'
import { slugify } from '@/lib/utils'
import Link from 'next/link'
import { AdUnit } from '@/components/ads/AdUnit'

export const metadata: Metadata = {
  title: 'All Articles',
  description:
    'Browse all entomology articles covering beetles, butterflies, ants, ecology, pest control, and more fascinating insect topics.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="pt-24 pb-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-serif font-bold text-4xl md:text-5xl text-gray-900 dark:text-white mb-4">
            All Articles
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl">
            Explore our growing library of entomology articles — from scientific deep-dives to
            practical guides.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          <Link
            href="/blog"
            className="px-4 py-2 rounded-full text-sm font-medium bg-forest-600 text-white"
          >
            All
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={`/category/${slugify(cat.name)}`}
              className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-forest-100 dark:hover:bg-forest-900/30 hover:text-forest-700 dark:hover:text-forest-400 transition-colors"
            >
              {cat.emoji} {cat.name}
            </Link>
          ))}
        </div>

        {/* Posts grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-5xl mb-4">🐛</p>
            <p className="text-xl font-medium">No articles yet!</p>
            <p className="mt-2 text-sm">Articles will appear here once generated.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {posts.slice(0, 6).map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} />
              ))}
            </div>

            <AdUnit className="mb-10" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.slice(6).map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
