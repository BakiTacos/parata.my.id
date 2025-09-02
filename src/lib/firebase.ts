// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth"; // <-- Import getAuth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3mw2U2cATVygSDWioYZGCF2IC3vcP9kE",
  authDomain: "parata-my-id.firebaseapp.com",
  projectId: "parata-my-id",
  storageBucket: "parata-my-id.appspot.com", // Corrected storage bucket domain
  messagingSenderId: "753565829461",
  appId: "1:753565829461:web:a1f5323f8a976531e8c7dc",
  measurementId: "G-E4ZR77TFBQ"
};

// Initialize Firebase App (ensure it's only initialized once)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication and export it
export const firebaseApp = app;
export const auth = getAuth(app); // <-- Initialize Auth here and export it