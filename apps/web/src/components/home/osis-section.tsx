"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function OsissSection() {
  const [data, setData] = useState<{
    title?: string;
    description?: string;
    image?: string;
    isActive?: boolean;
  }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/osis")
      .then((res) => res.json())
      .then((result) => {
        if (result.success && result.data) {
          setData(result.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching OSIS:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const isActive = data.isActive !== false;

  if (!isActive) {
    return null;
  }

  const title = data.title || "OSIS";
  const description = data.description || "OSIS MTs Darussalam adalah wadah kepemimpinan siswa yang aktif, kreatif, dan bertanggung jawab dalam menyelenggarakan kegiatan sekolah serta menumbuhkan jiwa organisasi sejak dini.";
  const image = data.image || "/osis.png";

  return (
    <div className="mt-24 flex flex-col-reverse md:flex-row items-center md:space-x-10">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="md:w-7/12"
      >
        <img className="md:w-11/12" src={image} alt="OSIS" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="md:w-5/12 md:transform md:-translate-y-6"
      >
        <h1 className="font-semibold text-darken text-3xl lg:pr-64">
          <span className="text-green-400">{title} </span>
        </h1>
        <p className="text-gray-500 my-5 lg:pr-24">
          {description}
        </p>
      </motion.div>
    </div>
  );
}