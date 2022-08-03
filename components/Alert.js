import React, { useEffect, useRef } from "react";
import { Animated, Platform, Text, TouchableOpacity, View } from "react-native";
import { lightModColor } from "../style/Color";
import { Entypo } from "@expo/vector-icons";
import { CarState } from "../context/CarContext";

export default function Alert(props) {
  const { setalert } = CarState();

  const capitalized = (word) => {
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const animationFadeOut = () => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      },

      setalert(null)
    ).start();
  };

  return props.alert ? (
    <Animated.View
      style={{
        position: "absolute",
        bottom: 20,
        backgroundColor:
          props.alert.type === "success"
            ? "green"
            : props.alert.type === "warn"
            ? "#dcce80"
            : "red",
        width: "95%",
        padding: 20,
        //   marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 5,
        alignItems: "center",
        alignSelf: "center",
        opacity: fadeAnim,
      }}
    >
      <Text
        style={{
          color: "#ffff",
          fontWeight: "bold",
          fontSize: Platform.OS === "android" ? 18 : 20,
          width: "90%",
        }}
      >
        <Text>{props.alert.message}</Text>
      </Text>
      <TouchableOpacity
        onPress={() => {
          animationFadeOut();
        }}
        style={{ width: "30%" }}
      >
        <Entypo
          name="cross"
          size={24}
          color="#ffff"
          style={{ paddingHorizontal: 10 }}
        />
      </TouchableOpacity>
    </Animated.View>
  ) : null;
}
