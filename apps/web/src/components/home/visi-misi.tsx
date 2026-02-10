"use client";

import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";
import { useEffect, useState } from "react";
import dummyData from "@/lib/dummy-data.json";

export default function VisiMisi() {
  const [data, setData] = useState<{ vision?: string; mission?: string; description?: string }>((dummyData.schoolInformation || {}) as any);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/school-information")
      .then((res) => res.json())
      .then((result) => {
        if (result.success && result.data) {
          setData(result.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching school info:", err);
        setLoading(false);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const visionText = data.vision || "";
  const missionText = data.mission || "";
  const descriptionText = data.description || "";

  if (!visionText && !missionText) {
    return null;
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, rotateX: -90 }}
        animate={{ opacity: 1, rotateX: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-xl mx-auto text-center mt-24"
        data-aos="flip-up"
      >
        <h1 className="font-bold text-darken my-3 text-2xl">
          Visi & Misi <span className="text-green-400">MTs Darussalam</span>
        </h1>
        <p className="leading-relaxed text-gray-500">
          {descriptionText}
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 gap-14 md:gap-5 mt-20"
      >
        <motion.div variants={itemVariants} className="bg-white shadow-xl p-6 text-center rounded-xl" data-aos="fade-up">
          <div
            style={{ background: "#5B72EE" }}
            className="rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12"
          >
            <Eye className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-medium text-xl mb-3 lg:px-14 text-darken">Visi</h1>
          <p className="px-4 text-gray-500">
            {visionText}
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white shadow-xl p-6 text-center rounded-xl" data-aos="fade-up" data-aos-delay="300">
          <div
            style={{ background: "#29B9E7" }}
            className="rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12"
          >
            <Target className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-medium text-xl mb-3 lg:px-14 text-darken">Misi</h1>
          <p className="px-4 text-gray-500">
            {missionText}
          </p>
        </motion.div>
      </motion.div>
    </>
  );
}