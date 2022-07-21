import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useRef } from "react";
import { btn, btnText, center } from "../style/Style";
import PhoneInput from "react-native-phone-number-input";
import { useNavigation } from "@react-navigation/native";
import { sendSmsVerification } from "../api/verify";

const SignInScreen = () => {
  const Navigation = useNavigation();

  const phoneInput = useRef(null);
  const [value, setValue] = React.useState("");
  const [formattedValue, setFormattedValue] = React.useState("");

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
          <Text>Enter Phone Number</Text>
          <PhoneInput
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
            disabled={!formattedValue}
            style={[btn, { opacity: formattedValue ? 1 : 0.5 }]}
            onPress={sendOTP}
          >
            <Text style={btnText}>Send Code</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({});
