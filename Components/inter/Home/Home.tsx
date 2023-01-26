import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Choice from "./Foodform/Choice";
import EventCard from "./Card/Card";
import Recommend from "./Recommend";
import { ScrollView } from "react-native-gesture-handler";

function Home({ route, navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity
          style={{ flexDirection: "row", justifyContent: "flex-end" }}
          onPress={() => {
            navigation.navigate("User");
          }}
        >
          <FontAwesome5
            name="user-circle"
            size={30}
            color="black"
            style={{ marginTop: 15, marginRight: 40 }}
          />
        </TouchableOpacity>

        <View style={{ marginLeft: 20, marginTop: 4 }}>
          <Text style={styles.title}>Hello, {route.params.name} 🫶 </Text>
          <Text style={styles.title}>Welcome to Dong-re</Text>
        </View>
        <Choice />
        <EventCard navigation={navigation} />
        <Recommend route={route} />
      </ScrollView>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 30,
    marginTop: 10,
  },
  bgImage: { width: "100%", height: "100%" },
});

export default Home;
