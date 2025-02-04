import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('tokenJWT')?.value;
  const { pathname } = request.nextUrl;
  const publicPages = ['/auth/login', '/auth/signup', '/health-check', '/about-us'];
  const isNotNecessaryToRedirect = pathname === '/about-us';

  if (isNotNecessaryToRedirect) {
    return NextResponse.next();
  }

  if (publicPages.includes(pathname)) {
    if (token && !isTokenExpired(token)) {
      return NextResponse.redirect(new URL('/charts/hematology', request.url));
    }
    return NextResponse.next();
  }

  if (!token || (token && isTokenExpired(token))) {
    request.cookies.delete('tokenJWT');
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  return response;
}

function isTokenExpired(token: string): boolean {
  const [, payloadBase64] = token.split('.');
  const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString());
  const expirationDate = new Date(payload.exp * 1000);
  return new Date() > expirationDate;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/data|_next/image|favicon.ico|.*\\.map|.*\\.js|.*\\.css|.*\\.json|.*\\.ico|.*\\.png|.*\\.jpg|.*\\.webp).*)',
  ],
};
