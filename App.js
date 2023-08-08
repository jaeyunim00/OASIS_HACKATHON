import React from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DogScreen from "./screens/dog";
import MainScreen from "./screens/main";
import ComplainScreen from "./screens/complain";
import StoryScreen from "./screens/story";
import UserScreen from "./screens/user";

const Tap = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tap.Navigator>
        <Tap.Screen name="공원" component={MainScreen} />
        <Tap.Screen name="산책" component={DogScreen} />
        <Tap.Screen name="스토리" component={StoryScreen} />
        <Tap.Screen name="민원" component={ComplainScreen} />
        <Tap.Screen name="내 정보" component={UserScreen} />
      </Tap.Navigator>
    </NavigationContainer>
  );
}
