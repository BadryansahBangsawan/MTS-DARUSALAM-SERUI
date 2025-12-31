"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, BookOpen, Award, MessageSquare, Settings, LogOut, Video, TrendingUp, Plus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Stats {
  ekstrakurikuler: number;
  mataPelajaran: number;
  organizationPositions: number;
  testimonials: {
    total: number;
    pending: number;
    approved: number;
  };
  totalStudents: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    ekstrakurikuler: 0,
    mataPelajaran: 0,
    organizationPositions: 0,
    testimonials: { total: 0, pending: 0, approved: 0 },
    totalStudents: 0,
  });

  useEffect(() => {
    checkAuth();
    fetchStats();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include"
      });
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
      const [
        ekstraRes,
        mpRes,
        orgRes,
        testiRes,
        schoolRes,
      ] = await Promise.all([
        fetch("/api/ekstrakurikuler"),
        fetch("/api/mata-pelajaran"),
        fetch("/api/organization-positions"),
        fetch("/api/testimonials"),
        fetch("/api/school-information"),
      ]);

      const [ekstraData, mpData, orgData, testiData, schoolData] = await Promise.all([
        ekstraRes.json(),
        mpRes.json(),
        orgRes.json(),
        testiRes.json(),
        schoolRes.json(),
      ]);

      const testimonialsData = testiData.data || [];
      const testimonials = {
        total: testimonialsData.length,
        pending: testimonialsData.filter((t: any) => !t.isApproved).length,
        approved: testimonialsData.filter((t: any) => t.isApproved).length,
      };

      const schoolItem = Array.isArray(schoolData.data) ? schoolData.data[0] : schoolData.data;

      setStats({
        ekstrakurikuler: ekstraData.data?.length || 0,
        mataPelajaran: mpData.data?.length || 0,
        organizationPositions: orgData.data?.length || 0,
        testimonials,
        totalStudents: schoolItem?.totalStudents || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setStatsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const menuItems = [
    { href: "/admin/school-information", icon: Settings, label: "Informasi Sekolah", color: "bg-blue-500", desc: "Visi, misi, kontak, dll" },
    { href: "/admin/ekstrakurikuler", icon: Award, label: "Ekstrakurikuler", color: "bg-green-500", desc: "Kegiatan ekstrakurikuler" },
    { href: "/admin/organization-positions", icon: Users, label: "Organisasi", color: "bg-purple-500", desc: "Struktur organisasi" },
    { href: "/admin/mata-pelajaran", icon: BookOpen, label: "Mata Pelajaran", color: "bg-orange-500", desc: "Kurikulum pembelajaran" },
    { href: "/admin/testimonials", icon: MessageSquare, label: "Testimoni", color: "bg-pink-500", desc: "Ulasan siswa & orang tua" },
    { href: "/admin/video-section", icon: Video, label: "Video", color: "bg-red-500", desc: "Video sekolah" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-screen-xl px-8 mx-auto py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Selamat Datang, Admin!
            </h1>
            <p className="text-gray-600">
              Kelola semua konten website MTs Darussalam dari dashboard ini.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={fetchStats} disabled={statsLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${statsLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Ringkasan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
              <p className="text-sm text-gray-600 mb-1">Total Siswa</p>
              <p className="text-3xl font-bold text-gray-900">{statsLoading ? "..." : stats.totalStudents}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
              <p className="text-sm text-gray-600 mb-1">Ekstrakurikuler</p>
              <p className="text-3xl font-bold text-gray-900">{statsLoading ? "..." : stats.ekstrakurikuler}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
              <p className="text-sm text-gray-600 mb-1">Struktur Organisasi</p>
              <p className="text-3xl font-bold text-gray-900">{statsLoading ? "..." : stats.organizationPositions}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-orange-500">
              <p className="text-sm text-gray-600 mb-1">Mata Pelajaran</p>
              <p className="text-3xl font-bold text-gray-900">{statsLoading ? "..." : stats.mataPelajaran}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-pink-500">
              <p className="text-sm text-gray-600 mb-1">Total Testimoni</p>
              <p className="text-3xl font-bold text-gray-900">{statsLoading ? "..." : stats.testimonials.total}</p>
              <p className="text-xs text-gray-500 mt-1">
                {stats.testimonials.pending} menunggu • {stats.testimonials.approved} disetujui
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Aksi Cepat</h2>
          <div className="flex items-center space-x-3">
            <Button onClick={() => (window.location.href = "/admin/ekstrakurikuler")}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Ekstrakurikuler
            </Button>
            <Button variant="outline" onClick={() => (window.location.href = "/admin/testimonials")}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Testimoni
            </Button>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Menu Utama</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow group cursor-pointer"
              >
                <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.label}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.desc}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
