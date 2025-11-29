import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Provided Config
const firebaseConfig = {
  apiKey: "AIzaSyDWQvkUWkyySzL5dRReAW72n06RxZBlqm8",
  authDomain: "uniweek25.firebaseapp.com",
  projectId: "uniweek25",
  storageBucket: "uniweek25.firebasestorage.app",
  messagingSenderId: "88887597218",
  appId: "1:88887597218:web:b8c931fde117447cfe9ffb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);