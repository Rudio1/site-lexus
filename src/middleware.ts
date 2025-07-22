import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { sites } from './config/sites';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  
  if (process.env.NODE_ENV === 'development') {
    const siteConfig = sites[hostname] || sites['lexusvitoria.com.br'];
    
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-site-config', JSON.stringify(siteConfig));

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
  
  const siteConfig = sites[hostname];
  
  if (!siteConfig) {
    return NextResponse.redirect(new URL('https://lexusvitoria.com.br', request.url));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-site-config', JSON.stringify(siteConfig));

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 