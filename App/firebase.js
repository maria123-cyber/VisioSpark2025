// firebase.js
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged 
} from "firebase/auth";

import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  updateDoc, 
  deleteDoc,
  doc,
  query,
  where
} from "firebase/firestore";

import { getStorage } from "firebase/storage";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDWQvkUWkyySzL5dRReAW72n06RxZBlqm8",
  authDomain: "uniweek25.firebaseapp.com",
  projectId: "uniweek25",
  storageBucket: "uniweek25.firebasestorage.app",
  messagingSenderId: "88887597218",
  appId: "1:88887597218:web:b8c931fde117447cfe9ffb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Auth helpers
export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
  return signOut(auth);
};

// Check login state
export const listenAuth = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Firestore helpers
export const addEvent = (eventData) => {
  return addDoc(collection(db, "events"), eventData);
};

export const getAllEvents = () => {
  return getDocs(collection(db, "events"));
};

export const updateEvent = (id, updatedData) => {
  return updateDoc(doc(db, "events", id), updatedData);
};

export const deleteEvent = (id) => {
  return deleteDoc(doc(db, "events", id));
};

export const getEventsBySociety = (society) => {
  const q = query(collection(db, "events"), where("society", "==", society));
  return getDocs(q);
};

export const registerForEvent = async (eventId, userId) => {
  return addDoc(collection(db, "registrations"), {
    userId,
    eventId,
    timestamp: Date.now(),
  });
};

export const getUserRegistrations = (userId) => {
  const q = query(collection(db, "registrations"), where("userId", "==", userId));
  return getDocs(q);
};

// Export main instances
export { auth, db, storage };
