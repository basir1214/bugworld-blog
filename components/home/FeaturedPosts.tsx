'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Calendar } from 'lucide-react'
import { formatDate, getCategoryEmoji } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { PostCard } from '@/components/blog/PostCard'
import type { PostMeta } from '@/types'

interface FeaturedPostsProps {
  posts: PostMeta[]
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (posts.length === 0) {
    return (
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">No articles yet — check back soon!</p>
        </div>
      </section>
    )
  }

  const [hero, ...rest] = posts

  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-forest-600 dark:text-forest-400 font-medium text-sm uppercase tracking-wider mb-2"
            >
              Featured Articles
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif font-bold text-3xl md:text-4xl text-gray-900 dark:text-white"
            >
              Latest from the Lab
            </motion.h2>
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-forest-600 dark:text-forest-400 hover:text-forest-700 transition-colors group"
          >
            View all articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Featured Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hero post */}
          {hero && (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl bg-gray-900 lg:row-span-2 cursor-pointer"
            >
              <Link href={`/blog/${hero.slug}`} className="block h-full">
                <div className="relative aspect-[4/5] lg:aspect-auto lg:h-full min-h-[400px]">
                  <Image
                    src={hero.coverImage}
                    alt={hero.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <Badge variant="category" category={hero.category} className="mb-3">
                    {getCategoryEmoji(hero.category)} {hero.category}
                  </Badge>
                  <h3 className="font-serif font-bold text-2xl md:text-3xl text-white mb-3 group-hover:text-forest-300 transition-colors">
                    {hero.title}
                  </h3>
                  <p className="text-gray-300 text-sm line-clamp-2 mb-4">{hero.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(hero.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {hero.readingTime}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          )}

          {/* Side posts */}
          <div className="space-y-6">
            {rest.slice(0, 2).map((post, i) => (
              <PostCard key={post.slug} post={post} variant="featured" index={i + 1} />
            ))}
          </div>
        </div>

        {/* Mobile view all */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-forest-600 dark:text-forest-400 hover:text-forest-700"
          >
            View all articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
