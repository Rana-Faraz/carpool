import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import SelectDropdown from "react-native-select-dropdown";
import { lightModColor } from "../style/Color";
import { btn, btnText, dropDownStyle, itemCenter } from "../style/Style";

const GetRideScreen = () => {
  const Navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  const [pickUp, setPickUp] = useState();
  const [dropIn, setDropIn] = useState();

  // ************** Casecading Drop Down Logic ***************

  const pickupDropDown = [
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Karachi",
    "Faisalabad",
    "Gujranwala",
    "Sialkot",
    "Sheikhupura",
    "Okara",
    "Pattoki",
    "Kasur",
    "Multan",
    "Peshawar",
    "Quetta",
  ];
  const dropinDropDown = [
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Karachi",
    "Faisalabad",
    "Gujranwala",
    "Sialkot",
    "Sheikhupura",
    "Okara",
    "Pattoki",
    "Kasur",
    "Multan",
    "Peshawar",
    "Quetta",
  ];
  const [pickDropValue, setPickDropValue] = useState(pickupDropDown);
  const [dropDropValue, setDropDropValue] = useState(dropinDropDown);

  const handlePickup = () => {
    return pickupDropDown.filter((loc) => loc !== dropIn);
  };
  const handleDropin = () => {
    return dropinDropDown.filter((loc) => loc !== pickUp);
  };

  useLayoutEffect(() => {
    setPickDropValue(handlePickup);
  }, [dropIn]);

  useLayoutEffect(() => {
    setDropDropValue(handleDropin);
  }, [pickUp]);

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
          <View style={{ width: "70%" }}>
            <SelectDropdown
              data={pickDropValue}
              buttonStyle={dropDownStyle}
              buttonTextStyle={{ fontSize: 15 }}
              // dropdownStyle={{ height: "70%" }}
              dropdownIconPosition="left"
              // defaultValue={pickUp}
              renderDropdownIcon={() => (
                <MaterialIcons
                  name="my-location"
                  size={20}
                  color={lightModColor.themeBackground}
                />
              )}
              onSelect={(text) => setPickUp(text)}
            />
          </View>
        </View>
        <Text>To</Text>
        <View style={[itemCenter, { flexDirection: "row", marginBottom: 20 }]}>
          <View style={{ width: "70%" }}>
            <SelectDropdown
              data={dropDropValue}
              buttonStyle={dropDownStyle}
              buttonTextStyle={{ fontSize: 15 }}
              // dropdownStyle={{ height: "50%" }}
              dropdownIconPosition="left"
              // defaultValue={dropIn}
              renderDropdownIcon={() => (
                <MaterialIcons
                  name="location-on"
                  size={20}
                  color={lightModColor.themeBackground}
                />
              )}
              onSelect={(text) => setDropIn(text)}
            />
          </View>
        </View>
        <TouchableOpacity
          style={[btn, { opacity: !pickUp || !dropIn ? 0.5 : 1 }]}
          onPress={() =>
            id === "get"
              ? Navigation.navigate("suggession", {
                  pickUpLoca: pickUp,
                  dropLoca: dropIn,
                })
              : Navigation.navigate("offerRide", {
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
