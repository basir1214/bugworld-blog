'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, CheckCircle, Loader2, ArrowRight } from 'lucide-react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage(data.message || 'Welcome! Check your inbox for confirmation.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }

    // Reset after 5 seconds
    setTimeout(() => {
      if (status !== 'success') setStatus('idle')
    }, 5000)
  }

  return (
    <section id="newsletter" className="py-20 bg-forest-900 dark:bg-forest-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 text-[200px] leading-none">🌿</div>
        <div className="absolute bottom-0 right-0 text-[200px] leading-none">🦋</div>
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-forest-700/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-moss-700/30 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-forest-700/50 rounded-2xl mb-6 border border-forest-600/50">
            <Mail className="w-8 h-8 text-forest-300" />
          </div>

          {/* Headline */}
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-white mb-4">
            Join 5,000+ Insect Enthusiasts
          </h2>
          <p className="text-forest-300 text-lg mb-8 leading-relaxed">
            Get our weekly newsletter packed with fascinating insect discoveries, field research highlights,
            and practical entomology tips — straight to your inbox.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              '📬 Weekly article digest',
              '🔬 Exclusive research insights',
              '🎓 Free insect ID guide',
              '🚫 No spam, ever',
            ].map((benefit) => (
              <span
                key={benefit}
                className="text-sm text-forest-300 bg-forest-800/50 px-3 py-1.5 rounded-full border border-forest-700/50"
              >
                {benefit}
              </span>
            ))}
          </div>

          {/* Form */}
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-3 text-forest-300"
            >
              <CheckCircle className="w-12 h-12 text-forest-400" />
              <p className="text-lg font-medium text-white">{message}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-forest-400 focus:border-transparent backdrop-blur-sm"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-forest-500 hover:bg-forest-400 disabled:bg-forest-700 text-white font-semibold rounded-xl transition-all duration-200 whitespace-nowrap"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Subscribe Free
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-3 text-red-400 text-sm">{message}</p>
          )}

          <p className="mt-4 text-xs text-forest-500">
            By subscribing you agree to our Privacy Policy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
