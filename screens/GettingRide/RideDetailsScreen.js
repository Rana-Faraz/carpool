import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Zocial,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView from "react-native-maps";
import { db } from "../../api/firebase";
import { CarState } from "../../context/CarContext";
import { lightModColor } from "../../style/Color";
import { availableRideHeading, btn, btnText, row } from "../../style/Style";

const RideDetailsScreen = ({ navigation, route }) => {
  const { user, userDoc } = CarState();
  const {
    id,
    currentUser,
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

  const thisUser = currentUser;

  const GeoLoc = [
    {
      city: "Lahore",
      latitude: 31.5204,
      longitude: 74.3587,
    },
    {
      city: "Pattoki",
      latitude: 31.0249,
      longitude: 73.8479,
    },
    {
      city: "Islamabad",
      latitude: 33.6844,
      longitude: 73.0479,
    },
    {
      city: "Karachi",
      latitude: 24.8607,
      longitude: 67.0011,
    },
    {
      city: "Peshawar",
      latitude: 34.0151,
      longitude: 71.5249,
    },
    {
      city: "Multan",
      latitude: 30.1575,
      longitude: 71.5249,
    },
    {
      city: "Okara",
      latitude: 30.8138,
      longitude: 73.4534,
    },
    {
      city: "Quetta",
      latitude: 30.1798,
      longitude: 66.975,
    },
    {
      city: "Sheikhupura",
      latitude: 31.7167,
      longitude: 73.985,
    },
    {
      city: "Sialkot",
      latitude: 32.4945,
      longitude: 74.5229,
    },
    {
      city: "Gujranwala",
      latitude: 32.1877,
      longitude: 74.1945,
    },
    {
      city: "Faisalabad",
      latitude: 31.4504,
      longitude: 73.135,
    },
    {
      city: "Rawalpindi",
      latitude: 33.5651,
      longitude: 73.0169,
    },
  ];

  const handleGeoPickup = () => {
    return GeoLoc.filter((loc) => loc.city === pickup);
  };

  const handleGeoDrop = () => {
    return GeoLoc.filter((loc) => loc.city === drop);
  };

  const origin = {
    latitude: handleGeoPickup()[0].latitude,
    longitude: handleGeoPickup()[0].longitude,
    latitudeDelta: 0.0722,
    longitudeDelta: 0.0421,
  };
  const destination = {
    latitude: handleGeoDrop()[0].latitude,
    longitude: handleGeoDrop()[0].longitude,
    latitudeDelta: 0.0722,
    longitudeDelta: 0.0421,
  };

  const privateChat = (name, number) => {
    var date = new Date();
    var time = date.toLocaleTimeString();
    var H = +time.substr(0, 2);
    var h = H % 12 || 12;
    var ampm = H < 12 || H === 24 ? " AM" : " PM";
    time = h + time.substr(2, 3) + ampm;
    const chatId = user > number ? user + number : number + user;
    const docRef2 = doc(db, "Users-Data", user, "messages", chatId);
    const infoData = {
      senderName: userDoc.name,
      recieverName: name,
      senderNumber: user,
      recieverNumber: number,
      sentAt: serverTimestamp(),
      time: time,
    };
    setDoc(docRef2, infoData, { merge: true });
    const docRef3 = doc(db, "Users-Data", number, "messages", chatId);
    setDoc(docRef3, infoData, { merge: true });
    const docRef = collection(db, "messages", chatId, "privateChats");
    const docData = {
      senderName: userDoc.name,
      recieverName: name,
      senderNumber: user,
      recieverNumber: number,
      sentAt: serverTimestamp(),
      time: time,
    };
    getDoc(docRef2).then((doc) => {
      if (doc.data() === undefined) {
        addDoc(docRef, docData, { merge: true });
      }
    });
  };

  const onLongPress = (name, number) => {
    Alert.alert("Message", "Do you want to message " + name + "?", [
      {
        text: "Yes",
        onPress: () => {
          privateChat(name, number);
          navigation.navigate("One To One", {
            name: name,
            number: number,
          });
        },
      },
      { text: "Cancel" },
    ]);
  };

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
      {userDoc.phone !== currentUser.phone && (
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
            <TouchableOpacity
              onPress={
                () =>
                  navigation.navigate("User Profile", { userInfo: thisUser })
                // console.log(currentUser)
              }
              style={[
                row,
                {
                  alignItems: "center",
                },
              ]}
            >
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
                  {currentUser.name}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 50,
                padding: 10,
                backgroundColor: "#ffff",
              }}
              onPress={() =>
                userDoc.phone === currentUser.phone
                  ? null
                  : onLongPress(currentUser.name, currentUser.phone)
              }
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
      )}
    </>
  );
};

export default RideDetailsScreen;

const styles = StyleSheet.create({});
