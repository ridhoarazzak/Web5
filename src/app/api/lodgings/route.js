// src/app/api/lodgings/route.js
// This file handles the API endpoint for fetching lodging data.

import { NextResponse } from 'next/server';
import { lodgings } from '@/lib/data'; // Importing the updated dummy data

/**
 * Handles GET requests to /api/lodgings.
 * Returns a JSON response containing all lodging data.
 * @returns {NextResponse} JSON response with lodging data or error.
 */
export async function GET() {
  try {
    // Log to console for debugging on the server side
    console.log("API: Sending Green Coffee lodging data...");
    // Return the lodgings data as a JSON response with a 200 OK status
    return NextResponse.json(lodgings, { status: 200 });
  } catch (error) {
    // Log any errors that occur during the process
    console.error("API Error in /api/lodgings:", error);
    // Return an error response with a 500 Internal Server Error status
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
