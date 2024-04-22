import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./utils/store.jsx"
// import LiveblocksProvider from '@liveblocks/yjs';
import { AuthProvider } from './Editor/Context/firebase.jsx';
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <LiveblocksProvider> */}
    <AuthProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </AuthProvider>
    <ToastContainer />
    {/* </LiveblocksProvider> */}
  </React.StrictMode>
);
