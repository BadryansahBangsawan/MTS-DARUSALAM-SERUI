import { NextRequest, NextResponse } from 'next/server';
import { db } from '@my-better-t-app/db';
import { blogNews } from '@my-better-t-app/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await db.select().from(blogNews).where(eq(blogNews.id, parseInt(id)));
    if (!data.length) {
      return NextResponse.json({ success: false, error: 'Data tidak ditemukan' }, { status: 404 });
    }
    await db.update(blogNews).set({ views: (data[0].views || 0) + 1 }).where(eq(blogNews.id, parseInt(id)));
    return NextResponse.json({ success: true, data: { ...data[0], views: (data[0].views || 0) + 1 } });
  } catch (error) {
    console.error('Get blog news by id error:', error);
    return NextResponse.json({ success: false, error: 'Terjadi kesalahan' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, isPublished, ...rest } = body;
    
    let slug = undefined;
    if (title) {
      slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const values: any = { ...rest, updatedAt: new Date() };
    if (title) values.title = title;
    if (slug) values.slug = slug;
    if (isPublished !== undefined) {
      values.isPublished = isPublished;
      values.publishedAt = isPublished ? new Date() : null;
    }

    await db.update(blogNews).set(values).where(eq(blogNews.id, parseInt(id)));
    const updated = await db.select().from(blogNews).where(eq(blogNews.id, parseInt(id))).limit(1);
    return NextResponse.json({ success: true, data: updated[0] });
  } catch (error) {
    console.error('Update blog news error:', error);
    return NextResponse.json({ success: false, error: 'Terjadi kesalahan' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.delete(blogNews).where(eq(blogNews.id, parseInt(id)));
    return NextResponse.json({ success: true, message: 'Data berhasil dihapus' });
  } catch (error) {
    console.error('Delete blog news error:', error);
    return NextResponse.json({ success: false, error: 'Terjadi kesalahan' }, { status: 500 });
  }
}
