import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="container-prose py-6">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          <span className="text-accent">Secret</span> of E?Commerce Nobel
        </Link>
        <nav className="flex gap-6 text-sm text-gray-300">
          <Link href="#curriculum" className="hover:text-white">Curriculum</Link>
          <Link href="#faq" className="hover:text-white">FAQ</Link>
          <Link href="/checkout" className="btn-primary text-sm">Buy Now</Link>
        </nav>
      </div>
    </header>
  );
}
