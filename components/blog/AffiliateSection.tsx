import { ExternalLink, ShoppingCart } from 'lucide-react'
import type { AffiliateLink } from '@/types'

interface AffiliateSectionProps {
  links: AffiliateLink[]
}

export function AffiliateSection({ links }: AffiliateSectionProps) {
  if (!links || links.length === 0) return null

  return (
    <div className="p-6 bg-amber-50 dark:bg-amber-950/20 rounded-2xl border border-amber-100 dark:border-amber-900/30 my-8">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingCart className="w-4 h-4 text-amber-600" />
        <h3 className="font-semibold text-sm text-gray-900 dark:text-white uppercase tracking-wider">
          Recommended Products
        </h3>
        <span className="ml-auto text-xs text-gray-400">(affiliate links)</span>
      </div>
      <div className="space-y-3">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 rounded-xl hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex-1">
              <p className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-amber-600 transition-colors">
                {link.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{link.description}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-amber-500 flex-shrink-0" />
          </a>
        ))}
      </div>
    </div>
  )
}
