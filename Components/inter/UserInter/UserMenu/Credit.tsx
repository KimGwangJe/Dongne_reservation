import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import Axios from "axios";

function Credit({ route, navigation }: any) {
  const [getcard, setgetcard]: any = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:8080/card").then((response) => {
      setgetcard(response.data); //데이터 받아옴
    });
  });

  const [card, setcard] = useState({
    cardname: "",
    username: "",
    cardnum: "",
    password: "",
    cvc: "",
    balance: 200,
  });

  const onChange = (
    keyvalue: any,
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    const { text } = e.nativeEvent;
    setcard({
      ...card,
      [keyvalue]: text,
    });
  };

  const [bank, setbank] = useState("");
  const carddata = [
    { key: "1", value: "카카오뱅크" },
    { key: "2", value: "농협은행" },
    { key: "3", value: "신한은행" },
    { key: "4", value: "국민은행" },
    { key: "5", value: "우리은행" },
  ];

  let cdata = {
    id: 0,
    bank: "",
    cardname: "",
    username: "",
    balance: "",
  };

  let regi = false;

  getcard.map((getcard: any) => {
    if (getcard.username === route.params.route.name) {
      regi = true;
      cdata = {
        id: getcard.id,
        bank: getcard.bank,
        cardname: getcard.username,
        username: getcard.username,
        balance: getcard.balance,
      };
    } else {
      regi = false;
    }
  });

  return (
    <View style={styles.container}>
      <View style={{ height: 130, backgroundColor: "#ccffcc" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <FontAwesome
            name="cc-mastercard"
            size={44}
            color="#000033"
            style={{ marginTop: 65 }}
          />
        </View>
      </View>
      <View>
        {regi ? (
          <View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 20,
                  height: 180,
                  width: "80%",
                  margin: 10,
                }}
              >
                <Text
                  style={{ textAlign: "center", marginTop: 60, fontSize: 40 }}
                >
                  {cdata.cardname}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderWidth: 1,
                width: "10%",
                justifyContent: "center",
                flexDirection: "row",
              }}
            ></View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 10,
                  fontSize: 20,
                  marginBottom: 4,
                }}
              >
                {cdata.bank}
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                width: "30%",
                justifyContent: "center",
                flexDirection: "row",
              }}
            ></View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  marginTop: 7,
                  marginBottom: 4,
                  fontSize: 20,
                }}
              >
                user : {cdata.username}
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                width: "50%",
                justifyContent: "center",
                flexDirection: "row",
              }}
            ></View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text style={{ textAlign: "center", marginTop: 7, fontSize: 20 }}>
                $ {cdata.balance}
              </Text>
            </View>
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
                  id: cdata.id,
                };
                fetch("http://localhost:8080/deletecard", {
                  method: "DELETE", // 삭제
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify(menu),
                })
                  .then((res) => res.json())
                  .then((json) => {});
                alert("삭제가 완료 되었습니다.");
              }}
            >
              <Text
                style={{ textAlign: "center", color: "white", fontSize: 18 }}
              >
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.loginbox}>
            <View>
              <View
                style={{
                  margin: 12,
                }}
              >
                <Text>Bank</Text>
                <SelectList
                  boxStyles={{ borderRadius: 20 }}
                  setSelected={(val: any) => setbank(val)}
                  data={carddata}
                  save="value"
                />
              </View>
              <Text>CardName</Text>
              <TextInput
                placeholder="Card Name"
                style={styles.input}
                onChange={(e) => onChange("cardname", e)}
                value={card.cardname}
                maxLength={10}
              />
              <Text>CardNumber</Text>
              <TextInput
                placeholder="ex) 1111-2222-3333-4444"
                style={styles.input}
                onChange={(e) => onChange("cardnum", e)}
                value={card.cardnum}
                keyboardType={"numeric"}
                maxLength={19}
              />
              <Text>Password</Text>
              <TextInput
                placeholder="maxLength = 4"
                style={styles.input}
                onChange={(e) => onChange("password", e)}
                value={card.password}
                secureTextEntry={true}
                keyboardType={"numeric"}
                maxLength={4}
              />
              <Text>CVC</Text>
              <TextInput
                placeholder="maxLength = 3"
                style={styles.input}
                onChange={(e) => onChange("cvc", e)}
                value={card.cvc}
                secureTextEntry={true}
                maxLength={3}
                keyboardType={"numeric"}
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
                  if (
                    card.cardname === "" ||
                    bank === "" ||
                    card.cardnum === "" ||
                    card.password === "" ||
                    card.cvc === ""
                  ) {
                    alert("fill out/in");
                  } else {
                    const menu = {
                      bank: bank,
                      cardname: card.cardname,
                      username: route.params.route.id,
                      cardnum: card.cardnum,
                      password: card.password,
                      cvc: card.cvc,
                      balance: Number(card.balance),
                    };
                    fetch("http://localhost:8080/createcard", {
                      method: "post", // 생성
                      headers: {
                        "content-type": "application/json",
                      },
                      body: JSON.stringify(menu),
                    })
                      .then((res) => res.json())
                      .then((json) => {});
                    alert("complete!!");
                    setcard({
                      cardname: "",
                      username: "",
                      cardnum: "",
                      password: "",
                      cvc: "",
                      balance: 200,
                    });
                    setbank("");
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
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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

export default Credit;
