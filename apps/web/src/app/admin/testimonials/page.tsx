"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Check, X } from "lucide-react";
import { DataTable } from "@/components/admin/data-table";
import { ModalForm } from "@/components/admin/modal-form";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { FilterTabs } from "@/components/admin/filter-tabs";
import { StatusToggle } from "@/components/admin/status-toggle";
import { RatingPicker } from "@/components/admin/rating-picker";
import { ImageUpload } from "@/components/admin/image-upload";
import { Badge } from "@/components/admin/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface Testimonial {
  id: number;
  authorName: string;
  role?: string;
  content: string;
  rating?: number;
  imageUrl?: string;
  isApproved: boolean;
  isFeatured: boolean;
}

interface FormData {
  authorName: string;
  role: string;
  content: string;
  rating: number;
  imageUrl: string;
  isApproved: boolean;
  isFeatured: boolean;
}

const statusOptions = [
  { id: "all", label: "Semua" },
  { id: "pending", label: "Menunggu" },
  { id: "approved", label: "Disetujui" },
];

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
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
      const response = await fetch("/api/testimonials");
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

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "pending" && !item.isApproved) ||
      (selectedStatus === "approved" && item.isApproved);
    return matchesSearch && matchesStatus;
  });

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
      authorName: item.authorName,
      role: item.role || "",
      content: item.content,
      rating: item.rating || 5,
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
      const response = await fetch(`/api/testimonials/${deletingItem.id}`, {
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
    if (!formData.authorName.trim() || !formData.content.trim()) {
      alert("Nama dan konten wajib diisi");
      return;
    }

    setSaving(true);

    try {
      const url = editingItem
        ? `/api/testimonials/${editingItem.id}`
        : "/api/testimonials";
      const method = editingItem ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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

  const handleBulkApprove = async () => {
    try {
      const promises = selectedItems.map((id) =>
        fetch(`/api/testimonials/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isApproved: true }),
        })
      );
      await Promise.all(promises);
      await fetchItems();
      setSelectedItems([]);
    } catch (error) {
      console.error("Error bulk approving:", error);
      alert("Gagal menyetujui testimoni");
    }
  };

  const handleBulkReject = async () => {
    try {
      const promises = selectedItems.map((id) =>
        fetch(`/api/testimonials/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isApproved: false }),
        })
      );
      await Promise.all(promises);
      await fetchItems();
      setSelectedItems([]);
    } catch (error) {
      console.error("Error bulk rejecting:", error);
      alert("Gagal menolak testimoni");
    }
  };

  const columns = [
    {
      key: "select",
      label: "",
      render: (_: any, row: Testimonial) => (
        <Checkbox
          checked={selectedItems.includes(row.id)}
          onCheckedChange={(checked) => {
            if (checked) {
              setSelectedItems([...selectedItems, row.id]);
            } else {
              setSelectedItems(selectedItems.filter((id) => id !== row.id));
            }
          }}
        />
      ),
      className: "w-10",
    },
    {
      key: "authorName",
      label: "Penulis",
      sortable: true,
    },
    {
      key: "role",
      label: "Role",
    },
    {
      key: "rating",
      label: "Rating",
      render: (value: number) => `${value} ⭐`,
      className: "text-center",
    },
    {
      key: "isApproved",
      label: "Status",
      render: (value: boolean) => (
        <Badge variant={value ? "approved" : "pending"}>
          {value ? "Disetujui" : "Menunggu"}
        </Badge>
      ),
    },
    {
      key: "isFeatured",
      label: "Unggulan",
      render: (value: boolean) => (
        <Badge variant={value ? "featured" : "inactive"}>
          {value ? "Ya" : "Tidak"}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "Aksi",
      render: (_: any, row: Testimonial) => (
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
          <h1 className="text-2xl font-bold text-gray-900">Kelola Testimoni</h1>
          <p className="text-gray-600">Kelola testimoni siswa dan orang tua</p>
        </div>
        <div className="flex items-center space-x-2">
          {selectedItems.length > 0 && (
            <>
              <Button variant="outline" onClick={handleBulkReject}>
                <X className="h-4 w-4 mr-2" />
                Tolak ({selectedItems.length})
              </Button>
              <Button onClick={handleBulkApprove}>
                <Check className="h-4 w-4 mr-2" />
                Setujui ({selectedItems.length})
              </Button>
            </>
          )}
          <Button onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Baru
          </Button>
        </div>
      </div>

      <FilterTabs
        tabs={statusOptions.map((status) => ({
          ...status,
          count:
            status.id === "all"
              ? items.length
              : status.id === "pending"
              ? items.filter((i) => !i.isApproved).length
              : items.filter((i) => i.isApproved).length,
        }))}
        activeTab={selectedStatus}
        onTabChange={setSelectedStatus}
      />

      <DataTable
        data={filteredItems}
        columns={columns}
        loading={loading}
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        searchPlaceholder="Cari testimoni..."
        emptyState={{
          title: "Tidak ada data",
          description: "Belum ada testimoni. Silakan tambah baru.",
          action: { label: "Tambah Testimoni", onClick: handleAdd },
        }}
      />

      <ModalForm
        open={showModal}
        onClose={() => setShowModal(false)}
        title={editingItem ? "Edit Testimoni" : "Tambah Testimoni"}
        size="lg"
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
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Penulis*
              </label>
              <input
                type="text"
                value={formData.authorName}
                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                className="w-full h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Nama penulis"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Role (mis: Siswa, Orang Tua)"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Konten*
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Konten testimoni"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <RatingPicker
              value={formData.rating}
              onChange={(rating) => setFormData({ ...formData, rating })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foto Penulis
            </label>
            <ImageUpload
              value={formData.imageUrl}
              onChange={(imageUrl) => setFormData({ ...formData, imageUrl })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isApproved"
                checked={formData.isApproved}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isApproved: checked as boolean })
                }
              />
              <label htmlFor="isApproved" className="text-xs text-gray-700">
                Disetujui
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isFeatured"
                checked={formData.isFeatured}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isFeatured: checked as boolean })
                }
              />
              <label htmlFor="isFeatured" className="text-xs text-gray-700">
                Testimoni Unggulan
              </label>
            </div>
          </div>
        </div>
      </ModalForm>

      <ConfirmDialog
        open={!!deletingItem}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleConfirmDelete}
        title="Hapus Testimoni"
        message={`Apakah Anda yakin ingin menghapus testimoni dari "${deletingItem?.authorName}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Ya, Hapus"
        cancelText="Batal"
        variant="danger"
      />
    </div>
  );
}
