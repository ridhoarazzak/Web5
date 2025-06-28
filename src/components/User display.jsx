// src/components/UserDisplay.jsx
// This component displays the authenticated user's ID.

"use client"; // This is a Client Component because it uses useAppContext hook.

import { useAppContext } from '@/context/AppContext';
import { useState } from 'react';

export default function UserDisplay() {
  const { userId, isAuthReady } = useAppContext();
  const [showCopied, setShowCopied] = useState(false);

  const copyUserId = () => {
    if (userId) {
      // Use document.execCommand('copy') for clipboard operations due to iframe restrictions
      const el = document.createElement('textarea');
      el.value = userId;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000); // Hide "Copied!" after 2 seconds
    }
  };

  if (!isAuthReady) {
    return <span className="text-gray-400 text-sm">Memuat pengguna...</span>;
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-gray-600 text-sm font-medium">
        Pengguna ID: <span className="font-semibold text-green-700">{userId || 'Anonim'}</span>
      </span>
      {userId && (
        <button
          onClick={copyUserId}
          className="bg-green-100 text-green-700 px-2 py-1 rounded-md text-xs font-semibold hover:bg-green-200 transition-colors relative"
          title="Salin User ID"
        >
          {showCopied ? 'Disalin!' : 'Salin'}
        </button>
      )}
    </div>
  );
}
