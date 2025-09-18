// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC9KADvOSZBr7kFj_DhKRUDnXRd9Lw5g2k",
  authDomain: "peak-nimbus-466309-n1.firebaseapp.com",
  projectId: "peak-nimbus-466309-n1",
  storageBucket: "peak-nimbus-466309-n1.firebasestorage.app",
  messagingSenderId: "1058846922605",
  appId: "1:1058846922605:web:e046de49c5b9ae5b992c64",
  measurementId: "G-0HPBZKFNY8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
