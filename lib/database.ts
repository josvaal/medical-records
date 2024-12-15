"use client"

import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, browserLocalPersistence } from "firebase/auth";
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

console.log(firebaseConfig);

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const firestore = getFirestore(app);
const auth = getAuth(app);

auth
  .setPersistence(browserLocalPersistence)
  .then(() => {
    // Puede continuar con la autenticación o el resto de la lógica
  })
  .catch((error) => {
    console.error("Error al establecer persistencia", error);
  });

export { app, firestore, auth };
