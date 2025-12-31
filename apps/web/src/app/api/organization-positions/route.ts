import { NextRequest, NextResponse } from 'next/server';
import { db } from '@my-better-t-app/db';
import { organizationPositions } from '@my-better-t-app/db/schema';
import { like, desc, or } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const data = await db
      .select()
      .from(organizationPositions)
      .orderBy(organizationPositions.sortOrder);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Get organization positions error:', error);
    return NextResponse.json({ success: false, error: 'Terjadi kesalahan' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await db.insert(organizationPositions).values(body);
    const created = await db.select().from(organizationPositions).orderBy(organizationPositions.createdAt).limit(1);
    return NextResponse.json({ success: true, data: created[0] }, { status: 201 });
  } catch (error) {
    console.error('Create organization position error:', error);
    return NextResponse.json({ success: false, error: 'Terjadi kesalahan' }, { status: 500 });
  }
}
