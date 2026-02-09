"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogNews {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  featuredImage?: string;
  category: "berita" | "pengumuman" | "artikel" | "kegiatan";
  views?: number;
  createdAt: string;
}

export default function BlogNewsPreview() {
  const [items, setItems] = useState<BlogNews[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/blog-news?is_published=true");
      const data = await response.json();
      if (data.success) {
        setItems((data.data || []).slice(0, 3));
      }
    } catch (error) {
      console.error("Error fetching blog news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (items.length <= 1) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [items.length]);

  useEffect(() => {
    const updateHeight = () => {
      const container = document.querySelector('.blog-news-container');
      if (items[currentIndex]?.featuredImage && container) {
        const img = new Image();
        img.src = items[currentIndex].featuredImage;
        img.onload = () => {
          const aspectRatio = img.width / img.height;
          const containerWidth = container.clientWidth;
          const newHeight = containerWidth / aspectRatio;
          container.setAttribute('style', `height: ${newHeight}px`);
        };
        img.onerror = () => {
          container.removeAttribute('style');
        };
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [currentIndex, items]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Sembunyikan seluruh section jika sedang loading atau tidak ada news
  if (loading || items.length === 0) {
    return null;
  }

  return (
    <div id="blog-news" className="mt-20 scroll-mt-28">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 md:mb-16"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-darken mb-3 md:mb-4">
          <span className="text-green-400">Blog & Berita</span> Terbaru
        </h1>
        <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto mb-8">
          Dapatkan informasi terbaru seputar berita, pengumuman, artikel, dan kegiatan di MTs Darussalam
        </p>
      </motion.div>

      <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-xl mx-auto px-4"
        >
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
             <div className="blog-news-container relative bg-gray-100">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute inset-0 cursor-pointer"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -10000) {
                      goToNext();
                    } else if (swipe > 10000) {
                      goToPrevious();
                    }
                  }}
                  onClick={() => window.location.href = `/blog-news/${items[currentIndex].slug}`}
                 >
                  {items[currentIndex].featuredImage ? (
                    <img
                      src={items[currentIndex].featuredImage}
                      alt={items[currentIndex].title}
                      className="absolute inset-0 w-full h-full object-contain bg-white scale-110"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                      <div className="text-center text-white p-8">
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">
                          {items[currentIndex].title}
                        </h3>
                        <p className="text-white/80">
                          {items[currentIndex].category.charAt(0).toUpperCase() + items[currentIndex].category.slice(1)}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <span className="inline-block px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-full mb-4">
                      {items[currentIndex].category.charAt(0).toUpperCase() + items[currentIndex].category.slice(1)}
                    </span>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 line-clamp-2">
                      {items[currentIndex].title}
                    </h2>

                    {items[currentIndex].excerpt && (
                      <p className="text-gray-200 mb-4 line-clamp-2 text-sm sm:text-base">
                        {items[currentIndex].excerpt}
                      </p>
                    )}

                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <span>
                        {new Date(items[currentIndex].createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                      {items[currentIndex].views !== undefined && (
                        <span>• {items[currentIndex].views} dilihat</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-800" />
                </button>

                <button
                  type="button"
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-6 h-6 text-gray-800" />
                </button>
              </>
            )}
          </div>

          {items.length > 1 && (
            <div className="flex justify-center gap-3 mt-6">
              {items.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-green-500 w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mt-10"
      >
        <Link
          href={"/blog-news" as any}
          className="px-8 py-3 bg-green-500 text-white font-medium rounded-full hover:bg-green-600 transition-colors inline-block"
        >
          Lihat Semua Berita
        </Link>
      </motion.div>
    </div>
  );
}

function swipePower(offset: number, velocity: number) {
  return Math.abs(offset) * velocity;
}
