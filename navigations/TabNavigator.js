import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import Profile from "../screens/Profile";
import { lightModColor } from "../style/Color";
import { headerStyle } from "../style/Style";
import GlobalChatScreen from "../screens/GlobalChatScreen";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const Navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => Navigation.navigate("Chat")}
                style={{ paddingHorizontal: 20 }}
              >
                <Ionicons name="chatbubbles-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          );
        },
        tabBarActiveTintColor: lightModColor.themeBackground,
        headerStyle: headerStyle,
        headerTintColor: lightModColor.headerFontColor,
        headerTitleAlign: "center",
        // headerTitle: "Share Ride",
        headerShadowVisible: true,
        tabBarHideOnKeyboard: true,
        tabBarVisibilityAnimationConfig: {
          hide: {
            config: {
              duration: 0,
            },
          },
          show: {
            config: {
              duration: 0,
            },
          },
        },
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
    </Tab.Navigator>
  );
};

export default TabNavigator;
