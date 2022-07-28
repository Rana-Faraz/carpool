import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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
  AntDesign,
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
    <>
      <View>
        <View style={{ flexDirection: "row" }}>
          <MapView
            initialRegion={origin}
            style={{
              height: 250,
              width: "50%",
              backgroundColor: lightModColor.themeBackground,
            }}
            mapType="standard"
            scrollEnabled={false}
            zoomEnabled={false}
            cacheEnabled={true}
          ></MapView>
          <MapView
            initialRegion={destination}
            style={{ height: 250, width: "50%" }}
            mapType="standard"
            scrollEnabled={false}
            zoomEnabled={false}
            cacheEnabled={true}
          ></MapView>
        </View>
        <View
          //   key={props.id}
          style={{
            backgroundColor: "#ffff",
            marginHorizontal: 10,
            paddingHorizontal: 10,
            paddingVertical: Platform.OS === "android" ? 15 : 20,
            borderRadius: 10,
            marginTop: -30,
          }}
        >
          <View style={[row]}>
            <View style={{ width: "40%" }}>
              <Text
                style={[
                  availableRideHeading,
                  {
                    fontSize: Platform.OS === "android" ? 25 : 30,
                    marginBottom: 0,
                    textAlign: "auto",
                  },
                ]}
              >
                {pickup}
              </Text>
            </View>
            <View style={{ width: "40%" }}>
              <Text
                style={[
                  availableRideHeading,
                  {
                    fontSize: Platform.OS === "android" ? 25 : 30,
                    marginBottom: 0,
                    textAlign: "right",
                  },
                ]}
              >
                {drop}
              </Text>
            </View>
          </View>
          <View
            style={[
              row,
              {
                alignItems: "center",
                marginBottom: Platform.OS === "android" ? 5 : 8,
              },
            ]}
          >
            <View style={{ width: "40%" }}>
              <Text style={{ fontSize: Platform.OS === "android" ? 18 : 20 }}>
                {pickupDetail}
              </Text>
            </View>
            <View style={{ width: "20%", justifyContent: "center" }}>
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={30}
                color={lightModColor.themeBackground}
                style={{ textAlign: "center" }}
              />
            </View>
            <View style={{ width: "40%" }}>
              <Text
                style={{
                  fontSize: Platform.OS === "android" ? 18 : 20,
                  textAlign: "right",
                }}
              >
                {dropDetail}
              </Text>
            </View>
          </View>
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
              <Text>{seats} Seats</Text>
            </View>
            <View style={[row, { alignItems: "center" }]}>
              <Zocial
                name="cal"
                size={Platform.OS === "android" ? 15 : 18}
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
          {comments ? (
            <View style={{ paddingVertical: 10 }}>
              <Text style={{ fontSize: 18 }}>
                <AntDesign
                  name="infocirlceo"
                  size={18}
                  color={lightModColor.themeBackground}
                />
                {" " + comments}
              </Text>
            </View>
          ) : (
            <></>
          )}
        </View>
      </View>
      <View style={{ position: "absolute", bottom: 30, width: "100%" }}>
        <View
          style={[
            row,
            {
              paddingVertical: 20,
              paddingHorizontal: 10,
              alignItems: "center",
            },
          ]}
        >
          <View style={[row, { alignItems: "center" }]}>
            <View
              style={{
                padding: 3,
                borderColor: lightModColor.themeBackground,
                borderWidth: 3,
                borderRadius: 50,
              }}
            >
              <Image
                source={require("../../assets/images.png")}
                style={{ height: 50, width: 50, borderRadius: 30 }}
              />
            </View>
            <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
              <Text style={[availableRideHeading, { marginBottom: 0 }]}>
                {user.name}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{ borderRadius: 50, padding: 10, backgroundColor: "#ffff" }}
          >
            <MaterialIcons
              name="messenger"
              size={24}
              color={lightModColor.themeBackground}
            />
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <TouchableOpacity
            style={[btn, { paddingVertical: 10, width: "100%" }]}
          >
            <Text style={[btnText]}>Book</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default RideDetailsScreen;

const styles = StyleSheet.create({});
