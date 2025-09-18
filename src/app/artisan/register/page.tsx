'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function ArtisanRegister() {
  const [formData, setFormData] = useState({
    businessName: '',
    description: '',
    category: '',
    yearsExperience: '',
    portfolioUrl: '',
    taxId: '',
    bankAccount: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Handle artisan registration
    console.log('Artisan registration:', formData)
    setIsLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Please log in first</h1>
        <p className="text-gray-600">You need to be logged in to register as an artisan.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Become an Artisan Seller</h1>
      
      <form onSubmit={handleSubmit} className="card space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Business Name *
          </label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            className="input-field"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="input-field"
            placeholder="Tell us about your craft, techniques, and inspiration..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="">Select a category</option>
            <option value="pottery">Pottery & Ceramics</option>
            <option value="woodworking">Woodworking</option>
            <option value="textiles">Textiles & Weaving</option>
            <option value="jewelry">Jewelry</option>
            <option value="metalwork">Metalwork</option>
            <option value="glass">Glass Art</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Years of Experience *
          </label>
          <input
            type="number"
            name="yearsExperience"
            value={formData.yearsExperience}
            onChange={handleChange}
            className="input-field"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Portfolio URL
          </label>
          <input
            type="url"
            name="portfolioUrl"
            value={formData.portfolioUrl}
            onChange={handleChange}
            className="input-field"
            placeholder="https://..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tax ID/EIN *
            </label>
            <input
              type="text"
              name="taxId"
              value={formData.taxId}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bank Account Number *
            </label>
            <input
              type="text"
              name="bankAccount"
              value={formData.bankAccount}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Verification Process</h3>
          <p className="text-sm text-blue-700">
            After submission, our team will review your application. This process typically takes 2-3 business days. 
            You'll receive an email notification once your artisan account is approved.
          </p>
        </div>

        <button 
          type="submit" 
          className="w-full btn-primary disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  )
}