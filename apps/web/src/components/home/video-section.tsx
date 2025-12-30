"use client";

import { motion } from "framer-motion";

export default function VideoSection() {
  return (
    <div className="mt-28">
      <motion.div
        initial={{ opacity: 0, rotateX: 90 }}
        animate={{ opacity: 1, rotateX: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-screen-md mx-auto"
        data-aos="flip-down"
      >
        <h1 className="text-3xl font-bold mb-4">
          Apa itu <span className="text-green-400">MTs Darussalam?</span>
        </h1>
        <p className="text-gray-500">
          MTS Darrusalam adalah sekolah Islam setingkat SMP yang berfokus pada
          pendidikan akademik dan agama. Kami mengajarkan ilmu pengetahuan umum
          serta pendidikan keislaman untuk membentuk generasi yang cerdas,
          berakhlak, dan berwawasan luas.
        </p>
      </motion.div>

      <div className="flex justify-center items-center mt-16 mb-16">
        <video
          className="rounded-xl z-40"
          src="/Mts darrusalam.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "1400px",
            maxWidth: "100vw",
            height: "auto",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}