import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCQWQR3WrJ1ZLVd1EzqUmwdfKgCLpLnggM",
    authDomain: "lucascaudanablog.firebaseapp.com",
    projectId: "lucascaudanablog",
    storageBucket: "lucascaudanablog.firebasestorage.app",
    messagingSenderId: "828442229234",
    appId: "1:828442229234:web:ced11cf9d8f44a3589536b",
    measurementId: "G-249GGH3SXD"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);