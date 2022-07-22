import {
  Entypo,
  FontAwesome,
  Ionicons,
  Octicons,
  Zocial,
} from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { lightModColor } from "../style/Color";
import { btn, btnText, itemCenter, row } from "../style/Style";

const AvailableRideItems = () => {
  return (
    <View
      style={{
        backgroundColor: "#ffff",
        margin: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
      }}
    >
      <View style={[row]}>
        <View style={[row]}>
          <Image
            source={require("../assets/images.png")}
            style={{ height: 50, width: 50 }}
          />
          <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 15 }}>M Talha Farrukh</Text>
            <Text style={{ fontSize: 15 }}>
              <FontAwesome
                name="car"
                size={15}
                color={lightModColor.themeBackground}
              />{" "}
              Honda/Civic/2020
            </Text>
          </View>
        </View>
        <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Rs.9000</Text>
        </View>
      </View>
      <View style={{ paddingVertical: 10 }}>
        <View style={[row, { justifyContent: "flex-start" }]}>
          <Octicons
            name="dot-fill"
            size={40}
            color={lightModColor.themeBackground}
            // style={{ paddingTop: 4 }}
          />
          <Text style={{ fontSize: 18, paddingLeft: 10, alignSelf: "center" }}>
            Wabdha Town, Thokar, Lahore
          </Text>
        </View>
        <View>
          <Entypo
            name="dots-three-vertical"
            size={20}
            color={lightModColor.themeBackground}
          />
        </View>
        <View style={[row, { justifyContent: "flex-start" }]}>
          <Octicons
            name="dot-fill"
            size={40}
            color={lightModColor.themeBackground}
            // style={{ paddingTop: 4 }}
          />
          <Text style={{ fontSize: 18, paddingLeft: 10, alignSelf: "center" }}>
            Sirinagar Highway, F-9, Islamabad
          </Text>
        </View>
      </View>
      <View
        style={[
          row,
          {
            borderTopColor: "#4444",
            borderTopWidth: 1,
            padding: 10,
            borderBottomColor: "#4444",
            borderBottomWidth: 1,
            padding: 10,
          },
        ]}
      >
        <Text style={{ fontSize: 15 }}>
          <FontAwesome
            name="user-circle"
            size={15}
            color={lightModColor.themeBackground}
          />{" "}
          <FontAwesome
            name="user-circle"
            size={15}
            color={lightModColor.themeBackground}
          />{" "}
          <FontAwesome name="user-circle" size={15} color="gray" /> 2 Seats
        </Text>
        <Text>
          <Zocial name="cal" size={15} color={lightModColor.themeBackground} />{" "}
          20/6/22
        </Text>
        <Text>
          <Ionicons
            name="md-time-outline"
            size={15}
            color={lightModColor.themeBackground}
          />{" "}
          3PM
        </Text>
      </View>
      <View style={[itemCenter, { marginVertical: 10 }]}>
        <TouchableOpacity style={[btn, { padding: 8, width: "100%" }]}>
          <Text style={[btnText]}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AvailableRideItems;
