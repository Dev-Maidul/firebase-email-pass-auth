
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAsECnvHpETonNbNhbzM55TiWt_2Qm2BIs",
  authDomain: "email-pass-auth-cad8b.firebaseapp.com",
  projectId: "email-pass-auth-cad8b",
  storageBucket: "email-pass-auth-cad8b.firebasestorage.app",
  messagingSenderId: "45533108147",
  appId: "1:45533108147:web:ad09126e3fd242ba839dc6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);