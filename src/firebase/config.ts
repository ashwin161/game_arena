import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Web app's Firebase configuration provided by user
const firebaseConfig = {
  apiKey: "AIzaSyBjnKpVtRyLkTbKvGI4aCu7MzTucHW4pyw",
  authDomain: "arena-65b0a.firebaseapp.com",
  projectId: "arena-65b0a",
  storageBucket: "arena-65b0a.firebasestorage.app",
  messagingSenderId: "292904947693",
  appId: "1:292904947693:web:197aaace55e17acad2e1e4",
  measurementId: "G-BC0P9FTGGN"
};

// Initialize Firebase (singleton pattern)
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Authentication instance & Google Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Cloud Firestore Database instance
export const db = getFirestore(app);

// Optional Analytics instance
export const initAnalytics = async () => {
  if (typeof window !== 'undefined' && await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};
