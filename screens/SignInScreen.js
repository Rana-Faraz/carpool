import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { sendSmsVerification } from "../api/verify";
import { CarState } from "../context/CarContext";
import { lightModColor } from "../style/Color";
import { btn, btnText, heading } from "../style/Style";

const SignInScreen = () => {
  const Navigation = useNavigation();
  const { height, width } = Dimensions.get("window");
  const { setUserDoc } = CarState();

  const phoneInput = useRef(null);
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUserDoc(null);
  }, []);

  const sendOTP = () => {
    const isValid = phoneInput.current?.isValidNumber(value);

    if (isValid) {
      Alert.alert(
        "Confirm",
        `Are you sure ${formattedValue} is your phone number?`,
        [
          {
            text: "Yes",
            onPress: () => {
              setIsLoading(true);
              sendSmsVerification(formattedValue)
                .then((sent) => {
                  if (sent) {
                    Navigation.navigate("OTP", { phone: formattedValue });
                  }
                  console.log(sent);
                })
                .catch((err) => {
                  console.log("Error: ", err);
                });
            },
          },
          {
            text: "No",
            onPress: () => console.log("No"),
          },
        ]
      );
    } else {
      Alert.alert("Error", "Enter a valid phone number");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          height,
          backgroundColor: lightModColor.themeBackground,
        }}
      >
        <View style={{ height: "25%", marginHorizontal: "10%" }}>
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 60,
              paddingLeft: 5,
              left: -10,
            }}
            onPress={() => Navigation.goBack()}
          >
            <Ionicons
              name="ios-arrow-back-outline"
              size={35}
              color={lightModColor.headerFontColor}
            />
          </TouchableOpacity>
          <Text style={[heading, { marginTop: "40%" }]}>Sign in</Text>
        </View>
        <View
          style={{
            height: "80%",
            backgroundColor: lightModColor.background,
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
            paddingHorizontal: "10%",
          }}
        >
          <View style={{ marginVertical: 30 }}>
            <Text
              style={[
                heading,
                {
                  color: lightModColor.fontColor,
                  fontSize: 30,
                  marginBottom: 10,
                },
              ]}
            >
              Welcome back
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "MonMedium",
                opacity: 0.5,
              }}
            >
              Please enter your phone number to continue.
            </Text>
          </View>
          <View style={{ marginBottom: 20 }}>
            <PhoneInput
              disabled={isLoading}
              containerStyle={{ width: "100%" }}
              ref={phoneInput}
              defaultValue={value}
              defaultCode="PK"
              layout="first"
              disableArrowIcon
              onChangeText={(text) => {
                setValue(text);
              }}
              onChangeFormattedText={(text) => {
                setFormattedValue(text);
              }}
              countryPickerProps={{ withAlphaFilter: true }}
              autoFocus
            />
          </View>
          <View>
            <TouchableOpacity
              disabled={!formattedValue || isLoading}
              style={[
                btn,
                {
                  opacity: formattedValue ? 1 : 0.5 || isLoading ? 0.5 : 1,
                  alignSelf: "center",
                  marginVertical: 10,
                },
              ]}
              onPress={sendOTP}
            >
              {isLoading ? (
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator
                    style={btnText}
                    size={"small"}
                    color="white"
                  />
                </View>
              ) : (
                <Text style={[btnText, { fontFamily: "MonBold" }]}>
                  Send Code
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* </KeyboardAvoidingView> */}
    </TouchableWithoutFeedback>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({});
