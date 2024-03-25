import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../../../Config/firebase";
import { AuthContext } from "../../Context/firebase";

const DowRow = ({ id, fileName, date }) => {
  const [showModel, setShowModel] = useState(false);
  const toggle = () => setShowModel(!showModel);
  const { user } = useContext(AuthContext);

  const deleteDocument = async (id) => {
    try {
      const docRef = doc(firestore, "userDocs", `${user?.uid}`, "docs", id);
      if (docRef) {
        deleteDoc(docRef);
        setShowModel(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex max-w-3xl mx-auto items-center p-4 rounded-lg hover:bg-gray-300 cursor-pointer text-gray-700 text-sm">
        <Link to={`/Editor/${id}`} className="flex items-center w-full">
          <p className="flex-grow pl-5 pr-10">{fileName}</p>
          <p className="pr-5 text-sm truncate">{`${date
            ?.toDate()
            ?.toDateString("en-US")} at ${date
            ?.toDate()
            ?.toLocaleTimeString("en-US")}`}</p>
        </Link>
        <button
          className="border-0 block bg-gray-200 hover:bg-gray-300 rounded-full p-2 focus:outline-none"
          onClick={() => setShowModel(true)}
        >
          Delete
        </button>
      </div>

      {showModel && (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-auto max-w-sm mx-auto my-6">
            <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">Delete Document</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={toggle}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    
                  </span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                  Do you really want to delete this document?
                </p>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => deleteDocument(id)}
                >
                  Yes
                </button>
                <button
                  className="bg-gray-200 text-gray-700 active:bg-gray-300 uppercase font-bold px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => setShowModel(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DowRow;

