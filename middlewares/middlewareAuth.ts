import {
    NextResponse,
    type NextFetchEvent,
    type NextRequest
  } from 'next/server';
  
import { cookies } from 'next/headers';
  
  import { CustomMiddleware } from './chain';
  // import { useAuth } from '@/lib/hooks/useAuth';

  // 1. Specify protected and public routes
const protectedRoutes = ['/dashboard']
const publicRoutes = ['/sign-in', '/sign-up', '/']

  
  export function withMiddleware1(middleware: CustomMiddleware) {
    return async (request: NextRequest, event: NextFetchEvent) => {
  // 2. Check if the current route is protected or public
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
 
  // 3. Decrypt the session from the cookie
      const url = request.url
      const storedToken = request.cookies.get("token")?.value ?? null;
      const storedUser = request.cookies.get("username")?.value ?? null;
      // The first middleware in the chain has to create the response
      // object and pass it down the chain.
      const response = NextResponse.next()
  
  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !storedUser) {
    return NextResponse.redirect(new URL('/sign-in', request.nextUrl))
  }
 
  // 6. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    storedUser &&
    !request.nextUrl.pathname.startsWith('/admin')
  ) {
    return NextResponse.redirect(new URL('/admin', request.nextUrl))
  }
  
      // Call the next middleware and pass the request and response
      return middleware(request, event, response)
    }
  }