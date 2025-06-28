// src/components/CustomModal.jsx
// A reusable custom modal component to display messages or confirmations,
// replacing browser's alert() and confirm() due to iframe restrictions.

"use client"; // This is a Client Component because it uses React hooks (useState, useEffect).

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

/**
 * CustomModal component.
 * Displays a modal dialog with a title, message, and a close button.
 * @param {Object} props - Component props.
 * @param {boolean} props.isOpen - Controls the visibility of the modal.
 * @param {function} props.onClose - Callback function when the modal is closed.
 * @param {string} props.title - Title of the modal.
 * @param {string} props.message - Message content of the modal.
 * @param {string} [props.type='info'] - Type of modal ('info', 'success', 'error').
 */
export default function CustomModal({ isOpen, onClose, title, message, type = 'info' }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Render only after component mounts to avoid hydration issues

  // Determine colors based on modal type
  const headerClasses = {
    info: 'bg-blue-600',
    success: 'bg-green-600',
    error: 'bg-red-600',
  };

  const buttonClasses = {
    info: 'bg-blue-600 hover:bg-blue-700',
    success: 'bg-green-600 hover:bg-green-700',
    error: 'bg-red-600 hover:bg-red-700',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={onClose} // Close modal if background is clicked
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-white rounded-lg shadow-xl max-w-sm w-full mx-auto overflow-hidden transform"
            onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <div className={`${headerClasses[type]} text-white text-xl font-bold p-4`}>
              {title}
            </div>
            <div className="p-6 text-gray-800">
              <p className="text-lg mb-6">{message}</p>
              <div className="text-right">
                <button
                  onClick={onClose}
                  className={`text-white font-semibold py-2 px-6 rounded-md transition-colors ${buttonClasses[type]}`}
                >
                  OK
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
