import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { lightModColor } from "../style/Color";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { btn, btnText } from "../style/Style";

const Home = () => {
  const Navigation = useNavigation();

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <StatusBar style="light" />
      <TouchableOpacity
        style={btn}
        onPress={() => Navigation.navigate("getRide")}
      >
        <Text style={btnText}>Get Ride</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[btn, { marginTop: 20, backgroundColor: "#FFff" }]}
      >
        <Text
          style={
            ([btnText], { color: "#000", textAlign: "center", fontSize: 20 })
          }
        >
          Offer Ride
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
