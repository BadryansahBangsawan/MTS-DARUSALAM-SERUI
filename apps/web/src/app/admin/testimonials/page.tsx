"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Search, Star, MessageSquare, CheckCircle, Clock } from "lucide-react";
import { DataTable } from "@/components/admin/data-table";
import { ModalForm } from "@/components/admin/modal-form";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { ImageUpload } from "@/components/admin/image-upload";
import { RatingPicker } from "@/components/admin/rating-picker";
import { Badge } from "@/components/admin/badge";
import { StatusToggle } from "@/components/admin/status-toggle";
import { Button } from "@/components/ui/button";
import { authFetch } from "@/lib/auth";

interface Testimonial {
  id: number;
  authorName: string;
  role?: string;
  content: string;
  rating: number;
  imageUrl?: string;
  isApproved: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

interface FormData {
  id?: number;
  authorName: string;
  role: string;
  content: string;
  rating: number;
  imageUrl: string;
  isApproved: boolean;
  isFeatured: boolean;
}

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [deletingItem, setDeletingItem] = useState<Testimonial | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    authorName: "",
    role: "",
    content: "",
    rating: 5,
    imageUrl: "",
    isApproved: true,
    isFeatured: false,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await authFetch("/api/testimonials");
      const data = await response.json();
      if (data.success) {
        setItems(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredItems = items.filter(
    (item) =>
      item.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.role && item.role.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      authorName: "",
      role: "",
      content: "",
      rating: 5,
      imageUrl: "",
      isApproved: true,
      isFeatured: false,
    });
    setShowModal(true);
  };

  const handleEdit = (item: Testimonial) => {
    setEditingItem(item);
    setFormData({
      id: item.id,
      authorName: item.authorName,
      role: item.role || "",
      content: item.content,
      rating: item.rating,
      imageUrl: item.imageUrl || "",
      isApproved: item.isApproved,
      isFeatured: item.isFeatured,
    });
    setShowModal(true);
  };

  const handleDelete = (item: Testimonial) => {
    setDeletingItem(item);
  };

