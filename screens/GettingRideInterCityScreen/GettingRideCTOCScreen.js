import { GOOGLE_API_KEY } from "@env";
import { View, Text, PermissionsAndroid } from "react-native";
import React, { useEffect } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

// navigator.geolocation = require("@react-native-community/geolocation");
// navigator.geolocation = require("react-native-geolocation-service");

const GettingRideCTOCScreen = () => {
  //   const requestLocationPermission = async () => {
  //     try {
  //       const grant = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.LOCATION,
  //         {
  //           title: "Car pool Location Permission",
  //           message: "Car pool needs to access your Location",
  //           buttonNeutral: "Ask me Later",
  //           buttonNegative: "Cancel",
  //           buttonPositive: "OK",
  //         }
  //       );
  //       if (grant === PermissionsAndroid.RESULTS.GRANTED) {
  //         console.log("You can access location");
  //       } else {
  //         console.log("denied");
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   useEffect(() => {
  //     requestLocationPermission();
  //   }, []);

  return (
    <View style={{ width: "100%", marginTop: 10 }}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          console.log(data, details);
        }}
        styles={{
          container: {
            flex: 0,
          },
          textInputContainer: {
            width: "80%",
            alignSelf: "center",
          },
          textInput: {
            fontSize: 18,
            // width: "80%",
          },
        }}
        minLength={2}
        enablePoweredByContainer={false}
        fetchDetails={true}
        keepResultsAfterBlur={true}
        query={{
          key: GOOGLE_API_KEY,
          language: "en",
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
      />
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          console.log(data, details);
        }}
        styles={{
          container: {
            flex: 0,
          },
          textInputContainer: {
            width: "80%",
            alignSelf: "center",
            marginTop: 10,
          },
          textInput: {
            fontSize: 18,
            // width: "80%",
          },
        }}
        minLength={2}
        enablePoweredByContainer={false}
        fetchDetails={true}
        query={{
          key: GOOGLE_API_KEY,
          language: "en",
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
      />
    </View>
  );
};

export default GettingRideCTOCScreen;
