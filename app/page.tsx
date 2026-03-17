import { getFeaturedPosts, getAllPosts } from '@/lib/posts'
import { Hero } from '@/components/home/Hero'
import { FeaturedPosts } from '@/components/home/FeaturedPosts'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { Newsletter } from '@/components/home/Newsletter'
import { PostCard } from '@/components/blog/PostCard'
import { AdUnit } from '@/components/ads/AdUnit'
import { generateWebsiteSchema } from '@/lib/seo'

export default function HomePage() {
  const featuredPosts = getFeaturedPosts(3)
  const allPosts = getAllPosts()
  const recentPosts = allPosts.slice(0, 6)

  const websiteSchema = generateWebsiteSchema()

  return (
    <>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <Hero />

      <FeaturedPosts posts={featuredPosts} />

      {/* Ad unit */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <AdUnit label="Advertisement" className="w-full" />
      </div>

      <CategoryGrid />

      {/* Recent articles section */}
      {recentPosts.length > 0 && (
        <section className="py-20 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <p className="text-forest-600 dark:text-forest-400 font-medium text-sm uppercase tracking-wider mb-2">
                Fresh from the Field
              </p>
              <h2 className="font-serif font-bold text-3xl text-gray-900 dark:text-white">
                Recent Articles
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Newsletter />
    </>
  )
}
