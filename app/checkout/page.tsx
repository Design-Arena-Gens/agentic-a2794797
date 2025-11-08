import CheckoutClient from '@/components/CheckoutClient';
import { readConfig } from '@/lib/server/store';

export default function CheckoutPage() {
  const cfg = readConfig();
  return (
    <div className="container-prose py-16">
      <CheckoutClient productTitle={cfg.productTitle} priceCents={cfg.priceCents} />
    </div>
  );
}
