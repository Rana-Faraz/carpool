import { View, Text } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ActiveTripScreen from "../screens/MyTrip/ActiveTripScreen";
import HistoryScreen from "../screens/MyTrip/HistoryScreen";
import { headerStyle } from "../style/Style";

export default function TopTabNavigator() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: headerStyle,
        tabBarLabelStyle: {
          color: "#ffff",
        },
      }}
    >
      <Tab.Group>
        <Tab.Screen
          name="ActiveTrip"
          component={ActiveTripScreen}
          options={{
            tabBarIndicatorStyle: {
              marginLeft: 17,
              backgroundColor: "#ffff",
              width: "45%",
            },
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          options={{
            tabBarIndicatorStyle: {
              marginRight: 15,
              backgroundColor: "#ffff",
              width: "45%",
            },
          }}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
}
