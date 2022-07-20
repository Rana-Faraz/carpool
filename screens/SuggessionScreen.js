import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Zocial } from "@expo/vector-icons";
import {
  availableRideHeading,
  availableRideLocaBox,
  btn,
  btnText,
  itemCenter,
  row,
} from "../style/Style";
import { MaterialIcons } from "@expo/vector-icons";
import { lightModColor } from "../style/Color";
import { Octicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import AvailableRideItems from "../components/AvailableRideItems";
import { ScrollView } from "react-native-gesture-handler";

const SuggessionScreen = () => {
  //Navigation Properties
  const route = useRoute();
  const { pickUpLoca, dropLoca } = route.params;
  const Navigation = useNavigation();

  //   //Dynamic Header title
  //   Navigation.setOptions({
  //     headerTitle: "Available Ride",
  //   });

  //Data object
  let date = new Date();

  return (
    <ScrollView>
      <View>
        <View style={[{ padding: 13, marginTop: 5 }]}>
          <Text style={[availableRideHeading]}>
            {"From " + date.getDate() + " " + "Jul" + " " + date.getFullYear()}
          </Text>
          <View style={[row, availableRideLocaBox]}>
            <MaterialIcons
              name="my-location"
              size={20}
              color={lightModColor.themeBackground}
            />
            <Text style={{ marginLeft: 10, textTransform: "capitalize" }}>
              {pickUpLoca}
            </Text>
          </View>
          <View style={[row, availableRideLocaBox]}>
            <MaterialIcons
              name="location-on"
              size={20}
              color={lightModColor.themeBackground}
            />
            <Text style={{ marginLeft: 10, textTransform: "capitalize" }}>
              {dropLoca}
            </Text>
          </View>
        </View>

        <View style={[row, { paddingVertical: 10, paddingHorizontal: 20 }]}>
          <Text style={[availableRideHeading]}>Avaiable Rides</Text>
          <TouchableOpacity style={[row]}>
            <FontAwesome
              name="sort"
              size={25}
              color={lightModColor.themeBackground}
            />
            <Text
              style={[
                availableRideHeading,
                { color: lightModColor.themeBackground },
              ]}
            >
              Filter
            </Text>
          </TouchableOpacity>
        </View>
        <AvailableRideItems />
        <AvailableRideItems />
        <AvailableRideItems />
        <AvailableRideItems />
        <AvailableRideItems />
      </View>
    </ScrollView>
  );
};

export default SuggessionScreen;

const styles = StyleSheet.create({});
