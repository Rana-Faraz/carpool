//create a context api for user
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../api/firebase";

const CarContext = React.createContext();

//create a provider for user context
export function UserProvider({ children }) {
  const [user, setUser] = useState("+923464626166");
  const [userDoc, setUserDoc] = useState(null);

  useEffect(() => {
    if (user) {
      const docRef = doc(db, "Users-Data", user);
      getDoc(docRef)
        .then((snapshot) => {
          if (snapshot.exists) {
            setUserDoc(snapshot.data());
          } else {
            console.log("No doc found");
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [user]);
  const asyncUser = () => {
    AsyncStorage.getItem("user")
      .then((v) => (v ? setUser(v) : setUser("")))
      .catch((e) => console.log(e));
  };

  return (
    <CarContext.Provider value={{ user, setUser, userDoc, setUserDoc }}>
      {children}
    </CarContext.Provider>
  );
}

export const CarState = () => {
  return useContext(CarContext);
};
