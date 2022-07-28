import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import MapView from "react-native-maps";
import { GOOGLE_MAPS_APIKEY } from "@env";
import MapViewDirections from "react-native-maps-directions";
import { lightModColor } from "../../style/Color";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Zocial,
  FontAwesome5,
  Octicons,
  Entypo,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import {
  availableRideHeading,
  btn,
  btnText,
  itemCenter,
  row,
} from "../../style/Style";
import { useNavigation, useRoute } from "@react-navigation/native";

const RideDetailsScreen = () => {
  const Navigation = useNavigation();
  const route = useRoute();
  const {
    id,
    user,
    carDetails,
    price,
    pickupDetail,
    dropDetail,
    pickup,
    drop,
    seats,
    date,
    time,
    comments,
    createDate,
  } = route.params;

  const origin = {
    latitude: 31.5204,
    longitude: 74.3587,
    latitudeDelta: 0.0722,
    longitudeDelta: 0.0421,
  };
  const destination = {
    latitude: 31.0249,
    longitude: 73.8479,
    latitudeDelta: 0.0722,
    longitudeDelta: 0.0421,
  };
  const key = "AIzaSyDxGlhtwYGWKCxulLrJYL4zWWcK0-RR3XA";
  return (
    <View>
      {/* <View
        style={[
          row,
          {
            justifyContent: "space-around",
            position: "absolute",
            top: 60,
            zIndex: 10,
            width: "100%",
          },
        ]}
      >
        <MaterialIcons
          name="my-location"
          size={30}
          color={lightModColor.themeBackground}
        />
        <View style={{ flexDirection: "row" }}>
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={30}
            color={lightModColor.themeBackground}
          />
        </View>
        <MaterialIcons
          name="location-on"
          size={30}
          color={lightModColor.themeBackground}
        />
      </View> */}
      <View style={{ flexDirection: "row" }}>
        <MapView
          initialRegion={origin}
          style={{
            height: 250,
            width: "50%",
            backgroundColor: lightModColor.themeBackground,
          }}
          mapType="terrain"
          scrollEnabled={false}
          zoomEnabled={false}
          cacheEnabled={true}
        >
          {/* <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={key}
        /> */}
        </MapView>
        <MapView
          initialRegion={destination}
          style={{ height: 250, width: "50%" }}
          mapType="terrain"
          scrollEnabled={false}
          zoomEnabled={false}
          cacheEnabled={true}
        >
          {/* <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={key}
        /> */}
        </MapView>
      </View>
      <View
        //   key={props.id}
        style={{
          backgroundColor: "#ffff",
          marginHorizontal: 10,
          paddingHorizontal: 10,
          paddingVertical: 15,
          borderRadius: 10,
        }}
      >
        <View style={[row, { marginTop: 5 }]}>
          <View style={{ width: "40%" }}>
            <Text
              style={[
                availableRideHeading,
                { fontSize: 25, marginBottom: 0, textAlign: "auto" },
              ]}
            >
              {pickup}
            </Text>
          </View>
          <View style={{ width: "40%" }}>
            <Text
              style={[
                availableRideHeading,
                { fontSize: 25, marginBottom: 0, textAlign: "right" },
              ]}
            >
              {drop}
            </Text>
          </View>
        </View>
        <View style={[row, { alignItems: "center", marginBottom: 5 }]}>
          <View style={{ width: "45%" }}>
            <Text style={{ fontSize: 18 }}>{pickupDetail}</Text>
          </View>
          <View style={{ width: "11%" }}>
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={30}
              color={lightModColor.themeBackground}
              style={{ textAlign: "center" }}
            />
          </View>
          <View style={{ width: "45%" }}>
            <Text style={{ fontSize: 18, textAlign: "right" }}>
              {dropDetail}
            </Text>
          </View>
        </View>

        {/* <View style={{ paddingVertical: 0 }}>
          <View style={[row, { justifyContent: "flex-start" }]}>
            <Octicons
              name="dot-fill"
              size={40}
              color={lightModColor.themeBackground}
              // style={{ paddingTop: 4 }}
            />
            <Text
              style={{ fontSize: 18, paddingLeft: 10, alignSelf: "center" }}
            >
              {pickupDetail}
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
            <Text
              style={{ fontSize: 18, paddingLeft: 10, alignSelf: "center" }}
            >
              {dropDetail}
            </Text>
          </View>
        </View> */}
        <View style={[row, { marginVertical: 5 }]}>
          <Text style={{ fontSize: 20 }}>
            <FontAwesome5
              name="car"
              size={20}
              color={lightModColor.themeBackground}
            />
            {" " + carDetails}
          </Text>
          <Text
            style={{ fontSize: 20, textAlign: "center", fontWeight: "bold" }}
          >
            <Entypo
              name="price-tag"
              size={20}
              color={lightModColor.themeBackground}
            />
            {" Rs " + price}
          </Text>
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
              color={seats >= 1 ? lightModColor.themeBackground : "gray"}
              style={{ marginRight: 3 }}
            />
            <FontAwesome
              name="user-circle"
              size={15}
              color={seats >= 2 ? lightModColor.themeBackground : "gray"}
              style={{ marginRight: 3 }}
            />
            <FontAwesome
              name="user-circle"
              size={15}
              color={
                seats > 2 && seats === 3
                  ? lightModColor.themeBackground
                  : "gray"
              }
              style={{ marginRight: 3 }}
            />
            <Text style={{ fontSize: 15 }}>{seats} Seats</Text>
          </View>
          <View style={[row, { alignItems: "center" }]}>
            <Zocial
              name="cal"
              size={15}
              color={lightModColor.themeBackground}
              // style={{ alignSelf: "center" }}
            />
            <Text>{" " + date}</Text>
          </View>
          <View style={[row, { alignItems: "center" }]}>
            <Ionicons
              name="md-time-outline"
              size={15}
              color={lightModColor.themeBackground}
              // style={{ alignSelf: "center" }}
            />
            <Text>{" " + time}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RideDetailsScreen;

const styles = StyleSheet.create({});
