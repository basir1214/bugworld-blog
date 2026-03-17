'use client'

import { cn, getCategoryColor } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'category' | 'tag' | 'default'
  category?: string
}

export function Badge({ children, className, variant = 'default', category }: BadgeProps) {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors'

  if (variant === 'category' && category) {
    return (
      <span className={cn(baseClasses, getCategoryColor(category), className)}>
        {children}
      </span>
    )
  }

  if (variant === 'tag') {
    return (
      <span className={cn(
        baseClasses,
        'bg-forest-100 text-forest-800 dark:bg-forest-900/30 dark:text-forest-300',
        className
      )}>
        #{children}
      </span>
    )
  }

  return (
    <span className={cn(
      baseClasses,
      'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
      className
    )}>
      {children}
    </span>
  )
}
