'use client'

import { useEffect } from 'react'

interface AdUnitProps {
  slot?: string
  format?: 'auto' | 'fluid' | 'rectangle' | 'banner'
  className?: string
  label?: string
}

export function AdUnit({ slot, format = 'auto', className = '', label = 'Advertisement' }: AdUnitProps) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID

  useEffect(() => {
    if (adsenseId && typeof window !== 'undefined') {
      try {
        ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
        ;(window as any).adsbygoogle.push({})
      } catch (err) {
        // AdSense not loaded
      }
    }
  }, [adsenseId])

  // Placeholder shown when AdSense is not configured
  if (!adsenseId || !slot) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 border border-dashed border-gray-200 dark:border-gray-700 rounded-xl min-h-[90px] ${className}`}
      >
        <div className="text-center">
          <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
          <p className="text-xs text-gray-300 mt-1">Ad space — configure Google AdSense</p>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <p className="text-xs text-gray-400 text-center mb-1 uppercase tracking-wider">{label}</p>
      <ins
        className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client={adsenseId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
