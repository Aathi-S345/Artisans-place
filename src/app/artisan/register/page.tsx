// In src/app/artisan/register/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/UI/Button';

export default function ArtisanRegisterPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    description: '',
    category: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch('/api/artisans/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(data.message);
        // Optionally redirect after a delay
        setTimeout(() => router.push('/'), 2000);
      } else {
        setError(data.message || 'Application failed.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Become an Artisan Seller</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium">Business Name</label>
          <input id="businessName" name="businessName" type="text" required onChange={handleChange} className="w-full px-3 py-2 mt-1 border rounded-md" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium">Description</label>
          <textarea id="description" name="description" required onChange={handleChange} className="w-full px-3 py-2 mt-1 border rounded-md" rows={4}></textarea>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium">Category</label>
          <select id="category" name="category" required onChange={handleChange} className="w-full px-3 py-2 mt-1 border rounded-md">
            <option value="">Select a category</option>
            <option value="pottery">Pottery & Ceramics</option>
            <option value="jewelry">Jewelry</option>
            <option value="textiles">Textiles & Weaving</option>
            <option value="woodworking">Woodworking</option>
          </select>
        </div>
        
        {error && <p className="text-sm text-red-600 text-center">{error}</p>}
        {success && <p className="text-sm text-green-600 text-center">{success}</p>}
        
        <div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Application'}
          </Button>
        </div>
      </form>
    </div>
  );
}