// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4YTWYG1ziI8vbZrKVPEypqiUvGclMOXQ",
  authDomain: "react-cursos-8c781.firebaseapp.com",
  projectId: "react-cursos-8c781",
  storageBucket: "react-cursos-8c781.appspot.com",
  messagingSenderId: "936624574962",
  appId: "1:936624574962:web:7e426c2a647907294a5b6b"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);