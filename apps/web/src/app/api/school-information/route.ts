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

const parseMaybeJsonObject = (value: unknown): Record<string, any> => {
  if (!value) return {};
  if (typeof value === 'object' && !Array.isArray(value)) return value as Record<string, any>;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed as Record<string, any>;
      }
    } catch {
      return {};
    }
  }
  return {};
};

async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const rawOperatingHours = parseMaybeJsonObject(body.operatingHours ?? body.operating_hours);
    const rawSocialMedia = parseMaybeJsonObject(body.socialMedia ?? body.social_media);

    const normalizedBody = {
      ...body,
      operatingHours: {
        weekdays: body.operatingHoursWeekdays ?? body.operating_hours_weekdays ?? rawOperatingHours.weekdays ?? '',
        saturday: body.operatingHoursSaturday ?? body.operating_hours_saturday ?? rawOperatingHours.saturday ?? '',
      },
      socialMedia: {
        facebook: body.socialMediaFacebook ?? body.social_media_facebook ?? rawSocialMedia.facebook ?? '',
        instagram: body.socialMediaInstagram ?? body.social_media_instagram ?? rawSocialMedia.instagram ?? '',
        youtube: body.socialMediaYoutube ?? body.social_media_youtube ?? rawSocialMedia.youtube ?? '',
      },
    };

    const existing = await db.select().from(schoolInformation).orderBy(desc(schoolInformation.id)).limit(1);

    if (existing.length > 0) {
      await db
        .update(schoolInformation)
        .set({
          ...normalizedBody,
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
      await db.insert(schoolInformation).values(normalizedBody);
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
