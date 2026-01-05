import { NextRequest, NextResponse } from 'next/server';
import { db } from '@my-better-t-app/db';
import { testimonials } from '@my-better-t-app/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'ID tidak valid' },
        { status: 400 }
      );
    }

    const item = await db.select().from(testimonials).where(eq(testimonials.id, id)).limit(1);

    if (item.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Testimoni tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: item[0] });
  } catch (error) {
    console.error('Get testimonial by ID error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'ID tidak valid' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { authorName, role, content, rating, imageUrl, isApproved, isFeatured } = body;

    const values: any = {
      updatedAt: new Date(),
    };

    if (authorName !== undefined) values.authorName = authorName;
    if (role !== undefined) values.role = role;
    if (content !== undefined) values.content = content;
    if (rating !== undefined) values.rating = rating;
    if (imageUrl !== undefined) values.imageUrl = imageUrl;
    if (isApproved !== undefined) values.isApproved = isApproved;
    if (isFeatured !== undefined) values.isFeatured = isFeatured;

    console.log('Updating testimonial:', id, values);

    await db
      .update(testimonials)
      .set(values)
      .where(eq(testimonials.id, id));

    const updatedItems = await db.select().from(testimonials).where(eq(testimonials.id, id)).limit(1);

    if (updatedItems.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Testimoni tidak ditemukan' },
        { status: 404 }
      );
    }

    const updatedItem = updatedItems[0];
    console.log('Updated testimonial:', updatedItem);

    return NextResponse.json({ success: true, data: updatedItem });
  } catch (error) {
    console.error('Update testimonial error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: 'ID tidak valid' },
        { status: 400 }
      );
    }

    const deletedItems = await db.select().from(testimonials).where(eq(testimonials.id, id)).limit(1);

    if (deletedItems.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Testimoni tidak ditemukan' },
        { status: 404 }
      );
    }

    await db.delete(testimonials).where(eq(testimonials.id, id));

    return NextResponse.json({ success: true, data: deletedItems[0] });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}
