// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9fv17EdNzbgYRme-vaaI1uMqTCr_NIeY",
  authDomain: "enco-learn.firebaseapp.com",
  projectId: "enco-learn",
  storageBucket: "enco-learn.appspot.com",
  messagingSenderId: "138409045925",
  appId: "1:138409045925:web:47224615599634dd75c24c",
  measurementId: "G-2F1M33LEYD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };

export const db = getFirestore(app);
