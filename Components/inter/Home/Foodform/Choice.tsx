import React, { useState } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons"; //일식
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function carousel() {
  const navigation: any = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 30,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Korea");
        }}
      >
        <Text style={{ fontSize: 40 }}>🍚</Text>
        <Text style={{ textAlign: "center", fontSize: 16 }}>한식</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("China");
        }}
      >
        <Text style={{ fontSize: 40 }}>🇨🇳</Text>
        <Text style={{ textAlign: "center", fontSize: 16 }}>중식</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Meat");
        }}
      >
        <Text style={{ fontSize: 40 }}>🍖</Text>
        <Text style={{ textAlign: "center", fontSize: 16 }}>양식</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Japan");
        }}
      >
        <Text style={{ fontSize: 40 }}>🍣</Text>
        <Text style={{ textAlign: "center", fontSize: 16 }}>일식</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Drink");
        }}
      >
        <Text style={{ fontSize: 40 }}>🍶</Text>

        <Text style={{ textAlign: "center", fontSize: 16 }}>음주</Text>
      </TouchableOpacity>
    </View>
  );
}

export default carousel;
