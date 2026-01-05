import { NextRequest, NextResponse } from 'next/server';
import { db } from '@my-better-t-app/db';
import { guruDanStaf } from '@my-better-t-app/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await db.select().from(guruDanStaf).where(eq(guruDanStaf.id, parseInt(id))).limit(1);

    if (data.length === 0) {
      return NextResponse.json({ success: false, error: 'Data tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: data[0] });
  } catch (error) {
    console.error('Get guru & staf by id error:', error);
    return NextResponse.json({ success: false, error: 'Terjadi kesalahan' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { nama, kategori, jabatan, mataPelajaran, kelas, jamMengajar, totalBebanKerja, sortOrder, colorTheme, backgroundStyle, isActive } = body;

    const values: any = {};
    if (nama !== undefined) values.nama = nama;
    if (kategori !== undefined) values.kategori = kategori;
    if (jabatan !== undefined) values.jabatan = jabatan;
    if (mataPelajaran !== undefined) values.mataPelajaran = mataPelajaran;
    if (kelas !== undefined) values.kelas = kelas;
    if (jamMengajar !== undefined) values.jamMengajar = jamMengajar;
    if (totalBebanKerja !== undefined) values.totalBebanKerja = totalBebanKerja;
    if (sortOrder !== undefined) values.sortOrder = sortOrder;
    if (colorTheme !== undefined) values.colorTheme = colorTheme;
    if (backgroundStyle !== undefined) values.backgroundStyle = backgroundStyle;
    if (isActive !== undefined) values.isActive = isActive;

    const result = await db.update(guruDanStaf)
      .set(values)
      .where(eq(guruDanStaf.id, parseInt(id)));

    return NextResponse.json({ success: true, data: values });
  } catch (error) {
    console.error('Update guru & staf error:', error);
    return NextResponse.json({ success: false, error: 'Terjadi kesalahan' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await db.delete(guruDanStaf).where(eq(guruDanStaf.id, parseInt(id)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete guru & staf error:', error);
    return NextResponse.json({ success: false, error: 'Terjadi kesalahan' }, { status: 500 });
  }
}
