import {
  ActivityIndicator,
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { btn, btnText, center } from "../style/Style";
import PhoneInput from "react-native-phone-number-input";
import { useNavigation } from "@react-navigation/native";
import { sendSmsVerification } from "../api/verify";

const SignInScreen = () => {
  const Navigation = useNavigation();
  // const [loaded] = useFonts({
  //   MonLight: require("../assets/fonts/Montserrat-Light.ttf"),
  //   MonRegular: require("../assets/fonts/Montserrat-Regular.ttf"),
  //   MonMedium: require("../assets/fonts/Montserrat-Medium.ttf"),
  //   MonBold: require("../assets/fonts/Montserrat-Bold.ttf"),
  // });
  // if (!loaded) {
  //   return null;
  // }

  const phoneInput = useRef(null);
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
                  console.log(sent);
                  Navigation.navigate("OTP", { phone: formattedValue });
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
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View>
        <View
          style={[center, { height: "50%", justifyContent: "space-evenly" }]}
        >
          <Text style={{ fontFamily: "MonRegular" }}>Enter Phone Number</Text>
          <PhoneInput
            disabled={isLoading}
            containerStyle={{ width: "100%" }}
            ref={phoneInput}
            defaultValue={value}
            defaultCode="PK"
            layout="first"
            onChangeText={(text) => {
              setValue(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            countryPickerProps={{ withAlphaFilter: true }}
            withDarkTheme
            autoFocus
          />
        </View>
        <View style={center}>
          <TouchableOpacity
            disabled={!formattedValue || isLoading}
            style={[
              btn,
              { opacity: formattedValue ? 1 : 0.5 || isLoading ? 0.5 : 1 },
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
              <Text style={btnText}>Send Code</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({});
