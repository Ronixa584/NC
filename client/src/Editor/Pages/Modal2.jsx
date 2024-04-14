// import React from "react";

// const Modal2 = ({
//   isOpen,
//   onClose,
//   onCreateRoom,
//   onJoinRoom,
//   createRoomName,
//   joinRoomId,
//   onRoomNameChange,
//   onRoomIdChange,
// }) => {


//   return (
//     <div
//       className={`fixed inset-0 ${
//         isOpen ? "flex" : "hidden"
//       } items-center justify-center`}
//     >
//       <div className="absolute bg-white p-8 rounded-md shadow-lg">
//         <h2 className="text-xl mb-4">Choose an option:</h2>
//         <div className="flex flex-col mb-4">
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2"
//             onClick={onCreateRoom}
//           >
//             Create Room
//           </button>
//           {/* <input
//             type="text"
//             className="outline-none w-full bg-gray-200 p-3 rounded-md mb-2"
//             placeholder="Enter name of the room"
//             value={createRoomName}
//             onChange={(e) => onRoomNameChange(e.target.value)}
//           /> */}

//           <input
//             type="text"
//             className="outline-none w-full bg-gray-200 p-3 rounded-md mb-4"
//             placeholder="Enter name of the document."
//             onChange={(e) => onRoomNameChange(e.target.value)}
//             value={createRoomName}
//           />
//         </div>
//         <div className="flex flex-col">
//           <button
//             className="bg-green-500 text-white px-4 py-2 rounded-md mb-2"
//             onClick={onJoinRoom}
//           >
//             Join Room
//           </button>
//           <input
//             type="text"
//             className="outline-none w-full bg-gray-200 p-3 rounded-md mb-2"
//             placeholder="Enter ID of the room"
//             value={joinRoomId}
//             onChange={(e) => onRoomIdChange(e.target.value)}
//           />
//         </div>
//         <div className="flex justify-end">
//           <button
//             className="text-gray-500 mr-4 hover:underline"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal2;




// Modal.js
// import React from "react";

const Modal2 = ({
  isOpen1,
  onClose1,
  onSubmit1,
  inputValue1,
  onInputChange1,
  inputValue2,
  onInputChange2,
  onClose2,
  onSubmit2,
}) => {
  return (
    <div
      className={`fixed inset-0 ${
        isOpen1 ? "flex" : "hidden"
      } items-center justify-center`}
    >
      <div className="absolute bg-white p-8 rounded-md shadow-lg">
        <h2 className="text-xl mb-4">Enter the Room Name:</h2>
        <input
          type="text"
          className="outline-none w-full bg-gray-200 p-3 rounded-md mb-4"
          placeholder="Enter name of the Room."
          onChange={(e) => onInputChange1(e.target.value)}
          value={inputValue1}
        />

        <div className="flex justify-end">
          <button
            className="text-blue-500 mr-4 hover:underline"
            onClick={onClose1}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={onSubmit1}
          >
            Create
          </button>
        </div>

        <h2 className="text-xl mb-4">Join the Room :</h2>
        <input
          type="text"
          className="outline-none w-full bg-gray-200 p-3 rounded-md mb-4"
          placeholder="Join the Room."
          onChange={(e) => onInputChange2(e.target.value)}
          value={inputValue2}
        />

        <div className="flex justify-end">
          <button
            className="text-blue-500 mr-4 hover:underline"
            onClick={onClose2}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={onSubmit2}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal2;
              