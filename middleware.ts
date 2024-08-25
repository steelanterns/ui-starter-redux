import { chain } from '@/middlewares/chain'
import { withMiddleware1 } from '@/middlewares/middlewareAuth'
import { withMiddleware2 } from '@/middlewares/middlewarei18n'

export default chain([withMiddleware1, withMiddleware2])
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}