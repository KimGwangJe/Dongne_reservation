import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import ChooseOne from "./chooseone";

function User({ route, navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={{ height: 130, backgroundColor: "#ff9966" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <FontAwesome5
            name="user-circle"
            size={44}
            color="black"
            style={{ marginTop: 65 }}
          />
        </View>
      </View>
      <View style={{ borderWidth: 1 }}></View>
      <ChooseOne navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default User;
