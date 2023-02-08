import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Map from "./Mapview";
import Home from "./Home/Home";
import Like from "./LovingList";
import Search from "./Search";
import User from "./UserInter/User";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

function TabMain({ route }: any) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { position: "absolute" },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "",
          tabBarIcon: () => (
            <Ionicons name="home-outline" size={24} color="black" />
          ),
          unmountOnBlur: true,
        }}
        initialParams={{
          num: route.params.num,
          id: route.params.id,
          name: route.params.name,
          point: route.params.point,
          reservation: route.params.reservation,
          lovinglist: route.params.lovinglist,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          title: "",
          tabBarIcon: () => <Ionicons name="search" size={24} color="black" />,
          unmountOnBlur: true,
        }}
        initialParams={{
          num: route.params.num,
          id: route.params.id,
          name: route.params.name,
          point: route.params.point,
          reservation: route.params.reservation,
          lovinglist: route.params.lovinglist,
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          title: "",
          tabBarIcon: () => <Entypo name="map" size={24} color="black" />,
          unmountOnBlur: true,
        }}
        initialParams={{
          num: route.params.num,
          id: route.params.id,
          name: route.params.name,
          point: route.params.point,
          reservation: route.params.reservation,
          lovinglist: route.params.lovinglist,
        }}
      />

      <Tab.Screen
        name="Like"
        component={Like}
        options={{
          title: "",
          tabBarIcon: () => (
            <Ionicons name="heart-outline" size={24} color="black" />
          ),
          unmountOnBlur: true,
        }}
        initialParams={{
          num: route.params.num,
          id: route.params.id,
          name: route.params.name,
          point: route.params.point,
          reservation: route.params.reservation,
          lovinglist: route.params.lovinglist,
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          title: "",
          tabBarIcon: () => <Feather name="user" size={24} color="black" />,
          unmountOnBlur: true,
        }}
        initialParams={{
          num: route.params.num,
          id: route.params.id,
          name: route.params.name,
          point: route.params.point,
          reservation: route.params.reservation,
          lovinglist: route.params.lovinglist,
        }}
      />
    </Tab.Navigator>
  );
}

export default TabMain;
