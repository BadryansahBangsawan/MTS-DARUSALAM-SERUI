import { NextRequest, NextResponse } from 'next/server';
import { db } from '@my-better-t-app/db';
import { blogNews } from '@my-better-t-app/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const data = await db.select().from(blogNews).where(eq(blogNews.slug, slug));
    if (!data.length) {
      return NextResponse.json({ success: false, error: 'Data tidak ditemukan' }, { status: 404 });
    }
    
    await db.update(blogNews).set({ views: (data[0].views || 0) + 1 }).where(eq(blogNews.id, data[0].id));
    
    return NextResponse.json({ success: true, data: { ...data[0], views: (data[0].views || 0) + 1 } });
  } catch (error) {
    console.error('Get blog news by slug error:', error);
    return NextResponse.json({ success: false, error: 'Terjadi kesalahan' }, { status: 500 });
  }
}
