import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { checkVerification } from "../api/verify";
import { CarState } from "../context/CarContext";

const OTPScreen = ({ route, navigation }) => {
  const { setUser } = CarState();

  const { phone } = route.params;
  const [invalidCode, setInvalidCode] = React.useState(false);

  function verifyOTP(phone, code) {
    checkVerification(phone, code)
      .then((success) => {
        if (!success) setInvalidCode(true);
        else {
          setUser(phone);
          navigation.navigate("root");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (invalidCode) {
      Alert.alert("Invalid Code", "Enter the OTP sent to your phone number");
    }
  }, [invalidCode]);

  return (
    <View>
      <View>
        <Text>Enter Code</Text>
        <OTPInputView
          style={{ width: "80%", height: 200 }}
          pinCount={6}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(code) => {
            verifyOTP(phone, code);
          }}
        />
      </View>
      <Text>{phone}</Text>
    </View>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: "black",
    fontSize: 20,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});
