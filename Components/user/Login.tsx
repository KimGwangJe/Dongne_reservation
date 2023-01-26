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

function Login({ navigation }: any) {
  const [user, setuser]: any = useState([]);
  const [oner, setoner]: any = useState([]);

  const [login, setlogin] = useState({
    id: "",
    pw: "",
  });

  useEffect(() => {
    Axios.get("http://localhost:8080/user").then((response) => {
      setuser(response.data); //데이터 받아옴
    });
  }, []);
  useEffect(() => {
    Axios.get("http://localhost:8080/oner").then((response) => {
      setoner(response.data); //데이터 받아옴
    });
  }, []);

  const onChange = (
    keyvalue: string,
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    const { text } = e.nativeEvent;
    setlogin({
      ...login,
      [keyvalue]: text,
    });
  };

  const onReset = () => {
    setlogin({
      id: "",
      pw: "",
    });
  };

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
            marginTop: 160,
            justifyContent: "center",
          }}
        />
        <Text style={{ textAlign: "center", fontSize: 20, marginTop: 20 }}>
          Dong - RE
        </Text>
      </View>
      <View style={styles.loginbox}>
        <View>
          <TextInput
            placeholder="ID"
            style={styles.input}
            onChange={(e) => onChange("id", e)}
            value={login.id}
          />
          <TextInput
            placeholder="PassWord"
            secureTextEntry={true}
            style={styles.input}
            onChange={(e) => onChange("pw", e)}
            value={login.pw}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#6633ff",
              padding: 8,
              height: 40,
              width: 100,
              borderRadius: 20,
              alignSelf: "center",
            }}
            onPress={() => {
              let log: boolean = false;
              for (let i = 0; i < user.length; i++) {
                if (login.id === user[i].id && login.pw === user[i].pw) {
                  log = true;
                  navigation.navigate("Tab", {
                    num: user[i].num,
                    id: user[i].id,
                    name: user[i].name,
                    point: user[i].point,
                    reservation: user[i].reservation,
                    lovinglist: user[i].lovinglist,
                  });
                  onReset();
                  break;
                } else if (login.id === "" || login.pw === "") {
                  log = true;
                  alert("fill in ID / PW");
                  break;
                }
              }
              if (log === false) {
                alert("incorrect ID or PW");
              }
            }}
          >
            <Text style={{ textAlign: "center", color: "white", fontSize: 18 }}>
              LOGIN
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 17 }}>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              onReset();
              navigation.navigate("Signupchoice");
            }}
          >
            <Text style={{ color: "#6633ff", fontSize: 17 }}>Sign up</Text>
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
    height: 400,
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

export default Login;
