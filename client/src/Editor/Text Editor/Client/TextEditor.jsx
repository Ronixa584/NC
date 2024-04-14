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

// // //CE using Quill
// import { useCallback, useEffect, useState } from "react"
// import Quill from "quill"
// import "quill/dist/quill.snow.css"
// import { io } from "socket.io-client"
// import { useParams } from "react-router-dom"
// // import "./styles.css";
// // import "../Client/styles.css"

// const SAVE_INTERVAL_MS = 2000
// const TOOLBAR_OPTIONS = [
//   [{ header: [1, 2, 3, 4, 5, 6, false] }],
//   [{ font: [] }],
//   [{ list: "ordered" }, { list: "bullet" }],
//   ["bold", "italic", "underline"],
//   [{ color: [] }, { background: [] }],
//   [{ script: "sub" }, { script: "super" }],
//   [{ align: [] }],
//   ["image", "blockquote", "code-block"],
//   ["clean"],
// ]

// function TextEditor() {
//   const { id: documentId } = useParams();
//   const [socket, setSocket] = useState();
//   const [quill, setQuill] = useState();

//   // Set up a socket connection after component gets called/mounted.
//   useEffect(() => {
//     const s = io("http://localhost:3001");
//     setSocket(s);

//     // When the component unmounts, cleanup it to avoid memory leak.
//     return () => {
//       s.disconnect();
//     };
//   }, []);

//   // Load the document data from server
//   useEffect(() => {
//     if (socket == null || quill == null) return;

//     socket.once("load-document", (document) => {
//       quill.setContents(document);
//       quill.enable();
//     });

//     socket.emit("get-document", documentId);
//   }, [socket, quill, documentId]);

//   // Periodically save document changes to the server
//   useEffect(() => {
//     if (socket == null || quill == null) return;

//     const interval = setInterval(() => {
//       socket.emit("save-document", quill.getContents());
//     }, SAVE_INTERVAL_MS);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [socket, quill]);

//   // Update the editor when receiving changes from the server
//   useEffect(() => {
//     if (socket == null || quill == null) return;

//     const handler = (delta) => {
//       quill.updateContents(delta);
//     };
//     socket.on("receive-changes", handler);

//     return () => {
//       socket.off("receive-changes", handler);
//     };
//   }, [socket, quill]);

//   // Send changes to the server when the user edits the document
//   useEffect(() => {
//     if (socket == null || quill == null) return;

//     const handler = (delta, oldDelta, source) => {
//       if (source !== "user") return;
//       socket.emit("send-changes", delta);
//     };
//     quill.on("text-change", handler);

//     return () => {
//       quill.off("text-change", handler);
//     };
//   }, [socket, quill]);

//   // Setup Quill Editor
//   const wrapperRef = useCallback((wrapper) => {
//     if (wrapper == null) return;

//     wrapper.innerHTML = "";
//     const editor = document.createElement("div");
//     wrapper.append(editor);
//     const q = new Quill(editor, {
//       theme: "snow",
//       modules: { toolbar: TOOLBAR_OPTIONS },
//     });
//     q.disable();
//     q.setText("Loading...");
//     setQuill(q);
//   }, []);
//   return <div className="container" ref={wrapperRef}></div>;
// }

// export default TextEditor;





//SlateJS Editor with customized Toolbar
// // //SlateJS
// import { useEffect, useMemo, useState,useCallback} from "react";
// import { createEditor, Editor, Transforms,Element } from "slate";
// import { Editable, Slate, withReact } from "slate-react";
// import * as Y from "yjs";
// // import SlateEditor from './TextEditor';
// const initialValue = [
//   {
//     type: "paragraph",
//     children: [{ text: "A line of text in a paragraph." }],
//   },
// ];

// // Define our own custom set of helpers.
// const CustomEditor = {
//   isBoldMarkActive(editor) {
//     const marks = Editor.marks(editor)
//     return marks ? marks.bold === true : false
//   },

//   isCodeBlockActive(editor) {
//     const [match] = Editor.nodes(editor, {
//       match: n => n.type === 'code',
//     })

//     return !!match
//   },

//   toggleBoldMark(editor) {
//     const isActive = CustomEditor.isBoldMarkActive(editor)
//     if (isActive) {
//       Editor.removeMark(editor, 'bold')
//     } else {
//       Editor.addMark(editor, 'bold', true)
//     }
//   },

//   toggleCodeBlock(editor) {
//     const isActive = CustomEditor.isCodeBlockActive(editor)
//     Transforms.setNodes(
//       editor,
//       { type: isActive ? null : 'code' },
//       { match: n => Editor.isBlock(editor, n) }
//     )
//   },
// }

