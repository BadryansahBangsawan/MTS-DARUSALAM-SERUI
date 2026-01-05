"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Calendar, Eye, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface BlogNews {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  category: "berita" | "pengumuman" | "artikel" | "kegiatan";
  authorId: number;
  views?: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export default function BlogNewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const [item, setItem] = useState<BlogNews | null>(null);
  const [loading, setLoading] = useState(true);
  const [slug, setSlug] = useState<string>("");

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    fetchParams();
  }, [params]);

  useEffect(() => {
    if (slug) {
      fetchItem();
    }
  }, [slug]);

  const fetchItem = async () => {
    try {
      const response = await fetch(`/api/blog-news/slug/${slug}`);
      const data = await response.json();
      if (data.success) {
        setItem(data.data);
      } else {
        setItem(null);
      }
    } catch (error) {
      console.error("Error fetching blog news:", error);
      setItem(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="bg-cream flex-1 flex flex-col min-h-screen">
        <div className="flex items-center justify-center flex-1">
          <Loader2 className="h-12 w-12 animate-spin text-green-500" />
        </div>
      </section>
    );
  }

  if (!item) {
    return (
      <section className="bg-cream flex-1 flex flex-col min-h-screen">
        <div className="container max-w-screen-xl mx-auto px-2 sm:px-4 py-10 md:py-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-darken mb-4">
              Berita Tidak Ditemukan
            </h1>
            <p className="text-gray-500 mb-8">
              Maaf, berita yang Anda cari tidak ditemukan atau telah dihapus.
            </p>
            <Button onClick={() => router.push("/blog-news" as any)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Blog & Berita
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  const categoryColors = {
    berita: "bg-blue-100 text-blue-700",
    pengumuman: "bg-amber-100 text-amber-700",
    artikel: "bg-purple-100 text-purple-700",
    kegiatan: "bg-green-100 text-green-700",
  };

  return (
    <section className="bg-cream flex-1 flex flex-col">
      <div className="container max-w-screen-xl mx-auto px-2 sm:px-4 py-10 md:py-20 pb-32">
        <Button
          variant="outline"
          className="mb-6"
          onClick={() => router.push("/blog-news" as any)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Kembali
        </Button>

        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-8">
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                categoryColors[item.category]
              }`}
            >
              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
            </span>
          </div>

          {item.featuredImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8 rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src={item.featuredImage}
                alt={item.title}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-darken mb-6">
            {item.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(item.publishedAt || item.createdAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            {item.views !== undefined && (
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{item.views} dilihat</span>
              </div>
            )}
          </div>

          {item.excerpt && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-md mb-8 border-l-4 border-green-500"
            >
              <p className="text-lg text-gray-700 italic">{item.excerpt}</p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl"
          >
            <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
              <div
                className="text-gray-700 whitespace-pre-wrap leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>
          </motion.div>
        </motion.article>
      </div>
    </section>
  );
}
