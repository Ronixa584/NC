import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {getAuth} from "firebase/auth";

//Google Auth
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8gDIx8fbDBeMcJQAV5G62p-k4p-ACV9Q",
  authDomain: "notecraft-dev.firebaseapp.com",
  projectId: "notecraft-dev",
  storageBucket: "notecraft-dev.appspot.com",
  messagingSenderId: "619253240847",
  appId: "1:619253240847:web:ca4ef8fc52b316e296bf7a",
};

//Normal SignIn and LogIn setup For firebase
const fire = firebase.initializeApp(firebaseConfig);
const auth = getAuth(fire);
const provider = new GoogleAuthProvider();

//For Firestore
const fire1 = initializeApp(firebaseConfig);
const firestore = getFirestore(fire1);
const auth1 = getAuth(fire1);

export { fire, auth, provider, fire1, firestore, auth1 };
//only auth,firestore used