// const SlateEditor = () => {
//    const [editor] = useState(() => withReact(createEditor()));

//    const renderElement = useCallback((props) => {
//      switch (props.element.type) {
//        case "code":
//          return <CodeElement {...props} />;
//        default:
//          return <DefaultElement {...props} />;
//      }
//    }, []);

//    const renderLeaf = useCallback((props) => {
//      return <Leaf {...props} />;
//    }, []);

//    return (
//      // Add a toolbar with buttons that call the same methods.
//      <Slate editor={editor} initialValue={initialValue}>
//        <div>
//          <button
//            onMouseDown={(event) => {
//              event.preventDefault();
//              CustomEditor.toggleBoldMark(editor);
//            }}
//          >
//            Bold
//          </button>
//          <button
//            onMouseDown={(event) => {
//              event.preventDefault();
//              CustomEditor.toggleCodeBlock(editor);
//            }}
//          >
//            Code Block
//          </button>
//        </div>
//        <Editable
//          editor={editor}
//          renderElement={renderElement}
//          renderLeaf={renderLeaf}
//          onKeyDown={(event) => {
//            if (!event.ctrlKey) {
//              return;
//            }

//            switch (event.key) {
//              case "`": {
//                event.preventDefault();
//                CustomEditor.toggleCodeBlock(editor);
//                break;
//              }

//              case "b": {
//                event.preventDefault();
//                CustomEditor.toggleBoldMark(editor);
//                break;
//              }
//            }
//          }}
//        />
//      </Slate>
//    );
// };

// const CodeElement = (props) => {
//   return (
//     <pre {...props.attributes}>
//       <code>{props.children}</code>
//     </pre>
//   );
// };

// const DefaultElement = (props) => {
//   return <p {...props.attributes}>{props.children}</p>;
// };

// const Leaf = props => {
//   return (
//     <span
//       {...props.attributes}
//       style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
//     >
//       {props.children}
//     </span>
//   )
// }

// export default SlateEditor;

// // //SlateJS With Local storage as Database
// import { useEffect, useMemo, useState,useCallback} from "react";
// import { createEditor, Editor, Transforms,Element } from "slate";
// import { Editable, Slate, withReact } from "slate-react";
// import * as Y from "yjs";

// const initialValue = [
//   {
//     type: "paragraph",
//     children: [{ text: "A line of text in a paragraph." }],
//   },
// ];

// const SlateEditor = () => {
//   const [editor] = useState(() => withReact(createEditor()));
//   // Update the initial content to be pulled from Local Storage if it exists.
//   const initialValue = useMemo(
//     () =>
//       JSON.parse(localStorage.getItem("content")) || [
//         {
//           type: "paragraph",
//           children: [{ text: "A line of text in a paragraph." }],
//         },
//       ],
//     []
//   );

//   return (
//     <Slate
//       editor={editor}
//       initialValue={initialValue}
//       onChange={(value) => {
//         const isAstChange = editor.operations.some(
//           (op) => "set_selection" !== op.type
//         );
//         if (isAstChange) {
//           // Save the value to Local Storage.
//           const content = JSON.stringify(value);
//           localStorage.setItem("content", content);
//         }
//       }}
//     >
//       <Editable />
//     </Slate>
//   );
// };

// export default SlateEditor;

// // //SlateJS With CE
// import { useEffect, useMemo, useState, useCallback } from "react";
// import { createEditor, Editor, Transforms, Element } from "slate";
// import { Editable, Slate, withReact } from "slate-react";
// import * as Y from "yjs";
// import LiveblocksProvider from "@liveblocks/yjs";
// // import { RoomProvider, useRoom } from "../liveblocks.config";
// import {
//   RoomProvider,
//   useRoom,
//   useSelf,
// } from "../../../../liveblocks.config.js";
// ("use client");
// import { withCursors, withYjs, YjsEditor } from "@slate-yjs/core";
// // import { RoomProvider } from "./liveblocks.config";
// // import { CollaborativeEditor } from "./CollaborativeEditor";
// import { ClientSideSuspense } from "@liveblocks/react";

// import { Cursors } from "./Cursor.jsx";

// import { doc, setDoc, getDoc } from "@firebase/firestore";
// import { firestore } from "../../../Config/firebase.jsx";

// const initialValue = [
//   {
//     type: "paragraph",
//     children: [{ text: "A line of text in a paragraph." }],
//   },
// ];

