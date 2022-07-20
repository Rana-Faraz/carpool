import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { lightModColor } from "../style/Color";
import { btn, btnText, itemCenter } from "../style/Style";

const GetRideScreen = () => {
  const Navigation = useNavigation();

  const [pickUp, setPickUp] = useState();
  const [dropIn, setDropIn] = useState();

  const Data = [
    { label: "Lahore", value: "lahore" },
    { label: "Islamabad", value: "islamabad" },
    { label: "Karachi", value: "karachi" },
    { label: "Faisalabad", value: "faisalabad" },
    { label: "Multan", value: "multan" },
    { label: "Quetta", value: "quetta" },
  ];

  return (
    <View style={[itemCenter, { flex: 1 }]}>
      <View
        style={{
          justifyContent: "space-evenly",
          alignItems: "center",
          height: "50%",
        }}
      >
        <View style={[itemCenter, { flexDirection: "row" }]}>
          <View style={{ width: "25%" }}>
            <MaterialIcons
              name="my-location"
              size={25}
              color={lightModColor.themeBackground}
            />
          </View>
          <View style={{ width: "40%" }}>
            <RNPickerSelect
              placeholder={{ label: "Pick Up" }}
              items={Data}
              onValueChange={(value) => {
                setPickUp(value);
              }}
              style={{
                inputIOS: {
                  transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
                },
                inputAndroid: {
                  transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }],
                },
              }}
            />
          </View>
        </View>
        <Text>To</Text>
        <View style={[itemCenter, { flexDirection: "row", marginBottom: 20 }]}>
          <View style={{ width: "25%" }}>
            <MaterialIcons
              name="location-on"
              size={25}
              color={lightModColor.themeBackground}
            />
          </View>
          <View style={{ width: "40%" }}>
            <RNPickerSelect
              placeholder={{ label: "Drop" }}
              items={Data}
              onValueChange={(value) => {
                setDropIn(value);
              }}
              style={{
                inputAndroid: {
                  transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }],
                },
                inputIOS: {
                  transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
                },
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          style={btn}
          onPress={() =>
            Navigation.navigate("suggession", {
              pickUpLoca: pickUp,
              dropLoca: dropIn,
            })
          }
          disabled={!pickUp || !dropIn}
        >
          <Text style={btnText}>Select Route</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GetRideScreen;

const styles = StyleSheet.create({});
