import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { authFetch } from "@/lib/auth";

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function ImageUpload({ value, onChange, disabled = false, className }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Harap pilih file gambar.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file maksimal 5MB.");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await authFetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload gagal");
      }

      const data = await response.json();
      setPreview(data.url);
      onChange(data.url);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Gagal mengupload gambar. Silakan coba lagi.");
    } finally {
      setUploading(false);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange("");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
        fileInputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className={cn("space-y-3", className)}>
      {preview ? (
        <div className="relative group">
          <div className="relative overflow-hidden rounded-2xl border-2 border-emerald-500/30 shadow-lg">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {!disabled && (
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-sm text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500 hover:text-white shadow-lg"
                title="Hapus foto"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg">
              <p className="text-xs font-medium text-slate-700">Preview Foto</p>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer group",
            isDragging
              ? "border-emerald-500 bg-emerald-50"
              : "border-slate-300 hover:border-emerald-400 hover:bg-emerald-50/20",
            disabled && "opacity-50 cursor-not-allowed hover:border-slate-300"
          )}
          onClick={() => !disabled && fileInputRef.current?.click()}
        >
          {uploading ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <div className="relative">
                <Loader2 className="h-14 w-14 text-emerald-500 animate-spin" />
                <div className="absolute inset-0 h-14 w-14 border-4 border-emerald-200 rounded-full"></div>
              </div>
              <div className="text-center">
                <p className="text-base font-semibold text-slate-900 mb-1">Mengupload gambar...</p>
                <p className="text-sm text-slate-500">Mohon tunggu sebentar</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 space-y-5 px-8">
              <div className={`w-20 h-20 rounded-2xl ${isDragging ? "bg-emerald-100" : "bg-slate-100"} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                <ImageIcon className={`h-10 w-10 ${isDragging ? "text-emerald-500" : "text-slate-400"}`} />
              </div>
              <div className="text-center">
                <p className="text-base font-semibold text-slate-900 mb-2">
                  Upload Foto Profil
                </p>
                <p className="text-sm text-slate-600">
                  Klik atau drag & drop file di sini
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs text-slate-500 bg-slate-50 px-4 py-2 rounded-lg">
                <Sparkles className="h-4 w-4" />
                <p>JPG, PNG, GIF, WEBP (maks. 5MB)</p>
              </div>
            </div>
          )}
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        disabled={disabled || uploading}
        className="hidden"
      />
    </div>
  );
}