// // Define our own custom set of helpers.
// const CustomEditor = {
//   isBoldMarkActive(editor) {
//     const marks = Editor.marks(editor);
//     return marks ? marks.bold === true : false;
//   },

//   isCodeBlockActive(editor) {
//     const [match] = Editor.nodes(editor, {
//       match: (n) => n.type === "code",
//     });

//     return !!match;
//   },

//   toggleBoldMark(editor) {
//     const isActive = CustomEditor.isBoldMarkActive(editor);
//     if (isActive) {
//       Editor.removeMark(editor, "bold");
//     } else {
//       Editor.addMark(editor, "bold", true);
//     }
//   },

//   toggleCodeBlock(editor) {
//     const isActive = CustomEditor.isCodeBlockActive(editor);
//     Transforms.setNodes(
//       editor,
//       { type: isActive ? null : "code" },
//       { match: (n) => Editor.isBlock(editor, n) }
//     );
//   },
// };

// // Join a Liveblocks room and show the editor after connecting
// const App = ({ uid, id }) => {
//   return (
//     <RoomProvider id="my-room-name" initialPresence={{}}>
//       <ClientSideSuspense fallback={<div>Loading…</div>}>
//         {() => <CollaborativeEditor uid={uid} id={id} />}
//       </ClientSideSuspense>
//     </RoomProvider>
//   );
// };

// const CollaborativeEditor = ({ uid, id }) => {
//   const room = useRoom();
//   const [connected, setConnected] = useState(false);
//   const [sharedType, setSharedType] = useState();
//   const [provider, setProvider] = useState();

//   // Connect to your Yjs provider and document
//   useEffect(() => {
//     const yDoc = new Y.Doc();
//     const sharedDoc = yDoc.get("slate", Y.XmlText);

//     // Set up your Liveblocks provider with the current room and document
//     const yProvider = new LiveblocksProvider(room, yDoc);

//     yProvider.on("sync", setConnected);
//     setSharedType(sharedDoc);
//     setProvider(yProvider);

//     return () => {
//       yDoc?.destroy();
//       yProvider?.off("sync", setConnected);
//       yProvider?.destroy();
//     };
//   }, [room]);

//   if (!connected || !sharedType || !provider) {
//     return <div>Loading…</div>;
//   }

//   return (
//     <SlateEditor
//       uid={uid}
//       id={id}
//       sharedType={sharedType}
//       provider={provider}
//     />
//   );
// };

// const SlateEditor = ({ uid, id , sharedType, provider }) => {
//   // const [editor] = useState(() => withReact(createEditor()));

//   // Get user info from Liveblocks authentication endpoint
//   const userInfo = useSelf((self) => self.info);

//   console.log(userInfo);

//   const editor = useMemo(() => {
//     // const e = withReact(withYjs(createEditor(), sharedType));
//     const e = withReact(
//       withCursors(withYjs(createEditor(), sharedType), provider.awareness, {
//         // The current user's name and color
//         // data: {
//         //   name: "Chris",
//         //   color: "##00ff00",
//         // },
//         data: userInfo,
//       })
//     );

//     // Ensure editor always has at least 1 valid child
//     const { normalizeNode } = e;
//     e.normalizeNode = (entry) => {
//       const [node] = entry;

//       if (!Editor.isEditor(node) || node.children.length > 0) {
//         return normalizeNode(entry);
//       }

//       Transforms.insertNodes(editor, initialValue, { at: [0] });
//     };

//     return e;
//   }, []);

//   const renderElement = useCallback((props) => {
//     switch (props.element.type) {
//       case "code":
//         return <CodeElement {...props} />;
//       default:
//         return <DefaultElement {...props} />;
//     }
//   }, []);

//   const renderLeaf = useCallback((props) => {
//     return <Leaf {...props} />;
//   }, []);

//   useEffect(() => {
//     YjsEditor.connect(editor);
//     return () => YjsEditor.disconnect(editor);
//   }, [editor]);

//   //

//       const [editorState, setEditorState] = useState();
//       useEffect(() => {
//         const fetchData = async () => {
//           const docRef = doc(firestore, "userDocs", `${uid}`, "docs", `${id}`);
//           const docSnap = await getDoc(docRef);

//           if (docSnap.exists()) {
//             if (docSnap?.data()?.editorState)
//               setEditorState(
//                 editorState.createWithContent(
//                   convertFromRaw(docSnap.data()?.editorState)
//                 )
//               );
//           }
//         };
//         fetchData();
//       }, [uid, id]);

