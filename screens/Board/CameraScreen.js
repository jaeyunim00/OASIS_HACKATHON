import React, { useState } from "react";
import { View, Button, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../../firebaseConfig"; // 경로를 적절히 수정하세요

export default function App() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.assets.length > 0) {
      setImage(result.assets[0]);
    }
  };

  const uploadImageToFirebase = async () => {
    if (image) {
      try {
        const response = await fetch(image.uri);
        const blob = await response.blob();

        const timestamp = Date.now();
        const fileName = `image_${timestamp}.jpg`;

        await uploadImage(blob, fileName);

        Alert.alert("Success", "Image uploaded successfully!");
        console.log("Image uploaded:", fileName);
      } catch (error) {
        Alert.alert("Error", "Image upload failed.");
        console.error(error);
      }
    } else {
      Alert.alert("Error", "No image selected.");
    }
  };

  return (
    <View>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 200, height: 200 }}
        />
      )}
      {image && <Button title="Upload Image" onPress={uploadImageToFirebase} />}
    </View>
  );
}
