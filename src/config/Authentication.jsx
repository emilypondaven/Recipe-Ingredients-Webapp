import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyALGJnOKWVVTtUXs2VXamSRENLlj8P96nY",
    authDomain: "newproject-78a46.firebaseapp.com",
    projectId: "newproject-78a46",
    storageBucket: "newproject-78a46.appspot.com",
    messagingSenderId: "1041945922478",
    appId: "1:1041945922478:web:19c064b0ea4e5cef56163f"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);