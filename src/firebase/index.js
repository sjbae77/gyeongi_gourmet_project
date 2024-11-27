// Import the functions you need from the SDKs you need
// import { initializeApp } from "../node_modules/firebase/firebase-app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, onSnapshot, getDocs } from "firebase/firestore";
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

// Firestore 인스턴스 생성
const db = getFirestore(app);
export { db };

// Firestore에 글 저장
async function addPost(title, content) {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      title,
      content,
      createdAt: new Date(),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export { addPost };

// Firestore에서 모든 글 가져오기 (한 번만)
export async function fetchPosts() {
  const querySnapshot = await getDocs(collection(db, "posts"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Firestore 실시간 데이터 구독
export function subscribeToPosts(callback) {
  return onSnapshot(collection(db, "posts"), (querySnapshot) => {
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(posts);
  });
}

// 실시간 업데이트 시 카운트 확인
export function subscribeToPostCount(callback) {
  const colRef = collection(db, "posts");
  return onSnapshot(colRef, (querySnapshot) => {
    callback(querySnapshot.size); // 실시간 문서 개수 반환
  });
}