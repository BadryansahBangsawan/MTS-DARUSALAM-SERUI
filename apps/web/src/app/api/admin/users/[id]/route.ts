import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@my-better-t-app/db";
import { users } from "@my-better-t-app/db/schema";
import { hashPassword } from "@/lib/auth";
import { requireAdmin } from "@/lib/middleware";
import { writeAuditLog } from "@/lib/audit";

export const PATCH = requireAdmin(async (request: NextRequest, actor: any) => {
  try {
    const pathParts = request.nextUrl.pathname.split("/");
    const idParam = pathParts[pathParts.length - 1];
    const userId = Number(idParam);

    if (!Number.isFinite(userId)) {
      return NextResponse.json({ success: false, error: "ID user tidak valid" }, { status: 400 });
    }

    const body = await request.json();
    const updates: Record<string, unknown> = {};

    if (typeof body?.name === "string" && body.name.trim()) {
      updates.name = body.name.trim();
    }
    if (body?.role === "admin" || body?.role === "staff") {
      updates.role = body.role;
    }
    if (typeof body?.isActive === "boolean") {
      updates.isActive = body.isActive;
    }
    if (typeof body?.resetPassword === "string" && body.resetPassword.length >= 8) {
      updates.passwordHash = await hashPassword(body.resetPassword);
    }

    if (!Object.keys(updates).length) {
      return NextResponse.json({ success: false, error: "Tidak ada perubahan yang dikirim" }, { status: 400 });
    }

    if (userId === actor.id) {
      if (updates.role && updates.role !== "admin") {
        return NextResponse.json(
          { success: false, error: "Super admin tidak bisa menurunkan role dirinya sendiri" },
          { status: 400 }
        );
      }
      if (updates.isActive === false) {
        return NextResponse.json(
          { success: false, error: "Super admin tidak bisa menonaktifkan akun sendiri" },
          { status: 400 }
        );
      }
    }

    updates.updatedAt = new Date();

    const [updated] = await db
      .update(users)
      .set(updates as any)
      .where(eq(users.id, userId))
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        username: users.username,
        role: users.role,
        isActive: users.isActive,
        lastLogin: users.lastLogin,
        createdAt: users.createdAt,
      });

    if (!updated) {
      return NextResponse.json({ success: false, error: "User tidak ditemukan" }, { status: 404 });
    }

    await writeAuditLog({
      actorUserId: actor.id,
      action: "update_user",
      module: "super_admin",
      targetType: "user",
      targetId: userId,
      details: {
        changedFields: Object.keys(updates).filter((k) => k !== "passwordHash"),
        resetPassword: Boolean(body?.resetPassword),
      },
      ipAddress: request.headers.get("x-forwarded-for"),
      userAgent: request.headers.get("user-agent"),
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("[admin/users/:id][PATCH] error:", error);
    return NextResponse.json({ success: false, error: "Gagal memperbarui user" }, { status: 500 });
  }
});

