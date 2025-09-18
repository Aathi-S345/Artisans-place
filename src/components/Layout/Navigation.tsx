'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'

export default function Navigation() {
  const { user, logout } = useAuth()
  const { totalItems } = useCart()

  const handleLogout = () => {
    logout()
  }

  const getDashboardLink = () => {
    if (user?.role === 'artisan') {
      return '/artisan/dashboard'
    } else if (user?.role === 'admin') {
      return '/admin/dashboard'
    } else {
      return `/account/${user?.id}`
    }
  }

  return (
    <nav className="hidden md:flex space-x-6 items-center">
      <Link href="/marketplace" className="text-gray-700 hover:text-primary-600">
        Marketplace
      </Link>
      {user ? (
        <>
          <Link href={getDashboardLink()} className="text-gray-700 hover:text-primary-600">
            Hi, {user.name}
          </Link>
          <button onClick={handleLogout} className="text-gray-700 hover:text-primary-600">
            Logout
          </button>
        </>
      ) : (
        <>
          <Link href="/artisan/register" className="text-gray-700 hover:text-primary-600">
            For Artisans
          </Link>
          <Link href="/login" className="text-gray-700 hover:text-primary-600">
            Login
          </Link>
        </>
      )}
      <Link href="/checkout" className="text-gray-700 hover:text-primary-600 relative">
        Cart ({totalItems})
      </Link>
    </nav>
  )
}