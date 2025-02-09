import { NextResponse, type NextRequest } from 'next/server';

interface TokenPayload {
  exp: number;
  [key: string]: unknown;
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('tokenJWT')?.value;
  const { pathname } = request.nextUrl;

  const LOGIN_ROUTE = '/auth/login';
  const SIGNUP_ROUTE = '/auth/signup';

  if (LOGIN_ROUTE.includes(pathname)) {
    if (token && !isTokenExpired(token)) {
      return NextResponse.redirect(new URL('/charts/hematology', request.url));
    }
    request.cookies.delete('tokenJWT');
    return NextResponse.next();
  }

  if (
    !token ||
    (token &&
      isTokenExpired(token) &&
      !LOGIN_ROUTE.includes(pathname) &&
      !SIGNUP_ROUTE.includes(pathname))
  ) {
    request.cookies.delete('tokenJWT');
    return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url));
  }

  return NextResponse.next();
}

function isTokenExpired(token: string): boolean {
  try {
    const [, payloadBase64] = token.split('.');
    if (!payloadBase64) return true;

    const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString()) as TokenPayload;
    const expirationDate = new Date(payload.exp * 1000);
    console.log('expirationDate', expirationDate);
    return new Date() > expirationDate;
  } catch {
    return true;
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|next/public|_next/data|_next/image|favicon.ico|auth/signup|health-check|about-us|.*\\.map|.*\\.js|.*\\.css|.*\\.json|.*\\.ico|.*\\.png|.*\\.jpg|.*\\.webp).*)',
  ],
};
