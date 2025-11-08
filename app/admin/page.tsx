"use client";

import { useEffect, useState } from 'react';
import { formatPrice } from '@/lib/format';

type Order = { id: string; email: string; amount: number; createdAt: string };

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [saving, setSaving] = useState(false);
  const [cfg, setCfg] = useState({ productTitle: '', productSubtitle: '', priceCents: 9900, heroCta: '' });

  async function checkAuth() {
    const res = await fetch('/api/config');
    if (res.status === 401) { setAuthed(false); return; }
    setAuthed(true);
    const data = await res.json();
    setCfg(data);
  }

  useEffect(() => { checkAuth(); }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
    if (res.ok) {
      await checkAuth();
    } else {
      alert('Invalid password');
    }
  }

  useEffect(() => {
    if (!authed) return;
    fetch('/api/orders').then(r => r.json()).then(setOrders).catch(() => setOrders([]));
  }, [authed]);

  async function saveConfig(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/config', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cfg) });
      if (!res.ok) throw new Error('Failed');
      alert('Saved');
    } catch {
      alert('Failed to save');
    } finally { setSaving(false); }
  }

  if (authed === null) return <div className="container-prose py-16">Loading?</div>;

  if (!authed) {
    return (
      <div className="container-prose py-16">
        <div className="max-w-sm mx-auto card p-6">
          <h1 className="text-xl font-bold">Admin Login</h1>
          <form onSubmit={handleLogin} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm text-gray-300">Password</label>
              <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="mt-1 w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <button className="btn-primary w-full">Login</button>
          </form>
          <p className="text-xs text-gray-400 mt-3">Default password: admin (or set ADMIN_PASSWORD env)</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-prose py-10">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="card p-6">
          <h2 className="font-semibold">Product Settings</h2>
          <form onSubmit={saveConfig} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm text-gray-300">Title</label>
              <input value={cfg.productTitle} onChange={e => setCfg({ ...cfg, productTitle: e.target.value })} className="mt-1 w-full rounded-md bg-white/5 border border-white/10 px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm text-gray-300">Subtitle</label>
              <input value={cfg.productSubtitle} onChange={e => setCfg({ ...cfg, productSubtitle: e.target.value })} className="mt-1 w-full rounded-md bg-white/5 border border-white/10 px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm text-gray-300">Price (USD cents)</label>
              <input type="number" value={cfg.priceCents} onChange={e => setCfg({ ...cfg, priceCents: Number(e.target.value) })} className="mt-1 w-full rounded-md bg-white/5 border border-white/10 px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm text-gray-300">CTA</label>
              <input value={cfg.heroCta} onChange={e => setCfg({ ...cfg, heroCta: e.target.value })} className="mt-1 w-full rounded-md bg-white/5 border border-white/10 px-3 py-2" />
            </div>
            <button disabled={saving} className="btn-primary">{saving ? 'Saving?' : 'Save'}</button>
          </form>
        </div>
        <div className="card p-6">
          <h2 className="font-semibold">Recent Orders</h2>
          <div className="mt-3 max-h-96 overflow-auto divide-y divide-white/10">
            {orders.length === 0 && <p className="text-gray-400 text-sm">No orders yet.</p>}
            {orders.map(o => (
              <div key={o.id} className="py-3 flex items-center justify-between text-sm">
                <div>
                  <p className="text-white">{o.email}</p>
                  <p className="text-gray-400">{new Date(o.createdAt).toLocaleString()}</p>
                </div>
                <div className="font-semibold">{formatPrice(o.amount)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
