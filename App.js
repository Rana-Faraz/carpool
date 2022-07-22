import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./navigations/StackNavigator";
import "react-native-gesture-handler";
import { CarState, UserProvider } from "./context/CarContext";
import OTPScreen from "./screens/OTPScreen";
import UserInfoScreen from "./screens/UserInfoScreen";
import { useState } from "react";

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
