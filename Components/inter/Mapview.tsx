import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import MapView, { Marker } from "react-native-maps";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  SafeAreaView,
} from "react-native";
import Axios from "axios";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

function Home({ route, navigation }: any) {
  const [amap, setamap]: any = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:8080/map").then((response) => {
      setamap(response.data); //데이터 받아옴
    });
  });

  const [a, seta] = useState({
    latitude: 36.7996,
    longitude: 127.1221,
    latitudeDelta: 0.005,
    longitudeDelta: 0.00001,
  });

  const mapmar = amap.map((map: any, ind: any) => {
    return (
      <Marker
        key={ind}
        coordinate={{
          latitude: Number(map.addressx),
          longitude: Number(map.addressy),
        }}
        title={map.name}
        onPress={() => {
          setVisibleModal({
            mode: true,
            name: map.name,
            dong: map.dong,
            foodform: map.foodform,
            tablenum: map.tablenum,
            loving: map.loving,
            rating: map.rating,
          });
        }}
      />
    );
  });
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

  const updatetablenum = () => {
    const menu = {
      tablenum: visibleMoal.tablenum - 1,
      name: visibleMoal.name,
      dong: visibleMoal.dong,
    };
    fetch("http://localhost:8080/updatetablenum", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(menu),
    })
      .then((res) => res.json())
      .then((json) => {});
  };

  // renders
  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={a} provider="google">
        {mapmar}
      </MapView>
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
                    const a = JSON.parse(route.params.lovinglist);
                    const includekey = Object.keys(a).includes(amap.name);
                    if (includekey !== true) {
                      //귀찮,,, 값 없으면 실행해!
                      const loving = {
                        name: amap.name,
                        dong: amap.dong,
                        loving: amap.loving + 1,
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
                        dong: amap.dong,
                        name: amap.name,
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
                        name: amap.name,
                        dong: amap.dong,
                        loving: amap.loving - 1,
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
                        dong: amap.dong,
                        name: amap.name,
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
                  if (route.params.reservation === "") {
                    updatetablenum();
                  } else {
                    alert(
                      "이미 예약 한 가게가 있습니다.\n 취소 후 이용 해 주세요"
                    );
                  }
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
  },
  contentContainer: {
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: 1000,
  },
  box: {
    borderWidth: 1,
    marginTop: 30,
    borderRadius: 20,
    width: 300,
    height: 170,
    justifyContent: "space-between",
    alignSelf: "center",
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

export default Home;
