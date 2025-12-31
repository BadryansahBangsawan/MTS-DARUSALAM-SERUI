import { NextRequest, NextResponse } from 'next/server';
import { db } from '@my-better-t-app/db';
import { ekstrakurikuler } from '@my-better-t-app/db/schema';
import { like, desc, eq, or } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    const data = await db
      .select()
      .from(ekstrakurikuler)
      .where(
        or(
          like(ekstrakurikuler.name, `%${search}%`),
          like(ekstrakurikuler.subtitle, `%${search}%`)
        )
      )
      .orderBy(desc(ekstrakurikuler.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Get ekstrakurikuler error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await db.insert(ekstrakurikuler).values(body);
    const created = await db.select().from(ekstrakurikuler).limit(1);
    return NextResponse.json({ success: true, data: created[0] }, { status: 201 });
  } catch (error) {
    console.error('Create ekstrakurikuler error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}
