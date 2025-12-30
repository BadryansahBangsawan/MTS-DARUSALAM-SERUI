"use client";

import { motion } from "framer-motion";

export default function MataPelajaran() {
  return (
    <div
      id="mata-pelajaran"
      className="mt-24 scroll-mt-28 flex flex-col md:flex-row items-center md:space-x-10"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: -50 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="md:w-6/12"
      >
        <img
          className="md:w-8/12 mx-auto"
          src="/Pelajaran.png"
          alt="Mata Pelajaran"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 50 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="md:w-6/12 mt-10 md:mt-0"
      >
        <div className="flex items-center mb-6">
          <span className="border border-gray-300 w-14"></span>
          <h2 className="text-gray-400 tracking-widest text-sm ml-6">
            INTEGRATIONS
          </h2>
        </div>

        <h1 className="font-semibold text-darken text-2xl lg:pr-40">
          <span className="text-green-400">14+ </span>Mata Pelajaran
        </h1>

        <p className="text-gray-500 mt-4 lg:pr-20">
          MTs Darussalam menyelenggarakan pembelajaran yang terstruktur melalui
          14 mata pelajaran inti yang dirancang untuk membentuk siswa yang
          cerdas secara intelektual dan spiritual. Mata pelajaran mencakup aspek
          keagamaan, bahasa, sains, hingga keterampilan hidup, dengan fokus pada
          penguatan karakter dan akhlak mulia. Mulai dari Pendidikan Agama
          Islam, Bahasa Arab, hingga Matematika dan Ilmu Pengetahuan Alam,
          seluruh kurikulum disusun untuk menyeimbangkan antara ilmu dunia dan
          akhirat. Pendekatan pembelajaran aktif dan interaktif mendorong siswa
          untuk berpikir kritis, kreatif, serta mampu beradaptasi di era modern
          tanpa meninggalkan nilai-nilai keislaman.
        </p>
      </motion.div>
    </div>
  );
}
