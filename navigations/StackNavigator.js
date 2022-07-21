import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import TabNavigator from "./TabNavigator";
import GetRideScreen from "../screens/GetRideScreen";
import { headerStyle } from "../style/Style";
import SuggessionScreen from "../screens/SuggessionScreen";
import LandingScreen from "../screens/LandingScreen";
import SignInScreen from "../screens/SignInScreen";
import OTPScreen from "../screens/OTPScreen";
import { CarState } from "../context/CarContext";

const Stack = createStackNavigator();

const authStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Sign In" component={SignInScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
    </Stack.Navigator>
  );
};

const appStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="root" component={TabNavigator} />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen
          name="getRide"
          component={GetRideScreen}
          options={{
            headerTitle: "Select Route",
            headerStyle: headerStyle,
            headerTintColor: "#ffff",
          }}
        />
        <Stack.Screen
          name="suggession"
          component={SuggessionScreen}
          options={{
            headerTitle: "Available Ride",
            headerStyle: headerStyle,
            headerTintColor: "#ffff",
            // headerTitleStyle: {
            //   fontSize: 17,
            // },
            headerTitleAlign: "center",
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const StackNavigator = () => {
  const { user } = CarState();

  return user ? appStack() : authStack();
};

export default StackNavigator;

const styles = StyleSheet.create({});
