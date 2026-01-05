import { NextRequest, NextResponse } from 'next/server';
import { db } from '@my-better-t-app/db';
import { testimonials } from '@my-better-t-app/db/schema';
import { eq, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '20');

    const data = await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.isApproved, true))
      .orderBy(desc(testimonials.createdAt), desc(testimonials.isFeatured))
      .limit(limit);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Get public testimonials error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}
