import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import TabNavigator from "./TabNavigator";
import GetRideScreen from "../screens/GetRideScreen";
import { headerStyle } from "../style/Style";
import SuggessionScreen from "../screens/SuggessionScreen";
import OfferRideScreen from "../screens/OfferRideScreen";

const StackNavigator = () => {
  const Stack = createStackNavigator();

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
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="offerRide"
          component={OfferRideScreen}
          options={{
            headerTitle: "Offer Ride",
            headerStyle: headerStyle,
            headerTintColor: "#ffff",
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
