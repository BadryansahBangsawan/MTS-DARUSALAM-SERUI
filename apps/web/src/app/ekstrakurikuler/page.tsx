"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import EkstrakurikulerCard from "@/components/ekstrakurikuler/ekstrakurikuler-card";
import type { Ekstrakurikuler } from "@/types/ekstrakurikuler";

export default function EkstrakurikulerPage() {
  const [items, setItems] = useState<Ekstrakurikuler[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/ekstrakurikuler");
      const data = await response.json();
      if (data.success) {
        // Parse JSON fields
        const parsedItems = (data.data || []).map((item: any) => ({
          ...item,
          features: typeof item.features === 'string' ? JSON.parse(item.features) : (item.features || []),
          schedule: typeof item.schedule === 'string' ? JSON.parse(item.schedule) : (item.schedule || []),
          rating: parseFloat(item.rating || "0"),
        }));
        // Filter only active items
        setItems(parsedItems.filter((i: Ekstrakurikuler) => i.isActive ?? true));
      }
    } catch (error) {
      console.error("Error fetching ekstrakurikuler:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="bg-cream flex-1 flex flex-col min-h-screen" id="extracurricular">
        <div className="flex items-center justify-center flex-1">
          <Loader2 className="h-12 w-12 animate-spin text-green-500" />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-cream flex-1 flex flex-col" id="extracurricular">
      <div className="container max-w-screen-xl mx-auto px-2 sm:px-4 py-10 md:py-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16"
          data-aos="fade-down"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-darken mb-3 md:mb-4">
            Kegiatan Ekstrakurikuler
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            Kembangkan bakat dan minat siswa melalui berbagai kegiatan
            ekstrakurikuler yang menarik dan bermanfaat
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10"
          data-aos="fade-up"
        >
          {items.map((ekstra) => (
            <EkstrakurikulerCard key={ekstra.id} {...ekstra} whatsapp={ekstra.whatsapp || ekstra.whatsappContact || ""} />
          ))}
        </motion.div>

        {items.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-500">Belum ada kegiatan ekstrakurikuler.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
