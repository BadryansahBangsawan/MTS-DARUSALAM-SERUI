import { NextRequest, NextResponse } from 'next/server';
import { db } from '@my-better-t-app/db';
import { users } from '@my-better-t-app/db/schema';
import { eq } from 'drizzle-orm';
import { verifyToken, extractTokenFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    console.log('[GET /api/auth/me] Checking auth...');

    // Cek token dari header Authorization dan cookie
    const token = extractTokenFromRequest(request);

    console.log('[GET /api/auth/me] Token found:', !!token);

    if (!token) {
      console.log('[GET /api/auth/me] No token found, returning 401');
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const payload = verifyToken(token);

    if (!payload) {
      console.log('[GET /api/auth/me] Invalid token');
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }

    console.log('[GET /api/auth/me] Valid token for userId:', payload.userId);

    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
      })
      .from(users)
      .where(eq(users.id, payload.userId));

    if (!user) {
      console.log('[GET /api/auth/me] User not found');
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    console.log('[GET /api/auth/me] User found:', user.email);

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('[GET /api/auth/me] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}
