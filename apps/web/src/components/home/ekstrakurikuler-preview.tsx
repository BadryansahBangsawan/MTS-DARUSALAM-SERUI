"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function EkstrakurikulerPreview() {
  return (
    <div
      id="ekstrakurikuler"
      className="mt-20 scroll-mt-28 flex flex-col-reverse md:flex-row items-center md:space-x-10"
    >
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="md:w-6/12"
      >
        <img
          className="md:w-11/12"
          src="/Ekstrakurikuler.png"
          alt="Ekstrakurikuler"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="md:w-6/12"
      >
        <h1 className="mt-8 md:mt-0 font-semibold text-darken text-3xl lg:pr-64">
          <span className="text-green-400">Ekstrakurikuler </span>Siswa
        </h1>

        <p className="text-gray-500 mt-4 mb-5 lg:pr-52">
          MTs Darussalam menyediakan berbagai ekstrakurikuler seperti pramuka,
          Drum, Mengaji, seni, dan tilawah untuk menumbuhkan bakat, kreativitas,
          kedisiplinan, serta membentuk karakter islami siswa.
        </p>

        <Link
          href="/ekstrakurikuler"
          className="px-5 py-3 border border-green-400 text-green-400 font-medium mt-4 focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out rounded-full inline-block text-center"
        >
          Lihat
        </Link>
      </motion.div>
    </div>
  );
}
