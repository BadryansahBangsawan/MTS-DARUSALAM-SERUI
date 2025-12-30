"use client";

import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";

export default function VisiMisi() {
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
          MTs Darussalam berkomitmen menciptakan lingkungan belajar yang islami,
          modern, dan didukung fasilitas lengkap demi menunjang proses pembelajaran
          yang efektif, efisien, dan berkualitas.
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
            Menjadi Madrasah Tsanawiyah yang unggul dalam prestasi, berkarakter
            Islami, dan berwawasan global.
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
            Menyelenggarakan pendidikan Islam yang berkualitas, membentuk
            siswa yang beriman, bertakwa, berakhlak mulia, dan mampu bersaing
            di era global.
          </p>
        </motion.div>
      </motion.div>
    </>
  );
}