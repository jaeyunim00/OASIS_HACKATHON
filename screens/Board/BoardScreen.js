import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import {
  storage,
  stoRef,
  getDownloadURL,
  listAll,
  storeQuery,
  collection,
  db,
  where,
  getDocs,
} from "../../firebaseConfig";
import Swiper from "react-native-swiper"; // react-native-swiper 패키지를 import
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const BoardScreen = () => {
  const navigation = useNavigation();
  const [imageUrls, setImageUrls] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // refreshing 상태 추가
  const [heartStatus, handleHeartStatus] = useState(false);
  const [check, setCheck] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [checkedIndexes, setCheckedIndexes] = useState([]);

  const handleHeart = (index) => {
    const isSelected = selectedIndexes.includes(index);

    if (isSelected) {
      setSelectedIndexes(selectedIndexes.filter((item) => item !== index));
    } else {
      setSelectedIndexes([...selectedIndexes, index]);
    }
  };

  const handleCheck = (index) => {
    const isChecked = checkedIndexes.includes(index);

    if (isChecked) {
      setCheckedIndexes(checkedIndexes.filter((item) => item !== index));
    } else {
      setCheckedIndexes([...checkedIndexes, index]);
    }
  };

  const fetchImageUrls = async () => {
    try {
      const storageRef = stoRef(storage, "images");
      const fileList = await listAll(storageRef);

      const urlsAndData = await Promise.all(
        fileList.items.map(async (item) => {
          const url = await getDownloadURL(item);

          // Fetch additional data from Firestore based on the image's URL
          const q = storeQuery(
            collection(db, "images"),
            where("imageURL", "==", url)
          );
          const querySnapshot = await getDocs(q);

          console.log("Query Snapshot:", querySnapshot); // Add this line

          if (querySnapshot.docs.length === 0) {
            return {
              url: url,
              associatedText: "", // No associated text found for this URL
            };
          }

          const data = querySnapshot.docs[0].data();

          return {
            url: url,
            associatedText: data ? data.associatedText : "",
          };
        })
      );

      setImageUrls(urlsAndData);
    } catch (error) {
      console.error("Error fetching image URLs from Firebase Storage:", error);
    }
  };

  const toUpload = () => {
    navigation.navigate("Upload");
  };

  useEffect(() => {
    fetchImageUrls();
  }, []);

  const handleUploadPress = () => {
    // Navigate to the UploadScreen
    navigation.navigate("Upload");
  };

  const onRefresh = () => {
    setRefreshing(true); // 새로고침 시작
    fetchImageUrls();
    setRefreshing(false); // 새로고침 종료
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ height: 50 }}></View>
      <View style={styles.nav_bar}>
        <Image
          source={require("../../assets/real_logo.png")}
          style={{ width: 70, height: 50 }}
          resizeMode="contain"
        />
        <Text onPress={toUpload} style={{ fontSize: 20, color: "#418915" }}>
          UP
        </Text>
      </View>
      <View style={styles.posts}>
        {imageUrls.map((item, index) => (
          <View style={styles.post}>
            <View style={styles.post_header}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "yellow",
                    marginRight: 7,
                  }}
                ></View>
                <Text style={{ fontSize: 17 }}>공원이름</Text>
              </View>
              <View>
                <Icon
                  name={
                    checkedIndexes.includes(index)
                      ? "check-circle"
                      : "check-circle-o"
                  }
                  onPress={() => handleCheck(index)}
                  size={23}
                />
              </View>
            </View>
            <View key={index}>
              <Image source={{ uri: item.url }} style={styles.image} />
            </View>
            <View style={styles.post_footer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 17 }}># 추천공원</Text>
              </View>
              <View>
                <Icon
                  name="heart"
                  size={20}
                  color={selectedIndexes.includes(index) ? "red" : "black"}
                  onPress={() => handleHeart(index)}
                />
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  nav_bar: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
    paddingTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#418915",
    alignItems: "center",
  },
  postContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 20,
  },
  nametext: {
    fontSize: 14,
    marginLeft: 17,
    marginTop: 10,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC", // 회색 실선의 색상
    marginVertical: 5, // 상하 여백 조절
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
    width: "100%",
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: 300,
  },
  actionButtonImage: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginRight: 20,
    // 추가적인 스타일링을 적용할 수 있습니다.
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
  post: {
    // borderBottomWidth: 1,
    // borderBottomColor: "#9a9a9a",
    marginBottom: 25,
  },
  post_header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  post_footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
});

export default BoardScreen;
