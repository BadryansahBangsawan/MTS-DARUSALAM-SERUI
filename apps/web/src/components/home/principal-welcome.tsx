"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";

export default function PrincipalWelcome() {
  const studentCounter = useCounterAnimation(190, 1200);
  const applicantCounter = useCounterAnimation(63, 1200);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            studentCounter.startAnimation();
            applicantCounter.startAnimation();
          }
        });
      },
      { threshold: 0.5 }
    );

    const countersSection = document.getElementById("counters");
    if (countersSection) {
      observer.observe(countersSection);
    }

    return () => {
      if (countersSection) {
        observer.unobserve(countersSection);
      }
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-16 mt-20">
      <div className="flex flex-col items-center md:w-1/3">
        <motion.img
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto rounded-xl w-72 h-96 object-cover mb-6"
          src="/Muhktar.png"
          alt="Kepala Sekolah"
        />
        <div className="text-center mt-2">
          <h2 className="text-xl font-bold text-green-500">
            Drs. H. Muchtar
          </h2>
          <p className="text-gray-500 text-base">
            Kepala Sekolah MTs Darussalam
          </p>
        </div>
      </div>

      <div className="md:w-2/3 mt-10 md:mt-0 md:pl-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-base font-semibold mb-2 tracking-wide text-green-500"
        >
          SAMBUTAN KEPALA SEKOLAH
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-bold text-4xl text-darken mb-6 leading-tight"
        >
          Selamat Datang Untukmu Para Pejuang Bangsa
        </motion.h1>

        <p className="text-gray-500 mb-4 text-lg">
          Puji Syukur Alhamdulillah kita panjatkan ke hadirat Allah SWT, atas
          segala rahmat dan hidayah-Nya sehingga kita masih diberi kesempatan
          untuk bekerja dan berkarya di bidang pendidikan. Karena pendidikan
          merupakan upaya kita untuk menyiapkan generasi penerus bangsa, yang
          akan menggantikan estafet kepemimpinan kita di masa mendatang.
        </p>

        <p className="text-gray-500 mb-4 text-lg">
          Kami mengucapkan selamat datang di website resmi MTs Darussalam yang
          dapat digunakan sebagai salah satu media komunikasi, dan interaksi
          antara civitas akademika dan masyarakat pada umumnya.
        </p>

        <p className="text-gray-500 mb-10 text-lg">
          Mari kita bekerja dan berkarya dengan mengharap ridho-Nya dan
          keikhlasan yang tulus demi menyiapkan generasi bangsa yang
          berintegritas dan berprestasi.
        </p>

        <div id="counters" className="flex flex-col sm:flex-row gap-10">
          <div className="text-center">
            <span className="block text-4xl font-bold text-darken">
              {studentCounter.count}+
            </span>
            <span className="block text-gray-500 text-base font-semibold mt-1">
              Jumlah Siswa
            </span>
          </div>
          <div className="text-center">
            <span className="block text-4xl font-bold text-darken">
              {applicantCounter.count}+
            </span>
            <span className="block text-gray-500 text-base font-semibold mt-1">
              Rata-Rata Pendaftar/Tahun
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}