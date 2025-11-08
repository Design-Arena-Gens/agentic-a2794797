import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/admin')) {
    // allow page to handle login, don't redirect here
    return NextResponse.next();
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
