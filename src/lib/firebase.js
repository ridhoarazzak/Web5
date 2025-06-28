// src/lib/firebase.js
// This file initializes Firebase and provides instances for Firestore and Authentication.

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Global variables provided by the Canvas environment (MUST BE USED)
// __app_id: The current app ID as a string.
// __firebase_config: Firebase config provided as a string.
// __initial_auth_token: Firebase custom auth token string.

// Initialize Firebase App
let firebaseApp;
if (typeof window !== 'undefined') {
  // Check if Firebase app is already initialized to prevent re-initialization in Next.js development mode
  if (!getApps().length) {
    const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
    firebaseApp = initializeApp(firebaseConfig);
    console.log("Firebase initialized.");
  } else {
    firebaseApp = getApp();
    console.log("Firebase already initialized (using existing app).");
  }
}

// Get Auth and Firestore instances
let authInstance;
let dbInstance;

if (firebaseApp) {
  authInstance = getAuth(firebaseApp);
  dbInstance = getFirestore(firebaseApp);

  // Authenticate user on load if initial token is available
  if (typeof window !== 'undefined' && typeof __initial_auth_token !== 'undefined') {
    signInWithCustomToken(authInstance, __initial_auth_token)
      .then(() => {
        console.log("Signed in with custom token.");
      })
      .catch((error) => {
        console.error("Error signing in with custom token:", error);
        // Fallback to anonymous sign-in if custom token fails
        signInAnonymously(authInstance)
          .then(() => console.log("Signed in anonymously."))
          .catch((anonError) => console.error("Error signing in anonymously:", anonError));
      });
  } else if (typeof window !== 'undefined') {
    // If no custom token, sign in anonymously (e.g., for local development without Canvas token)
    signInAnonymously(authInstance)
      .then(() => console.log("Signed in anonymously (no custom token)."))
      .catch((anonError) => console.error("Error signing in anonymously:", anonError));
  }
}

// Export instances and authentication listener
export const auth = authInstance;
export const db = dbInstance;
export const onAuthStateChangedListener = onAuthStateChanged;
