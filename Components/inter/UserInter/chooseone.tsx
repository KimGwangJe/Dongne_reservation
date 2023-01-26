import React from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

function Chooseone({ route, navigation }: any) {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <TouchableOpacity
          style={{ height: 80, marginTop: 50, width: "50%" }}
          onPress={() => {
            navigation.navigate("Point");
          }}
        >
          <View
            style={{
              marginTop: 5,
            }}
          >
            <Ionicons
              name="cash-sharp"
              size={40}
              color="#FFCC00"
              style={{ alignSelf: "center" }}
            />
            <Text style={{ fontSize: 15, textAlign: "center" }}>Point</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ height: 80, marginTop: 50, width: "50%" }}
          onPress={() => {
            navigation.navigate("Coupon");
          }}
        >
          <View
            style={{
              marginTop: 5,
            }}
          >
            <MaterialCommunityIcons
              name="cards-playing-spade-multiple-outline"
              size={40}
              color="black"
              style={{ alignSelf: "center", marginTop: 5 }}
            />
            <Text style={{ fontSize: 15, textAlign: "center" }}>Coupon</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ height: 80, marginTop: 20, width: "50%" }}
          onPress={() => {
            navigation.navigate("Present");
          }}
        >
          <View
            style={{
              marginTop: 5,
            }}
          >
            <SimpleLineIcons
              name="present"
              size={40}
              color="red"
              style={{ alignSelf: "center" }}
            />
            <Text style={{ fontSize: 15, textAlign: "center" }}>Present</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ height: 80, marginTop: 20, width: "50%" }}
          onPress={() => {
            navigation.navigate("Credit");
          }}
        >
          <View
            style={{
              marginTop: 5,
            }}
          >
            <FontAwesome
              name="cc-mastercard"
              size={40}
              color="#000033"
              style={{ alignSelf: "center" }}
            />
            <Text style={{ fontSize: 15, textAlign: "center" }}>Credit</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default Chooseone;
