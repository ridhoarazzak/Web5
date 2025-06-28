// src/app/page.js
// This is the main home page of the Green Coffee application.
// It integrates the animated hero section and displays a list of luxury lodging cards.

import LodgingCard from '@/components/LodgingCard';
import AnimatedHero from '@/components/AnimatedHero';
import { motion } from 'framer-motion';

/**
 * Function to fetch lodging data from the API.
 * Uses `process.env.NEXT_PUBLIC_BASE_URL` for dynamic API endpoint.
 * `cache: 'no-store'` ensures data is always fresh, not cached by Next.js.
 * @returns {Promise<Array>} A promise that resolves to an array of lodging objects.
 * @throws {Error} If fetching fails or response is not OK.
 */
async function getLodgings() {
  try {
    // Construct the API URL using the public environment variable
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/lodgings`, {
      cache: 'no-store' // Opt-out of static caching to always fetch fresh data
    });

    // Check if the response was successful
    if (!res.ok) {
      // Attempt to parse error message from response body
      const errorData = await res.json();
      throw new Error(`Failed to fetch lodgings: ${res.status} ${res.statusText} - ${errorData.message || 'Unknown error'}`);
    }
    // Return the parsed JSON data
    return res.json();
  } catch (error) {
    // Log the error for server-side debugging
    console.error("Error fetching lodgings:", error);
    // Re-throw the error to be caught by the calling context (e.g., error boundary if implemented)
    throw error;
  }
}

/**
 * Home component which is an async Server Component.
 * It fetches lodging data and renders the page.
 */
export default async function Home() {
  let lodgings = [];
  let error = null;

  // Attempt to fetch lodgings data
  try {
    lodgings = await getLodgings();
  } catch (err) {
    // If an error occurs, set the error message for display
    error = "Gagal memuat daftar suite. Silakan coba lagi nanti.";
  }

  return (
    <>
      {/* Display the animated hero section */}
      <AnimatedHero />

      <main className="container mx-auto px-4 py-16"> {/* Increased padding */}
        {/* Section title with a scroll-triggered animation */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }} // Initial state: invisible, slightly below
          whileInView={{ opacity: 1, y: 0 }} // Animate to: visible, final position
          viewport={{ once: true, amount: 0.3 }} // Trigger once when 30% visible
          transition={{ duration: 0.6, delay: 0.2 }} // Smooth animation
          className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-14" // Larger text, more margin
        >
          Koleksi Eksklusif Suite Kami
        </motion.h2>

        {/* Display error message if data fetching failed */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-8" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {/* Display message if no lodgings are found and no error occurred */}
        {lodgings.length === 0 && !error ? (
          <p className="text-center text-gray-600 text-xl">Tidak ada suite ditemukan saat ini.</p>
        ) : (
          // Grid layout for lodging cards. Optimized for 2 cols on medium, 4 on large (if desired for 4 items)
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10"> {/* Adjusted grid for 4 items */}
            {/* Map through lodgings and render LodgingCard for each */}
            {lodgings.map((lodging) => (
              <LodgingCard key={lodging.id} lodging={lodging} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
