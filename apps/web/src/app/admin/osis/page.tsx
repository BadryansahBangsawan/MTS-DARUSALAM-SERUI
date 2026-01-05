"use client";

import { useEffect, useState } from "react";
import { Save, RefreshCw, Check } from "lucide-react";
import { ImageUpload } from "@/components/admin/image-upload";
import { Button } from "@/components/ui/button";
import { authFetch } from "@/lib/auth";

interface OSISData {
  title?: string;
  description?: string;
  image?: string;
  isActive?: boolean;
}

export default function OSISPage() {
  const [data, setData] = useState<OSISData>({
    title: "",
    description: "",
    image: "",
    isActive: true,
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
      const response = await authFetch("/api/osis");
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

      const item = result.data;
      setData({
        title: item.title || "",
        description: item.description || "",
        image: item.image || "",
        isActive: item.isActive ?? true,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveSuccess(false);

    try {
      const payload = {
        title: data.title,
        description: data.description,
        image: data.image,
        isActive: data.isActive,
      };

      const response = await authFetch("/api/osis", {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
        await fetchData();
      } else {
        const errorText = await response.text();
        alert("Gagal menyimpan data: " + errorText);
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Gagal menyimpan data");
    } finally {
      setSaving(false);
    }
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
          <h1 className="text-2xl font-bold text-gray-900">OSIS</h1>
          <p className="text-gray-600">Organisasi Siswa Intra Madrasah</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={fetchData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saveSuccess ? (
              <Check className="h-4 w-4 mr-2" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {saving ? "Menyimpan..." : saveSuccess ? "Tersimpan!" : "Simpan"}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Informasi OSIS
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Judul
              </label>
              <input
                type="text"
                value={data.title || ""}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                className="w-full h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="OSIS"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi
              </label>
              <textarea
                value={data.description || ""}
                onChange={(e) => setData({ ...data, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Deskripsi OSIS"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gambar
              </label>
              <ImageUpload
                value={data.image}
                onChange={(image) => setData({ ...data, image })}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                checked={data.isActive ?? true}
                onChange={(e) => setData({ ...data, isActive: e.target.checked })}
                className="rounded text-green-500 focus:ring-green-500"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                Aktif
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving} size="lg">
            {saveSuccess ? (
              <Check className="h-4 w-4 mr-2" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {saving
              ? "Menyimpan..."
              : saveSuccess
              ? "Tersimpan!"
              : "Simpan Semua Perubahan"}
          </Button>
        </div>
      </div>
    </div>
  );
}
