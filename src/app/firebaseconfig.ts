// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-NoUN7ZvKtCUKihLCKQX8lLkB5Glra3M",
  authDomain: "testetecnico-149c5.firebaseapp.com",
  projectId: "testetecnico-149c5",
  storageBucket: "testetecnico-149c5.firebasestorage.app",
  messagingSenderId: "511567176560",
  appId: "1:511567176560:web:4bb37efbf4daa9030fa5b5",
  measurementId: "G-KH1EQQTV91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Inicializando Auth (para autenticação)
const auth = getAuth(app);
export { auth };