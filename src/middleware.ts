import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('tokenJWT')?.value;
  const isLoginPage = request.nextUrl.pathname === '/login';
  const isSignupPage = request.nextUrl.pathname === '/signup';

  if (!token && !isLoginPage && !isSignupPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const response = await NextResponse.next();
  
  if (response.status === 403) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('tokenJWT');
    return response;
  }


  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.map|.*\\.js|.*\\.css|.*\\.json|.*\\.ico).*)',
  ],
};
