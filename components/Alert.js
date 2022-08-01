import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { lightModColor } from "../style/Color";
import { Entypo } from "@expo/vector-icons";
import { CarState } from "../context/CarContext";

export default function Alert(props) {
  const { setalert } = CarState();

  const capitalized = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return props.alert ? (
    <View
      style={{
        position: "absolute",
        bottom: 20,
        backgroundColor: props.alert.type === "success" ? "green" : "red",
        width: "95%",
        padding: 20,
        //   marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 5,
        alignSelf: "center",
      }}
    >
      <Text
        style={{
          color: "#ffff",
          fontWeight: "bold",
          fontSize: Platform.OS === "android" ? 18 : 20,
        }}
      >
        {capitalized(props.alert.type)}! <Text>{props.alert.message}</Text>
      </Text>
      <TouchableOpacity onPress={() => setalert(null)}>
        <Entypo
          name="cross"
          size={24}
          color="#ffff"
          style={{ paddingHorizontal: 10 }}
        />
      </TouchableOpacity>
    </View>
  ) : null;
}
