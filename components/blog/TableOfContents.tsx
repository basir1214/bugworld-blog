'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { List } from 'lucide-react'
import type { TOCItem } from '@/types'

interface TableOfContentsProps {
  items: TOCItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0% -80% 0%', threshold: 0 }
    )

    items.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <div className="bg-forest-50 dark:bg-forest-950/30 rounded-xl p-5 border border-forest-100 dark:border-forest-900">
      <div className="flex items-center gap-2 mb-4">
        <List className="w-4 h-4 text-forest-600" />
        <h3 className="font-semibold text-sm text-gray-900 dark:text-white uppercase tracking-wider">
          Table of Contents
        </h3>
      </div>
      <nav>
        <ul className="space-y-1">
          {items.map((item) => (
            <li
              key={item.id}
              style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
            >
              <a
                href={`#${item.id}`}
                className={cn(
                  'block text-sm py-1 px-2 rounded-lg transition-all duration-200',
                  activeId === item.id
                    ? 'text-forest-700 dark:text-forest-400 bg-forest-100 dark:bg-forest-900/50 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:text-forest-600 dark:hover:text-forest-400 hover:bg-forest-50 dark:hover:bg-forest-900/20'
                )}
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById(item.id)
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 100
                    window.scrollTo({ top, behavior: 'smooth' })
                  }
                }}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
