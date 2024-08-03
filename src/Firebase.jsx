// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcgN43erW6TBbM72LR9eReuo2ol6YTMds",
  authDomain: "recipes-app-cfaa5.firebaseapp.com",
  projectId: "recipes-app-cfaa5",
  storageBucket: "recipes-app-cfaa5.appspot.com",
  messagingSenderId: "1086794599341",
  appId: "1:1086794599341:web:cec374697017893a16ef24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const notesCollection = collection(db, "notes")