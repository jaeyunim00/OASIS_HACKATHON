import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { getFirestore, collection, getDocs } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { db, auth } from "../firebaseConfig";

function DogScreen() {
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const maxExperience = 100; // 최대 경험치 값
  const [user, setUser] = useState(null);

  const [exp, setExp] = useState([]);

  const handleLevelUp = () => {
    // 레벨 업 함수
    setLevel(level + 1);
  };

  const fetchDogs = async () => {
    const dogCollectionRef = collection(db, "users");
    const querySnapshot = await getDocs(dogCollectionRef);

    const dogList = [];
    querySnapshot.forEach((doc) => {
      dogList.push({ id: doc.id, ...doc.data() });
    });

    setExp(dogList);
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  console.log(exp);

  const handleReset = () => {
    setLevel(1);
  };

  let imageSource;
  if (level === 1) {
    imageSource = require("../assets/dog_data/level1.png"); // 각 레벨에 따른 이미지 경로 설정
  } else if (level === 2) {
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
      <View style={styles.textContainer}>
        <View style={styles.textContainer}>
          <Text>Current Level: {level}</Text>
          <View style={styles.experienceBar}>
            <View
              style={{
                width: `${(experience / maxExperience) * 100}%`,
                backgroundColor: "#4caf50", // 경험치 바 채워지는 부분의 배경색
                height: "100%",
              }}
            ></View>
          </View>
          <Button title="Level Up" onPress={handleLevelUp} />
          <Button title="Reset" onPress={handleReset} />
        </View>
      </View>
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
  experienceBar: {
    width: "80%", // 경험치 바 전체 너비
    height: 50,
    backgroundColor: "black",
    borderRadius: 10,
    marginTop: 10,
    overflow: "hidden",
  },
  experienceFill: {
    height: "100%",
    backgroundColor: "#4caf50", // 경험치 채워지는 부분의 배경색
  },
});

export default DogScreen;
