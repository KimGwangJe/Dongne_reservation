import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Modal,
} from "react-native";
import Axios from "axios";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

function Like({ route, navigation }: any) {
  const [view, setview]: any = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:8080/onerRestaurant").then((response) => {
      setview(response.data); //데이터 받아옴
    });
  }, []);

  const searchresult = () => {
    const [visibleMoal, setVisibleModal] = useState({
      mode: false,
      name: "",
      dong: "",
      foodform: "",
      tablenum: 0,
      loving: 0,
      rating: 0,
    });

    const updatereservation = () => {
      const menu = {
        reservation: visibleMoal.name,
        id: route.params.id,
      };
      fetch("http://localhost:8080/updatereservation", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(menu),
      })
        .then((res) => res.json())
        .then((json) => {});
    };

    return (
      <View>
        <View>
          {view.map((view: any) => {
            const Jsonlovinglist = JSON.parse(route.params.lovinglist);
            const key1 = Object.keys(Jsonlovinglist);
            for (let i = 0; i < key1.length; i++) {
              var key = key1[i];
              if (view.name === key1[i] || view.dong === Jsonlovinglist[key]) {
                return (
                  <TouchableOpacity
                    style={styles.box}
                    key={view.num}
                    onPress={() => {
                      setVisibleModal({
                        mode: true,
                        name: view.name,
                        dong: view.dong,
                        foodform: view.foodform,
                        tablenum: view.tablenum,
                        loving: view.loving,
                        rating: view.rating,
                      });
                    }}
                  >
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
                        onPress={() => {
                          const a = JSON.parse(route.params.lovinglist);
                          const includekey = Object.keys(a).includes(view.name);
                          if (includekey !== true) {
                            //귀찮,,, 값 없으면 실행해!
                            const loving = {
                              name: view.name,
                              dong: view.dong,
                              loving: view.loving + 1,
                            };
                            fetch("http://localhost:8080/updateloving", {
                              method: "PUT", // 업데이트
                              headers: {
                                "content-type": "application/json",
                              },
                              body: JSON.stringify(loving),
                            })
                              .then((res) => res.json())
                              .then((json) => {});

                            const lovinglist = {
                              num: route.params.num,
                              dong: view.dong,
                              name: view.name,
                            };
                            fetch("http://localhost:8080/updatelovinglist", {
                              method: "PUT", // 업데이트
                              headers: {
                                "content-type": "application/json",
                              },
                              body: JSON.stringify(lovinglist),
                            })
                              .then((res) => res.json())
                              .then((json) => {});
                          } else {
                            const loving = {
                              name: view.name,
                              dong: view.dong,
                              loving: view.loving - 1,
                            };
                            fetch("http://localhost:8080/updateloving", {
                              method: "PUT", // 업데이트
                              headers: {
                                "content-type": "application/json",
                              },
                              body: JSON.stringify(loving),
                            })
                              .then((res) => res.json())
                              .then((json) => {});

                            const deletelovinglist = {
                              num: route.params.num,
                              dong: view.dong,
                              name: view.name,
                            };
                            fetch("http://localhost:8080/deletelovinglist", {
                              method: "PUT", // 업데이트
                              headers: {
                                "content-type": "application/json",
                              },
                              body: JSON.stringify(deletelovinglist),
                            })
                              .then((res) => res.json())
                              .then((json) => {});
                          }
                        }}
                      >
                        <Ionicons
                          name="heart-outline"
                          size={24}
                          color="black"
                        />
                        <Text>{view.loving}</Text>
                      </TouchableOpacity>
                      <View>
                        <Text>{view.rating}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }
            }
          })}
        </View>
        <SafeAreaView>
          <Modal
            transparent={true}
            animationType="slide"
            visible={visibleMoal.mode}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setVisibleModal({
                    mode: false,
                    name: "",
                    dong: "",
                    foodform: "",
                    tablenum: 0,
                    loving: 0,
                    rating: 0,
                  });
                }}
              >
                <Feather
                  name="x"
                  size={40}
                  color="black"
                  style={{ marginLeft: 290 }}
                />
              </TouchableOpacity>
              <View style={styles.modalbox}>
                <View style={styles.lineStyle} />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ fontSize: 30 }}>{visibleMoal.name}</Text>
                  <Text style={{ fontSize: 20 }}>({visibleMoal.dong})</Text>
                </View>
                <View style={styles.lineStyle} />
                <Text style={{ fontSize: 20 }}>{visibleMoal.foodform}</Text>
                <View style={styles.lineStyle} />
                <Text style={{ fontSize: 18 }}>
                  잔여 테이블 : {visibleMoal.tablenum}
                </Text>
                <View style={styles.lineStyle} />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={() => {
                      const loving = {
                        name: visibleMoal.name,
                        dong: visibleMoal.dong,
                        loving: visibleMoal.loving + 1,
                      };
                      fetch("http://localhost:8080/updateloving", {
                        method: "PUT", // 업데이트
                        headers: {
                          "content-type": "application/json",
                        },
                        body: JSON.stringify(loving),
                      })
                        .then((res) => res.json())
                        .then((json) => {});

                      const lovinglist = {
                        name: visibleMoal.name,
                        dong: visibleMoal.dong,
                      };
                      fetch("http://localhost:8080/updateloving", {
                        method: "PUT", // 업데이트
                        headers: {
                          "content-type": "application/json",
                        },
                        body: JSON.stringify(loving),
                      })
                        .then((res) => res.json())
                        .then((json) => {});
                    }}
                  >
                    <Ionicons name="heart-outline" size={24} color="black" />
                  </TouchableOpacity>
                  <Text style={{ fontSize: 18 }}>{visibleMoal.loving}</Text>
                </View>
                <View style={styles.lineStyle} />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Feather name="star" size={24} color="black" />
                  <Text style={{ fontSize: 18 }}>{visibleMoal.rating}</Text>
                </View>
                <View style={styles.lineStyle} />
                <TouchableOpacity
                  onPress={() => {
                    updatereservation();
                    setVisibleModal({
                      mode: false,
                      name: "",
                      dong: "",
                      foodform: "",
                      tablenum: 0,
                      loving: 0,
                      rating: 0,
                    });
                  }}
                >
                  <Ionicons
                    name="timer"
                    size={24}
                    color="black"
                    style={styles.reservationBox}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
      </View>
    );
  };
  // };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ height: 130, backgroundColor: "#ff6666" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Entypo
              name="heart"
              size={40}
              color="white"
              style={{ marginTop: 70 }}
            />
          </View>
        </View>
        <View style={{ borderWidth: 1 }}></View>
        <View>{searchresult()}</View>
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
    borderWidth: 2,
    borderRadius: 13,
    marginTop: 60,
    width: 300,
    height: 50,
    textAlign: "center",
    fontSize: 20,
  },
  modalbox: {
    borderRadius: 20,
    height: 500,
    width: 270,
    borderWidth: 3,
    borderColor: "black",
    backgroundColor: "#ffffff",
    padding: 5,
    alignItems: "center",
  },
  lineStyle: {
    borderWidth: 1,
    borderColor: "black",
    margin: 10,
    width: 200,
  },
  reservationBox: {
    backgroundColor: "black",
    padding: 8,
    height: 40,
    width: 100,
    marginTop: 15,
    alignSelf: "center",
    textAlign: "center",
    color: "white",
  },
});

export default Like;
