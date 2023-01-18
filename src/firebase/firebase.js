import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDVHkyHLtA9fe1UcS_PuLf6got8UIHUdss",
  authDomain: "treelink-tuto-45d10.firebaseapp.com",
  projectId: "treelink-tuto-45d10",
  storageBucket: "treelink-tuto-45d10.appspot.com",
  messagingSenderId: "825821825385",
  appId: "1:825821825385:web:a418d495bbf98a2a0ed5f8"
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app)