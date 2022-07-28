import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView from "react-native-maps";
import { GOOGLE_MAPS_APIKEY } from "@env";
import MapViewDirections from "react-native-maps-directions";

const RideDetailsScreen = () => {
  const origin = { latitude: 31.5204, longitude: 74.3587 };
  const destination = { latitude: 31.0249, longitude: 73.8479 };
  const key = "AIzaSyDxGlhtwYGWKCxulLrJYL4zWWcK0-RR3XA";
  return (
    <View>
      <MapView>
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={key}
        />
      </MapView>
    </View>
  );
};

export default RideDetailsScreen;

const styles = StyleSheet.create({});
