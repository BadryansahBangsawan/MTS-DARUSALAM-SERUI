"use client";

import { useEffect, useState } from "react";
import { Save, RefreshCw, Check } from "lucide-react";
import { VideoInput } from "@/components/admin/video-input";
import { ImageUpload } from "@/components/admin/image-upload";
import { StatusToggle } from "@/components/admin/status-toggle";
import { Button } from "@/components/ui/button";

interface VideoSectionData {
  title?: string;
  description?: string;
  videoUrl?: string;
  thumbnail?: string;
  isActive?: boolean;
}

export default function VideoSectionPage() {
  const [data, setData] = useState<VideoSectionData>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/video-section");
      const result = await response.json();
      if (result.success) {
        setData(result.data || {});
      }
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
      const response = await fetch("/api/video-section", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        alert("Gagal menyimpan data");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Gagal menyimpan data");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof VideoSectionData, value: any) => {
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
          <h1 className="text-2xl font-bold text-gray-900">Kelola Video Section</h1>
          <p className="text-gray-600">Kelola video yang ditampilkan di homepage</p>
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

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Judul
            </label>
            <input
              type="text"
              value={data.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Judul section video"
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
              placeholder="Deskripsi section video"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL Video YouTube
            </label>
            <VideoInput
              value={data.videoUrl}
              onChange={(videoUrl) => handleChange("videoUrl", videoUrl)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thumbnail
            </label>
            <ImageUpload
              value={data.thumbnail}
              onChange={(thumbnail) => handleChange("thumbnail", thumbnail)}
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <StatusToggle
              checked={data.isActive ?? true}
              onChange={(isActive) => handleChange("isActive", isActive)}
            />
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
