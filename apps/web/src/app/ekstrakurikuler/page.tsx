"use client";

import { motion } from "framer-motion";
import { ekstrakurikulerData } from "@/data/ekstrakurikuler";
import EkstrakurikulerCard from "@/components/ekstrakurikuler/ekstrakurikuler-card";

export default function EkstrakurikulerPage() {
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
          {ekstrakurikulerData.map((ekstra) => (
            <EkstrakurikulerCard key={ekstra.id} {...ekstra} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}