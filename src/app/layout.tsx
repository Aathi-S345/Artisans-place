// In src/app/layout.tsx
import './globals.css';
import { Header } from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import AuthProvider from './providers/AuthProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider> {/* This is the new provider */}
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}