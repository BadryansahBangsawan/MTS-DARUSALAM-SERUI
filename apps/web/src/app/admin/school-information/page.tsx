"use client";

import { useEffect, useState } from "react";
import { Save, RefreshCw, Check } from "lucide-react";
import { ImageUpload } from "@/components/admin/image-upload";
import { Button } from "@/components/ui/button";

interface SchoolInformationData {
  name?: string;
  description?: string;
  principalName?: string;
  principalTitle?: string;
  principalImage?: string;
  vision?: string;
  mission?: string;
  address?: string;
  email?: string;
  phone?: string;
  whatsappRegistration?: string;
  operatingHoursWeekdays?: string;
  operatingHoursSaturday?: string;
  socialMediaFacebook?: string;
  socialMediaInstagram?: string;
  socialMediaYoutube?: string;
  youtubeVideoUrl?: string;
  totalStudents?: number;
  averageApplicantsPerYear?: number;
}

export default function SchoolInformationPage() {
  const [data, setData] = useState<SchoolInformationData>({
    name: "",
    description: "",
    principalName: "",
    principalTitle: "",
    principalImage: "",
    vision: "",
    mission: "",
    address: "",
    email: "",
    phone: "",
    whatsappRegistration: "",
    operatingHoursWeekdays: "",
    operatingHoursSaturday: "",
    socialMediaFacebook: "",
    socialMediaInstagram: "",
    socialMediaYoutube: "",
    youtubeVideoUrl: "",
    totalStudents: 190,
    averageApplicantsPerYear: 63,
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/school-information");
      if (!response.ok) {
        console.error("API error:", response.status);
        return;
      }

      const result = await response.json();
      if (!result.success || !result.data) {
        console.error("No data found");
        setLoading(false);
        return;
      }

      const item = Array.isArray(result.data) ? result.data[0] : result.data;
      console.log("School info item from API:", item);

      // Initialize with empty values if parsing fails
      let operatingHoursWeekdays = "";
      let operatingHoursSaturday = "";
      let socialMediaFacebook = "";
      let socialMediaInstagram = "";
      let socialMediaYoutube = "";

      // Handle operatingHours
      try {
        if (item.operatingHours) {
          if (typeof item.operatingHours === 'object') {
            operatingHoursWeekdays = item.operatingHours.weekdays || "";
            operatingHoursSaturday = item.operatingHours.saturday || "";
          } else if (typeof item.operatingHours === 'string') {
            const parsed = JSON.parse(item.operatingHours);
            if (parsed && typeof parsed === 'object') {
              operatingHoursWeekdays = parsed.weekdays || "";
              operatingHoursSaturday = parsed.saturday || "";
            }
          }
        }
      } catch (e) {
        console.warn("Error parsing operatingHours:", e);
      }

      // Handle socialMedia
      try {
        if (item.socialMedia) {
          if (typeof item.socialMedia === 'object') {
            socialMediaFacebook = item.socialMedia.facebook || "";
            socialMediaInstagram = item.socialMedia.instagram || "";
            socialMediaYoutube = item.socialMedia.youtube || "";
          } else if (typeof item.socialMedia === 'string') {
            const parsed = JSON.parse(item.socialMedia);
            if (parsed && typeof parsed === 'object') {
              socialMediaFacebook = parsed.facebook || "";
              socialMediaInstagram = parsed.instagram || "";
              socialMediaYoutube = parsed.youtube || "";
            }
          }
        }
      } catch (e) {
        console.warn("Error parsing socialMedia:", e);
      }

      console.log("Parsed values:", {
        operatingHoursWeekdays,
        operatingHoursSaturday,
        socialMediaFacebook,
        socialMediaInstagram,
        socialMediaYoutube,
      });

      setData({
        name: item.name || "",
        description: item.description || "",
        principalName: item.principalName || "",
        principalTitle: item.principalTitle || "",
        principalImage: item.principalImage || "",
        vision: item.vision || "",
        mission: item.mission || "",
        address: item.address || "",
        email: item.email || "",
        phone: item.phone || "",
        whatsappRegistration: item.whatsappRegistration || "",
        operatingHoursWeekdays,
        operatingHoursSaturday,
        socialMediaFacebook,
        socialMediaInstagram,
        socialMediaYoutube,
        youtubeVideoUrl: item.youtubeVideoUrl || "",
        totalStudents: item.totalStudents || 190,
        averageApplicantsPerYear: item.averageApplicantsPerYear || 63,
      });
    } catch (error) {
      console.error("Error fetching data:", error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!data.name?.trim()) {
      alert("Nama sekolah wajib diisi");
      return;
    }

    setSaving(true);
    setSaveSuccess(false);

    try {
      const payload = {
        name: data.name,
        description: data.description,
        principalName: data.principalName,
        principalTitle: data.principalTitle,
        principalImage: data.principalImage,
        vision: data.vision,
        mission: data.mission,
        address: data.address,
        email: data.email,
        phone: data.phone,
        whatsappRegistration: data.whatsappRegistration,
        operatingHours: {
          weekdays: data.operatingHoursWeekdays || "",
          saturday: data.operatingHoursSaturday || "",
        },
        socialMedia: {
          facebook: data.socialMediaFacebook || "",
          instagram: data.socialMediaInstagram || "",
          youtube: data.socialMediaYoutube || "",
        },
        youtubeVideoUrl: data.youtubeVideoUrl,
        totalStudents: data.totalStudents || 190,
        averageApplicantsPerYear: data.averageApplicantsPerYear || 63,
      };

      console.log("Saving payload:", payload);

      const response = await fetch("/api/school-information", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        await fetchData(); // Refresh data after save
      } else {
        const errorText = await response.text();
        console.error("Save error response:", response.status, errorText);
        alert("Gagal menyimpan data: " + errorText);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert("Gagal menyimpan data: " + errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof SchoolInformationData, value: any) => {
    setData({ ...data, [field]: value });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Informasi Sekolah</h1>
          <p className="text-gray-600">Kelola informasi sekolah MTs Darussalam</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={fetchData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saveSuccess ? <Check className="h-4 w-4 mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            {saving ? "Menyimpan..." : saveSuccess ? "Tersimpan!" : "Simpan"}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Hero Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Sekolah*
              </label>
              <input
                type="text"
                value={data.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Nama sekolah"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi
              </label>
              <textarea
                value={data.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Deskripsi sekolah"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                WhatsApp Pendaftaran
              </label>
              <input
                type="text"
                value={data.whatsappRegistration || ""}
                onChange={(e) => handleChange("whatsappRegistration", e.target.value)}
                className="w-full h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="628123456789"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Visi & Misi Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Visi
              </label>
              <textarea
                value={data.vision || ""}
                onChange={(e) => handleChange("vision", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Visi sekolah"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Misi
              </label>
              <textarea
                value={data.mission || ""}
                onChange={(e) => handleChange("mission", e.target.value)}
                rows={4}
                className="w-full px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Misi sekolah (setiap misi di baris baru)"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Video Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Video Sekolah (YouTube)
              </label>
              <input
                type="url"
                value={data.youtubeVideoUrl || ""}
                onChange={(e) => handleChange("youtubeVideoUrl", e.target.value)}
                className="w-full h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="https://youtu.be/..."
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Kepala Sekolah & Statistik</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Kepala Sekolah
              </label>
              <input
                type="text"
                value={data.principalName || ""}
                onChange={(e) => handleChange("principalName", e.target.value)}
                className="w-full h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Nama kepala sekolah"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jabatan
              </label>
              <input
                type="text"
                value={data.principalTitle || ""}
                onChange={(e) => handleChange("principalTitle", e.target.value)}
                className="w-full h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Jabatan kepala sekolah"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Foto Kepala Sekolah
              </label>
              <ImageUpload
                value={data.principalImage}
                onChange={(principalImage) => handleChange("principalImage", principalImage)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Siswa
                </label>
                <input
                  type="number"
                  min="0"
                  value={data.totalStudents || 0}
                  onChange={(e) => handleChange("totalStudents", parseInt(e.target.value) || 0)}
                  className="w-full h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rata-rata Pendaftar per Tahun
                </label>
                <input
                  type="number"
                  min="0"
                  value={data.averageApplicantsPerYear || 0}
                  onChange={(e) => handleChange("averageApplicantsPerYear", parseInt(e.target.value) || 0)}
                  className="w-full h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Footer - Kontak & Info</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alamat
              </label>
              <textarea
                value={data.address || ""}
                onChange={(e) => handleChange("address", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Alamat sekolah"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={data.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="email@sekolah.id"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telepon
                </label>
                <input
                  type="text"
                  value={data.phone || ""}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="w-full h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="+62 13-xxxx-xxxx"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senin - Jumat
                </label>
                <input
                  type="text"
                  value={data.operatingHoursWeekdays || ""}
                  onChange={(e) => handleChange("operatingHoursWeekdays", e.target.value)}
                  className="w-full h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="07:00 - 14:00 WIT"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sabtu
                </label>
                <input
                  type="text"
                  value={data.operatingHoursSaturday || ""}
                  onChange={(e) => handleChange("operatingHoursSaturday", e.target.value)}
                  className="w-full h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="07:00 - 12:00 WIT"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Footer - Media Sosial</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Facebook
              </label>
              <input
                type="url"
                value={data.socialMediaFacebook || ""}
                onChange={(e) => handleChange("socialMediaFacebook", e.target.value)}
                className="w-full h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="https://facebook.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram
              </label>
              <input
                type="url"
                value={data.socialMediaInstagram || ""}
                onChange={(e) => handleChange("socialMediaInstagram", e.target.value)}
                className="w-full h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="https://instagram.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                YouTube
              </label>
              <input
                type="url"
                value={data.socialMediaYoutube || ""}
                onChange={(e) => handleChange("socialMediaYoutube", e.target.value)}
                className="w-full h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="https://youtube.com/@..."
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving} size="lg">
            {saveSuccess ? <Check className="h-4 w-4 mr-2" /> : <Save className="h-4 w-4 mr-2" />}
            {saving ? "Menyimpan..." : saveSuccess ? "Tersimpan!" : "Simpan Semua Perubahan"}
          </Button>
        </div>
      </div>
    </div>
  );
}
