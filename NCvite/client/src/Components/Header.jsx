
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Images/Logo.png";
import bgimg from "../assets/Images/background.png";
//Persistant Auth
import { auth, provider } from "../Config/firebase";
// import { signInWithPopup } from "firebase/auth";
import useAuth from "../utils/useAuth";
import { signOut } from "@firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../Editor/Context/firebase";

const Header = () => {
  const { isLoggedIn, userName, login, logout } = useAuth();

  const { user, setUser } = useContext(AuthContext);
  
  console.log(user);

  return (
    <header
      className="font-mono block p-4 md:h-28 md:flex justify-between items-center bg-cover bg-center w-full h-auto"
      style={{ backgroundImage: `url(${bgimg})` }}
    >
      <div className="flex items-center justify-center m-5">
        <img src={logo} alt="Note Craft" className="h-24 p-2 lg:ml-8" />
      </div>
      <div className="flex items-center justify-center m-5">
        <ul className="block  space-x-4 md:flex justify-between items-center">
          <Link to="/">
            <li className="group transition-all duration-300 ease-in-out text-white flex items-center justify-center text-xl mx-3 cursor-pointer">
              <span class="bg-left-bottom bg-gradient-to-r   from-teal-400 to-purple-600 bg-[length:0%_3px] bg-no-repeat group-hover:bg-[length:100%_3px] transition-all duration-500 ease-out">
                Home
              </span>
            </li>
          </Link>
          <Link to="/Editor">
            <li className="group transition-all duration-300 ease-in-out text-white flex items-center justify-center text-xl mx-3 cursor-pointer">
              <span class="bg-left-bottom bg-gradient-to-r  from-teal-400 to-purple-600 bg-[length:0%_3px] bg-no-repeat group-hover:bg-[length:100%_3px] transition-all duration-500 ease-out">
                Editor
              </span>
            </li>
          </Link>
          <Link to="/VideoTranscription">
            <li className="group transition-all duration-300 ease-in-out text-white flex items-center justify-center text-xl mx-3 cursor-pointer">
              <span class="bg-left-bottom bg-gradient-to-r  from-teal-400 to-purple-600 bg-[length:0%_3px] bg-no-repeat group-hover:bg-[length:100%_3px] transition-all duration-500 ease-out">
                Transcribe
              </span>
            </li>
          </Link>
          <Link to="/OCR">
            <li className="group transition-all duration-300 ease-in-out text-white flex items-center justify-center text-xl mx-3 cursor-pointer">
              <span class="bg-left-bottom bg-gradient-to-r  from-teal-400 to-purple-600 bg-[length:0%_3px] bg-no-repeat group-hover:bg-[length:100%_3px] transition-all duration-500 ease-out">
                OCR
              </span>
            </li>
          </Link>
        </ul>
      </div>
      {/* <div> */}
      {/* <ul className="flex items-center justify-center m-5">
          <li>
            <button
              type="button"
              data-te-animation-init
              data-te-animation-start-ref
              data-te-ripple-init
              data-te-ripple-color="light"
              class="text-xl mr-4 rounded bg-[#440044] px-6 py-2.5 font-medium leading-tight text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#7b007b] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-[#05966f] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-[#3566b6] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            >
              Sign In
            </button>
          </li>
        </ul> */}
      <div className="space-x-4 flex items-center justify-center m-5">
        <ul className="flex space-x-4 items-center justify-center m-5">
          {isLoggedIn ? (
            <>
              {/* <span className="text-gray-600 font-semibold">
                Welcome, {userName}
              </span>
              <button
                onClick={logout}
                className="px-3 py-1 text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-md rounded-md transition duration-300 ease-in-out"
              >
                SIGN UP
              </button> */}
              <img
                src={user?.photoURL}
                alt={user?.displayName}
                title={user?.displayName}
                className="cursor-pointer h-12 w-12 rounded-full m-auto"
                onClick={() => {
                  signOut(auth);
                  setUser(null);
                }}
              />
            </>
          ) : (
            // <button
            //   onClick={login}
            //   className="px-3 py-1 text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-md rounded-md transition duration-300 ease-in-out"
            // >
            //   SIGN IN
            // </button>
            <button
              type="button"
              onClick={login}
              data-te-animation-init
              data-te-animation-start-ref
              data-te-ripple-init
              data-te-ripple-color="light"
              class="text-xl mr-4 rounded bg-[#440044] px-6 py-2.5 font-medium leading-tight text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#b3487f] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-[#386bc0] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-[#3566b6] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
            >
              Sign In
            </button>
          )}
        </ul>
      </div>
      {/* </div> */}
    </header>
  );
};