  const handleConfirmDelete = async () => {
    if (!deletingItem) return;

    try {
      const response = await authFetch(`/api/testimonials/${deletingItem.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setItems(items.filter((i) => i.id !== deletingItem.id));
        setDeletingItem(null);
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      alert("Gagal menghapus testimoni");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = formData.id
        ? `/api/testimonials/${formData.id}`
        : "/api/testimonials";
      const method = formData.id ? "PUT" : "POST";

      const response = await authFetch(url, {
        method,
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchItems();
        setShowModal(false);
      } else {
        alert("Gagal menyimpan testimoni");
      }
    } catch (error) {
      console.error("Error saving testimonial:", error);
      alert("Gagal menyimpan testimoni");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleApproved = async (item: Testimonial) => {
    try {
      const response = await authFetch(`/api/testimonials/${item.id}`, {
        method: "PUT",
        body: JSON.stringify({
          isApproved: !item.isApproved,
        }),
      });

      if (response.ok) {
        setItems(
          items.map((i) =>
            i.id === item.id ? { ...i, isApproved: !i.isApproved } : i
          )
        );
      } else {
        const errorData = await response.json();
        alert(`Gagal mengubah status persetujuan: ${errorData.error || 'Terjadi kesalahan'}`);
      }
    } catch (error) {
      console.error("Error toggling approved:", error);
      alert("Gagal mengubah status persetujuan. Silakan coba lagi.");
    }
  };

  const handleToggleFeatured = async (item: Testimonial) => {
    try {
      const response = await authFetch(`/api/testimonials/${item.id}`, {
        method: "PUT",
        body: JSON.stringify({
          isFeatured: !item.isFeatured,
        }),
      });

      if (response.ok) {
        setItems(
          items.map((i) =>
            i.id === item.id ? { ...i, isFeatured: !i.isFeatured } : i
          )
        );
      } else {
        const errorData = await response.json();
        alert(`Gagal mengubah status featured: ${errorData.error || 'Terjadi kesalahan'}`);
      }
    } catch (error) {
      console.error("Error toggling featured:", error);
      alert("Gagal mengubah status featured. Silakan coba lagi.");
    }
  };

  const renderStars = (rating: number) => (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "fill-amber-400 text-amber-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );

  const columns = [
    {
      key: "imageUrl",
      label: "Foto",
      render: (value: string, row: Testimonial) =>
        value ? (
          <img
            src={value}
            alt={row.authorName}
            className="w-10 h-10 rounded-full object-cover border-2 border-green-500"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
        ),
    },
    {
      key: "authorName",
      label: "Nama Alumni",
    },
    {
      key: "role",
      label: "Role",
      render: (value: string) => value || "-",
    },
    {
      key: "rating",
      label: "Rating",
      render: (value: number) => renderStars(value),
    },
    {
      key: "isApproved",
      label: "Status",
      render: (value: boolean, row: Testimonial) =>
        value ? (
          <Badge variant="approved">Approved</Badge>
        ) : (
          <Badge variant="pending">Pending</Badge>
        ),
    },
    {
      key: "isFeatured",
      label: "Featured",
      render: (value: boolean) =>
        value ? (
          <Badge variant="featured">Ya</Badge>
        ) : (
          <Badge variant="inactive">Tidak</Badge>
        ),
    },
    {
      key: "createdAt",
      label: "Dibuat",
      render: (value: string) =>
        new Date(value).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
    },
    {
      key: "actions",
      label: "Aksi",
      render: (_: any, row: Testimonial) => (
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => handleToggleApproved(row)}
            className="p-2 rounded-lg hover:bg-green-50 transition-colors"
            title={row.isApproved ? "Unapprove" : "Approve"}
          >
            {row.isApproved ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : (
              <Clock className="w-4 h-4 text-amber-600" />
            )}
          </button>
          <button
            type="button"
            onClick={() => handleToggleFeatured(row)}
            className="p-2 rounded-lg hover:bg-blue-50 transition-colors"
            title={row.isFeatured ? "Unfeatured" : "Featured"}
          >
            <Star
              className={`w-4 h-4 ${
                row.isFeatured
                  ? "fill-blue-600 text-blue-600"
                  : "text-gray-400"
              }`}
            />
          </button>
          <button
            type="button"
            onClick={() => handleEdit(row)}
            className="p-2 rounded-lg hover:bg-blue-50 transition-colors"
            title="Edit"
          >
            <Pencil className="w-4 h-4 text-blue-600" />
          </button>
          <button
            type="button"
            onClick={() => handleDelete(row)}
            className="p-2 rounded-lg hover:bg-red-50 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Testimoni</h1>
          <p className="text-gray-600 mt-1">
            Kelola testimoni alumni MTs Darussalam
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button onClick={handleAdd} className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-lg shadow-teal-500/30">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Testimoni
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total Testimoni</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{items.length}</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Pending Approval</p>
          <p className="text-3xl font-bold text-amber-600 mt-2">
            {items.filter((i) => !i.isApproved).length}
          </p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Approved</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {items.filter((i) => i.isApproved).length}
          </p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Featured</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {items.filter((i) => i.isFeatured).length}
          </p>
        </div>
      </div>

      <DataTable
        data={filteredItems}
        columns={columns}
        loading={loading}
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        searchPlaceholder="Cari testimoni..."
        emptyState={{
          title: "Belum ada testimoni",
          description: "Mulai dengan menambahkan testimoni baru.",
          action: {
            label: "Tambah Testimoni",
            onClick: handleAdd,
          },
        }}
      />

      <ModalForm
        open={showModal}
        onClose={() => setShowModal(false)}
        title={editingItem ? "Edit Testimoni" : "Tambah Testimoni Baru"}
        loading={saving}
        footer={
          <>
            <Button
              variant="outline"
              onClick={() => setShowModal(false)}
              disabled={saving}
            >
              Batal
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
            >
              {saving ? "Menyimpan..." : "Simpan"}
            </Button>
          </>
        }
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Alumni *
              </label>
              <input
                type="text"
                value={formData.authorName}
                onChange={(e) =>
                  setFormData({ ...formData, authorName: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Nama lengkap"
                disabled={saving}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role/Jabatan
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Misal: Mahasiswa, PNS, dll."
                disabled={saving}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Konten Testimoni *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              rows={4}
              className="w-full px-3 py-2 text-sm border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 resize-none"
              placeholder="Bagikan pengalaman alumni..."
              disabled={saving}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating *
            </label>
            <RatingPicker
              value={formData.rating}
              onChange={(value) =>
                setFormData({ ...formData, rating: value })
              }
              readonly={saving}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foto Profil
            </label>
            <ImageUpload
              value={formData.imageUrl}
              onChange={(image) =>
                setFormData({ ...formData, imageUrl: image })
              }
              disabled={saving}
            />
            <p className="text-xs text-gray-500 mt-2">
              Opsional - Klik area upload atau drag & drop gambar di sini (maks. 5MB)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status Approval
              </label>
              <select
                value={formData.isApproved.toString()}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isApproved: e.target.value === "true",
                  })
                }
                className="w-full px-3 py-2 text-sm border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                disabled={saving}
              >
                <option value="true">Approved</option>
                <option value="false">Pending</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Featured
              </label>
              <select
                value={formData.isFeatured.toString()}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isFeatured: e.target.value === "true",
                  })
                }
                className="w-full px-3 py-2 text-sm border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                disabled={saving}
              >
                <option value="true">Ya</option>
                <option value="false">Tidak</option>
              </select>
            </div>
          </div>
        </div>
      </ModalForm>

      <ConfirmDialog
        open={!!deletingItem}
        onClose={() => setDeletingItem(null)}
        title="Hapus Testimoni"
        message={`Apakah Anda yakin ingin menghapus testimoni dari "${deletingItem?.authorName}"?`}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
