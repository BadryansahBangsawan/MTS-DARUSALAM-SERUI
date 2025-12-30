"use client";

import { motion } from "framer-motion";

export default function PersonalApproach() {
  return (
    <div className="flex flex-col md:flex-row items-center mt-12">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="md:w-5/12"
      >
        <h1 className="text-darken font-semibold text-3xl leading-tight lg:pr-32">
          <span className="text-green-400">Pendekatan </span>Personal untuk Setiap
          Siswa
        </h1>
        <p className="my-5 lg:pr-14 text-gray-500">
          Guru di MTs Darussalam memberikan perhatian khusus kepada setiap
          siswa melalui bimbingan pribadi. Hal ini dilakukan untuk membantu
          perkembangan akademik dan karakter siswa secara menyeluruh.
        </p>
      </motion.div>

      <motion.img
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="md:w-7/12"
        src="/Guru.png"
        alt="Guru mengajar"
      />
    </div>
  );
}