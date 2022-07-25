import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { lightModColor } from "../style/Color";
import { btn, btnText } from "../style/Style";
import { CarState } from "../context/CarContext";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../api/firebase";
import { useNavigation } from "@react-navigation/native";
// import { SafeAreaView } from "react-native-safe-area-context";

const UserInfoScreen = () => {
  const Navigation = useNavigation();
  const { user, setUser, userDoc, setUserDoc } = CarState();
  const [name, setName] = React.useState("");
  const onUpdate = async () => {
    if (name) {
      const docRef = doc(db, "Users-Data", user);
      updateDoc(docRef, { name: name }).then(
        setUserDoc({ phone: userDoc.phone, name: name })
      );

      try {
        await AsyncStorage.setItem("user", JSON.stringify(name));
      } catch {
        (err) => console.log(err.message);
      }
    } else {
      Alert.alert("Error", "Please enter your name");
    }
  };

  return (
    <View
      style={{
        height: "100%",
        backgroundColor: lightModColor.themeBackground,
      }}
    >
      <SafeAreaView>
        <Text
          style={{
            textAlign: "center",
            marginTop: 20,

            fontSize: 24,
            fontWeight: "bold",
            color: "white",
          }}
        >
          Update Info
        </Text>
        <View
          style={{
            marginHorizontal: 30,
            height: "70%",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
            Name
          </Text>
          <TextInput
            style={{
              borderBottomWidth: 1,
              marginTop: 20,
              borderColor: "white",
              color: "white",
              padding: 10,
              fontSize: 16,
            }}
            onChangeText={(text) => setName(text)}
            value={name}
          />
          <TouchableOpacity
            style={[
              btn,
              { marginTop: 40, backgroundColor: "#FFff", alignSelf: "center" },
            ]}
            onPress={onUpdate}
          >
            <Text
              style={[
                btnText,
                { fontSize: 18, fontWeight: "bold", color: "black" },
              ]}
            >
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default UserInfoScreen;

const styles = StyleSheet.create({});
