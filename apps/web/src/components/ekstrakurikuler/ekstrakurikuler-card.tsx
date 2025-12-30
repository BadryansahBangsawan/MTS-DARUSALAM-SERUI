"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { Star } from "lucide-react";
import type { Ekstrakurikuler } from "@/data/ekstrakurikuler";

interface EkstrakurikulerCardProps extends Ekstrakurikuler {}

const colorClasses = {
  green: "border-green-500 bg-green-500",
  red: "border-red-500 bg-red-500",
  yellow: "border-yellow-500 bg-yellow-500",
  blue: "border-blue-500 bg-blue-500",
  purple: "border-purple-500 bg-purple-500",
};

const iconColorClasses = {
  green: "text-green-500",
  red: "text-red-500",
  yellow: "text-yellow-500",
  blue: "text-blue-500",
  purple: "text-purple-500",
};

export default function EkstrakurikulerCard({
  name,
  subtitle,
  icon,
  color,
  description,
  features,
  schedule,
  rating,
  whatsapp,
}: EkstrakurikulerCardProps) {
  const IconComponent = (LucideIcons as any)[icon] || LucideIcons.Star;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-4 sm:p-6 md:p-8 flex flex-col justify-between border-t-4 ${
        colorClasses[color as keyof typeof colorClasses]
      }`}
    >
      <div className="flex flex-col items-center ">
        <div
          className={`text-5xl mb-4 ${
            iconColorClasses[color as keyof typeof iconColorClasses]
          }`}
        >
          <IconComponent size={40} />
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1">
          {name}
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-4">
          {subtitle}
        </p>
      </div>

      <div className="mb-2 sm:mb-4 text-gray-600 text-xs sm:text-sm">
        {description}
      </div>

      <ul className="mb-2 sm:mb-4 space-y-1 sm:space-y-2">
        {features.map((feature, index) => {
          const FeatureIcon =
            (LucideIcons as any)[feature.icon] || LucideIcons.Check;
          return (
            <li
              key={index}
              className={`flex items-center ${
                iconColorClasses[color as keyof typeof iconColorClasses]
              }`}
            >
              <FeatureIcon size={16} className="mr-2 flex-shrink-0" />
              <span className="text-sm">{feature.text}</span>
            </li>
          );
        })}
      </ul>

      <div className="mb-2 sm:mb-4">
        <div className="font-semibold text-darken mb-1 flex items-center text-xs sm:text-sm md:text-base">
          <span className="mr-2">
            {schedule.length > 1 ? (
              <LucideIcons.CalendarClock size={16} />
            ) : (
              <LucideIcons.Clock size={16} />
            )}
          </span>
          Jadwal Kegiatan
        </div>
        {schedule.map((sched, index) => (
          <div
            key={index}
            className="flex justify-between text-xs sm:text-sm text-gray-500"
          >
            <span>{sched.day}</span>
            <span>{sched.time}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-2 sm:mt-4 flex-col sm:flex-row gap-2 sm:gap-0">
        <Link
          href={`https://wa.me/${whatsapp}?text=Halo%20saya%20ingin%20daftar%20ekstrakurikuler%20${encodeURIComponent(
            name
          )}%20di%20MTS%20Darrusalam`}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full sm:w-auto text-center px-4 py-2 sm:px-5 sm:py-2 rounded-full ${
            colorClasses[color as keyof typeof colorClasses]
          } text-white text-sm sm:text-base font-semibold shadow hover:scale-105 transition`}
        >
          Bergabung
        </Link>
        <div className="flex items-center text-yellow-400 font-bold text-xs sm:text-base">
          <span className="mr-1 flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < Math.floor(rating) ? "currentColor" : "none"}
              />
            ))}
          </span>
          <span className="text-gray-500 font-normal ml-1">{rating}/5</span>
        </div>
      </div>
    </motion.div>
  );
}
