import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { CarState } from "../context/CarContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { btn, btnText } from "../style/Style";

const Profile = () => {
  const { user, setUser, userDoc, setUserDoc } = CarState();
  const deleteItem = () => {
    AsyncStorage.removeItem("user")
      .then(() => setUser(null))
      .catch((e) => console.log(e));
  };
  return (
    <View style={{ height: "100%" }}>
      <View
        style={{
          height: "20%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../assets/images.png")}
          style={{ height: 100, width: 100, borderRadius: 50 }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Name: </Text>
        <Text style={{ fontSize: 20 }}>{userDoc.name}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Number: </Text>
        <Text style={{ fontSize: 20 }}>{userDoc.phone}</Text>
      </View>
      <TouchableOpacity
        onPress={deleteItem}
        style={[btn, { alignSelf: "center" }]}
      >
        <Text style={btnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
