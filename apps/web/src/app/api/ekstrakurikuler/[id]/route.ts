import { NextRequest, NextResponse } from 'next/server';
import { db } from '@my-better-t-app/db';
import { ekstrakurikuler } from '@my-better-t-app/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await db
      .select()
      .from(ekstrakurikuler)
      .where(eq(ekstrakurikuler.id, id));

    if (!data.length) {
      return NextResponse.json(
        { success: false, error: 'Data tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: data[0] });
  } catch (error) {
    console.error('Get ekstrakurikuler by id error:', error);
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
    const { id } = await params;
    const body = await request.json();

    await db
      .update(ekstrakurikuler)
      .set({
        ...body,
        updatedAt: new Date(),
      })
      .where(eq(ekstrakurikuler.id, id));

    const updated = await db.select().from(ekstrakurikuler).where(eq(ekstrakurikuler.id, id)).limit(1);
    return NextResponse.json({ success: true, data: updated[0] });
  } catch (error) {
    console.error('Update ekstrakurikuler error:', error);
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
    const { id } = await params;
    await db
      .delete(ekstrakurikuler)
      .where(eq(ekstrakurikuler.id, id));

    return NextResponse.json({ success: true, message: 'Data berhasil dihapus' });
  } catch (error) {
    console.error('Delete ekstrakurikuler error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}
