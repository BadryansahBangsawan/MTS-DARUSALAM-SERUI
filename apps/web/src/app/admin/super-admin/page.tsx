"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, KeyRound, RefreshCw, ShieldCheck, UserPlus } from "lucide-react";
import { authFetch } from "@/lib/auth";

interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface AdminUser {
  id: number;
  name: string;
  email: string;
  username: string;
  role: "admin" | "staff";
  isActive: boolean;
  lastLogin?: string | null;
  createdAt: string;
}

interface AuditItem {
  id: number;
  action: string;
  module: string;
  targetType?: string | null;
  targetId?: string | null;
  createdAt: string;
  actorName?: string | null;
  actorEmail?: string | null;
}

export default function SuperAdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditItem[]>([]);
  const [search, setSearch] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    role: "staff" as "admin" | "staff",
  });

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.username.toLowerCase().includes(q)
    );
  }, [search, users]);

  const checkAccessAndLoad = async () => {
    try {
      const meRes = await authFetch("/api/auth/me");
      const meData = await meRes.json();

      if (!meData?.success || !meData?.user) {
        router.replace("/admin/login");
        return;
      }

      if (meData.user.role !== "admin") {
        router.replace("/admin");
        return;
      }

      setCurrentUser(meData.user);
      await Promise.all([fetchUsers(), fetchAuditLogs()]);
    } catch (error) {
      console.error("[super-admin] load failed:", error);
      router.replace("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void checkAccessAndLoad();
  }, []);

  const fetchUsers = async () => {
    const response = await authFetch("/api/admin/users");
    const data = await response.json();
    if (data?.success) {
      setUsers(data.data || []);
    }
  };

  const fetchAuditLogs = async () => {
    const response = await authFetch("/api/admin/audit-logs?limit=30");
    const data = await response.json();
    if (data?.success) {
      setAuditLogs(data.data || []);
    }
  };

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      const response = await authFetch("/api/admin/users", {
        method: "POST",
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      if (!data?.success) {
        alert(data?.error || "Gagal membuat user");
        return;
      }

      setNewUser({ name: "", email: "", username: "", password: "", role: "staff" });
      await Promise.all([fetchUsers(), fetchAuditLogs()]);
    } catch (error) {
      console.error("[super-admin] create user failed:", error);
      alert("Terjadi kesalahan saat membuat user");
    } finally {
      setBusy(false);
    }
  };

  const updateUser = async (userId: number, payload: Record<string, unknown>) => {
    if (busy) return;
    setBusy(true);
    try {
      const response = await authFetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!data?.success) {
        alert(data?.error || "Gagal memperbarui user");
        return;
      }
      await Promise.all([fetchUsers(), fetchAuditLogs()]);
    } catch (error) {
      console.error("[super-admin] update user failed:", error);
      alert("Terjadi kesalahan saat memperbarui user");
    } finally {
      setBusy(false);
    }
  };

  const resetPassword = async (userId: number) => {
    const password = window.prompt("Masukkan password baru (minimal 8 karakter):");
    if (!password) return;
    if (password.length < 8) {
      alert("Password minimal 8 karakter");
      return;
    }
    await updateUser(userId, { resetPassword: password });
  };

  const revokeSessions = async (userId?: number) => {
    if (busy) return;
    const isGlobal = !userId;
    const ok = window.confirm(
      isGlobal
        ? "Cabut semua sesi login (kecuali sesi Anda saat ini)?"
        : "Cabut semua sesi untuk user ini?"
    );
    if (!ok) return;

    setBusy(true);
    try {
      const response = await authFetch("/api/admin/sessions/revoke-all", {
        method: "POST",
        body: JSON.stringify(userId ? { userId } : {}),
      });
      const data = await response.json();
      if (!data?.success) {
        alert(data?.error || "Gagal mencabut sesi");
        return;
      }
      alert(data.message || "Berhasil");
      await fetchAuditLogs();
    } catch (error) {
      console.error("[super-admin] revoke sessions failed:", error);
      alert("Terjadi kesalahan saat mencabut sesi");
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-rose-500 mx-auto"></div>
          <p className="mt-3 text-sm text-slate-600">Memuat panel super admin...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) return null;

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-3 py-1 text-xs font-semibold text-rose-700">
              <ShieldCheck size={14} />
              Super Admin
            </div>
            <h1 className="mt-3 text-2xl font-bold text-slate-900">Kontrol Akses Tingkat Sistem</h1>
            <p className="mt-1 text-sm text-slate-600">
              Login sebagai <b>{currentUser.name}</b> ({currentUser.email})
            </p>
          </div>
          <button
            type="button"
            onClick={() => void Promise.all([fetchUsers(), fetchAuditLogs()])}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Buat User Admin/Staff</h2>
          <UserPlus className="text-slate-500" size={18} />
        </div>
        <form onSubmit={createUser} className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
          <input
            value={newUser.name}
            onChange={(e) => setNewUser((p) => ({ ...p, name: e.target.value }))}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="Nama"
            required
          />
          <input
            value={newUser.email}
            onChange={(e) => setNewUser((p) => ({ ...p, email: e.target.value }))}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="Email"
            type="email"
            required
          />
          <input
            value={newUser.username}
            onChange={(e) => setNewUser((p) => ({ ...p, username: e.target.value }))}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="Username"
            required
          />
          <input
            value={newUser.password}
            onChange={(e) => setNewUser((p) => ({ ...p, password: e.target.value }))}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="Password minimal 8"
            type="password"
            minLength={8}
            required
          />
          <div className="flex gap-2">
            <select
              value={newUser.role}
              onChange={(e) => setNewUser((p) => ({ ...p, role: e.target.value as "admin" | "staff" }))}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
            <button
              type="submit"
              disabled={busy}
              className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 disabled:opacity-60"
            >
              Tambah
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-900">Manajemen User Admin</h2>
          <div className="flex items-center gap-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
              placeholder="Cari nama/email/username"
            />
            <button
              type="button"
              onClick={() => void revokeSessions()}
              disabled={busy}
              className="inline-flex items-center gap-1 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-800 hover:bg-amber-100 disabled:opacity-60"
            >
              <KeyRound size={14} />
              Cabut Semua Sesi
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500">
                <th className="px-3 py-2">User</th>
                <th className="px-3 py-2">Role</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Last Login</th>
                <th className="px-3 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((item) => (
                <tr key={item.id} className="border-b border-slate-100">
                  <td className="px-3 py-3">
                    <p className="font-medium text-slate-900">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.email}</p>
                    <p className="text-xs text-slate-400">@{item.username}</p>
                  </td>
                  <td className="px-3 py-3">
                    <select
                      value={item.role}
                      onChange={(e) =>
                        void updateUser(item.id, { role: e.target.value as "admin" | "staff" })
                      }
                      className="rounded-md border border-slate-300 px-2 py-1 text-xs"
                      disabled={busy}
                    >
                      <option value="admin">admin</option>
                      <option value="staff">staff</option>
                    </select>
                  </td>
                  <td className="px-3 py-3">
                    <label className="inline-flex items-center gap-2 text-xs text-slate-700">
                      <input
                        type="checkbox"
                        checked={item.isActive}
                        disabled={busy}
                        onChange={(e) => void updateUser(item.id, { isActive: e.target.checked })}
                      />
                      {item.isActive ? "Aktif" : "Nonaktif"}
                    </label>
                  </td>
                  <td className="px-3 py-3 text-xs text-slate-600">
                    {item.lastLogin ? new Date(item.lastLogin).toLocaleString("id-ID") : "-"}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="rounded-md border border-slate-300 px-2 py-1 text-xs hover:bg-slate-50"
                        onClick={() => void resetPassword(item.id)}
                        disabled={busy}
                      >
                        Reset Password
                      </button>
                      <button
                        type="button"
                        className="rounded-md border border-amber-300 bg-amber-50 px-2 py-1 text-xs text-amber-800 hover:bg-amber-100"
                        onClick={() => void revokeSessions(item.id)}
                        disabled={busy}
                      >
                        Cabut Sesi User
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!filteredUsers.length && (
                <tr>
                  <td colSpan={5} className="px-3 py-6 text-center text-sm text-slate-500">
                    Tidak ada data user.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Audit Logs</h2>
        <p className="mt-1 text-sm text-slate-600">30 aktivitas terbaru modul super admin.</p>
        <div className="mt-4 space-y-2">
          {auditLogs.map((item) => (
            <div key={item.id} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              <p className="text-sm font-medium text-slate-900">
                {item.action} <span className="text-slate-500">({item.module})</span>
              </p>
              <p className="text-xs text-slate-600">
                Oleh {item.actorName || "system"} {item.actorEmail ? `- ${item.actorEmail}` : ""}
              </p>
              <p className="text-xs text-slate-500">
                Target: {item.targetType || "-"} {item.targetId || "-"} •{" "}
                {new Date(item.createdAt).toLocaleString("id-ID")}
              </p>
            </div>
          ))}
          {!auditLogs.length && (
            <p className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-4 text-sm text-slate-500">
              Belum ada audit log.
            </p>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-sm">
            Semua tindakan di halaman ini tercatat ke audit log. Gunakan hanya untuk kebutuhan operasional inti.
          </p>
        </div>
      </section>
    </div>
  );
}

