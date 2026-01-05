"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Quote, ArrowLeft, CheckCircle2, Loader2, Star } from "lucide-react";
import { RatingPicker } from "@/components/admin/rating-picker";
import { ImageUpload } from "@/components/admin/image-upload";

interface FormData {
  authorName: string;
  role: string;
  content: string;
  rating: number;
  imageUrl: string;
}

export default function TestimonialSubmitPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    authorName: "",
    role: "",
    content: "",
    rating: 5,
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (submitted && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (submitted && countdown === 0) {
      router.push("/");
    }
  }, [submitted, countdown, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.authorName || !formData.content) {
      setError("Nama dan konten testimoni wajib diisi");
      setLoading(false);
      return;
    }

    if (formData.content.length < 20) {
      setError("Konten testimoni minimal 20 karakter");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/testimonials/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || "Terjadi kesalahan saat mengirim testimoni");
      }
    } catch (err) {
      console.error("Error submitting testimonial:", err);
      setError("Terjadi kesalahan saat mengirim testimoni");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Terima Kasih!
          </h1>
          <p className="text-gray-600 mb-6">
            Testimoni Anda telah dikirim dan menunggu persetujuan admin.
          </p>
          <p className="text-sm text-gray-500">
            Mengalihkan ke beranda dalam {countdown} detik...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="inline-flex items-center text-gray-600 hover:text-green-600 mb-8 transition-colors font-medium"
        >
          <ArrowLeft size={20} className="mr-2" />
          Kembali ke Beranda
        </button>

        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="mx-auto bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Quote className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Kirim Testimoni Alumni
            </h1>
            <p className="text-gray-500">
              Bagikan pengalaman Anda selama di MTs Darussalam
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="authorName"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Nama Alumni *
                </label>
                <input
                  id="authorName"
                  type="text"
                  value={formData.authorName}
                  onChange={(e) =>
                    setFormData({ ...formData, authorName: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all"
                  placeholder="Nama lengkap"
                  disabled={loading}
                />
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Role/Jabatan
                </label>
                <input
                  id="role"
                  type="text"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all"
                  placeholder="Misal: Mahasiswa, PNS, dll."
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Konten Testimoni *
              </label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={6}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all resize-none"
                placeholder="Bagikan pengalaman Anda selama di MTs Darussalam..."
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-2">
                Minimal 20 karakter
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Rating *
              </label>
              <div className="flex items-center justify-center">
                <RatingPicker
                  value={formData.rating}
                  onChange={(value) =>
                    setFormData({ ...formData, rating: value })
                  }
                  readonly={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Foto Profil
              </label>
              <ImageUpload
                value={formData.imageUrl}
                onChange={(image) =>
                  setFormData({ ...formData, imageUrl: image })
                }
              />
              <p className="text-xs text-gray-500 mt-2">
                Opsional - Jika tidak ada foto, akan digunakan avatar default
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Mengirim...
                </span>
              ) : (
                "Kirim Testimoni"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              Testimoni Anda akan direview oleh admin sebelum ditampilkan di website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
