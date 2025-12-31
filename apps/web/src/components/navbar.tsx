"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks: Array<{ href: string; label: string; section?: string; variant?: string }> = [
    { href: "/", label: "Beranda", section: "home" },
    { href: "/susunan-organisasi", label: "Susunan Organisasi" },
    { href: "/", label: "Mata Pelajaran", section: "mata-pelajaran" },
    { href: "/ekstrakurikuler", label: "Ekstrakurikuler" },
    { href: "/admin", label: "Admin", variant: "primary" },
  ];

  return (
    <div className="w-full text-gray-700 bg-cream relative z-50">
      <div className="flex flex-col max-w-screen-xl px-8 mx-auto md:items-center md:justify-between md:flex-row">
        <div className="flex flex-row items-center justify-between py-6">
          <Link href="/" className="relative flex items-center">
            <img
              src="/logo-mts.png"
              alt="Logo MTS Darrusalam"
              className="h-16 z-40"
            />
            <span className="ml-4 text-lg relative z-50 font-bold tracking-widest text-gray-900 rounded-lg">
              MTs Darussalam
            </span>
          </Link>
          <button
            className="rounded-lg md:hidden focus:outline-none focus:shadow-outline"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav
          className={`${
            isOpen ? "h-full scale-y-100" : "h-0 scale-y-0"
          } md:h-auto md:scale-y-100 flex flex-col flex-grow md:items-center pb-4 md:pb-0 md:flex md:justify-end md:flex-row origin-top duration-300`}
        >
          {navLinks.map((link, index) => (
            <Link
              key={`${link.href}-${link.section || index}`}
              href={
                link.section
                  ? (`${link.href}#${link.section}` as any)
                  : link.href
              }
              onClick={() => setIsOpen(false)}
              className={`px-4 py-2 mt-2 text-sm rounded-lg md:ml-4 focus:outline-none focus:shadow-outline ${
                link.variant === 'primary'
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-transparent hover:text-gray-900'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
