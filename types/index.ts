export interface Post {
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  category: Category
  tags: string[]
  author: Author
  publishedAt: string
  updatedAt?: string
  readingTime: string
  featured?: boolean
  metaTitle?: string
  metaDescription?: string
  affiliateLinks?: AffiliateLink[]
}

export interface PostMeta {
  slug: string
  title: string
  excerpt: string
  coverImage: string
  category: Category
  tags: string[]
  author: Author
  publishedAt: string
  updatedAt?: string
  readingTime: string
  featured?: boolean
  metaTitle?: string
  metaDescription?: string
}

export type Category =
  | 'Beetles'
  | 'Butterflies'
  | 'Ants'
  | 'Bees & Wasps'
  | 'Ecology'
  | 'Pest Control'
  | 'Insect Behavior'
  | 'Evolution'
  | 'Fascinating Facts'
  | 'Conservation'

export interface Author {
  name: string
  avatar: string
  bio: string
  role: string
}

export interface AffiliateLink {
  title: string
  url: string
  description: string
  image?: string
}

export interface TOCItem {
  id: string
  text: string
  level: number
}

export const CATEGORIES: { name: Category; emoji: string; description: string; color: string }[] = [
  {
    name: 'Beetles',
    emoji: '🪲',
    description: 'Coleoptera — the largest order of insects',
    color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  },
  {
    name: 'Butterflies',
    emoji: '🦋',
    description: 'Lepidoptera and their stunning transformations',
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  },
  {
    name: 'Ants',
    emoji: '🐜',
    description: 'The superorganism architects of the insect world',
    color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  },
  {
    name: 'Bees & Wasps',
    emoji: '🐝',
    description: 'Hymenoptera — pollinators and predators',
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  },
  {
    name: 'Ecology',
    emoji: '🌿',
    description: 'Insects and their role in ecosystems',
    color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  },
  {
    name: 'Pest Control',
    emoji: '🏠',
    description: 'Integrated pest management strategies',
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  },
  {
    name: 'Insect Behavior',
    emoji: '🧬',
    description: 'Ethology and behavioral ecology',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  },
  {
    name: 'Evolution',
    emoji: '⏳',
    description: '400 million years of insect evolution',
    color: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
  },
  {
    name: 'Fascinating Facts',
    emoji: '✨',
    description: 'Incredible insect records and oddities',
    color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
  },
  {
    name: 'Conservation',
    emoji: '🌍',
    description: 'Protecting insect biodiversity',
    color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  },
]

export const DEFAULT_AUTHOR: Author = {
  name: 'Dr. Elena Marsh',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
  bio: 'Entomologist and science writer with 15 years of field research experience. PhD in Insect Ecology from Cornell University. Passionate about bringing the fascinating world of insects to a broader audience.',
  role: 'Lead Entomologist & Editor',
}
