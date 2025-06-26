// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDltRzS5e5r9SK54247rBHRk6Lbg6XpdlA",
  authDomain: "planit-ai-84aa9.firebaseapp.com",
  projectId: "planit-ai-84aa9",
  storageBucket: "planit-ai-84aa9.firebasestorage.app",
  messagingSenderId: "374872010824",
  appId: "1:374872010824:web:9169b500d5b3b7dc4fa87d",
  measurementId: "G-TD558HDRXE"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
