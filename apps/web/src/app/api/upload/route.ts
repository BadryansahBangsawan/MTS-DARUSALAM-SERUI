import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { validateImageFile, generateUniqueFilename } from "@/lib/upload-utils";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "Tidak ada file yang diupload" },
        { status: 400 }
      );
    }

    const validation = validateImageFile(file);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { success: false, error: "Konfigurasi storage belum lengkap di server" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = generateUniqueFilename(file.name);
    const objectPath = `uploads/${filename}`;

    const { error: uploadError } = await supabase.storage
      .from("public-uploads")
      .upload(objectPath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      return NextResponse.json(
        { success: false, error: "Gagal upload ke storage" },
        { status: 500 }
      );
    }

    const { data } = supabase.storage
      .from("public-uploads")
      .getPublicUrl(objectPath);

    return NextResponse.json({
      success: true,
      url: data.publicUrl,
      filename,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Gagal mengupload file",
      },
      { status: 500 }
    );
  }
}
