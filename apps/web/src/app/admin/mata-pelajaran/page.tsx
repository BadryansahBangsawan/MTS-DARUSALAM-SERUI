"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { DataTable } from "@/components/admin/data-table";
import { ModalForm } from "@/components/admin/modal-form";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { FilterTabs } from "@/components/admin/filter-tabs";
import { StatusToggle } from "@/components/admin/status-toggle";
import { Badge } from "@/components/admin/badge";
import { MultiSelect } from "@/components/admin/multi-select";
import { Button } from "@/components/ui/button";

interface MataPelajaran {
  id: number;
  name: string;
  description?: string;
  category: "religious" | "language" | "science" | "social" | "skills";
  gradeLevels?: string[];
  hoursPerWeek?: number;
  isActive?: boolean;
}

interface FormData {
  name: string;
  description: string;
  category: MataPelajaran["category"];
  gradeLevels: string[];
  hoursPerWeek: number;
  isActive: boolean;
}

const gradeLevelsOptions = [
  { value: "VII", label: "Kelas VII" },
  { value: "VIII", label: "Kelas VIII" },
  { value: "IX", label: "Kelas IX" },
];

const categoryOptions = [
  { id: "all", label: "Semua" },
  { id: "religious", label: "Agama" },
  { id: "language", label: "Bahasa" },
  { id: "science", label: "Sains" },
  { id: "social", label: "Sosial" },
  { id: "skills", label: "Keterampilan" },
];

export default function MataPelajaranPage() {
  const [items, setItems] = useState<MataPelajaran[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MataPelajaran | null>(null);
  const [deletingItem, setDeletingItem] = useState<MataPelajaran | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    category: "religious",
    gradeLevels: [],
    hoursPerWeek: 2,
    isActive: true,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/mata-pelajaran");
      const data = await response.json();
      if (data.success) {
        // Parse gradeLevels from JSON string to array
        const parsedItems = (data.data || []).map((item: any) => ({
          ...item,
          gradeLevels: typeof item.gradeLevels === 'string' 
            ? JSON.parse(item.gradeLevels) 
            : item.gradeLevels,
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

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      description: "",
      category: "religious",
      gradeLevels: [],
      hoursPerWeek: 2,
      isActive: true,
    });
    setShowModal(true);
  };

  const handleEdit = (item: MataPelajaran) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description || "",
      category: item.category,
      // Ensure gradeLevels is array
      gradeLevels: Array.isArray(item.gradeLevels) ? item.gradeLevels : [],
      hoursPerWeek: item.hoursPerWeek || 2,
      isActive: item.isActive ?? true,
    });
    setShowModal(true);
  };

  const handleDelete = (item: MataPelajaran) => {
    setDeletingItem(item);
  };

  const handleConfirmDelete = async () => {
    if (!deletingItem) return;

    try {
      const response = await fetch(`/api/mata-pelajaran/${deletingItem.id}`, {
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
    if (!formData.name.trim()) {
      alert("Nama wajib diisi");
      return;
    }

    setSaving(true);

    try {
      const url = editingItem
        ? `/api/mata-pelajaran/${editingItem.id}`
        : "/api/mata-pelajaran";
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
      key: "name",
      label: "Nama",
      sortable: true,
    },
    {
      key: "category",
      label: "Kategori",
      render: (value: string) => <Badge variant={value as any}>{value}</Badge>,
    },
    {
      key: "gradeLevels",
      label: "Tingkat Kelas",
      render: (value: string[]) => value?.join(", ") || "-",
    },
    {
      key: "hoursPerWeek",
      label: "Jam/Minggu",
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
      render: (_: any, row: MataPelajaran) => (
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
          <h1 className="text-2xl font-bold text-gray-900">Kelola Mata Pelajaran</h1>
          <p className="text-gray-600">Kelola mata pelajaran sekolah</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Baru
        </Button>
      </div>

      <FilterTabs
        tabs={categoryOptions.map((cat) => ({
          ...cat,
          count: cat.id === "all" ? items.length : items.filter((i) => i.category === cat.id).length,
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
        searchPlaceholder="Cari mata pelajaran..."
        emptyState={{
          title: "Tidak ada data",
          description: "Belum ada mata pelajaran. Silakan tambah baru.",
          action: { label: "Tambah Mata Pelajaran", onClick: handleAdd },
        }}
      />

      <ModalForm
        open={showModal}
        onClose={() => setShowModal(false)}
        title={editingItem ? "Edit Mata Pelajaran" : "Tambah Mata Pelajaran"}
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
              Nama*
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Nama mata pelajaran"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Deskripsi mata pelajaran"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategori
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              className="w-full h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            >
              <option value="religious">Agama</option>
              <option value="language">Bahasa</option>
              <option value="science">Sains</option>
              <option value="social">Sosial</option>
              <option value="skills">Keterampilan</option>
            </select>
          </div>

          <div>
            <MultiSelect
              options={gradeLevelsOptions}
              value={formData.gradeLevels}
              onChange={(gradeLevels) => setFormData({ ...formData, gradeLevels })}
              label="Tingkat Kelas"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jam per Minggu
              </label>
              <input
                type="number"
                min="1"
                max="40"
                value={formData.hoursPerWeek}
                onChange={(e) =>
                  setFormData({ ...formData, hoursPerWeek: parseInt(e.target.value) || 0 })
                }
                className="w-full h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
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
        title="Hapus Mata Pelajaran"
        message={`Apakah Anda yakin ingin menghapus "${deletingItem?.name}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Ya, Hapus"
        cancelText="Batal"
        variant="danger"
      />
    </div>
  );
}
