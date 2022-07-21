import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./navigations/StackNavigator";
import "react-native-gesture-handler";
import { UserProvider } from "./context/CarContext";

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
