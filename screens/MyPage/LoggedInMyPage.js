import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
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
  const { isLoggedIn, handleLoggedout, userPoints, userNickname } = useAuth();
  const maxExperience = 100; // 최대 경험치 값
  const handleSettingsPress = () => {
    navigation.navigate("Settings");
  };

  console.log(isLoggedIn);

  let imageSource;

  if (userPoints < 100) {
    imageSource = require("../../assets/dog_data/lv2.png"); // 각 레벨에 따른 이미지 경로 설정
  } else if (userPoints < 200) {
    imageSource = require("../../assets/dog_data/lv2.png");
  } else if (userPoints < 300) {
    imageSource = require("../../assets/dog_data/lv3.png");
  }

  return (
    <View style={styles.container}>
      <View style={styles.container_1}>
        <ImageBackground
          source={require("../../assets/dog_data/lv_back2.png")} // 이미지 경로 지정
          style={styles.backgroundImage} // 배경 이미지의 스타일
        >
          {isLoggedIn ? (
            <View style={styles.my_info}>
              <View style={styles.info_lv1}>
                <Icon name="gear" size={25} style={{ color: "white" }} />
              </View>
              <View style={styles.info_lv2}>
                <Image
                  source={imageSource} // 이미지 경로를 적절히 수정해주세요
                  style={styles.image}
                />
              </View>
              <View style={styles.info_lv3}>
                <Text style={styles.info_text}>{userNickname}</Text>
              </View>
            </View>
          ) : (
            <Text>로그인 후 이용하세요</Text>
          )}
        </ImageBackground>
      </View>
      {isLoggedIn ? (
        <View style={{ alignItems: "center", height: 60 }}>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${userPoints}%` }]} />
          </View>
          <View>
            <Text style={[styles.text, { color: "#487548" }]}>
              Lv. {userPoints % 100} / {maxExperience} P
            </Text>
          </View>
        </View>
      ) : (
        <Text style={{ heihgt: 30 }}>로그인 후 이용하세요</Text>
      )}
      <View style={styles.container_2}>
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
          <View style={styles.navi_row}>
            <Icon
              name="phone"
              size={20}
              style={{ marginRight: 10, color: "#487548" }}
            />
            <Text>고객센터</Text>
          </View>
          <View style={styles.navi_row}>
            <Icon
              name="check"
              size={20}
              style={{ marginRight: 10, color: "#487548" }}
            />
            <Text onPress={handleLoggedout}>로그아웃</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1, // 컨테이너가 화면 전체를 차지하도록 설정
    resizeMode: "cover", // 이미지를 화면에 꽉 차게 늘리거나 줄임
  },
  image: {
    width: 200,
    height: 200,
  },
  container: {
    flex: 1,
    color: "#487548",
    alignItems: "center",
  },
  container_1: {
    height: 300,
    width: "100%",
  },
  container_2: {
    width: "100%",
    alignItems: "center",
  },
  container_info: {
    width: "100%",
    height: 300,
  },
  info_text: {
    color: "#487548",
    fontWeight: "bold",
    fontSize: 16,
  },
  info_deco_point: {
    backgroundColor: "yellow",
    padding: 10,
  },
  info_lv1: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
  info_lv2: {
    alignItems: "center",
    padding: 10,
  },
  info_lv3: {
    alignItems: "center",
  },
  info_lv4: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "",
  },
  my_navi: {
    width: "90%",
  },
  navi_row: {
    width: "100%",
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1, // 1px border
    borderBottomColor: "#487548", // red color
    alignItems: "center",
  },
  progressContainer: {
    marginTop: 10,
    height: 10,
    width: 300,
    backgroundColor: "#F69F1E",
    borderRadius: 15,
    overflow: "hidden",
    justifyContent: "center",
    marginBottom: 20,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "blue",
  },
  text: {
    alignSelf: "center",
    position: "absolute",
    fontWeight: "bold",
    color: "white",
  },
});

export default LoggedInMyPage;