//   return (
//     // Add a toolbar with buttons that call the same methods.
//     <Slate editor={editor} initialValue={initialValue}>
//       <div>
//         <button
//           onMouseDown={(event) => {
//             event.preventDefault();
//             CustomEditor.toggleBoldMark(editor);
//           }}
//         >
//           Bold
//         </button>
//         <button
//           onMouseDown={(event) => {
//             event.preventDefault();
//             CustomEditor.toggleCodeBlock(editor);
//           }}
//         >
//           Code Block
//         </button>
//       </div>
//       <Cursors>
//         <Editable
//           editor={editor}
//                   editorState={editorState}
//                   // onEditorStateChange={(e) => {
//                   //   setEditorState(e);
//                   //   const docRef = doc(firestore, "userDocs", `${uid}`, "docs", `${id}`);
//                   //   setDoc(
//                   //     docRef,
//                   //     {
//                   //       editorState: convertToRaw(editorState.getCurrentContent()),
//                   //     },
//                   //     { merge: true },
//                   //     (doc) => console.log(doc)
//                   //   );
//                   // }}
//           renderElement={renderElement}
//           renderLeaf={renderLeaf}
//           onKeyDown={(event) => {
//             if (!event.ctrlKey) {
//               return;
//             }

//             switch (event.key) {
//               case "`": {
//                 event.preventDefault();
//                 CustomEditor.toggleCodeBlock(editor);
//                 break;
//               }

//               case "b": {
//                 event.preventDefault();
//                 CustomEditor.toggleBoldMark(editor);
//                 break;
//               }
//             }
//           }}
//         />
//       </Cursors>
//     </Slate>
//   );
// };

// const CodeElement = (props) => {
//   return (
//     <pre {...props.attributes}>
//       <code>{props.children}</code>
//     </pre>
//   );
// };

// const DefaultElement = (props) => {
//   return <p {...props.attributes}>{props.children}</p>;
// };

// const Leaf = (props) => {
//   return (
//     <span
//       {...props.attributes}
//       style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
//     >
//       {props.children}
//     </span>
//   );
// };

// export default App;

//To enable CE remove <Cursor/>

// //https://liveblocks.io/docs/get-started/yjs-slate-react DOCS
// import LiveblocksProvider from "@liveblocks/yjs";
// import { useEffect, useMemo, useState } from "react";
// import { createEditor, Editor, Transforms } from "slate";
// import { Editable, Slate, withReact } from "slate-react";
// import { withYjs, YjsEditor } from "@slate-yjs/core";
// import * as Y from "yjs";
// import { useRoomInfo } from "../../../../liveblocks.config.js";
// import styles from "./CollaborativeEditor.module.css";

// export function CollaborativeEditor() {
//   const room = useRoomInfo();
//   const [connected, setConnected] = useState(false);
//   const [sharedType, setSharedType] = useState();
//   const [provider, setProvider] = useState();

//   // Set up Liveblocks Yjs provider
//   useEffect(() => {
//     const yDoc = new Y.Doc();
//     const yProvider = new LiveblocksProvider(room, yDoc);
//     const sharedDoc = yDoc.get("slate", Y.XmlText);
//     yProvider.on("sync", setConnected);

//     setSharedType(sharedDoc);
//     setProvider(yProvider);

//     return () => {
//       yDoc?.destroy();
//       yProvider?.off("sync", setConnected);
//       yProvider?.destroy();
//     };
//   }, [room]);

//   if (!connected || !sharedType || !provider) {
//     return <div>Loading…</div>;
//   }

//   return <SlateEditor sharedType={sharedType} />;
// }

// // const emptyNode = {
// //   children: [{ text: "" }],
// // };
// const initialValue = [
//   {
//     type: "paragraph",
//     children: [{ text: 'A line of text in a paragraph.' }],
//   },
// ];

// function SlateEditor({ sharedType }) {
//   const editor = useMemo(() => {
//     const e = withReact(withYjs(createEditor(), sharedType));

//     // Ensure editor always has at least 1 valid child
//     const { normalizeNode } = e;
//     e.normalizeNode = (entry) => {
//       const [node] = entry;

//       if (!Editor.isEditor(node) || node.children.length > 0) {
//         return normalizeNode(entry);
//       }

//       Transforms.insertNodes(editor, emptyNode, { at: [0] });
//     };

//     return e;
//   }, [sharedType]);

//   useEffect(() => {
//     console.log("Editor value:", editor); // Debugging statement
//     YjsEditor.connect(editor);
//     return () => YjsEditor.disconnect(editor);
//   }, [editor]);

