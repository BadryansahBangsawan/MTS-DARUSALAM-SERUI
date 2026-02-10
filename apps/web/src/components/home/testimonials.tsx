"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star, Image as ImageIcon, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import dummyData from "@/lib/dummy-data.json";

interface Testimonial {
  id: number;
  authorName: string;
  role?: string;
  content: string;
  rating: number;
  imageUrl?: string;
  isApproved: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export default function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>(((dummyData.testimonials as Testimonial[]) || []));
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/testimonials/public");
      const data = await response.json();
      if (data.success) {
        setItems(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
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

  if (loading) {
    return (
      <div id="testimonials" className="scroll-mt-28">
        {/* Section 1: Header dengan Loading */}
        <section className="bg-gray-50 pb-16 pt-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-darken mb-3">
                Testimoni <span className="text-green-500">Alumni</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
                Apa kata alumni MTs Darussalam?
              </p>
            </div>

            <div className="w-full">
              <div className="w-full h-80 md:h-96 bg-gray-200 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Section 2: Carousel Loading */}
        <section className="bg-white pb-20">
          <div className="container mx-auto px-4">
          <div className="relative -mt-40 md:-mt-48 z-10">
              <div className="flex items-center justify-center min-h-[400px] max-w-4xl mx-auto">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div id="testimonials" className="scroll-mt-28">
      {/* Section 1: Header dengan Background Image di Tengah */}
      <section className="bg-gray-50 pb-16 pt-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-darken mb-3">
              Testimoni <span className="text-green-500">Alumni</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
              Apa kata alumni MTs Darussalam?
            </p>
          </motion.div>

          {/* Background Image Figure di Tengah - Full Width */}
          <div className="w-full">
            <img
              src="/Guru.png"
              alt="Background"
              className="w-full h-80 md:h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 2: Carousel dengan Negative Margin dan White Background */}
      <section className="bg-white pb-20">
        <div className="container mx-auto px-4">
          <div className="relative -mt-40 md:-mt-48 z-10">
            {items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
              >
                <div className="relative">
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
                      className="bg-white shadow-2xl rounded-2xl p-8 md:p-12"
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={1}
                      onDragEnd={(e, { offset, velocity }) => {
                        const swipe = offset.x * velocity.x;
                        if (swipe < -5000) {
                          goToNext();
                        } else if (swipe > 5000) {
                          goToPrevious();
                        }
                      }}
                    >
                      <div className="flex justify-center mb-6">
                        <Quote className="w-12 h-12 text-green-500" />
                      </div>

                      <p className="text-gray-700 text-lg md:text-xl text-center leading-relaxed mb-8">
                        "{items[currentIndex].content}"
                      </p>

                      <div className="flex justify-center mb-6">
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-6 h-6 ${
                                star <= items[currentIndex].rating
                                  ? "fill-green-500 text-green-500"
                                  : "fill-gray-200 text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-center space-x-4">
                        {items[currentIndex].imageUrl ? (
                          <img
                            src={items[currentIndex].imageUrl}
                            alt={items[currentIndex].authorName}
                            className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center border-2 border-green-500">
                            <ImageIcon className="w-8 h-8 text-white" />
                          </div>
                        )}
                        <div className="text-left">
                          <h4 className="font-bold text-lg text-darken">
                            {items[currentIndex].authorName}
                          </h4>
                          {items[currentIndex].role && (
                            <p className="text-sm text-gray-500">
                              {items[currentIndex].role}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {items.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300"
                        aria-label="Previous testimonial"
                      >
                        <ChevronLeft className="w-6 h-6 text-gray-800" />
                      </button>

                      <button
                        type="button"
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300"
                        aria-label="Next testimonial"
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
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex justify-center mt-8"
                >
                  <Link
                    href={"/testimonials/submit" as any}
                    className="inline-flex items-center px-6 py-3 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg"
                  >
                    Kirim Testimoni
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </motion.div>
              </motion.div>
            )}

            {items.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center py-20 max-w-4xl mx-auto"
              >
                <p className="text-gray-500 mb-6">Belum ada testimoni.</p>
                <Link
                  href={"/testimonials/submit" as any}
                  className="inline-flex items-center px-6 py-3 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-colors"
                >
                  Jadilah yang pertama mengirim testimoni
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
