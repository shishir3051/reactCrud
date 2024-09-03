import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBkLavRit-SKuMxGKabbFq7r0uShJtlU8Y",
    authDomain: "reactcrud-6ea8d.firebaseapp.com",
    projectId: "reactcrud-6ea8d",
    storageBucket: "reactcrud-6ea8d.appspot.com",
    messagingSenderId: "1079837633863",
    appId: "1:1079837633863:web:1a950dcd0cf70fde54f062",
    measurementId: "G-PR77ZB9SMM",
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
