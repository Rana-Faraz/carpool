import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { UserProvider } from "./context/CarContext";
import StackNavigator from "./navigations/StackNavigator";

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
