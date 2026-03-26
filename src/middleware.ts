import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const email = request.cookies.get('user_email')?.value

  // Allow login page, API routes, and static assets
  if (
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/api/')
  ) {
    return NextResponse.next()
  }

  // Redirect to login if not authenticated
  if (!email) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
