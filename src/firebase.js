// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZRLlFDqnldzei0zIRSg8fCVcPa3pKkzc",
  authDomain: "ideazman-bd703.firebaseapp.com",
  projectId: "ideazman-bd703",
  storageBucket: "ideazman-bd703.firebasestorage.app",
  messagingSenderId: "999195835492",
  appId: "1:999195835492:web:afde2557f8d8ec9477b371",
  measurementId: "G-1DHN92LLPZ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
