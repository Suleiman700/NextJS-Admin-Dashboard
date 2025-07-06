import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET
    });

    const { pathname } = request.nextUrl;
    const nonProtectedPaths = ['login', 'register', 'api', '_next', 'favicon.ico'];

    const isNonProtected = nonProtectedPaths.some((path) => pathname.startsWith(`/${path}`));

    if (!token) {
        // Redirect unauthenticated users to /login unless they're accessing a non-protected path
        if (!isNonProtected) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        return NextResponse.next();
    }

    // Redirect authenticated users away from login or register pages
    if (token && (pathname === '/login' || pathname === '/register')) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!.*\\.).*)'], // Matches all routes except files like .css, .js, .png, etc.
};
