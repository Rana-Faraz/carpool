import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { lightModColor } from "../style/Color";
import StatusBar from "expo-status-bar";

const LoadingScreen = () => {
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={lightModColor.themeBackground} />
      {/* <StatusBar style="inverted" /> */}
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
