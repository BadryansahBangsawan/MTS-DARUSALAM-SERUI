import { NextRequest, NextResponse } from 'next/server';
import { db } from '@my-better-t-app/db';
import { testimonials } from '@my-better-t-app/db/schema';
import { desc, like, or, eq, and } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const isApproved = searchParams.get('is_approved');
    const isFeatured = searchParams.get('is_featured');

    const conditions: any[] = [];

    if (search) {
      conditions.push(
        or(
          like(testimonials.authorName, `%${search}%`),
          like(testimonials.role, `%${search}%`),
          like(testimonials.content, `%${search}%`)
        )
      );
    }

    if (isApproved !== null && isApproved !== undefined) {
      conditions.push(eq(testimonials.isApproved, isApproved === 'true'));
    }

    if (isFeatured !== null && isFeatured !== undefined) {
      conditions.push(eq(testimonials.isFeatured, isFeatured === 'true'));
    }

    const data = await db
      .select()
      .from(testimonials)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(testimonials.createdAt));

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Get testimonials error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { authorName, role, content, rating, imageUrl, isApproved, isFeatured } = body;

    if (!authorName || !content) {
      return NextResponse.json(
        { success: false, error: 'Nama dan konten testimoni wajib diisi' },
        { status: 400 }
      );
    }

    const values: any = {
      authorName,
      role: role || '',
      content,
      rating: rating || 5,
      imageUrl: imageUrl || null,
      isApproved: isApproved !== undefined ? isApproved : true,
      isFeatured: isFeatured || false,
    };

    await db.insert(testimonials).values(values);

    const data = await db.select().from(testimonials).orderBy(desc(testimonials.createdAt)).limit(1);
 
    return NextResponse.json({ success: true, data: data[0] });
  } catch (error) {
    console.error('Create testimonial error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}
