import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'

export const metadata = {
  title: 'Artisan Marketplace',
  description: 'Handcrafted products from skilled artisans',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col font-sans text-gray-700">
              <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                  <a href="/" className="text-2xl font-bold text-primary-600">
                    Artisan Marketplace
                  </a>
                  <nav className="space-x-4">
                    <a href="/marketplace" className="text-gray-700 hover:text-primary-600">
                      Marketplace
                    </a>
                    <a href="/login" className="text-gray-700 hover:text-primary-600">
                      Login
                    </a>
                    <a href="/register" className="text-gray-700 hover:text-primary-600">
                      Register
                    </a>
                  </nav>
                </div>
              </header>
              <main className="flex-grow">
                {children}
              </main>
              <footer className="bg-gray-800 text-white py-8 text-center text-sm">
                <div className="container mx-auto px-4">
                  © {new Date().getFullYear()} Artisan Marketplace. All rights reserved.
                </div>
              </footer>
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}