// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDSPMpOBjep6152GgTt5MvgpRbPBd0MoEs",
  authDomain: "mca-farewell-2026.firebaseapp.com",
  projectId: "mca-farewell-2026",
  storageBucket: "mca-farewell-2026.firebasestorage.app",
  messagingSenderId: "234756831638",
  appId: "1:234756831638:web:ad6f497eea896d04fe85b7",
  measurementId: "G-W162LFHKFG",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export default app;
