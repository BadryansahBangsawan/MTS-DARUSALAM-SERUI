"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { extractYouTubeId } from "@/lib/upload-utils";
import dummyData from "@/lib/dummy-data.json";

export default function VideoSection() {
  const [data, setData] = useState<{ youtubeVideoUrl?: string }>((dummyData.schoolInformation || {}) as any);
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

  const youtubeUrl = data.youtubeVideoUrl || "";

  if (!youtubeUrl) {
    return null;
  }

  const videoId = extractYouTubeId(youtubeUrl);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : youtubeUrl;

  return (
    <div className="mt-20 mb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
          <iframe
            src={embedUrl}
            title="Video Profil Sekolah"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </motion.div>
    </div>
  );
}
