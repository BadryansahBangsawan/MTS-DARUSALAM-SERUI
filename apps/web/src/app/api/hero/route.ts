import { NextRequest, NextResponse } from 'next/server';
import { db } from '@my-better-t-app/db';
import { hero } from '@my-better-t-app/db/schema';
import { eq } from 'drizzle-orm';

async function GET() {
  try {
    const [data] = await db.select().from(hero).limit(1);
    return NextResponse.json({ success: true, data: data || {} });
  } catch (error) {
    console.error('Get hero error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}

async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const existing = await db.select().from(hero).limit(1);

    if (existing.length > 0) {
      await db
        .update(hero)
        .set({
          ...body,
          updatedAt: new Date(),
        })
        .where(eq(hero.id, existing[0].id));

      const updated = await db.select().from(hero).limit(1);
      return NextResponse.json({ success: true, data: updated[0] });
    } else {
      await db.insert(hero).values(body);
      const created = await db.select().from(hero).limit(1);
      return NextResponse.json({ success: true, data: created[0] });
    }
  } catch (error) {
    console.error('Update hero error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}

export { GET, PUT };
