import ProductGrid from '@/components/Product/ProductGrid'

// Mock data - replace with real data from your API
const products = [
  {
    id: 1,
    name: 'Handcrafted Ceramic Mug',
    price: 24.99,
    image: '/placeholder-mug.jpg',
    artisan: "Potter's Studio",
    rating: 4.8,
    category: 'Home & Kitchen'
  },
  {
    id: 2,
    name: 'Wooden Cutting Board',
    price: 35.50,
    image: '/placeholder-board.jpg',
    artisan: 'Woodcraft by John',
    rating: 4.5,
    category: 'Home & Kitchen'
  },
  {
    id: 3,
    name: 'Handwoven Scarf',
    price: 42.00,
    image: '/placeholder-scarf.jpg',
    artisan: 'Weaver Studio',
    rating: 4.9,
    category: 'Fashion'
  },
  {
    id: 4,
    name: 'Silver Pendant Necklace',
    price: 68.00,
    image: '/placeholder-necklace.jpg',
    artisan: 'Silver Arts',
    rating: 4.7,
    category: 'Jewelry'
  },
  {
    id: 5,
    name: 'Handmade Leather Journal',
    price: 38.00,
    image: '/placeholder-journal.jpg',
    artisan: 'Leather Crafts',
    rating: 4.6,
    category: 'Stationery'
  },
  {
    id: 6,
    name: 'Artisanal Soy Candle',
    price: 22.50,
    image: '/placeholder-candle.jpg',
    artisan: 'Candle Co.',
    rating: 4.8,
    category: 'Home & Kitchen'
  },
  {
    id: 7,
    name: 'Hand-painted Ceramic Bowl',
    price: 45.00,
    image: '/placeholder-bowl.jpg',
    artisan: "Potter's Studio",
    rating: 4.9,
    category: 'Home & Kitchen'
  },
  {
    id: 8,
    name: 'Hand-forged Chef Knife',
    price: 120.00,
    image: '/placeholder-knife.jpg',
    artisan: 'Metal Works',
    rating: 5.0,
    category: 'Kitchen'
  }
]

export default function Marketplace() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Marketplace</h1>
        <div className="flex space-x-4">
          <select className="input-field w-auto">
            <option>All Categories</option>
            <option>Home & Kitchen</option>
            <option>Jewelry</option>
            <option>Fashion</option>
            <option>Stationery</option>
          </select>
          <select className="input-field w-auto">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Highest Rated</option>
          </select>
        </div>
      </div>
      
      <ProductGrid products={products} />
      
      <div className="flex justify-center mt-12">
        <button className="btn-secondary">Load More</button>
      </div>
    </div>
  )
}