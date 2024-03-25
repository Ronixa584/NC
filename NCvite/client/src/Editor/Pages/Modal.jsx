// Modal.js
// import React from "react";

const Modal = ({ isOpen, onClose, onSubmit, inputValue, onInputChange }) => {
  return (
    <div  
      className={`fixed inset-0 ${
        isOpen ? "flex" : "hidden"
      } items-center justify-center`}
    >  
      <div className="absolute bg-white p-8 rounded-md shadow-lg">
        <h2 className="text-xl mb-4">Enter the document name:</h2>
        <input
          type="text"
          className="outline-none w-full bg-gray-200 p-3 rounded-md mb-4"
          placeholder="Enter name of the document."
          onChange={(e) => onInputChange(e.target.value)}
          value={inputValue}
        />
        <div className="flex justify-end">
          <button
            className="text-blue-500 mr-4 hover:underline"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={onSubmit}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
              