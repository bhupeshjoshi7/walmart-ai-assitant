import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Replace this with your real Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDOXcLH0sb4NRV6Uvvd99w9A0NsfTwvrPI",
  authDomain: "clone-a5ea2.firebaseapp.com",
  projectId: "clone-a5ea2",
  storageBucket: "clone-a5ea2.appspot.com",          // ✅ Match project ID
  messagingSenderId: "904863721640",                 // ✅ Real ID (from appId)
  appId: "1:904863721640:web:4a6f97ae59f257c436ba9d",
  measurementId: "G-XXXXXXXXXX"                      // ✅ Optional (Analytics)
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore DB and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
