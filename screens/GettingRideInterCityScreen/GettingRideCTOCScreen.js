import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, {
  Circle,
  Polygon,
  Polyline,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import AnimatedPolyline from "react-native-maps-animated-polyline";
import { CarState } from "../../context/CarContext";
import { lightModColor } from "../../style/Color";
import { availableRideLocaBox } from "../../style/Style";

const GettingRideCTOCScreen = () => {
  const { currentLocation, pickupCToC, setPickupCToC, dropCToC, setDropCToC } =
    CarState();
  const [pickup, setPickup] = useState("Current Location");
  const [drop, setDrop] = useState("Select Drop Location");
  const Navigation = useNavigation();
  const mapRef = useRef(null);

  useEffect(() => {
    pickupCToC &&
      dropCToC &&
      setTimeout(() => {
        mapRef.current.fitToSuppliedMarkers(["drop", "pickup"], {
          edgePadding: {
            top: 70,
            right: 70,
            bottom: 70,
            left: 70,
          },
        });
      }, 600);
  }, [dropCToC, pickupCToC]);

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       console.log("Access Denied");
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setCurrentLocation(location);
  //   })();
  // }, []);

  const origin = {
    latitude:
      // currentLocation &&
      currentLocation && currentLocation.coords.latitude,
    longitude:
      // currentLocation &&
      currentLocation && currentLocation.coords.longitude,
    latitudeDelta: 0.0022,
    longitudeDelta: 0.0021,
  };

  useEffect(() => {
    if (dropCToC) {
      setDrop(dropCToC.description);
    }
    if (pickupCToC) {
      setPickup(pickupCToC.description);
    }
  }, [pickupCToC, dropCToC]);

  return (
    <View>
      <View
        style={{
          backgroundColor: lightModColor.themeBackground,
          padding: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Ionicons name="location" size={24} color="#ffff" />
          <TouchableOpacity
            onPress={() =>
              Navigation.navigate("LocationSelect", {
                type: "pickup",
              })
            }
            style={{ width: "90%" }}
          >
            <View style={[availableRideLocaBox]}>
              <Text>
                {pickup.length > 46 ? pickup.slice(0, 45) + "..." : pickup}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FontAwesome name="location-arrow" size={24} color="#ffff" />
          <TouchableOpacity
            onPress={() =>
              Navigation.navigate("LocationSelect", {
                type: "drop",
              })
            }
            style={{ width: "90%" }}
          >
            <View style={[availableRideLocaBox, { marginTop: 6 }]}>
              <Text>{drop.length > 46 ? drop.slice(0, 45) + "..." : drop}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {currentLocation ? (
        <MapView
          showsMyLocationButton={true}
          showsUserLocation={true}
          // mapPadding={{ bottom }}
          initialRegion={origin}
          style={{ height: "88%" }}
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
        >
          {pickupCToC && dropCToC && (
            <>
              <MapView.Marker
                coordinate={{
                  latitude: pickupCToC.latitude,
                  longitude: pickupCToC.longitude,
                }}
                identifier="pickup"
              />
              <MapView.Marker
                coordinate={{
                  latitude: dropCToC.latitude,
                  longitude: dropCToC.longitude,
                }}
                identifier="drop"
              />
              <Circle
                center={{
                  latitude: pickupCToC.latitude,
                  longitude: pickupCToC.longitude,
                }}
                radius={10}
                strokeColor={lightModColor.themeBackground}
                strokeWidth={7}
                fillColor={"#fff"}
                zIndex={3}
              />
              <Circle
                center={{
                  latitude: dropCToC.latitude,
                  longitude: dropCToC.longitude,
                }}
                radius={10}
                strokeColor={lightModColor.themeBackground}
                strokeWidth={7}
                fillColor={"#fff"}
                zIndex={3}
              />
            </>
          )}
          {pickupCToC && dropCToC && (
            <Polyline
              interval={3000}
              coordinates={[
                {
                  latitude: pickupCToC.latitude,
                  longitude: pickupCToC.longitude,
                },
                {
                  latitude: dropCToC.latitude,
                  longitude: dropCToC.longitude,
                },
              ]}
              strokeColor={lightModColor.themeBackground}
              strokeWidth={5}
            />
          )}
        </MapView>
      ) : (
        <View
          style={{
            height: Platform.OS === "android" ? 550 : 600,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator
            color={lightModColor.themeBackground}
            size="large"
          />
        </View>
      )}
    </View>
  );
};

export default GettingRideCTOCScreen;
