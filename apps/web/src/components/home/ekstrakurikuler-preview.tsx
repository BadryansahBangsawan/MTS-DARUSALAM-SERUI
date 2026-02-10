"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import EkstrakurikulerCard from "@/components/ekstrakurikuler/ekstrakurikuler-card";
import type { Ekstrakurikuler } from "@/types/ekstrakurikuler";
import dummyData from "@/lib/dummy-data.json";

const safeParseArray = (value: any) => {
  if (Array.isArray(value)) return value;
  if (typeof value !== "string") return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const normalizeItems = (raw: any[] = []) =>
  raw
    .map((item: any) => ({
      ...item,
      features: safeParseArray(item.features),
      schedule: safeParseArray(item.schedule),
      rating: parseFloat(item.rating || "0"),
    }))
    .filter((i: Ekstrakurikuler) => i.isActive ?? true);

export default function EkstrakurikulerPreview() {
  const [items, setItems] = useState<Ekstrakurikuler[]>(normalizeItems((dummyData.ekstrakurikuler as any[]) || []).slice(0, 3));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/ekstrakurikuler");
      const data = await response.json();
      if (data.success) {
        setItems(normalizeItems(data.data || []).slice(0, 3));
      }
    } catch (error) {
      console.error("Error fetching ekstrakurikuler:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="ekstrakurikuler" className="mt-20 scroll-mt-28">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 md:mb-16"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-darken mb-3 md:mb-4">
          <span className="text-green-400">Ekstrakurikuler</span> Siswa
        </h1>
        <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto mb-8">
          MTs Darussalam menyediakan berbagai ekstrakurikuler untuk menumbuhkan bakat, kreativitas, kedisiplinan, serta membentuk karakter islami siswa.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10"
      >
        {items.map((ekstra) => (
          <EkstrakurikulerCard key={ekstra.id} {...ekstra} whatsapp={ekstra.whatsapp || ekstra.whatsappContact || ""} />
        ))}
      </motion.div>

      {items.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center py-20"
        >
          <p className="text-gray-500">Belum ada kegiatan ekstrakurikuler.</p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mt-10"
      >
        <Link
          href="/ekstrakurikuler"
          className="px-8 py-3 bg-green-500 text-white font-medium rounded-full hover:bg-green-600 transition-colors inline-block"
        >
          Lihat Semua Ekstrakurikuler
        </Link>
      </motion.div>
    </div>
  );
}
