import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Collapsible from "react-native-collapsible";

function Complain_fac() {
  const navigation = useNavigation();
  const [collapsedStates, setCollapsedStates] = useState({
    container1: true,
    container2: true,
    container3: true,
    // 추가 컨테이너가 있다면 여기에 추가
  });

  const toggleDropdown = (containerKey) => {
    setCollapsedStates((prevState) => ({
      ...prevState,
      [containerKey]: !prevState[containerKey],
    }));
  };

  return (
    <View style={styles.page}>
      {/* 버튼을 클릭하여 cctv 화면으로 이동 */}
      <View style={styles.nav_bar}>
        <Text style={styles.nav_bar_item}>시설물</Text>
        <Text
          style={{
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            fontWeight: "bold",
            fontSize: 20,
            color: "#9A9A9A",
          }}
        >
          CCTV
        </Text>
        <Text
          style={{
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            fontWeight: "bold",
            fontSize: 20,
            color: "#9A9A9A",
          }}
        >
          제보
        </Text>
      </View>
      {/* 나머지 컴포넌트 내용 */}
      <ScrollView>
        <View style={styles.report_list}>
          <View style={styles.container} key="container1">
            <TouchableWithoutFeedback
              onPress={() => toggleDropdown("container1")}
            >
              <View style={styles.report_container}>
                <View style={styles.report_line1}>
                  <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                    <Text style={{ color: "#3A5A40" }}>[근린공원]</Text>
                    <Text> 원당산 공원 벤치</Text>
                  </Text>
                  <Icon
                    name={
                      collapsedStates.container1 ? "chevron-down" : "chevron-up"
                    }
                    size={15}
                  />
                </View>
                <View style={styles.report_line2}>
                  <Text style={{ opacity: 0.4 }}>2023.08.28</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <Collapsible collapsed={collapsedStates.container1}>
              <View style={styles.dropdownContent}>
                <View style={styles.fac_images}>
                  <View style={styles.image_before}>
                    <Image
                      source={require("../../assets/report/before1.png")}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  </View>
                  <Icon name={"arrow-right"} size={15} />
                  <View style={styles.image_after}>
                    <Image
                      source={require("../../assets/report/after1.png")}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  </View>
                </View>
                <View style={styles.fac_desc}>
                  <Text style={styles.fac_desc_main}>
                    원당산 공원 부서진 벤치 제보가 들어와 지자체에서 확인 후
                    2023.08.28 15:00시에 보수 완료 하였습니다. 제보
                    감사드립니다.
                  </Text>
                  <View style={styles.fac_desc_who}>
                    <Text>광주광역시 광산구청</Text>
                  </View>
                </View>
              </View>
            </Collapsible>
          </View>
          <View style={styles.container} key="container2">
            <TouchableWithoutFeedback
              onPress={() => toggleDropdown("container2")}
            >
              <View style={styles.report_container}>
                <View style={styles.report_line1}>
                  <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                    <Text style={{ color: "#3A5A40" }}>[도시,테마공원]</Text>
                    <Text> 첨단 체육공원 산책로</Text>
                  </Text>
                  <Icon
                    name={
                      collapsedStates.container2 ? "chevron-down" : "chevron-up"
                    }
                    size={15}
                  />
                </View>
                <View style={styles.report_line2}>
                  <Text style={{ opacity: 0.4 }}>2023.08.02</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <Collapsible collapsed={collapsedStates.container2}>
              <View style={styles.dropdownContent}>
                <View style={styles.fac_images}>
                  <View style={styles.image_before}>
                    <Image
                      source={require("../../assets/report/before1.png")}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  </View>
                  <Icon name={"arrow-right"} size={15} />
                  <View style={styles.image_after}>
                    <Image
                      source={require("../../assets/report/after1.png")}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  </View>
                </View>
                <View style={styles.fac_desc}>
                  <Text style={styles.fac_desc_main}>
                    첨단 생활체육공원 산책로 제보가 들어와 지자체에서 확인 후
                    2023.08.02 13:00시에 보수 완료 하였습니다. 제보
                    감사드립니다.
                  </Text>
                  <View style={styles.fac_desc_who}>
                    <Text>광주광역시 광산구청</Text>
                  </View>
                </View>
              </View>
            </Collapsible>
          </View>
          <View style={styles.container} key="container3">
            <TouchableWithoutFeedback
              onPress={() => toggleDropdown("container3")}
            >
              <View style={styles.report_container}>
                <View style={styles.report_line1}>
                  <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                    <Text style={{ color: "#3A5A40" }}>[근린공원]</Text>
                    <Text> 산정공원 정자</Text>
                  </Text>
                  <Icon
                    name={
                      collapsedStates.container3 ? "chevron-down" : "chevron-up"
                    }
                    size={15}
                  />
                </View>
                <View style={styles.report_line2}>
                  <Text style={{ opacity: 0.4 }}>2023.07.24</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <Collapsible collapsed={collapsedStates.container3}>
              <View style={styles.dropdownContent}>
                <Text>Additional content goes here...</Text>
              </View>
            </Collapsible>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "white",
  },
  nav_bar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: "#8E8E8E",
    borderTopColor: "#8E8E8E",
    padding: 4,
  },
  nav_bar_item: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    opacity: 0.9,
    color: "#3A5A40",
    fontWeight: "bold",
    fontSize: 20,
  },
  navi: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginBottom: 10,
    color: "#9A9A9A",
  },
  navi_btn: {
    color: "#9A9A9A",
    backgroundColor: "#9A9A9A",
  },
  container: {
    padding: 15,
    width: "90%",
    borderRadius: 20,
    backgroundColor: "white",
    elevation: 10,
    marginBottom: 20,
    backgroundColor: "#E6EDE2",
  },
  report_list: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    // backgroundColor: "yellow",
    paddingBottom: 50,
  },

  report_line1: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  report_line2: {
    marginBottom: 20,
  },
  fac_images: {
    // backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "gray  ",
    marginBottom: 10,
  },
  image_before: {
    width: 130,
    height: 130,
    backgroundColor: "orange",
  },
  image_after: {
    width: 130,
    height: 130,
    backgroundColor: "orange",
  },
  fac_desc_main: {
    marginBottom: 10,
  },
  fac_desc_who: {
    alignItems: "flex-end",
  },
});

export default Complain_fac;
