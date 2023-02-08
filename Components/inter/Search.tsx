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

function Search({ route, navigation }: any) {
  const [text, onChangeText] = useState("");

  const searchresult = () => {
    const [view, setview]: any = useState([]);
    let [user, setuser]: any = useState([]);
    let [plz, setplz]: any = useState(false);
    const [udata, setudata] = useState({
      num: 0,
      id: "",
      point: "",
      reservation: "",
      name: "",
      lovinglist: route.params.lovinglist,
    });

    const curuser = () => {
      user.map((user: any) => {
        if (user.id === route.params.id) {
          setudata({
            num: user.num,
            id: user.id,
            point: user.point,
            reservation: user.reservation,
            name: user.name,
            lovinglist: user.lovinglist,
          });
        }
      });
    };

    const getuser = async () => {
      const posts = await Axios.get("http://localhost:8080/user");
      setuser(posts.data);
    };

    const getres = async () => {
      const posts = await Axios.get("http://localhost:8080/onerRestaurant");
      setview(posts.data);
    };

    useEffect(() => {
      getuser();
      getres();
      curuser();
    }, [plz]);
    const a = udata.lovinglist;
    const b = JSON.parse(a);

    const filtered = view.filter((view: any) => {
      return view.name.toUpperCase().includes(text.toUpperCase());
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
      getuser();
      getres();
      setplz(!plz);
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
      getuser();
      getres();
      setplz(!plz);
    };

    const increseloving = (vi: any) => {
      const loving = {
        name: vi.name,
        dong: vi.dong,
        loving: vi.loving + 1,
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
      getuser();
      getres();
      setplz(!plz);
      console.log(loving.loving);
    };
    const addlovinglist = (vi: any) => {
      const lovinglist = {
        num: route.params.num,
        dong: vi.dong,
        name: vi.name,
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
      getuser();
      getres();
      setplz(!plz);
    };

    const decreaseloving = (vi: any) => {
      const loving = {
        name: vi.name,
        dong: vi.dong,
        loving: vi.loving - 1,
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
      getuser();
      getres();
      setplz(!plz);
      console.log(loving.loving);
    };
    const dellovinglist = (vi: any) => {
      const deletelovinglist = {
        num: route.params.num,
        dong: vi.dong,
        name: vi.name,
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
      getuser();
      getres();
      setplz(!plz);
    };

    return (
      <View>
        <View>
          {filtered.map((view: any) => {
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
                      const includekey = Object.keys(b).includes(view.name);
                      console.log(includekey);
                      if (includekey !== true) {
                        //귀찮,,, 값 없으면 실행해!
                        addlovinglist(view);
                        increseloving(view);
                        setplz(!plz);
                      } else {
                        dellovinglist(view);
                        decreaseloving(view);
                        setplz(!plz);
                      }
                    }}
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
                  <View>
                    <Ionicons name="heart-outline" size={24} color="black" />
                  </View>
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
                    if (udata.reservation === "") {
                      updatereservation();
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
        <Text></Text>
        <Text></Text>
        <Text></Text>
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
        <View style={{ height: 130, backgroundColor: "#ff9966" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TextInput
              style={styles.input}
              placeholder="🔍"
              onChangeText={onChangeText}
              value={text}
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

export default Search;
