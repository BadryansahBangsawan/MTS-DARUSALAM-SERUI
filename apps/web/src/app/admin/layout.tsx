"use client";

import {
  LogOut,
  Menu,
  X,
  Home,
  Globe,
  User,
  Award,
  Layers,
  HeartHandshake,
  GraduationCap,
  Bell,
  Settings,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { authFetch, removeAuthToken } from "@/lib/auth";

const menuItems = [
  {
    href: "/admin",
    icon: Home,
    label: "Dashboard",
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
  },
  {
    href: "/admin/school-information",
    icon: Globe,
    label: "Informasi Sekolah",
    color: "bg-gradient-to-br from-cyan-500 to-cyan-600",
  },
  {
    href: "/admin/ekstrakurikuler",
    icon: Award,
    label: "Ekstrakurikuler",
    color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
  },
  {
    href: "/admin/environment-features",
    icon: Layers,
    label: "Lingkungan Belajar",
    color: "bg-gradient-to-br from-amber-500 to-amber-600",
  },
  {
    href: "/admin/personal-approach",
    icon: HeartHandshake,
    label: "Pendekatan Personal",
    color: "bg-gradient-to-br from-pink-500 to-pink-600",
  },
  {
    href: "/admin/osis",
    icon: GraduationCap,
    label: "OSIS",
    color: "bg-gradient-to-br from-violet-500 to-violet-600",
  },
  {
    href: "/admin/organization-positions",
    icon: User,
    label: "Organisasi",
    color: "bg-gradient-to-br from-indigo-500 to-indigo-600",
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await authFetch("/api/auth/logout", { method: "POST" });
      removeAuthToken();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Hindari flash/glitch layout admin saat hydration awal
  // dan pastikan route /admin/login (termasuk trailing slash/query) tidak pakai chrome dashboard.
  const normalizedPath = pathname?.replace(/\/+$/, "") || "";
  const isLoginPage = normalizedPath.startsWith("/admin/login");

  useEffect(() => {
    if (!mounted) return;

    if (isLoginPage) {
      setAuthChecking(false);
      return;
    }

    let cancelled = false;

    const checkAuth = async () => {
      try {
        const response = await authFetch("/api/auth/me");
        const data = await response.json();

        if (!data?.success) {
          removeAuthToken();
          window.location.replace("/admin/login");
          return;
        }

        if (!cancelled) {
          setAuthChecking(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        removeAuthToken();
        window.location.replace("/admin/login");
      }
    };

    void checkAuth();

    return () => {
      cancelled = true;
    };
  }, [mounted, isLoginPage, pathname]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-slate-200 border-t-emerald-500 mx-auto"></div>
          <p className="mt-3 text-sm text-slate-600">Memuat...</p>
        </div>
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-slate-200 border-t-emerald-500 mx-auto"></div>
          <p className="mt-3 text-sm text-slate-600">Memeriksa akses admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 shadow-xl transform transition-all duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-slate-200/60">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src="/logo-mts.png"
                alt="Logo MTS Darrusalam"
                className="h-12 w-auto"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Admin Panel
              </h1>
              <p className="text-sm text-slate-500">MTs Darussalam</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-280px)] custom-scrollbar">
          <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Menu Utama
          </div>
          {menuItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href as any}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-50 to-emerald-100/50 text-emerald-700 shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isActive
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                        : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700"
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <span className="font-medium">{item.label}</span>
                </div>
                {isActive && (
                  <ChevronRight size={16} className="text-emerald-500" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200/60 bg-white/50 backdrop-blur-sm">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full space-x-2 px-4 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl hover:from-red-600 hover:to-rose-700 transition-all duration-200 shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
          >
            <LogOut size={18} />
            <span className="font-medium">Keluar</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 lg:ml-72">
        <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-40 shadow-sm">
          <div className="px-4 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div className="hidden md:block">
                <h2 className="text-lg font-semibold text-slate-800">
                  {menuItems.find(
                    (item) =>
                      pathname === item.href ||
                      pathname.startsWith(item.href + "/")
                  )?.label || "Dashboard"}
                </h2>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
                <Bell size={18} className="text-slate-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="hidden sm:flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200/60">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                  A
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-slate-800">Admin</p>
                  <p className="text-xs text-slate-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">{children}</main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
