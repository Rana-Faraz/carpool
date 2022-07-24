import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { db } from "../api/firebase";
import { CarState } from "../context/CarContext";
import { lightModColor } from "../style/Color";
import { btn, btnText } from "../style/Style";

const Home = () => {
  const Navigation = useNavigation();
  const { user, setUser, setUserDoc, userDoc } = CarState();
  const [data, setData] = React.useState(null);

  useEffect(() => {
    if (userDoc.name == "") {
      Navigation.replace("UserInfo");
    }
  }, [userDoc]);

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <TouchableOpacity
        style={btn}
        onPress={() =>
          Navigation.navigate("getRide", {
            id: "get",
          })
        }
      >
        <Text style={btnText}>Get Ride</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[btn, { marginTop: 20, backgroundColor: "#FFff" }]}
        onPress={() => Navigation.navigate("offerRide")}
      >
        <Text
          style={
            ([btnText], { color: "#000", textAlign: "center", fontSize: 20 })
          }
        >
          Offer Ride
        </Text>
      </TouchableOpacity>

      <StatusBar style="light" animated />
    </View>
  );
};

export default Home;
