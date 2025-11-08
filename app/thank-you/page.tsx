import { readConfig } from '@/lib/server/store';
import Link from 'next/link';

export default function ThankYouPage({ searchParams }: { searchParams: { order?: string } }) {
  const orderId = searchParams.order;
  const cfg = readConfig();
  return (
    <div className="container-prose py-16">
      <div className="max-w-2xl mx-auto card p-6 text-center">
        <h1 className="text-3xl font-extrabold">Thank you!</h1>
        <p className="mt-3 text-gray-300">Your purchase of <span className="text-white">{cfg.productTitle}</span> is confirmed.</p>
        {orderId && (
          <p className="mt-2 text-sm text-gray-400">Order ID: <span className="text-white">{orderId}</span></p>
        )}
        <div className="mt-6">
          <Link href="/" className="btn-primary">Back to Home</Link>
        </div>
        <p className="mt-4 text-xs text-gray-400">Check your email for access details and next steps.</p>
      </div>
    </div>
  );
}
