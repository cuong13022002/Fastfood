// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey:"AIzaSyBRPqbsSJlPo85vNNrg-n_OpLfuZK6Zj_8",
  authDomain: "fullstack-ecomerce-7c10b.firebaseapp.com",
  projectId: "fullstack-ecomerce-7c10b",
  storageBucket:"fullstack-ecomerce-7c10b.firebasestorage.app",
  messagingSenderId:"221563683540",
  appId: "1:221563683540:web:9142ceb9a5085a0a3c7141"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);