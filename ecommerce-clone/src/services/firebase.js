// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCT-g2fx6k9OaATRwO3TMGbVp13oMCLiLU",
  authDomain: "ecommerce-clone-afb71.firebaseapp.com",
  projectId: "ecommerce-clone-afb71",
  storageBucket: "ecommerce-clone-afb71.firebasestorage.app",
  messagingSenderId: "990078127678",
  appId: "1:990078127678:web:c82cf943d3fadf15d90b6f",
  measurementId: "G-M45W7X30LS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);