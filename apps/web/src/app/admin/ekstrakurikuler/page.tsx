"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import { DataTable } from "@/components/admin/data-table";
import { ModalForm } from "@/components/admin/modal-form";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { ImageUpload } from "@/components/admin/image-upload";
import { DynamicList } from "@/components/admin/dynamic-list";
import { ColorPicker } from "@/components/admin/color-picker";
import { authFetch } from "@/lib/auth";
import { RatingPicker } from "@/components/admin/rating-picker";
import { StatusToggle } from "@/components/admin/status-toggle";
import { Badge } from "@/components/admin/badge";
import { Button } from "@/components/ui/button";

interface Ekstrakurikuler {
  id: string;
  name: string;
  subtitle?: string;
  icon?: string;
  color?: string;
  description?: string;
  features?: Array<{ icon: string; text: string }>;
  schedule?: Array<{ day: string; time: string }>;
  rating?: string;
  whatsappContact?: string;
  isActive?: boolean;
}

interface FormData {
  id?: string;
  name: string;
  subtitle: string;
  icon: string;
  color: string;
  description: string;
  features: Array<{ icon: string; text: string }>;
  schedule: Array<{ day: string; time: string }>;
  rating: number;
  whatsappContact: string;
  isActive: boolean;
}

export default function EkstrakurikulerPage() {
  const [items, setItems] = useState<Ekstrakurikuler[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Ekstrakurikuler | null>(null);
  const [deletingItem, setDeletingItem] = useState<Ekstrakurikuler | null>(
    null
  );
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    subtitle: "",
    icon: "BookOpen",
    color: "green",
    description: "",
    features: [],
    schedule: [],
    rating: 0,
    whatsappContact: "",
    isActive: true,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await authFetch("/api/ekstrakurikuler");
      const data = await response.json();
      if (data.success) {
        // Parse JSON fields from strings
        const parsedItems = (data.data || []).map((item: any) => ({
          ...item,
          features:
            typeof item.features === "string"
              ? JSON.parse(item.features)
              : item.features || [],
          schedule:
            typeof item.schedule === "string"
              ? JSON.parse(item.schedule)
              : item.schedule || [],
        }));
        setItems(parsedItems);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.subtitle &&
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      subtitle: "",
      icon: "BookOpen",
      color: "green",
      description: "",
      features: [],
      schedule: [],
      rating: 0,
      whatsappContact: "",
      isActive: true,
    });
    setShowModal(true);
  };

  const handleEdit = (item: Ekstrakurikuler) => {
    setEditingItem(item);
    setFormData({
      id: item.id,
      name: item.name,
      subtitle: item.subtitle || "",
      icon: item.icon || "BookOpen",
      color: item.color || "green",
      description: item.description || "",
      // Ensure fields are arrays
      features: Array.isArray(item.features) ? item.features : [],
      schedule: Array.isArray(item.schedule) ? item.schedule : [],
      rating: parseFloat(item.rating || "0"),
      whatsappContact: item.whatsappContact || "",
      isActive: item.isActive ?? true,
    });
    setShowModal(true);
  };

  const handleDelete = (item: Ekstrakurikuler) => {
    setDeletingItem(item);
  };

  const handleConfirmDelete = async () => {
    if (!deletingItem) return;

    try {
      const response = await authFetch(
        `/api/ekstrakurikuler/${deletingItem.id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setItems(items.filter((i) => i.id !== deletingItem.id));
        setDeletingItem(null);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Gagal menghapus data");
    }
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      alert("Nama wajib diisi");
      return;
    }

    setSaving(true);

    try {
      const url = editingItem
        ? `/api/ekstrakurikuler/${editingItem.id}`
        : "/api/ekstrakurikuler";
      const method = editingItem ? "PUT" : "POST";

      const response = await authFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          rating: formData.rating.toString(),
        }),
      });

      if (response.ok) {
        await fetchItems();
        setShowModal(false);
      } else {
        alert("Gagal menyimpan data");
      }
    } catch (error) {
      console.error("Error saving item:", error);
      alert("Gagal menyimpan data");
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    {
      key: "name",
      label: "Nama",
      sortable: true,
    },
    {
      key: "subtitle",
      label: "Subtitle",
    },
    {
      key: "rating",
      label: "Rating",
      render: (value: string) => `${value} ⭐`,
      className: "text-center",
    },
    {
      key: "isActive",
      label: "Status",
      render: (value: boolean) => (
        <Badge variant={value ? "active" : "inactive"}>
          {value ? "Aktif" : "Tidak Aktif"}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "Aksi",
      render: (_: any, row: Ekstrakurikuler) => (
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => handleEdit(row)}
            className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
            title="Edit"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => handleDelete(row)}
            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
            title="Hapus"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
      className: "text-right",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Kelola Ekstrakurikuler
          </h1>
          <p className="text-gray-600">
            Kelola kegiatan ekstrakurikuler sekolah
          </p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Baru
        </Button>
      </div>

      <DataTable
        data={filteredItems}
        columns={columns}
        loading={loading}
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        searchPlaceholder="Cari ekstrakurikuler..."
        emptyState={{
          title: "Tidak ada data",
          description:
            "Belum ada kegiatan ekstrakurikuler. Silakan tambah baru.",
          action: { label: "Tambah Ekstrakurikuler", onClick: handleAdd },
        }}
      />

      <ModalForm
        open={showModal}
        onClose={() => setShowModal(false)}
        title={editingItem ? "Edit Ekstrakurikuler" : "Tambah Ekstrakurikuler"}
        size="xl"
        footer={
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Batal
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Nama*
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full h-11 px-4 text-sm border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                placeholder="Nama ekstrakurikuler"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Subtitle
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) =>
                  setFormData({ ...formData, subtitle: e.target.value })
                }
                className="w-full h-11 px-4 text-sm border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                placeholder="Subtitle"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Warna
              </label>
              <ColorPicker
                value={formData.color}
                onChange={(color) => setFormData({ ...formData, color })}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Rating
              </label>
              <RatingPicker
                value={formData.rating}
                onChange={(rating) => setFormData({ ...formData, rating })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Deskripsi
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className="w-full px-4 text-sm border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
              placeholder="Deskripsi ekstrakurikuler"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Fitur
            </label>
            <DynamicList
              value={formData.features?.map((f) => f.text) || []}
              onChange={(items) =>
                setFormData({
                  ...formData,
                  features: items.map((text) => ({ icon: "Star", text })),
                })
              }
              placeholder="Fitur"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Jadwal
            </label>
            <DynamicList
              value={
                formData.schedule?.map((s) => `${s.day} - ${s.time}`) || []
              }
              onChange={(items) => {
                const schedules = items.map((item) => {
                  const [day, time] = item.split(" - ");
                  return { day, time };
                });
                setFormData({ ...formData, schedule: schedules });
              }}
              placeholder="Jadwal (format: Hari - Waktu)"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                WhatsApp
              </label>
              <input
                type="text"
                value={formData.whatsappContact}
                onChange={(e) =>
                  setFormData({ ...formData, whatsappContact: e.target.value })
                }
                className="w-full h-11 px-4 text-sm border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                placeholder="628123456789"
              />
            </div>
            <div className="flex items-end">
              <StatusToggle
                checked={formData.isActive}
                onChange={(isActive) => setFormData({ ...formData, isActive })}
              />
            </div>
          </div>
        </div>
      </ModalForm>

      <ConfirmDialog
        open={!!deletingItem}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleConfirmDelete}
        title="Hapus Ekstrakurikuler"
        message={`Apakah Anda yakin ingin menghapus "${deletingItem?.name}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Ya, Hapus"
        cancelText="Batal"
        variant="danger"
      />
    </div>
  );
}
