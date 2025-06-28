// src/app/lodging/[id]/page.js
"use client"; // This component needs to be a Client Component because it uses Framer Motion.

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { lodgings } from '@/lib/data'; // Directly import dummy data for detail page for simplicity
import { motion } from 'framer-motion';

/**
 * Generates static paths for each lodging item.
 * This is used for Static Site Generation (SSG) in Next.js,
 * pre-rendering detail pages at build time.
 * @returns {Array<Object>} An array of objects, each with 'id' parameter.
 */
export async function generateStaticParams() {
  return lodgings.map((lodging) => ({
    id: lodging.id,
  }));
}

/**
 * LodgingDetailPage component.
 * Displays detailed information about a specific lodging based on its ID.
 * @param {Object} { params } - Contains dynamic route parameters (e.g., { id: '1' }).
 * @returns {JSX.Element} The detail page content.
 */
export default function LodgingDetailPage({ params }) {
  const { id } = params;
  // Find the lodging in the dummy data based on the ID from the URL
  const lodging = lodgings.find((item) => item.id === id);

  // If no lodging is found for the given ID, display a 404 page
  if (!lodging) {
    notFound();
  }

  // Variants for fade-in animation for individual elements
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Variants for container animation to stagger children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Delay between each child's animation
        delayChildren: 0.2,   // Delay before the first child's animation starts
      },
    },
  };

  return (
    <main className="container mx-auto px-4 py-12"> {/* Increased vertical padding */}
      {/* Main content wrapper with container animation */}
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-green-50" // Enhanced styling
        initial="hidden" // Start from hidden
        animate="visible" // Animate to visible
        variants={containerVariants} // Apply container variants
      >
        {/* Lodging image with fade-in animation */}
        <motion.div
          className="relative h-80 md:h-[600px] w-full mb-10 rounded-xl overflow-hidden shadow-lg" // Larger image area
          variants={fadeInVariants} // Apply fade-in animation
        >
          <Image
            src={lodging.imageUrl}
            alt={lodging.name}
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
            // Fallback image in case of load error
            onError={(e) => { e.target.src = 'https://placehold.co/1000x600/C8E6C9/4CAF50?text=Green+Coffee'; }} // Green-themed placeholder
          />
        </motion.div>

        {/* Lodging name with fade-in animation */}
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4" // Larger title
          variants={fadeInVariants} // Apply fade-in animation
        >
          {lodging.name}
        </motion.h1>
        {/* Price with fade-in animation */}
        <motion.p
          className="text-3xl text-green-700 font-bold mb-8" // Larger price, green color
          variants={fadeInVariants} // Apply fade-in animation
        >
          {lodging.pricePerNight} / malam
        </motion.p>

        {/* Grid for description and property details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12"> {/* Increased gap */}
          {/* Description section with fade-in animation */}
          <motion.div variants={fadeInVariants}>
            <h2 className="text-3xl font-bold text-gray-800 mb-5 border-b-2 border-green-200 pb-3">Deskripsi</h2> {/* Enhanced border */}
            <p className="text-gray-700 leading-relaxed text-lg">{lodging.description}</p>
          </motion.div>

          {/* Property details and amenities section with fade-in animation */}
          <motion.div variants={fadeInVariants}>
            <h2 className="text-3xl font-bold text-gray-800 mb-5 border-b-2 border-green-200 pb-3">Detail Suite</h2> {/* Enhanced border */}
            <ul className="text-gray-700 space-y-4 text-lg"> {/* Increased spacing */}
              <li><strong>Lokasi:</strong> {lodging.location}</li>
              <li><strong>Tamu Maksimal:</strong> {lodging.guests} orang</li>
              <li><strong>Kamar Tidur:</strong> {lodging.bedrooms}</li>
              <li><strong>Kamar Mandi:</strong> {lodging.bathrooms}</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-5 border-b-2 border-green-200 pb-3">Fasilitas Mewah</h2> {/* Enhanced border, title */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-gray-700 text-lg"> {/* Increased gap */}
              {/* Map through amenities and apply fade-in animation to each */}
              {lodging.amenities.map((amenity, index) => (
                <motion.li
                  key={index}
                  className="flex items-center"
                  variants={fadeInVariants} // Apply item animation
                >
                  {/* Checkmark icon (green color) */}
                  <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  {amenity}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Call to action button with fade-in and hover/tap animations */}
        <motion.div className="mt-14 text-center" variants={fadeInVariants}> {/* Increased margin */}
          <button className="bg-green-800 hover:bg-green-700 text-white font-bold py-5 px-12 rounded-full text-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            Pesan Suite Ini
          </button>
        </motion.div>
      </motion.div>
    </main>
  );
}
