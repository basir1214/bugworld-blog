'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { CATEGORIES } from '@/types'
import { slugify } from '@/lib/utils'

export function CategoryGrid() {
  return (
    <section id="categories" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-forest-600 dark:text-forest-400 font-medium text-sm uppercase tracking-wider mb-2"
          >
            Browse by Topic
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif font-bold text-3xl md:text-4xl text-gray-900 dark:text-white"
          >
            Explore Categories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 dark:text-gray-400 mt-3 max-w-xl mx-auto"
          >
            From ancient beetles to modern pest management — dive into any area of entomology
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <Link
                href={`/category/${slugify(cat.name)}`}
                className="group flex flex-col items-center text-center p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-forest-300 dark:hover:border-forest-700 hover:shadow-lg transition-all duration-300 h-full"
              >
                <span className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
                  {cat.emoji}
                </span>
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed">
                  {cat.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
