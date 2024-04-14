import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import ReactDOM, { createRoot } from "react-dom/client";
import Body from "./Components/Body";
import Editor from "./Editor/index";
import OCR from "./OCR/OCR.jsx"
import VideoTranscription from "./VideoTranscription/VideoTranscription";
// import Error from "./src/Components/Error";
// import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Editor/Context/firebase";
import TextEditorOuter from "./Editor/Pages/TextEditorOuter";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/Editor" element={<Editor />} />
        <Route path="/Editor/:id" element={<TextEditorOuter />} />
        <Route path="/Editor(CE)/:id/:id" element={<TextEditorOuter />} />
        <Route path="/OCR" element={<OCR />} />
        <Route path="/VideoTranscription" element={<VideoTranscription />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
