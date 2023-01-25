import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDjFA21qiCRviYH6aiauq62SruBwzXoFww",
  authDomain: "splitwise-app-b911e.firebaseapp.com",
  projectId: "splitwise-app-b911e",
  storageBucket: "splitwise-app-b911e.appspot.com",
  messagingSenderId: "1070780053077",
  appId: "1:1070780053077:web:430cde352d03d1396cc6dc",
  measurementId: "G-5ZH8KG8ERL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
