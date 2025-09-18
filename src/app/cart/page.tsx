// In src/app/cart/page.tsx
'use client';

import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/UI/Button'; // FIX: Corrected import style
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, clearCart, updateQuantity } = useCartStore();

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="text-center p-10">
        <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
        <Link href="/marketplace">
          <Button className="mt-4">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center border p-4 rounded-lg">
            <div>
              <h2 className="font-semibold">{item.name}</h2>
              <input 
                type="number" 
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                className="w-16 text-center border rounded mt-2"
                min="1"
              />
            </div>
            <div className="text-right">
              <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              <Button variant="destructive" size="sm" onClick={() => removeItem(item.id)}>
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h2>
        <div className="flex justify-end gap-4 mt-4">
          <Button variant="outline" onClick={clearCart}>Clear Cart</Button>
          <Link href="/checkout">
            <Button>Proceed to Checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}