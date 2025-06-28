// src/app/layout.js
// This is the root layout that applies to all pages in the application.

import './globals.css'; // Import global styles (Tailwind CSS)
import { Inter } from 'next/font/google'; // Import Google Font (Inter) for consistent typography
import Header from '@/components/Header'; // Import Header component
import Footer from '@/components/Footer'; // Import Footer component
import { AppContextProvider } from '@/context/AppContext'; // Import the AppContextProvider

// Initialize the Inter font with 'latin' subset
const inter = Inter({ subsets: ['latin'] });

// Metadata for the entire application (used for SEO and browser tab title)
export const metadata = {
  title: 'Green Coffee - Pengalaman Menginap Bintang Lima Anda',
  description: 'Rasakan kemewahan dan ketenangan di Green Coffee, suite bintang lima eksklusif di tengah alam. Pesan pengalaman menginap tak terlupakan.',
};

/**
 * RootLayout component.
 * It wraps all pages with a common structure: Header, main content, and Footer.
 * It also wraps the content with AppContextProvider to provide global state.
 * @param {Object} { children } - The page content to be rendered inside the layout.
 * @returns {JSX.Element} The root HTML structure.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="id">
      {/* Apply the Inter font to the body, and set a light gray background */}
      <body className={`${inter.className} flex flex-col min-h-screen bg-gray-50`}>
        {/* AppContextProvider provides Firebase instances, userId, and appId to all children */}
        <AppContextProvider>
          {/* Render the Header component */}
          <Header />
          {/* Main content area, configured to grow and fill available space */}
          <div className="flex-grow">
            {children} {/* This is where the page content will be rendered */}
          </div>
          {/* Render the Footer component */}
          <Footer />
        </AppContextProvider>
      </body>
    </html>
  );
}
