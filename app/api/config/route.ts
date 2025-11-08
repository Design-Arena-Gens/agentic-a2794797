import { readConfig, writeConfig } from '@/lib/server/store';
import { cookies } from 'next/headers';

function isAuthed() {
  const pass = process.env.ADMIN_PASSWORD || 'admin';
  const c = cookies();
  return c.get('admin')?.value === pass;
}

export async function GET() {
  if (!isAuthed()) return new Response('Unauthorized', { status: 401 });
  return Response.json(readConfig());
}

export async function PUT(req: Request) {
  if (!isAuthed()) return new Response('Unauthorized', { status: 401 });
  const body = await req.json();
  const cfg = {
    productTitle: String(body.productTitle ?? ''),
    productSubtitle: String(body.productSubtitle ?? ''),
    priceCents: Number(body.priceCents ?? 9900),
    heroCta: String(body.heroCta ?? 'Start Learning Today')
  };
  writeConfig(cfg);
  return Response.json({ ok: true });
}
