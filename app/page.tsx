import HeroCanvas from '@/components/HeroCanvas';
import Navbar from '@/components/Navbar';
import { formatPrice } from '@/lib/format';
import { readConfig } from '@/lib/server/store';
import Link from 'next/link';

export default function Page() {
  const cfg = readConfig();
  return (
    <>
      <Navbar />
      <section className="container-prose pt-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              {cfg.productTitle}
            </h1>
            <p className="mt-4 text-gray-300 text-lg">
              {cfg.productSubtitle}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Link href="/checkout" className="btn-primary text-lg">
                {cfg.heroCta} ? {formatPrice(cfg.priceCents)}
              </Link>
              <a className="text-gray-300 hover:text-white" href="#curriculum">View curriculum</a>
            </div>
            <p className="mt-4 text-sm text-gray-400">Lifetime access ? Updates included ? Beginner to advanced</p>
          </div>
          <div className="relative">
            <HeroCanvas />
          </div>
        </div>
      </section>

      <section id="curriculum" className="container-prose py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {title: 'Foundations', points: ['Mindset and strategy', 'Niche selection', 'Market validation']},
            {title: 'Storefront', points: ['Branding & messaging', 'High-conv. product pages', 'Checkout optimization']},
            {title: 'Growth', points: ['Paid ads & creatives', 'Email/SMS automation', 'Analytics & scaling']},
          ].map((s) => (
            <div key={s.title} className="card p-6">
              <h3 className="font-semibold text-lg">{s.title}</h3>
              <ul className="mt-3 space-y-2 text-gray-300 text-sm">
                {s.points.map(p => <li key={p}>? {p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="container-prose pb-16">
        <div className="card p-6">
          <h3 className="font-semibold text-lg">FAQ</h3>
          <div className="mt-4 grid md:grid-cols-2 gap-6 text-gray-300 text-sm">
            <div>
              <p className="font-medium text-white">Who is this for?</p>
              <p className="mt-2">Anyone starting or growing an e?commerce brand?founders, marketers, and operators.</p>
            </div>
            <div>
              <p className="font-medium text-white">Do I get updates?</p>
              <p className="mt-2">Yes, lifetime updates are included as the landscape evolves.</p>
            </div>
            <div>
              <p className="font-medium text-white">Refund policy?</p>
              <p className="mt-2">14?day satisfaction guarantee?no questions asked.</p>
            </div>
            <div>
              <p className="font-medium text-white">What do I get?</p>
              <p className="mt-2">Video lessons, templates, checklists, and a community invite.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
