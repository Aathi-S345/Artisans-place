import Link from 'next/link'
import ProductGrid from '@/components/Product/ProductGrid'

const featuredProducts = [
  { id: 1, name: 'Handcrafted Ceramic Mug', price: 24.99, image: '/placeholder-mug.jpg', artisan: "Potter's Studio" },
  { id: 2, name: 'Wooden Cutting Board', price: 35.50, image: '/placeholder-board.jpg', artisan: 'Woodcraft by John' },
  { id: 3, name: 'Handwoven Scarf', price: 42.00, image: '/placeholder-scarf.jpg', artisan: 'Weaver Studio' },
  { id: 4, name: 'Silver Pendant Necklace', price: 68.00, image: '/placeholder-necklace.jpg', artisan: 'Silver Arts' }
]

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-50 to-primary-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Discover Handcrafted Treasures
          </h1>
          <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
            Support independent artisans and find unique, handmade products that tell a story.
          </p>
          <Link href="/marketplace" className="btn-primary text-lg px-8 py-3">
            Explore Marketplace
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        <ProductGrid products={featuredProducts} />
        <div className="text-center mt-10">
          <Link href="/marketplace" className="btn-secondary">
            View All Products
          </Link>
        </div>
      </section>

      {/* Artisan Promotion */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Are you an Artisan?</h2>
          <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
            Join our community of skilled makers and reach customers who appreciate handmade quality.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link href="/artisan/register" className="btn-primary px-8 py-3">
              Register as Artisan
            </Link>
            <Link href="/artisan/training" className="btn-secondary px-8 py-3">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}