"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Award, Settings, TrendingUp, Plus, RefreshCw, ChevronRight, ArrowUp, ArrowDown, Users as UsersIcon, BookOpen, GraduationCap, Layers, HeartHandshake, Newspaper, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authFetch, removeAuthToken } from "@/lib/auth";

interface Stats {
  ekstrakurikuler: number;
  organizationPositions: number;
  totalStudents: number;
  blogNews: number;
  testimonials: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    ekstrakurikuler: 0,
    organizationPositions: 0,
    totalStudents: 0,
    blogNews: 0,
    testimonials: 0,
  });

  useEffect(() => {
    checkAuth();
    fetchStats();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await authFetch("/api/auth/me");
      const data = await response.json();

      if (!data.success) {
        router.push("/admin/login");
      }
    } catch (error) {
      console.error('[Dashboard] Auth check error:', error);
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    setStatsLoading(true);
    try {
      const [ekstraRes, orgRes, schoolRes, blogNewsRes, testimonialsRes] = await Promise.all([
        authFetch("/api/ekstrakurikuler"),
        authFetch("/api/organization-positions"),
        authFetch("/api/school-information"),
        authFetch("/api/blog-news"),
        authFetch("/api/testimonials"),
      ]);

      const [ekstraData, orgData, schoolData, blogNewsData, testimonialsData] = await Promise.all([
        ekstraRes.json(),
        orgRes.json(),
        schoolRes.json(),
        blogNewsRes.json(),
        testimonialsRes.json(),
      ]);

      const schoolItem = Array.isArray(schoolData.data) ? schoolData.data[0] : schoolData.data;

      setStats({
        ekstrakurikuler: ekstraData.data?.length || 0,
        organizationPositions: orgData.data?.length || 0,
        totalStudents: schoolItem?.totalStudents || 0,
        blogNews: blogNewsData.data?.length || 0,
        testimonials: testimonialsData.data?.length || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setStatsLoading(false);
    }
  };

  const menuItems = [
    { href: "/admin/school-information", icon: Settings, label: "Informasi Sekolah", color: "from-cyan-500 to-cyan-600", desc: "Kelola visi, misi, dan profil sekolah" },
    { href: "/admin/ekstrakurikuler", icon: Award, label: "Ekstrakurikuler", color: "from-emerald-500 to-emerald-600", desc: "Tambah dan edit kegiatan ekstrakurikuler" },
    { href: "/admin/organization-positions", icon: UsersIcon, label: "Organisasi", color: "from-indigo-500 to-indigo-600", desc: "Kelola struktur organisasi sekolah" },
    { href: "/admin/blog-news", icon: Newspaper, label: "Blog & Berita", color: "from-rose-500 to-rose-600", desc: "Kelola berita, pengumuman, artikel, dan kegiatan" },
    { href: "/admin/testimonials", icon: MessageSquare, label: "Testimoni", color: "from-teal-500 to-teal-600", desc: "Kelola testimoni alumni" },
    { href: "/admin/osis", icon: GraduationCap, label: "OSIS", color: "from-violet-500 to-violet-600", desc: "Kelola informasi OSIS sekolah" },
    { href: "/admin/environment-features", icon: Layers, label: "Lingkungan Belajar", color: "from-amber-500 to-amber-600", desc: "Kelola fitur lingkungan sekolah" },
    { href: "/admin/personal-approach", icon: HeartHandshake, label: "Pendekatan Personal", color: "from-pink-500 to-pink-600", desc: "Kelola pendekatan personal siswa" },
  ];

  const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-50 to-transparent rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
      <div className="relative">
        <div className={`w-14 h-14 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <p className="text-sm font-medium text-slate-500 mt-4">{title}</p>
        <p className="text-3xl font-bold text-slate-900 mt-2">{statsLoading ? "..." : value}</p>
        {trend && (
          <div className="flex items-center mt-2 text-xs font-medium">
            {trend === "up" ? (
              <span className="flex items-center text-emerald-600">
                <ArrowUp className="w-3 h-3 mr-1" />
                +12%
              </span>
            ) : (
              <span className="flex items-center text-rose-600">
                <ArrowDown className="w-3 h-3 mr-1" />
                -5%
              </span>
            )}
            <span className="text-slate-400 ml-2">dari bulan lalu</span>
          </div>
        )}
      </div>
    </div>
  );

  const QuickAction = ({ href, icon: Icon, label, color }: any) => (
    <a
      href={href}
      className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex items-center space-x-4 overflow-hidden"
    >
      <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-slate-900">{label}</p>
        <p className="text-sm text-slate-500">Kelola {label.toLowerCase()}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" />
    </a>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-emerald-500 mx-auto"></div>
          <p className="mt-4 text-slate-600 font-medium">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Selamat Datang, Admin!</h1>
          <p className="text-slate-500 mt-2">Kelola semua konten website MTs Darussalam</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={fetchStats} disabled={statsLoading} className="bg-white/80 backdrop-blur-sm border-slate-200/60 hover:bg-slate-50">
            <RefreshCw className={`h-4 w-4 mr-2 ${statsLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button onClick={() => window.location.href = "/admin/ekstrakurikuler"} className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 shadow-lg shadow-emerald-500/30">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Baru
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Siswa" value={stats.totalStudents} icon={Users} color="from-blue-500 to-blue-600" trend="up" />
        <StatCard title="Ekstrakurikuler" value={stats.ekstrakurikuler} icon={BookOpen} color="from-emerald-500 to-emerald-600" trend="up" />
        <StatCard title="Testimoni" value={stats.testimonials} icon={MessageSquare} color="from-teal-500 to-teal-600" trend="up" />
        <StatCard title="Blog & Berita" value={stats.blogNews} icon={Newspaper} color="from-rose-500 to-rose-600" trend="up" />
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Aksi Cepat</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.slice(0, 3).map((item) => (
            <QuickAction key={item.href} href={item.href} icon={item.icon} label={item.label} color={item.color} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Semua Menu</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menuItems.map((item) => (
            <QuickAction key={item.href} href={item.href} icon={item.icon} label={item.label} color={item.color} />
          ))}
        </div>
      </div>
    </div>
  );
}