//   return (
//     <div className={styles.container}>
//       <div className={styles.editorContainer}>
//         <Slate editor={editor} initialValue={initialValue}>
//           <Editable
//             className={styles.editor}
//             placeholder="Start typing here…"
//           />
//         </Slate>
//       </div>
//     </div>
//   );
// }

// export default SlateEditor;

// import { useEffect, useMemo, useState } from "react";
// import { createEditor, Editor, Transforms } from "slate";
// import { Editable, Slate, withReact } from "slate-react";
// import * as Y from "yjs";
// import LiveblocksProvider from "@liveblocks/yjs";
// import { RoomProvider, useRoom } from "../../../../liveblocks.config.js";
// import { ClientSideSuspense } from "@liveblocks/react";
// import { withCursors, withYjs, YjsEditor } from "@slate-yjs/core";
// // import { Cursors } from "./Cursors";
// import { Cursors } from "./Cursor.jsx";
// // import { useRoomInfo } from "../../../../liveblocks.config.js";
// // import styles from "./CollaborativeEditor.module.css";

// // const initialValue = {
// //   children: [{ text: "" }],
// // };
// const initialValue = [{ type: "paragraph", children: [{ text: "" }] }];

// // Join a Liveblocks room and show the editor after connecting
// const App = () => {
//   return (
//     <RoomProvider id="my-room-name" initialPresence={{}}>
//       <ClientSideSuspense fallback={<div>Loading…</div>}>
//         {() => <CollaborativeEditor />}
//       </ClientSideSuspense>
//     </RoomProvider>
//   );
// };

// const CollaborativeEditor = () => {
//   const room = useRoom();
//   const [connected, setConnected] = useState(false);
//   const [sharedType, setSharedType] = useState();
//   const [provider, setProvider] = useState();

//   // Set up your Yjs provider and document
//   useEffect(() => {
//     const yDoc = new Y.Doc();
//     const sharedDoc = yDoc.get("slate", Y.XmlText);

//     // // Set up your Yjs provider. This line of code is different for each provider.
//     // const yProvider = new YjsProvider(/* ... */);
//     // Set up your Liveblocks provider with the current room and document
//     const yProvider = new LiveblocksProvider(room, yDoc);

//     yProvider.on("sync", setConnected);
//     setSharedType(sharedDoc);
//     setProvider(yProvider);

//     return () => {
//       yDoc?.destroy();
//       yProvider?.off("sync", setConnected);
//       yProvider?.destroy();
//     };
//   }, []);

//   if (!connected || !sharedType || !provider) {
//     return <div>Loading…</div>;
//   }

//   return <SlateEditor />;
// };

// const SlateEditor = () => {
//   const [editor] = useState(() => withReact(createEditor()));

//   return (
//     <Slate editor={editor} initialValue={initialValue}>
//       <Cursors>
//         <Editable />
//       </Cursors>
//     </Slate>
//   );
// };






import { useEffect, useMemo, useState, useContext,useCallback } from "react";
import { createEditor, Editor, Transforms } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { withCursors, withYjs, YjsEditor } from "@slate-yjs/core";
import { Cursors } from "./Cursor.jsx";
import * as Y from "yjs";
import LiveblocksProvider from "@liveblocks/yjs";
import {
  RoomProvider,
  useRoom,
  useMyPresence,
  useUpdateMyPresence,
} from "../../../../liveblocks.config.js";
import { ClientSideSuspense } from "@liveblocks/react";
import { doc, setDoc, getDoc } from "@firebase/firestore";
import { firestore } from "../../../Config/firebase.jsx";

// import { useMyPresence } from "./liveblocks.config";
import { AuthContext } from "../../Context/firebase.jsx";
import { Toolbar } from "./Toolbar.jsx";
// const initialValue = {
//   children: [{ text: "" }],
// };
const initialValue = [{ type: "paragraph", children: [{ text: "" }] }];


