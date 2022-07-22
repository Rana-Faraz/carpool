import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import Profile from "../screens/Profile";
import { lightModColor } from "../style/Color";
import { headerStyle } from "../style/Style";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: lightModColor.themeBackground,
        headerStyle: headerStyle,
        headerTintColor: lightModColor.headerFontColor,
        headerTitleAlign: "center",
        headerTitle: "Share Ride",
        headerShadowVisible: true,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Group>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: (tabInfo) => {
              return (
                <FontAwesome
                  name="home"
                  size={24}
                  color={
                    tabInfo.focused ? lightModColor.headerBackground : "#4444"
                  }
                />
              );
            },
          }}
        />
      </Tab.Group>
      <Tab.Group>
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: (tabInfo) => {
              return (
                <MaterialCommunityIcons
                  name="account"
                  size={24}
                  color={
                    tabInfo.focused ? lightModColor.themeBackground : "#000"
                  }
                />
              );
            },
          }}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
};

export default TabNavigator;
