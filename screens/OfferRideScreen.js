import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { lightModColor } from "../style/Color";
import {
  availableRideHeading,
  availableRideLocaBox,
  btn,
  btnText,
  dropDownStyle,
  row,
} from "../style/Style";
import uuid from "react-native-uuid";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../api/firebase";
import { CarState } from "../context/CarContext";
import { useNavigation } from "@react-navigation/native";

// import { MaterialIcons } from "@expo/vector-icons";

const OfferRideScreen = () => {
  const Navigation = useNavigation();

  // ******** Use States for all the input fields ********
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [pickupDetail, setPickupDetail] = useState("");
  const [dropDetail, setDropDetail] = useState("");
  const [currDate, setCurrDate] = useState(new Date());
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [carDeatails, setCarDeatails] = useState("");
  const [seats, setSeats] = useState(1);
  const [luggage, setLuggage] = useState("Hand Bag");
  const [price, setPrice] = useState(1000);
  const [comments, setComments] = useState("");
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  // *********** Context Api Objects *************************
  const { userDoc } = CarState();

  // *************** Date n Time Logics **********************
  let current = new Date();
  let currenDate =
    current.getDate() +
    "-" +
    (current.getMonth() + 1) +
    "-" +
    current.getFullYear();
  let currentTime = current.getHours() + " : " + current.getMinutes();

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || currDate;
    setShow(Platform.OS === "ios");
    let temDate = new Date(currentDate);
    let fDate =
      temDate.getDate() +
      "-" +
      (temDate.getMonth() + 1) +
      "-" +
      temDate.getFullYear();

    setCurrDate(currentDate);
    console.log(currDate);

    setDate(fDate);
    console.log(date);
  };
  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");

    let temDate = new Date(currentDate);
    let ftime = temDate.getHours() + " : " + temDate.getMinutes();
    let fZone =
      temDate.getHours() < 12 || temDate.getHours() == 24 ? "AM" : "PM";
    setTime(ftime + " " + fZone);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  // ********************* DataBase Logics ****************************

  const create = () => {
    const docId = uuid.v4().toString();
    const collectionRef = doc(db, "Rides", docId);

    const docData = {
      id: docId,
      pickup: pickup,
      drop: drop,
      pickupDetail: pickupDetail,
      dropDetail: dropDetail,
      date: date,
      time: time,
      carDeatails: carDeatails,
      luggage: luggage,
      seats: seats,
      price: price,
      comments: comments,
      createBy: userDoc,
      createDate: serverTimestamp(),
    };

    setDoc(collectionRef, docData)
      .then(console.log("succesfully added"))
      .catch((err) => console.log(err));

    Navigation.goBack();
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView
        style={{ padding: 10 }}
        // behavior={Platform.OS === "android" ? "height" : "padding"}
      >
        <Text
          style={[availableRideHeading, { textAlign: "left", marginBottom: 5 }]}
        >
          Route
        </Text>
        <View
          style={[
            availableRideLocaBox,
            { flexDirection: "row", alignItems: "center", height: 41 },
          ]}
        >
          <MaterialIcons
            name="my-location"
            size={20}
            color={lightModColor.themeBackground}
          />
          <TextInput
            style={{ marginLeft: 5, width: "90%" }}
            placeholder="Pick up Location"
            onChangeText={(value) => setPickup(value)}
            value={pickup}
          />
        </View>
        <View
          style={[
            availableRideLocaBox,
            {
              flexDirection: "row",
              alignItems: "center",
              marginTop: 5,
              height: 41,
            },
          ]}
        >
          <MaterialIcons
            name="location-on"
            size={20}
            color={lightModColor.themeBackground}
          />
          <TextInput
            style={{ marginLeft: 5, width: "90%" }}
            placeholder="Drop Location"
            onChangeText={(value) => setDrop(value)}
            value={drop}
          />
        </View>
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
              onChangeText={(value) => setPickupDetail(value)}
              value={pickupDetail}
            />
            <Text>To</Text>
            <TextInput
              style={[availableRideLocaBox, { height: 43 }]}
              placeholder="Detailed Drop Location"
              onChangeText={(value) => setDropDetail(value)}
              value={dropDetail}
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
          <Button onPress={() => setShow(true)} title="MODAL" />
          <Modal
            animationType="slide"
            transparent={true}
            visible={show}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setShow(!show);
            }}
          >
            <View
              style={[
                styles.centeredView,
                {
                  backgroundColor: lightModColor.themeBackground,
                  height: "40%",
                  position: "absolute",
                  width: "100%",
                  right: 0,
                  bottom: 0,
                },
              ]}
            >
              <RNDateTimePicker
                accentColor="red"
                display="spinner"
                style={{
                  width: "100%",
                  backgroundColor: lightModColor.themeBackground,
                }}
                value={currDate}
                mode={mode}
                onChange={mode == "date" ? onChangeDate : onChangeTime}
                // style={{ backgroundColor: lightModColor.themeBackground }}
                themeVariant={"dark"}
              />
              <Button onPress={() => setShow(false)} title="close" />
            </View>
          </Modal>
          {show && (
            <RNDateTimePicker
              value={new Date()}
              mode={mode}
              onChange={mode === "date" ? onChangeDate : onChangeTime}
              // style={{ backgroundColor: lightModColor.themeBackground }}
              themeVariant={"dark"}
              minimumDate={new Date()}
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
            <Text>{date ? date : currenDate}</Text>
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
            <Text>{time ? time : currentTime}</Text>
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
            onChangeText={(value) => setCarDeatails(value)}
            value={carDeatails}
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
        <Text
          style={[
            availableRideHeading,
            { textAlign: "left", marginVertical: 10 },
          ]}
        >
          Comments
        </Text>
        <TextInput
          style={[availableRideLocaBox, { height: 70 }]}
          placeholder="Add some additional details"
          onChangeText={(value) => setComments(value)}
          value={comments}
        />
        <TouchableOpacity
          onPress={create}
          style={[
            btn,
            {
              width: "100%",
              padding: 10,
              marginTop: 15,
              opacity:
                pickup === "" ||
                drop === "" ||
                pickupDetail === "" ||
                dropDetail === "" ||
                date === "" ||
                time === "" ||
                carDeatails === "" ||
                luggage === "" ||
                seats === "" ||
                price === ""
                  ? 0.5
                  : 1,
            },
          ]}
          disabled={
            pickup === "" ||
            drop === "" ||
            pickupDetail === "" ||
            dropDetail === "" ||
            date === "" ||
            time === "" ||
            carDeatails === "" ||
            luggage === "" ||
            seats === "" ||
            price === ""
          }
        >
          <Text style={[btnText, { fontSize: 18 }]}>Post Offer</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default OfferRideScreen;

const styles = StyleSheet.create({});
