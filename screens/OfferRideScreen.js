import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PickandDropForm from "../components/PickandDropForm";
import { lightModColor } from "../style/Color";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  availableRideHeading,
  availableRideLocaBox,
  btn,
  btnText,
  dropDownStyle,
  row,
} from "../style/Style";
import SelectDropdown from "react-native-select-dropdown";
// import { MaterialIcons } from "@expo/vector-icons";

const OfferRideScreen = () => {
  // const route = useRoute();
  // const { pickUpLoca, dropLoca } = route.params;
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [seats, setSeats] = useState(1);
  const [luggage, setLuggage] = useState("Hand Bag");
  const [price, setPrice] = useState(1000);
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

  console.log(price);
  return (
    <ScrollView>
      <KeyboardAvoidingView style={{ padding: 10 }}>
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
        <Text
          style={[
            availableRideHeading,
            { textAlign: "left", marginVertical: 10 },
          ]}
        >
          Car Details
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome5
            name="car"
            size={24}
            color={lightModColor.themeBackground}
          />
          <TextInput
            style={[
              availableRideLocaBox,
              { height: 43, width: "92%", marginLeft: 5 },
            ]}
            placeholder="Make/Model/Year"
          />
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", paddingTop: 5 }}
        >
          <MaterialIcons
            name="luggage"
            size={24}
            color={lightModColor.themeBackground}
            style={{ paddingRight: 5 }}
          />
          <View style={{ width: "41%" }}>
            <SelectDropdown
              data={["Hand Bag", "Medium", "Large"]}
              buttonStyle={dropDownStyle}
              buttonTextStyle={{ fontSize: 15 }}
              defaultValue="Hand Bag"
              renderDropdownIcon={() => (
                <AntDesign name="down" size={20} color="black" />
              )}
              onSelect={(text) => setLuggage(text)}
            />
          </View>
          <MaterialCommunityIcons
            name="car-seat"
            size={24}
            color={lightModColor.themeBackground}
            style={{ paddingHorizontal: 5 }}
          />
          <View style={[availableRideLocaBox, row, { width: "41%" }]}>
            <TouchableOpacity
              onPress={() => seats > 1 && setSeats(seats - 1)}
              disabled={seats === 1}
              style={{ opacity: seats === 1 ? 0.5 : 1 }}
            >
              <AntDesign
                name="minuscircle"
                size={22}
                color={lightModColor.themeBackground}
              />
            </TouchableOpacity>
            <Text style={{ paddingHorizontal: 5 }}>{seats}</Text>
            <TouchableOpacity
              onPress={() => seats < 3 && setSeats(seats + 1)}
              disabled={seats === 3}
              style={{ opacity: seats === 3 ? 0.5 : 1 }}
            >
              <AntDesign
                name="pluscircle"
                size={22}
                color={lightModColor.themeBackground}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text
          style={[
            availableRideHeading,
            { textAlign: "left", marginVertical: 10 },
          ]}
        >
          Trip Options
        </Text>
        <Text>Price per Passengers</Text>
        <View style={[row, { alignItems: "center" }]}>
          <TouchableOpacity
            style={[availableRideLocaBox, { opacity: price <= 400 ? 0.5 : 1 }]}
            onPress={() => price > 400 && setPrice(price - 50)}
            disabled={price <= 400}
          >
            <AntDesign
              name="minuscircle"
              size={20}
              color={lightModColor.themeBackground}
            />
          </TouchableOpacity>
          <View style={[availableRideLocaBox, { width: "74%" }]}>
            <Text style={{ textAlign: "center" }}>{price}</Text>
          </View>
          <TouchableOpacity
            style={[availableRideLocaBox, { opacity: price >= 4000 ? 0.5 : 1 }]}
            onPress={() => price < 4000 && setPrice(price + 50)}
            disabled={price >= 4000}
          >
            <AntDesign
              name="pluscircle"
              size={20}
              color={lightModColor.themeBackground}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[btn, { width: "100%", padding: 10, marginTop: 15 }]}
        >
          <Text style={[btnText, { fontSize: 18 }]}>Post Offer</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default OfferRideScreen;

const styles = StyleSheet.create({});
