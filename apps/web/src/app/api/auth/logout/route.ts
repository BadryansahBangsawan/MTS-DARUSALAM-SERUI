import { NextRequest, NextResponse } from 'next/server';
import { db } from '@my-better-t-app/db';
import { sessions } from '@my-better-t-app/db/schema';
import { eq } from 'drizzle-orm';
import { extractTokenFromRequest } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const token = extractTokenFromRequest(request);

    if (token) {
      await db.delete(sessions).where(eq(sessions.token, token));
    }

    const response = NextResponse.json({ success: true });
    response.cookies.delete('auth_token');
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan saat logout' },
      { status: 500 }
    );
  }
}
