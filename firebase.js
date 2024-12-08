// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDC0jic5p8jvV_WKjaDYLEODlZLb1qsFLo",
  authDomain: "glamm-4e2cb.firebaseapp.com",
  projectId: "glamm-4e2cb",
  storageBucket: "glamm-4e2cb.firebasestorage.app",
  messagingSenderId: "509579181455",
  appId: "1:509579181455:web:db35b86b9f40253de91ffa"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig): getApp();
const db = getFirestore()
const storage = getStorage()

export {app, db, storage}