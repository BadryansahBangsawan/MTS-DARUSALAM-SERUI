"use client";

import { useEffect, useState } from "react";
import { Save, RefreshCw, Check, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/image-upload";
import { authFetch } from "@/lib/auth";

interface Point {
  title: string;
  description: string;
  icon: string;
}

interface PersonalApproachData {
  title?: string;
  description?: string;
  image?: string;
  points?: Point[];
  isActive?: boolean;
}

export default function PersonalApproachPage() {
  const [data, setData] = useState<PersonalApproachData>({
    title: "",
    description: "",
    image: "",
    points: [],
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
      const response = await authFetch("/api/personal-approach");
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

      // Handle points - parse JSON if needed
      let points = [];
      if (item.points) {
        if (typeof item.points === 'object' && Array.isArray(item.points)) {
          points = item.points;
        } else if (typeof item.points === 'string') {
          try {
            const parsed = JSON.parse(item.points);
            if (Array.isArray(parsed)) {
              points = parsed;
            }
          } catch (e) {
            console.warn("Error parsing points:", e);
          }
        }
      }

      setData({
        title: item.title || "",
        description: item.description || "",
        image: item.image || "",
        points: points,
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
        points: data.points,
        isActive: data.isActive,
      };

      const response = await authFetch("/api/personal-approach", {
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

  const addPoint = () => {
    setData({
      ...data,
      points: [...(data.points || []), { title: "", description: "", icon: "" }],
    });
  };

  const updatePoint = (index: number, field: keyof Point, value: string) => {
    const newPoints = [...(data.points || [])];
    newPoints[index] = { ...newPoints[index], [field]: value };
    setData({ ...data, points: newPoints });
  };

  const removePoint = (index: number) => {
    const newPoints = [...(data.points || [])];
    newPoints.splice(index, 1);
    setData({ ...data, points: newPoints });
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
          <h1 className="text-2xl font-bold text-gray-900">Pendekatan Personal</h1>
          <p className="text-gray-600">Pendekatan Personal untuk Setiap Siswa</p>
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
            Informasi Utama
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
                placeholder="Judul"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi
              </label>
              <textarea
                value={data.description || ""}
                onChange={(e) => setData({ ...data, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Deskripsi"
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

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Poin-poin</h2>
            <Button size="sm" onClick={addPoint}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Poin
            </Button>
          </div>
          <div className="space-y-4">
            {data.points?.map((point, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    Poin #{index + 1}
                  </span>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removePoint(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon
                  </label>
                  <input
                    type="text"
                    value={point.icon}
                    onChange={(e) => updatePoint(index, "icon", e.target.value)}
                    className="w-full h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="HeartHandshake"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Judul
                  </label>
                  <input
                    type="text"
                    value={point.title}
                    onChange={(e) => updatePoint(index, "title", e.target.value)}
                    className="w-full h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="Judul poin"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deskripsi
                  </label>
                  <textarea
                    value={point.description}
                    onChange={(e) =>
                      updatePoint(index, "description", e.target.value)
                    }
                    rows={2}
                    className="w-full px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="Deskripsi poin"
                  />
                </div>
              </div>
            ))}
            {(!data.points || data.points.length === 0) && (
              <div className="text-center py-8 text-gray-500">
                Belum ada poin. Klik "Tambah Poin" untuk menambahkan.
              </div>
            )}
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
