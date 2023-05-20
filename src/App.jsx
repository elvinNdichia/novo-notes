import { useEffect, useState } from "react";
import { Root } from "./components/Root";
import { SignIn } from "./components/SignIn";
import { auth, provider } from "./firebase-config";
import { signInWithPopup } from "firebase/auth";
import { db } from "./firebase-config";
import React from "react";
import { BrainProvider } from "./helpers/BrainContext";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  doc,
  query,
  where,
  serverTimestamp,
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
  const notesCollectionRef = collection(db, "novo-notes");
  // SignIn
  const signIn = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      const { email, displayName, photoURL, uid } = data.user;

      // I want to add new notes for first time users.
      console.log("Here is the data: ", data);
      if (data.user.email) {
        if (
          data.user.additionalUserInfo &&
          data.user.additionalUserInfo.isNewUser
        ) {
          console.log("Dis one na  new user oo");
          // Add two new notes
          try {
            addDoc(notesCollectionRef, {
              uid,
              title: "Green Gigabytes",
              body: "Computing can be greener than you think. Did you know data centers are being powered by renewable energy? Just imagine, your latest email might have been sent by the sun!",
              time: serverTimestamp(),
            });
          } catch (err) {
            console.error("Error with adding the todo", err);
          }
          try {
            addDoc(notesCollectionRef, {
              uid,
              title: "Alien Encounter",
              body:
                "Met a Martian today." +
                " They love peanut butter!" +
                "They're bad at basketball." +
                " Left in a shiny spaceship." +
                "Mars needs peanut butter?",
              time: serverTimestamp(),
            });
          } catch (err) {
            console.error("Error with adding the todo", err);
          }
          try {
            addDoc(notesCollectionRef, {
              uid,
              title: "Data Diet",
              body: "Want to trim the digital fat? Think before you store. Remember, data storage also consumes energy. Go on a data diet today!",
              time: serverTimestamp(),
            });
          } catch (err) {
            console.error("Error with adding the todo", err);
          }
        }
      } else console.log("Dis one no be new user oo");

      //
      setUserData({ ...userData, email, displayName, photoURL, uid });
      localStorage.setItem("userData", JSON.stringify(data.user));
    } catch (e) {
      console.log("Error Signing in: ", e);
      // This works but should be improved
      alert("Error signing in. Please verify your connection and try again");
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
        <BrainProvider>
          {userData.email ? <Root /> : <SignIn signIn={signIn} />}
        </BrainProvider>
      </UserContext.Provider>
    </>
  );
}

export { UserContext };
export default App;
