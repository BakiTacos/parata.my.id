import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the session cookie from the request
  const sessionCookie = request.cookies.get('session')?.value;

  const { pathname } = request.nextUrl;

  // Define the login page path to avoid redirect loops
  const loginPath = '/ausso/login';

  // If the user is trying to access the login page, let them through
  if (pathname === loginPath) {
    return NextResponse.next();
  }

  // If there's no session cookie, redirect to the login page
  if (!sessionCookie) {
    // Construct the absolute URL for the login page
    const loginUrl = new URL(loginPath, request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If the session cookie exists, allow the request to proceed
  return NextResponse.next();
}

// Configure the middleware to run on all routes under '/ausso'
export const config = {
  matcher: ['/ausso/:path*'],
};