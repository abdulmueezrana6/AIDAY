// src/firebase.js (hoặc tạo một tệp tương tự)
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDPtRb2oe4cMM0h157ICgRyYWLF-kGa5Kc",
  authDomain: "aiday-29604.firebaseapp.com",
  projectId: "aiday-29604",
  storageBucket: "aiday-29604.appspot.com",
  messagingSenderId: "299418890921",
  appId: "1:299418890921:web:6077d9330d5775ecd96fb8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
