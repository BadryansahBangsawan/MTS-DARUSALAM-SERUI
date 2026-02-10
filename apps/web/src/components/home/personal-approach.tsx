"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import dummyData from "@/lib/dummy-data.json";

interface Point {
  title: string;
  description: string;
  icon: string;
}

export default function PersonalApproach() {
  const [data, setData] = useState<{
    title?: string;
    description?: string;
    image?: string;
    points?: Point[];
    isActive?: boolean;
  }>((dummyData.personalApproach || {}) as any);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/personal-approach")
      .then((res) => res.json())
      .then((result) => {
        console.log("Personal approach result:", result);
        if (result.success && result.data) {
          const item = result.data;

          // Handle points - parse JSON if needed
          let points = [];
          if (item.points) {
            if (typeof item.points === 'object' && Array.isArray(item.points)) {
              points = item.points;
            } else if (typeof item.points === 'string') {
              try {
                const parsed = JSON.parse(item.points);
                if (Array.isArray(parsed)) {
                  points = parsed;
                }
              } catch (e) {
                console.warn("Error parsing points:", e);
              }
            }
          }

          setData({
            ...item,
            points: points,
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching personal approach:", err);
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

  const isActive = data.isActive !== false;

  if (!isActive) {
    return null;
  }

  const points = Array.isArray(data.points)
    ? data.points
    : typeof data.points === "string"
      ? (() => {
          try {
            const parsed = JSON.parse(data.points);
            return Array.isArray(parsed) ? parsed : [];
          } catch {
            return [];
          }
        })()
      : [];
  const image = data.image || "/Guru.png";

  console.log("Personal approach data:", data);
  console.log("Personal approach image:", image);

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
          {data.title || "<span className='text-green-400'>Pendekatan</span> Personal untuk Setiap Siswa"}
        </h1>
        {data.description && (
          <p className="my-5 lg:pr-14 text-gray-500">
            {data.description}
          </p>
        )}
        {points.length > 0 && (
          <div className="space-y-3">
            {points.map((point, index) => (
              <div key={index} className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">•</span>
                <p className="text-gray-500">
                  {point.title && <span className="font-semibold text-gray-900">{point.title}: </span>}
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        )}
        {points.length === 0 && (
          <p className="my-5 lg:pr-14 text-gray-500">
            Guru di MTs Darussalam memberikan perhatian khusus kepada setiap
            siswa melalui bimbingan pribadi. Hal ini dilakukan untuk membantu
            perkembangan akademik dan karakter siswa secara menyeluruh.
          </p>
        )}
      </motion.div>

      <motion.img
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="md:w-7/12 w-full object-contain"
        src={image}
        alt="Guru mengajar"
        onError={(e) => {
          console.error("Error loading image:", image);
          e.currentTarget.src = "/Guru.png";
        }}
      />
    </div>
  );
}