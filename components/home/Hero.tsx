'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Microscope } from 'lucide-react'

const floatingInsects = ['🦋', '🐛', '🪲', '🐜', '🐝', '🦗', '🕷️', '🦟']

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-forest-950 via-forest-900 to-moss-900">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />

      {/* Floating nature elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingInsects.map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-20"
            style={{
              left: `${10 + (i * 12) % 80}%`,
              top: `${10 + (i * 17) % 70}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'easeInOut',
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-forest-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-moss-500/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-forest-700/50 border border-forest-600/50 rounded-full text-forest-300 text-sm font-medium mb-8 backdrop-blur-sm"
        >
          <Microscope className="w-4 h-4" />
          Science-Backed Entomology Research
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight mb-6"
        >
          Explore the{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest-400 to-moss-400">
            Hidden World
          </span>
          <br />
          of Insects
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          From microscopic marvels to ecosystem engineers — discover the fascinating science
          behind the tiny creatures that run our world.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-forest-500 hover:bg-forest-400 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-forest-500/25 group"
          >
            <BookOpen className="w-5 h-5" />
            Start Reading
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#categories"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200 backdrop-blur-sm"
          >
            Browse Categories
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto"
        >
          {[
            { value: '1M+', label: 'Insect Species' },
            { value: '400M', label: 'Years of Evolution' },
            { value: '80%', label: 'Of All Animal Life' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif font-bold text-3xl text-forest-400">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  )
}
