// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // 1. Add this import

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaATpTwFJN3ZhwPwJSwajxgopsSfqRZLM",
  authDomain: "reforged-b8582.firebaseapp.com",
  projectId: "reforged-b8582",
  storageBucket: "reforged-b8582.firebasestorage.app",
  messagingSenderId: "162751773697",
  appId: "1:162751773697:web:fab59bdc13e2f7fb749400",
  measurementId: "G-ZQENY9NS30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 2. Initialize Firestore and export 'db' so other files can use it
export const db = getFirestore(app);