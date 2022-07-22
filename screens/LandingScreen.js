import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { btn, btnText, center } from "../style/Style";
import { useNavigation } from "@react-navigation/native";

const LandingScreen = () => {
  const Navigation = useNavigation();
  return (
    <>
      <View style={[center, { height: "50%" }]}>
        <Text>Sign In and get going!</Text>
      </View>
      <View style={[center, { height: "50%" }]}>
        <TouchableOpacity
          style={btn}
          onPress={() => Navigation.navigate("Sign In")}
        >
          <Text style={btnText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default LandingScreen;
