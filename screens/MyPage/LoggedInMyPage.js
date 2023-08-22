import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../AuthContext";

const MenuItem = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Text style={styles.menuItemText}>{title}</Text>
    </TouchableOpacity>
  );
};

const LoggedInMyPage = () => {
  const navigation = useNavigation();
  const { isLoggedIn, handleLoggedout, userEmail } = useAuth();

  const handleSettingsPress = () => {
    navigation.navigate("Settings");
  };

  return (
    <View style={styles.container}>
      {/* 프로필 박스 */}
      <View style={styles.profileBox}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={handleSettingsPress}
        >
          <Text style={styles.settingsButtonText}>Settings</Text>
        </TouchableOpacity>
        <Image
          source={require("../../assets/tabBar/게시판.png")}
          style={styles.profileImage}
        />
        <Text style={styles.username}>
          {isLoggedIn ? userEmail : "로그인 안됨"}
        </Text>
        <Text style={styles.points}>250 Points</Text>
      </View>
      <View style={styles.menuBox}>
        <MenuItem title="알림 설정" />
        <MenuItem title="평가 관리" />
        <MenuItem title="포인트" />
        <MenuItem title="내가 쓴 글/댓글" />
        <MenuItem title="고객 센터" />
        <MenuItem title="로그아웃" onPress={handleLoggedout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  // ... 다른 스타일들
  menuItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  menuItemText: {
    fontSize: 16,
    color: "#333333",
  },
});

export default LoggedInMyPage;
