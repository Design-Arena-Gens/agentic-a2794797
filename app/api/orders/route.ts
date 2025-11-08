import { appendOrder, readOrders } from '@/lib/server/store';
import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';

function isAuthed() {
  const pass = process.env.ADMIN_PASSWORD || 'admin';
  const c = cookies();
  return c.get('admin')?.value === pass;
}

export async function GET() {
  if (!isAuthed()) return new Response('Unauthorized', { status: 401 });
  return Response.json(readOrders());
}

export async function POST(req: Request) {
  const body = await req.json();
  const { email, amount } = body ?? {};
  if (!email || typeof amount !== 'number') return new Response('Invalid', { status: 400 });
  const id = randomUUID();
  appendOrder({ id, email, amount, createdAt: new Date().toISOString() });
  return Response.json({ id });
}
