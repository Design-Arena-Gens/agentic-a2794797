import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const { password } = await req.json();
  const pass = process.env.ADMIN_PASSWORD || 'admin';
  if (password !== pass) return new Response('Invalid', { status: 401 });
  cookies().set('admin', pass, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 7 });
  return Response.json({ ok: true });
}
