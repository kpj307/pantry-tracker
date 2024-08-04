// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3r2zu6Tp0VNIslN4fXQwnxFnq-FLUVK0",
  authDomain: "pantry-tracker-dbf59.firebaseapp.com",
  projectId: "pantry-tracker-dbf59",
  storageBucket: "pantry-tracker-dbf59.appspot.com",
  messagingSenderId: "401573651725",
  appId: "1:401573651725:web:cd02147064f7d6de293c44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);