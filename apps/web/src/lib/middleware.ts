import { NextRequest, NextResponse } from 'next/server';
import { db } from '@my-better-t-app/db';
import { sessions, users } from '@my-better-t-app/db/schema';
import { eq } from 'drizzle-orm';
import { verifyToken, extractTokenFromRequest } from '@/lib/auth';

export async function getAuthUser(request: NextRequest) {
  const token = extractTokenFromRequest(request);

  if (!token) {
    return null;
  }

  const payload = verifyToken(token);

  if (!payload) {
    return null;
  }

  const [session] = await db
    .select()
    .from(sessions)
    .where(eq(sessions.token, token));

  if (!session) {
    return null;
  }

  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
    })
    .from(users)
    .where(eq(users.id, payload.userId));

  return user;
}

export function requireAuth(handler: (request: NextRequest, user: any) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    const user = await getAuthUser(request);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (user.role !== 'admin' && user.role !== 'staff') {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    return handler(request, user);
  };
}
