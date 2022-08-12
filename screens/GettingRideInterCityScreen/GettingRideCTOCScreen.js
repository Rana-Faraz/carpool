import { GOOGLE_API_KEY } from "@env";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";

// navigator.geolocation = require("@react-native-community/geolocation");
// navigator.geolocation = require("react-native-geolocation-service");

const GettingRideCTOCScreen = () => {
  const [currentLocation, setCurrentLocation] = useState();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Access Denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
    })();
  }, []);

  console.log(currentLocation);

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
