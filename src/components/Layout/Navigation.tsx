// In src/components/Layout/Navigation.tsx
'use client';

import Link from 'next/link';
// FIX: Add 'signOut' to the import
import { useSession, signOut } from 'next-auth/react';

export default function Navigation() {
  // Use the session hook from NextAuth.js
  const { data: session, status } = useSession();

  // Show a loading state while the session is being determined
  if (status === 'loading') {
    return <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>;
  }

  return (
    <nav className="hidden md:flex items-center gap-6">
      <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
      <Link href="/marketplace" className="text-gray-600 hover:text-gray-900">Marketplace</Link>
      <Link href="/cart" className="text-gray-600 hover:text-gray-900">Cart</Link>

      {session?.user?.role === 'admin' && (
        <Link href="/admin/dashboard" className="font-bold text-red-600 hover:text-red-700">
          Admin Panel
        </Link>
      )}

      {session ? (
        <>
          <Link href="/account" className="text-gray-600 hover:text-gray-900">My Account</Link>
          <button onClick={() => signOut()} className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300">
            Logout
          </button>
        </>
      ) : (
        <>
          <Link href="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
          <Link href="/register" className="text-gray-600 hover:text-gray-900">Register</Link>
        </>
      )}
    </nav>
  );
}