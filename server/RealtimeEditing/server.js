const { firestore } = require("../Config/firebase")
const { doc, getDoc,setDoc,updateDoc} = require("@firebase/firestore");


const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:1234",
    methods: ["GET", "POST"],
  },
})

const defaultValue = ""

io.on('connection', socket => {
  socket.on('get-document', async documentId => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);
    socket.emit('load-document', document.data);

    socket.on('send-changes', delta => {
      socket.broadcast.to(documentId).emit('receive-changes', delta);
    });

    socket.on('save-document', async data => {
      await saveDocument(documentId, data);
    });
  });
});

async function findOrCreateDocument(id) {
  if (id == null) return;

  const documentRef = doc(firestore, 'documents', id);
  const documentSnap = await getDoc(documentRef);

  if (documentSnap.exists()) {
    return documentSnap.data();
  } else {
    await setDoc(documentRef, { data: defaultValue });
    return { data: defaultValue };
  }
}

async function saveDocument(id, data) {
  const documentRef = doc(firestore, 'documents', id);
  await updateDoc(documentRef, { data });
}
