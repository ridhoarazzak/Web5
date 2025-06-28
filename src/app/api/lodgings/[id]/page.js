// src/app/lodging/[// src/app/lodging/[id]/page.js
// This is a Server Component responsible for fetching lodging data
// and providing static parameters for SSG.

import { notFound } from 'next/navigation';
import { lodgings } from '@/lib/data'; // Import dummy data (same as before)
import LodgingDetailClient from '@/components/LodgingDetailClient'; // Import the new Client Component

/**
 * Generates static paths for each lodging item.
 * This function runs at build time to pre-render individual lodging detail pages.
 * It ensures that Next.js knows which dynamic IDs to generate.
 * @returns {Array<Object>} An array of objects, each with an 'id' parameter.
 */
export async function generateStaticParams() {
  // Map through your dummy data to create params for each lodging.
  // This tells Next.js to generate a page for each lodging.id
  return lodgings.map((lodging) => ({
    id: lodging.id,
  }));
}

/**
 * LodgingDetailPage Server Component.
 * Fetches the specific lodging data based on the dynamic 'id' parameter from the URL.
 * It then passes this data to the `LodgingDetailClient` component for rendering and interactivity.
 * @param {Object} props - Component props.
 * @param {Object} props.params - Contains dynamic route parameters (e.g., { id: '1' }).
 * @returns {JSX.Element} The main content of the lodging detail page.
 */
export default async function LodgingDetailPage({ params }) {
  const { id } = params; // Extract the 'id' from the URL parameters

  // Find the corresponding lodging object from the dummy data
  const lodging = lodgings.find((item) => item.id === id);

  // If no lodging is found for the given ID, return a 404 Not Found page
  if (!lodging) {
    notFound();
  }

  // Render the LodgingDetailClient component, passing the fetched lodging data as a prop.
  // The client component will then handle all client-side logic and rendering.
  return (
    <main className="container mx-auto px-4 py-12">
      <LodgingDetailClient lodging={lodging} />
    </main>
  );
}
