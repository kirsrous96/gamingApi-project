import firebase from "firebase";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "game-news-e2ba5.firebaseapp.com",
    projectId: "game-news-e2ba5",
    storageBucket: "game-news-e2ba5.appspot.com",
    messagingSenderId: "571757610835",
    appId: "1:571757610835:web:65442da63a2ae2308b83a6",
    measurementId: "G-X85XNYE2DY"
  };


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();
  
export {db, auth, provider,storage };