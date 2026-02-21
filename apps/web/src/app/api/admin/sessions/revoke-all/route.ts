import { NextRequest, NextResponse } from "next/server";
import { eq, ne } from "drizzle-orm";
import { db } from "@my-better-t-app/db";
import { sessions } from "@my-better-t-app/db/schema";
import { extractTokenFromRequest } from "@/lib/auth";
import { requireAdmin } from "@/lib/middleware";
import { writeAuditLog } from "@/lib/audit";

export const POST = requireAdmin(async (request: NextRequest, actor: any) => {
  try {
    const body = await request.json().catch(() => ({}));
    const targetUserId = Number(body?.userId);
    const currentToken = extractTokenFromRequest(request);

    if (Number.isFinite(targetUserId)) {
      await db.delete(sessions).where(eq(sessions.userId, targetUserId));

      await writeAuditLog({
        actorUserId: actor.id,
        action: "revoke_all_sessions_user",
        module: "super_admin",
        targetType: "user",
        targetId: targetUserId,
        details: { mode: "target_user" },
        ipAddress: request.headers.get("x-forwarded-for"),
        userAgent: request.headers.get("user-agent"),
      });

      return NextResponse.json({ success: true, message: "Semua sesi user berhasil dicabut" });
    }

    if (currentToken) {
      await db.delete(sessions).where(ne(sessions.token, currentToken));
    } else {
      await db.delete(sessions);
    }

    await writeAuditLog({
      actorUserId: actor.id,
      action: "revoke_all_sessions_global",
      module: "super_admin",
      targetType: "session",
      targetId: "all",
      details: { keepCurrentSession: Boolean(currentToken) },
      ipAddress: request.headers.get("x-forwarded-for"),
      userAgent: request.headers.get("user-agent"),
    });

    return NextResponse.json({ success: true, message: "Semua sesi berhasil dicabut" });
  } catch (error) {
    console.error("[admin/sessions/revoke-all][POST] error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mencabut sesi" },
      { status: 500 }
    );
  }
});
