import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-32 w-full" style={{ backgroundColor: "rgba(37, 38, 65, 1)" }}>
      <div className="max-w-screen-xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-white items-start">
        <div className="flex flex-col items-start">
          <img src="/logo-mts.png" alt="Logo MTS Darrusalam" className="w-16 h-16 mb-4" />
          <p className="text-gray-300 text-sm mb-2">©2025 MTs Darussalam.<br />All rights reserved.</p>
          <div className="flex space-x-3 mt-2">
            <a href="#" aria-label="Facebook" className="hover:text-blue-400">
              <Facebook size={24} />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-400">
              <Instagram size={24} />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-red-500">
              <Youtube size={24} />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start">
          <h3 className="font-bold text-lg mb-4 text-white">Hubungi Kami</h3>
          <p className="text-gray-300 mb-2 leading-relaxed">
            Jln. Dr. Samratulangi<br />
            Kabupaten Kepulauan Yapen, Yapen Selatan, Serui
          </p>
          <p className="text-gray-300 mb-2">info@mtsdarussalam.sch.id</p>
          <p className="text-gray-300 mb-2">+62 13-8217-5517</p>
          <p className="text-gray-300">
            Senin - Jumat: 07:00 - 14:00 WIT<br />
            Sabtu: 07:00 - 12:00 WIT
          </p>
        </div>

        <div className="flex flex-col items-start">
          <h3 className="font-bold text-lg mb-4 text-white">Useful Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/susunan-organisasi" className="hover:underline text-gray-300">
                Susunan Organisasi
              </Link>
            </li>
            <li>
              <Link href="/ekstrakurikuler" className="hover:underline text-gray-300">
                Ekstrakurikuler
              </Link>
            </li>
            <li>
              <Link href="/#mata-pelajaran" className="hover:underline text-gray-300">
                Mata Pelajaran
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}