// src/components/BookingForm.jsx
// This component provides a form for users to book a lodging,
// including fields for check-in/out dates and guest count.

"use client"; // This component needs to be a Client Component because it uses React hooks (useState)

import { useState } from 'react';
import CustomModal from '@/components/CustomModal'; // Import the custom modal component

export default function BookingForm({ lodgingId, lodgingName, onBookSuccess }) {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '', type: 'info' });

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true);

    if (!checkInDate || !checkOutDate) {
      setModalContent({
        title: 'Input Tidak Lengkap',
        message: 'Mohon lengkapi tanggal check-in dan check-out.',
        type: 'error',
      });
      setModalOpen(true);
      setIsLoading(false);
      return;
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to compare dates only

    if (checkIn < today) {
      setModalContent({
        title: 'Tanggal Invalid',
        message: 'Tanggal check-in tidak boleh di masa lalu.',
        type: 'error',
      });
      setModalOpen(true);
      setIsLoading(false);
      return;
    }

    if (checkOut <= checkIn) {
      setModalContent({
        title: 'Tanggal Invalid',
        message: 'Tanggal check-out harus setelah tanggal check-in.',
        type: 'error',
      });
      setModalOpen(true);
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call or directly call a booking function passed via props
      await onBookSuccess({
        lodgingId,
        lodgingName,
        checkInDate,
        checkOutDate,
        guests,
      });

      // Show success modal
      setModalContent({
        title: 'Pemesanan Berhasil!',
        message: `Anda telah berhasil memesan ${lodgingName} dari ${checkInDate} hingga ${checkOutDate} untuk ${guests} tamu.`,
        type: 'success',
      });
      setModalOpen(true);

      // Reset form fields
      setCheckInDate('');
      setCheckOutDate('');
      setGuests(1);

    } catch (error) {
      console.error("Error submitting booking:", error);
      // Show error modal
      setModalContent({
        title: 'Pemesanan Gagal',
        message: `Terjadi kesalahan saat memproses pemesanan Anda: ${error.message || 'Silakan coba lagi.'}`,
        type: 'error',
      });
      setModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-md border border-green-100">
      <h3 className="text-3xl font-bold text-gray-800 mb-6">Pesan Suite Ini</h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="checkIn" className="block text-gray-700 text-lg font-semibold mb-2">Check-in Date</label>
          <input
            type="date"
            id="checkIn"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-lg"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="checkOut" className="block text-gray-700 text-lg font-semibold mb-2">Check-out Date</label>
          <input
            type="date"
            id="checkOut"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-lg"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="guests" className="block text-gray-700 text-lg font-semibold mb-2">Jumlah Tamu</label>
          <input
            type="number"
            id="guests"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-lg"
            value={guests}
            onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value)))} // Ensure guests is at least 1
            min="1"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4 px-6 rounded-lg text-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Memproses...' : 'Konfirmasi Pemesanan'}
        </button>
      </form>

      {/* Custom Modal for notifications */}
      <CustomModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent.title}
        message={modalContent.message}
        type={modalContent.type}
      />
    </div>
  );
}
