import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
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

const GlobalChatScreen = () => {
  const { height, width } = Dimensions.get("window");
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={"height"}
      keyboardVerticalOffset={90}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1, width: "100%" }}>
          {/* <Text>isuacbsjbcs</Text> */}
          <View
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TextInput
              style={{
                borderWidth: 2,
                height: 40,
                width: "85%",
                backgroundColor: "red",
              }}
              placeholder="Enter your message"
            />
            <TouchableOpacity
              style={{
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                width: "15%",
              }}
            >
              <Text>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default GlobalChatScreen;

const styles = StyleSheet.create({});
