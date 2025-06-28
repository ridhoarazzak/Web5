// src/context/AppContext.jsx
// This file defines the React Context to provide Firebase (Firestore, Auth) instances
// and application-specific global variables (userId, appId) to all components.

"use client"; // This component needs to be a Client Component as it uses React hooks (useState, useEffect, createContext)

import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, auth, onAuthStateChangedListener } from '@/lib/firebase'; // Import Firebase instances

// Create the context
const AppContext = createContext(null);

/**
 * Custom hook to easily access the app context values.
 * @returns {Object} The context value containing db, userId, and appId.
 */
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
}

/**
 * AppContextProvider component.
 * It initializes Firebase authentication, sets up state for userId and authentication readiness,
 * and provides these values along with Firestore db instance and appId to its children.
 * @param {Object} { children } - React children to be rendered within the context.
 * @returns {JSX.Element} The context provider wrapping the children.
 */
export function AppContextProvider({ children }) {
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false); // To track if initial auth state is resolved

  // Access global variables provided by the Canvas environment
  // __app_id: The current app ID as a string.
  const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

  useEffect(() => {
    // Set up Firebase Auth state listener
    // This listener will be called when the user's sign-in state changes.
    const unsubscribe = onAuthStateChangedListener(auth, (user) => {
      if (user) {
        // User is signed in (either anonymously or via custom token)
        setUserId(user.uid);
        console.log("Auth state changed: User ID set to", user.uid);
      } else {
        // User is signed out
        setUserId(null);
        console.log("Auth state changed: User is null.");
      }
      setIsAuthReady(true); // Mark authentication as ready after initial check
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Provide the context values to all children components
  const contextValue = {
    db, // Firestore database instance
    userId, // Current authenticated user's ID
    isAuthReady, // Flag indicating if authentication state has been determined
    appId, // The application ID from Canvas environment
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}
