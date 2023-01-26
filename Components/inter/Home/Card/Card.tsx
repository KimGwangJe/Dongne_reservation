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
import Carousel from "react-native-reanimated-carousel";
import "react-native-reanimated";

function Card({ navigation }: any) {
  const a: any = [
    "https://images.pexels.com/photos/15144610/pexels-photo-15144610.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load", //신년할인
    "https://images.pexels.com/photos/15183576/pexels-photo-15183576.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load", //삼각형
    "https://images.pexels.com/photos/15144236/pexels-photo-15144236.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load", //할인
  ];
  return (
    <View>
      <Text style={{ marginTop: 40, marginLeft: 20, fontSize: 20 }}>Event</Text>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            borderRadius: 30,
            width: 390,
          }}
        >
          <Carousel
            loop
            width={390}
            height={250}
            autoPlay={true}
            autoPlayInterval={6000}
            data={a}
            renderItem={({ index }: { index: number }) => (
              <TouchableOpacity
                onPress={() => {
                  console.log(index);
                  if (index === 0) {
                    navigation.navigate("Newyear");
                  } else if (index === 1) {
                    navigation.navigate("Hot");
                  } else if (index === 2) {
                    navigation.navigate("Sale");
                  }
                }}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 10,
                }}
              >
                <Image
                  style={{
                    height: 250,
                    width: 390,
                    marginLeft: 10,
                    marginBottom: 10,
                    marginTop: 10,
                    borderRadius: 30,
                  }}
                  source={{
                    uri: a[index],
                  }}
                />
              </TouchableOpacity>
            )}
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

export default Card;
