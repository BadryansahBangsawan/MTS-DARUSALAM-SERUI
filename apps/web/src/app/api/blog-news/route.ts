import { NextRequest, NextResponse } from 'next/server';
import { db } from '@my-better-t-app/db';
import { blogNews } from '@my-better-t-app/db/schema';
import { like, desc, or, eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;
    const category = searchParams.get('category');
    const isPublished = searchParams.get('is_published');

    const conditions: any[] = [];
    if (search) {
      conditions.push(or(like(blogNews.title, `%${search}%`), like(blogNews.content, `%${search}%`)));
    }
    if (category && ['berita', 'pengumuman', 'artikel', 'kegiatan'].includes(category)) {
      conditions.push(eq(blogNews.category, category as any));
    }
    if (isPublished !== null) {
      conditions.push(eq(blogNews.isPublished, isPublished === 'true'));
    }

    const data = await db
      .select()
      .from(blogNews)
      .where(conditions.length > 0 ? or(...conditions) : undefined)
      .orderBy(desc(blogNews.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Get blog news error:', error);
    return NextResponse.json({ success: false, error: 'Terjadi kesalahan' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, excerpt, featuredImage, category, authorId, isPublished, isActive } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Judul dan konten wajib diisi' },
        { status: 400 }
      );
    }

    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Kategori wajib diisi' },
        { status: 400 }
      );
    }

    let slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    let slugExists = true;
    let counter = 1;
    let originalSlug = slug;

    while (slugExists) {
      const existing = await db.select().from(blogNews).where(eq(blogNews.slug, slug)).limit(1);
      if (existing.length === 0) {
        slugExists = false;
      } else {
        slug = `${originalSlug}-${counter}`;
        counter++;
      }
    }

    const values: any = {
      title,
      slug,
      content,
      excerpt,
      featuredImage,
      category,
      authorId: authorId || 1,
      isPublished: isPublished || false,
      publishedAt: isPublished ? new Date() : null,
      isActive: isActive ?? true,
    };

    const result = await db.insert(blogNews).values(values);
    const created = await db.select().from(blogNews).where(eq(blogNews.slug, slug)).limit(1);

    if (created.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Gagal membuat berita' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: created[0] }, { status: 201 });
  } catch (error: any) {
    console.error('Create blog news error:', error);

    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return NextResponse.json(
        { success: false, error: 'Author tidak valid' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}
