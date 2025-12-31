import { NextRequest, NextResponse } from 'next/server';
import { db } from '@my-better-t-app/db';
import { users, sessions } from '@my-better-t-app/db/schema';
import { eq } from 'drizzle-orm';
import { verifyPassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    console.log('[POST /api/auth/login] Login attempt for:', email);

    if (!email || !password) {
      console.log('[POST /api/auth/login] Missing email or password');
      return NextResponse.json(
        { success: false, error: 'Email dan password diperlukan' },
        { status: 400 }
      );
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (!user) {
      console.log('[POST /api/auth/login] User not found');
      return NextResponse.json(
        { success: false, error: 'Email atau password salah' },
        { status: 401 }
      );
    }

    const isValidPassword = await verifyPassword(password, user.passwordHash);
    if (!isValidPassword) {
      console.log('[POST /api/auth/login] Invalid password');
      return NextResponse.json(
        { success: false, error: 'Email atau password salah' },
        { status: 401 }
      );
    }

    console.log('[POST /api/auth/login] User authenticated:', user.email);

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await db.insert(sessions).values({
      userId: user.id,
      token,
      expiresAt,
    });

    await db
      .update(users)
      .set({ lastLogin: new Date() })
      .where(eq(users.id, user.id));

    console.log('[POST /api/auth/login] Token generated:', token.substring(0, 50) + '...');
    console.log('[POST /api/auth/login] Setting cookie...');

    const response = NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    console.log('[POST /api/auth/login] Login successful, cookie set');

    return response;
  } catch (error) {
    console.error('[POST /api/auth/login] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan saat login' },
      { status: 500 }
    );
  }
}
