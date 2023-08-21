import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword as createUser,
  signInWithEmailAndPassword as signin,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
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

export { auth, createUser, signin, db };
