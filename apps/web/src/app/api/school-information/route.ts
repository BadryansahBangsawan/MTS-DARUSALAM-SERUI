import { NextRequest, NextResponse } from 'next/server';
import { db } from '@my-better-t-app/db';
import { schoolInformation } from '@my-better-t-app/db/schema';
import { eq, desc } from 'drizzle-orm';
import { requireAuth } from '@/lib/middleware';

async function GET() {
  try {
    const [info] = await db.select().from(schoolInformation).orderBy(desc(schoolInformation.id)).limit(1);
    return NextResponse.json({ success: true, data: info });
  } catch (error) {
    console.error('Get school info error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}

async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const existing = await db.select().from(schoolInformation).orderBy(desc(schoolInformation.id)).limit(1);

    if (existing.length > 0) {
      await db
        .update(schoolInformation)
        .set({
          ...body,
          updatedAt: new Date(),
        })
        .where(eq(schoolInformation.id, existing[0].id));

      const [updated] = await db
        .select()
        .from(schoolInformation)
        .where(eq(schoolInformation.id, existing[0].id))
        .limit(1);
      return NextResponse.json({ success: true, data: updated });
    } else {
      await db.insert(schoolInformation).values(body);
      const [created] = await db.select().from(schoolInformation).orderBy(desc(schoolInformation.id)).limit(1);
      return NextResponse.json({ success: true, data: created });
    }
  } catch (error) {
    console.error('Update school info error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}

export { GET, PUT };
