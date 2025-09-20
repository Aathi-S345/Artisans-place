// In src/app/checkout/page.tsx
'use client';

import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/UI/Button';
import { useState } from 'react';

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    // This is where you would integrate a real payment provider like Stripe.
    // For now, we will simulate a successful payment.
    console.log("Simulating payment for order with total:", totalPrice);

    // Simulate a delay for the payment process
    await new Promise(resolve => setTimeout(resolve, 2000));

    // After "payment" is successful, clear the cart and redirect.
    clearCart();
    alert("Payment successful! Thank you for your order.");
    router.push('/');
  };

  if (items.length === 0 && !loading) {
    return (
      <div className="text-center p-10">
        <h1 className="text-2xl font-bold">Your Cart is empty.</h1>
        <p>You cannot proceed to checkout without items in your cart.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3">
            {items.map(item => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name} (x{item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <hr className="my-4" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Shipping Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <form onSubmit={handleCheckout} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">Full Name</label>
              <input type="text" id="name" required className="w-full mt-1 p-2 border rounded-md" />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium">Address</label>
              <input type="text" id="address" required className="w-full mt-1 p-2 border rounded-md" />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Processing...' : `Pay $${totalPrice.toFixed(2)}`}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}