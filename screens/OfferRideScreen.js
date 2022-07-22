import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PickandDropForm from "../components/PickandDropForm";
import { lightModColor } from "../style/Color";
import { availableRideHeading, availableRideLocaBox } from "../style/Style";

const OfferRideScreen = () => {
  // const route = useRoute();
  // const { pickUpLoca, dropLoca } = route.params;
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");

    let temDate = new Date(currentDate);
    let fDate =
      temDate.getDate() +
      "-" +
      (temDate.getMonth() + 1) +
      "-" +
      temDate.getFullYear();
    let ftime = temDate.getHours() + " : " + temDate.getMinutes();
    setDate(fDate);
    setTime(ftime);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
    // setShow(false);
  };
  return (
    <View>
      <View style={{ padding: 10 }}>
        <Text
          style={[availableRideHeading, { textAlign: "left", marginBottom: 5 }]}
        >
          Route
        </Text>
        <PickandDropForm
          pickUpLoca={"Pick Up Location"}
          dropLoca={"Drop Location"}
          route={"offer"}
        />
        <Text
          style={[
            availableRideHeading,
            { textAlign: "left", marginVertical: 10 },
          ]}
        >
          Pick and Drop
        </Text>
        <View>
          <View>
            <Text>From</Text>
            <TextInput
              style={[availableRideLocaBox, { marginBottom: 5, height: 43 }]}
              placeholder="Detailed Pickup Location"
            />
            <Text>To</Text>
            <TextInput
              style={[availableRideLocaBox, { height: 43 }]}
              placeholder="Detailed Drop Location"
            />
          </View>
        </View>
        <Text
          style={[
            availableRideHeading,
            { textAlign: "left", marginVertical: 10 },
          ]}
        >
          Date & Time
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {show && (
            <RNDateTimePicker
              value={new Date()}
              mode={mode}
              onChange={onChange}
              // style={{ backgroundColor: lightModColor.themeBackground }}
              themeVariant={"dark"}
            />
          )}
          {/* {showDate && <RNDateTimePicker value={new Date()} mode={"date"} />} */}
          <Text style={{ marginRight: 5 }}>
            <MaterialIcons
              name="date-range"
              size={24}
              color={lightModColor.themeBackground}
            />
          </Text>
          <TouchableOpacity
            style={[availableRideLocaBox, { width: "41%" }]}
            onPress={() => showMode("date")}
          >
            <Text>{date}</Text>
          </TouchableOpacity>
          <Text style={{ marginHorizontal: 5 }}>
            <Ionicons
              name="time-outline"
              size={24}
              color={lightModColor.themeBackground}
            />
          </Text>
          <TouchableOpacity
            style={[availableRideLocaBox, { width: "41%" }]}
            onPress={() => showMode("time")}
          >
            <Text>{time}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OfferRideScreen;

const styles = StyleSheet.create({});
