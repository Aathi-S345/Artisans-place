'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { useHydration } from '@/hooks/useHydration' // Import the new hook
import Navigation from './Navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useAuth()
  const { totalItems } = useCart()
  const isHydrated = useHydration() // Use the hook here

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            Artisan Marketplace
          </Link>

          {isHydrated ? (
            <Navigation />
          ) : (
            <div className="hidden md:flex space-x-6">
              {/* Show a placeholder or nothing during hydration */}
            </div>
          )}
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}