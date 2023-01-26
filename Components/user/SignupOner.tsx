import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { SelectList } from "react-native-dropdown-select-list";
import Axios from "axios";

function Signuponer({ navigation }: any) {
  const [signuponer, setsignuponer] = useState({
    information: 1,
    id: "",
    pw: "",
    addressx: "",
    addressy: "",
  });

  const [restaurant, setrestaurant] = useState({
    addressx: "",
    addressy: "",
    name: "",
  });

  const onChange = (
    keyvalue: any,
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    const { text } = e.nativeEvent;
    setsignuponer({
      ...signuponer,
      [keyvalue]: text,
    });
  };

  const onChangeres = (
    keyvalue: any,
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    const { text } = e.nativeEvent;
    setrestaurant({
      ...restaurant,
      [keyvalue]: text,
    });
  };

  const oncreateoner = () => {
    const menu = {
      information: signuponer.information,
      id: signuponer.id,
      pw: signuponer.pw,
      addressx: signuponer.addressx,
      addressy: signuponer.addressy,
    };
    fetch("http://localhost:8080/createoner", {
      method: "post", // 생성
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(menu),
    })
      .then((res) => res.json())
      .then((json) => {});
  };
  const [dong, setdong] = useState("");
  const dongdata = [
    { key: "1", value: "쌍용동" },
    { key: "2", value: "신불당" },
    { key: "3", value: "신방동" },
    { key: "4", value: "성정동" },
    { key: "5", value: "두정동" },
    { key: "6", value: "신부동" },
  ];
  const [foodform, setfoodform] = useState("");
  const foodformdata = [
    { key: "1", value: "한식" },
    { key: "2", value: "중식" },
    { key: "3", value: "양식" },
    { key: "4", value: "일식" },
    { key: "5", value: "음주" },
  ];
  const [table, settable] = useState("");
  const tabledata = [
    { key: "1", value: "1" },
    { key: "2", value: "2" },
    { key: "3", value: "3" },
    { key: "4", value: "4" },
    { key: "5", value: "5" },
    { key: "6", value: "6" },
    { key: "7", value: "7" },
    { key: "8", value: "8" },
    { key: "9", value: "9" },
    { key: "10", value: "10" },
    { key: "11", value: "11" },
    { key: "12", value: "12" },
    { key: "13", value: "13" },
    { key: "14", value: "14" },
    { key: "15", value: "15" },
  ];

  const oncreaterestaurant = () => {
    const menu = {
      name: restaurant.name,
      dong: dong,
      foodform: foodform,
      addressx: restaurant.addressx,
      addressy: restaurant.addressy,
      table: Number(table),
    };
    fetch("http://localhost:8080/createrestaurant", {
      method: "post", // 생성
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(menu),
    })
      .then((res) => res.json())
      .then((json) => {});
  };

  const [user, setuser]: any = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:8080/user").then((response) => {
      setuser(response.data); //데이터 받아옴
    });
  });
  const [oner, setoner]: any = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:8080/oner").then((response) => {
      setoner(response.data); //데이터 받아옴
    });
  });

  return (
    <ScrollView style={styles.container}>
      <View>
        <FontAwesome
          name="connectdevelop"
          size={20}
          color="#cc00cc"
          style={{
            textAlign: "center",
            fontSize: 100,
            marginTop: 40,
            justifyContent: "center",
          }}
        />
      </View>
      <View style={styles.loginbox}>
        <View>
          <TextInput
            placeholder="ID"
            style={styles.input}
            onChange={(e) => onChange("id", e)}
            value={signuponer.id}
          />
          <TextInput
            placeholder="PassWord"
            secureTextEntry={true}
            style={styles.input}
            onChange={(e) => onChange("pw", e)}
            value={signuponer.pw}
          />

          <TextInput
            placeholder="Address X"
            style={styles.input}
            onChange={(e) => {
              onChange("addressx", e);
              onChangeres("addressx", e);
            }}
            value={signuponer.addressx}
          />

          <TextInput
            placeholder="Address Y"
            style={styles.input}
            onChange={(e) => {
              onChange("addressy", e);
              onChangeres("addressy", e);
            }}
            value={signuponer.addressy}
          />

          <TextInput
            placeholder="Name"
            style={styles.input}
            onChange={(e) => onChangeres("name", e)}
            value={restaurant.name}
          />
          <View
            style={{
              margin: 12,
            }}
          >
            <SelectList
              boxStyles={{ borderRadius: 20 }}
              setSelected={(val: any) => setdong(val)}
              data={dongdata}
              save="value"
            />
          </View>
          <View
            style={{
              margin: 12,
            }}
          >
            <SelectList
              boxStyles={{ borderRadius: 20 }}
              setSelected={(val: any) => setfoodform(val)}
              data={foodformdata}
              save="value"
            />
          </View>
          <View
            style={{
              margin: 12,
            }}
          >
            <SelectList
              boxStyles={{ borderRadius: 20 }}
              setSelected={(val: any) => settable(val)}
              data={tabledata}
              save="value"
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#6633ff",
              padding: 8,
              height: 40,
              width: 100,
              borderRadius: 20,
              marginTop: 20,
              alignSelf: "center",
            }}
            onPress={() => {
              let res: boolean = false;
              for (let i = 0; i < user.length; i++) {
                //다르네
                if (user[i].id !== signuponer.id) {
                  //다르네
                  console.log(user[i].id);
                  res = false;
                  for (let q = 0; q < oner.length; q++) {
                    console.log(oner[q].id);
                    if (oner[q].id === signuponer.id) {
                      //같네
                      res = true;
                      break;
                    } else {
                      //다르네
                      res = false;
                    }
                  }
                } else {
                  //같네
                  res = true;
                  break;
                }
              }
              if (res === true) {
                alert("ID가 중복됩니다.");
              } else if (res === false) {
                oncreateoner();
                oncreaterestaurant();
                navigation.navigate("Login");
                alert("Welcome!");
              }
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 18,
              }}
            >
              SignUp
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
  },
  appTitle: {
    fontSize: 36,
    marginTop: 20,
    marginBottom: -10,
    fontWeight: "300",
    textAlign: "center",
  },
  loginbox: {
    borderRadius: 50,
    borderStyle: "solid",
    padding: 20,
    margin: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },
});

export default Signuponer;
