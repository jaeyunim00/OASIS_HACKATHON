import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ImageBackground,
  ScrollView,
} from "react-native";
import { getFirestore, collection, getDocs } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { db, auth } from "../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { useAuth } from "../AuthContext";

function DogScreen() {
  const maxExperience = 100; // 최대 경험치 값
  const { isLoggedIn, userPoints, handleUserPoint, handleUserPoint_reset } =
    useAuth();

  const facilities = [1, 2, 3, 4, 5, 6];
  let imageSource;

  if (userPoints < 100) {
    imageSource = require("../assets/dog_data/level1.png"); // 각 레벨에 따른 이미지 경로 설정
  } else if (userPoints < 200) {
    imageSource = require("../assets/dog_data/level2.png");
  }

  return (
    <View style={styles.container}>
      <View
        style={{ height: 50, width: "100%", backgroundColor: "red" }}
      ></View>
      {isLoggedIn ? (
        <View style={{ alignItems: "center" }}>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${userPoints}%` }]} />
            <Text style={styles.text}>
              {userPoints % 100} / {maxExperience}
            </Text>
          </View>
        </View>
      ) : (
        <Text style={{ heihgt: 30 }}>로그인 후 이용하세요</Text>
      )}
      <ImageBackground
        source={require("../assets/point_background.jpeg")}
        style={{
          width: 300,
          height: 300,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 150,
          overflow: "hidden",
        }}
      >
        <Image
          source={imageSource} // 이미지 경로를 적절히 수정해주세요
          style={styles.image}
        />
      </ImageBackground>
      {/* {isLoggedIn ? ( 이거 exp up 하는 테스트임.
        <>
          <View style={{ alignItems: "center" }}>
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: `${userPoints}%` }]} />
              <Text style={styles.text}>
                {userPoints % 100} / {maxExperience}
              </Text>
            </View>
          </View>
          <View style={styles.textContainer}>
            <View style={styles.textContainer}>
              <Text>Current Level: {userPoints / 100}</Text>
              <Button title="Exp Up" onPress={handleUserPoint} />
              <Button title="Reset" onPress={handleUserPoint_reset} />
            </View>
          </View>
        </>
      ) : (
        <Text>로그인 후 키워</Text>
      )} */}
      <View key={"fac"} style={styles.page}>
        <Text style={styles.title}>공원 주변 시설</Text>
        <ScrollView style={styles.list}>
          {facilities.map((x, i) => {
            return (
              <View style={styles.item} key={i}>
                <Text style={styles.item_image}>시설{x}</Text>
                <View style={styles.item_detail}>
                  <Text>시설이름{x}</Text>
                  <Text>시설정보{x}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  textContainer: {
    flex: 0.4, // 남은 40%를 차지하도록 설정
    justifyContent: "center",
    alignItems: "center",
  },
  progressContainer: {
    width: "80%",
    height: 30,
    width: 200,
    backgroundColor: "#ccc",
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
  page: {
    flex: 1,
    backgroundColor: "yellow",
    padding: 10,
  },
  title: {
    padding: 20,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  list: {
    backgroundColor: "white",
    flex: 1,
  },
  item: {
    backgroundColor: "orange",
    padding: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  item_image: {
    backgroundColor: "gray",
    padding: 20,
    marginRight: 20,
  },
});

export default DogScreen;
