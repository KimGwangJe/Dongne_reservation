import React from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

function Present({ route, navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={{ height: 130, backgroundColor: "#ccffcc" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <SimpleLineIcons
            name="present"
            size={40}
            color="red"
            style={{ marginTop: 65 }}
          />
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

export default Present;
