"use client";

import { useEffect, useState } from "react";
import { Save, RefreshCw, Check, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/admin/image-upload";
import { authFetch } from "@/lib/auth";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface EnvironmentFeaturesData {
  title?: string;
  description?: string;
  image?: string;
  features?: Feature[];
  isActive?: boolean;
}

export default function EnvironmentFeaturesPage() {
  const [data, setData] = useState<EnvironmentFeaturesData>({
    title: "",
    description: "",
    image: "",
    features: [],
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
      const response = await authFetch("/api/environment-features");
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

      // Handle features - parse JSON if needed
      let features = [];
      if (item.features) {
        if (typeof item.features === 'object' && Array.isArray(item.features)) {
          features = item.features;
        } else if (typeof item.features === 'string') {
          try {
            const parsed = JSON.parse(item.features);
            if (Array.isArray(parsed)) {
              features = parsed;
            }
          } catch (e) {
            console.warn("Error parsing features:", e);
          }
        }
      }

      setData({
        title: item.title || "",
        description: item.description || "",
        image: item.image || "",
        features: features,
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
        features: data.features,
        isActive: data.isActive,
      };

      const response = await authFetch("/api/environment-features", {
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

  const addFeature = () => {
    setData({
      ...data,
      features: [
        ...(data.features || []),
        { icon: "", title: "", description: "" },
      ],
    });
  };

  const updateFeature = (index: number, field: keyof Feature, value: string) => {
    const newFeatures = [...(data.features || [])];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setData({ ...data, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...(data.features || [])];
    newFeatures.splice(index, 1);
    setData({ ...data, features: newFeatures });
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
          <h1 className="text-2xl font-bold text-gray-900">
            Lingkungan Belajar
          </h1>
          <p className="text-gray-600">Lingkungan Belajar Nyaman & Interaktif</p>
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
            <h2 className="text-lg font-semibold text-gray-900">Fitur</h2>
            <Button size="sm" onClick={addFeature}>
              <Plus className="h-4 w-4 mr-2" />
              Tambah Fitur
            </Button>
          </div>
          <div className="space-y-4">
            {data.features?.map((feature, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    Fitur #{index + 1}
                  </span>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeFeature(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icon
                    </label>
                    <input
                      type="text"
                      value={feature.icon}
                      onChange={(e) =>
                        updateFeature(index, "icon", e.target.value)
                      }
                      className="w-full h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                      placeholder="Grid2x2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Judul
                    </label>
                    <input
                      type="text"
                      value={feature.title}
                      onChange={(e) =>
                        updateFeature(index, "title", e.target.value)
                      }
                      className="w-full h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                      placeholder="Judul fitur"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Deskripsi
                  </label>
                  <textarea
                    value={feature.description}
                    onChange={(e) =>
                      updateFeature(index, "description", e.target.value)
                    }
                    rows={2}
                    className="w-full px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    placeholder="Deskripsi fitur"
                  />
                </div>
              </div>
            ))}
            {(!data.features || data.features.length === 0) && (
              <div className="text-center py-8 text-gray-500">
                Belum ada fitur. Klik "Tambah Fitur" untuk menambahkan.
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
