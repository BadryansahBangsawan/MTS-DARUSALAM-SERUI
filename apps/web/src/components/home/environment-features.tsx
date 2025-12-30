"use client";

import { motion } from "framer-motion";
import { Grid2x2, Layers, Users } from "lucide-react";

export default function EnvironmentFeatures() {
  return (
    <div className="md:flex mt-40 md:space-x-10 items-start">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="md:w-7/12 relative"
      >
        <div
          style={{ background: "#33EFA0" }}
          className="w-32 h-32 rounded-full absolute z-0 left-4 -top-12 animate-pulse"
        ></div>
        <div
          style={{ background: "#33D9EF" }}
          className="w-5 h-5 rounded-full absolute z-0 left-36 -top-12 animate-ping"
        ></div>
        <img className="relative z-50 floating" src="/vcall.png" alt="" />
        <div
          style={{ background: "#5B61EB" }}
          className="w-36 h-36 rounded-full absolute z-0 right-16 -bottom-1 animate-pulse"
        ></div>
        <div
          style={{ background: "#F56666" }}
          className="w-5 h-5 rounded-full absolute z-0 right-52 bottom-1 animate-ping"
        ></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="md:w-5/12 mt-20 md:mt-0 text-gray-500"
      >
        <h1 className="text-2xl font-semibold text-darken lg:pr-40">
          lingkungan <span className="text-yellow-500">Belajar </span> Nyaman &
          Interaktif
        </h1>

        <div className="flex items-center space-x-5 my-5">
          <div className="flex-shrink bg-white shadow-lg rounded-full p-3 flex items-center justify-center">
            <Grid2x2 size={16} />
          </div>
          <p>Guru-guru berpengalaman siap membimbing siswa secara langsung di kelas</p>
        </div>

        <div className="flex items-center space-x-5 my-5">
          <div className="flex-shrink bg-white shadow-lg rounded-full p-3 flex items-center justify-center">
            <Layers size={16} />
          </div>
          <p>Metode pengajaran interaktif untuk meningkatkan pemahaman siswa</p>
        </div>

        <div className="flex items-center space-x-5 my-5">
          <div className="flex-shrink bg-white shadow-lg rounded-full p-3 flex items-center justify-center">
            <Users size={16} />
          </div>
          <p>Setiap siswa diperhatikan perkembangan akademik dan akhlaknya</p>
        </div>
      </motion.div>
    </div>
  );
}