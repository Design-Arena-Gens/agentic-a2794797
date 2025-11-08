import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Secret of E?Commerce Nobel',
  description: 'Learn how to start and scale your e?commerce journey. Code, curriculum, and a beautiful experience.',
  metadataBase: new URL('https://agentic-a2794797.vercel.app')
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <main className="flex-1">{children}</main>
        <footer className="container-prose py-10 text-sm text-gray-400">
          <div className="flex items-center justify-between">
            <p>? {new Date().getFullYear()} The Secret of E?Commerce Nobel</p>
            <div className="space-x-4">
              <a href="/admin" className="hover:text-white">Admin</a>
              <a href="/" className="hover:text-white">Home</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
