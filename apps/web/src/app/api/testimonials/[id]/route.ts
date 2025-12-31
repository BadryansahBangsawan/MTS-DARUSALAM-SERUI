import { NextRequest, NextResponse } from 'next/server';
import { db } from '@my-better-t-app/db';
import { testimonials } from '@my-better-t-app/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await db.select().from(testimonials).where(eq(testimonials.id, parseInt(id)));
    if (!data.length) {
      return NextResponse.json({ success: false, error: 'Data tidak ditemukan' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: data[0] });
  } catch (error) {
    console.error('Get testimonial by id error:', error);
    return NextResponse.json({ success: false, error: 'Terjadi kesalahan' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    await db.update(testimonials).set({ ...body, updatedAt: new Date() }).where(eq(testimonials.id, parseInt(id)));
    const updated = await db.select().from(testimonials).where(eq(testimonials.id, parseInt(id))).limit(1);
    return NextResponse.json({ success: true, data: updated[0] });
  } catch (error) {
    console.error('Update testimonial error:', error);
    return NextResponse.json({ success: false, error: 'Terjadi kesalahan' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await db.delete(testimonials).where(eq(testimonials.id, parseInt(id)));
    return NextResponse.json({ success: true, message: 'Data berhasil dihapus' });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    return NextResponse.json({ success: false, error: 'Terjadi kesalahan' }, { status: 500 });
  }
}
