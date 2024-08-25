import {
    NextResponse,
    type NextFetchEvent,
    type NextRequest
  } from 'next/server';

import { i18n } from '@/i18n.config'

import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  const locale = matchLocale(languages, locales, i18n.defaultLocale)
  return locale
}
  
  import { CustomMiddleware } from './chain'
  
  export function withMiddleware2(middleware: CustomMiddleware) {
    return async (
      request: NextRequest,
      event: NextFetchEvent,
      response: NextResponse
    ) => {
      // Perform whatever logic the second middleware needs to do
      const pathname = request.nextUrl.pathname
      const pathnameIsMissingLocale = i18n.locales.every(
        locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
      )
    
      // Redirect if there is no locale
      if (pathnameIsMissingLocale) {
        const locale = getLocale(request)
    
        if (locale === i18n.defaultLocale) {
          return NextResponse.rewrite(
            new URL(
              `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
              request.url
            )
          )
        }
    
        return NextResponse.redirect(
          new URL(
            `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
            request.url
          )
        )
      }
  
      // Call the next middleware and pass the request and response
      return middleware(request, event, response)
    }
  }