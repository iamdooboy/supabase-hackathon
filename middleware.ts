
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
        },
      },
    }
  )

  await supabase.auth.getSession()

  return response

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()

  // // if user is signed in and the current path is / redirect the user to /account
  // if (user && req.nextUrl.pathname === '/') {
  //   return NextResponse.redirect(new URL('/dashboard', req.url))
  // }

  // // if user is not signed in and the current path is not / redirect the user to /
  // if (!user && req.nextUrl.pathname !== '/') {
  //   return NextResponse.redirect(new URL('/login', req.url))
  // }

  // return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
