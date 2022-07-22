import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { CarState } from "../context/CarContext";
import { btn, btnText } from "../style/Style";

const Profile = () => {
  const { user, setUser, userDoc } = CarState();
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
        onPress={() => setUser(null)}
        style={[btn, { alignSelf: "center" }]}
      >
        <Text style={btnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
