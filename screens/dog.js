import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { getFirestore, collection, getDocs } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { db, auth } from "../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { useAuth } from "../AuthContext";

function DogScreen() {
  const maxExperience = 100; // 최대 경험치 값
  const { isLoggedIn, userPoints, handleUserPoint, handleUserPoint_reset } =
    useAuth();

  let imageSource;

  if (userPoints < 100) {
    imageSource = require("../assets/dog_data/level1.png"); // 각 레벨에 따른 이미지 경로 설정
  } else if (userPoints < 200) {
    imageSource = require("../assets/dog_data/level2.png");
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={imageSource} // 이미지 경로를 적절히 수정해주세요
          style={styles.image}
        />
      </View>
      <Text>User is logged in: {isLoggedIn ? "Yes" : "No"}</Text>
      {isLoggedIn ? (
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 0.6, // 60%를 차지하도록 설정
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "60%",
    height: "60%",
    resizeMode: "cover",
  },
  textContainer: {
    flex: 0.4, // 남은 40%를 차지하도록 설정
    justifyContent: "center",
    alignItems: "center",
  },
  progressContainer: {
    width: "80%",
    height: 30,
    backgroundColor: "#ccc",
    borderRadius: 15,
    overflow: "hidden",
    justifyContent: "center",
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

export default DogScreen;
