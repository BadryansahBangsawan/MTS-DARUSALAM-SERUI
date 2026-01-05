import { NextRequest, NextResponse } from 'next/server';
import { db } from '@my-better-t-app/db';
import { testimonials } from '@my-better-t-app/db/schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { authorName, role, content, rating, imageUrl } = body;

    if (!authorName || !content) {
      return NextResponse.json(
        { success: false, error: 'Nama dan konten testimoni wajib diisi' },
        { status: 400 }
      );
    }

    if (content.length < 20) {
      return NextResponse.json(
        { success: false, error: 'Konten testimoni minimal 20 karakter' },
        { status: 400 }
      );
    }

    const values: any = {
      authorName,
      role: role || null,
      content,
      rating: rating || 5,
      imageUrl: imageUrl || null,
      isApproved: false, // Default: requires admin approval
      isFeatured: false,
    };

    await db.insert(testimonials).values(values);
 
    return NextResponse.json({
      success: true,
      message: 'Terima kasih! Testimoni Anda telah dikirim dan menunggu persetujuan admin.',
    });
  } catch (error) {
    console.error('Submit testimonial error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}
