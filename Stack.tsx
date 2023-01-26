import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Tab from "./Components/inter/TabMain";
import Login from "./Components/user/Login";
import Korea from "./Components/inter/Home/Foodform/Korea";
import China from "./Components/inter/Home/Foodform/China";
import Japan from "./Components/inter/Home/Foodform/Japan";
import Meat from "./Components/inter/Home/Foodform/Meat";
import Drink from "./Components/inter/Home/Foodform/Drink";
import Signupuser from "./Components/user/SignupUser";
import Signupchoice from "./Components/user/Signupchoice";
import Signuponer from "./Components/user/SignupOner";
import First from "./Components/user/First";
import User from "./Components/inter/UserInter/User";
import Newyear from "./Components/inter/Home/Card/Newyear";
import Sale from "./Components/inter/Home/Card/Sale";
import Hot from "./Components/inter/Home/Card/Hot";
import Credit from "./Components/inter/UserInter/UserMenu/Credit";
import Coupon from "./Components/inter/UserInter/UserMenu/Coupon";
import Point from "./Components/inter/UserInter/UserMenu/Point";
import Present from "./Components/inter/UserInter/UserMenu/Present";

const Stack = createStackNavigator();

function StackNavigation() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="First"
        component={First}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signupchoice"
        component={Signupchoice}
        options={{
          title: "choice",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signupuser"
        component={Signupuser}
        options={{ title: "회원가입" }}
      />
      <Stack.Screen
        name="Signuponer"
        component={Signuponer}
        options={{ title: "회원가입" }}
      />
      <Stack.Screen
        name="Tab"
        component={Tab}
        options={{
          title: "Main",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Korea"
        component={Korea}
        options={{ title: "한식", headerShown: false }}
      />
      <Stack.Screen
        name="China"
        component={China}
        options={{ title: "중식", headerShown: false }}
      />
      <Stack.Screen
        name="Meat"
        component={Meat}
        options={{ title: "양식", headerShown: false }}
      />
      <Stack.Screen
        name="Japan"
        component={Japan}
        options={{ title: "일식", headerShown: false }}
      />
      <Stack.Screen
        name="Drink"
        component={Drink}
        options={{ title: "술", headerShown: false }}
      />
      <Stack.Screen
        name="User"
        component={User}
        options={{
          title: "user",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Newyear"
        component={Newyear}
        options={{ title: "Newyear", headerShown: false }}
      />
      <Stack.Screen
        name="Sale"
        component={Sale}
        options={{ title: "Sale", headerShown: false }}
      />
      <Stack.Screen
        name="Hot"
        component={Hot}
        options={{ title: "Hot", headerShown: false }}
      />
      <Stack.Screen
        name="Credit"
        component={Credit}
        options={{ title: "Credit", headerShown: false }}
      />
      <Stack.Screen
        name="Coupon"
        component={Coupon}
        options={{ title: "Coupon", headerShown: false }}
      />
      <Stack.Screen
        name="Point"
        component={Point}
        options={{ title: "Point", headerShown: false }}
      />
      <Stack.Screen
        name="Present"
        component={Present}
        options={{ title: "Present", headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigation;
