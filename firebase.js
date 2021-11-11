// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAh35aVc2CLxfWK6fbvK2z8Zv5MRSuthU",
  authDomain: "instagram-clone-3d639.firebaseapp.com",
  projectId: "instagram-clone-3d639",
  storageBucket: "instagram-clone-3d639.appspot.com",
  messagingSenderId: "478132174114",
  appId: "1:478132174114:web:cda02988055251bdbe397b"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig): getApp();
const db = getFirestore()
const storage = getStorage()

export {app, db, storage}