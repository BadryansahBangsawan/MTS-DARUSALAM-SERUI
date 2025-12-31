"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { DataTable } from "@/components/admin/data-table";
import { ModalForm } from "@/components/admin/modal-form";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { FilterTabs } from "@/components/admin/filter-tabs";
import { ColorPicker } from "@/components/admin/color-picker";
import { Badge } from "@/components/admin/badge";
import { Button } from "@/components/ui/button";

interface OrganizationPosition {
  id: number;
  title: string;
  personName?: string;
  roleCategory: "supervisory" | "leadership" | "staff" | "teaching" | "lab_manager";
  sortOrder?: number;
  colorTheme?: string;
  backgroundStyle?: string;
}

interface FormData {
  title: string;
  personName: string;
  roleCategory: OrganizationPosition["roleCategory"];
  sortOrder: number;
  colorTheme: string;
}

const categoryOptions = [
  { id: "all", label: "Semua" },
  { id: "supervisory", label: "Pengawas" },
  { id: "leadership", label: "Pimpinan" },
  { id: "staff", label: "Staf" },
  { id: "teaching", label: "Guru" },
  { id: "lab_manager", label: "Kepala Lab" },
];

export default function OrganizationPositionsPage() {
  const [items, setItems] = useState<OrganizationPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<OrganizationPosition | null>(null);
  const [deletingItem, setDeletingItem] = useState<OrganizationPosition | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    personName: "",
    roleCategory: "staff",
    sortOrder: 0,
    colorTheme: "green",
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/organization-positions");
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
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.personName && item.personName.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || item.roleCategory === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      personName: "",
      roleCategory: "staff",
      sortOrder: 0,
      colorTheme: "green",
    });
    setShowModal(true);
  };

  const handleEdit = (item: OrganizationPosition) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      personName: item.personName || "",
      roleCategory: item.roleCategory,
      sortOrder: item.sortOrder || 0,
      colorTheme: item.colorTheme || "green",
    });
    setShowModal(true);
  };

  const handleDelete = (item: OrganizationPosition) => {
    setDeletingItem(item);
  };

  const handleConfirmDelete = async () => {
    if (!deletingItem) return;

    try {
      const response = await fetch(`/api/organization-positions/${deletingItem.id}`, {
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
    if (!formData.title.trim()) {
      alert("Judul wajib diisi");
      return;
    }

    setSaving(true);

    try {
      const url = editingItem
        ? `/api/organization-positions/${editingItem.id}`
        : "/api/organization-positions";
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

  const columns = [
    {
      key: "title",
      label: "Judul",
      sortable: true,
    },
    {
      key: "personName",
      label: "Nama Orang",
    },
    {
      key: "roleCategory",
      label: "Kategori",
      render: (value: string) => <Badge variant={value as any}>{value}</Badge>,
    },
    {
      key: "sortOrder",
      label: "Urutan",
      className: "text-center",
    },
    {
      key: "actions",
      label: "Aksi",
      render: (_: any, row: OrganizationPosition) => (
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
          <h1 className="text-2xl font-bold text-gray-900">Kelola Struktur Organisasi</h1>
          <p className="text-gray-600">Kelola struktur organisasi sekolah</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Baru
        </Button>
      </div>

      <FilterTabs
        tabs={categoryOptions.map((cat) => ({
          ...cat,
          count: cat.id === "all" ? items.length : items.filter((i) => i.roleCategory === cat.id).length,
        }))}
        activeTab={selectedCategory}
        onTabChange={setSelectedCategory}
      />

      <DataTable
        data={filteredItems}
        columns={columns}
        loading={loading}
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        searchPlaceholder="Cari posisi..."
        emptyState={{
          title: "Tidak ada data",
          description: "Belum ada posisi organisasi. Silakan tambah baru.",
          action: { label: "Tambah Posisi", onClick: handleAdd },
        }}
      />

      <ModalForm
        open={showModal}
        onClose={() => setShowModal(false)}
        title={editingItem ? "Edit Posisi" : "Tambah Posisi"}
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Judul*
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Judul posisi"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Orang
            </label>
            <input
              type="text"
              value={formData.personName}
              onChange={(e) => setFormData({ ...formData, personName: e.target.value })}
              className="w-full h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Nama orang"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategori
            </label>
            <select
              value={formData.roleCategory}
              onChange={(e) =>
                setFormData({ ...formData, roleCategory: e.target.value as any })
              }
              className="w-full h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            >
              <option value="supervisory">Pengawas</option>
              <option value="leadership">Pimpinan</option>
              <option value="staff">Staf</option>
              <option value="teaching">Guru</option>
              <option value="lab_manager">Kepala Lab</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Urutan
              </label>
              <input
                type="number"
                min="0"
                value={formData.sortOrder}
                onChange={(e) =>
                  setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })
                }
                className="w-full h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Warna Border
              </label>
              <ColorPicker
                value={formData.colorTheme}
                onChange={(colorTheme) => setFormData({ ...formData, colorTheme })}
              />
            </div>
          </div>
        </div>
      </ModalForm>

      <ConfirmDialog
        open={!!deletingItem}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleConfirmDelete}
        title="Hapus Posisi"
        message={`Apakah Anda yakin ingin menghapus "${deletingItem?.title}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Ya, Hapus"
        cancelText="Batal"
        variant="danger"
      />
    </div>
  );
}
