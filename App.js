import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

import DogScreen from "./screens/dog";
import MainScreen from "./screens/main";
import ComplainScreen from "./screens/complain";
import StoryScreen from "./screens/story";
import UserScreen from "./screens/user";

const Tab = createBottomTabNavigator();

const iconMapping = {
  홈: {
    focused: require("./assets/tabBar/홈_포커스.png"),
    unfocused: require("./assets/tabBar/홈.png"),
  },

  산책로: {
    focused: require("./assets/tabBar/산책로_포커스.png"),
    unfocused: require("./assets/tabBar/산책로.png"),
  },
  카메라: {
    focused: require("./assets/tabBar/카메라_포커스.png"),
    unfocused: require("./assets/tabBar/카메라.png"),
  },
  게시판: {
    focused: require("./assets/tabBar/게시판_포커스.png"),
    unfocused: require("./assets/tabBar/게시판.png"),
  },
  마이: {
    focused: require("./assets/tabBar/마이_포커스.png"),
    unfocused: require("./assets/tabBar/마이.png"),
  },
};

const TabBarIcon = ({ focused, iconName }) => {
  const iconInfo = iconMapping[iconName];
  const iconImage = focused ? iconInfo.focused : iconInfo.unfocused;

  return <Image source={iconImage} style={{ width: 25, height: 25 }} />;
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#8FBF4D", // 포커스된 탭의 색상을 파란색으로 변경
        }}
      >
        <Tab.Screen
          name="공원"
          component={MainScreen}
          initialRouteName="Main"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} iconName="홈" />
            ),
          }}
        />
        <Tab.Screen
          name="산책"
          component={DogScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} iconName="산책로" />
            ),
          }}
        />
        <Tab.Screen
          name="스토리"
          component={StoryScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} iconName="카메라" />
            ),
          }}
        />
        <Tab.Screen
          name="민원"
          component={ComplainScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} iconName="게시판" />
            ),
          }}
        />
        <Tab.Screen
          name="내 정보"
          component={UserScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused} iconName="마이" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
