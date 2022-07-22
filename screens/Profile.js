import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { CarState } from "../context/CarContext";
import { btn, btnText } from "../style/Style";

const Profile = () => {
  const { user, setUser } = CarState();
  return (
    <View>
      <Text>Profile</Text>
      <TouchableOpacity onPress={() => setUser(null)} style={btn}>
        <Text style={btnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
