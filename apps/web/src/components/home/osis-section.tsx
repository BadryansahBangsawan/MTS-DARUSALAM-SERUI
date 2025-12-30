"use client";

import { motion } from "framer-motion";

export default function OsissSection() {
  return (
    <div className="mt-24 flex flex-col-reverse md:flex-row items-center md:space-x-10">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="md:w-7/12"
      >
        <img className="md:w-11/12" src="/osis.png" alt="OSIS" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="md:w-5/12 md:transform md:-translate-y-6"
      >
        <h1 className="font-semibold text-darken text-3xl lg:pr-64">
          <span className="text-green-400">OSIS </span>
        </h1>
        <p className="text-gray-500 my-5 lg:pr-24">
          OSIS MTs Darussalam adalah wadah kepemimpinan siswa yang aktif,
          kreatif, dan bertanggung jawab dalam menyelenggarakan kegiatan sekolah
          serta menumbuhkan jiwa organisasi sejak dini.
        </p>
      </motion.div>
    </div>
  );
}