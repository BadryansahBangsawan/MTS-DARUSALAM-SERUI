import { NextRequest, NextResponse } from 'next/server';
import { db } from '@my-better-t-app/db';
import { guruDanStaf } from '@my-better-t-app/db/schema';
import { desc, eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const activeOnly = searchParams.get('active_only');

    let data;

    if (activeOnly === 'true') {
      data = await db.select().from(guruDanStaf)
        .where(eq(guruDanStaf.isActive, true))
        .orderBy(guruDanStaf.sortOrder);
    } else {
      data = await db.select().from(guruDanStaf).orderBy(guruDanStaf.sortOrder);
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Get guru & staf error:', error);
    return NextResponse.json({ success: false, error: 'Terjadi kesalahan' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nama, kategori, jabatan, mataPelajaran, kelas, jamMengajar, totalBebanKerja, sortOrder, colorTheme, backgroundStyle, isActive } = body;

    const values = {
      nama,
      kategori,
      jabatan,
      mataPelajaran,
      kelas: kelas || null,
      jamMengajar: jamMengajar || null,
      totalBebanKerja: totalBebanKerja || null,
      sortOrder: sortOrder || 0,
      colorTheme: colorTheme || null,
      backgroundStyle: backgroundStyle || null,
      isActive: isActive ?? true,
    };

    await db.insert(guruDanStaf).values(values);

    return NextResponse.json({ success: true, data: values }, { status: 201 });
  } catch (error) {
    console.error('Create guru & staf error:', error);
    return NextResponse.json({ success: false, error: 'Terjadi kesalahan' }, { status: 500 });
  }
}
