import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cookieHeader = request.headers.get('cookie');

  const cookies: Record<string, string> = {};

  if (cookieHeader) {
    const cookieParts = cookieHeader.split(';');
    for (const cookie of cookieParts) {
      const parts = cookie.trim().split('=');
      if (parts.length >= 2) {
        const name = parts[0];
        const value = parts.slice(1).join('=');
        cookies[name] = value;
      }
    }
  }

  return NextResponse.json({
    success: true,
    debug: {
      authHeader,
      cookieHeader,
      cookies,
    },
  });
}
