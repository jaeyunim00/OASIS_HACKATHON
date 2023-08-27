import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../AuthContext";
import Icon from "react-native-vector-icons/FontAwesome";

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

  console.log(isLoggedIn);

  return (
    <View style={styles.container}>
      <View style={styles.my_info}>
        <View style={styles.info_lv1}>
          <Text style={styles.info_text}>마이페이지</Text>
          <Icon name="gear" size={20} style={{ color: "#487548" }} />
        </View>
        <View style={styles.info_lv2}>
          <Image
            source={require("../../assets/profile1.png")}
            style={{
              width: 150,
              height: 150,
              borderRadius: 75,
            }}
          />
        </View>
        <View style={styles.info_lv3}>
          <Text style={styles.info_text}>[닉네임]</Text>
        </View>
        <View style={styles.info_lv4}>
          <Text style={[styles.info_text, styles.info_deco_point]}>
            내 포인트 [포인트]p
          </Text>
        </View>
      </View>
      <View style={styles.split_box}></View>
      <View style={styles.my_navi}>
        <View style={styles.navi_row}>
          <Icon
            name="bell"
            size={20}
            style={{ marginRight: 10, color: "#487548", marginRight: 10 }}
          />
          <Text>알림설정</Text>
        </View>
        <View style={styles.navi_row}>
          <Icon
            name="paw"
            size={20}
            style={{ marginRight: 10, color: "#487548" }}
          />
          <Text>평가 관리</Text>
        </View>
        <View style={styles.navi_row}>
          <Icon
            name="tree"
            size={20}
            style={{ marginRight: 10, color: "#487548" }}
          />
          <Text>포인트</Text>
        </View>
        <View style={styles.navi_row}>
          <Icon
            name="clipboard"
            size={20}
            style={{ marginRight: 10, color: "#487548" }}
          />
          <Text>내가 쓴 글</Text>
        </View>
      </View>
      <View>
        <View style={styles.navi_row}>
          <Icon
            name="phone"
            size={20}
            style={{ marginRight: 10, color: "#487548" }}
          />
          <Text>고객센터</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    color: "#487548",
  },
  my_info: {},
  info_text: {
    color: "#487548",
    fontWeight: "bold",
  },
  info_deco_point: {
    backgroundColor: "yellow",
    padding: 10,
  },
  info_lv1: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  info_lv2: {
    alignItems: "center",
    padding: 10,
  },
  info_lv3: {
    alignItems: "center",
    padding: 10,
  },
  info_lv4: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "",
  },
  split_box: {
    width: "100%",
    height: 5,
    backgroundColor: "#487548",
  },
  navi_row: {
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1, // 1px border
    borderBottomColor: "#487548", // red color
    alignItems: "center",
  },
});

export default LoggedInMyPage;
