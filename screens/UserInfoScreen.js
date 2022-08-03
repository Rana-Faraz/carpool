import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
import { FontAwesome5 } from "@expo/vector-icons";
// import { SafeAreaView } from "react-native-safe-area-context";

const UserInfoScreen = () => {
  const Navigation = useNavigation();
  const { user, setUser, userDoc, setUserDoc, showAlert } = CarState();
  const [name, setName] = React.useState("");
  const [gender, setGender] = React.useState("");
  var letters = /^[a-zA-Z\s]*$/;
  const onUpdate = async () => {
    if (name) {
      if (name.match(letters)) {
        const docRef = doc(db, "Users-Data", user);
        updateDoc(docRef, { name: name, gender: gender }).then(
          setUserDoc({
            phone: userDoc.phone,
            name: name,
            gender: gender,
            createdAt: userDoc.createdAt,
          })
        );

        try {
          await AsyncStorage.setItem("user", JSON.stringify(name));
        } catch {
          (err) => console.log(err.message);
        }
      } else {
        showAlert(
          "Name can only contain alphabet characters (A-Z or a-z)",
          "warn"
        );
      }
    } else {
      Alert.alert("Error", "Please enter your name");
    }
  };

  const onMale = () => {
    setGender("Male");
  };
  const onFemale = () => {
    setGender("Female");
    console.log(gender);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
              marginTop: 20,
              marginHorizontal: 30,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
              Name
            </Text>
            <TextInput
              style={{
                borderBottomWidth: 1,
                marginTop: 10,
                borderColor: "white",
                color: "white",
                padding: 10,
                fontSize: 16,
              }}
              onChangeText={(text) => setName(text)}
              value={name}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "white",
                marginTop: 30,
              }}
            >
              Gender
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => onMale()}
                style={{
                  backgroundColor: gender == "Male" ? "#3b8eea" : "#d4d7db",
                  borderRadius: 50,
                  paddingVertical: 10,
                  marginHorizontal: 10,
                  paddingHorizontal: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  width: 150,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      marginRight: 10,
                      fontSize: 16,
                      fontFamily: "MonMedium",
                      color: "white",
                    }}
                  >
                    Male
                  </Text>
                  <FontAwesome5
                    name="male"
                    size={24}
                    color={lightModColor.headerFontColor}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onFemale()}
                style={{
                  backgroundColor: gender == "Female" ? "#ff5efd" : "#d4d7db",
                  borderRadius: 50,
                  paddingVertical: 10,
                  width: 150,
                  marginHorizontal: 10,
                  paddingHorizontal: 20,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      marginRight: 10,
                      fontSize: 16,
                      fontFamily: "MonMedium",
                      color: "white",
                    }}
                  >
                    Female
                  </Text>
                  <FontAwesome5
                    name="female"
                    size={24}
                    color={lightModColor.headerFontColor}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[
                btn,
                {
                  marginTop: 40,
                  backgroundColor: "#FFff",
                  alignSelf: "center",
                  opacity: name == "" || gender == "" ? 0.5 : 1,
                },
              ]}
              onPress={onUpdate}
              disabled={name == "" || gender == ""}
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
    </TouchableWithoutFeedback>
  );
};

export default UserInfoScreen;

const styles = StyleSheet.create({});