export default Header;








// //NEW Authentication using Email and Password
// import  { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import logo from "../assets/Images/Logo.png";
// import bgimg from "../assets/Images/background.png";
// import { auth } from "../Config/firebase";

// export const Header = () => {
//   const [userName, setUserName] = useState(null);

//   // console.log("Header rendering");
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       // console.log(user);
//       if (user != null) {
//         // console.log(user.displayName);
//         if (!user.displayName) {
//           await user.reload();
//         }
//         setUserName(user.displayName);
//       } else {
//         setUserName(null);
//       }
//     });

//     return () => {
//       unsubscribe();
//     };
//   });

//   const handleClick = () => {
//     // console.log("log out");
//     auth.signOut();
//     // setUser(null);
//   };

//   return (
//     <header
//       className="font-mono block p-4 md:h-28 md:flex justify-between items-center bg-cover bg-center w-full h-auto"
//       style={{ backgroundImage: `url(${bgimg})` }}
//     >
//       <div className="flex items-center justify-center m-5">
//         <img src={logo} alt="Note Craft" className="h-24 p-2 lg:ml-8" />
//       </div>
//       <div className="flex items-center justify-center m-5">
//         <ul className="block  space-x-4 md:flex justify-between items-center">
//           <Link to="/">
//             <li className="group transition-all duration-300 ease-in-out text-white flex items-center justify-center text-xl mx-3 cursor-pointer">
//               <span className="bg-left-bottom bg-gradient-to-r   from-teal-400 to-purple-600 bg-[length:0%_3px] bg-no-repeat group-hover:bg-[length:100%_3px] transition-all duration-500 ease-out">
//                 Home
//               </span>
//             </li>
//           </Link>
//           <Link to="/Editor">
//             <li className="group transition-all duration-300 ease-in-out text-white flex items-center justify-center text-xl mx-3 cursor-pointer">
//               <span className="bg-left-bottom bg-gradient-to-r  from-teal-400 to-purple-600 bg-[length:0%_3px] bg-no-repeat group-hover:bg-[length:100%_3px] transition-all duration-500 ease-out">
//                 Editor
//               </span>
//             </li>
//           </Link>
//           <Link to="/VideoTranscription">
//             <li className="group transition-all duration-300 ease-in-out text-white flex items-center justify-center text-xl mx-3 cursor-pointer">
//               <span className="bg-left-bottom bg-gradient-to-r  from-teal-400 to-purple-600 bg-[length:0%_3px] bg-no-repeat group-hover:bg-[length:100%_3px] transition-all duration-500 ease-out">
//                 Transcribe
//               </span>
//             </li>
//           </Link>
//           <Link to="/OCR">
//             <li className="group transition-all duration-300 ease-in-out text-white flex items-center justify-center text-xl mx-3 cursor-pointer">
//               <span className="bg-left-bottom bg-gradient-to-r  from-teal-400 to-purple-600 bg-[length:0%_3px] bg-no-repeat group-hover:bg-[length:100%_3px] transition-all duration-500 ease-out">
//                 OCR
//               </span>
//             </li>
//           </Link>
//         </ul>
//       </div>

//       <div className="flex items-center">
//         {!userName ? (
//           <Link to="/Signup">
//             {" "}
//             <button
//               type="button"
//               data-te-animation-init
//               data-te-animation-start-ref
//               data-te-ripple-init
//               data-te-ripple-color="light"
//               className="text-xl mr-4 rounded bg-[#440044] px-6 py-2.5 font-medium leading-tight text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#b3487f] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-[#386bc0] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-[#3566b6] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
//             >
//               Login
//             </button>
//           </Link>
//         ) : (
//           <button
//             type="button"
//             onClick={() => handleClick()}
//             data-te-animation-init
//             data-te-animation-start-ref
//             data-te-ripple-init
//             data-te-ripple-color="light"
//             className="text-xl mr-4 rounded bg-[#440044] px-6 py-2.5 font-medium leading-tight text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-[#b3487f] hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-[#386bc0] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-[#3566b6] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
//           >
//             {userName}
//           </button>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;

