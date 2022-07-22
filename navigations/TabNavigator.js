import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import Profile from "../screens/Profile";
import { lightModColor } from "../style/Color";
import { headerStyle } from "../style/Style";
import GlobalChatScreen from "../screens/GlobalChatScreen";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: lightModColor.themeBackground,
        headerStyle: headerStyle,
        headerTintColor: lightModColor.headerFontColor,
        headerTitleAlign: "center",
        // headerTitle: "Share Ride",
        headerShadowVisible: true,
      }}
    >
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
                  tabInfo.focused ? lightModColor.themeBackground : "#4444"
                }
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Chat"
        component={GlobalChatScreen}
        options={{
          // headerShown: false,
          tabBarIcon: (tabInfo) => {
            return (
              <MaterialCommunityIcons
                name="chat"
                size={24}
                color={
                  tabInfo.focused ? lightModColor.themeBackground : "#4444"
                }
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
