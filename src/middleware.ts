import { NextRequest, NextResponse } from 'next/server';
import { sites } from './config/sites';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  
  // Mapeamento de domínios para id_sub_brand
  const domainMapping: { [key: string]: { id_sub_brand: number; siteName: string } } = {
    'lexusvitoria.com.br': { id_sub_brand: 9, siteName: 'Lexus Vitória' },
    'lexusbh.com.br': { id_sub_brand: 10, siteName: 'Lexus BH' },
    'lexusbrasilia.com.br': { id_sub_brand: 11, siteName: 'Lexus Brasília' },
    // Para desenvolvimento local
    'localhost:3000': { id_sub_brand: 9, siteName: 'Lexus Vitória (Dev)' },
    '127.0.0.1:3000': { id_sub_brand: 9, siteName: 'Lexus Vitória (Dev)' }
  };

  const config = domainMapping[hostname];
  const siteConfig = sites[hostname] || sites['lexusvitoria.com.br']; // fallback
  
  const response = NextResponse.next();
  
  // Adiciona headers com informações do site
  if (config) {
    response.headers.set('x-site-sub-brand', config.id_sub_brand.toString());
    response.headers.set('x-site-name', config.siteName);
    response.headers.set('x-site-hostname', hostname);
    response.headers.set('x-site-config', JSON.stringify(siteConfig));
    // Headers para ajudar na detecção do domínio real
    response.headers.set('x-original-host', hostname);
    response.headers.set('x-detected-domain', hostname);
  }
  
  return response;
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