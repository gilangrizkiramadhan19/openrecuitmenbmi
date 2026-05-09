'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

export function TopBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="sticky top-0 z-40 w-full bg-gradient-to-r from-primary to-secondary text-white">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <p className="text-sm font-medium text-center flex-1">
          PT Bumi Menara Internusa tidak memungut biaya apapun selama proses recruitment berlangsung.
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-4 inline-flex shrink-0 items-center justify-center rounded-md hover:bg-white/20 transition-colors"
          aria-label="Tutup banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
