import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('tokenJWT')?.value;
  const { pathname } = request.nextUrl;

  const isTokenExpired = function (token: string): boolean {
    const [, payloadBase64] = token.split('.');
    const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString());
    const expirationDate = new Date(payload.exp * 1000);
    return new Date() > expirationDate;
  };

  const publicPages = ['/login', '/signup', '/health-check'];

  if (!token && !publicPages.includes(pathname)) {
    request.cookies.delete('tokenJWT');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/hematology', request.url));
  }

  if (token && !publicPages.includes(pathname)) {
    if (!token) {
      request.cookies.delete('tokenJWT');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (isTokenExpired(token)) {
      request.cookies.delete('tokenJWT');
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
  }

  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  return response;
}
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/data|_next/image|favicon.ico|.*\\.map|.*\\.js|.*\\.css|.*\\.json|.*\\.ico|.*\\.png).*)',
  ],
};
