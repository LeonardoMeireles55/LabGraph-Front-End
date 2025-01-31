import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('tokenJWT')?.value;
  const { pathname } = request.nextUrl;

  const publicPages = ['/login', '/signup', '/health-check'];

  if (!token && !publicPages.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (token && !publicPages.includes(pathname)) {
    try {
      const validationResponse = await fetch(
        new URL('/api/validate-token', request.url).toString(),
        {
          method: 'GET',
          headers: {
            Cookie: `tokenJWT=${token}`,
          },
        }
      );

      const validationResult = await validationResponse.json();

      if (!validationResult.valid) {
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('tokenJWT');
        return response;
      }
    } catch (error) {
      console.error('Token validation failed:', error);
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('tokenJWT');
      return response;
    }
  }

  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.map|.*\\.js|.*\\.css|.*\\.json|.*\\.ico|.*\\.png).*)',
  ],
};
