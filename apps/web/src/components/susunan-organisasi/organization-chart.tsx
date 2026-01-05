"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface OrganizationNode {
  title: string;
  subtitle?: string;
  color?: string;
  border?: string;
}

interface OrganizationPosition {
  id: number;
  title: string;
  personName?: string;
  roleCategory:
    | "supervisory"
    | "leadership"
    | "staff"
    | "teaching"
    | "lab_manager";
  sortOrder: number;
  colorTheme?: string;
  backgroundStyle?: string;
}

export default function OrganizationChart() {
  const [positions, setPositions] = useState<OrganizationPosition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchPositions = async () => {
    try {
      const response = await fetch("/api/organization-positions");
      const data = await response.json();
      if (data.success) {
        setPositions(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching organization positions:", error);
    } finally {
      setLoading(false);
    }
  };

  const getNodes = (category: string): OrganizationNode[] => {
    return positions
      .filter((p) => p.roleCategory === category)
      .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
      .map((p) => ({
        title: p.title,
        subtitle: p.personName || undefined,
        border: p.colorTheme || "border-green-300",
        color: p.backgroundStyle || "",
      }));
  };

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-green-500" />
      </div>
    );
  }

  const nodes = getNodes("supervisory");
  const branches = getNodes("staff");
  const labManagers = getNodes("lab_manager");
  const waliKelas = getNodes("teaching");

  const ketuaYayasan = positions.find((p) => p.title === "KETUA YAYASAN");

  const ketuaYayasanNode: OrganizationNode = {
    title: ketuaYayasan?.title || "KETUA YAYASAN",
    subtitle: ketuaYayasan?.personName || undefined,
    color:
      ketuaYayasan?.backgroundStyle ||
      "bg-gradient-to-r from-green-600 to-green-400 text-white",
    border: ketuaYayasan?.colorTheme,
  };

  if (positions.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        Belum ada struktur organisasi.
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-full bg-cream">
      <div className="flex flex-col items-center space-y-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center mb-2 w-full max-w-4xl">
          {nodes.map((node, index) => (
            <Node key={index} node={node} delay={index * 0.1} />
          ))}
        </div>

        <div className="w-px h-8 bg-green-400 mx-auto"></div>

        <div className="flex justify-center">
          <Node node={ketuaYayasanNode} delay={0.3} />
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
