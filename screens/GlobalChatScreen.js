import {
  Alert,
  Dimensions,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { lightModColor } from "../style/Color";
import ChatBubble from "../components/ChatBubble";
import { db } from "../api/firebase";
import { CarState } from "../context/CarContext";
import { SafeAreaView } from "react-native-safe-area-context";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import LoadingScreen from "./LoadingScreen";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const GlobalChatScreen = () => {
  const Navigation = useNavigation();
  const _scrollView = React.useRef(null);
  const { user, userDoc } = CarState();
  const { height, width } = Dimensions.get("window");
  const [show, setShow] = React.useState(false);

  const [text, setText] = React.useState("");
  const [messages, setMessages] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState([]);

  useEffect(() => {
    setIsLoading(true);
    const collectionRef = collection(db, "messages");
    const q = query(collectionRef, orderBy("createdAt", "asc"));

    const unsub = onSnapshot(q, (snapshot) => {
      console.log("snapshot");
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          createdAt: doc.data().createdAt,
          text: doc.data().text,
          name: doc.data().name,
          user: doc.data().sentBy,
          time: doc.data().sentTime,
        }))
      );
      setIsLoading(false);
    });

    // console.log(messages);
    return unsub;
  }, []);

  const onLongPress = (name, id, number) => {
    Alert.alert("Message", "Do you want to message " + name + "?", [
      {
        text: "Yes",
        onPress: () => {
          privateChat(name, id, number);
          Navigation.navigate("One To One", {
            name: name,
            id: id,
            number: number,
          });
        },
      },
      { text: "Cancel" },
    ]);
  };
  useEffect(() => {
    _scrollView.current.scrollToEnd({ animated: true });
  }, [messages]);

  const privateChat = (name, id, number) => {
    var date = new Date();
    var time = date.toLocaleTimeString();
    var H = +time.substr(0, 2);
    var h = H % 12 || 12;
    var ampm = H < 12 || H === 24 ? " AM" : " PM";
    time = h + time.substr(2, 3) + ampm;
    const chatId = user > number ? user + number : number + user;
    const docRef2 = doc(db, "Users-Data", user, "messages", chatId);
    const infoData = {
      name: name,
      senderNumber: user,
      recieverNumber: number,
      latest: serverTimestamp(),
    };
    setDoc(docRef2, infoData);
    const docRef3 = doc(db, "Users-Data", number, "messages", chatId);
    setDoc(docRef3, infoData);
    const docRef = collection(db, "messages", chatId, "privateChats");
    const docData = {
      name: userDoc.name,
      setToName: name,
      chatId: chatId,
      sentBy: user,
      sentTo: number,
      message: "Hi!",
      sentAt: serverTimestamp(),
      time: time,
    };
    getDoc(docRef2).then((doc) => {
      if (doc.data() === undefined) {
        addDoc(docRef, docData);
      }
    });
  };
  const onSend = () => {
    var date = new Date();
    var time = date.toLocaleTimeString();
    var H = +time.substr(0, 2);
    var h = H % 12 || 12;
    var ampm = H < 12 || H === 24 ? " AM" : " PM";
    time = h + time.substr(2, 3) + ampm;

    addDoc(collection(db, "messages"), {
      text: text,
      sentBy: user,
      name: userDoc.name,
      sentTime: time,
      createdAt: serverTimestamp(),
    }).catch((error) => {
      Alert.alert("Error", error.message);
    });
    setText("");
    _scrollView.current.scrollToEnd({ animated: true });
  };
  return (
    <>
      {isLoading && <LoadingScreen />}
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              paddingLeft: 5,
              opacity: 0.5,
              zIndex: 999,
            }}
            onPress={() => Navigation.goBack()}
          >
            <Ionicons name="ios-chevron-back-outline" size={35} color="black" />
          </TouchableOpacity>
          <View
            style={{
              height: "100%",
            }}
          >
            <View style={{ flex: 1, width: "100%" }}>
              <View>
                <View style={{ marginHorizontal: 50, marginVertical: 10 }}>
                  <Text
                    style={{
                      fontWeight: "bold",
                      opacity: 0.5,
                      fontSize: 10,
                      textAlign: "center",
                    }}
                  >
                    All messages sent in this chat will be publicly available
                    for everyone using the app to see.
                  </Text>
                </View>
                <ScrollView
                  onLayout={() =>
                    _scrollView.current.scrollToEnd({ animated: false })
                  }
                  ref={_scrollView}
                  style={{
                    marginBottom: 100,
                  }}
                >
                  {messages &&
                    messages.map((item) => (
                      <Pressable
                        key={item.id}
                        onLongPress={() =>
                          onLongPress(item.name, item.id, item.user)
                        }
                      >
                        <ChatBubble
                          key={item.id}
                          message={item.text}
                          sentTime={item.time}
                          backgroundColor={
                            item.user == user
                              ? lightModColor.themeBackground
                              : "white"
                          }
                          flex={item.user == user ? "flex-end" : "flex-start"}
                          nameColor={"orange"}
                          fontColor={item.user == user ? "white" : "black"}
                          name={
                            item.user === user
                              ? null
                              : item.name
                              ? item.name
                              : item.user
                          }
                        />
                      </Pressable>
                    ))}
                </ScrollView>
              </View>
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginVertical: 5,
                  marginHorizontal: 10,
                }}
              >
                <TextInput
                  style={{
                    height: 40,
                    borderRadius: 20,
                    paddingHorizontal: 10,
                    width: "70%",
                    backgroundColor: "white",
                  }}
                  placeholder="Enter your message"
                  onChangeText={(text) => setText(text)}
                  value={text}
                />
                <TouchableOpacity
                  disabled={text.length == 0}
                  style={{
                    opacity: text.length == 0 ? 0.5 : 1,
                    height: 40,
                    backgroundColor: lightModColor.themeBackground,
                    borderRadius: 20,
                    marginRight: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    width: "20%",
                  }}
                  onPress={onSend}
                >
                  <Text style={{ color: "white" }}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
        <ExpoStatusBar style="dark" animated={true} />
      </SafeAreaView>
    </>
  );
};

export default GlobalChatScreen;

const styles = StyleSheet.create({});
