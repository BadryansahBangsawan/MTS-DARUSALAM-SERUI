"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function VideoSection() {
  const [youtubeUrl, setYoutubeUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/school-information")
      .then((res) => res.json())
      .then((result) => {
        if (result.success && result.data?.youtubeVideoUrl) {
          setYoutubeUrl(result.data.youtubeVideoUrl);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching school info:", err);
        setLoading(false);
      });
  }, []);

  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const embedUrl = getYouTubeEmbedUrl(youtubeUrl);

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
        {embedUrl ? (
          <div className="rounded-xl z-40 overflow-hidden" style={{ width: "100%", maxWidth: "1400px", aspectRatio: "16/9" }}>
            <iframe
              src={embedUrl}
              title="MTs Darussalam Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}