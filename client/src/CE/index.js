import Quill from "quill";
import QuillCursors from "quill-cursors";

Quill.register("modules/cursors", QuillCursors);

const quill = new Quill(document.querySelector("#editor"), {
  modules: {
    cursors: true,
    toolbar: [
      // adding some basic Quill content features
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      ["image", "code-block"],
    ],
    history: {
      // Local undo shouldn't undo changes
      // from remote users
      userOnly: true,
    },
  },
  placeholder: "Start collaborating...",
  theme: "snow", // 'bubble' is also great
});


import * as Y from "yjs";
import { QuillBinding } from "y-quill";

// A Yjs document holds the shared data
const ydoc = new Y.Doc();
// Define a shared text type on the document
const ytext = ydoc.getText("quill");

// Create an editor-binding which
// "binds" the quill editor to a Y.Text type.
const binding = new QuillBinding(ytext, quill);