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
  query,
  where,
} from "firebase/firestore";

const BrainContext = React.createContext();

function BrainProvider({ children }) {
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

  return (
    <BrainContext.Provider
      value={{ notes, getNotes, search, setSearch, loading }}
    >
      {children}
    </BrainContext.Provider>
  );
}

export { BrainContext, BrainProvider };
