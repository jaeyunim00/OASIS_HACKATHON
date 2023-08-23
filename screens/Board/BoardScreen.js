import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { storage, ref, getDownloadURL, listAll } from "../../firebaseConfig";

const BoardScreen = () => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const storageRef = ref(storage, "images"); // images 폴더 경로
        const fileList = await listAll(storageRef);

        const urls = await Promise.all(
          fileList.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return url;
          })
        );

        setImageUrls(urls);
      } catch (error) {
        console.error(
          "Error fetching image URLs from Firebase Storage:",
          error
        );
      }
    };

    fetchImageUrls();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {imageUrls.map((url, index) => (
        <View style={styles.postContainer} key={index}>
          <View style={styles.header}>
            <Image
              source={require("../../assets/tabBar/홈_포커스.png")}
              style={styles.profileImage}
            />
            <Text style={styles.username}>사용자 이름</Text>
          </View>
          {/* Add your Carousel or ImageSlider component here */}
          <View style={styles.slide}>
            <Image source={{ uri: url }} style={styles.image} />
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>좋아요</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>공유하기</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.caption}>이미지 설명 텍스트</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  postContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  slide: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButtonText: {
    marginLeft: 5,
    fontWeight: "bold",
  },
  caption: {
    padding: 10,
  },
});

export default BoardScreen;
