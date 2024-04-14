// Persistant Authentication
import { useState, useEffect } from "react";
import { auth1, provider, firestore } from "../Config/firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
// import { auth, firestore } from "../../fireabase/config";
import { setDoc, serverTimestamp, doc } from "firebase/firestore";

// importing firebase context
import { AuthContext } from "../Editor/Context/firebase";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

const useAuth = () => {
  //get the user state from the context
  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();

    // onAuthStateChanged(auth, (user) => {
    //   if (user) navigate(`/`);
    // });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  //   const dispatch = useDispatch();

  // Handle login with Firebase Authentication
  const login = async () => {
    try {
      const result = await signInWithPopup(auth1, provider)
        .then(({ user }) => {
          const docRef = doc(firestore, "users", `${user?.uid}`);
          setDoc(
            docRef,
            {
              lastLogin: serverTimestamp(),
              name: user?.displayName,
              email: user?.email,
              number: user?.phoneNumber,
            },
            { merge: true },
            (doc) => console.log(doc)
          );
          console.log(user);
          setUser(user);
        })
        .catch((err) => console.log(err));;
      const user = result.user;
      //   // Set user information in the Redux store
      //   dispatch(setUser(user.displayName));
      setIsLoggedIn(true);
    } catch (error) {
      setErrorMessage(error.code + " " + error.message);
    }
  };

  // Handle logout
  const logout = () => {
    signOut(auth1);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    // Add an observer to watch for changes in user authentication state
    const unsubscribe = auth1.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in
        setUserName(user.displayName);
        setIsLoggedIn(true);
      } else {
        // User is signed out
        setUserName(null);
        setIsLoggedIn(false);
      }
    });

    // Clean up the observer when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []); // Pass an empty dependency array to run the effect only once

  
  return {
    isLoggedIn,
    userName,
    login,
    logout,
  };
};

export default useAuth;