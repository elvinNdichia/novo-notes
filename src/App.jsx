import { useEffect, useState } from "react";
import { Root } from "./components/Root";
import { SignIn } from "./components/SignIn";
import { auth, provider } from "./firebase-config";
import { signInWithPopup } from "firebase/auth";
import { db } from "./firebase-config";
import React from "react";

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

// User Context
const UserContext = React.createContext();

function App() {
  const [userData, setUserData] = useState({
    email: "",
    displayName: "",
    photoURL: "",
    uid: "",
  });

  // SignIn
  const signIn = async () => {
    try {
      signInWithPopup(auth, provider).then((data) => {
        const { email, displayName, photoURL, uid } = data.user;
        setUserData({ ...userData, email, displayName, photoURL, uid });
        localStorage.setItem("userData", JSON.stringify(data.user));
      });
    } catch (e) {
      console.log("Error Signing in: ", e);
    }
  };

  // If userData is in localstorage, this puts it in useState
  useEffect(() => {
    const jsonString = localStorage.getItem("userData");
    if (jsonString) {
      const parsedData = JSON.parse(localStorage.getItem("userData"));
      setUserData(parsedData);
    }
  }, []);

  console.log(userData);

  return (
    <>
      <UserContext.Provider value={userData}>
        {userData.email ? <Root /> : <SignIn signIn={signIn} />}
      </UserContext.Provider>
    </>
  );
}

export { UserContext };
export default App;
