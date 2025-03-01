/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const accessToken = req.cookies.get('accessToken')?.value;

    /* if (!accessToken) {
        // Redirect to login if no token
        return NextResponse.redirect(new URL('/auth/login', req.url));
    } */

    return NextResponse.next(); // Continue if authenticated
}

// Apply middleware to protected routes
export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*'] // Add protected routes here
};
