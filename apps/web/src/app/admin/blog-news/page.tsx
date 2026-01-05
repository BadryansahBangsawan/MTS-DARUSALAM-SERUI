"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import { DataTable } from "@/components/admin/data-table";
import { ModalForm } from "@/components/admin/modal-form";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { ImageUpload } from "@/components/admin/image-upload";
import { StatusToggle } from "@/components/admin/status-toggle";
import { Badge } from "@/components/admin/badge";
import { Button } from "@/components/ui/button";
import { authFetch } from "@/lib/auth";

interface BlogNews {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  category: "berita" | "pengumuman" | "artikel" | "kegiatan";
  authorId: number;
  isPublished: boolean;
  publishedAt?: string;
  views?: number;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface FormData {
  id?: number;
  title: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  category: "berita" | "pengumuman" | "artikel" | "kegiatan";
  authorId: number;
  isPublished: boolean;
  isActive: boolean;
}

export default function BlogNewsPage() {
  const [items, setItems] = useState<BlogNews[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<BlogNews | null>(null);
  const [deletingItem, setDeletingItem] = useState<BlogNews | null>(null);
  const [saving, setSaving] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    excerpt: "",
    featuredImage: "",
    category: "berita",
    authorId: 1,
    isPublished: false,
    isActive: true,
  });

  useEffect(() => {
    fetchItems();
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await authFetch("/api/auth/me");
      const data = await response.json();
      if (data.success && data.user) {
        setCurrentUserId(data.user.id);
        setFormData(prev => ({ ...prev, authorId: data.user.id }));
      }
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await authFetch("/api/blog-news");
      const data = await response.json();
      if (data.success) {
        setItems(data.data || []);
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
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.excerpt && item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      featuredImage: "",
      category: "berita",
      authorId: currentUserId,
      isPublished: false,
      isActive: true,
    });
    setShowModal(true);
  };

  const handleEdit = (item: BlogNews) => {
    setEditingItem(item);
    setFormData({
      id: item.id,
      title: item.title,
      content: item.content,
      excerpt: item.excerpt || "",
      featuredImage: item.featuredImage || "",
      category: item.category,
      authorId: item.authorId,
      isPublished: item.isPublished,
      isActive: item.isActive ?? true,
    });
    setShowModal(true);
  };

  const handleDelete = (item: BlogNews) => {
    setDeletingItem(item);
  };

  const handleConfirmDelete = async () => {
    if (!deletingItem) return;

    try {
      const response = await authFetch(`/api/blog-news/${deletingItem.id}`, {
        method: "DELETE",
      });
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
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Judul dan konten wajib diisi");
      return;
    }

    setSaving(true);

    try {
      const url = editingItem ? `/api/blog-news/${editingItem.id}` : "/api/blog-news";
      const method = editingItem ? "PUT" : "POST";

      const response = await authFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        await fetchItems();
        setShowModal(false);
      } else {
        alert(result.error || "Gagal menyimpan data");
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
      key: "title",
      label: "Judul",
      sortable: true,
    },
    {
      key: "category",
      label: "Kategori",
      render: (value: string) => (
        <Badge variant="active">
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      ),
      className: "text-center",
    },
    {
      key: "isPublished",
      label: "Status Publish",
      render: (value: boolean) => (
        <Badge variant={value ? "active" : "inactive"}>
          {value ? "Terbit" : "Draft"}
        </Badge>
      ),
      className: "text-center",
    },
    {
      key: "views",
      label: "Dilihat",
      render: (value: number) => value || 0,
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
      render: (_: any, row: BlogNews) => (
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
            Kelola Blog & News
          </h1>
          <p className="text-gray-600">
            Kelola berita, pengumuman, artikel, dan kegiatan sekolah
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
        searchPlaceholder="Cari blog news..."
        emptyState={{
          title: "Tidak ada data",
          description:
            "Belum ada blog news. Silakan tambah baru.",
          action: { label: "Tambah Blog News", onClick: handleAdd },
        }}
      />

      <ModalForm
        open={showModal}
        onClose={() => setShowModal(false)}
        title={editingItem ? "Edit Blog News" : "Tambah Blog News"}
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
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Judul*
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full h-11 px-4 text-sm border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              placeholder="Judul blog news"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Kategori*
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as any,
                  })
                }
                className="w-full h-11 px-4 text-sm border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              >
                <option value="berita">Berita</option>
                <option value="pengumuman">Pengumuman</option>
                <option value="artikel">Artikel</option>
                <option value="kegiatan">Kegiatan</option>
              </select>
            </div>
            <div className="flex items-end">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Status Publish
                </label>
                <StatusToggle
                  checked={formData.isPublished}
                  onChange={(isPublished) => setFormData({ ...formData, isPublished })}
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Gambar Utama
            </label>
            <ImageUpload
              value={formData.featuredImage}
              onChange={(url) => setFormData({ ...formData, featuredImage: url })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Ringkasan (Excerpt)
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
              rows={2}
              className="w-full px-4 text-sm border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
              placeholder="Ringkasan singkat (opsional)"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Konten*
            </label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              rows={10}
              className="w-full px-4 text-sm border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
              placeholder="Konten lengkap"
            />
          </div>

          <div className="flex items-end">
            <StatusToggle
              checked={formData.isActive}
              onChange={(isActive) => setFormData({ ...formData, isActive })}
            />
          </div>
        </div>
      </ModalForm>

      <ConfirmDialog
        open={!!deletingItem}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleConfirmDelete}
        title="Hapus Blog News"
        message={`Apakah Anda yakin ingin menghapus "${deletingItem?.title}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Ya, Hapus"
        cancelText="Batal"
        variant="danger"
      />
    </div>
  );
}
