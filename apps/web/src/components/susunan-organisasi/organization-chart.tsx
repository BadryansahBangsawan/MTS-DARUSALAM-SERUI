"use client";

import { motion } from "framer-motion";

interface OrganizationNode {
  title: string;
  subtitle?: string;
  color?: string;
  gridCols?: string;
  border?: string;
}

const nodes: OrganizationNode[] = [
  { title: "KEMENAG", border: "border-green-400" },
  {
    title: "KOMITE MADRASAH",
    subtitle: "Achmad Nur Bennu",
    border: "border-green-400",
  },
  { title: "DINAS DIKPORA", border: "border-green-400" },
];

const ketuaYayasan: OrganizationNode = {
  title: "KETUA YAYASAN",
  subtitle: "H. Najamuddin Yusuf",
  color: "bg-gradient-to-r from-green-600 to-green-400 text-white",
};

const kepalaMadrasah: OrganizationNode = {
  title: "KEPALA MADRASAH",
  subtitle: "Drs. H. Muchtar",
};

const branches: OrganizationNode[] = [
  {
    title: "KEPALA TATA USAHA",
    subtitle: "Hanifah, S.Pd",
    border: "border-green-300",
  },
  {
    title: "BENDAHARA",
    subtitle: "Drs. Sunardja, M.Pd",
    border: "border-green-300",
  },
  { title: "STAF TATA USAHA", border: "border-green-300" },
  {
    title: "WAKAMAD HUMAS",
    subtitle: "Marsyanti, S.Hum",
    border: "border-green-300",
  },
  {
    title: "WAKAMAD KESISWAAN",
    subtitle: "Manfud Fauzi, S.Pd.I",
    border: "border-green-300",
  },
  {
    title: "WAKAMAD SARPRAS",
    subtitle: "Arum Pawening, S.Pd",
    border: "border-green-300",
  },
  {
    title: "PENGELOLA PERPUSTAKAAN",
    subtitle: "Reni Iriani, S.Pd.I",
    border: "border-green-300",
  },
  {
    title: "GURU BP / BK",
    subtitle: "Irwan, S.Pd",
    border: "border-green-300",
  },
];

const labManagers: OrganizationNode[] = [
  {
    title: "PENGELOLA LAB. IPA",
    subtitle: "Kurniawan Ramadan, S.Pd",
    border: "border-green-300",
  },
  {
    title: "PENGELOLA LAB. KOMP",
    subtitle: "Fatmawati Ruyatomi, S.Hum",
    border: "border-green-300",
  },
];

const waliKelas: OrganizationNode[] = [
  {
    title: "WALI KELAS VII A",
    subtitle: "Marhani, S.Pd",
    border: "border-green-300",
  },
  {
    title: "WALI KELAS VII B",
    subtitle: "Benediktus Nupab",
    border: "border-green-300",
  },
  {
    title: "WALI KELAS VIII A",
    subtitle: "Marhani, S.Pd.I",
    border: "border-green-300",
  },
  {
    title: "WALI KELAS VIII B",
    subtitle: "Benediktus Nupab",
    border: "border-green-300",
  },
  {
    title: "WALI KELAS IX A",
    subtitle: "Arisnawaty, S.Pd",
    border: "border-green-300",
  },
  {
    title: "WALI KELAS IX B",
    subtitle: "Irwan, S.Pd",
    border: "border-green-300",
  },
];

export default function OrganizationChart() {
  const Node = ({
    node,
    delay = 0,
  }: {
    node: OrganizationNode;
    delay?: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`bg-white rounded-lg px-8 py-4 font-bold text-center shadow-sm flex flex-col items-center justify-center ${
        node.border || "border-2 border-green-500"
      } ${node.color || ""}`}
    >
      <span className="block text-lg text-darken">{node.title}</span>
      {node.subtitle && (
        <span className="block font-medium text-gray-600 mt-1">
          {node.subtitle}
        </span>
      )}
    </motion.div>
  );

  return (
    <div className="relative w-full min-h-full">
      {/* ISI TETAP */}
      <div className="flex flex-col items-center space-y-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center mb-2 w-full max-w-4xl">
          {nodes.map((node, index) => (
            <Node key={index} node={node} delay={index * 0.1} />
          ))}
        </div>

        <div className="w-px h-8 bg-green-400 mx-auto"></div>

        <div className="flex justify-center">
          <Node node={ketuaYayasan} delay={0.3} />
        </div>

        <div className="flex flex-col items-center">
          <Node node={kepalaMadrasah} delay={0.4} />
        </div>

        <div
          className="relative flex justify-center w-full"
          style={{ height: "40px" }}
        >
          <svg
            viewBox="0 0 700 40"
            width="100%"
            height="40"
            className="absolute left-0 right-0 mx-auto max-w-4xl"
          >
            <line
              x1="350"
              y1="0"
              x2="350"
              y2="20"
              stroke="#22c55e"
              strokeWidth="2"
            />
            <line
              x1="50"
              y1="20"
              x2="650"
              y2="20"
              stroke="#22c55e"
              strokeWidth="2"
            />
            {[50, 150, 250, 350, 450, 550, 650].map((x) => (
              <line
                key={x}
                x1={x}
                y1="20"
                x2={x}
                y2="40"
                stroke="#22c55e"
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>

        <div className="flex flex-wrap justify-center gap-4 w-full max-w-6xl">
          {branches.map((branch, index) => (
            <Node key={index} node={branch} delay={0.5 + index * 0.05} />
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 w-full max-w-4xl">
          {labManagers.map((manager, index) => (
            <Node key={index} node={manager} delay={0.9 + index * 0.05} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="bg-[#FFF7E6] border bg-white border-green-400 rounded-xl px-8 py-2 font-bold text-lg mb-1"
        >
          DEWAN GURU
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 w-full max-w-4xl">
          {waliKelas.map((kelas, index) => (
            <Node key={index} node={kelas} delay={1.1 + index * 0.05} />
          ))}
        </div>
      </div>
    </div>
  );
}
