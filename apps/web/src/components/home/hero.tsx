"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import dummyData from "@/lib/dummy-data.json";

export default function Hero() {
  const [data, setData] = useState<{ name?: string; description?: string; whatsappRegistration?: string; heroImage?: string }>((dummyData.schoolInformation || {}) as any);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const schoolName = data.name || "";
  const description = data.description || "";
  const whatsappNumber = data.whatsappRegistration || "";
  const heroImageUrl = data.heroImage || "";

  if (!schoolName) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Data tidak tersedia</p>
      </div>
    );
  }

  return (
    <div id="home" className="bg-cream scroll-mt-28">
      <div className="max-w-screen-xl px-8 mx-auto flex flex-col lg:flex-row items-center lg:items-start">
        <div className="flex flex-col w-full lg:w-6/12 justify-center lg:pt-24 items-center lg:items-start text-center lg:text-left mb-5 md:mb-0">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="my-4 text-4xl sm:text-5xl font-bold leading-tight text-darken text-center lg:text-left"
            data-aos="fade-right"
            data-aos-once="true"
          >
            {schoolName}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="leading-normal text-lg sm:text-xl md:text-2xl mb-8 text-center lg:text-left"
            data-aos="fade-down"
            data-aos-once="true"
            data-aos-delay="300"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="w-full flex flex-col md:flex-row items-center justify-center lg:justify-start gap-4 md:gap-5"
            data-aos="fade-up"
            data-aos-once="true"
            data-aos-delay="700"
          >
            <a
              href={`https://wa.me/${whatsappNumber}?text=Halo%20saya%20ingin%20daftar%20${encodeURIComponent(schoolName)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-500 text-white text-base sm:text-lg lg:text-xl font-bold rounded-full py-3 sm:py-4 px-6 sm:px-8 lg:px-9 focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out inline-block"
              style={{ backgroundColor: "#22C55E" }}
            >
              Daftar Sekarang
            </a>

            <a
              href="https://youtu.be/84rxYQ-JbS4?si=kvK8UpK3ScPdKfQB"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 cursor-pointer transform transition hover:scale-105 duration-300 ease-in-out"
            >
              <button className="bg-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-sm">
                <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5 sm:ml-2 fill-[#23BDEE] text-[#23BDEE]" />
              </button>
              <span className="text-sm sm:text-base text-gray-700 hover:text-gray-900">
                Lihat cara belajarnya
              </span>
            </a>
          </motion.div>
        </div>

        <div className="w-full lg:w-6/12 lg:-mt-16 relative" id="girl">
          <motion.img
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-10/12 mx-auto 2xl:-mb-0"
            src={heroImageUrl}
            alt="Siswa MTs Darussalam"
            data-aos="fade-up"
            data-aos-once="true"
          />
        </div>
      </div>

      <div className="text-white -mt-14 sm:-mt-24 lg:-mt-36 z-40 relative">
        <svg
          className="w-full h-32 sm:h-40 lg:h-40"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="xMidYMax slice"
        >
          <path
            d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
            fill="white"
          ></path>
        </svg>
      </div>
    </div>
  );
}
