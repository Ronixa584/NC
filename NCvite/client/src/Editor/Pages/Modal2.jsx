import React from "react";

const Modal2 = ({
  isOpen,
  onClose,
  onCreateRoom,
  onJoinRoom,
  createRoomName,
  joinRoomId,
  onRoomNameChange,
  onRoomIdChange,
}) => {


  return (
    <div
      className={`fixed inset-0 ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center`}
    >
      <div className="absolute bg-white p-8 rounded-md shadow-lg">
        <h2 className="text-xl mb-4">Choose an option:</h2>
        <div className="flex flex-col mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2"
            onClick={onCreateRoom}
          >
            Create Room
          </button>
          <input
            type="text"
            className="outline-none w-full bg-gray-200 p-3 rounded-md mb-2"
            placeholder="Enter name of the room"
            value={createRoomName}
            onChange={(e) => onRoomNameChange(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md mb-2"
            onClick={onJoinRoom}
          >
            Join Room
          </button>
          <input
            type="text"
            className="outline-none w-full bg-gray-200 p-3 rounded-md mb-2"
            placeholder="Enter ID of the room"
            value={joinRoomId}
            onChange={(e) => onRoomIdChange(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="text-gray-500 mr-4 hover:underline"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal2;
