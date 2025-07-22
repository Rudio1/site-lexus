import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const referer = request.headers.get('referer') || '';
  const origin = request.headers.get('origin') || '';
  const xForwardedHost = request.headers.get('x-forwarded-host') || '';
  const xOriginalHost = request.headers.get('x-original-host') || '';
  
  let detectedDomain = host;
  
  if (xOriginalHost) {
    detectedDomain = xOriginalHost;
  } else if (xForwardedHost) {
    detectedDomain = xForwardedHost;
  } else if (referer) {
    try {
      const url = new URL(referer);
      detectedDomain = url.hostname;
    } catch {
      // Fallback para host
    }
  } else if (origin) {
    try {
      const url = new URL(origin);
      detectedDomain = url.hostname;
    } catch {
      // Fallback para host
    }
  }
  
  return NextResponse.json({
    host,
    referer,
    origin,
    xForwardedHost,
    xOriginalHost,
    detectedDomain
  });
} 