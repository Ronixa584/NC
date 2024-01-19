// //Editor using draft.js
// import { useEffect, useState } from "react";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { Editor } from "react-draft-wysiwyg";
// import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
// import { doc, setDoc, getDoc } from "@firebase/firestore";
// import { firestore } from "../../config/firebase";
// import Header from "../../../Components/Header";

// const TextEditor = ({ uid, id }) => {
//     const [editorState, setEditorState] = useState(EditorState.createEmpty());
//     useEffect(() => {
//       const fetchData = async () => {
//         const docRef = doc(firestore, "userDocs", `${uid}`, "docs", `${id}`);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           if (docSnap?.data()?.editorState)
//             setEditorState(
//               EditorState.createWithContent(
//                 convertFromRaw(docSnap.data()?.editorState)
//               )
//             );
//         }
//       };
//       fetchData();
//     }, [uid, id]);

//   return (
//     <div className="bg-[#f9f8fa] min-h-screen pb-16">
//       <Header />
//       <Editor
//         editorState={editorState}
//         onEditorStateChange={(e) => {
//           setEditorState(e);
//           const docRef = doc(firestore, "userDocs", `${uid}`, "docs", `${id}`);
//           setDoc(
//             docRef,
//             {
//               editorState: convertToRaw(editorState.getCurrentContent()),
//             },
//             { merge: true },
//             (doc) => console.log(doc)
//           );
//         }}
//         toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto !border-0 !border-b-2 !border-[#ccc] shadow-md"
//         editorClassName="mt-6 bg-white p-5 shadow-lg min-h-[1300px] max-w-5xl mx-auto mb-12 border-2 rounded-sm border-gray-300"
//         editorStyle={{ minHeight: "1300px" }}
//       />
//     </div>
//   );
// };

// export default TextEditor;










//CE using Quill
import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { io } from "socket.io-client"
import { useParams } from "react-router-dom"

const SAVE_INTERVAL_MS = 2000
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  // [{ table: [] }], // Add this line for the table option
  ["clean"],
]

function TextEditor() {
  const { id: documentId } = useParams()
  const [socket, setSocket] = useState()
  const [quill, setQuill] = useState()

  useEffect(() => {
    const s = io("http://localhost:3001")
    setSocket(s)

    return () => {
      s.disconnect()
    }
  }, [])

  useEffect(() => {
    if (socket == null || quill == null) return

    socket.once("load-document", document => {
      quill.setContents(document)
      quill.enable()
    })

    socket.emit("get-document", documentId)
  }, [socket, quill, documentId])

  useEffect(() => {
    if (socket == null || quill == null) return

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents())
    }, SAVE_INTERVAL_MS)

    return () => {
      clearInterval(interval)
    }
  }, [socket, quill])

  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = delta => {
      quill.updateContents(delta)
    }
    socket.on("receive-changes", handler)

    return () => {
      socket.off("receive-changes", handler)
    }
  }, [socket, quill])

  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return
      socket.emit("send-changes", delta)
    }
    quill.on("text-change", handler)

    return () => {
      quill.off("text-change", handler)
    }
  }, [socket, quill])

  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return

    wrapper.innerHTML = ""
    const editor = document.createElement("div")
    wrapper.append(editor)
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    })
    q.disable()
    q.setText("Loading...")
    setQuill(q)
  }, [])
  return <div className="container" ref={wrapperRef}></div>
}

export default TextEditor;
