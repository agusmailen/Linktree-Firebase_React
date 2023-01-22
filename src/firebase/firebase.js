import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL, getBytes } from 'firebase/storage';
import { getFirestore, collection, addDoc, getDocs, getDoc, query, where, setDoc, deleteDoc, doc } from 'firebase/firestore';
import { cloneElement } from "react";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_SENDERID,
  appId: process.env.REACT_APP_APPID
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)


export const userExists = async (uid) => {
  const docRef = doc(db, 'users', uid);
  const res = await getDoc(docRef);
  return res.exists();
}


export const existsUserName = async(username) => {
  const users = [];
  const docsRef = collection(db, 'users')
  const q = query(docsRef, where('username', '==', username));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    users.push(doc.data());
  })

  return users.length > 0 ? users[0].uid : null;
}

export const registerNewUser = async (user) => {
  try{
    const collectionRef = collection(db, 'users');
    const docRef = doc(collectionRef, user.uid)
    await setDoc(docRef, user);
  }catch(error) {
    console.log(error)
  }
}

export const updateUser = async (user) => {
  try{
    const collectionRef = collection(db, 'users');
    const docRef = doc(collectionRef, user.uid)
    await setDoc(docRef, user);
  }catch(error) {
    console.log(error)
  }
}

export const getUserInfo = async (uid) => {
  try{
    const docRef = doc(db, 'users', uid);
    const document = await getDoc(docRef);
    return document.data();
  } catch(error) {
    console.log(error)
  }
}

export const insertNewLink = async (link) => {
  try {
    const docRef = collection(db, 'links')
    const res = await addDoc(docRef, link)
    return res;
  } catch (error) {
    console.log(error)
  }
}

export const getLinks = async (uid) => {
  const links = [];
  try{
    const collectionRef = collection(db, 'links');
    const q = query(collectionRef, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      const link = {...doc.data()}
      link.docId = doc.id
      links.push(link)
    })
    return links;

  } catch(error) {
    console.error(error)
  }
}