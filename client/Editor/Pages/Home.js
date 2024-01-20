import React from 'react'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from '../Context/firebase';
import Header from "../../Components/Header";
import "../Text Editor/Client/styles.css";
import { firestore } from "../../Config/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Modal from './Modal';
import DocRow from '../Components/DocRow';

const Home = () => {
  const [showModel, setShoModel] = useState(false);
  const [input, setInput] = useState("");
  const [userDoc, setUserDoc] = useState([]); //Document array
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  //   if (user === null) history.push("/login");

  //To create a new document
  const createDoc = async () => {
    // console.log("I'm here");
    if (!input) return;
    setInput("");
    setShoModel(false);

    const docRef = await addDoc(
      collection(firestore, "userDocs", `${user?.uid}`, "docs"),
      {
        name: `${input}`,
        time: serverTimestamp(),
      }
    );
    //   history.push(`/doc/${docRef?.id}`);
    navigate(`/Editor/${docRef?.id}`);
  };

  const closeModal = () => {
    setShoModel(false);
  };

  //It updates the documents(userDoc) with the latest data from the Firestore collection.
  useEffect(() => {
    //onSnapshot provides a way to listen to real-time changes in a Firestore collection.
    const unsub = onSnapshot(
      collection(firestore, "userDocs", `${user?.uid}`, "docs"),
      (snap) => {
        setUserDoc(
          snap.docs?.map((doc) => ({
            id: doc?.id,
            ...doc.data(),
          }))
        );
      }
    );
    return () => unsub();
  }, [user?.uid]);

  return (
    <div>
      <div>
        <Header />
        {/* Old Editor */}
        {/* <Link
          to="/Editor/TextEditor"
          className="text-blue-500 hover:text-blue-700"
        >
          {isTextEditorRoute ? null : (
            <button className="p-2 m-2 px-3 py-1 text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-md rounded-md transition duration-300 ease-in-out">
              Create
            </button>
          )}
        </Link> */}

        {/* {model} */}

        <section
          style={{ background: "#f8f9fa" }}
          className="bg-[#f8f9fa] p-2 w-full mx-auto md:pb-10 md:px-10 "
        >
          <div className="max-w-3xl w-full mx-auto">
            <div className="py-6 flex items-center justify-center">
              <h2 className="text-gray-700">Start a new document</h2>
              <button
                color="gray"
                ripple="dark"
                buttonType="outline"
                iconOnly={true}
                className="border-0"
              ></button>
            </div>
            <div className="flex justify-center">
              <div
                className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700"
                onClick={() => setShoModel(true)}
              >
                <img src="https://links.papareact.com/pju" alt="add-doc" />
                {/* <img alt="add-doc" /> */}
              </div>
            </div>
          </div>
        </section>

        <>
          {showModel ? (
            <>
              <Modal
                isOpen={showModel}
                onClose={closeModal}
                onSubmit={createDoc}
                inputValue={input}
                onInputChange={setInput}
              />
            </>
          ) : (
            <></>
          )}
        </>

        {/* List of documents of particular users */}
        <section className="bg-white w-full md:px-10 md:mb-20">
          <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
            <div className="flex p-4 items-center justify-between">
              <h2 className="font-medium flex-grow">My Document</h2>
              <p className="mr-12">Date Created</p>
              {/* <Icon name="folder" size="3xl" color="gray" /> */}
            </div>
          </div>
          {userDoc.length === 0 ? (
            <div className="w-full text-center py-5">No documents</div>
          ) : (
            ""
          )}
          {userDoc?.map((doc) => (
            <DocRow
              id={doc?.id}
              key={doc?.id}
              fileName={doc?.name}
              date={doc?.time}
            />
          ))}
        </section>
      </div>
    </div>
  );
}

export default Home
