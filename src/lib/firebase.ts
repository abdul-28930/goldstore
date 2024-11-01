import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDqm8v9bWZGdXOQisXoN3PSB0vgA7U4N5Q",
  authDomain: "luxe-jewelry-demo.firebaseapp.com",
  projectId: "luxe-jewelry-demo",
  storageBucket: "luxe-jewelry-demo.appspot.com",
  messagingSenderId: "447799901561",
  appId: "1:447799901561:web:d98f309c9b9e4e9c3a4d8f"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);