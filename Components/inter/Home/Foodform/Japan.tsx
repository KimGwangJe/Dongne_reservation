import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import Axios from "axios";
import { Ionicons } from "@expo/vector-icons";

function Japan() {
  const [view, setview]: any = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:8080/onerRestaurant").then((response) => {
      setview(response.data); //데이터 받아옴
    });
  }, []);

  const viewer = view.map((view: any) => {
    if (view.foodform === "일식") {
      return (
        <TouchableOpacity style={styles.box} key={view.num}>
          <Image
            style={{
              height: 150,
              width: 149,
              marginLeft: 10,
              marginBottom: 10,
              marginTop: 10,
              borderRadius: 10,
            }}
            source={{
              uri: "https://images.pexels.com/photos/14653717/pexels-photo-14653717.png?auto=compress&cs=tinysrgb&w=600&lazy=load",
            }}
          />
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-evenly",
              marginLeft: 15,
              marginRight: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 17 }}>{view.name}</Text>
              <Text style={{ fontSize: 17 }}>({view.dong})</Text>
            </View>
            <Text style={{ textAlign: "center" }}>
              잔여 테이블 : {view.tablenum}
            </Text>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Ionicons name="heart-outline" size={24} color="black" />
              <Text>{view.loving}</Text>
            </TouchableOpacity>
            <View>
              <Text>{view.rating}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ height: 130, backgroundColor: "#ff9966" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 40, marginTop: 70 }}>🍣</Text>
          </View>
        </View>
        <View style={{ borderWidth: 1 }}></View>
        <View>{viewer}</View>
      </ScrollView>
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
    borderWidth: 2,
    marginTop: 30,
    borderRadius: 20,
    width: 300,
    height: 170,
    alignSelf: "center",
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

export default Japan;
