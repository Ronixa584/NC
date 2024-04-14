// import React from 'react'
import TextEditor from '../Text Editor/Client/TextEditor';
import { AuthContext } from '../Context/firebase';
import {  useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { firestore } from "../../Config/firebase";
import { doc, getDoc } from "@firebase/firestore";
import { useState } from "react";
import Header from '../../Components/Header';
// import SlateEditor from '../Text Editor/Client/TextEditor';
// import CollaborativeEditor from '../Text Editor/Client/TextEditor';
import App from '../Text Editor/Client/TextEditor';


const TextEditorOuter = () => {
  const { user, setUser } = useContext(AuthContext);
  const [userDoc, setUserDoc] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  // if (user === null) history.push("/");
  // if (user === null) navigate('/');
  const Url = window.location.href;
  console.log(Url);

  // Split the URL by '/' and get the last element
  const parts = Url.split("/");
  const lastPart = parts[parts.length - 1];

  console.log("Text after last '/':", lastPart); // Output: F6

  // // Find the index of the '+' symbol
  // const indexOfPlus = Url.lastIndexOf("+");

  // // Extract the text after the '+' symbol
  // const textAfterPlus = Url.substring(indexOfPlus + 1);

  // console.log("Text after '+':", textAfterPlus); // Output: F11

  // const isCollaborativeEditing = id.includes("(CE)");
  const isCollaborativeEditing = Url.includes("(CE)");

  //This component is designed to fetch and display data for a specific document that has already been created in Firestore
  useEffect(() => {
    const getUerDoc = async () => {
      const docRef = doc(
        firestore,
        "userDocs",
        `${user?.uid}`,
        "docs",
        `${id}`
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setUserDoc(docSnap.data());
      // else history.push("/");
      // navigate("/");
    };
    getUerDoc();
  }, [id, user?.uid, navigate]);

  console.log("Document ID:", isCollaborativeEditing);

  return (
    <div className="">
      <Header />
      {/* <TextEditor uid={user?.uid} id={id} /> */}
      {/* <CollaborativeEditor /> */}
      {/* <SlateEditor /> */}
      {/* <App uid={user?.uid} id={id} /> */}

      {isCollaborativeEditing ? (
        <App uid={user?.uid} id={lastPart} /> // Render CE component if id contains "CE"
      ) : (
        <App uid={user?.uid} id={id} /> // Render normal editor component otherwise
      )}
    </div>
  );
}

export default TextEditorOuter
