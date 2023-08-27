import { initializeApp } from "firebase/app";

import {
  getAuth,
  createUserWithEmailAndPassword as createUser,
  signInWithEmailAndPassword as signin,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
} from "firebase/firestore";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBqdA8pRCzNFqTvi1vdkJVWyak9ZWkGuHw",
  authDomain: "test-91df1.firebaseapp.com",
  databaseURL: "https://test-91df1-default-rtdb.firebaseio.com",
  projectId: "test-91df1",
  storageBucket: "test-91df1.appspot.com",
  messagingSenderId: "374659317858",
  appId: "1:374659317858:web:df2ba5599af9b39b5dd13b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize auth object
const db = getFirestore(app); // Initialize firestore object
const storage = getStorage(app); // Initialize storage object

export { auth, createUser, signin };
export { db, collection, addDoc, doc, getDoc };
export { storage, ref, uploadBytes, getDownloadURL, listAll };

export async function uploadImage(file, fileName) {
  const storageRef = ref(storage, `images/${fileName}`); // fileName을 사용하여 경로 설정
  await uploadBytes(storageRef, file);
  return storageRef;
}

export async function saveButtonText(buttonIndex, buttonText) {
  try {
    const buttonRef = collection(db, "buttons"); // 'buttons' 컬렉션을 사용하거나 변경하세요
    const docRef = await addDoc(buttonRef, { buttonIndex, buttonText });
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    return null;
  }
}
