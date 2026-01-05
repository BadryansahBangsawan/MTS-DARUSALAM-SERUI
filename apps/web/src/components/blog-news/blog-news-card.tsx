"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Eye, ArrowRight } from "lucide-react";

interface BlogNewsCardProps {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  featuredImage?: string;
  category: "berita" | "pengumuman" | "artikel" | "kegiatan";
  views?: number;
  createdAt: string;
}

const categoryColors = {
  berita: "bg-blue-100 text-blue-700",
  pengumuman: "bg-amber-100 text-amber-700",
  artikel: "bg-purple-100 text-purple-700",
  kegiatan: "bg-green-100 text-green-700",
};

const categoryBorders = {
  berita: "border-blue-500",
  pengumuman: "border-amber-500",
  artikel: "border-purple-500",
  kegiatan: "border-green-500",
};

export default function BlogNewsCard({
  id,
  title,
  slug,
  excerpt,
  featuredImage,
  category,
  views,
  createdAt,
}: BlogNewsCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-full border-t-4 overflow-hidden"
    >
      {featuredImage && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={featuredImage}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                categoryColors[category]
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
          </div>
        </div>
      )}

      <div className="flex-1 p-6 flex flex-col">
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>
              {new Date(createdAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          {views !== undefined && (
            <div className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>{views}</span>
            </div>
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-green-600 transition-colors">
          <Link href={`/blog-news/${slug}` as any} className="hover:underline">
            {title}
          </Link>
        </h3>

        {excerpt && (
          <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
            {excerpt}
          </p>
        )}

        <Link
          href={`/blog-news/${slug}` as any}
          className="inline-flex items-center text-green-600 font-medium text-sm hover:text-green-700 transition-colors group mt-auto"
        >
          Baca Selengkapnya
          <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.article>
  );
}
