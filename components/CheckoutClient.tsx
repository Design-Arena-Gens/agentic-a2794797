"use client";

import { useState } from 'react';
import { formatPrice } from '@/lib/format';
import { useRouter } from 'next/navigation';

export default function CheckoutClient({ productTitle, priceCents }: { productTitle: string; priceCents: number }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, amount: priceCents })
      });
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      router.push(`/thank-you?order=${encodeURIComponent(data.id)}`);
    } catch (err) {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto card p-6">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <p className="text-gray-300 mt-2">{productTitle}</p>
      <p className="text-white text-xl mt-2">{formatPrice(priceCents)}</p>

      <form onSubmit={handleCheckout} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm text-gray-300">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
            placeholder="you@example.com"
          />
        </div>
        <button disabled={loading} className="btn-primary w-full">
          {loading ? 'Processing?' : `Pay ${formatPrice(priceCents)}`}
        </button>
        <p className="text-xs text-gray-400 text-center">This is a demo checkout. No real payment is taken.</p>
      </form>
    </div>
  );
}
