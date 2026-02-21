import { NextRequest, NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@my-better-t-app/db";
import { auditLogs, users } from "@my-better-t-app/db/schema";
import { requireAdmin } from "@/lib/middleware";

export const GET = requireAdmin(async (request: NextRequest) => {
  try {
    const limitParam = Number(request.nextUrl.searchParams.get("limit") || 30);
    const limit = Number.isFinite(limitParam) ? Math.min(Math.max(limitParam, 1), 100) : 30;

    const rows = await db
      .select({
        id: auditLogs.id,
        action: auditLogs.action,
        module: auditLogs.module,
        targetType: auditLogs.targetType,
        targetId: auditLogs.targetId,
        details: auditLogs.details,
        ipAddress: auditLogs.ipAddress,
        userAgent: auditLogs.userAgent,
        createdAt: auditLogs.createdAt,
        actorUserId: auditLogs.actorUserId,
        actorName: users.name,
        actorEmail: users.email,
      })
      .from(auditLogs)
      .leftJoin(users, eq(users.id, auditLogs.actorUserId))
      .orderBy(desc(auditLogs.createdAt))
      .limit(limit);

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error("[admin/audit-logs][GET] error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil audit logs" },
      { status: 500 }
    );
  }
});
