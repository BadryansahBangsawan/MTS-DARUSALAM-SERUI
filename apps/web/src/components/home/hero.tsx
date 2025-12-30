"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function Hero() {
  return (
    <div id="home" className="bg-cream scroll-mt-28">
      <div className="max-w-screen-xl px-8 mx-auto flex flex-col lg:flex-row items-start">
        <div className="flex flex-col w-full lg:w-6/12 justify-center lg:pt-24 items-start text-center lg:text-left mb-5 md:mb-0">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="my-4 text-5xl font-bold leading-tight text-darken"
            data-aos="fade-right"
            data-aos-once="true"
          >
            <span className="text-green-400">MTs</span> Darussalam
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="leading-normal text-2xl mb-8"
            data-aos="fade-down"
            data-aos-once="true"
            data-aos-delay="300"
          >
            MTs Darussalam adalah sekolah Islam setingkat SMP yang siap
            membimbing kamu dengan metode pembelajaran modern dan islami
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="w-full md:flex items-center justify-center lg:justify-start md:space-x-5"
            data-aos="fade-up"
            data-aos-once="true"
            data-aos-delay="700"
          >
            <a
              href="https://wa.me/6281354155066?text=Halo%20saya%20ingin%20daftar%20MTS%20Darrusalam"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:mx-0 bg-yellow-500 text-white text-xl font-bold rounded-full py-4 px-9 focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out inline-block"
              style={{ backgroundColor: "#22C55E" }}
            >
              Daftar Sekarang
            </a>

            <div className="flex items-center justify-center space-x-3 mt-5 md:mt-0 ml-4 lg:ml-8 cursor-pointer transform transition hover:scale-110 duration-300 ease-in-out">
              <button className="bg-white w-14 h-14 rounded-full flex items-center justify-center ">
                <Play className="w-5 h-5 ml-2 fill-[#23BDEE] text-[#23BDEE]" />
              </button>
              <a
                href="https://youtu.be/84rxYQ-JbS4?si=kvK8UpK3ScPdKfQB"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lihat cara belajarnya
              </a>
            </div>
          </motion.div>
        </div>

        <div className="w-full lg:w-6/12 lg:-mt-16 relative" id="girl">
          <motion.img
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-10/12 mx-auto 2xl:-mb-0"
            src="/Putra.png"
            alt="Siswa MTs Darussalam"
            data-aos="fade-up"
            data-aos-once="true"
          />
        </div>
      </div>

      <div className="text-white -mt-14 sm:-mt-24 lg:-mt-36 z-40 relative">
        <svg
          className="xl:h-40 xl:w-full"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
            fill="currentColor"
          ></path>
        </svg>
        <div className="bg-white w-full h-20 -mt-px"></div>
      </div>
    </div>
  );
}
