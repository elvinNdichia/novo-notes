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
      console.log("Done adding");
    } catch (err) {
      console.error("Error with adding the todo", err);
    }
  };

  //++++++ DELETE note +++++++++
  const deleteNote = async (id) => {
    try {
      const todoDoc = doc(notesCollectionRef, id);
      deleteDoc(todoDoc);
    } catch (err) {
      console.log("Error deleting: ", err);
    }
  };

  return (
    <BrainContext.Provider
      value={{
        notes,
        getNotes,
        search,
        setSearch,
        loading,
        submitNote,
        deleteNote,
      }}
    >
      {children}
    </BrainContext.Provider>
  );
}

export { BrainContext, BrainProvider };
