import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('sb-access-token');
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/feed/:path*',
    '/meme-studio/:path*',
    '/gig-radar/:path*',
    '/playlists/:path*',
    '/profile/:path*',
  ],
};
