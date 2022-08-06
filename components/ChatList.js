import { View, Text, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { lightModColor } from "../style/Color";
import { CarState } from "../context/CarContext";
import { Octicons } from "@expo/vector-icons";

const ChatList = (props) => {
  const { user, userDoc } = CarState();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f4f4f4",
      }}
    >
      {props.lastMsgSeen === false && (
        <Octicons
          name="dot-fill"
          size={24}
          color={lightModColor.themeBackground}
          style={{ position: "absolute", right: 0, alignSelf: "center" }}
        />
      )}
      <View style={{ marginVertical: 10, width: "90%" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../assets/images.png")}
              style={{ borderRadius: 50, height: 45, width: 45 }}
            />
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
    </View>
  );
};

export default ChatList;