// Define our own custom set of helpers.
const CustomEditor = {
  isItalicMarkActive(editor) {
    const marks = Editor.marks(editor);
    return marks ? marks["italic"] === true : false;
  },

  isUnderlineMarkActive(editor) {
    const marks = Editor.marks(editor);
    return marks ? marks["underline"] === true : false;
  },

  toggleItalicMark(editor) {
    const isActive = CustomEditor.isItalicMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "italic");
    } else {
      Editor.addMark(editor, "italic", true);
    }
  },

  toggleUnderlineMark(editor) {
    const isActive = CustomEditor.isUnderlineMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "underline");
    } else {
      Editor.addMark(editor, "underline", true);
    }
  },

  isBoldMarkActive(editor, operation) {
    const marks = Editor.marks(editor);
    return marks ? marks[operation] === true : false;
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "code",
    });

    return !!match;
  },

  toggleBoldMark(editor, operation) {
    const isActive = CustomEditor.isBoldMarkActive(editor, operation);
    if (isActive) {
      Editor.removeMark(editor, operation);
    } else {
      Editor.addMark(editor, operation, true);
    }
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "code" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },

  isStrikethroughMarkActive(editor) {
    const marks = Editor.marks(editor);
    return marks ? marks["strikethrough"] === true : false;
  },

  toggleStrikethroughMark(editor) {
    const isActive = CustomEditor.isStrikethroughMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "strikethrough");
    } else {
      Editor.addMark(editor, "strikethrough", true);
    }
  },

  isSuperscriptMarkActive(editor) {
    const marks = Editor.marks(editor);
    return marks ? marks["superscript"] === true : false;
  },

  toggleSuperscriptMark(editor) {
    const isActive = CustomEditor.isSuperscriptMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "superscript");
    } else {
      Editor.addMark(editor, "superscript", true);
    }
  },

  isSubscriptMarkActive(editor) {
    const marks = Editor.marks(editor);
    return marks ? marks["subscript"] === true : false;
  },

  toggleSubscriptMark(editor) {
    const isActive = CustomEditor.isSubscriptMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "subscript");
    } else {
      Editor.addMark(editor, "subscript", true);
    }
  },

  toggleHeading(editor, level) {
    const isActive = CustomEditor.isHeadingActive(editor, level);
    const newType = isActive ? "paragraph" : `heading${level}`;
    Editor.setNodes(editor, { type: newType });
  },

  isHeadingActive(editor, level) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === `heading${level}`,
    });
    return !!match;
  },
};

