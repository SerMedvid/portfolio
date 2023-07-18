import createMiddleware from 'next-intl/middleware';
import {NextRequest} from 'next/server';

const SUPPORTED_LOCALES = ['en', 'ua'];
const DEFAULT_LOCAL = 'en';

export default function middleware(req: NextRequest) {
    const defaultLocale = req.headers.get('x-default-locale') || DEFAULT_LOCAL;

    const handleI18nRouting  =  createMiddleware({
        // A list of all locales that are supported
        locales: SUPPORTED_LOCALES,
       
        // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
        defaultLocale: DEFAULT_LOCAL
      });
   
      const response = handleI18nRouting(req);
 
      response.headers.set('x-default-locale', defaultLocale);
     
      return response;
  }
   
  export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
  };