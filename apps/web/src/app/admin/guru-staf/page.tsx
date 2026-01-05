"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import { DataTable } from "@/components/admin/data-table";
import { ModalForm } from "@/components/admin/modal-form";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { DynamicList } from "@/components/admin/dynamic-list";
import { ColorPicker } from "@/components/admin/color-picker";
import { authFetch } from "@/lib/auth";
import { Badge } from "@/components/admin/badge";
import { Button } from "@/components/ui/button";

interface GuruDanStaf {
  id: number;
  nama: string;
  kategori: "pimpinan" | "wakamad" | "unit_penunjang" | "pembina_ekstra" | "wali_kelas" | "tenaga_kependidikan";
  jabatan: string;
  mataPelajaran?: string;
  kelas?: string[];
  jamMengajar?: number;
  totalBebanKerja?: number;
  sortOrder: number;
  colorTheme?: string;
  backgroundStyle?: string;
  isActive: boolean;
}

interface FormData {
  id?: number;
  nama: string;
  kategori: "pimpinan" | "wakamad" | "unit_penunjang" | "pembina_ekstra" | "wali_kelas" | "tenaga_kependidikan";
  jabatan: string;
  mataPelajaran: string;
  kelas: string;
  jamMengajar: string;
  totalBebanKerja: string;
  sortOrder: string;
  colorTheme: string;
  backgroundStyle: string;
  isActive: boolean;
}

const kategoriOptions = [
  { value: "pimpinan", label: "Pimpinan" },
  { value: "wakamad", label: "Wakil Kepala Madrasah" },
  { value: "unit_penunjang", label: "Unit Penunjang" },
  { value: "pembina_ekstra", label: "Pembina Ekstrakurikuler" },
  { value: "wali_kelas", label: "Wali Kelas" },
  { value: "tenaga_kependidikan", label: "Tenaga Kependidikan" },
];

