import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { checkVerification } from "../api/verify";
import { CarState } from "../context/CarContext";
import { btn, btnText, center } from "../style/Style";
import { useNavigation } from "@react-navigation/native";
import { db } from "../api/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightModColor } from "../style/Color";
import { get } from "react-native/Libraries/Utilities/PixelRatio";

const OTPScreen = ({ route, navigation }) => {
  const Navigation = useNavigation();
  const { setUser } = CarState();
  const { phone } = route.params;
  const [invalidCode, setInvalidCode] = React.useState(false);

  const createDocument = async () => {
    const myDoc = doc(db, "Users-Data", phone);
    const docData = {
      phone: phone,
      createdAt: serverTimestamp(),
      name: "",
      email: "",
      image: "",
    };
    getDoc(myDoc)
      .then((snapshot) => {
        if (snapshot.exists) {
          console.log("Document data:", snapshot.data());
        } else {
          addDoc(myDoc, docData);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });

    try {
      await AsyncStorage.setItem("user", JSON.stringify(phone));
    } catch {
      (err) => console.log(err.message);
    }
  };

  function verifyOTP(phone, code) {
    checkVerification(phone, code)
      .then((success) => {
        if (!success) setInvalidCode(true);
        else {
          createDocument();
          setUser(phone);
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
    <SafeAreaView>
      <View style={center}>
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
      <View style={center}>
        <Text>
          A verificaiton code was just sent to {phone}. if this is not your
          number please click the button bellow to change your number.
        </Text>
      </View>
      <View style={[center, { marginTop: 20 }]}>
        <TouchableOpacity style={btn} onPress={() => Navigation.goBack()}>
          <Text style={btnText}>Change Number</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    borderColor: lightModColor.themeBackground,
  },
});
