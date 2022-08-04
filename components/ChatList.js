import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { CarState } from "../context/CarContext";
import { lightModColor } from "../style/Color";

const ChatList = (props) => {
  const { user, userDoc } = CarState();
  return (
    <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* <Image
            source={require("../assets/images.png")}
            style={{ borderRadius: 50, height: 45, width: 45 }}
          /> */}
          <FontAwesome name="user-circle" size={45} color="#eea47fff" />

          <View
            style={{
              paddingLeft: 10,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: lightModColor.fontColor,
              }}
            >
              {props.name}
            </Text>
            <Text style={{ fontSize: 12, opacity: 0.6 }}>
              {props.lastMsgBy == userDoc.phone
                ? "You: " + props.lastMsg
                : props.lastMsg}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 12, opacity: 0.6 }}>
            {props.lastMsgTime}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ChatList;
