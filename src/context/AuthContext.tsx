'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation' // Import useRouter

interface User {
  id: string
  email: string
  name: string
  role: 'customer' | 'artisan' | 'admin'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (userData: any) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter() // Initialize the router

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Mock login logic
      const mockUser: User = {
        id: '1',
        email,
        name: 'John Doe',
        role: 'customer' // You can change this to 'artisan' or 'admin' to test other dashboards
      }
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
      alert('Login successful!')

      // Redirect based on role
      if (mockUser.role === 'artisan') {
        router.push('/artisan/dashboard')
      } else if (mockUser.role === 'admin') {
        router.push('/admin/dashboard')
      } else {
        router.push(`/account/${mockUser.id}`)
      }

    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: any) => {
    setIsLoading(true)
    try {
      // Mock registration logic
      const mockUser: User = {
        id: '1',
        email: userData.email,
        name: userData.name,
        role: 'customer'
      }
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
      alert('Registration successful! You are now logged in.')
      router.push(`/account/${mockUser.id}`) // Redirect after registration
    } catch (error) {
      console.error('Registration failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    alert('You have been logged out.')
    router.push('/') // Redirect to homepage after logout
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}