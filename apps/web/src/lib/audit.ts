import { db } from "@my-better-t-app/db";
import { auditLogs } from "@my-better-t-app/db/schema";

type AuditInput = {
  actorUserId?: number | null;
  action: string;
  module: string;
  targetType?: string | null;
  targetId?: string | number | null;
  details?: Record<string, unknown> | null;
  ipAddress?: string | null;
  userAgent?: string | null;
};

export async function writeAuditLog(input: AuditInput) {
  try {
    await db.insert(auditLogs).values({
      actorUserId: input.actorUserId ?? null,
      action: input.action,
      module: input.module,
      targetType: input.targetType ?? null,
      targetId: input.targetId != null ? String(input.targetId) : null,
      details: input.details ?? null,
      ipAddress: input.ipAddress ?? null,
      userAgent: input.userAgent ?? null,
    });
  } catch (error) {
    console.error("[audit] failed to write log:", error);
  }
}

