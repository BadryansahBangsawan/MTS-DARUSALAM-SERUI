import { NextRequest, NextResponse } from "next/server";
import { and, desc, eq, ilike, ne, or } from "drizzle-orm";
import { db } from "@my-better-t-app/db";
import { users } from "@my-better-t-app/db/schema";
import { hashPassword } from "@/lib/auth";
import { requireAdmin } from "@/lib/middleware";
import { writeAuditLog } from "@/lib/audit";

export const GET = requireAdmin(async (request: NextRequest) => {
  try {
    const search = (request.nextUrl.searchParams.get("search") || "").trim();
    const role = (request.nextUrl.searchParams.get("role") || "").trim();

    const conditions: any[] = [];

    if (search) {
      conditions.push(
        or(
          ilike(users.name, `%${search}%`),
          ilike(users.email, `%${search}%`),
          ilike(users.username, `%${search}%`)
        )
      );
    }

    if (role === "admin" || role === "staff") {
      conditions.push(eq(users.role, role));
    }

    const rows = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        username: users.username,
        role: users.role,
        isActive: users.isActive,
        lastLogin: users.lastLogin,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(desc(users.createdAt));

    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error("[admin/users][GET] error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data user admin" },
      { status: 500 }
    );
  }
});

export const POST = requireAdmin(async (request: NextRequest, actor: any) => {
  try {
    const body = await request.json();
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim().toLowerCase();
    const username = String(body?.username || "").trim();
    const password = String(body?.password || "");
    const role = body?.role === "staff" ? "staff" : "admin";

    if (!name || !email || !username || password.length < 8) {
      return NextResponse.json(
        { success: false, error: "Nama, email, username, dan password (min. 8) wajib diisi" },
        { status: 400 }
      );
    }

    const [existing] = await db
      .select({ id: users.id })
      .from(users)
      .where(or(eq(users.email, email), eq(users.username, username)))
      .limit(1);

    if (existing) {
      return NextResponse.json(
        { success: false, error: "Email atau username sudah dipakai" },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    const [created] = await db
      .insert(users)
      .values({
        name,
        email,
        username,
        role,
        isActive: true,
        passwordHash,
      })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        username: users.username,
        role: users.role,
        isActive: users.isActive,
        createdAt: users.createdAt,
      });

    await writeAuditLog({
      actorUserId: actor.id,
      action: "create_user",
      module: "super_admin",
      targetType: "user",
      targetId: created.id,
      details: { role, email, username },
      ipAddress: request.headers.get("x-forwarded-for"),
      userAgent: request.headers.get("user-agent"),
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error("[admin/users][POST] error:", error);
    return NextResponse.json(
      { success: false, error: "Gagal membuat user admin" },
      { status: 500 }
    );
  }
});

