// src/components/AnimatedHero.jsx
"use client"; // This component needs to be a Client Component because it uses Framer Motion.

import { motion } from 'framer-motion';

export default function AnimatedHero() {
  // Variants for the main container animation (staggering children)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Delay between child animations
        delayChildren: 0.5, // Delay before child animations start
      },
    },
  };

  // Variants for individual text/button items animation
  const itemVariants = {
    hidden: { y: 20, opacity: 0 }, // Initial state: slightly below, invisible
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }, // Animate to: final position, visible
  };

  return (
    // Main section with background gradient (green/brown theme) and overflow hidden for animations
    <motion.section
      className="relative bg-gradient-to-r from-green-800 to-emerald-900 text-white py-24 md:py-40 overflow-hidden" // Updated gradient
      variants={containerVariants} // Apply container animation variants
      initial="hidden" // Start from hidden state
      animate="visible" // Animate to visible state
    >
      <div className="container mx-auto px-4 text-center z-10 relative">
        {/* Animated main heading */}
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg" // Larger text
          variants={itemVariants} // Apply item animation variants
        >
          Green Coffee: Pengalaman Menginap Bintang Lima Anda
        </motion.h1>
        {/* Animated subheading/description */}
        <motion.p
          className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90 font-light" // Larger text, lighter font
          variants={itemVariants} // Apply item animation variants
        >
          Selami ketenangan dan kemewahan sejati di setiap sudut Green Coffee. Setiap kamar dirancang untuk kenyamanan maksimal Anda.
        </motion.p>
        {/* Animated button with hover and tap effects */}
        <motion.button
          className="bg-amber-400 text-green-900 hover:bg-amber-300 px-10 py-4 rounded-full font-bold text-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1" // Updated button style
          variants={itemVariants} // Apply item animation variants
          whileHover={{ scale: 1.05 }} // Scale up on hover
          whileTap={{ scale: 0.95 }}   // Scale down on tap
        >
          Jelajahi Suite Kami
        </motion.button>
      </div>
      {/* Background effects (subtle pulsing circles) for visual interest */}
      <div className="absolute inset-0 z-0 opacity-10"> {/* Reduced opacity */}
        <div className="absolute w-96 h-96 bg-green-400 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
        <div className="absolute w-1/2 h-1/2 bg-emerald-500 rounded-full blur-3xl -bottom-30 -right-30 animate-pulse delay-700"></div>
      </div>
    </motion.section>
  );
}
