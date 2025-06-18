// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCbv2zzjD8j_8jh4WgpgX3F4L5YitPYGCE",
    authDomain: "rice-f7b8a.firebaseapp.com",
    projectId: "rice-f7b8a",
    storageBucket: "rice-f7b8a.firebasestorage.app",
    messagingSenderId: "2786276223",
    appId: "1:2786276223:web:d9de27d10f23b13be5a04a",
    measurementId: "G-WDD9ETZ34S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

// const app = initializeApp(firebaseConfig);
// export const storage = getStorage(app);
