"use client";

import { motion } from "framer-motion";
import OrganizationChart from "@/components/susunan-organisasi/organization-chart";

export default function SusunanOrganisasiPage() {
  return (
    <div className="bg-cream flex-1 flex flex-col">
      <div className="container px-4 lg:px-8 mx-auto max-w-screen-xl text-gray-700 overflow-x-hidden py-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center my-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-darken">
            Struktur Organisasi <span className="text-green-400">MTs Darussalam Serui</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Berikut adalah susunan organisasi MTs Darussalam Serui sesuai struktur
            resmi.
          </p>
        </motion.div>

        <OrganizationChart />
      </div>
    </div>
  );
}