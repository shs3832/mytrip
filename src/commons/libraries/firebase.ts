// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0tQ2lBzqxWb2z9kXyEDuo5hK7jhjaRw0",
  authDomain: "codetemp-449c0.firebaseapp.com",
  projectId: "codetemp-449c0",
  storageBucket: "codetemp-449c0.firebasestorage.app",
  messagingSenderId: "956364670975",
  appId: "1:956364670975:web:e8936c885f67cc4135c9ca",
  measurementId: "G-3D6EQMKPTZ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
