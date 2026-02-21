import { NextRequest, NextResponse } from 'next/server';
import { db } from '@my-better-t-app/db';
import { users, sessions } from '@my-better-t-app/db/schema';
import { eq } from 'drizzle-orm';
import { verifyPassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    console.log('[POST /api/auth/login] Login attempt for:', username);

    if (!username || !password) {
      console.log('[POST /api/auth/login] Missing username or password');
      return NextResponse.json(
        { success: false, error: 'Username dan password diperlukan' },
        { status: 400 }
      );
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));

    if (!user) {
      console.log('[POST /api/auth/login] User not found');
      return NextResponse.json(
        { success: false, error: 'Username atau password salah' },
        { status: 401 }
      );
    }

    if (user.isActive === false) {
      return NextResponse.json(
        { success: false, error: 'Akun dinonaktifkan. Hubungi super admin.' },
        { status: 403 }
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



    console.log('[POST /api/auth/login] Login successful');

    return response;
  } catch (error) {
    console.error('[POST /api/auth/login] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan saat login' },
      { status: 500 }
    );
  }
}
