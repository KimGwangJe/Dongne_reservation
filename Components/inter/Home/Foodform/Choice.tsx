import React, { useState } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons"; //μΌμ
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
        <Text style={{ fontSize: 40 }}>π</Text>
        <Text style={{ textAlign: "center", fontSize: 16 }}>νμ</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("China");
        }}
      >
        <Text style={{ fontSize: 40 }}>π¨π³</Text>
        <Text style={{ textAlign: "center", fontSize: 16 }}>μ€μ</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Meat");
        }}
      >
        <Text style={{ fontSize: 40 }}>π</Text>
        <Text style={{ textAlign: "center", fontSize: 16 }}>μμ</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Japan");
        }}
      >
        <Text style={{ fontSize: 40 }}>π£</Text>
        <Text style={{ textAlign: "center", fontSize: 16 }}>μΌμ</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Drink");
        }}
      >
        <Text style={{ fontSize: 40 }}>πΆ</Text>

        <Text style={{ textAlign: "center", fontSize: 16 }}>μμ£Ό</Text>
      </TouchableOpacity>
    </View>
  );
}

export default carousel;
