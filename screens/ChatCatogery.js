import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { lightModColor } from "../style/Color";
import { heading } from "../style/Style";
import { Divider } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";

const ChatCatogery = ({ navigation }) => {
  return (
    <View style={{ marginHorizontal: 20 }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Chat");
        }}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#d4d7db",
          padding: 10,
          borderRadius: 10,
          marginVertical: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              backgroundColor: lightModColor.themeBackground,
              padding: 5,
              borderRadius: 50,
              height: 45,
              width: 45,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="globe-outline"
              size={34}
              color={lightModColor.headerFontColor}
            />
          </View>

          <Text
            style={[
              { color: lightModColor.fontColor, fontSize: 18, paddingLeft: 10 },
            ]}
          >
            Global Chat
          </Text>
        </View>
        <Ionicons name="caret-forward" size={24} color="black" />
      </TouchableOpacity>
      <Divider
        style={{
          width: "80%",
          alignSelf: "center",
          height: 1,
          borderRadius: 50,
        }}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Private Chats");
        }}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#d4d7db",
          padding: 10,
          borderRadius: 10,
          marginVertical: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              backgroundColor: lightModColor.themeBackground,
              padding: 5,
              borderRadius: 50,
              height: 45,
              width: 45,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Foundation
              name="torsos"
              size={35}
              color={lightModColor.headerFontColor}
            />
          </View>

          <Text
            style={[
              { color: lightModColor.fontColor, fontSize: 18, paddingLeft: 10 },
            ]}
          >
            Private Chats
          </Text>
        </View>
        <Ionicons name="caret-forward" size={24} color="black" />
      </TouchableOpacity>
      <Divider
        style={{
          width: "80%",
          alignSelf: "center",
          height: 1,
          borderRadius: 50,
        }}
      />

      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#d4d7db",
          padding: 10,
          borderRadius: 10,
          marginVertical: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              backgroundColor: lightModColor.themeBackground,
              padding: 5,
              height: 45,
              width: 45,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 50,
            }}
          >
            <FontAwesome5
              name="female"
              size={35}
              color={lightModColor.headerFontColor}
            />
          </View>

          <Text
            style={[
              { color: lightModColor.fontColor, fontSize: 18, paddingLeft: 10 },
            ]}
          >
            Female Only
          </Text>
        </View>
        <Ionicons name="caret-forward" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatCatogery;
