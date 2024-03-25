// firebase.js
const firebase = require("firebase/compat/app");
require("firebase/compat/auth");
const { GoogleAuthProvider } = require("firebase/compat/auth");
const { initializeApp } = require("firebase/compat/app");
const { getFirestore } = require("@firebase/firestore");


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8gDIx8fbDBeMcJQAV5G62p-k4p-ACV9Q",
  authDomain: "notecraft-dev.firebaseapp.com",
  projectId: "notecraft-dev",
  storageBucket: "notecraft-dev.appspot.com",
  messagingSenderId: "619253240847",
  appId: "1:619253240847:web:ca4ef8fc52b316e296bf7a",
};

// Normal SignIn and LogIn setup For firebase
const fire = initializeApp(firebaseConfig);
const auth = firebase.auth(); // Use firebase.auth() instead of getAuth
// const provider = new GoogleAuthProvider();

// Set authentication state persistence to "local" (persistent across page reloads)

// For Firestore
const fire1 = initializeApp(firebaseConfig);
const firestore = getFirestore(fire1);
const auth1 = firebase.auth(fire1); // Use firebase.auth() instead of getAuth

module.exports = { fire, auth, fire1, firestore, auth1 };
