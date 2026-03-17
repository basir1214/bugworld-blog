import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, parseISO } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  try {
    return format(parseISO(dateString), 'MMMM d, yyyy')
  } catch {
    return dateString
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).replace(/\s+\S*$/, '') + '...'
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    Beetles: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
    Butterflies: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    Ants: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    'Bees & Wasps': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    Ecology: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    'Pest Control': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    'Insect Behavior': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    Evolution: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
    'Fascinating Facts': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
    Conservation: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  }
  return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
}

export function getCategoryEmoji(category: string): string {
  const emojis: Record<string, string> = {
    Beetles: '🪲',
    Butterflies: '🦋',
    Ants: '🐜',
    'Bees & Wasps': '🐝',
    Ecology: '🌿',
    'Pest Control': '🏠',
    'Insect Behavior': '🧬',
    Evolution: '⏳',
    'Fascinating Facts': '✨',
    Conservation: '🌍',
  }
  return emojis[category] || '🐛'
}
