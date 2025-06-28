// src/components/LodgingDetailClient.jsx
// This is a Client Component that handles the interactive parts of the lodging detail page,
// including animations, booking form, and Firebase interactions.

"use client"; // REQUIRED: This component uses React hooks, Framer Motion, and client-side Firebase SDK.

import Image from 'next/image';
import { motion } from 'framer-motion';
import BookingForm from '@/components/BookingForm'; // Import the BookingForm component
import CustomModal from '@/components/CustomModal'; // Import the custom modal component
import { useAppContext } from '@/context/AppContext'; // Import AppContext hook
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Firebase Firestore functions
import { useState } from 'react'; // Import useState for modal state

/**
 * LodgingDetailClient component.
 * Displays detailed information about a specific lodging and handles the booking process.
 * @param {Object} props - Component props.
 * @param {Object} props.lodging - The lodging object containing all details.
 * @returns {JSX.Element} The interactive detail page content.
 */
export default function LodgingDetailClient({ lodging }) {
  // Get db, userId, and appId from the AppContext
  const { db, userId, isAuthReady, appId } = useAppContext();

  // State for the custom modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '', type: 'info' });

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

  /**
   * Handles the booking submission. Saves booking data to Firestore.
   * This function is passed down to the BookingForm component.
   * @param {Object} bookingDetails - Details of the booking (checkInDate, checkOutDate, guests, etc.).
   */
  const handleBookLodging = async (bookingDetails) => {
    // Ensure authentication is ready and userId is available before proceeding
    if (!isAuthReady || !userId || !db) {
      setModalContent({
        title: 'Autentikasi Diperlukan',
        message: 'Mohon tunggu hingga sesi pengguna siap atau refresh halaman.',
        type: 'error',
      });
      setModalOpen(true);
      throw new Error('User not authenticated or Firebase not ready.');
    }

    try {
      // Define the path for the public bookings collection in Firestore.
      // Data is stored under `artifacts/{appId}/public/data/bookings`
      // This path is configured to allow read/write by any authenticated user in Firebase Security Rules.
      const bookingsCollectionRef = collection(db, `artifacts/${appId}/public/data/bookings`);

      // Add a new document to the 'bookings' collection with booking details
      await addDoc(bookingsCollectionRef, {
        lodgingId: bookingDetails.lodgingId,
        lodgingName: bookingDetails.lodgingName,
        checkInDate: bookingDetails.checkInDate,
        checkOutDate: bookingDetails.checkOutDate,
        guests: bookingDetails.guests,
        userId: userId, // Store the ID of the user who made the booking for attribution
        status: 'pending', // Initial status of the booking
        createdAt: serverTimestamp(), // Use Firestore server timestamp for consistency
      });

      console.log("Pemesanan berhasil disimpan ke Firestore!");
      // The BookingForm component will handle its own success modal,
      // so we don't open one here unless there's a Firebase-specific error.

    } catch (error) {
      console.error("Error saving booking to Firestore:", error);
      // Re-throw the error so the BookingForm can catch and display its error modal
      throw new Error("Gagal menyimpan pemesanan ke database. Silakan coba lagi.");
    }
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-green-50"
      initial="hidden" // Start from hidden state
      animate="visible" // Animate to visible state
      variants={containerVariants} // Apply container staggering animations
    >
      {/* Lodging image section with fade-in animation */}
      <motion.div
        className="relative h-80 md:h-[600px] w-full mb-10 rounded-xl overflow-hidden shadow-lg"
        variants={fadeInVariants} // Apply fade-in animation
      >
        <Image
          src={lodging.imageUrl}
          alt={lodging.name}
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
          // Fallback image in case of load error, using a Green Coffee themed placeholder
          onError={(e) => { e.target.src = 'https://placehold.co/1000x600/C8E6C9/4CAF50?text=Green+Coffee'; }}
        />
      </motion.div>

      {/* Lodging name and price sections with fade-in animation */}
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4"
        variants={fadeInVariants}
      >
        {lodging.name}
      </motion.h1>
      <motion.p
        className="text-3xl text-green-700 font-bold mb-8"
        variants={fadeInVariants}
      >
        {lodging.pricePerNight} / malam
      </motion.p>

      {/* Grid layout for description, property details, and booking form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
        {/* Description section with fade-in animation */}
        <motion.div variants={fadeInVariants} className="lg:col-span-1">
          <h2 className="text-3xl font-bold text-gray-800 mb-5 border-b-2 border-green-200 pb-3">Deskripsi</h2>
          <p className="text-gray-700 leading-relaxed text-lg">{lodging.description}</p>
        </motion.div>

        {/* Property details and amenities section with fade-in animation */}
        <motion.div variants={fadeInVariants} className="lg:col-span-1">
          <h2 className="text-3xl font-bold text-gray-800 mb-5 border-b-2 border-green-200 pb-3">Detail Suite</h2>
          <ul className="text-gray-700 space-y-4 text-lg">
            <li><strong>Lokasi:</strong> {lodging.location}</li>
            <li><strong>Tamu Maksimal:</strong> {lodging.guests} orang</li>
            <li><strong>Kamar Tidur:</strong> {lodging.bedrooms}</li>
            <li><strong>Kamar Mandi:</strong> {lodging.bathrooms}</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-800 mt-10 mb-5 border-b-2 border-green-200 pb-3">Fasilitas Mewah</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-gray-700 text-lg">
            {/* Amenities list with individual fade-in animations */}
            {lodging.amenities.map((amenity, index) => (
              <motion.li
                key={index}
                className="flex items-center"
                variants={fadeInVariants}
              >
                {/* Green checkmark icon */}
                <svg className="w-6 h-6 text-green-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                {amenity}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Booking Form section */}
        <motion.div variants={fadeInVariants} className="lg:col-span-1">
          <BookingForm
            lodgingId={lodging.id}
            lodgingName={lodging.name}
            onBookSuccess={handleBookLodging} // Pass the booking handler to the form
          />
        </motion.div>
      </div>

      {/* Custom Modal for showing authentication/Firebase errors */}
      <CustomModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent.title}
        message={modalContent.message}
        type={modalContent.type}
      />
    </motion.div>
  );
}
