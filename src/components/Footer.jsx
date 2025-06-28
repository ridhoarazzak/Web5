// src/components/Footer.jsx
"use client"; // This component needs to be a Client Component because it uses Framer Motion.

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    // Animate the footer to slide up and fade in
    <motion.footer
      initial={{ y: 50, opacity: 0 }} // Initial state: off-screen bottom, invisible
      animate={{ y: 0, opacity: 1 }}   // Animate to: on-screen, visible
      transition={{ duration: 0.5, delay: 0.8 }} // Animation duration and delay
      className="bg-gray-900 text-white py-8 mt-16 shadow-inner" // Subtle inner shadow
    >
      <div className="container mx-auto text-center">
        <p className="text-lg font-semibold">&copy; {new Date().getFullYear()} Green Coffee. Semua Hak Dilindungi.</p>
        <p className="mt-4 text-sm text-gray-400">Temukan tempat peristirahatan bintang lima Anda.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
            Kebijakan Privasi
          </a>
          <a href="#" className="text-gray-400 hover:text-green-500 transition-colors">
            Syarat & Ketentuan
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
