//create a context api for user
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { db } from "../api/firebase";

const CarContext = React.createContext();

//create a provider for user context
export function UserProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();
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
  useLayoutEffect(() => {
    asyncUser();
  }, []);
  const asyncUser = () => {
    AsyncStorage.getItem("user")
      .then((v) => (v ? setUser(JSON.parse(v)) : setUser("+923464626166")))
      .then(() => setIsLoading(false))
      .catch((e) => console.log(e));
  };

  console.log(user);
  return (
    <CarContext.Provider
      value={{ user, setUser, userDoc, setUserDoc, isLoading }}
    >
      {children}
    </CarContext.Provider>
  );
}

export const CarState = () => {
  return useContext(CarContext);
};
