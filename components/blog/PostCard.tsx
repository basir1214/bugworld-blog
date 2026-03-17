'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Clock, Calendar, ArrowRight } from 'lucide-react'
import { formatDate, getCategoryEmoji } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import type { PostMeta } from '@/types'

interface PostCardProps {
  post: PostMeta
  variant?: 'default' | 'featured' | 'compact' | 'horizontal'
  index?: number
}

export function PostCard({ post, variant = 'default', index = 0 }: PostCardProps) {
  if (variant === 'featured') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      >
        <Link href={`/blog/${post.slug}`}>
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <Badge variant="category" category={post.category}>
                {getCategoryEmoji(post.category)} {post.category}
              </Badge>
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-serif font-bold text-xl text-gray-900 dark:text-white group-hover:text-forest-600 dark:group-hover:text-forest-400 transition-colors line-clamp-2 mb-2">
              {post.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readingTime}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-forest-600 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </motion.article>
    )
  }

  if (variant === 'horizontal') {
    return (
      <motion.article
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="group flex gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      >
        <Link href={`/blog/${post.slug}`} className="flex gap-4 w-full">
          <div className="relative w-24 h-20 flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="96px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <Badge variant="category" category={post.category} className="mb-1 text-xs">
              {post.category}
            </Badge>
            <h4 className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-forest-600 dark:group-hover:text-forest-400 transition-colors line-clamp-2">
              {post.title}
            </h4>
            <p className="text-xs text-gray-400 mt-1">{post.readingTime}</p>
          </div>
        </Link>
      </motion.article>
    )
  }

  if (variant === 'compact') {
    return (
      <article className="group border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0 last:pb-0">
        <Link href={`/blog/${post.slug}`}>
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">{getCategoryEmoji(post.category)}</span>
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-forest-600 dark:group-hover:text-forest-400 transition-colors line-clamp-2">
                {post.title}
              </h4>
              <p className="text-xs text-gray-400 mt-1">{formatDate(post.publishedAt)}</p>
            </div>
          </div>
        </Link>
      </article>
    )
  }

  // Default card
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="category" category={post.category}>
              {getCategoryEmoji(post.category)} {post.category}
            </Badge>
          </div>
          <h3 className="font-serif font-bold text-lg text-gray-900 dark:text-white group-hover:text-forest-600 dark:group-hover:text-forest-400 transition-colors line-clamp-2 mb-2">
            {post.title}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readingTime}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
