import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import { useAuth } from "../../AuthContext";
import * as ImagePicker from "expo-image-picker";
import {
  storage,
  storef,
  uploadImage,
  saveButtonText,
  saveImageDataToFirestore,
  getDownloadURL,
} from "../../firebaseConfig";
import Icon from "react-native-vector-icons/FontAwesome";

import { useNavigation } from "@react-navigation/native";

const UploadScreen = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [activeButtons, setActiveButtons] = useState([]); // Track the active button
  const [addressInput, setAddressInput] = useState(""); // 추가된 부분
  const navigation = useNavigation();

  const { userNickname } = useAuth();

  const handleButtonClick = async () => {
    Alert.alert(
      "이미지 선택",
      "카메라로 사진을 찍을지 갤러리에서 사진을 선택할지 선택해주세요.",
      [
        { text: "취소", style: "cancel" },
        {
          text: "카메라",
          onPress: () => launchCamera(),
        },
        {
          text: "갤러리",
          onPress: () => launchImageLibrary(),
        },
      ]
    );
  };

  const handletextButtonClick = (buttonText) => {
    if (activeButtons.includes(buttonText)) {
      setActiveButtons(activeButtons.filter((btn) => btn !== buttonText));
    } else {
      setActiveButtons([...activeButtons, buttonText]);
    }
  };

  const handleImageSelect = (selectedImage) => {
    if (!selectedImages.includes(selectedImage)) {
      setSelectedImages([...selectedImages, selectedImage]);
    }
  };

  const uploadImagesToFirebase = async () => {
    try {
      if (selectedImages.length === 0 || addressInput === "") {
        // 텍스트가 비어있으면 업로드 방지
        Alert.alert("Error", "이미지와 텍스트를 모두 입력해주세요.");
        return;
      }
      const uploadPromises = selectedImages.map(async (selectedImage) => {
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        const imageName = new Date().getTime().toString();
        const storageRef = await uploadImage(blob, imageName);

        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL; // Return the URL for each uploaded image
      });

      const imageUrls = await Promise.all(uploadPromises);

      // Now you have an array of download URLs, you can save them to Firestore
      await saveImageDataToFirestore(
        imageUrls,
        activeButtons,
        userNickname,
        addressInput
      );

      setSelectedImages([]);
      setActiveButtons([]); // Reset active button
      setAddressInput(""); // Reset text input

      Alert.alert("Success", "이미지 업로드가 완료되었습니다.");
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error", "이미지 업로드 중 오류가 발생했습니다.");
    }
  };

  const launchCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.cancelled) {
      handleImageSelect(result.uri);
    }
  };

  const handleClose = () => {
    navigation.navigate("Board");
  };

  const launchImageLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
    });

    if (!result.cancelled && result.assets.length > 0) {
      result.assets.forEach((asset) => {
        handleImageSelect(asset.uri);
      });
    }
  };

  return (
    <View style={{ padding: 13, backgroundColor: "white", flex: 1 }}>
      <View style={{ height: 50 }}></View>
      <View
        style={{
          // backgroundColor: "orange",
          justifyContent: "space-between",
          paddingBottom: 15,
          paddingTop: 15,
          flexDirection: "row",
        }}
      >
        <Icon name="close" size={20} onPress={handleClose}></Icon>
        <TouchableOpacity onPress={uploadImagesToFirebase}>
          <Text
            style={{
              fontSize: 18,
            }}
          >
            Upload
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={[styles.mainText, styles.mainText_line1]}>
          공원 제보 혹은
        </Text>
        <Text style={styles.mainText}>추천을 해주세요!</Text>
      </View>
      <View>
        <Text
          style={{
            color: "#588157",
            paddingTop: 20,
            paddingBottom: 20,
            fontSize: 15,
          }}
        >
          공원 이름을 적어주세요
        </Text>
      </View>
      <View style={styles.input_container}>
        <TextInput
          placeholder="Enter your text here"
          onChangeText={setAddressInput}
          value={addressInput}
          style={styles.input}
        />
      </View>
      <TouchableOpacity onPress={handleButtonClick}>
        {selectedImages.length > 0 ? (
          <View style={styles.imageSelect}>
            {selectedImages.map((uri, index) => (
              <Image
                key={index}
                source={{ uri }}
                style={{
                  width: 100,
                  height: 150,
                  margin: 10,
                }}
                resizeMode="cover"
              />
            ))}
          </View>
        ) : (
          <View style={styles.imageSelect}>
            <View style={styles.image_box}>
              <Text style={styles.image_item}>이미지 선택</Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
      <Text style={{ color: "#588157", fontSize: 15 }}>태그를 선택하세요</Text>
      <View style={styles.hashtags}>
        <TouchableOpacity onPress={() => handletextButtonClick("CCTV")}>
          <Text
            style={
              activeButtons.includes("CCTV")
                ? styles.activeButtonText
                : styles.buttonText
            }
          >
            #CCTV
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handletextButtonClick("시설물")}>
          <Text
            style={
              activeButtons.includes("시설물")
                ? styles.activeButtonText
                : styles.buttonText
            }
          >
            #시설물
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handletextButtonClick("공원추천")}>
          <Text
            style={
              activeButtons.includes("공원추천")
                ? styles.activeButtonText
                : styles.buttonText
            }
          >
            #공원추천
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainText: {
    fontSize: 23,
  },
  mainText_line1: {
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "normal",
    marginRight: 10,
  },
  activeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#588157", // Customize the active button style
    marginRight: 10,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: "gray",
    padding: 5,
    fontSize: 16,
  },
  imageSelect: {
    flexDirection: "row",
    // backgroundColor: "red",
    marginTop: 20,
    marginBottom: 20,
  },
  image_box: {
    width: 100,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F4F4",
  },
  image_item: {},
  hashtags: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
});

export default UploadScreen;
