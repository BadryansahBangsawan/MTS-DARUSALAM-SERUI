"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, GripVertical, ChevronDown, ChevronRight } from "lucide-react";
import { ModalForm } from "@/components/admin/modal-form";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { ColorPicker } from "@/components/admin/color-picker";
import { Button } from "@/components/ui/button";
import { authFetch } from "@/lib/auth";

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
  backgroundStyle?: string;
}

const categories = [
  {
    id: "supervisory" as const,
    label: "Pengawas",
    description: "KEMENAG, KOMITE MADRASAH, DINAS DIKPORA",
    color: "border-green-400",
    maxItems: 3,
  },
  {
    id: "leadership" as const,
    label: "Pimpinan",
    description: "KETUA YAYASAN, KEPALA MADRASAH",
    color: "bg-gradient-to-r from-green-600 to-green-400 text-white",
    maxItems: 2,
  },
  {
    id: "staff" as const,
    label: "Staf",
    description: "Tata Usaha, Bendahara, Wakamad, dll",
    color: "border-green-300",
    maxItems: 8,
  },
  {
    id: "lab_manager" as const,
    label: "Kepala Lab",
    description: "Lab IPA, Lab Komputer",
    color: "border-green-300",
    maxItems: 2,
  },
  {
    id: "teaching" as const,
    label: "Dewan Guru",
    description: "Wali Kelas VII, VIII, IX",
    color: "border-green-300",
    maxItems: 6,
  },
];

export default function OrganizationPositionsPage() {
  const [items, setItems] = useState<OrganizationPosition[]>([]);
  const [loading, setLoading] = useState(true);
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
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(categories.map(c => c.id)));

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await authFetch("/api/organization-positions");
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

  const getItemsByCategory = (categoryId: string): OrganizationPosition[] => {
    return items
      .filter((item) => item.roleCategory === categoryId)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
  };

  const handleAdd = (category: OrganizationPosition["roleCategory"]) => {
    setEditingItem(null);
    const categoryItems = getItemsByCategory(category);
    setFormData({
      title: "",
      personName: "",
      roleCategory: category,
      sortOrder: categoryItems.length,
      colorTheme: category === "supervisory" ? "green" : "green",
      backgroundStyle: category === "leadership" ? "bg-gradient-to-r from-green-600 to-green-400 text-white" : undefined,
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
      backgroundStyle: item.backgroundStyle,
    });
    setShowModal(true);
  };

  const handleDelete = (item: OrganizationPosition) => {
    setDeletingItem(item);
  };

  const handleConfirmDelete = async () => {
    if (!deletingItem) return;

    try {
      const response = await authFetch(`/api/organization-positions/${deletingItem.id}`, {
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

      const response = await authFetch(url, {
        method,
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

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const NodeCard = ({ item, index }: { item: OrganizationPosition; index: number }) => (
    <div className={`bg-white rounded-lg px-6 py-3 shadow-sm border-2 ${
      item.colorTheme || "border-green-400"
    } ${item.backgroundStyle || ""}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <GripVertical className="h-5 w-5 text-gray-400" />
          <div>
            <div className="font-bold text-darken">{item.title}</div>
            {item.personName && (
              <div className="text-sm text-gray-600">{item.personName}</div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">#{item.sortOrder}</span>
          <button
            type="button"
            onClick={() => handleEdit(item)}
            className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
            title="Edit"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => handleDelete(item)}
            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
            title="Hapus"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

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
          <h1 className="text-2xl font-bold text-gray-900">Kelola Struktur Organisasi</h1>
          <p className="text-gray-600">Kelola struktur organisasi sekolah sesuai bagian-bagian</p>
        </div>
        <Button onClick={() => handleAdd("staff")}>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Posisi
        </Button>
      </div>

      <div className="space-y-4">
        {categories.map((category) => {
          const categoryItems = getItemsByCategory(category.id);
          const isExpanded = expandedCategories.has(category.id);
          const isFull = categoryItems.length >= category.maxItems;

          return (
            <div key={category.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div
                onClick={() => toggleCategory(category.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  {isExpanded ? <ChevronDown className="h-5 w-5 text-gray-500" /> : <ChevronRight className="h-5 w-5 text-gray-500" />}
                  <div className="text-left">
                    <h3 className="font-bold text-lg text-gray-900">{category.label}</h3>
                    <p className="text-sm text-gray-500">{category.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`text-sm px-3 py-1 rounded-full ${isFull ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                    {categoryItems.length} / {category.maxItems}
                  </span>
                  {!isFull && (
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAdd(category.id);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Tambah
                    </Button>
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-gray-200 p-4">
                  <div className="space-y-3">
                    {categoryItems.length === 0 ? (
                      <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                        Belum ada posisi di kategori ini
                      </div>
                    ) : (
                      categoryItems.map((item, index) => (
                        <NodeCard key={item.id} item={item} index={index} />
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

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
              Kategori*
            </label>
            <select
              value={formData.roleCategory}
              onChange={(e) => {
                const category = e.target.value as any;
                setFormData({
                  ...formData,
                  roleCategory: category,
                  backgroundStyle: category === "leadership" ? "bg-gradient-to-r from-green-600 to-green-400 text-white" : undefined,
                });
              }}
              className="w-full h-8 px-3 py-2 text-xs border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
            >
              <option value="supervisory">Pengawas (KEMENAG, KOMITE, DINAS)</option>
              <option value="leadership">Pimpinan (KETUA YAYASAN, KEPALA MADRASAH)</option>
              <option value="staff">Staf (Tata Usaha, Wakamad, dll)</option>
              <option value="lab_manager">Kepala Lab (Lab IPA, Lab Komputer)</option>
              <option value="teaching">Dewan Guru (Wali Kelas)</option>
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

          {formData.roleCategory === "leadership" && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
              <p className="text-sm text-yellow-800">
                Catatan: Posisi ini akan memiliki background gradient hijau di tampilan publik.
              </p>
            </div>
          )}
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
