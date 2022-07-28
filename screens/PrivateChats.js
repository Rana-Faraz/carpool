import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import ChatList from "../components/ChatList";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../api/firebase";
import { CarState } from "../context/CarContext";
import LoadingScreen from "./LoadingScreen";

const PrivateChats = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState([]);
  const { user } = CarState();
  useEffect(() => {
    setIsLoading(true);
    const collectionRef = collection(db, "Users-Data", user, "messages");

    const q = query(collectionRef, orderBy("latest", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          number: doc.data().recieverNumber,
          lastMsg: doc.data().lastMsg,
          lastMsgTime: doc.data().lastMsgTime,
          lastMsgBy: doc.data().lastMsgBy,
        }))
      );
      setIsLoading(false);
    });

    console.log(chats);
    return unsub;
  }, []);
  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        chats &&
        chats.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            onPress={() =>
              navigation.navigate("One To One", {
                number: chat.number,
                id: chat.id,
              })
            }
          >
            <ChatList
              name={chat.name}
              lastMsg={chat.lastMsg}
              lastMsgTime={chat.lastMsgTime}
              lastMsgBy={chat.lastMsgBy}
            />
          </TouchableOpacity>
        ))
      )}
    </>
  );
};

export default PrivateChats;
