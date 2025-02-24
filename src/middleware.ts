import { NextResponse, type NextRequest } from 'next/server';

interface TokenPayload {
  exp: number;
  [key: string]: unknown;
}

export async function middleware(request: NextRequest) {
  const TOKEN_JWT = request.cookies.get('tokenJWT')?.value;
  const PATH_NAME = request.nextUrl.pathname;

  const LOGIN_ROUTE = '/auth/login';
  const SIGNUP_ROUTE = '/auth/signup';

  if (LOGIN_ROUTE.includes(PATH_NAME) || SIGNUP_ROUTE.includes(PATH_NAME)) {
    if (TOKEN_JWT && !isTokenExpired(TOKEN_JWT))
      return NextResponse.redirect(new URL('/charts/hematology', request.url));
    request.cookies.delete('tokenJWT');
    return NextResponse.next();
  }

  if (!TOKEN_JWT || (TOKEN_JWT && isTokenExpired(TOKEN_JWT))) {
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
    console.log(`Exp: ${payload.exp}`);
    const expirationDate = new Date(payload.exp * 1000);
    console.log(`Exp*1000: ${payload.exp * 1000}`);
    return new Date() > expirationDate;
  } catch {
    return true;
  }
}

export const config = {
  matcher: ['/charts/:path*', '/auth/:path*'],
  // matcher: [
  //   '/((?!api|_next/static|_next/image|next/public|_next/data|_next/image|favicon.ico|auth/signup|health-check|about-us|.*\\.map|.*\\.js|.*\\.css|.*\\.json|.*\\.ico|.*\\.png|.*\\.jpg|.*\\.webp).*)',
  // ],
};
