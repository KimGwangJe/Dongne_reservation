import React from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

function Point({ route, navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={{ height: 130, backgroundColor: "#ccffcc" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Ionicons
            name="cash-sharp"
            size={44}
            color="#FFCC00"
            style={{ marginTop: 65 }}
          />
        </View>
      </View>
      <View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ fontSize: 27, marginTop: 25 }}>
            {route.params.route.point} P
          </Text>
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
});

export default Point;
