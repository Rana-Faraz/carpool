import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AvailableRideItems from "../components/AvailableRideItems";
import PickandDropForm from "../components/PickandDropForm";
import { lightModColor } from "../style/Color";
import {
  availableRideHeading,
  availableRideLocaBox,
  row,
} from "../style/Style";

const SuggessionScreen = () => {
  //Navigation Properties
  const route = useRoute();
  const { pickUpLoca, dropLoca } = route.params;
  const Navigation = useNavigation();

  //Data object
  let date = new Date();

  return (
    <ScrollView>
      <View>
        <View style={[{ padding: 13, marginTop: 5 }]}>
          <Text style={[availableRideHeading]}>
            {"From " + date.getDate() + " " + "Jul" + " " + date.getFullYear()}
          </Text>
          <PickandDropForm
            pickUpLoca={pickUpLoca}
            dropLoca={dropLoca}
            route={"get"}
          />
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
      </View>
    </ScrollView>
  );
};

export default SuggessionScreen;

const styles = StyleSheet.create({});