// Join a Liveblocks room and show the editor after connecting
const App = ({ uid, id }) => {
  const [editorValue, setEditorValue] = useState(null);

  useEffect(() => {
    // Function to fetch data from Firestore and set it as the editor value
    const fetchData = async () => {
      try {
        // setEditorValue(null);
        // Fetch the document from Firestore
        const docRef = doc(firestore, "userDocs", `${uid}`, "docs", `${id}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // If the document exists, extract the editor content and set it as the initial value
          // const content = docSnap.data().editorContent; // Assuming "editorContent" is the field where your editor data is stored
          const content = docSnap?.data()?.editorState; // Assuming "editorContent" is the field where your editor data is stored
          console.log(content);
          setEditorValue(content);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [uid, id]);

  //Just need to make roomid dynamic demo
  // const uidString = uid.toString(); // Using toString() method

  //Here, write if else to choose either between normal editor or CE .
  //For normal editor, id={id}
  //For CE, id={RoomName}
  //Also need to figureout how can someone join this room.At that time we need to share the document url to other user.That is either sending uid and id or need to find another way/mechanism
  //Need to create Editor Toolbar
  //UI Changes and some fixes
  //Additional optiona if possible like open any file, download,share and Notes template design like Notion,evernote,etc

  //ROOMNAME is ID
  //By providing {id} we are creating separate room.This is just a demo.We will update it soon.Now user can create any file and can write inside it with isolation between documents.And also saved at DB
  return (
    <RoomProvider id={id} initialPresence={{ editorValue: editorValue }}>
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        {() => <CollaborativeEditor uid={uid} id={id} />}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

const CollaborativeEditor = ({ uid, id }) => {
  const room = useRoom();
  const [connected, setConnected] = useState(false);
  const [sharedType, setSharedType] = useState();
  const [provider, setProvider] = useState();
  const [myPresence, updateMyPresence] = useMyPresence();
  const { user, setUser } = useContext(AuthContext);
   const updateMyPresence1 = useUpdateMyPresence();

  console.log(user.uid);
  console.log(user.displayName);

  // Set up your Yjs provider and document
  useEffect(() => {
    const yDoc = new Y.Doc();
    const sharedDoc = yDoc.get("slate", Y.XmlText);

    // // Set up your Yjs provider. This line of code is different for each provider.
    // const yProvider = new YjsProvider(/* ... */);
    // Set up your Liveblocks provider with the current room and document
    //const yProvider = new LiveblocksProvider(room, yDoc);
    const yProvider = new LiveblocksProvider(room, yDoc, {
      // userId: user.uid, // Pass the Firebase user ID to Liveblocks
      userId: uid,
    });

    updateMyPresence({ x: 0 });
    updateMyPresence({ y: 0 });

   

    updateMyPresence1({ y: 0 });

    // At the next render, "myPresence" will be equal to "{ x: 0, y: 0 }"

    yProvider.on("sync", setConnected);
    setSharedType(sharedDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.off("sync", setConnected);
      yProvider?.destroy();
    };
  }, []);

  if (!connected || !sharedType || !provider) {
    return <div>Loading…</div>;
  }

  return (
    <SlateEditor
      sharedType={sharedType}
      provider={provider}
      uid={user?.uid}
      id={id}
    />
  );
};

const SlateEditor = ({ sharedType, provider, uid, id }) => {
  const { user, setUser } = useContext(AuthContext);
  const [editorValue, setEditorValue] = useState(null);

  console.log(user.uid);
  console.log(user.displayName);

  const editor = useMemo(() => {
    const e = withReact(
      withCursors(withYjs(createEditor(), sharedType), provider.awareness, {
        // The current user's name and color
        data: {
          name: user?.displayName,
          color: "#00ff00",
        },
      })
    );

    // Ensure editor always has at least 1 valid child
    const { normalizeNode } = e;
    e.normalizeNode = (entry) => {
      const [node] = entry;

      if (!Editor.isEditor(node) || node.children.length > 0) {
        return normalizeNode(entry);
      }

      Transforms.insertNodes(editor, initialValue, { at: [0] });
    };

    return e;
  }, []);

    const renderElement = useCallback((props) => {
      switch (props.element.type) {
        case "code":
          return <CodeElement {...props} />;
        default:
          return <DefaultElement {...props} />;
      }
    }, []);

    const renderLeaf = useCallback((props) => {
      return <Leaf {...props} />;
  }, []);
  
  // const renderLeaf = (props) => {
  //   let style = {
  //     fontWeight: "normal",
  //     fontStyle: "normal",
  //     textDecoration: "none",
  //     verticalAlign: "baseline",
  //   };

  //   if (props.leaf.bold) {
  //     style.fontWeight = "bold";
  //   }

  //   if (props.leaf.italic) {
  //     style.fontStyle = "italic";
  //   }

  //   if (props.leaf.underline) {
  //     style.textDecoration = "underline";
  //   }

  //   if (props.leaf.strikethrough) {
  //     style.textDecoration = "line-through";
  //   }

  //   if (props.leaf.superscript) {
  //     style.verticalAlign = "super";
  //   }

  //   if (props.leaf.subscript) {
  //     style.verticalAlign = "sub";
  //   }

  //     if (props.leaf.heading1) {
  //       // Adjust styles for headings
  //       style.marginTop = "1em"; // Example: Add margin top for headings
  //       style.fontSize = "1.5em"; // Example: Set font size for headings
  //       style.fontWeight = "bold"; // Example: Set font weight for headings
  //     }
  //   return (
  //     <span {...props.attributes} style={style}>
  //       {props.children}
  //     </span>
  //   );
  // };


  useEffect(() => {
    YjsEditor.connect(editor);
    return () => YjsEditor.disconnect(editor);
  }, [editorValue]);

  // // Handle editor changes
  // const handleEditorChange = (newValue) => {
  //   setEditorValue(newValue);
  //   // Update document in Firestore with new editor content
  //   const docRef = doc(firestore, "userDocs", `${uid}`, "docs", `${id}`);
  //   setDoc(
  //     docRef,
  //     {
  //       editorState: newValue,
  //     },
  //     { merge: true }
  //   );
  // };


   const [numPages, setNumPages] = useState(1);

   const addPage = () => {
     setNumPages(numPages + 1);
   };

  
  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      // value={editorValue}
      // EditorState={editorValue}
      // onChange={(newValue) => handleEditorChange(newValue)}
      // onChange={handleEditorChange}
      // onChange={(value) => {
      //   const isAstChange = editor.operations.some(
      //     (op) => "set_selection" !== op.type
      //   );
      //   if (isAstChange) {
      //     // Save the value to Local Storage.
      //     const content = JSON.stringify(value);
      //     localStorage.setItem("content", content);
      //   }
      // }}

      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op) => "set_selection" !== op.type
        );
        if (isAstChange) {
          // Convert the value to a format suitable for Firestore (e.g., JSON)
          const content = JSON.stringify(value);

          // Update the Firestore document with the new editor value
          const docRef = doc(firestore, "userDocs", `${uid}`, "docs", `${id}`);
          setDoc(docRef, { editorValue: content }, { merge: true });
        }
      }}
    >
      {/* <div>
        <Toolbar/>
      </div> */}
      <div className="flex justify-center items-center gap-5 pt-5">
        <button
          className="inline-block bg-gray-200 rounded px-3 py-1 mr-2 border border-blue-400"
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleBoldMark(editor, "bold");
          }}
        >
          Bold
        </button>
        <button
          className="inline-block bg-gray-200 rounded px-3 py-1 mr-2 border border-blue-400"
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleItalicMark(editor);
          }}
        >
          Italic
        </button>
        <button
          className="inline-block bg-gray-200 rounded px-3 py-1 mr-2 border border-blue-400"
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleUnderlineMark(editor);
          }}
        >
          Underline
        </button>

        <button
          className="inline-block bg-gray-200 rounded px-3 py-1 mr-2 border border-blue-400"
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleStrikethroughMark(editor);
          }}
        >
          Strikethrough
        </button>
        <button
          className="inline-block bg-gray-200 rounded px-3 py-1 mr-2 border border-blue-400"
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleSuperscriptMark(editor);
          }}
        >
          Superscript
        </button>
        <button
          className="inline-block bg-gray-200 rounded px-3 py-1 mr-2 border border-blue-400"
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleSubscriptMark(editor);
          }}
        >
          Subscript
        </button>
        {/* 
        <button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleHeading(editor, 1); // Example heading level: 1
          }}
        >
          Heading 1
        </button>
        <button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleHeading(editor, 2); // Example heading level: 2
          }}
        >
          Heading 2
        </button> */}
      </div>
      <Cursors>
        <div className="flex justify-center items-center">
          <fun>
            <Editable
              //className="bg-gray-100 border rounded-md shadow-md text-lg leading-normal outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent p-4 m-4 border-emerald-600 hover:shadow-[2px_-3px_33px_2px_#4299e1] hover:focus:ring-cyan-500"
              className="w-[816px]  p-4 m-4 mt-4 bg-white border border-emerald-800 shadow-md rounded-md text-lg leading-normal outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent hover:shadow-[2px_-3px_33px_2px_#4299e1]"
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              onKeyDown={(event) => {
                if (!event.ctrlKey) {
                  return;
                }

                switch (event.key) {
                  case "`": {
                    event.preventDefault();
                    CustomEditor.toggleCodeBlock(editor);
                    break;
                  }

                  case "b": {
                    event.preventDefault();
                    CustomEditor.toggleBoldMark(editor);
                    break;
                  }
                }
              }}
            />
          </fun>
        </div>

        {/* {[...Array(numPages)].map((_, index) => (
          <div key={index} className="flex justify-center items-center">
            <fun>
              <Editable
                className="w-[816px]  p-4 m-4 mt-4 bg-white border border-emerald-800 shadow-md rounded-md text-lg leading-normal outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent hover:shadow-[2px_-3px_33px_2px_#4299e1]"
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={(event) => {
                  if (!event.ctrlKey) {
                    return;
                  }

                  switch (event.key) {
                    case "`": {
                      event.preventDefault();
                      CustomEditor.toggleCodeBlock(editor);
                      break;
                    }

                    case "b": {
                      event.preventDefault();
                      CustomEditor.toggleBoldMark(editor);
                      break;
                    }
                  }
                }}
              />
            </fun>
          </div>
        ))}
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={addPage}
          >
            Add Page
          </button>
        </div> */}
      </Cursors>
    </Slate>
  );
};



const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const Leaf = (props) => {
  let style = {
    fontWeight: "normal",
    fontStyle: "normal",
    textDecoration: "none",
  };

  if (props.leaf.bold) {
    style.fontWeight = "bold";
  }

  if (props.leaf.italic) {
    style.fontStyle = "italic";
  }

  if (props.leaf.underline) {
    style.textDecoration = "underline";
  }

   if (props.leaf.strikethrough) {
     style.textDecoration = "line-through";
   }

   if (props.leaf.superscript) {
     style.verticalAlign = "super";
   }

   if (props.leaf.subscript) {
     style.verticalAlign = "sub";
   }

  //  // Check if it's a heading and adjust styles accordingly
  //  if (props.element.type.startsWith("heading")) {
  //    style.marginTop = "1em"; // Example: Add margin top for headings
  //    style.fontSize = "1.5em"; // Example: Set font size for headings
  //    style.fontWeight = "bold"; // Example: Set font weight for headings
  //  }

  return (
    <span {...props.attributes} style={style}>
      {props.children}
    </span>
  );
};


export default App;

