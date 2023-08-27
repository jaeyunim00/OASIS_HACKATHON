import React from "react";
import { CommonActions, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, Image } from "react-native";

import DogScreen from "./screens/dog";
import MainScreen from "./screens/main";
import ComplainScreen from "./screens/complain";
import MyPageScreen from "./screens/MyPage/MyPageScreen";
import LoginScreen from "./screens/MyPage/LoginScreen";
import SignupScreen from "./screens/MyPage/SignupScreen";
import LoggedInMyPage from "./screens/MyPage/LoggedInMyPage";
import LoggedOutMyPage from "./screens/MyPage/LoggedOutMyPage";
import FacilityScreen from "./screens/Facility/FacilityScreen";
import BoardScreen from "./screens/Board/BoardScreen";
import UploadScreen from "./screens/Board/UploadScreen";
import CameraScreen from "./screens/Board/CameraScreen";

import { AuthProvider, useAuth } from "./AuthContext";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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
      <AuthProvider>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "#8FBF4D",
          }}
        >
          <Tab.Screen
            name="Main"
            initialRouteName="Main"
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabBarIcon focused={focused} iconName="홈" />
              ),
            }}
          >
            {() => (
              <Stack.Navigator>
                <Stack.Screen
                  name="MainPage"
                  component={MainScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Facility"
                  component={FacilityScreen}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen
            name="스토리"
            options={{
              tabBarIcon: ({ focused }) => (
                <TabBarIcon focused={focused} iconName="카메라" />
              ),
            }}
          >
            {() => (
              <Stack.Navigator>
                <Stack.Screen
                  name="Board"
                  component={BoardScreen}
                  // options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Upload"
                  component={UploadScreen}
                  // options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Camera"
                  component={CameraScreen}
                  // options={{ headerShown: false }}
                />
              </Stack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen
            name="키우기"
            component={DogScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabBarIcon focused={focused} iconName="산책로" />
              ),
            }}
          />
          <Tab.Screen
            name="민원"
            component={ComplainScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabBarIcon focused={focused} iconName="게시판" />
              ),
            }}
          />
          <Tab.Screen
            name="내 정보"
            options={{
              tabBarIcon: ({ focused }) => (
                <TabBarIcon focused={focused} iconName="마이" />
              ),
            }}
          >
            {() => (
              <Stack.Navigator>
                <Stack.Screen name="MyPage" component={MyPageScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen
                  name="LoggedInMyPage"
                  component={LoggedInMyPage}
                />
                <Stack.Screen
                  name="LoggedOutMyPage"
                  component={LoggedOutMyPage}
                />
              </Stack.Navigator>
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}
