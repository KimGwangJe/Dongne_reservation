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
import Axios from "axios";

function Signupuser({ navigation }: any) {
  const [signupuser, setsignupuser] = useState({
    information: 0,
    id: "",
    pw: "",
    name: "",
    point: 0,
    reservation: null,
  });

  const onChange = (
    keyvalue: string,
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    const { text } = e.nativeEvent;
    setsignupuser({
      ...signupuser,
      [keyvalue]: text,
    });
  };

  const oncreate = () => {
    const menu = {
      information: signupuser.information,
      id: signupuser.id,
      pw: signupuser.pw,
      name: signupuser.name,
      point: signupuser.point,
      reservation: signupuser.reservation,
    };
    fetch("http://localhost:8080/createuser", {
      method: "post", // 생성
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(menu),
    })
      .then((res) => res.json())
      .then((json) => {});
  };
  //여기서 검사 시켜
  const [user, setuser]: any = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:8080/user").then((response) => {
      setuser(response.data); //데이터 받아옴
    });
  }, []);
  const [oner, setoner]: any = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:8080/oner").then((response) => {
      setoner(response.data); //데이터 받아옴
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FontAwesome
          name="connectdevelop"
          size={20}
          color="#cc00cc"
          style={{
            textAlign: "center",
            fontSize: 100,
            marginTop: 90,
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
            value={signupuser.id}
          />

          <TextInput
            placeholder="PassWord"
            secureTextEntry={true}
            style={styles.input}
            onChange={(e) => onChange("pw", e)}
            value={signupuser.pw}
          />

          <TextInput
            placeholder="Name"
            style={styles.input}
            onChange={(e) => onChange("name", e)}
            value={signupuser.name}
          />
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
                if (user[i].id !== signupuser.id) {
                  //다르네
                  console.log(user[i].id);
                  res = false;
                  for (let q = 0; q < oner.length; q++) {
                    console.log(oner[q].id);
                    if (oner[q].id === signupuser.id) {
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
                oncreate();
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
    </SafeAreaView>
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
    marginTop: 20,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },
});

export default Signupuser;
