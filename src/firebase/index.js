// Import the functions you need from the SDKs you need
// import { initializeApp } from "../node_modules/firebase/firebase-app";
import { initializeApp } from "firebase/app";
import {
  getAuth, // authentication 설정
  // signInWithPopup, //google 로그인을 팝업창에 띄우기 위해
  // GoogleAuthProvider, //google login 기능
  signInWithEmailAndPassword, // email 로그인
  createUserWithEmailAndPassword, //email 회원가입
} from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4GnGNTJLqUh5kZ6fYWmrjXOpeZuPT46M",
  authDomain: "gyeongi-gourmet-project-602f6.firebaseapp.com",
  projectId: "gyeongi-gourmet-project-602f6",
  storageBucket: "gyeongi-gourmet-project-602f6.firebasestorage.app",
  messagingSenderId: "768699414384",
  appId: "1:768699414384:web:0f80be2514b8b95e8d41b5",
  measurementId: "G-FDDB3JW5D3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const signUpEmail = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export { auth };