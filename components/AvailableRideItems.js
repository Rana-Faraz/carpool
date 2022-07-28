import {
  Entypo,
  FontAwesome,
  Ionicons,
  Octicons,
  Zocial,
  FontAwesome5,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { lightModColor } from "../style/Color";
import { btn, btnText, itemCenter, row } from "../style/Style";

const AvailableRideItems = (props) => {
  const Navigation = useNavigation();

  return (
    <View
      key={props.id}
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
            <Text style={{ fontSize: 15 }}>{props.user.name}</Text>
            <Text style={{ fontSize: 15 }}>
              <FontAwesome5
                name="car"
                size={15}
                color={lightModColor.themeBackground}
              />{" "}
              {props.carDetails}
            </Text>
          </View>
        </View>
        <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Rs.{props.price}
          </Text>
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
            {props.pickupDetail}
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
            {props.dropDetail}
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
        <View style={[row, { alignItems: "center" }]}>
          <FontAwesome
            name="user-circle"
            size={15}
            color={props.seats >= 1 ? lightModColor.themeBackground : "gray"}
            style={{ marginRight: 3 }}
          />
          <FontAwesome
            name="user-circle"
            size={15}
            color={props.seats >= 2 ? lightModColor.themeBackground : "gray"}
            style={{ marginRight: 3 }}
          />
          <FontAwesome
            name="user-circle"
            size={15}
            color={
              props.seats > 2 && props.seats === 3
                ? lightModColor.themeBackground
                : "gray"
            }
            style={{ marginRight: 3 }}
          />
          <Text style={{ fontSize: 15 }}>{props.seats} Seats</Text>
        </View>
        <View style={[row, { alignItems: "center" }]}>
          <Zocial
            name="cal"
            size={15}
            color={lightModColor.themeBackground}
            // style={{ alignSelf: "center" }}
          />
          <Text>{" " + props.date}</Text>
        </View>
        <View style={[row, { alignItems: "center" }]}>
          <Ionicons
            name="md-time-outline"
            size={15}
            color={lightModColor.themeBackground}
            // style={{ alignSelf: "center" }}
          />
          <Text>{" " + props.time}</Text>
        </View>
      </View>
      <View style={[itemCenter, row, { marginVertical: 10 }]}>
        <TouchableOpacity
          style={[
            btn,
            { padding: 8, width: "49%", backgroundColor: "#6d7483" },
          ]}
          onPress={() =>
            Navigation.navigate("RideDetails", {
              id: props.id,
              user: props.user,
              carDetails: props.carDetails,
              price: props.price,
              pickup: props.pickup,
              drop: props.drop,
              pickupDetail: props.pickupDetail,
              dropDetail: props.dropDetail,
              seats: props.seats,
              date: props.date,
              time: props.time,
              comments: props.comments,
              createDate: props.createDate,
            })
          }
        >
          <Text style={[btnText]}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[btn, { padding: 8, width: "49%" }]}>
          <Text style={[btnText]}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AvailableRideItems;
