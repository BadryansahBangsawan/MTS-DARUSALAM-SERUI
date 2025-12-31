import { NextRequest, NextResponse } from 'next/server';
import { db } from '@my-better-t-app/db';
import { features } from '@my-better-t-app/db/schema';
import { like, desc, or } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    const data = await db
      .select()
      .from(features)
      .where(or(like(features.title, `%${search}%`), like(features.description, `%${search}%`)))
      .orderBy(desc(features.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Get features error:', error);
    return NextResponse.json({ success: false, error: 'Terjadi kesalahan' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await db.insert(features).values(body);
    const created = await db.select().from(features).orderBy(features.createdAt).limit(1);
    return NextResponse.json({ success: true, data: created[0] }, { status: 201 });
  } catch (error) {
    console.error('Create feature error:', error);
    return NextResponse.json({ success: false, error: 'Terjadi kesalahan' }, { status: 500 });
  }
}
