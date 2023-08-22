import React from "react";
import { View, StyleSheet } from "react-native";
import { useAuth } from "../../AuthContext";

import LoggedInMyPage from "./LoggedInMyPage";
import LoggedOutMyPage from "./LoggedOutMyPage";

const MyPageScreen = () => {
  const { isLoggedIn } = useAuth();

  return (
    <View style={styles.container}>
      {isLoggedIn ? <LoggedInMyPage /> : <LoggedOutMyPage />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
});

export default MyPageScreen;
