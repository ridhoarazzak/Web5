// src/components/Header.jsx
"use client"; // This component needs to be a Client Component because it uses Framer Motion.

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Header() {
  return (
    // Animate the header to slide down and fade in
    <motion.header
      initial={{ y: -100, opacity: 0 }} // Initial state: off-screen top, invisible
      animate={{ y: 0, opacity: 1 }}    // Animate to: on-screen, visible
      transition={{ duration: 0.5, delay: 0.2 }} // Animation duration and delay
      className="bg-white shadow-lg z-10 relative border-b border-green-100" // Add z-index and subtle border
    >
      <nav className="container mx-auto px-4 py-5 flex justify-between items-center">
        {/* Logo/Site Title with a hover animation */}
        <Link href="/" className="text-3xl font-extrabold text-green-800 hover:text-green-700 transition-colors">
          Green Coffee
        </Link>
        {/* Navigation links */}
        <ul className="flex space-x-8">
          <li>
            <Link href="/" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              Beranda
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              Tentang Kami
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              Kontak
            </Link>
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}
