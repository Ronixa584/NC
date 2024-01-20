import React from 'react'
import TextEditor from '../Text Editor/Client/TextEditor';
import { AuthContext } from '../Context/firebase';
import {  useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { firestore } from "../../Config/firebase";
import { doc, getDoc } from "@firebase/firestore";
import { useState } from "react";
import Header from './../../Components/Header';

const TextEditorOuter = () => {
  const { user, setUser } = useContext(AuthContext);
  const [userDoc, setUserDoc] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  // if (user === null) history.push("/");
  // if (user === null) navigate('/');

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

  // console.log("Document ID:", user?.uid);

  return (
    <div className="">
      <Header />
      <TextEditor uid={user?.uid} id={id} />
    </div>
  );
}

export default TextEditorOuter
