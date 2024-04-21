// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-estate-67049.firebaseapp.com",
    projectId: "mern-estate-67049",
    storageBucket: "mern-estate-67049.appspot.com",
    messagingSenderId: "595768185351",
    appId: "1:595768185351:web:6951818f94e1f49e4ad0a2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);