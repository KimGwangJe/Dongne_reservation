import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

function First({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loginbox}>
        <View>
          <FontAwesome
            name="connectdevelop"
            size={20}
            color="#cc00cc"
            style={{
              textAlign: "center",
              fontSize: 100,
              marginTop: 90,
              justifyContent: "center",
            }}
          />
          <Text style={{ textAlign: "center", fontSize: 20, marginTop: 20 }}>
            Dong - RE
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#6633ff",
            padding: 8,
            height: 50,
            width: 300,
            marginTop: 30,
            borderRadius: 20,
            alignSelf: "center",
            flexDirection: "column",
          }}
          onPress={() => {
            navigation.navigate("Signupuser");
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 27,
            }}
          >
            User
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            padding: 8,
            height: 50,
            width: 300,
            borderWidth: 1,
            borderRadius: 20,
            alignSelf: "center",
            marginTop: 20,
            flexDirection: "column",
          }}
          onPress={() => {
            navigation.navigate("Signuponer");
          }}
        >
          <Text style={{ textAlign: "center", color: "#6633ff", fontSize: 27 }}>
            Oner
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  loginbox: {
    marginTop: 100,
  },
});

export default First;
