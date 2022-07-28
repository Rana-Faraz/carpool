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
  const { user, userDoc } = CarState();
  useEffect(() => {
    setIsLoading(true);
    const collectionRef = collection(db, "Users-Data", user, "messages");

    const q = query(collectionRef, orderBy("latest", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          recieverName: doc.data().recieverName,
          senderName: doc.data().senderName,
          recieverNumber: doc.data().recieverNumber,
          senderNumber: doc.data().senderNumber,
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
                name: chat.recieverName,
                number:
                  chat.senderNumber == userDoc.number
                    ? chat.senderNumber
                    : chat.recieverNumber,
                id: chat.id,
              })
            }
          >
            <ChatList
              name={
                chat.recieverName == userDoc.name
                  ? chat.senderName
                  : chat.recieverName
              }
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
