// src/components/LodgingCard.jsx
"use client"; // This component needs to be a Client Component because it uses Framer Motion.

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LodgingCard({ lodging }) {
  return (
    // Animate each lodging card to fade in and slide up when it enters the viewport
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Initial state: invisible, slightly below final position
      whileInView={{ opacity: 1, y: 0 }} // Animate to: visible, final position
      viewport={{ once: true, amount: 0.2 }} // Trigger animation once when 20% of the element is visible
      transition={{ duration: 0.6, ease: "easeOut" }} // Smooth animation duration
      className="bg-white rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-green-50" // Enhanced shadow and border
    >
      <Link href={`/lodging/${lodging.id}`}>
        <div className="relative h-56 w-full"> {/* Slightly taller image area */}
          {/* Next.js Image component for optimized images */}
          <Image
            src={lodging.imageUrl}
            alt={lodging.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-xl"
            // Optional: add onError for fallback image
            onError={(e) => { e.target.src = 'https://placehold.co/600x400/C8E6C9/4CAF50?text=Green+Coffee'; }} // Green-themed placeholder
          />
        </div>
        <div className="p-6"> {/* Increased padding */}
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{lodging.name}</h3> {/* Larger title */}
          <p className="text-gray-600 text-base mb-3 flex items-center"> {/* Larger text */}
            {/* Location icon */}
            <svg className="w-5 h-5 mr-1 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
            </svg>
            {lodging.location}
          </p>
          <p className="text-green-800 font-extrabold text-2xl">{lodging.pricePerNight} / malam</p> {/* Larger price, green color */}
        </div>
      </Link>
    </motion.div>
  );
}
