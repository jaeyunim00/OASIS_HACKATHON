import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../AuthContext";

const LoggedOutMyPage = () => {
  const navigation = useNavigation();
  const { handleLoginScreenPress } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.message}>로그인이 필요합니다.</Text>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLoginScreenPress}
      >
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#8FBF4D",
    borderRadius: 5,
    width: 200,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default LoggedOutMyPage;
