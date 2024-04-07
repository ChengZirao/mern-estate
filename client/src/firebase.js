// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-73859.firebaseapp.com",
  projectId: "mern-estate-73859",
  storageBucket: "mern-estate-73859.appspot.com",
  messagingSenderId: "410609064064",
  appId: "1:410609064064:web:ef5d1b1998a07a64386e65",
  measurementId: "G-NT0QN7M13N",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
