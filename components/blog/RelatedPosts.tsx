import { PostCard } from '@/components/blog/PostCard'
import type { PostMeta } from '@/types'

interface RelatedPostsProps {
  posts: PostMeta[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section>
      <h2 className="font-serif font-bold text-2xl text-gray-900 dark:text-white mb-6">
        Related Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <PostCard key={post.slug} post={post} variant="default" index={index} />
        ))}
      </div>
    </section>
  )
}
