"use client";

import { motion } from "framer-motion";

export default function Testimoni() {
  return (
    <div className="mt-24 flex flex-col-reverse md:flex-row items-start md:space-x-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: -50 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="md:w-5/12"
      >
        <div className="flex items-center mb-5">
          <span className="border border-gray-300 w-14"></span>
          <h1 className="text-gray-400 tracking-widest text-sm ml-20">Kata Mereka</h1>
        </div>

        <h1 className="font-semibold text-darken text-2xl lg:pr-50">
          Apa Kata Mereka?
        </h1>

        <p className="text-gray-500 my-5 lg:pr-36">
          MTs Darussalam mendapat banyak respon positif dari para siswa, guru,
          dan orang tua atas proses belajar dan pembinaan yang diberikan.
        </p>

        <p className="text-gray-500 my-5 lg:pr-36">
          Beberapa siswa dan guru merasa terbantu dan berkembang selama
          berada di MTs Darussalam.
        </p>

        <p className="text-gray-500 my-5 lg:pr-36">
          Kamu juga pernah merasakan hal yang sama? Berikan pendapatmu
          sekarang!
        </p>

        <a
          href="https://forms.gle/LBNuoEuRVGEg61reA"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 border border-green-400 text-green-400 font-medium my-4 focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out rounded-full inline-block text-center"
        >
          Kirim pendapatmu
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 50 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="md:w-7/12"
      >
        <img className="md:w-10/11 mx-auto" src="/pendapat-orang.png" alt="Testimoni" />
      </motion.div>
    </div>
  );
}