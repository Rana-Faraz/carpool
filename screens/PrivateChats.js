import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
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
import { useNavigation } from "@react-navigation/native";
import { lightModColor } from "../style/Color";

const PrivateChats = () => {
  const navigation = useNavigation();
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
        <View style={{ marginTop: 30 }}>
          <ActivityIndicator
            size="large"
            color={lightModColor.themeBackground}
          />
        </View>
      ) : (
        chats &&
        chats.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            onPress={() =>
              navigation.navigate("One To One", {
                name:
                  chat.senderName == userDoc.name
                    ? chat.recieverName
                    : chat.senderName,
                number:
                  chat.senderNumber == userDoc.phone
                    ? chat.recieverNumber
                    : chat.senderNumber,
                id: chat.id,
              })
            }
          >
            <ChatList
              name={
                chat.senderName == userDoc.name
                  ? chat.recieverName
                  : chat.senderName
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
