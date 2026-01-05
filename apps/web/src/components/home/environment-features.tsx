"use client";

import { motion } from "framer-motion";
import { Grid2x2, Layers, Users } from "lucide-react";
import { useEffect, useState } from "react";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

export default function EnvironmentFeatures() {
  const [data, setData] = useState<{
    title?: string;
    description?: string;
    image?: string;
    features?: Feature[];
    isActive?: boolean;
  }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/environment-features")
      .then((res) => res.json())
      .then((result) => {
        console.log("Environment features result:", result);
        if (result.success && result.data) {
          const item = result.data;

          // Handle features - parse JSON if needed
          let features = [];
          if (item.features) {
            if (typeof item.features === 'object' && Array.isArray(item.features)) {
              features = item.features;
            } else if (typeof item.features === 'string') {
              try {
                const parsed = JSON.parse(item.features);
                if (Array.isArray(parsed)) {
                  features = parsed;
                }
              } catch (e) {
                console.warn("Error parsing features:", e);
              }
            }
          }

          setData({
            ...item,
            features: features,
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching environment features:", err);
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

  const features = data.features || [];
  const image = data.image || "/vcall.png";

  console.log("Environment features data:", data);
  console.log("Environment features image:", image);

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, any> = {
      Grid2x2,
      Layers,
      Users,
    };
    const IconComponent = icons[iconName] || Grid2x2;
    return <IconComponent size={16} />;
  };

  return (
    <div className="md:flex mt-40 md:space-x-10 items-start">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="md:w-7/12 relative"
      >
        <div
          style={{ background: "#33EFA0" }}
          className="w-32 h-32 rounded-full absolute z-0 left-4 -top-12 animate-pulse"
        ></div>
        <div
          style={{ background: "#33D9EF" }}
          className="w-5 h-5 rounded-full absolute z-0 left-36 -top-12 animate-ping"
        ></div>
        <img
          className="relative z-50 w-full max-w-lg mx-auto h-auto object-contain"
          src={image}
          alt="Lingkungan Belajar"
          style={{ maxWidth: "500px" }}
          onError={(e) => {
            console.error("Error loading image:", image);
            e.currentTarget.src = "/vcall.png";
          }}
        />
        <div
          style={{ background: "#5B61EB" }}
          className="w-36 h-36 rounded-full absolute z-0 right-16 -bottom-1 animate-pulse"
        ></div>
        <div
          style={{ background: "#F56666" }}
          className="w-5 h-5 rounded-full absolute z-0 right-52 bottom-1 animate-ping"
        ></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="md:w-5/12 mt-20 md:mt-0 text-gray-500"
      >
        <h1 className="text-2xl font-semibold text-darken lg:pr-40">
          {data.title || "lingkungan <span className='text-yellow-500'>Belajar</span> Nyaman & Interaktif"}
        </h1>

        {data.description && (
          <p className="text-gray-500 mb-4">
            {data.description}
          </p>
        )}

        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-5 my-5">
            <div className="flex-shrink bg-white shadow-lg rounded-full p-3 flex items-center justify-center">
              {getIconComponent(feature.icon)}
            </div>
            <p>
              {feature.title && <span className="font-semibold text-gray-900">{feature.title}: </span>}
              {feature.description}
            </p>
          </div>
        ))}

        {features.length === 0 && (
          <>
            <div className="flex items-center space-x-5 my-5">
              <div className="flex-shrink bg-white shadow-lg rounded-full p-3 flex items-center justify-center">
                <Grid2x2 size={16} />
              </div>
              <p>Guru-guru berpengalaman siap membimbing siswa secara langsung di kelas</p>
            </div>

            <div className="flex items-center space-x-5 my-5">
              <div className="flex-shrink bg-white shadow-lg rounded-full p-3 flex items-center justify-center">
                <Layers size={16} />
              </div>
              <p>Metode pengajaran interaktif untuk meningkatkan pemahaman siswa</p>
            </div>

            <div className="flex items-center space-x-5 my-5">
              <div className="flex-shrink bg-white shadow-lg rounded-full p-3 flex items-center justify-center">
                <Users size={16} />
              </div>
              <p>Setiap siswa diperhatikan perkembangan akademik dan akhlaknya</p>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}