export default function GuruStafPage() {
  const [items, setItems] = useState<GuruDanStaf[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<GuruDanStaf | null>(null);
  const [deletingItem, setDeletingItem] = useState<GuruDanStaf | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nama: "",
    kategori: "pimpinan",
    jabatan: "",
    mataPelajaran: "",
    kelas: "",
    jamMengajar: "",
    totalBebanKerja: "",
    sortOrder: "0",
    colorTheme: "border-green-400",
    backgroundStyle: "",
    isActive: true,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await authFetch("/api/guru-staf");
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
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.jabatan.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.mataPelajaran && item.mataPelajaran.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      nama: "",
      kategori: "pimpinan",
      jabatan: "",
      mataPelajaran: "",
      kelas: "",
      jamMengajar: "",
      totalBebanKerja: "",
      sortOrder: "0",
      colorTheme: "border-green-400",
      backgroundStyle: "",
      isActive: true,
    });
    setShowModal(true);
  };

  const handleEdit = (item: GuruDanStaf) => {
    setEditingItem(item);
    setFormData({
      id: item.id,
      nama: item.nama,
      kategori: item.kategori,
      jabatan: item.jabatan,
      mataPelajaran: item.mataPelajaran || "",
      kelas: item.kelas?.join(", ") || "",
      jamMengajar: item.jamMengajar?.toString() || "",
      totalBebanKerja: item.totalBebanKerja?.toString() || "",
      sortOrder: item.sortOrder.toString(),
      colorTheme: item.colorTheme || "border-green-400",
      backgroundStyle: item.backgroundStyle || "",
      isActive: item.isActive ?? true,
    });
    setShowModal(true);
  };

  const handleDelete = (item: GuruDanStaf) => {
    setDeletingItem(item);
  };

  const handleConfirmDelete = async () => {
    if (!deletingItem) return;

    try {
      const response = await authFetch(`/api/guru-staf/${deletingItem.id}`, {
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
    if (!formData.nama.trim() || !formData.jabatan.trim()) {
      alert("Nama dan Jabatan wajib diisi");
      return;
    }

    setSaving(true);

    try {
      const url = editingItem ? `/api/guru-staf/${editingItem.id}` : "/api/guru-staf";
      const method = editingItem ? "PUT" : "POST";

      const payload = {
        nama: formData.nama,
        kategori: formData.kategori,
        jabatan: formData.jabatan,
        mataPelajaran: formData.mataPelajaran || null,
        kelas: formData.kelas ? formData.kelas.split(",").map(k => k.trim()) : null,
        jamMengajar: formData.jamMengajar ? parseInt(formData.jamMengajar) : null,
        totalBebanKerja: formData.totalBebanKerja ? parseFloat(formData.totalBebanKerja) : null,
        sortOrder: parseInt(formData.sortOrder),
        colorTheme: formData.colorTheme || null,
        backgroundStyle: formData.backgroundStyle || null,
        isActive: formData.isActive,
      };

      const response = await authFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
      key: "nama",
      label: "Nama",
      sortable: true,
    },
    {
      key: "kategori",
      label: "Kategori",
      render: (value: string) => {
        const kategori = kategoriOptions.find(k => k.value === value);
        return <Badge variant="active">{kategori?.label || value}</Badge>;
      },
      className: "text-center",
    },
    {
      key: "jabatan",
      label: "Jabatan",
      sortable: true,
    },
    {
      key: "mataPelajaran",
      label: "Mata Pelajaran",
      render: (value: string) => value || "-",
    },
    {
      key: "jamMengajar",
      label: "Jam Mengajar",
      render: (value: number) => value ? `${value} jam` : "-",
      className: "text-center",
    },
    {
      key: "totalBebanKerja",
      label: "Total Beban Kerja",
      render: (value: number) => value ? `${value} JPL` : "-",
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
      className: "text-center",
    },
    {
      key: "actions",
      label: "Aksi",
      render: (_: any, row: GuruDanStaf) => (
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
            Kelola Guru & Staf
          </h1>
          <p className="text-gray-600">
            Kelola data guru dan staf MTs Darussalam
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
        searchPlaceholder="Cari guru & staf..."
        emptyState={{
          title: "Tidak ada data",
          description:
            "Belum ada data guru & staf. Silakan tambah baru.",
          action: { label: "Tambah Guru & Staf", onClick: handleAdd },
        }}
      />

      <ModalForm
        open={showModal}
        onClose={() => setShowModal(false)}
        title={editingItem ? "Edit Guru & Staf" : "Tambah Guru & Staf"}
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
                value={formData.nama}
                onChange={(e) =>
                  setFormData({ ...formData, nama: e.target.value })
                }
                className="w-full h-11 px-4 text-sm border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                placeholder="Nama lengkap"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Kategori*
              </label>
              <select
                value={formData.kategori}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    kategori: e.target.value as any,
                  })
                }
                className="w-full h-11 px-4 text-sm border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              >
                {kategoriOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Jabatan*
            </label>
            <input
              type="text"
              value={formData.jabatan}
              onChange={(e) =>
                setFormData({ ...formData, jabatan: e.target.value })
              }
              className="w-full h-11 px-4 text-sm border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              placeholder="Jabatan"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Mata Pelajaran
              </label>
              <input
                type="text"
                value={formData.mataPelajaran}
                onChange={(e) =>
                  setFormData({ ...formData, mataPelajaran: e.target.value })
                }
                className="w-full h-11 px-4 text-sm border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                placeholder="Mata pelajaran yang diampu"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Kelas
              </label>
              <input
                type="text"
                value={formData.kelas}
                onChange={(e) =>
                  setFormData({ ...formData, kelas: e.target.value })
                }
                className="w-full h-11 px-4 text-sm border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                placeholder="Contoh: 7A, 7B, 8A (pisahkan dengan koma)"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Jam Mengajar
              </label>
              <input
                type="number"
                value={formData.jamMengajar}
                onChange={(e) =>
                  setFormData({ ...formData, jamMengajar: e.target.value })
                }
                className="w-full h-11 px-4 text-sm border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Total Beban Kerja (JPL)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.totalBebanKerja}
                onChange={(e) =>
                  setFormData({ ...formData, totalBebanKerja: e.target.value })
                }
                className="w-full h-11 px-4 text-sm border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Urutan
              </label>
              <input
                type="number"
                value={formData.sortOrder}
                onChange={(e) =>
                  setFormData({ ...formData, sortOrder: e.target.value })
                }
                className="w-full h-11 px-4 text-sm border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Color Theme (Border Color)
            </label>
            <ColorPicker
              value={formData.colorTheme}
              onChange={(color) => setFormData({ ...formData, colorTheme: color })}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Background Style
            </label>
            <input
              type="text"
              value={formData.backgroundStyle}
              onChange={(e) =>
                setFormData({ ...formData, backgroundStyle: e.target.value })
              }
              className="w-full h-11 px-4 text-sm border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              placeholder="Contoh: bg-gradient-to-r from-green-50 to-green-100"
            />
          </div>
        </div>
      </ModalForm>

      <ConfirmDialog
        open={!!deletingItem}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleConfirmDelete}
        title="Hapus Guru & Staf"
        message={`Apakah Anda yakin ingin menghapus "${deletingItem?.nama}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Ya, Hapus"
        cancelText="Batal"
        variant="danger"
      />
    </div>
  );
}
