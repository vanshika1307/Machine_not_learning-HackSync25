// src/firebase/config.js

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, PhoneAuthProvider , RecaptchaVerifier } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDjtulHJBlsD8sCH6X_mIltipNzurpeH_o",
    authDomain: "kahaniai.firebaseapp.com",
    projectId: "kahaniai",
    storageBucket: "kahaniai.firebasestorage.app",
    messagingSenderId: "683320930030",
    appId: "1:683320930030:web:7833d8f87fa6b923c4cdff",
    measurementId: "G-7M0TZDNJY6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { auth, googleProvider, analytics, db, PhoneAuthProvider , RecaptchaVerifier };