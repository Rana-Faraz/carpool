//create a context api for user
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, getDoc } from "firebase/firestore";
import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Text } from "react-native";
import { db } from "../api/firebase";
// import Alert from "../components/Alert";

const CarContext = createContext();

//create a provider for user context
export function UserProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();
  const [userDoc, setUserDoc] = useState(null);

  // const [alert, setalert] = useState(null);
  // const showAlert = (msg, type) => {
  //   setalert({
  //     message: msg,
  //     type: type,
  //   });
  //   setTimeout(() => {
  //     setalert(null);
  //   }, 3000);
  // };

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
      .then((v) => (v ? setUser(JSON.parse(v)) : setUser("")))
      .then(() => setIsLoading(false))
      .catch((e) => console.log(e));
  };

  return (
    <CarContext.Provider
      value={{
        user,
        setUser,
        userDoc,
        setUserDoc,
        isLoading,
        // alert,
        // setalert,
      }}
    >
      {children}
      {/* <Alert alert={alert} /> */}
    </CarContext.Provider>
  );
}

export const CarState = () => {
  return useContext(CarContext);
};
