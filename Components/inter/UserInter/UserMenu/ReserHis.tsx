import React, { useState, useEffect } from "react";

import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Axios from "axios";
import { Ionicons } from "@expo/vector-icons";

function Point({ route, navigation }: any) {
  const [view, setview]: any = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:8080/onerRestaurant").then((response) => {
      setview(response.data); //데이터 받아옴
    });
  }, []);
  const [user, setuser]: any = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:8080/user").then((response) => {
      setuser(response.data); //데이터 받아옴
    });
  });
  let regi = false;
  let cdata = {
    numid: 0,
    name: "",
    dong: "",
    foodform: "",
    tablenum: 0,
    loving: "",
    rating: "",
  };
  let udata = {
    num: 0,
    id: "",
    point: "",
    reservation: "",
    name: "",
  };
  const curuser = () => {
    user.map((user: any) => {
      if (user.id === route.params.route.id) {
        udata = {
          num: user.num,
          id: user.id,
          point: user.point,
          reservation: user.reservation,
          name: user.name,
        };
      }
    });
  };
  curuser();

  const currentreser = () => {
    view.map((view: any) => {
      if (view.name === udata.reservation) {
        regi = true;
        cdata = {
          numid: view.numid,
          name: view.name,
          dong: view.dong,
          foodform: view.foodform,
          tablenum: view.tablenum,
          loving: view.loving,
          rating: view.rating,
        };
      }
    });
  };
  currentreser();
  return (
    <View style={styles.container}>
      <View style={{ height: 130, backgroundColor: "#ccffcc" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 40,
              alignSelf: "center",
              textAlign: "center",
              marginTop: 65,
            }}
          >
            🤙🏽
          </Text>
        </View>
      </View>
      <View>
        <Text style={{ marginLeft: 7, marginTop: 20, fontSize: 15 }}>
          Current Reservation
        </Text>

        <View>
          {regi ? (
            <View>
              <TouchableOpacity style={styles.box} key={cdata.numid}>
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
                    <Text style={{ fontSize: 17 }}>{cdata.name}</Text>
                    <Text style={{ fontSize: 17 }}>({cdata.dong})</Text>
                  </View>
                  <Text style={{ textAlign: "center" }}>
                    잔여 테이블 : {cdata.tablenum}
                  </Text>
                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <Ionicons name="heart-outline" size={24} color="black" />
                    <Text>{cdata.loving}</Text>
                  </TouchableOpacity>
                  <View>
                    <Text>{cdata.rating}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#6633ff",
                  padding: 8,
                  marginTop: 20,
                  height: 40,
                  width: 100,
                  borderRadius: 20,
                  alignSelf: "center",
                }}
                onPress={() => {
                  const menu = {
                    id: udata.id,
                  };
                  fetch("http://localhost:8080/delreser", {
                    method: "PUT",
                    headers: {
                      "content-type": "application/json",
                    },
                    body: JSON.stringify(menu),
                  })
                    .then((res) => res.json())
                    .then((json) => {});
                  const a = {
                    tablenum: cdata.tablenum + 1,
                    name: cdata.name,
                    dong: cdata.dong,
                  };
                  fetch("http://localhost:8080/updatetablenum", {
                    method: "PUT",
                    headers: {
                      "content-type": "application/json",
                    },
                    body: JSON.stringify(a),
                  })
                    .then((res) => res.json())
                    .then((json) => {});
                  alert("삭제가 완료 되었습니다.");
                }}
              >
                <Text
                  style={{ textAlign: "center", color: "white", fontSize: 18 }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Text>현재 예약하신 가게가 없습니다.</Text>
            </View>
          )}
        </View>
      </View>

      <View style={{ borderWidth: 1, marginTop: 20 }}></View>
      {/* <View>
        <Text style={{ marginTop: 10, marginLeft: 10 }}>
          Reservation History
        </Text>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  box: {
    flexDirection: "row",
    borderWidth: 2,
    marginTop: 15,
    borderRadius: 20,
    width: 300,
    height: 170,
    alignSelf: "center",
    backgroundColor: "#f5f5f5",
  },
});

export default Point;
