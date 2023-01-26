import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";

function Sale({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={{ height: 110, backgroundColor: "#ff9966" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View style={{ marginTop: 55 }}>
            <Text style={{ fontSize: 25 }}>Sale</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    alignItems: "center",
  },
  box: {
    flexDirection: "row",
    height: 190,
    borderWidth: 1,
    marginTop: 30,
    borderRadius: 20,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  input: {
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 30,
    marginTop: 30,
    width: 300,
    height: 50,
  },
});

export default Sale;
