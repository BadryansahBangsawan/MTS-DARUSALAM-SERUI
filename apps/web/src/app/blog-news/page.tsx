"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import BlogNewsCard from "@/components/blog-news/blog-news-card";

interface BlogNews {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  featuredImage?: string;
  category: "berita" | "pengumuman" | "artikel" | "kegiatan";
  views?: number;
  createdAt: string;
}

export default function BlogNewsPage() {
  const [items, setItems] = useState<BlogNews[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/blog-news?is_published=true");
      const data = await response.json();
      if (data.success) {
        setItems(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching blog news:", error);
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

  return (
    <section className="bg-cream flex-1 flex flex-col">
      <div className="container max-w-screen-xl mx-auto px-2 sm:px-4 py-10 md:py-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-darken mb-3 md:mb-4">
            Blog & Berita
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            Dapatkan informasi terbaru seputar berita, pengumuman, artikel, dan kegiatan di MTS Darrusalam
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {items.map((item) => (
            <BlogNewsCard key={item.id} {...item} />
          ))}
        </motion.div>

        {items.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-500">
              Belum ada blog news.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
