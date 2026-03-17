import Image from 'next/image'
import { Twitter, Globe } from 'lucide-react'
import type { Author } from '@/types'

interface AuthorSectionProps {
  author: Author
}

export function AuthorSection({ author }: AuthorSectionProps) {
  return (
    <div className="flex gap-5 p-6 bg-forest-50 dark:bg-forest-950/30 rounded-2xl border border-forest-100 dark:border-forest-900">
      <div className="relative w-16 h-16 flex-shrink-0">
        <Image
          src={author.avatar}
          alt={author.name}
          fill
          className="rounded-full object-cover"
          sizes="64px"
        />
      </div>
      <div>
        <p className="text-xs text-forest-600 dark:text-forest-400 font-medium uppercase tracking-wider mb-1">
          Written by
        </p>
        <h3 className="font-serif font-bold text-lg text-gray-900 dark:text-white">
          {author.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{author.role}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
          {author.bio}
        </p>
      </div>
    </div>
  )
}
