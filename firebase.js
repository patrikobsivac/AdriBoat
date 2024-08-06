import firebase from 'firebase/compat/app';
import {
    doc,
    addDoc,
    getDoc,
    setDoc,
    getDocs,
    getCount,
    getFirestore,
    collection,
    serverTimestamp
} from 'firebase/firestore/lite';
import {
    getAuth,
    updatePassword,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    confirmPasswordReset,
    beforeAuthStateChanged,
    onAuthStateChanged
} from 'firebase/auth';
import {
    getStorage,
    ref,
    uploadBytes,
    getDownloadURL
} from 'firebase/storage';

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCtMxTsodzOJ2zqd0-H5yYE-uCnyJZ-VxQ",
    authDomain: "adriboat-cec31.firebaseapp.com",
    projectId: "adriboat-cec31",
    storageBucket: "adriboat-cec31.appspot.com",
    messagingSenderId: "987812691698",
    appId: "1:987812691698:web:bbac39432456f4257b9a6b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export {
    app,
    auth,
    storage,
    getAuth,
    db,
    collection,
    doc,
    getDoc,
    setDoc,
    addDoc,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    onAuthStateChanged,
    ref,
    uploadBytes,
    getDownloadURL,
    signOut,
    updatePassword,
};
