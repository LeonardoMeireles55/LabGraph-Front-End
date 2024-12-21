import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export function middleware(request: NextRequest) {
    
    const token = request.cookies.get('tokenJWT')?.value;
    const isLoginPage = request.nextUrl.pathname === '/login';
    const isSignupPage = request.nextUrl.pathname === '/signup';

    if (!token && !isLoginPage && !isSignupPage) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (token && isLoginPage) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.map|.*\\.js|.*\\.css|.*\\.json|.*\\.ico).*)',
    ],
};

export const requestHandler = (tokenJWT: String) => {
    const token = tokenJWT.split(' ')[1];
    return token;
};
