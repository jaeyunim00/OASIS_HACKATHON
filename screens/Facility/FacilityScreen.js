import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

function FacilityScreen() {
  const navigation = useNavigation();

  return (
    <View key={"fac"} style={styles.page}>
      <Text style={styles.title}>광주 광역시 시설물</Text>
      <Text
        style={{
          opacity: 0.4,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 20,
          fontSize: 15,
        }}
      >
        현재 지역에 있는 시설물 한눈에 확인
      </Text>
      <View style={styles.nav_bar}>
        <Text style={styles.nav_bar_item}>체육센터</Text>
        <Text
          style={{
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 10,
          }}
        >
          미술관
        </Text>
        <Text
          style={{
            padding: 10,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 10,
          }}
        >
          공연/예술
        </Text>
      </View>
      <ScrollView style={styles.list}>
        <View style={styles.container_row}>
          <View style={styles.item}>
            <View style={styles.item_image}>
              <Image
                source={require("../../assets/facility/fac1.png")}
                style={{ width: "100%", height: "100%", borderRadius: 20 }}
                resizeMode="cover"
              />
            </View>
            <View style={styles.item_detail}>
              <Text style={styles.detail_1}>체육센터</Text>
              <Text style={styles.detail_2}>상무 국민 스포츠센터</Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.item_image}>
              <Image
                source={require("../../assets/facility/fac2.png")}
                style={{ width: "100%", height: "100%", borderRadius: 20 }}
                resizeMode="cover"
              />
            </View>
            <View style={styles.item_detail}>
              <Text style={styles.detail_1}>체육센터</Text>
              <Text style={styles.detail_2}>수완 문화체육센터</Text>
            </View>
          </View>
        </View>
        <View style={[styles.item, { marginLeft: 9.5, marginTop: 14 }]}>
          <View style={styles.item_image}>
            <Image
              source={require("../../assets/facility/fac3.png")}
              style={{ width: "100%", height: "100%", borderRadius: 20 }}
              resizeMode="cover"
            />
          </View>
          <View style={styles.item_detail}>
            <Text style={styles.detail_1}>체육센터</Text>
            <Text style={styles.detail_2}>빛고을 국민체육센터</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    // backgroundColor: "yellow",
    padding: 10,
  },
  title: {
    marginTop: 40,
    padding: 20,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "left",
  },
  nav_bar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: "#8E8E8E",
    borderTopColor: "#8E8E8E",
  },
  nav_bar_item: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#588157",
    opacity: 0.9,
  },
  list: {
    // backgroundColor: "white",
    flex: 1,
  },
  container_row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  item: {
    width: "45%",
    // backgroundColor: "yellow",
    padding: 5,
  },
  item_image: {
    width: 150,
    height: 220,
    marginBottom: 20,
  },
  detail_1: {
    opacity: 0.4,
    marginBottom: 5,
    fontSize: 12,
  },
  detail_2: {
    fontSize: 17,
    fontWeight: "bold",
  },
});

export default FacilityScreen;
