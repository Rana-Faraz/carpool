import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Home from "../screens/Home";
import TabNavigator from "./TabNavigator";
import GetRideScreen from "../screens/GetRideScreen";
import { headerStyle } from "../style/Style";
import SuggessionScreen from "../screens/SuggessionScreen";
import OfferRideScreen from "../screens/OfferRideScreen";
import LandingScreen from "../screens/LandingScreen";
import SignInScreen from "../screens/SignInScreen";
import OTPScreen from "../screens/OTPScreen";
import { Ionicons } from "@expo/vector-icons";
import { CarState } from "../context/CarContext";
import GlobalChatScreen from "../screens/GlobalChatScreen";
import { useNavigation } from "@react-navigation/native";
import UserInfoScreen from "../screens/UserInfoScreen";
import LoadingScreen from "../screens/LoadingScreen";

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
  const Navigation = useNavigation();
  const { user, setUser, setUserDoc, userDoc } = CarState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userDoc) {
      setIsLoading(true);
    } else if (userDoc) {
      setIsLoading(false);
    }

    console.log(userDoc);
  }, [userDoc]);

  return (
    <Stack.Navigator>
      {isLoading ? (
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ headerShown: false }}
        />
      ) : userDoc.name == "" ? (
        <Stack.Group
          screenOptions={{
            presentation: "transparentModal",
            gestureEnabled: true,
            ...TransitionPresets.ModalPresentationIOS,
          }}
        >
          <Stack.Screen
            name="UserInfo"
            component={UserInfoScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Group>
      ) : (
        <>
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="root" component={TabNavigator} />
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              headerRight: () => {
                return (
                  <View>
                    <TouchableOpacity
                      onPress={() => Navigation.navigate("Chat")}
                      style={{ paddingHorizontal: 20 }}
                    >
                      <Ionicons
                        name="chatbubbles-outline"
                        size={24}
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                );
              },
            }}
          >
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
          <Stack.Group
            screenOptions={{
              gestureEnabled: true,
              ...TransitionPresets.SlideFromRightIOS,
            }}
          >
            <Stack.Screen
              name="Chat"
              component={GlobalChatScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
};

const StackNavigator = () => {
  const { user } = CarState();

  return user ? appStack() : authStack();
};

export default StackNavigator;

const styles = StyleSheet.create({});
