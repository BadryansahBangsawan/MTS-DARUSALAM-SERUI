"use client";

import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { useEffect, useState } from "react";

interface SchoolInfo {
  address?: string;
  email?: string;
  phone?: string;
  operatingHours?: any;
  socialMedia?: any;
}

export default function Footer() {
  const [data, setData] = useState<SchoolInfo>({});
  const [loading, setLoading] = useState(true);

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

  const address = data.address || "Jln. Dr. Samratulangi\nKabupaten Kepulauan Yapen, Yapen Selatan, Serui";
  const email = data.email || "info@mtsdarussalam.sch.id";
  const phone = data.phone || "+62 13-8217-5517";

  let operatingHoursWeekdays = "07:00 - 14:00 WIT";
  let operatingHoursSaturday = "07:00 - 12:00 WIT";

  if (data.operatingHours) {
    if (typeof data.operatingHours === 'object') {
      operatingHoursWeekdays = data.operatingHours.weekdays || operatingHoursWeekdays;
      operatingHoursSaturday = data.operatingHours.saturday || operatingHoursSaturday;
    } else if (typeof data.operatingHours === 'string') {
      try {
        const parsed = JSON.parse(data.operatingHours);
        if (parsed && typeof parsed === 'object') {
          operatingHoursWeekdays = parsed.weekdays || operatingHoursWeekdays;
          operatingHoursSaturday = parsed.saturday || operatingHoursSaturday;
        }
      } catch (e) {
      }
    }
  }

  let facebookUrl = "#";
  let instagramUrl = "#";
  let youtubeUrl = "#";

  const socialMediaRaw = (data as any).socialMedia ?? (data as any).social_media;
  if (socialMediaRaw) {
    if (typeof socialMediaRaw === 'object') {
      facebookUrl = socialMediaRaw.facebook || socialMediaRaw.facebookUrl || "#";
      instagramUrl = socialMediaRaw.instagram || socialMediaRaw.instagramUrl || "#";
      youtubeUrl = socialMediaRaw.youtube || socialMediaRaw.youtubeUrl || "#";
    } else if (typeof socialMediaRaw === 'string') {
      try {
        const parsed = JSON.parse(socialMediaRaw);
        if (parsed && typeof parsed === 'object') {
          facebookUrl = parsed.facebook || parsed.facebookUrl || "#";
          instagramUrl = parsed.instagram || parsed.instagramUrl || "#";
          youtubeUrl = parsed.youtube || parsed.youtubeUrl || "#";
        }
      } catch (e) {
      }
    }
  }

  if (loading) {
    return null;
  }

  return (
    <footer
      className=" w-full"
      style={{ backgroundColor: "rgba(37, 38, 65, 1)" }}
    >
      <div className="max-w-screen-xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-white items-start">
        <div className="flex flex-col items-start">
          <img
            src="/logo-mts.png"
            alt="Logo MTS Darrusalam"
            className="w-16 h-16 mb-4"
          />
          <p className="text-gray-300 text-sm mb-2">
            ©2025 MTs Darussalam.
            <br />
            All rights reserved.
          </p>
          <div className="flex space-x-3 mt-2">
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-400">
              <Facebook size={24} />
            </a>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-400">
              <Instagram size={24} />
            </a>
            <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-red-500">
              <Youtube size={24} />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start">
          <h3 className="font-bold text-lg mb-4 text-white">Hubungi Kami</h3>
          <p className="text-gray-300 mb-2 leading-relaxed whitespace-pre-line">
            {address}
          </p>
          <p className="text-gray-300 mb-2">{email}</p>
          <p className="text-gray-300 mb-2">{phone}</p>
          <p className="text-gray-300">
            Senin - Jumat: {operatingHoursWeekdays}
            <br />
            Sabtu: {operatingHoursSaturday}
          </p>
        </div>

        <div className="flex flex-col items-start">
          <h3 className="font-bold text-lg mb-4 text-white">Useful Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/susunan-organisasi"
                className="hover:underline text-gray-300"
              >
                Susunan Organisasi
              </Link>
            </li>
            <li>
              <Link
                href="/ekstrakurikuler"
                className="hover:underline text-gray-300"
              >
                Ekstrakurikuler
              </Link>
            </li>
            <li>
              <Link
                href="/#mata-pelajaran"
                className="hover:underline text-gray-300"
              >
                Mata Pelajaran
              </Link>
            </li>
            <li>
              <Link
                href="/admin"
                className="hover:underline text-gray-300"
              >
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
