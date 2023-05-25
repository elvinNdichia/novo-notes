// Right here is the brain of the application
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { UserContext } from "../App";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  doc,
  serverTimestamp,
  query,
  where,
  getDoc,
  setDoc,
} from "firebase/firestore";

const BrainContext = React.createContext();

function BrainProvider({ children }) {
  const notesCollectionRef = collection(db, "novo-notes");
  const user = React.useContext(UserContext);

  const { uid } = user;

  // State for tracking the loading of the notes
  const [loading, setLoading] = useState(true);

  // The notes of the application are stored here
  const [notes, setNotes] = useState([]);
  // Get the notes
  const getNotes = async () => {
    try {
      const q = query(collection(db, "novo-notes"), where("uid", "==", uid));
      const unsub = onSnapshot(q, (querySnapshot) => {
        const filteredData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setNotes(filteredData);
        setLoading(false);
      });
    } catch (e) {
      console.log("Error Loading data: ", e);
    }
  };

  /* The code BELOW creates notes for new users */

  const createNotesIfNew = async () => {
    // check if there is existing data on this users id in the
    // collection novo-notes-users if not, create notes and their data
    const collectionRef = collection(db, "novo-notes-users");
    const docRef = doc(db, "novo-notes-users", uid);
    const notesCollectionRef = collection(db, "novo-notes");
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      // Do nothing since this user is not new
    } else {
      try {
        const data = { time: serverTimestamp() };
        const customId = uid;
        await setDoc(doc(collectionRef, customId), data);
      } catch (err) {
        console.error("Error adding data of new user: ", err);
      }
      try {
        await addDoc(notesCollectionRef, {
          uid,
          title: "Algorithmic Adventures",
          body: "A quest through the enchanted realm of algorithms and data structures. Here, you'll unravel the secrets of efficiency, logic, and computational magic. Whether you're traversing trees, sorting arrays, or solving complex puzzles, get ready to embark on a journey where every line of code holds the potential for enlightenment",
          time: serverTimestamp(),
        });
      } catch (err) {
        console.error("Error adding note for new user: ", err);
      }
      try {
        await addDoc(notesCollectionRef, {
          uid,
          title: "Debugging Diaries",
          body: "Welcome to the Debugging Diaries, a chronicle of the adventures in squashing bugs and unraveling mysteries. As a programmer, you are a digital detective, hunting down elusive errors and solving puzzles in the code. Get ready to sharpen your analytical skills and become a master bug hunter!",
          time: serverTimestamp(),
        });
      } catch (err) {
        console.error("Error adding note for new user: ", err);
      }
    }
  };

  /* The code ABOVE creates notes for new users */

  // Here is where I store what is currently in the SearchBar
  const [search, setSearch] = useState("");

  //++++++ Create a new note +++++++++
  const submitNote = async ({ title, body }) => {
    try {
      await addDoc(notesCollectionRef, {
        uid,
        title,
        body,
        time: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error with adding the todo", err);
    }
  };

  //---- DELETE note -------
  const deleteNote = async (id) => {
    try {
      const noteDoc = doc(notesCollectionRef, id);
      await deleteDoc(noteDoc);
    } catch (err) {
      console.log("Error deleting: ", err);
    }
  };
  //+++--- Create a new note +++---
  const updateNote = async ({ title, body, id }) => {
    try {
      const noteDoc = doc(notesCollectionRef, id);
      await updateDoc(noteDoc, { title, body });
    } catch (err) {
      console.error("Error with updating the todo", err);
    }
  };

  return (
    <BrainContext.Provider
      value={{
        notes,
        getNotes,
        createNotesIfNew,
        search,
        setSearch,
        loading,
        submitNote,
        deleteNote,
        updateNote,
      }}
    >
      {children}
    </BrainContext.Provider>
  );
}

export { BrainContext, BrainProvider };
